import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { profile } from '../content/profile'

const links = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="shell">
        <div
          className="mt-4 flex items-center justify-between rounded-full px-4 sm:px-5 py-2.5 transition-all duration-300"
          style={{
            background: scrolled ? 'rgba(12,12,20,0.72)' : 'transparent',
            border: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
            backdropFilter: scrolled ? 'blur(14px)' : 'none',
          }}
        >
          <a href="#top" className="flex items-center gap-2.5 group">
            <span
              className="grid place-items-center h-8 w-8 rounded-xl font-display font-bold text-sm"
              style={{ background: 'linear-gradient(120deg, var(--violet), var(--cyan))', color: '#08080d' }}
            >
              JR
            </span>
            <span className="font-display font-semibold text-sm tracking-tight hidden sm:block">
              {profile.name}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3.5 py-2 rounded-full text-sm transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contact" className="btn btn-primary hidden sm:inline-flex !py-2 !px-4 text-sm">
              Get in touch
            </a>
            <button
              className="md:hidden grid place-items-center h-9 w-9 rounded-full"
              style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden shell mt-2"
          >
            <div className="glass p-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
