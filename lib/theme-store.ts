import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ThemeMode, AccentColor, ThemeState } from './types'

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'dark',
      accent: 'blue',
      isDark: true,

      setMode: (mode: ThemeMode) => {
        let isDark = false
        
        if (mode === 'system') {
          isDark = typeof window !== 'undefined' && 
            window.matchMedia('(prefers-color-scheme: dark)').matches
        } else {
          isDark = mode === 'dark'
        }

        set({ mode, isDark })
        
        // Update DOM
        if (typeof window !== 'undefined') {
          const html = document.documentElement
          if (isDark) {
            html.classList.add('dark')
          } else {
            html.classList.remove('dark')
          }
        }
      },

      setAccent: (accent: AccentColor) => {
        set({ accent })
        
        // Update DOM attribute
        if (typeof window !== 'undefined') {
          const html = document.documentElement
          if (accent !== 'blue') {
            html.setAttribute('data-accent', accent)
          } else {
            html.removeAttribute('data-accent')
          }
        }
      },

      toggleTheme: () => {
        const currentMode = get().mode
        const newMode: ThemeMode = currentMode === 'dark' ? 'light' : 'dark'
        get().setMode(newMode)
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ mode: state.mode, accent: state.accent }),
      onRehydrateStorage: () => (state) => {
        if (state && typeof window !== 'undefined') {
          // Apply theme on rehydration
          const html = document.documentElement
          if (state.isDark) {
            html.classList.add('dark')
          } else {
            html.classList.remove('dark')
          }
          
          if (state.accent !== 'blue') {
            html.setAttribute('data-accent', state.accent)
          }
        }
      },
    }
  )
)

// Initialize theme on mount (client-side only)
if (typeof window !== 'undefined') {
  const store = useThemeStore.getState()
  const html = document.documentElement
  
  // Check for system preference if mode is 'system' or initialize dark mode
  if (store.mode === 'system') {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (isSystemDark) {
      html.classList.add('dark')
    }
  } else if (store.mode === 'dark') {
    html.classList.add('dark')
  }
  
  // Set accent color
  if (store.accent !== 'blue') {
    html.setAttribute('data-accent', store.accent)
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const currentMode = useThemeStore.getState().mode
    if (currentMode === 'system') {
      useThemeStore.getState().setMode('system')
    }
  })
}
