import { experienceHeading, timeline } from '../content/profile'
import { Reveal } from './ui/Reveal'

export function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 scroll-mt-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="shell">
        {/* heading */}
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8" style={{ background: 'var(--accent)' }} />
            <span className="eyebrow" style={{ color: 'var(--accent)' }}>{experienceHeading.kicker}</span>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.02] mb-14">
            {experienceHeading.title}
          </h2>
        </Reveal>

        {/* timeline */}
        <div className="relative max-w-3xl">
          {/* the vertical rail */}
          <div className="absolute left-[6px] top-3 bottom-3 w-px" style={{ background: 'linear-gradient(var(--border-strong), var(--border) 85%, transparent)' }} />

          {timeline.map((item, i) => (
            <Reveal key={item.role} delay={0} className="relative pl-9 pb-11 last:pb-0">
              {/* node */}
              <span
                className="absolute left-0 top-1.5 grid place-items-center h-3.5 w-3.5 rounded-full"
                style={{
                  background: item.kind === 'edu' ? 'var(--text-faint)' : 'var(--accent)',
                  boxShadow: item.kind === 'edu' ? 'none' : '0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent)',
                }}
              >
                {item.now && (
                  <span className="absolute inline-flex h-full w-full rounded-full animate-ping" style={{ background: 'var(--accent)', opacity: 0.5 }} />
                )}
              </span>

              {/* header row */}
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="font-display font-semibold text-xl sm:text-[1.4rem] tracking-tight leading-tight">
                    {item.role}
                  </h3>
                  <div className="mt-1 text-[15px]">
                    <span style={{ color: 'var(--accent)' }}>{item.org}</span>
                    <span style={{ color: 'var(--text-faint)' }}> · {item.meta}</span>
                  </div>
                </div>
                <span className="font-mono text-[13px] whitespace-nowrap pt-1" style={{ color: 'var(--text-faint)' }}>
                  {item.period}
                </span>
              </div>

              {/* summary */}
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {item.summary}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
