import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const ACCENT_COLORS = [
  { name: 'Blue', value: '210 100% 50%' },
  { name: 'Green', value: '142 70% 45%' },
  { name: 'Violet', value: '262 80% 60%' },
  { name: 'Orange', value: '24 95% 53%' },
  { name: 'Red', value: '0 84% 60%' },
];

interface ThemeState {
  accentColor: string;
  setAccentColor: (color: string) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      accentColor: ACCENT_COLORS[0].value,
      setAccentColor: (color) => set({ accentColor: color }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
