import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Home, FolderKanban, Briefcase, Wrench, BadgeCheck, Mail } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { href: '#top', label: 'Home', Icon: Home },
  { href: '#work', label: 'Work', Icon: FolderKanban },
  { href: '#experience', label: 'Experience', Icon: Briefcase },
  { href: '#skills', label: 'Skills', Icon: Wrench },
  { href: '#certifications', label: 'Certifications', Icon: BadgeCheck },
  { href: '#contact', label: 'Contact', Icon: Mail },
]

export function Nav({ theme, toggle }) {
  const [active, setActive] = useState('#top')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 })

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1))
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive('#' + e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60]"
        style={{ scaleX: progress, background: 'var(--accent)' }}
      />

      {/* top scrim — frosted glass. Blurs content passing under the nav, then the
          frost + tint dissolve into the page via a bottom mask (no hard edge). */}
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

      {/* pill nav */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50"
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
          {links.map(({ href, label, Icon }) => {
            const on = active === href
            return (
              <a
                key={href}
                href={href}
                aria-label={label}
                title={label}
                className="relative grid place-items-center h-10 w-10 rounded-full transition-colors"
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
                <span className="relative z-10">
                  <Icon size={18} />
                </span>
              </a>
            )
          })}
        </div>
      </motion.nav>

      {/* theme toggle, floating top-right */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 right-6 z-50"
      >
        <ThemeToggle theme={theme} toggle={toggle} />
      </motion.div>
    </>
  )
}
