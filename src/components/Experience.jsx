import { Briefcase, GraduationCap, Check, MapPin } from 'lucide-react'
import { experience, education, projects } from '../content/profile'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal'

export function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-28 scroll-mt-24">
      <div className="shell">
        <SectionHeading
          kicker="Career"
          title="Experience & education"
          sub="Nearly a decade validating enterprise software — and a degree that started it."
        />

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10">
          {/* experience timeline */}
          <div className="space-y-5">
            {experience.map((job) => (
              <Reveal key={job.company}>
                <article className="glass p-7 sm:p-8 rounded-2xl">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <span className="grid place-items-center h-11 w-11 rounded-xl" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                        <Briefcase size={18} style={{ color: 'var(--violet)' }} />
                      </span>
                      <div>
                        <h3 className="font-display font-semibold text-lg tracking-tight">{job.role}</h3>
                        <div className="text-sm" style={{ color: 'var(--cyan)' }}>{job.company}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{job.period}</div>
                      <div className="font-mono text-xs" style={{ color: 'var(--text-faint)' }}>{job.duration} · {job.type}</div>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-faint)' }}>
                    <MapPin size={12} /> {job.location}
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {job.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        <Check size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--violet)' }} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}

            {/* secondary projects */}
            {projects.map((p) => (
              <Reveal key={p.name}>
                <article className="glass p-7 rounded-2xl">
                  <div className="eyebrow mb-2">{p.tag} · {p.period}</div>
                  <h3 className="font-display font-semibold text-lg tracking-tight mb-2">{p.name}</h3>
                  <p className="text-[14px] leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.skills.map((s) => (
                      <span key={s} className="chip !py-1 !px-2.5 !text-[12px]">{s}</span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* education */}
          <Reveal delay={0.1}>
            <div className="glass p-7 sm:p-8 rounded-2xl lg:sticky lg:top-28">
              <span className="grid place-items-center h-11 w-11 rounded-xl mb-5" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                <GraduationCap size={20} style={{ color: 'var(--cyan)' }} />
              </span>
              <h3 className="font-display font-semibold text-lg tracking-tight">{education.school}</h3>
              <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{education.degree}</div>
              <div className="font-mono text-xs mt-1" style={{ color: 'var(--text-faint)' }}>{education.period}</div>

              <div className="hairline my-6" />

              <ul className="space-y-3">
                {education.honors.map((h) => (
                  <li key={h} className="flex gap-3 text-[14px]" style={{ color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--violet)' }}>◆</span> {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
