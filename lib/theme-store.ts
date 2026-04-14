import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  mode: 'light' | 'dark';
  accentColor: string;
  toggleMode: () => void;
  setMode: (mode: 'light' | 'dark') => void;
  setAccentColor: (color: string) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'dark',
      accentColor: 'blue',
      toggleMode: () => set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
      setMode: (mode) => set({ mode }),
      setAccentColor: (accentColor) => set({ accentColor }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
