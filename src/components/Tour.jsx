import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Maximize2, X, ShieldCheck,
  LayoutDashboard, Activity, Brain, MessageSquareText, FlaskConical, Receipt, KanbanSquare, Webhook, MessagesSquare,
  Wand2, ClipboardCheck, Radar,
} from 'lucide-react'
import { tour, tourModules } from '../content/profile'
import { SectionHeading } from './ui/SectionHeading'

/**
 * Interactive product tour. A grouped module list (left) drives a viewer (right)
 * that shows that module's gallery of real screenshots. Modules with more than
 * one shot get a sub-tab pill row. Images render FULL (object-contain, bounded
 * height) — never cropped/truncated. Missing files fall back to a clean tile.
 * Shots live at public/shots/<file>.png.
 */
const icons = { LayoutDashboard, Activity, Brain, MessageSquareText, FlaskConical, Receipt, KanbanSquare, Webhook, MessagesSquare, Wand2, ClipboardCheck, Radar }
const EASE = [0.16, 1, 0.3, 1]

// group modules by category, preserving declaration order
const GROUPS = (() => {
  const order = []
  const map = {}
  tourModules.forEach((m, i) => {
    if (!map[m.category]) { map[m.category] = []; order.push(m.category) }
    map[m.category].push({ ...m, index: i })
  })
  return order.map((cat) => ({ cat, items: map[cat] }))
})()

