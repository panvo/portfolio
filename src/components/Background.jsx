import { motion, useReducedMotion } from 'framer-motion'

/**
 * Dark, minimal backdrop with two soft, slowly drifting accent glows
 * (brown + slate) — enough life to feel premium without clutter.
 * Drift pauses under prefers-reduced-motion.
 */
export function Background() {
  const reduce = useReducedMotion()
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: 'var(--bg)' }}>
      <motion.div
        className="absolute"
        style={{
          top: '-16%',
          right: '-8%',
          width: '48vw',
          height: '48vw',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 36%, transparent), transparent 66%)',
          filter: 'blur(20px)',
          willChange: 'transform',
        }}
        animate={reduce ? undefined : { x: ['0%', '5%', '0%'], y: ['0%', '4%', '0%'] }}
        transition={reduce ? undefined : { duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute"
        style={{
          bottom: '-18%',
          left: '-10%',
          width: '42vw',
          height: '42vw',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--accent-2) 30%, transparent), transparent 66%)',
          filter: 'blur(20px)',
          willChange: 'transform',
        }}
        animate={reduce ? undefined : { x: ['0%', '6%', '0%'], y: ['0%', '-4%', '0%'] }}
        transition={reduce ? undefined : { duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* faint fading grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          opacity: 0.5,
          maskImage: 'radial-gradient(ellipse 75% 55% at 50% 0%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 55% at 50% 0%, black, transparent 80%)',
        }}
      />
    </div>
  )
}
