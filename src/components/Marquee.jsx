import { marquee } from '../content/profile'

export function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div
      className="marquee relative py-5 border-y overflow-hidden"
      style={{ borderColor: 'var(--border)', background: 'rgba(255,255,255,0.012)' }}
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10" style={{ background: 'linear-gradient(90deg, var(--bg), transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10" style={{ background: 'linear-gradient(270deg, var(--bg), transparent)' }} />
      <div className="marquee-track gap-10">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-sm font-mono whitespace-nowrap" style={{ color: 'var(--text-faint)' }}>
            {item}
            <span style={{ color: 'var(--accent)' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
