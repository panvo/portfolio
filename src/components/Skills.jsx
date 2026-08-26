import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { skillHighlights, skillGroups } from '../content/profile'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal'

export function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32 scroll-mt-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="shell">
        <SectionHeading
          kicker="Toolkit"
          title="Skills & expertise"
          sub="From requirements to release — designing, running, and automating the tests that keep enterprise software honest."
        />

        {/* headline capabilities */}
        <div className="border-t" style={{ borderColor: 'var(--border)' }}>
          {skillHighlights.map((label, i) => (
            <Reveal key={label}>
              <Capability label={label} n={i + 1} />
            </Reveal>
          ))}
        </div>

        {/* grouped skills — balanced, full-width grid */}
        <RevealGroup className="mt-16 grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-11" stagger={0.07}>
          {skillGroups.map((g) => (
            <RevealItem key={g.title}>
              <div className="pt-4 border-t" style={{ borderColor: 'var(--border-strong)' }}>
                <div className="eyebrow mb-4">{g.title}</div>
                <ul className="space-y-2.5">
                  {g.items.map((it) => (
                    <li key={it} className="text-[15px]" style={{ color: 'var(--text-muted)' }}>{it}</li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

function Capability({ label, n }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      className="group flex items-center gap-5 sm:gap-8 py-6 border-b cursor-default"
      style={{ borderColor: 'var(--border)' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="font-mono text-sm shrink-0" style={{ color: 'var(--accent)' }}>0{n}</span>
      <span
        className="flex-1 font-display font-medium tracking-tight text-2xl sm:text-4xl md:text-[2.75rem] leading-tight transition-colors duration-300"
        style={{ color: hover ? 'var(--accent)' : 'var(--text)' }}
      >
        {label}
      </span>
      <ArrowUpRight
        size={26}
        className="shrink-0 transition-all duration-300"
        style={{ color: 'var(--accent)', opacity: hover ? 1 : 0, transform: hover ? 'translate(0,0)' : 'translate(-8px,8px)' }}
      />
    </div>
  )
}
