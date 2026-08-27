import { Sparkles } from 'lucide-react'
import { flagship } from '../content/profile'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { Metric } from './ui/Metric'
import { SpotlightCard } from './ui/SpotlightCard'

export function Flagship() {
  return (
    <section id="work" className="pt-24 sm:pt-32 pb-16 scroll-mt-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="shell">
        <SectionHeading
          kicker="Selected work"
          title="The flagship"
          sub="TestOps Hub — the platform I'm building to fix enterprise QA end to end."
        />

        <SpotlightCard className="card overflow-hidden" style={{ boxShadow: 'var(--shadow)' }}>
          <div className="grid lg:grid-cols-[1.25fr_1fr]">
            {/* left */}
            <div className="p-8 sm:p-12 border-b lg:border-b-0 lg:border-r" style={{ borderColor: 'var(--border)' }}>
              <Reveal>
                <div className="inline-flex items-center gap-2 chip mb-6">
                  <Sparkles size={14} style={{ color: 'var(--accent)' }} /> AI-native platform
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h3 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight leading-none">
                  {flagship.name}
                </h3>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-3 text-lg" style={{ color: 'var(--accent)' }}>{flagship.tagline}</p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-6 max-w-xl text-[15px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {flagship.summary}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-7 flex flex-wrap gap-2">
                  {flagship.stack.map((s) => (
                    <span key={s} className="chip !py-1 !px-3 !text-[13px] font-mono">{s}</span>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="mt-8 eyebrow">{flagship.period}</div>
              </Reveal>
            </div>

            {/* right — metrics */}
            <Reveal delay={0.15}>
              <div
                className="p-8 sm:p-12 flex flex-col justify-center gap-8 h-full"
                style={{ background: 'var(--surface-2)' }}
              >
                {flagship.metrics.map((m, i) => (
                  <Metric key={m.label} {...m} accent={i === flagship.metrics.length - 1} />
                ))}
              </div>
            </Reveal>
          </div>
        </SpotlightCard>
      </div>
    </section>
  )
}
