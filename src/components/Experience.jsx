import { MapPin } from 'lucide-react'
import { experienceHeading, timeline } from '../content/profile'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

export function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 scroll-mt-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="shell">
        <SectionHeading kicker={experienceHeading.kicker} title={experienceHeading.title} />

        {/* timeline — full width, two columns (content + meta rail) */}
        <div className="relative">
          <div className="absolute left-[6px] top-3 bottom-3 w-px" style={{ background: 'linear-gradient(var(--border-strong), var(--border) 85%, transparent)' }} />

          {timeline.map((item) => (
            <Reveal key={item.role} className="relative pl-9 pb-12 last:pb-0">
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

              <div className="grid lg:grid-cols-[1fr_280px] gap-4 lg:gap-12">
                {/* main */}
                <div>
                  <h3 className="font-display font-semibold text-xl sm:text-[1.4rem] tracking-tight leading-tight">
                    {item.role}
                  </h3>
                  <div className="mt-1 text-[15px]">
                    <span style={{ color: 'var(--accent)' }}>{item.org}</span>
                    <span style={{ color: 'var(--text-faint)' }}> · {item.meta}</span>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed max-w-2xl" style={{ color: 'var(--text-muted)' }}>
                    {item.summary}
                  </p>
                  {item.tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((t) => (
                        <span key={t} className="chip !text-[12.5px]">{t}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* right meta rail */}
                <div className="flex flex-row lg:flex-col lg:items-end gap-x-4 gap-y-1.5 lg:pt-1 flex-wrap">
                  <span className="font-mono text-[13px] whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>{item.period}</span>
                  {item.duration && (
                    <span className="font-mono text-[12px] whitespace-nowrap" style={{ color: 'var(--text-faint)' }}>{item.duration}</span>
                  )}
                  {item.location && (
                    <span className="inline-flex items-center gap-1 text-[13px]" style={{ color: 'var(--text-faint)' }}>
                      <MapPin size={13} /> {item.location}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
