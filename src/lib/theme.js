import { useEffect, useState } from 'react'

const KEY = 'portfolio-theme'

export function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  return localStorage.getItem(KEY) || 'dark' // dark-first to match the reference
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme
    try {
      localStorage.setItem(KEY, theme)
    } catch {}
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  return { theme, toggle }
}
