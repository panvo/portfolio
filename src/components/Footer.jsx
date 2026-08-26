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
    <footer className="border-t pt-10 pb-10" style={{ borderColor: 'var(--border)' }}>
      <div className="shell">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <a href="#top" className="font-display font-semibold tracking-tight text-lg">
            {profile.name}<span style={{ color: 'var(--accent)' }}>.</span>
          </a>

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

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px]" style={{ color: 'var(--text-faint)' }}>
          <span>© {new Date().getFullYear()} {profile.name}. Built with React, Tailwind & Supabase.</span>
          {visits !== null && (
            <span className="font-mono inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#22c55e' }} />
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
