'use client';

import React from 'react';
import { Moon, Sun, Settings } from 'lucide-react';
import { useThemeStore } from '../../lib/theme-store';

export function Navbar() {
  const { mode, toggleMode } = useThemeStore();

  return (
    <header className="fixed top-0 right-0 left-0 h-16 bg-background/80 backdrop-blur-md border-b z-30 md:ml-64 transition-[margin] duration-300">
      <div className="h-full px-6 flex items-center justify-between">
        <h2 className="font-semibold text-lg md:hidden">DSP Project</h2>
        <h2 className="font-semibold text-lg hidden md:block">DSP Project Report</h2>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleMode}
            className="p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            className="p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
