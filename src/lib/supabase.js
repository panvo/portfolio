import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// The site works with or without Supabase configured. When the env
// vars are missing (e.g. first local run before setup), `supabase`
// is null and features degrade gracefully.
export const supabase = url && anonKey ? createClient(url, anonKey) : null
export const hasSupabase = Boolean(supabase)

/** Insert a contact message. Returns { ok, error }. */
export async function sendMessage({ name, email, message }) {
  if (!supabase) return { ok: false, error: 'not-configured' }
  const { error } = await supabase
    .from('contact_messages')
    .insert({ name, email, message })
  return { ok: !error, error: error?.message }
}

/** Bump + read the visitor counter via a Postgres RPC. */
export async function bumpVisits() {
  if (!supabase) return null
  const { data, error } = await supabase.rpc('bump_page_view')
  if (error) return null
  return typeof data === 'number' ? data : null
}
