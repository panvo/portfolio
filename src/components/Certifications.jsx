import { ShieldCheck, Award, GraduationCap, BadgeCheck, Landmark, Linkedin } from 'lucide-react'
import { certHeading, certifications } from '../content/profile'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'

const icons = { ShieldCheck, Award, GraduationCap, BadgeCheck, Landmark, Linkedin }

export function Certifications() {
  return (
    <section id="certifications" className="py-24 sm:py-32 scroll-mt-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="shell">
        <SectionHeading kicker={certHeading.kicker} title={certHeading.title} sub={certHeading.sub} />

        <div className="border-t" style={{ borderColor: 'var(--border)' }}>
          {certifications.map((c) => {
            const Icon = icons[c.icon] || BadgeCheck
            return (
              <Reveal key={c.name}>
                <div className="group grid md:grid-cols-[1fr_auto] gap-3 md:gap-8 py-6 border-b items-start md:items-center" style={{ borderColor: 'var(--border)' }}>
                  {/* left: credential */}
                  <div className="flex items-start gap-4">
                    <span
                      className="grid place-items-center h-11 w-11 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                        color: '#fff',
                        boxShadow: '0 8px 22px -10px color-mix(in srgb, var(--accent) 65%, transparent)',
                      }}
                    >
                      <Icon size={19} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display font-semibold tracking-tight leading-tight">{c.name}</h3>
                        {c.tag && <span className="chip !py-0.5 !px-2 !text-[12px]" style={{ borderColor: 'var(--accent)', color: 'var(--accent-text)' }}>{c.tag}</span>}
                        {c.course && <span className="chip !py-0.5 !px-2 !text-[12px]">Course</span>}
                      </div>
                      <div className="mt-1 text-[14px]" style={{ color: 'var(--text-muted)' }}>{c.issuer}</div>
                      {c.credentialId && (
                        <div className="mt-1 font-mono text-[12px]" style={{ color: 'var(--text-faint)' }}>
                          Credential ID · {c.credentialId}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* right: date / status */}
                  <div className="flex items-center gap-3 md:justify-end pl-[3.75rem] md:pl-0">
                    {c.active && (
                      <span className="inline-flex items-center gap-1.5 text-[12px] font-mono" style={{ color: '#22c55e' }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#22c55e' }} /> Active
                      </span>
                    )}
                    <span className="font-mono text-[13px] whitespace-nowrap" style={{ color: 'var(--text-faint)' }}>
                      {c.expires ? `${c.date} — ${c.expires}` : c.date}
                    </span>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
