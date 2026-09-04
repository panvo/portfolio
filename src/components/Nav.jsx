import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'

// Fewer, labeled destinations — the ones that matter. Full granularity lives
// in the desktop side-rail; this bar stays calm and unambiguous.
const links = [
  { href: '#top', label: 'Home' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

const EASE = [0.16, 1, 0.3, 1]

export function Nav({ theme, toggle }) {
  const [active, setActive] = useState('#top')
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 })

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1))
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive('#' + e.target.id) }),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  // close the mobile menu on escape
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      {/* scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60]"
        style={{ scaleX: progress, background: 'linear-gradient(90deg, var(--accent), var(--accent-2))' }}
      />

      {/* top scrim — frosted glass fading into the page */}
      <div
        className="fixed top-0 inset-x-0 h-24 z-40 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, color-mix(in srgb, var(--bg) 86%, transparent) 0%, color-mix(in srgb, var(--bg) 42%, transparent) 46%, transparent 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          maskImage: 'linear-gradient(to bottom, #000 0%, #000 52%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 52%, transparent 100%)',
        }}
      />

      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed left-1/2 -translate-x-1/2 z-50"
        style={{ top: 'calc(env(safe-area-inset-top, 0px) + 1.25rem)' }}
      >
        <div
          className="flex items-center gap-1 rounded-full p-1.5"
          style={{
            background: 'color-mix(in srgb, var(--bg) 94%, transparent)',
            border: '1px solid var(--border-strong)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: 'var(--shadow)',
          }}
        >
          {/* desktop: labeled links */}
          <div className="hidden sm:flex items-center gap-0.5">
            {links.map(({ href, label }) => {
              const on = active === href
              return (
                <a
                  key={href}
                  href={href}
                  className="relative px-3.5 py-2 rounded-full text-[13px] font-medium transition-colors"
                  style={{ color: on ? 'var(--bg)' : 'var(--text-muted)' }}
                >
                  {on && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'var(--text)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </a>
              )
            })}
          </div>

          {/* mobile: menu trigger */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="sm:hidden inline-flex items-center gap-1.5 pl-3 pr-3.5 py-2 rounded-full text-[13px] font-medium"
            style={{ color: 'var(--text-muted)' }}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
            Menu
          </button>

          <span className="w-px h-5 mx-0.5 sm:mx-1 shrink-0" style={{ background: 'var(--border)' }} />

          <button
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title="Toggle theme"
            className="relative grid place-items-center h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden transition-colors shrink-0"
            style={{ color: 'var(--text-muted)' }}
          >
            <motion.span
              key={theme}
              initial={{ y: 12, opacity: 0, rotate: -30 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="grid place-items-center"
            >
              {theme === 'dark' ? <Moon size={17} /> : <Sun size={17} />}
            </motion.span>
          </button>
        </div>

        {/* mobile dropdown sheet */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="sm:hidden absolute left-1/2 -translate-x-1/2 mt-2 w-[min(78vw,240px)] rounded-2xl overflow-hidden p-1.5"
              style={{
                background: 'color-mix(in srgb, var(--bg) 96%, transparent)',
                border: '1px solid var(--border-strong)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: 'var(--shadow)',
              }}
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.22, ease: EASE }}
            >
              {links.map(({ href, label }) => {
                const on = active === href
                return (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-medium transition-colors"
                    style={{ color: on ? 'var(--accent-text)' : 'var(--text)', background: on ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'transparent' }}
                  >
                    {label}
                    {on && <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />}
                  </a>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
