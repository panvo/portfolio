import { useState } from 'react'
import { skillHighlights, skillGroups } from '../content/profile'
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal'

export function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-28 scroll-mt-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="shell">
        <div className="grid lg:grid-cols-[0.4fr_1fr] gap-10 lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8" style={{ background: 'var(--accent)' }} />
                <span className="eyebrow">What I do</span>
              </div>
              <p className="text-sm max-w-xs" style={{ color: 'var(--text-faint)' }}>
                From requirements to release — designing, running, and automating the tests that keep enterprise software honest.
              </p>
            </div>
          </Reveal>

          <div>
            {/* big highlight lines */}
            <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {skillHighlights.map((s, i) => (
                <Highlight key={s} label={s} n={i + 1} />
              ))}
            </div>

            {/* detailed groups */}
            <RevealGroup className="mt-14 grid sm:grid-cols-2 gap-x-10 gap-y-8" stagger={0.05}>
              {skillGroups.map((g) => (
                <RevealItem key={g.title}>
                  <div className="eyebrow mb-3">{g.title}</div>
                  <ul className="space-y-1.5">
                    {g.items.map((it) => (
                      <li key={it} className="text-[14px]" style={{ color: 'var(--text-muted)' }}>{it}</li>
                    ))}
                  </ul>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  )
}

function Highlight({ label, n }) {
  const [hover, setHover] = useState(false)
  return (
    <Reveal>
      <div
        className="group flex items-baseline gap-5 py-5 cursor-default"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span className="font-mono text-xs pt-2" style={{ color: 'var(--accent)' }}>
          0{n}
        </span>
        <span
          className="font-display font-medium tracking-tight text-2xl sm:text-4xl md:text-5xl leading-none transition-colors duration-300"
          style={{ color: hover ? 'var(--accent)' : 'var(--text)' }}
        >
          {label}
        </span>
      </div>
    </Reveal>
  )
}
