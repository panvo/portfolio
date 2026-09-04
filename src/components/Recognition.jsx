import { recognition } from '../content/profile'
import { Reveal } from './ui/Reveal'

/**
 * A compact, premium recognition band — an eyebrow, a large pull-quote (honest:
 * from the owner's track record), a context line, and three real credentials.
 * Uses plain Reveal (fade+rise) so the quote always renders.
 */
export function Recognition() {
  return (
    <section className="py-16 sm:py-20 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="shell">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="h-px w-8" style={{ background: 'var(--accent)' }} />
              <span className="eyebrow">Recognition</span>
              <span className="h-px w-8" style={{ background: 'var(--accent)' }} />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <blockquote className="font-display text-[1.7rem] sm:text-4xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.18]">
              <span
                className="block text-5xl sm:text-6xl leading-none mb-3 select-none pointer-events-none"
                style={{ color: 'color-mix(in srgb, var(--accent) 28%, transparent)', fontFamily: 'Georgia, "Times New Roman", serif' }}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              {recognition.quote}
            </blockquote>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 text-[15px] leading-relaxed max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              {recognition.context}
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {recognition.highlights.map((h, i) => (
            <Reveal key={h.label} delay={0.12 + i * 0.07}>
              <div
                className="card h-full p-5 text-center transition-transform duration-300 hover:-translate-y-1"
                style={{ background: 'linear-gradient(180deg, var(--surface), color-mix(in srgb, var(--surface) 30%, transparent))' }}
              >
                <div className="font-display font-semibold text-[15px] tracking-tight" style={{ color: 'var(--accent-text)' }}>{h.label}</div>
                <div className="mt-1.5 text-[13px] leading-relaxed" style={{ color: 'var(--text-faint)' }}>{h.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
