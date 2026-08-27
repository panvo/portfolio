import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Maximize2, X, ShieldCheck, ArrowUpRight,
  LayoutDashboard, Activity, Brain, MessageSquareText, FlaskConical, Receipt, KanbanSquare, Webhook, MessagesSquare,
} from 'lucide-react'
import { tour, tourModules } from '../content/profile'
import { SectionHeading } from './ui/SectionHeading'

/**
 * Interactive product tour — a tab list (left) swaps a real screenshot of each
 * TestOps Hub module into a big browser-frame viewer (right). Screenshots live at
 * public/shots/<shot>.png; a missing shot falls back to a labelled placeholder so
 * the section never breaks.
 */
const icons = { LayoutDashboard, ShieldCheck, Activity, Brain, MessageSquareText, FlaskConical, Receipt, KanbanSquare, Webhook, MessagesSquare }
const EASE = [0.16, 1, 0.3, 1]

export function Tour() {
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState(null)
  const mod = tourModules[active]

  useEffect(() => {
    if (!zoom) return
    const onKey = (e) => e.key === 'Escape' && setZoom(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoom])

  return (
    <section id="tour" className="py-24 sm:py-32 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="shell">
        <SectionHeading kicker={tour.kicker} title={tour.title} sub={tour.sub} />

        <div className="grid lg:grid-cols-[290px_1fr] gap-8 lg:gap-10 items-start">
          {/* ── tab list (vertical on desktop, horizontal strip on mobile) ── */}
          <div className="lg:sticky lg:top-24">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 -mx-1 px-1 snap-x scroll-px-1">
              {tourModules.map((m, i) => {
                const Icon = icons[m.icon] || Brain
                const on = i === active
                return (
                  <button
                    key={m.id}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className="relative shrink-0 snap-start flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200"
                    style={{ color: on ? 'var(--text)' : 'var(--text-muted)' }}
                  >
                    {on && (
                      <motion.span
                        layoutId="tour-active"
                        className="absolute inset-0 rounded-xl"
                        style={{ background: 'var(--surface-2)', border: '1px solid var(--border-strong)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span
                      className="relative grid place-items-center h-9 w-9 rounded-lg shrink-0 transition-all duration-200"
                      style={
                        on
                          ? { background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff', boxShadow: '0 8px 20px -10px color-mix(in srgb, var(--accent) 60%, transparent)' }
                          : { background: 'var(--surface-2)', color: 'var(--accent)', border: '1px solid var(--border)' }
                      }
                    >
                      <Icon size={17} />
                    </span>
                    <span className="relative min-w-0">
                      <span className="block font-display font-medium text-[14.5px] leading-tight whitespace-nowrap">{m.name}</span>
                      <span className="block eyebrow !text-[10px] !tracking-[0.12em] mt-0.5">{m.category}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── viewer ── */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.38, ease: EASE }}
              >
                <div className="mb-4">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">{mod.name}</h3>
                    <span className="chip !py-0.5 !px-2.5 !text-[11px]" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>{mod.category}</span>
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed max-w-2xl" style={{ color: 'var(--text-muted)' }}>{mod.tagline}</p>
                </div>

                <BrowserFrame mod={mod} onZoom={setZoom} />
              </motion.div>
            </AnimatePresence>

            <p className="mt-6 flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--text-faint)' }}>
              <ShieldCheck size={14} style={{ color: 'var(--accent)' }} />
              Real screens from the live TestOps Hub · pick a module on the left, or click the frame to enlarge
            </p>
          </div>
        </div>
      </div>

      <Lightbox src={zoom} onClose={() => setZoom(null)} />
    </section>
  )
}

function BrowserFrame({ mod, onZoom }) {
  const [ok, setOk] = useState(true)
  const src = `/shots/${mod.shot}.png`
  return (
    <motion.div className="browser" whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
      <div className="browser-bar">
        <span className="browser-dot" style={{ background: '#ff5f57' }} />
        <span className="browser-dot" style={{ background: '#febc2e' }} />
        <span className="browser-dot" style={{ background: '#28c840' }} />
        <span className="ml-3 font-mono text-[12.5px] truncate" style={{ color: 'var(--text-faint)' }}>localhost:8888{mod.route}</span>
        {ok && (
          <button
            onClick={() => onZoom(src)}
            className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-mono rounded-md px-2 py-1 shrink-0 transition-colors"
            style={{ color: 'var(--text-faint)', border: '1px solid var(--border)' }}
          >
            <Maximize2 size={12} /> Enlarge
          </button>
        )}
      </div>
      {ok ? (
        <div className="p-3 sm:p-4" style={{ background: 'var(--bg)' }}>
          <img
            src={src}
            alt={mod.name}
            loading="lazy"
            decoding="async"
            className="block w-full rounded-lg cursor-zoom-in"
            style={{ aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: 'top', border: '1px solid var(--border)' }}
            title="Click to enlarge"
            onClick={() => onZoom(src)}
            onError={() => setOk(false)}
          />
        </div>
      ) : (
        <ShotPending mod={mod} />
      )}
    </motion.div>
  )
}

function ShotPending({ mod }) {
  const Icon = icons[mod.icon] || Brain
  return (
    <div
      className="grid place-items-center text-center px-8"
      style={{ aspectRatio: '16 / 10', background: 'linear-gradient(160deg, var(--surface-2), var(--bg) 70%)' }}
    >
      <div className="flex flex-col items-center gap-3">
        <span
          className="grid place-items-center h-14 w-14 rounded-2xl"
          style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff', boxShadow: '0 12px 30px -14px color-mix(in srgb, var(--accent) 60%, transparent)' }}
        >
          <Icon size={26} />
        </span>
        <div className="font-display font-semibold text-lg">{mod.name}</div>
        <div className="inline-flex items-center gap-1.5 font-mono text-[11px]" style={{ color: 'var(--text-faint)' }}>
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} /> screenshot coming
        </div>
      </div>
    </div>
  )
}

function Lightbox({ src, onClose }) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-10"
          style={{ background: 'rgba(6,7,12,0.88)', backdropFilter: 'blur(8px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 grid place-items-center h-10 w-10 rounded-full"
            style={{ border: '1px solid var(--border-strong)', color: '#fff', background: 'rgba(255,255,255,0.06)' }}
          >
            <X size={18} />
          </button>
          <motion.img
            src={src}
            alt="Enlarged screenshot"
            className="max-w-full max-h-full rounded-xl"
            style={{ boxShadow: '0 30px 90px -20px rgba(0,0,0,0.85)' }}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
