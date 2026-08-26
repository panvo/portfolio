-- ═══════════════════════════════════════════════════════════════
--  Portfolio backend — run this ONCE in Supabase.
--  Dashboard → SQL Editor → New query → paste all → Run.
--  Safe to re-run (idempotent).
-- ═══════════════════════════════════════════════════════════════

-- ── 1. Contact messages ───────────────────────────────────────
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  message    text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Guard against oversized / empty payloads at the DB layer.
create or replace function public.validate_contact_message()
returns trigger language plpgsql as $$
begin
  if length(coalesce(new.name, '')) = 0 or length(new.name) > 120 then
    raise exception 'invalid name';
  end if;
  if length(coalesce(new.email, '')) = 0 or length(new.email) > 200
     or new.email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'invalid email';
  end if;
  if length(coalesce(new.message, '')) = 0 or length(new.message) > 4000 then
    raise exception 'invalid message';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_validate_contact on public.contact_messages;
create trigger trg_validate_contact
  before insert on public.contact_messages
  for each row execute function public.validate_contact_message();

-- Anonymous visitors may INSERT a message, but never read them.
drop policy if exists "anon can insert messages" on public.contact_messages;
create policy "anon can insert messages"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

-- (No SELECT policy for anon → messages are private. Read them in the
--  Supabase dashboard: Table editor → contact_messages.)


-- ── 2. Visitor counter ────────────────────────────────────────
create table if not exists public.page_views (
  id    int primary key default 1,
  count bigint not null default 0,
  constraint single_row check (id = 1)
);

insert into public.page_views (id, count)
  values (1, 0)
  on conflict (id) do nothing;

alter table public.page_views enable row level security;
-- No direct table policies — access is only through the RPC below.

-- Atomic increment + return the new total. SECURITY DEFINER lets the
-- anon role bump the counter without exposing the table.
create or replace function public.bump_page_view()
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count bigint;
begin
  update public.page_views
    set count = count + 1
    where id = 1
    returning count into new_count;
  return new_count;
end;
$$;

grant execute on function public.bump_page_view() to anon, authenticated;
