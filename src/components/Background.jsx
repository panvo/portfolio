/**
 * Minimal, editorial backdrop. Light: clean paper with a whisper-soft
 * accent tint + fading grid near the top. Dark: same shapes, deeper.
 * Intentionally quiet — the content carries the page.
 */
export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* soft accent glow, top-right */}
      <div
        className="absolute"
        style={{
          top: '-14%',
          right: '-8%',
          width: '46vw',
          height: '46vw',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 16%, transparent), transparent 66%)',
          filter: 'blur(30px)',
        }}
      />
      {/* faint fading grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          opacity: 0.5,
          maskImage: 'radial-gradient(ellipse 70% 45% at 50% 0%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 45% at 50% 0%, black, transparent 80%)',
        }}
      />
    </div>
  )
}
