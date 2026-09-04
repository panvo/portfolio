import { useEffect, useState } from 'react'

const items = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#work', label: 'Flagship' },
  { href: '#tour', label: 'Tour' },
  { href: '#experience', label: 'Experience' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
]

/** Vertical section dots (desktop) — scroll-spy active state + labels on hover. */
export function SideNav() {
  const [active, setActive] = useState('#top')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive('#' + e.target.id) }),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    items.forEach((it) => { const el = document.getElementById(it.href.slice(1)); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <nav className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3.5" aria-label="Section navigation">
      {items.map((it) => {
        const on = active === it.href
        return (
          <a key={it.href} href={it.href} className="group flex items-center gap-2.5 justify-end" aria-label={it.label} title={it.label}>
            <span
              className="text-[11px] font-mono opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
              style={{ color: on ? 'var(--accent-text)' : 'var(--text-faint)' }}
            >
              {it.label}
            </span>
            <span
              className="rounded-full transition-all duration-300"
              style={on ? { width: 10, height: 10, background: 'var(--accent)' } : { width: 7, height: 7, background: 'var(--border-strong)' }}
            />
          </a>
        )
      })}
    </nav>
  )
}
