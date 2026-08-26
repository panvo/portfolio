import { useCountUp } from '../../lib/hooks'

export function Metric({ value, suffix = '', label, compact = false, accent = false }) {
  const [ref, display] = useCountUp(value, { compact })
  return (
    <div ref={ref}>
      <div
        className="font-display font-semibold tracking-tight tabular-nums text-3xl sm:text-4xl md:text-[2.6rem] leading-none"
        style={accent ? { color: 'var(--accent)' } : undefined}
      >
        {display}
        <span style={{ color: 'var(--accent)' }}>{suffix}</span>
      </div>
      <div className="mt-2 eyebrow">{label}</div>
    </div>
  )
}
