import { skillGroups } from '../content/profile'
import { SectionHeading } from './ui/SectionHeading'
import { RevealGroup, RevealItem } from './ui/Reveal'

export function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-28 scroll-mt-24">
      <div className="shell">
        <SectionHeading
          kicker="Toolkit"
          title="Skills & expertise"
          sub="The disciplines and tools I reach for — from test design to SQL validation to shipping AI-assisted tooling."
        />

        <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.06}>
          {skillGroups.map((g) => (
            <RevealItem key={g.title}>
              <div className="glass h-full p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-5">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--cyan)' }} />
                  <h3 className="font-display font-semibold tracking-tight">{g.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
