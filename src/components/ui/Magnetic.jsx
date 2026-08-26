import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '../../lib/hooks'

/**
 * Magnetic hover — the element eases toward the cursor and springs back.
 * Wraps its children in a motion.div. `strength` scales the pull.
 */
export function Magnetic({ children, strength = 0.35, className = '', as = 'div' }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 })
  const M = motion[as] || motion.div

  function onMove(e) {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <M ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy }} className={className}>
      {children}
    </M>
  )
}
