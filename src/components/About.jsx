import { about } from '../content/profile'
import { Reveal } from './ui/Reveal'

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32 scroll-mt-24">
      <div className="shell">
        <div className="grid lg:grid-cols-[0.4fr_1fr] gap-10 lg:gap-20">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-8" style={{ background: 'var(--accent)' }} />
              <span className="eyebrow">{about.kicker}</span>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="font-display text-2xl sm:text-3xl md:text-[2.4rem] font-medium tracking-tight leading-[1.25]">
                Quality is a discipline, not an afterthought — I build reliability into complex
                enterprise software, and the tooling that keeps it there.
              </p>
            </Reveal>

            <div className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-5 max-w-3xl">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.05 + i * 0.05}>
                  <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
