export const SITE_METADATA = {
  title: "Audio Signal Denoising System",
  description: "Digital Signal Processing Mini Project - Audio Noise Removal using MATLAB",
  author: "Undergraduate Student",
  keywords: ["DSP", "Audio Processing", "MATLAB", "Filter Design", "Noise Removal"],
};

export const NAVIGATION_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Introduction", href: "/introduction" },
  { label: "Methodology", href: "/methodology" },
  { label: "Design", href: "/design" },
  { label: "Results", href: "/results" },
  { label: "Discussion", href: "/discussion" },
  { label: "Conclusion", href: "/conclusion" },
  { label: "References", href: "/references" },
  { label: "Appendix", href: "/appendix" },
];

export type AccentColor = {
  name: string;
  light: string; // HSL values
  dark: string;  // HSL values
  foreground: string;
};

export const ACCENT_COLORS: Record<string, AccentColor> = {
  blue: {
    name: "Blue",
    light: "221.2 83.2% 53.3%",
    dark: "217.2 91.2% 59.8%",
    foreground: "210 40% 98%",
  },
  purple: {
    name: "Purple",
    light: "262.1 83.3% 57.8%",
    dark: "263.4 70% 50.4%",
    foreground: "210 40% 98%",
  },
  green: {
    name: "Green",
    light: "142.1 76.2% 36.3%",
    dark: "142.1 70.6% 45.3%",
    foreground: "210 40% 98%",
  },
  orange: {
    name: "Orange",
    light: "24.6 95% 53.1%",
    dark: "20.5 90.2% 48.2%",
    foreground: "210 40% 98%",
  },
  pink: {
    name: "Pink",
    light: "346.8 77.2% 49.8%",
    dark: "346.8 77.2% 49.8%",
    foreground: "210 40% 98%",
  },
  cyan: {
    name: "Cyan",
    light: "188.7 94.5% 42.7%",
    dark: "188.7 94.5% 42.7%",
    foreground: "210 40% 98%",
  },
  red: {
    name: "Red",
    light: "0 84.2% 60.2%",
    dark: "0 72% 51%",
    foreground: "210 40% 98%",
  },
};
