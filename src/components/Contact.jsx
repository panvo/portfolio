import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Check, Loader2, Maximize2, X } from 'lucide-react'
import { profile } from '../content/profile'
import { sendMessage, hasSupabase } from '../lib/supabase'
import { Reveal, MaskText } from './ui/Reveal'
import { Magnetic } from './ui/Magnetic'

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

  // close the compose modal once the message actually sends
  useEffect(() => {
    if (status === 'sent') setComposing(false)
  }, [status])

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
    <section id="contact" className="py-20 sm:py-24 scroll-mt-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="shell">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-20 items-start">
          {/* left: pitch */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8" style={{ background: 'var(--accent)' }} />
                <span className="eyebrow">Contact</span>
              </div>
            </Reveal>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] leading-[0.95]">
              <MaskText duration={0.85}>Let’s work</MaskText>
              <MaskText delay={0.12} duration={0.85}>
                together<span style={{ color: 'var(--accent)' }}>.</span>
              </MaskText>
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Open to QA roles, testing consulting, and collaborations. Send a message and I’ll get back to you.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-9 flex items-center gap-2.5 text-[15px]" style={{ color: 'var(--text-muted)' }}>
                <span className="grid place-items-center h-7 w-7 rounded-lg shrink-0" style={{ background: 'color-mix(in srgb, var(--accent) 14%, transparent)', color: 'var(--accent)' }}>
                  <Send size={14} />
                </span>
                Use the form — it lands straight in my inbox.
              </p>
            </Reveal>

          </div>

          {/* right: form */}
          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="card p-7 sm:p-9 space-y-5" style={{ boxShadow: 'var(--shadow)', background: 'linear-gradient(180deg, var(--surface), color-mix(in srgb, var(--surface) 24%, transparent))' }}>
              <div className="flex items-center gap-3.5 pb-5 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="grid place-items-center h-11 w-11 rounded-xl shrink-0" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff', boxShadow: '0 8px 22px -10px color-mix(in srgb, var(--accent) 65%, transparent)' }}>
                  <Send size={18} />
                </span>
                <div>
                  <h3 className="font-display font-semibold text-lg tracking-tight leading-tight">Send a message</h3>
                  <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-faint)' }}>Fill it in — it lands straight in my inbox.</p>
                </div>
              </div>
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
                  rows={5}
                  value={form.message}
                  onChange={set('message')}
                  onDoubleClick={() => setComposing(true)}
                  placeholder="Tell me about the role or project…  (double-click to expand)"
                  className="w-full rounded-xl px-4 py-3.5 text-[15px] leading-relaxed resize-none outline-none transition-colors"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              <Magnetic strength={0.12}>
              <button type="submit" disabled={status === 'sending'} className="btn btn-primary w-full justify-center !py-4 !text-[15px]">
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
              </Magnetic>

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
              className="card w-full max-w-3xl overflow-hidden max-h-[92vh] flex flex-col"
              style={{ boxShadow: 'var(--shadow)' }}
              initial={{ scale: 0.96, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
                <div>
                  <span className="eyebrow">Compose your message</span>
                  <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-faint)' }}>
                    Fill it in and send — I’ll get back to you.
                  </p>
                </div>
                <button
                  onClick={() => setComposing(false)}
                  aria-label="Close"
                  className="grid place-items-center h-9 w-9 rounded-full transition-colors shrink-0"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                >
                  <X size={17} />
                </button>
              </div>

              <form onSubmit={onSubmit} className="p-6 space-y-4 overflow-y-auto">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Name" value={form.name} onChange={set('name')} placeholder="Your name" required />
                  <Field label="Email" type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" required />
                </div>
                <div>
                  <label className="eyebrow block mb-2">Message</label>
                  <textarea
                    required
                    autoFocus
                    rows={8}
                    value={form.message}
                    onChange={set('message')}
                    placeholder="Tell me about the role or project… take your time."
                    className="w-full rounded-xl px-4 py-3 text-[15px] leading-relaxed resize-none outline-none"
                    style={{ height: '34vh', minHeight: 180, background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>

                <div className="flex items-center justify-between gap-4 pt-1">
                  <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>
                    {form.message.length} characters · Esc to close
                  </span>
                  <Magnetic>
                  <button type="submit" disabled={status === 'sending'} className="btn btn-primary !px-6">
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        <Send size={15} /> {hasSupabase ? 'Send message' : 'Compose email'}
                      </>
                    )}
                  </button>
                  </Magnetic>
                </div>
                {status === 'error' && (
                  <p className="text-sm text-center" style={{ color: '#dc2626' }}>{err}</p>
                )}
              </form>
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
        className="w-full rounded-xl px-4 py-3.5 text-[15px] outline-none transition-colors"
        style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
        onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
      />
    </div>
  )
}
