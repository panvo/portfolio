import { useCountUp } from '../../lib/hooks'

export function Metric({ value, suffix = '', label, note, compact = false, accent = false }) {
  const [ref, display] = useCountUp(value, { compact })
  return (
    <div ref={ref}>
      <div
        className="font-display font-semibold tracking-tight tabular-nums text-3xl sm:text-4xl md:text-[2.6rem] leading-none"
        style={accent ? { color: 'var(--accent-text)' } : undefined}
      >
        {display}
        <span style={{ color: 'var(--accent-text)' }}>{suffix}</span>
      </div>
      <div className="mt-2 eyebrow">{label}</div>
      {note && (
        <div className="mt-1.5 text-[12.5px] leading-snug max-w-[15rem]" style={{ color: 'var(--text-faint)' }}>
          {note}
        </div>
      )}
    </div>
  )
}
