import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/** Scroll-triggered reveal with a soft rise, fade + micro-scale. */
export function Reveal({ children, delay = 0, y = 32, className = '', as = 'div' }) {
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </M>
  )
}

/** Container that staggers its RevealItem children. */
export function RevealGroup({ children, className = '', stagger = 0.09 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-90px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className = '', y = 28 }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y, filter: 'blur(6px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  )
}
