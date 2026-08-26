import { motion } from 'framer-motion'
import { profile, about } from '../content/profile'
import { Reveal } from './ui/Reveal'

export function About() {
  return (
    <section className="py-24 sm:py-32">
      <div className="shell">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
          {/* portrait card */}
          <Reveal className="lg:sticky lg:top-28">
            <div className="glass spotlight p-1.5 rounded-[26px]" onMouseMove={spotlight}>
              <div
                className="relative rounded-[20px] aspect-[4/5] overflow-hidden grid place-items-center"
                style={{ background: 'linear-gradient(160deg, #14141f, #0a0a12)' }}
              >
                {/* Replace this block with your photo:
                    <img src="/portrait.jpg" className="absolute inset-0 h-full w-full object-cover" /> */}
                <div className="text-center px-6">
                  <div
                    className="mx-auto mb-4 grid place-items-center h-24 w-24 rounded-full font-display text-3xl font-bold"
                    style={{ background: 'linear-gradient(120deg, var(--violet), var(--cyan))', color: '#08080d' }}
                  >
                    JR
                  </div>
                  <div className="text-sm font-mono" style={{ color: 'var(--text-faint)' }}>
                    /public/portrait.jpg
                  </div>
                </div>
                <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px var(--border)' }} />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between px-2">
              <div>
                <div className="font-display font-semibold">{profile.name}</div>
                <div className="text-sm" style={{ color: 'var(--text-faint)' }}>{profile.role}</div>
              </div>
              <div className="font-mono text-xs" style={{ color: 'var(--text-faint)' }}>PH · GMT+8</div>
            </div>
          </Reveal>

          {/* text */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8" style={{ background: 'var(--accent)' }} />
                <span className="eyebrow">{about.kicker}</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-3xl sm:text-4xl md:text-[2.7rem] font-semibold tracking-tight leading-[1.1] mb-8">
                Quality is a discipline,<br />
                <span style={{ color: 'var(--text-muted)' }}>not an afterthought.</span>
              </h2>
            </Reveal>
            <div className="space-y-5">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.06}>
                  <p className="text-[15px] sm:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
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

function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}
