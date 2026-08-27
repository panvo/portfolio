import { useRef } from 'react'

/**
 * Cursor-follow spotlight card. Sets --mx/--my (0–100%) on mousemove so the
 * `.spotlight-card::before` radial glow tracks the cursor. rAF-throttled, GPU
 * paint only, no layout. Renders as `as` (default div) and forwards className.
 */
export function SpotlightCard({ children, className = '', as: Tag = 'div', ...rest }) {
  const ref = useRef(null)
  const frame = useRef(0)

  function onMove(e) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const mx = ((e.clientX - r.left) / r.width) * 100
    const my = ((e.clientY - r.top) / r.height) * 100
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--mx', `${mx}%`)
      el.style.setProperty('--my', `${my}%`)
    })
  }

  return (
    <Tag ref={ref} onMouseMove={onMove} className={`spotlight-card ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
