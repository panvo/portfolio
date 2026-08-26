import { useEffect, useState } from 'react'
import { Linkedin, Github, Mail, ArrowUp } from 'lucide-react'
import { profile } from '../content/profile'
import { bumpVisits } from '../lib/supabase'

export function Footer() {
  const [visits, setVisits] = useState(null)

  useEffect(() => {
    let active = true
    bumpVisits().then((n) => {
      if (active && typeof n === 'number') setVisits(n)
    })
    return () => {
      active = false
    }
  }, [])

  return (
    <footer className="border-t pt-12 pb-10" style={{ borderColor: 'var(--border)' }}>
      <div className="shell">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center h-9 w-9 rounded-xl font-display font-bold text-sm" style={{ background: 'linear-gradient(120deg, var(--violet), var(--cyan))', color: '#08080d' }}>
              JR
            </span>
            <div>
              <div className="font-display font-semibold text-sm">{profile.name}</div>
              <div className="text-xs" style={{ color: 'var(--text-faint)' }}>{profile.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <IconLink href={profile.linkedin} label="LinkedIn"><Linkedin size={17} /></IconLink>
            {profile.github && <IconLink href={profile.github} label="GitHub"><Github size={17} /></IconLink>}
            <IconLink href={`mailto:${profile.email}`} label="Email"><Mail size={17} /></IconLink>
            <a href="#top" className="grid place-items-center h-9 w-9 rounded-full transition-colors" style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }} aria-label="Back to top">
              <ArrowUp size={16} />
            </a>
          </div>
        </div>

        <div className="hairline my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: 'var(--text-faint)' }}>
          <span>© {new Date().getFullYear()} {profile.name}. Built with React, Tailwind & Supabase.</span>
          {visits !== null && (
            <span className="font-mono inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#3ddc84' }} />
              {visits.toLocaleString()} visits
            </span>
          )}
        </div>
      </div>
    </footer>
  )
}

function IconLink({ href, label, children }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      aria-label={label}
      className="grid place-items-center h-9 w-9 rounded-full transition-colors"
      style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
    >
      {children}
    </a>
  )
}
