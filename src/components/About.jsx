import { about } from '../content/profile'
import { Reveal } from './ui/Reveal'

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32 scroll-mt-24">
      <div className="shell">
        {/* eyebrow — left-aligned to match every other section */}
        <Reveal>
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8" style={{ background: 'var(--accent)' }} />
            <span className="eyebrow">{about.kicker}</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="font-display text-2xl sm:text-3xl md:text-[2.6rem] font-medium tracking-tight leading-[1.2] max-w-4xl">
            Quality is a discipline, not an afterthought — I build reliability into complex
            enterprise software, and the tooling that keeps it there.
          </p>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-5 max-w-3xl">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.06}>
              <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
