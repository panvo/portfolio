import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle({ theme, toggle }) {
  const dark = theme === 'dark'
  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative grid place-items-center h-9 w-9 rounded-full overflow-hidden"
      style={{ border: '1px solid var(--border)', color: 'var(--text)', background: 'var(--surface)' }}
    >
      <motion.span
        key={theme}
        initial={{ y: 14, opacity: 0, rotate: -30 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="grid place-items-center"
      >
        {dark ? <Moon size={16} /> : <Sun size={16} />}
      </motion.span>
    </button>
  )
}
