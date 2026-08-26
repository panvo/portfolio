import { Reveal } from './Reveal'

export function SectionHeading({ kicker, title, sub, id }) {
  return (
    <div id={id} className="mb-12 sm:mb-16 scroll-mt-28">
      {kicker && (
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8" style={{ background: 'var(--accent)' }} />
            <span className="eyebrow">{kicker}</span>
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-[15px] sm:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  )
}
