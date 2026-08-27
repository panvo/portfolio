import { useEffect, useRef } from 'react'

/**
 * Soft accent glow that trails the cursor (desktop pointers only — the CSS gates
 * visibility to hover:hover + pointer:fine). rAF-throttled transform, no layout.
 */
export function CursorGlow() {
  const ref = useRef(null)
  const frame = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        el.classList.add('on')
      })
    }
    const onLeave = () => el.classList.remove('on')
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(frame.current)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}
