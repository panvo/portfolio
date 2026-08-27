import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]
const VIEW = { once: true, margin: '-80px' }

/**
 * Scroll-triggered reveal — GPU-composited (opacity + translateY only).
 * No blur/filter animation: those re-rasterize every frame and jank on scroll.
 * Honors prefers-reduced-motion (renders instantly, never stuck hidden).
 */
export function Reveal({ children, delay = 0, y = 26, className = '', as = 'div' }) {
  const M = motion[as] || motion.div
  const reduce = useReducedMotion()
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </M>
  )
}

/** Container that staggers its RevealItem children. */
export function RevealGroup({ children, className = '', stagger = 0.08 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEW}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Masked line reveal — the line rises from behind a clip. Premium, restrained.
 * The bottom padding + negative margin give descenders (g, y, p) room so the
 * clip never shaves their tails.
 */
export function MaskText({ children, delay = 0, duration = 0.9, className = '' }) {
  const reduce = useReducedMotion()
  if (reduce) return <span className={`block ${className}`}>{children}</span>
  return (
    <span className="block overflow-hidden pb-[0.22em] -mb-[0.22em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: '118%' }}
        whileInView={{ y: 0 }}
        viewport={VIEW}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function RevealItem({ children, className = '', y = 24 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={
        reduce
          ? undefined
          : {
              hidden: { opacity: 0, y },
              show: { opacity: 1, y: 0, transition: { duration: 0.66, ease: EASE } },
            }
      }
    >
      {children}
    </motion.div>
  )
}
