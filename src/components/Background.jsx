import { motion } from 'framer-motion'

/** Fixed cinematic backdrop: aurora blobs + grid + grain. */
export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* aurora blobs */}
      <motion.div
        aria-hidden
        className="absolute rounded-full"
        style={{
          top: '-18%',
          left: '-10%',
          width: '55vw',
          height: '55vw',
          background: 'radial-gradient(circle, rgba(124,108,255,0.35), transparent 62%)',
          filter: 'blur(30px)',
        }}
        animate={{ x: ['0%', '6%', '0%'], y: ['0%', '-4%', '0%'], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute rounded-full"
        style={{
          top: '20%',
          right: '-15%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(52,208,230,0.22), transparent 62%)',
          filter: 'blur(30px)',
        }}
        animate={{ x: ['0%', '-6%', '0%'], y: ['0%', '5%', '0%'], scale: [1, 1.12, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute rounded-full"
        style={{
          bottom: '-20%',
          left: '25%',
          width: '45vw',
          height: '45vw',
          background: 'radial-gradient(circle, rgba(217,107,245,0.16), transparent 62%)',
          filter: 'blur(30px)',
        }}
        animate={{ x: ['0%', '4%', '0%'], y: ['0%', '-6%', '0%'], scale: [1, 1.08, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* faint grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent 85%)',
        }}
      />

      {/* vignette to seat the content */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 0%, transparent 40%, var(--bg) 92%)' }}
      />
      <div className="grain" />
    </div>
  )
}
