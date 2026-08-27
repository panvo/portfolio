import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Linkedin, Github, Send, Check, Loader2, ArrowUpRight, Maximize2, X } from 'lucide-react'
import { profile } from '../content/profile'
import { sendMessage, hasSupabase } from '../lib/supabase'
import { Reveal } from './ui/Reveal'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [err, setErr] = useState('')
  const [composing, setComposing] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  useEffect(() => {
    if (!composing) return
    const onKey = (e) => e.key === 'Escape' && setComposing(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [composing])

  async function onSubmit(e) {
    e.preventDefault()
    if (status === 'sending') return
    if (!hasSupabase) {
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
      window.location.href = `mailto:${profile.email}?subject=Portfolio message from ${encodeURIComponent(form.name)}&body=${body}`
      return
    }
    setStatus('sending')
    setErr('')
    const { ok, error } = await sendMessage(form)
    if (ok) {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } else {
      setStatus('error')
      setErr(error || 'Something went wrong.')
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-32 scroll-mt-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="shell">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-14 lg:gap-20 items-start">
          {/* left: pitch */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8" style={{ background: 'var(--accent)' }} />
                <span className="eyebrow">Contact</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] leading-[0.95]">
                Let’s work<br />together<span style={{ color: 'var(--accent)' }}>.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Open to QA roles, testing consulting, and collaborations. Send a message and I’ll get back to you.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-9 space-y-1">
                <a href={`mailto:${profile.email}`} className="ulink inline-flex items-center gap-2 text-lg font-display">
                  {profile.email} <ArrowUpRight size={17} style={{ color: 'var(--accent)' }} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex gap-3">
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost !px-4">
                  <Linkedin size={17} /> LinkedIn
                </a>
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost !px-4">
                    <Github size={17} /> GitHub
                  </a>
                )}
              </div>
            </Reveal>
          </div>

          {/* right: form */}
          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="card p-7 sm:p-8 space-y-4" style={{ boxShadow: 'var(--shadow)' }}>
              <Field label="Name" value={form.name} onChange={set('name')} placeholder="Your name" required />
              <Field label="Email" type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" required />
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="eyebrow">Message</label>
                  <button
                    type="button"
                    onClick={() => setComposing(true)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono rounded-md px-2 py-1 transition-colors"
                    style={{ color: 'var(--text-faint)', border: '1px solid var(--border)' }}
                    title="Expand to a full compose view"
                  >
                    <Maximize2 size={12} /> Expand
                  </button>
                </div>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={set('message')}
                  onDoubleClick={() => setComposing(true)}
                  placeholder="Tell me about the role or project…  (double-click to expand)"
                  className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none transition-colors"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              <button type="submit" disabled={status === 'sending'} className="btn btn-primary w-full justify-center">
                <AnimatePresence mode="wait" initial={false}>
                  {status === 'sending' ? (
                    <motion.span key="s" className="inline-flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Loader2 size={17} className="animate-spin" /> Sending…
                    </motion.span>
                  ) : status === 'sent' ? (
                    <motion.span key="ok" className="inline-flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Check size={17} /> Message sent
                    </motion.span>
                  ) : (
                    <motion.span key="i" className="inline-flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Send size={16} /> {hasSupabase ? 'Send message' : 'Compose email'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <AnimatePresence>
                {status === 'sent' && (
                  <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm text-center" style={{ color: '#16a34a' }}>
                    Thanks! I’ll reply soon.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-center" style={{ color: '#dc2626' }}>
                    {err}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>

      {/* full compose view (double-click the message, or "Expand") */}
      <AnimatePresence>
        {composing && (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-8"
            style={{ background: 'rgba(6,7,12,0.86)', backdropFilter: 'blur(6px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setComposing(false)}
          >
            <motion.div
              className="card w-full max-w-2xl overflow-hidden"
              style={{ boxShadow: 'var(--shadow)' }}
              initial={{ scale: 0.96, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="eyebrow">Compose your message</span>
                <button
                  onClick={() => setComposing(false)}
                  aria-label="Close"
                  className="grid place-items-center h-8 w-8 rounded-full transition-colors"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-5">
                <textarea
                  autoFocus
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Tell me about the role or project… take your time."
                  className="w-full rounded-xl px-4 py-3 text-[15px] leading-relaxed resize-none outline-none"
                  style={{ height: '52vh', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>
                    {form.message.length} characters · Esc to close
                  </span>
                  <button onClick={() => setComposing(false)} className="btn btn-primary !py-2 !px-5">
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="eyebrow block mb-2">{label}</label>
      <input
        {...props}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
        style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
        onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
      />
    </div>
  )
}
