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
  return (
    <div className="profile-card relative h-full p-5 flex flex-col">
      {/* decorative dashed arc + flame badge */}
      <svg className="absolute -top-3 left-6 right-6 pointer-events-none" height="70" style={{ width: 'calc(100% - 48px)' }} viewBox="0 0 300 70" fill="none" preserveAspectRatio="none">
        <path d="M8 62 C 60 4, 240 4, 292 40" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" />
      </svg>
      <motion.div
        className="absolute left-8 top-1 grid place-items-center h-8 w-8 rounded-full z-10"
        style={{ background: 'var(--accent)', color: '#fff' }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Flame size={15} />
      </motion.div>

      {/* portrait — save your photo to /public/portrait.jpg and it auto-loads with an
          orange duotone (matching the reference). The JR monogram shows until then. */}
      <div className="duotone-wrap rounded-[20px] overflow-hidden aspect-[4/5] grid place-items-center">
        <span className="font-display font-bold text-7xl" style={{ color: 'rgba(0,0,0,0.6)' }}>JR</span>
        <img
          src="/portrait.jpg"
          alt={profile.name}
          className="duotone-img"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      </div>

      <div className="mt-5 px-1">
        <h2 className="font-display font-bold text-2xl tracking-tight" style={{ color: 'var(--paper-ink)' }}>
          {profile.name}
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed" style={{ color: 'var(--paper-muted)' }}>
          A QA engineer hardening enterprise software — and building the AI tools that keep it reliable.
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-[13px]" style={{ color: 'var(--paper-muted)' }}>
          <MapPin size={13} /> {profile.location}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Social href={profile.linkedin}><Linkedin size={16} /></Social>
          <Social href={`mailto:${profile.email}`}><Mail size={16} /></Social>
          {profile.github && <Social href={profile.github}><Github size={16} /></Social>}
        </div>
      </div>
    </div>
  )
}

function Social({ href, children }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="grid place-items-center h-9 w-9 rounded-full transition-all duration-200 hover:-translate-y-0.5"
      style={{ background: 'transparent', border: '1px solid var(--paper-border)', color: 'var(--accent)' }}
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
