import { useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, Linkedin, Mail, Github, ArrowUpRight, Layers, Boxes, MapPin } from 'lucide-react'
import { profile, heroCards } from '../content/profile'
import { useCountUp } from '../lib/hooks'
import { Magnetic } from './ui/Magnetic'

const ease = [0.16, 1, 0.3, 1]
const icons = { Layers, Boxes }

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

export function Hero() {
  return (
    <section id="top" className="relative pt-28 sm:pt-32 pb-16">
      <div className="shell">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-[380px_1fr] gap-8 lg:gap-14 items-stretch"
        >
          {/* ── LEFT: profile card ───────────────────────────── */}
          <motion.div variants={rise}>
            <ProfileCard />
          </motion.div>

          {/* ── RIGHT: title + stats + feature cards ─────────── */}
          <div className="flex flex-col justify-center">
            <motion.div variants={rise} className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
              <span className="eyebrow">Portfolio — {new Date().getFullYear()}</span>
              {profile.available && (
                <span className="inline-flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: '#22c55e' }} />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#22c55e' }} />
                  </span>
                  Available for work
                </span>
              )}
            </motion.div>

            {/* big two-line title */}
            <h1 className="font-display font-semibold tracking-[-0.03em] leading-[0.86] text-[3.6rem] sm:text-[5.4rem] xl:text-[7rem]">
              <span className="block overflow-hidden">
                <motion.span className="block" variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.9, ease } } }}>
                  SOFTWARE
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="block ghost" variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.9, ease } } }}>
                  TESTER
                </motion.span>
              </span>
            </h1>

            <motion.p variants={rise} className="mt-7 max-w-xl text-[15px] sm:text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {profile.intro}
            </motion.p>

            {/* stats */}
            <motion.div variants={rise} className="mt-9 flex flex-wrap gap-x-12 gap-y-6">
              {profile.stats.map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </motion.div>

            {/* feature cards */}
            <motion.div variants={rise} className="mt-9 grid sm:grid-cols-2 gap-4">
              {heroCards.map((c) => (
                <FeatureCard key={c.label} {...c} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ProfileCard() {
  const [imgOk, setImgOk] = useState(true)
  return (
    <div className="profile-card relative h-full p-4 sm:p-5 flex flex-col text-center overflow-hidden">
      {/* top decorative dashed arc */}
      <svg className="absolute left-5 right-5 top-2 pointer-events-none" style={{ width: 'calc(100% - 40px)' }} height="54" viewBox="0 0 300 54" fill="none" preserveAspectRatio="none">
        <path d="M6 48 C 70 6, 230 6, 294 30" stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="4 7" strokeLinecap="round" opacity="0.9" />
      </svg>

      {/* portrait — save your photo to /public/portrait.jpg; it loads with the orange duotone */}
      <div className="duotone-wrap rounded-[18px] overflow-hidden aspect-[4/5] grid place-items-center">
        {imgOk ? (
          <img src="/portrait.jpg" alt={profile.name} className="duotone-img" onError={() => setImgOk(false)} />
        ) : (
          <span className="font-display font-bold text-7xl" style={{ color: 'rgba(0,0,0,0.55)' }}>JR</span>
        )}
      </div>

      <h2 className="mt-6 font-display font-bold text-[1.7rem] tracking-tight" style={{ color: 'var(--paper-ink)' }}>
        {profile.name}
      </h2>

      {/* centered flame badge on a dashed curl (à la the reference) */}
      <div className="relative mt-3 mb-1 h-12 grid place-items-center">
        <svg className="absolute inset-x-0 top-0 mx-auto pointer-events-none" width="140" height="46" viewBox="0 0 140 46" fill="none">
          <path d="M70 6 C 70 30, 30 30, 14 42" stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="4 7" strokeLinecap="round" opacity="0.85" />
        </svg>
        <motion.div
          className="relative grid place-items-center h-9 w-9 rounded-full shadow-lg"
          style={{ background: 'var(--accent)', color: '#fff' }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Flame size={16} />
        </motion.div>
      </div>

      <p className="mt-2 mx-auto max-w-[15rem] text-[15px] leading-relaxed" style={{ color: 'var(--paper-muted)' }}>
        A QA engineer hardening enterprise software — and the AI tools that keep it reliable.
      </p>

      <div className="mt-3 flex items-center justify-center gap-1.5 text-[13.5px]" style={{ color: 'var(--paper-muted)' }}>
        <MapPin size={14} /> {profile.location}
      </div>

      <div className="mt-5 mb-1 flex items-center justify-center gap-2.5">
        <Social href={profile.linkedin} label="LinkedIn"><Linkedin size={17} /></Social>
        <Social href={`mailto:${profile.email}`} label="Email"><Mail size={17} /></Social>
        {profile.github && <Social href={profile.github} label="GitHub"><Github size={17} /></Social>}
      </div>
    </div>
  )
}

function Social({ href, children, label }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      aria-label={label}
      className="grid place-items-center h-10 w-10 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
      style={{ background: 'transparent', border: '1.5px solid rgba(232,60,18,0.35)', color: 'var(--accent)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--accent)'
        e.currentTarget.style.color = '#fff'
        e.currentTarget.style.borderColor = 'var(--accent)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.color = 'var(--accent)'
        e.currentTarget.style.borderColor = 'rgba(232,60,18,0.35)'
      }}
    >
      {children}
    </a>
  )
}

function Stat({ value, label, compact }) {
  const [ref, display] = useCountUp(value, { compact })
  return (
    <div ref={ref}>
      <div className="font-display font-semibold tracking-tight tabular-nums text-4xl sm:text-5xl leading-none">
        <span style={{ color: 'var(--accent)' }}>+</span>
        {display}
      </div>
      <div className="eyebrow mt-2.5">{label}</div>
    </div>
  )
}

function FeatureCard({ label, icon, color }) {
  const Icon = icons[icon] || Layers
  const bg = color === 'lime' ? 'var(--lime)' : 'var(--accent)'
  return (
    <Magnetic strength={0.18}>
      <a href="#skills" className="feature-card group block p-6 h-40 sm:h-44" style={{ background: bg }}>
        <div className="flex flex-col justify-between h-full">
          <Icon size={26} style={{ color: 'var(--paper-ink)' }} />
          <div className="flex items-end justify-between gap-3">
            <span className="font-display font-semibold leading-tight text-[15px] sm:text-base pr-2" style={{ color: 'var(--paper-ink)' }}>
              {label}
            </span>
            <span
              className="grid place-items-center h-9 w-9 rounded-full shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              style={{ border: '1.5px solid rgba(0,0,0,0.45)', color: 'var(--paper-ink)' }}
            >
              <ArrowUpRight size={18} />
            </span>
          </div>
        </div>
      </a>
    </Magnetic>
  )
}
