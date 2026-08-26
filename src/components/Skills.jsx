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

        {/* grouped skills — icon cards */}
        <RevealGroup className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start" stagger={0.07}>
          {skillGroups.map((g) => {
            const Icon = groupIcons[g.title] || Wrench
            return (
              <RevealItem key={g.title}>
                <div
                  className="card p-6 transition-all duration-300 hover:-translate-y-1"
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow)')}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="grid place-items-center h-10 w-10 rounded-xl shrink-0"
                      style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
                    >
                      <Icon size={18} style={{ color: 'var(--accent)' }} />
                    </span>
                    <h3 className="font-display font-semibold tracking-tight">{g.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <span key={it} className="chip !text-[13px]">{it}</span>
                    ))}
                  </div>
                </div>
              </RevealItem>
            )
          })}
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
