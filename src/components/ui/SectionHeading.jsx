import { motion } from 'framer-motion'
import { Reveal, MaskText } from './Reveal'

const EASE = [0.16, 1, 0.3, 1]
const inView = { once: true, margin: '-80px' }

export function SectionHeading({ kicker, title, sub, id }) {
  return (
    <div id={id} className="mb-12 sm:mb-16 scroll-mt-28">
      {kicker && (
        <div className="flex items-center gap-3 mb-4">
          {/* accent line grows in */}
          <motion.span
            className="h-px block shrink-0"
            style={{ background: 'var(--accent)' }}
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 32, opacity: 1 }}
            viewport={inView}
            transition={{ duration: 0.7, ease: EASE }}
          />
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ duration: 0.6, delay: 0.14, ease: EASE }}
          >
            {kicker}
          </motion.span>
        </div>
      )}

      {/* title rises from behind a clip — the premium detail */}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
        <MaskText delay={0.08}>{title}</MaskText>
      </h2>

      {sub && (
        <Reveal delay={0.24}>
          <p className="mt-4 max-w-2xl text-[15px] sm:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  )
}
