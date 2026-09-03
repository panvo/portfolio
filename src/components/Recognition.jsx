import { Quote } from 'lucide-react'
import { recognition } from '../content/profile'
import { Reveal, MaskText } from './ui/Reveal'

/**
 * A premium recognition band — a large centered pull-quote (honest: from the
 * owner's track record) plus three real credential highlights.
 */
export function Recognition() {
  return (
    <section className="py-24 sm:py-32 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="shell">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <span
              className="inline-grid place-items-center h-12 w-12 rounded-2xl mb-8"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff', boxShadow: '0 14px 34px -16px color-mix(in srgb, var(--accent) 60%, transparent)' }}
            >
              <Quote size={22} />
            </span>
          </Reveal>

          <blockquote className="font-display text-3xl sm:text-4xl md:text-[2.9rem] font-semibold tracking-tight leading-[1.15]">
            <MaskText>{'“' + recognition.quote + '”'}</MaskText>
          </blockquote>

          <Reveal delay={0.15}>
            <p className="mt-6 text-[15px] sm:text-base leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              {recognition.context}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {recognition.highlights.map((h, i) => (
            <Reveal key={h.label} delay={0.1 + i * 0.08}>
              <div
                className="card h-full p-6 text-center"
                style={{ background: 'linear-gradient(180deg, var(--surface), color-mix(in srgb, var(--surface) 30%, transparent))' }}
              >
                <div className="font-display font-semibold text-lg tracking-tight" style={{ color: 'var(--accent-text)' }}>{h.label}</div>
                <div className="mt-1.5 text-[13px] leading-relaxed" style={{ color: 'var(--text-faint)' }}>{h.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
