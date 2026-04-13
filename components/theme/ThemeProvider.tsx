'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/lib/theme-store'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode, accent, setMode } = useThemeStore()

  useEffect(() => {
    // Apply initial theme
    const html = document.documentElement
    
    if (mode === 'dark') {
      html.classList.add('dark')
    } else if (mode === 'light') {
      html.classList.remove('dark')
    } else if (mode === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (isDark) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }

    // Apply accent color
    if (accent !== 'blue') {
      html.setAttribute('data-accent', accent)
    } else {
      html.removeAttribute('data-accent')
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (mode === 'system') {
        if (e.matches) {
          html.classList.add('dark')
        } else {
          html.classList.remove('dark')
        }
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [mode, accent])

  return <>{children}</>
}
