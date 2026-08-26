import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

/**
 * Count up to `target` when the element scrolls into view.
 * Returns [ref, displayValue].
 */
export function useCountUp(target, { duration = 1.6, compact = false } = {}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    })
    return () => controls.stop()
  }, [inView, target, duration])

  const display = compact ? formatCompact(value) : Math.round(value).toLocaleString()
  return [ref, display]
}

function formatCompact(n) {
  const r = Math.round(n)
  if (r >= 1000) {
    const k = r / 1000
    return (k >= 10 ? Math.round(k) : k.toFixed(1).replace(/\.0$/, '')) + 'k'
  }
  return String(r)
}

/** Respect the user's reduced-motion preference. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}
