"use client";

import React, { useEffect, useState } from "react";
import { useThemeStore, ACCENT_COLORS } from "@/lib/theme-store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode, accentColor } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;

    // Apply theme mode
    root.classList.remove("light", "dark");
    root.classList.add(mode);

    // Apply accent color
    const colorDef = ACCENT_COLORS[accentColor] || ACCENT_COLORS.blue;
    const hsl = mode === "light" ? colorDef.light : colorDef.dark;

    root.style.setProperty("--primary", hsl);
    root.style.setProperty("--ring", hsl);

  }, [mode, accentColor, mounted]);

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
