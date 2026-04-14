import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "dark" | "light";

export interface AccentColor {
  name: string;
  key: string;
  light: string; // HSL
  dark: string;  // HSL
}

export const ACCENT_COLORS: Record<string, AccentColor> = {
  blue: {
    name: "Blue",
    key: "blue",
    light: "221.2 83.2% 53.3%",
    dark: "217.2 91.2% 59.8%",
  },
  purple: {
    name: "Purple",
    key: "purple",
    light: "262.1 83.3% 57.8%",
    dark: "263.4 70% 50.4%",
  },
  green: {
    name: "Green",
    key: "green",
    light: "142.1 76.2% 36.3%",
    dark: "142.1 70.6% 45.3%",
  },
  orange: {
    name: "Orange",
    key: "orange",
    light: "24.6 95% 53.1%",
    dark: "20.5 90.2% 48.2%",
  },
  pink: {
    name: "Pink",
    key: "pink",
    light: "346.8 77.2% 49.8%",
    dark: "346.8 80% 55%",
  },
};

interface ThemeState {
  mode: ThemeMode;
  accentColor: string;
  setMode: (mode: ThemeMode) => void;
  setAccentColor: (color: string) => void;
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "dark",
      accentColor: "blue",
      setMode: (mode) => set({ mode }),
      setAccentColor: (accentColor) => set({ accentColor }),
      toggleMode: () =>
        set((state) => ({ mode: state.mode === "light" ? "dark" : "light" })),
    }),
    {
      name: "theme-storage",
    }
  )
);
