'use client';

import React, { useEffect, useState } from 'react';
import { useThemeStore } from '../lib/theme-store';
import { ACCENT_COLORS } from '../lib/constants';

export function Providers({ children }: { children: React.ReactNode }) {
  const { mode, accentColor } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(mode);

      // Apply accent colors
      const accent = ACCENT_COLORS[accentColor] || ACCENT_COLORS.blue;
      const colorValue = mode === 'dark' ? accent.dark : accent.light;

      root.style.setProperty('--accent', colorValue);
      root.style.setProperty('--accent-foreground', accent.foreground);

      // Also update primary for branding consistency if desired,
      // but for now we'll stick to --accent as per Stage 2 requirements.
    }
  }, [mode, accentColor, mounted]);

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
