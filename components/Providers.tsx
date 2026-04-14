'use client';

import React, { useEffect, useState } from 'react';
import { useThemeStore } from '../lib/theme-store';

export function Providers({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(mode);
    }
  }, [mode, mounted]);

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
