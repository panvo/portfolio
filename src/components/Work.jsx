import { ArrowUpRight } from 'lucide-react'
import { workProjects } from '../content/profile'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'

export function Work() {
  return (
    <section id="work" className="py-24 sm:py-28 scroll-mt-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="shell">
        <SectionHeading
          kicker="Selected work"
          title="Projects"
          sub="Products and systems I've built or hardened — from an AI-native QA platform to enterprise information systems."
        />

        <div className="border-t" style={{ borderColor: 'var(--border)' }}>
          {workProjects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <a
                href={p.href}
                className="idx-row group grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-8 py-7 sm:py-9 border-b"
                style={{ borderColor: 'var(--border)' }}
              >
                <span className="font-mono text-sm" style={{ color: 'var(--text-faint)' }}>{p.index}</span>

                <div className="min-w-0">
                  <div className="flex items-center gap-3 idx-name">
                    <h3 className="font-display font-semibold tracking-tight text-2xl sm:text-4xl md:text-5xl truncate">
                      {p.name}
                    </h3>
                    <ArrowUpRight className="idx-arrow shrink-0" size={26} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div className="mt-2 eyebrow idx-name">{p.category}</div>
                </div>

                <div className="flex items-center gap-4">
                  {p.flagship && (
                    <span className="hidden sm:inline-flex chip !py-1 !px-3 !text-[12px]" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                      Flagship
                    </span>
                  )}
                  <span className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>{p.year}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
