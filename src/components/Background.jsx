import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Dark, minimal backdrop with two soft accent glows (brown + slate) that both
 * idle-drift AND parallax with scroll for depth, plus a faint grid and a subtle
 * film-grain overlay for that tactile, premium feel. Motion-first (always on).
 */
export function Background() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1600], [0, 240]) // top-right glow eases down
  const y2 = useTransform(scrollY, [0, 1600], [0, -190]) // bottom-left glow eases up

  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: 'var(--bg)' }}>
        {/* top-right glow — scroll parallax (outer) + idle drift (inner) */}
        <motion.div className="absolute" style={{ top: '-16%', right: '-8%', width: '48vw', height: '48vw', y: y1 }}>
          <motion.div
            className="w-full h-full"
            style={{
              background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 36%, transparent), transparent 66%)',
              filter: 'blur(20px)',
              willChange: 'transform',
            }}
            animate={{ x: ['0%', '5%', '0%'], y: ['0%', '4%', '0%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* bottom-left glow */}
        <motion.div className="absolute" style={{ bottom: '-18%', left: '-10%', width: '42vw', height: '42vw', y: y2 }}>
          <motion.div
            className="w-full h-full"
            style={{
              background: 'radial-gradient(circle, color-mix(in srgb, var(--accent-2) 30%, transparent), transparent 66%)',
              filter: 'blur(20px)',
              willChange: 'transform',
            }}
            animate={{ x: ['0%', '6%', '0%'], y: ['0%', '-4%', '0%'] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* faint fading grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            opacity: 0.5,
            maskImage: 'radial-gradient(ellipse 75% 55% at 50% 0%, black, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 55% at 50% 0%, black, transparent 80%)',
          }}
        />
      </div>

      {/* film grain — static overlay above content, below the nav pill */}
      <div className="grain" aria-hidden="true" />
    </>
  )
}
