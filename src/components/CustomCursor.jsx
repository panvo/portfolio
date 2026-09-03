import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Precise dot + a spring-trailing ring. The ring swells over interactive
 * elements. Native cursor is hidden on fine pointers (see .cc-* in index.css);
 * touch devices keep their default (the CSS gate hides these there).
 */
export function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 })
  const ring = useRef(null)

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e) => {
      const hit = e.target.closest?.('a, button, [role="button"], input, textarea, select, label, .cursor-pointer, .cursor-zoom-in')
      ring.current?.classList.toggle('cc-ring--active', !!hit)
    }
    const down = () => ring.current?.classList.add('cc-ring--down')
    const up = () => ring.current?.classList.remove('cc-ring--down')
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    window.addEventListener('pointerdown', down, { passive: true })
    window.addEventListener('pointerup', up, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [x, y])

  return (
    <>
      <motion.div className="cc-dot" style={{ x, y }} aria-hidden="true" />
      <motion.div ref={ring} className="cc-ring" style={{ x: ringX, y: ringY }} aria-hidden="true" />
    </>
  )
}
