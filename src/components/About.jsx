import { about, profile, skillHighlights } from '../content/profile'
import { Reveal } from './ui/Reveal'

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32 scroll-mt-24">
      <div className="shell">
        {/* eyebrow */}
        <Reveal>
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8" style={{ background: 'var(--accent)' }} />
            <span className="eyebrow">{about.kicker}</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="font-display text-2xl sm:text-3xl md:text-[2.4rem] font-medium tracking-tight leading-[1.25] max-w-4xl">
            Quality is a discipline, not an afterthought — I build reliability into complex
            enterprise software, and the tooling that keeps it there.
          </p>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">
          {/* left: paragraphs */}
          <div className="space-y-5 max-w-2xl">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 + i * 0.05}>
                <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {p}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="mt-9 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                <div className="eyebrow mb-3">Core focus</div>
                <div className="flex flex-wrap gap-2">
                  {skillHighlights.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* right: at a glance */}
          <Reveal delay={0.1}>
            <div className="card p-6 lg:p-7" style={{ background: 'linear-gradient(180deg, var(--surface), color-mix(in srgb, var(--surface) 30%, transparent))' }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent-2)' }} />
                <span className="eyebrow">At a glance</span>
              </div>
              <dl>
                {about.facts.map((f, i) => (
                  <div
                    key={f.label}
                    className="flex items-baseline justify-between gap-4 py-2.5"
                    style={{ borderTop: i ? '1px solid var(--border)' : 'none' }}
                  >
                    <dt className="text-[13px] shrink-0" style={{ color: 'var(--text-faint)' }}>{f.label}</dt>
                    <dd className="text-[14px] text-right" style={{ color: 'var(--text)' }}>{f.value}</dd>
                  </div>
                ))}
              </dl>
              {profile.available && (
                <div className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium" style={{ color: '#22c55e' }}>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: '#22c55e' }} />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#22c55e' }} />
                  </span>
                  Available for work
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
