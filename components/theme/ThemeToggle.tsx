'use client';

import * as React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Sun, Moon, Palette, Check } from 'lucide-react';
import { useThemeStore } from '../../lib/theme-store';
import { ACCENT_COLORS } from '../../lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
  const { mode, setMode, accentColor, setAccentColor } = useThemeStore();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="p-2 rounded-full hover:bg-accent/10 transition-colors relative theme-transition"
          aria-label="Theme settings"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {mode === 'light' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-popover text-popover-foreground rounded-lg p-1.5 shadow-xl border border-border z-50"
          sideOffset={5}
          align="end"
        >
          <DropdownMenu.Label className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Theme Mode
          </DropdownMenu.Label>

          <DropdownMenu.Item
            className="flex items-center justify-between px-2 py-1.5 text-sm rounded-md cursor-pointer outline-none hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={() => setMode('light')}
          >
            <div className="flex items-center gap-2">
              <Sun size={16} />
              <span>Light</span>
            </div>
            {mode === 'light' && <Check size={14} />}
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="flex items-center justify-between px-2 py-1.5 text-sm rounded-md cursor-pointer outline-none hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={() => setMode('dark')}
          >
            <div className="flex items-center gap-2">
              <Moon size={16} />
              <span>Dark</span>
            </div>
            {mode === 'dark' && <Check size={14} />}
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-px bg-border my-1.5" />

          <DropdownMenu.Label className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Accent Color
          </DropdownMenu.Label>

          <div className="grid grid-cols-4 gap-1 p-1">
            {Object.entries(ACCENT_COLORS).map(([key, value]) => (
              <DropdownMenu.Item
                key={key}
                className="relative flex items-center justify-center p-0 w-10 h-10 rounded-full cursor-pointer outline-none hover:scale-110 transition-transform"
                onClick={(e) => {
                  e.preventDefault();
                  setAccentColor(key);
                }}
                title={value.name}
              >
                <div
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center shadow-inner"
                  style={{ backgroundColor: `hsl(${mode === 'dark' ? value.dark : value.light})` }}
                >
                  {accentColor === key && (
                    <Check size={14} className="text-white drop-shadow-sm" />
                  )}
                </div>
              </DropdownMenu.Item>
            ))}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
