-- ═══════════════════════════════════════════════════════════════
--  Email me when a new contact message arrives (via Resend).
--
--  Run this in Supabase → SQL Editor. It uses:
--   • pg_net   — to make an HTTPS call from Postgres
--   • Vault    — to store your Resend API key securely (not in plain SQL)
--   • a trigger on contact_messages (INSERT) → sends you an email
--
--  ── PREREQUISITES ─────────────────────────────────────────────
--  1. Create a free Resend account → https://resend.com
--  2. Resend → API Keys → create one (starts "re_…"). Copy it.
--  3. Sender address:
--       • Quickest: use  onboarding@resend.dev  (works out of the box,
--         but only delivers to the email on your Resend account).
--       • Production: verify a domain in Resend, then use e.g.
--         "Portfolio <hello@yourdomain.com>".
--
--  ── STEP 1: store your Resend key in Vault (run ONCE) ─────────
--  Replace re_your_key_here with your real key, run this line alone:
--
--     select vault.create_secret('re_your_key_here', 'resend_api_key');
--
--  (To rotate later: delete the old secret in Vault UI, then re-run.)
-- ═══════════════════════════════════════════════════════════════

-- ── STEP 2: enable the HTTP extension ─────────────────────────
create extension if not exists pg_net;

-- ── STEP 3: the notifier function ─────────────────────────────
create or replace function public.notify_new_contact_message()
returns trigger
language plpgsql
security definer
set search_path = public, extensions, vault
as $$
declare
  api_key   text;
  safe_msg  text;
begin
  -- read the Resend key from Vault; if missing, do nothing (still saves the row)
  select decrypted_secret into api_key
    from vault.decrypted_secrets
    where name = 'resend_api_key'
    limit 1;
  if api_key is null then
    return new;
  end if;

  -- escape HTML in the message, then turn newlines into <br>
  safe_msg := replace(replace(replace(coalesce(new.message, ''),
                '&', '&amp;'), '<', '&lt;'), '>', '&gt;');
  safe_msg := replace(safe_msg, chr(10), '<br>');

  perform net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || api_key,
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object(
      'from', 'Portfolio <onboarding@resend.dev>',   -- ← change to your verified sender later
      'to', jsonb_build_array('iamjhondrey@yahoo.com'), -- ← your inbox
      'reply_to', new.email,                          -- reply goes straight to the sender
      'subject', 'New portfolio message from ' || coalesce(new.name, 'someone'),
      'html',
        '<div style="font-family:system-ui,Arial,sans-serif;font-size:15px;color:#111">' ||
        '<h2 style="margin:0 0 12px">📬 New message from your portfolio</h2>' ||
        '<p style="margin:4px 0"><strong>Name:</strong> ' || coalesce(new.name, '') || '</p>' ||
        '<p style="margin:4px 0"><strong>Email:</strong> ' || coalesce(new.email, '') || '</p>' ||
        '<p style="margin:12px 0 4px"><strong>Message:</strong></p>' ||
        '<div style="padding:12px 14px;background:#f5f5f7;border-radius:10px;white-space:normal">' ||
        safe_msg || '</div>' ||
        '<p style="margin:16px 0 0;color:#888;font-size:12px">Sent ' ||
        to_char(new.created_at, 'YYYY-MM-DD HH24:MI') || ' UTC · reply to this email to respond.</p>' ||
        '</div>'
    )
  );

  return new;
end;
$$;

-- ── STEP 4: fire it on every new message ──────────────────────
drop trigger if exists trg_notify_contact on public.contact_messages;
create trigger trg_notify_contact
  after insert on public.contact_messages
  for each row execute function public.notify_new_contact_message();

-- Done. Submit a test message from your site; you should get an email.
-- Troubleshoot: Supabase → Database → check the `net._http_response` table,
-- and Resend → Emails for delivery logs.
