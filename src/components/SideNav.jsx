import { useEffect, useState } from 'react'
import { Home, User, Wrench, FolderKanban, MonitorPlay, Briefcase, BadgeCheck, Mail } from 'lucide-react'

const items = [
  { href: '#top', label: 'Home', Icon: Home },
  { href: '#about', label: 'About', Icon: User },
  { href: '#skills', label: 'Skills', Icon: Wrench },
  { href: '#work', label: 'Flagship', Icon: FolderKanban },
  { href: '#tour', label: 'Tour', Icon: MonitorPlay },
  { href: '#experience', label: 'Experience', Icon: Briefcase },
  { href: '#certifications', label: 'Certifications', Icon: BadgeCheck },
  { href: '#contact', label: 'Contact', Icon: Mail },
]

/** Vertical section rail (desktop) — small icons, scroll-spy active state, label on hover. */
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
    <nav className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-1" aria-label="Section navigation">
      {items.map(({ href, label, Icon }) => {
        const on = active === href
        return (
          <a key={href} href={href} className="group flex items-center gap-2 justify-end" aria-label={label} title={label}>
            <span
              className="text-[11px] font-mono px-2 py-1 rounded-md opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap"
              style={{ color: on ? 'var(--accent-text)' : 'var(--text)', background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              {label}
            </span>
            <span
              className={`grid place-items-center h-8 w-8 rounded-lg transition-colors duration-200 ${
                on ? '' : 'text-[color:var(--text-faint)] group-hover:text-[color:var(--text)]'
              }`}
              style={on ? { background: 'color-mix(in srgb, var(--accent) 15%, transparent)', color: 'var(--accent)' } : undefined}
            >
              <Icon size={16} />
            </span>
          </a>
        )
      })}
    </nav>
  )
}
