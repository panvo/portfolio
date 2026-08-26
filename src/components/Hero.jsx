import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin, Mail } from 'lucide-react'
import { profile } from '../content/profile'
import { Metric } from './ui/Metric'

const ease = [0.16, 1, 0.3, 1]

export function Hero() {
  return (
    <section id="top" className="relative pt-36 sm:pt-44 pb-20">
      <div className="shell">
        {/* availability + location */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-wrap items-center gap-3 mb-8"
        >
          {profile.available && (
            <span className="inline-flex items-center gap-2 chip !py-1.5" style={{ color: 'var(--text)' }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: '#3ddc84' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#3ddc84' }} />
              </span>
              Available for opportunities
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-faint)' }}>
            <MapPin size={14} /> {profile.location}
          </span>
        </motion.div>

        {/* headline */}
        <h1 className="font-display font-semibold tracking-tight leading-[1.02] text-[2.6rem] sm:text-6xl md:text-7xl">
          {profile.headline.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.09, ease }}
              >
                {i === profile.headline.length - 1 ? (
                  <span className="gradient-text">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* intro + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="mt-8 grid md:grid-cols-[1.4fr_1fr] gap-8 items-end"
        >
          <p className="max-w-xl text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {profile.intro}
          </p>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <a href="#work" className="btn btn-primary">
              View my work <ArrowUpRight size={18} />
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-ghost">
              <Mail size={17} /> Email me
            </a>
          </div>
        </motion.div>

        {/* stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease }}
          className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 border-t pt-10"
          style={{ borderColor: 'var(--border)' }}
        >
          {profile.stats.map((s) => (
            <Metric key={s.label} {...s} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
