import { useState } from 'react'
import { ArrowUpRight, FlaskConical, PenTool, Database, Sparkles, Workflow, Wrench } from 'lucide-react'
import { skillHighlights, skillGroups } from '../content/profile'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal'

const groupIcons = {
  Testing: FlaskConical,
  'Design & Analysis': PenTool,
  Databases: Database,
  'Build & AI': Sparkles,
  'Process & Tools': Workflow,
}

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

        {/* grouped skills — balanced full-width rows */}
        <div className="mt-14 border-t" style={{ borderColor: 'var(--border)' }}>
          {skillGroups.map((g, i) => {
            const Icon = groupIcons[g.title] || Wrench
            return (
              <Reveal key={g.title}>
                <div className="group grid md:grid-cols-[280px_1fr] gap-4 md:gap-10 py-7 border-b" style={{ borderColor: 'var(--border)' }}>
                  {/* left: label */}
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs w-5" style={{ color: 'var(--text-faint)' }}>0{i + 1}</span>
                    <span
                      className="grid place-items-center h-11 w-11 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                        color: '#fff',
                        boxShadow: '0 8px 22px -10px color-mix(in srgb, var(--accent) 65%, transparent)',
                      }}
                    >
                      <Icon size={19} />
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-lg tracking-tight leading-tight">{g.title}</h3>
                      <span className="text-[12px]" style={{ color: 'var(--text-faint)' }}>{g.items.length} skills</span>
                    </div>
                  </div>
                  {/* right: chips */}
                  <div className="flex flex-wrap gap-2 md:content-center">
                    {g.items.map((it) => (
                      <span key={it} className="chip !text-[13px]">{it}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
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
