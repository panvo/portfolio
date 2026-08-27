import { marquee } from '../content/profile'

/**
 * Infinite tech marquee — always-on horizontal motion (GPU transform).
 * The track holds two copies so the -50% translate loops seamlessly.
 */
export function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div
      className="marquee overflow-hidden border-y select-none"
      style={{ borderColor: 'var(--border)' }}
      aria-hidden="true"
    >
      <div className="marquee-track py-5">
        {items.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-8 whitespace-nowrap px-8 font-display text-lg sm:text-xl tracking-tight"
            style={{ color: 'var(--text-faint)' }}
          >
            {t}
            <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
          </span>
        ))}
      </div>
    </div>
  )
}
