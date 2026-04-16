'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useThemeStore } from '@/lib/theme-store';

export function Providers({ children }: { children: React.ReactNode }) {
  const accentColor = useThemeStore((state) => state.accentColor);

  React.useEffect(() => {
    const root = document.documentElement;
    const [h, s, l] = accentColor.split(' ');
    root.style.setProperty('--primary-h', h.replace('%', ''));
    root.style.setProperty('--primary-s', s);
    root.style.setProperty('--primary-l', l);
  }, [accentColor]);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
