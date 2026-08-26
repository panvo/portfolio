import { motion } from 'framer-motion'
import { Sparkles, ArrowUpRight } from 'lucide-react'
import { flagship } from '../content/profile'
import { Reveal } from './ui/Reveal'
import { Metric } from './ui/Metric'

export function Flagship() {
  return (
    <section id="work" className="py-20 scroll-mt-24">
      <div className="shell">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8" style={{ background: 'var(--accent)' }} />
            <span className="eyebrow">{flagship.kicker}</span>
          </div>
        </Reveal>

        <div
          className="glass spotlight relative overflow-hidden rounded-[28px] p-8 sm:p-12"
          onMouseMove={spotlight}
        >
          {/* corner glow */}
          <div
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(124,108,255,0.25), transparent 65%)', filter: 'blur(20px)' }}
          />

          <div className="relative grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-start">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 chip mb-6" style={{ color: 'var(--text)' }}>
                  <Sparkles size={14} style={{ color: 'var(--cyan)' }} /> AI-native platform
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h3 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight leading-none">
                  {flagship.name}
                </h3>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-3 text-lg" style={{ color: 'var(--cyan)' }}>{flagship.tagline}</p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-6 max-w-xl text-[15px] sm:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
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
                <div className="mt-8 font-mono text-xs" style={{ color: 'var(--text-faint)' }}>{flagship.period}</div>
              </Reveal>
            </div>

            {/* metrics panel */}
            <Reveal delay={0.15}>
              <div
                className="rounded-2xl p-6 sm:p-8 grid grid-cols-2 gap-x-6 gap-y-8"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}
              >
                {flagship.metrics.map((m, i) => (
                  <Metric key={m.label} {...m} accent={i === 3} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}
