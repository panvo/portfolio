import { useEffect, useState } from 'react'
import { Linkedin, Github, Mail, ArrowUp, MapPin } from 'lucide-react'
import { profile } from '../content/profile'
import { bumpVisits } from '../lib/supabase'
import { Reveal } from './ui/Reveal'

export function Footer() {
  const [visits, setVisits] = useState(null)

  useEffect(() => {
    let active = true
    bumpVisits().then((n) => {
      if (active && typeof n === 'number') setVisits(n)
    })
    return () => { active = false }
  }, [])

  return (
    <footer className="border-t pt-14 pb-10" style={{ borderColor: 'var(--border)' }}>
      <div className="shell">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            {/* wordmark — the only place the name appears */}
            <div>
              <a href="#top" className="font-display font-bold tracking-tight text-2xl sm:text-3xl inline-block leading-none">
                {profile.name}<span style={{ color: 'var(--accent)' }}>.</span>
              </a>
              <p className="mt-3 text-[14px]" style={{ color: 'var(--text-muted)' }}>{profile.role}</p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-[13px]" style={{ color: 'var(--text-faint)' }}>
                <MapPin size={13} /> {profile.location}
              </p>
            </div>

            {/* socials + back-to-top */}
            <div className="flex items-center gap-2.5">
              <IconLink href={profile.linkedin} label="LinkedIn"><Linkedin size={16} /></IconLink>
              <IconLink href="#contact" label="Email"><Mail size={16} /></IconLink>
              {profile.github && <IconLink href={profile.github} label="GitHub"><Github size={16} /></IconLink>}
              <a href="#top" className="grid place-items-center h-9 w-9 rounded-full transition-all duration-200 hover:-translate-y-0.5" style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }} aria-label="Back to top">
                <ArrowUp size={16} />
              </a>
            </div>
          </div>

          <div className="hairline my-8" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[12.5px]" style={{ color: 'var(--text-faint)' }}>
            <span>© {new Date().getFullYear()} · Designed &amp; built with React, Tailwind &amp; Supabase</span>
            {visits !== null && (
              <span className="font-mono inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#22c55e' }} />
                {visits.toLocaleString()} visits
              </span>
            )}
          </div>
        </Reveal>
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
      className="grid place-items-center h-9 w-9 rounded-full transition-all duration-200 hover:-translate-y-0.5"
      style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent) 50%, var(--border))' }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
    >
      {children}
    </a>
  )
}
