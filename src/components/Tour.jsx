import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Maximize2, X, ShieldCheck, Plus, Minus, ChevronLeft, ChevronRight,
  LayoutDashboard, Activity, Brain, MessageSquareText, FlaskConical, Receipt, KanbanSquare, Webhook, MessagesSquare,
  Wand2, ClipboardCheck, Radar,
} from 'lucide-react'
import { tour, tourModules } from '../content/profile'
import { SectionHeading } from './ui/SectionHeading'

/**
 * Interactive product tour. A grouped module list (left) drives a viewer (right)
 * that shows that module's gallery of real screenshots. Clicking a shot opens a
 * premium lightbox: fit-to-screen by default (whole image visible), true zoom via
 * real dimensions inside a scrollable stage (wheel + scrollbar scroll large/zoomed
 * images), ← → to switch views, ↑ ↓ to switch modules, thumbnails + an info bar.
 * Shots: public/shots/<file>.png.
 */
const icons = { LayoutDashboard, Activity, Brain, MessageSquareText, FlaskConical, Receipt, KanbanSquare, Webhook, MessagesSquare, Wand2, ClipboardCheck, Radar }
const EASE = [0.16, 1, 0.3, 1]

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
  const [active, setActive] = useState(0)
  const [shotIdx, setShotIdx] = useState(0)
  const [light, setLight] = useState(null) // { modIndex, index } | null
  const mod = tourModules[active]
  const shot = mod.shots[shotIdx] || mod.shots[0]

  // a module card in the overview grid can open a module here
  useEffect(() => {
    const onSel = (e) => {
      const i = e.detail
      if (typeof i === 'number' && i >= 0 && i < tourModules.length) { setActive(i); setShotIdx(0) }
    }
    window.addEventListener('tour:select', onSel)
    return () => window.removeEventListener('tour:select', onSel)
  }, [])

  const selectModule = (i) => { setActive(i); setShotIdx(0) }
  const openLight = () => setLight({ modIndex: active, index: shotIdx })
  const goto = (i) => { setLight((l) => (l ? { ...l, index: i } : l)); setShotIdx(i) }
  const nav = (dir) => setLight((l) => {
    if (!l) return l
    const shots = tourModules[l.modIndex].shots
    const n = (l.index + dir + shots.length) % shots.length
    setShotIdx(n)
    return { ...l, index: n }
  })
  const navModule = (dir) => setLight((l) => {
    if (!l) return l
    const n = (l.modIndex + dir + tourModules.length) % tourModules.length
    setActive(n); setShotIdx(0)
    return { modIndex: n, index: 0 }
  })

  return (
    <section id="tour" className="py-24 sm:py-32 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="shell">
        <SectionHeading kicker={tour.kicker} title={tour.title} sub={tour.sub} />

        <div className="grid grid-cols-1 lg:grid-cols-[286px_1fr] gap-8 lg:gap-10 items-start">
          {/* ── module list ── */}
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
                          <motion.span layoutId="tour-active" className="absolute inset-0 rounded-xl" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-strong)' }} transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                        )}
                        <span
                          className="relative grid place-items-center h-9 w-9 rounded-lg shrink-0 transition-all duration-200"
                          style={on
                            ? { background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff', boxShadow: '0 8px 20px -10px color-mix(in srgb, var(--accent) 60%, transparent)' }
                            : { background: 'var(--surface-2)', color: 'var(--accent)', border: '1px solid var(--border)' }}
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
                    <span className="chip !py-0.5 !px-2.5 !text-[11px]" style={{ borderColor: 'var(--accent)', color: 'var(--accent-text)' }}>{mod.category}</span>
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed max-w-2xl" style={{ color: 'var(--text-muted)' }}>{mod.tagline}</p>
                </div>

                {mod.shots.length > 1 && (mod.shots.some((s) => s.group) ? (
                  <div className="space-y-2.5 mb-4">
                    {/* tool selector */}
                    <div className="flex flex-wrap gap-2">
                      {[...new Set(mod.shots.map((s) => s.group))].map((gp) => {
                        const on = shot.group === gp
                        const first = mod.shots.findIndex((s) => s.group === gp)
                        return (
                          <button key={gp} onClick={() => setShotIdx(first)}
                            className="px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200"
                            style={on ? { background: 'var(--text)', color: 'var(--bg)' } : { background: 'var(--surface-2)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                            {gp}
                          </button>
                        )
                      })}
                    </div>
                    {/* view within the active tool */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="eyebrow !text-[10px] mr-1" style={{ color: 'var(--text-faint)' }}>View</span>
                      {mod.shots.map((s, i) => ({ s, i })).filter((x) => x.s.group === shot.group).map(({ s, i }) => {
                        const on = i === shotIdx
                        return (
                          <button key={s.file} onClick={() => setShotIdx(i)}
                            className="px-2.5 py-1 rounded-md text-[12px] font-medium transition-all duration-200"
                            style={on ? { background: 'color-mix(in srgb, var(--accent) 18%, transparent)', color: 'var(--accent-text)', border: '1px solid color-mix(in srgb, var(--accent) 45%, transparent)' } : { color: 'var(--text-faint)', border: '1px solid var(--border)' }}>
                            {s.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {mod.shots.map((s, i) => {
                      const on = i === shotIdx
                      return (
                        <button key={s.file} onClick={() => setShotIdx(i)}
                          className="px-3 py-1.5 rounded-full text-[12.5px] font-medium transition-all duration-200"
                          style={on ? { background: 'var(--text)', color: 'var(--bg)' } : { background: 'var(--surface-2)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                          {s.label}
                        </button>
                      )
                    })}
                  </div>
                ))}

                <ShotFrame mod={mod} shot={shot} onOpen={openLight} />
              </motion.div>
            </AnimatePresence>

            <p className="mt-6 flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--text-faint)' }}>
              <ShieldCheck size={14} style={{ color: 'var(--accent)' }} />
              Real screens from the live TestOps Hub · pick a module, switch views, or click a shot to enlarge
            </p>
          </div>
        </div>
      </div>

      <Lightbox state={light} onClose={() => setLight(null)} onNav={nav} onNavModule={navModule} onGoto={goto} />
    </section>
  )
}

function ShotFrame({ mod, shot, onOpen }) {
  const src = `/shots/${shot.file}.png`
  return (
    <motion.div className="browser" whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
      <div className="browser-bar">
        <span className="browser-dot" style={{ background: '#ff5f57' }} />
        <span className="browser-dot" style={{ background: '#febc2e' }} />
        <span className="browser-dot" style={{ background: '#28c840' }} />
        <span className="ml-3 font-mono text-[12.5px] truncate" style={{ color: 'var(--text-faint)' }}>localhost:8888{mod.route}</span>
        <button onClick={onOpen} className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-mono rounded-md px-2 py-1 shrink-0 transition-colors" style={{ color: 'var(--text-faint)', border: '1px solid var(--border)' }}>
          <Maximize2 size={12} /> Enlarge
        </button>
      </div>
      <div className="relative" style={{ background: 'var(--bg)' }}>
        <AnimatePresence mode="wait">
          <ShotImage key={shot.file} mod={mod} shot={shot} src={src} onOpen={onOpen} />
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function ShotImage({ mod, shot, src, onOpen }) {
  const [ok, setOk] = useState(true)
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.26, ease: EASE }} className="grid place-items-center p-3 sm:p-4" style={{ minHeight: 340 }}>
      {ok ? (
        <img
          src={src}
          alt={`${mod.name} — ${shot.label}`}
          loading="lazy"
          decoding="async"
          onError={() => setOk(false)}
          onClick={onOpen}
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
    <div className="grid place-items-center text-center px-8 w-full rounded-lg" style={{ aspectRatio: '16 / 10', background: 'linear-gradient(160deg, var(--surface-2), var(--bg) 70%)', border: '1px dashed var(--border)' }}>
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

function CtrlBtn({ onClick, disabled, label, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="grid place-items-center h-9 w-9 rounded-lg transition-colors disabled:opacity-30"
      style={{ color: '#fff', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)' }}
    >
      {children}
    </button>
  )
}

function Lightbox({ state, onClose, onNav, onNavModule, onGoto }) {
  const [zoom, setZoom] = useState(1)
  const [nat, setNat] = useState({ w: 0, h: 0 })
  const [box, setBox] = useState({ w: 0, h: 0 })
  const stageRef = useRef(null)
  const drag = useRef(null)

  const mod = state ? tourModules[state.modIndex] : null
  const shots = mod ? mod.shots : []
  const shot = mod ? shots[state.index] : null
  const many = shots.length > 1

  useEffect(() => { setZoom(1) }, [state?.modIndex, state?.index])

  // measure the stage so we can size the image in real pixels (enables scrollbars)
  useEffect(() => {
    if (!state) return
    const measure = () => { const el = stageRef.current; if (el) setBox({ w: el.clientWidth, h: el.clientHeight }) }
    measure()
    const id = setTimeout(measure, 60)
    window.addEventListener('resize', measure)
    return () => { clearTimeout(id); window.removeEventListener('resize', measure) }
  }, [state])

  const PAD = 48
  const fit = nat.w && box.w ? Math.min((box.w - PAD) / nat.w, (box.h - PAD) / nat.h) : 0
  const dispW = fit ? Math.round(nat.w * fit * zoom) : null
  const dispH = fit ? Math.round(nat.h * fit * zoom) : null

  const zoomBy = (d) => setZoom((z) => Math.min(4, Math.max(1, +(z + d).toFixed(2))))

  useEffect(() => {
    if (!state) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onNav(1)
      else if (e.key === 'ArrowLeft') onNav(-1)
      else if (e.key === 'ArrowDown') { e.preventDefault(); onNavModule(1) }
      else if (e.key === 'ArrowUp') { e.preventDefault(); onNavModule(-1) }
      else if (e.key === '+' || e.key === '=') zoomBy(0.5)
      else if (e.key === '-' || e.key === '_') zoomBy(-0.5)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state, onNav, onNavModule, onClose])

  // grab-to-scroll when the image is larger than the stage
  const zoomed = zoom > 1
  const onPointerDown = (e) => { const el = stageRef.current; if (!el || !zoomed) return; drag.current = { x: e.clientX, y: e.clientY, l: el.scrollLeft, t: el.scrollTop } }
  const onPointerMove = (e) => { const el = stageRef.current; if (!el || !drag.current) return; el.scrollLeft = drag.current.l - (e.clientX - drag.current.x); el.scrollTop = drag.current.t - (e.clientY - drag.current.y) }
  const endDrag = () => { drag.current = null }

  const Icon = mod ? (icons[mod.icon] || Brain) : Brain

  return (
    <AnimatePresence>
      {state && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: 'rgba(6,7,12,0.95)', backdropFilter: 'blur(10px)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* top info + controls */}
          <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 shrink-0" onClick={(e) => e.stopPropagation()}>
            <div className="min-w-0 flex items-center gap-3">
              <span className="grid place-items-center h-9 w-9 rounded-lg shrink-0" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff' }}>
                <Icon size={17} />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-display font-semibold text-white truncate">{mod.name}</span>
                  <span className="font-mono text-[11px] rounded-full px-2 py-0.5 shrink-0" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.75)' }}>{shot.group ? `${shot.group} · ${shot.label}` : shot.label}</span>
                </div>
                <div className="font-mono text-[11.5px] truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>localhost:8888{mod.route} · {state.index + 1} / {shots.length}</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <CtrlBtn onClick={() => zoomBy(-0.5)} disabled={zoom <= 1} label="Zoom out"><Minus size={16} /></CtrlBtn>
              <span className="font-mono text-[12px] w-11 text-center tabular-nums" style={{ color: 'rgba(255,255,255,0.8)' }}>{Math.round(zoom * 100)}%</span>
              <CtrlBtn onClick={() => zoomBy(0.5)} disabled={zoom >= 4} label="Zoom in"><Plus size={16} /></CtrlBtn>
              <span className="w-px h-6 mx-1" style={{ background: 'rgba(255,255,255,0.16)' }} />
              <CtrlBtn onClick={onClose} label="Close"><X size={17} /></CtrlBtn>
            </div>
          </div>

          {/* stage (scrollable) */}
          <div className="relative flex-1 min-h-0">
            {many && (
              <>
                <button onClick={(e) => { e.stopPropagation(); onNav(-1) }} aria-label="Previous view" className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 grid place-items-center h-11 w-11 rounded-full transition-transform hover:scale-105" style={{ color: '#fff', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)' }}>
                  <ChevronLeft size={22} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); onNav(1) }} aria-label="Next view" className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 grid place-items-center h-11 w-11 rounded-full transition-transform hover:scale-105" style={{ color: '#fff', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)' }}>
                  <ChevronRight size={22} />
                </button>
              </>
            )}
            <div
              ref={stageRef}
              className="absolute inset-0 overflow-auto"
              onClick={onClose}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerLeave={endDrag}
              style={{ cursor: zoomed ? (drag.current ? 'grabbing' : 'grab') : 'default' }}
            >
              <div style={{ minWidth: '100%', minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${state.modIndex}-${state.index}`}
                    src={`/shots/${shot.file}.png`}
                    alt={`${mod.name} — ${shot.label}`}
                    draggable={false}
                    onLoad={(e) => setNat({ w: e.target.naturalWidth, h: e.target.naturalHeight })}
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
                    className="rounded-lg select-none block"
                    style={dispW
                      ? { width: dispW, height: dispH, maxWidth: 'none', flexShrink: 0, boxShadow: '0 30px 90px -20px rgba(0,0,0,0.85)', border: '1px solid rgba(255,255,255,0.1)' }
                      : { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', boxShadow: '0 30px 90px -20px rgba(0,0,0,0.85)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* thumbnails */}
          {many && (
            <div className="flex items-center justify-center gap-2 px-4 py-3 overflow-x-auto shrink-0" onClick={(e) => e.stopPropagation()}>
              {shots.map((s, i) => {
                const on = i === state.index
                return (
                  <button key={s.file} onClick={() => onGoto(i)} title={s.label} className="relative h-12 w-20 rounded-md overflow-hidden shrink-0 transition-all duration-200" style={{ border: on ? '2px solid var(--accent)' : '1px solid rgba(255,255,255,0.14)', opacity: on ? 1 : 0.55 }}>
                    <img src={`/shots/${s.file}.png`} alt={s.label} loading="lazy" className="w-full h-full object-cover object-top" />
                  </button>
                )
              })}
            </div>
          )}

          <div className="hidden sm:block text-center pb-2 font-mono text-[10.5px]" style={{ color: 'rgba(255,255,255,0.4)' }} onClick={(e) => e.stopPropagation()}>
            +/− to zoom · scroll or drag to move · ← → views · ↑ ↓ modules · Esc to close
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