export function Tour() {
  const [active, setActive] = useState(0) // module index
  const [shotIdx, setShotIdx] = useState(0) // shot within the active module
  const [zoom, setZoom] = useState(null)
  const mod = tourModules[active]
  const shot = mod.shots[shotIdx] || mod.shots[0]

  const selectModule = (i) => { setActive(i); setShotIdx(0) }

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

        <div className="grid grid-cols-1 lg:grid-cols-[286px_1fr] gap-8 lg:gap-10 items-start">
          {/* ── module list — grouped vertical (desktop) / flat strip (mobile) ── */}
          <div className="lg:sticky lg:top-24 min-w-0">
            <div className="flex lg:flex-col gap-2 lg:gap-1 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 -mx-1 px-1 snap-x">
              {GROUPS.map((g) => (
                <div key={g.cat} className="contents lg:block">
                  <div className="hidden lg:block eyebrow !text-[10px] !tracking-[0.14em] mt-5 first:mt-0 mb-1.5 px-3" style={{ color: 'var(--text-faint)' }}>
                    {g.cat}
                  </div>
                  {g.items.map((m) => {
                    const Icon = icons[m.icon] || Brain
                    const on = m.index === active
                    return (
                      <button
                        key={m.id}
                        onClick={() => selectModule(m.index)}
                        aria-pressed={on}
                        className="relative shrink-0 snap-start flex items-center gap-3 rounded-xl px-3 py-2.5 lg:w-full text-left transition-colors duration-200"
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
                        <span className="relative min-w-0 flex items-center gap-2">
                          <span className="font-display font-medium text-[14.5px] leading-tight whitespace-nowrap">{m.name}</span>
                          {m.shots.length > 1 && (
                            <span className="font-mono text-[10px] rounded-full px-1.5 py-0.5" style={{ background: on ? 'color-mix(in srgb, var(--accent) 18%, transparent)' : 'var(--surface-2)', color: 'var(--text-faint)' }}>{m.shots.length}</span>
                          )}
                        </span>
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* ── viewer ── */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div key={mod.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.34, ease: EASE }}>
                <div className="mb-4">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">{mod.name}</h3>
                    <span className="chip !py-0.5 !px-2.5 !text-[11px]" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>{mod.category}</span>
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed max-w-2xl" style={{ color: 'var(--text-muted)' }}>{mod.tagline}</p>
                </div>

                {/* sub-tab pills for multi-shot modules */}
                {mod.shots.length > 1 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {mod.shots.map((s, i) => {
                      const on = i === shotIdx
                      return (
                        <button
                          key={s.file}
                          onClick={() => setShotIdx(i)}
                          className="px-3 py-1.5 rounded-full text-[12.5px] font-medium transition-all duration-200"
                          style={on
                            ? { background: 'var(--text)', color: 'var(--bg)' }
                            : { background: 'var(--surface-2)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                        >
                          {s.label}
                        </button>
                      )
                    })}
                  </div>
                )}

                <ShotFrame mod={mod} shot={shot} onZoom={setZoom} />
              </motion.div>
            </AnimatePresence>

            <p className="mt-6 flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--text-faint)' }}>
              <ShieldCheck size={14} style={{ color: 'var(--accent)' }} />
              Real screens from the live TestOps Hub · pick a module, switch views, or click a shot to enlarge
            </p>
          </div>
        </div>
      </div>

      <Lightbox src={zoom} onClose={() => setZoom(null)} />
    </section>
  )
}

function ShotFrame({ mod, shot, onZoom }) {
  const src = `/shots/${shot.file}.png`
  return (
    <motion.div className="browser" whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
      <div className="browser-bar">
        <span className="browser-dot" style={{ background: '#ff5f57' }} />
        <span className="browser-dot" style={{ background: '#febc2e' }} />
        <span className="browser-dot" style={{ background: '#28c840' }} />
        <span className="ml-3 font-mono text-[12.5px] truncate" style={{ color: 'var(--text-faint)' }}>localhost:8888{mod.route}</span>
        <button
          onClick={() => onZoom(src)}
          className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-mono rounded-md px-2 py-1 shrink-0 transition-colors"
          style={{ color: 'var(--text-faint)', border: '1px solid var(--border)' }}
        >
          <Maximize2 size={12} /> Enlarge
        </button>
      </div>
      <div className="relative" style={{ background: 'var(--bg)' }}>
        <AnimatePresence mode="wait">
          <ShotImage key={shot.file} mod={mod} shot={shot} onZoom={onZoom} />
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function ShotImage({ mod, shot, onZoom }) {
  const [ok, setOk] = useState(true)
  const src = `/shots/${shot.file}.png`
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.26, ease: EASE }}
      className="grid place-items-center p-3 sm:p-4"
      style={{ minHeight: 340 }}
    >
      {ok ? (
        <img
          src={src}
          alt={`${mod.name} — ${shot.label}`}
          loading="lazy"
          decoding="async"
          onError={() => setOk(false)}
          onClick={() => onZoom(src)}
          className="block rounded-lg cursor-zoom-in"
          style={{ maxWidth: '100%', maxHeight: '74vh', width: 'auto', height: 'auto', objectFit: 'contain', border: '1px solid var(--border)' }}
          title="Click to enlarge"
        />
      ) : (
        <ShotPending mod={mod} shot={shot} />
      )}
    </motion.div>
  )
}

function ShotPending({ mod, shot }) {
  const Icon = icons[mod.icon] || Brain
  return (
    <div
      className="grid place-items-center text-center px-8 w-full rounded-lg"
      style={{ aspectRatio: '16 / 10', background: 'linear-gradient(160deg, var(--surface-2), var(--bg) 70%)', border: '1px dashed var(--border)' }}
    >
      <div className="flex flex-col items-center gap-3">
        <span className="grid place-items-center h-14 w-14 rounded-2xl" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff', boxShadow: '0 12px 30px -14px color-mix(in srgb, var(--accent) 60%, transparent)' }}>
          <Icon size={26} />
        </span>
        <div className="font-display font-semibold text-lg">{mod.name}<span style={{ color: 'var(--text-faint)' }}> · {shot.label}</span></div>
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
          style={{ background: 'rgba(6,7,12,0.9)', backdropFilter: 'blur(8px)' }}
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
            style={{ objectFit: 'contain', boxShadow: '0 30px 90px -20px rgba(0,0,0,0.85)' }}
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
