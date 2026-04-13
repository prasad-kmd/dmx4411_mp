'use client'

import { Moon, Sun, Monitor } from 'lucide-react'
import { useThemeStore } from '@/lib/theme-store'
import { cn } from '@/lib/utils'
import type { ThemeMode } from '@/lib/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ACCENT_COLORS } from '@/lib/constants'

export function ThemeToggle() {
  const { mode, setMode, accent, setAccent } = useThemeStore()

  const modes: { value: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
    { value: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
    { value: 'system', label: 'System', icon: <Monitor className="w-4 h-4" /> },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'inline-flex items-center justify-center rounded-md p-2',
            'hover:bg-accent hover:text-accent-foreground',
            'transition-colors duration-200'
          )}
          aria-label="Toggle theme"
        >
          {mode === 'dark' ? (
            <Moon className="w-5 h-5" />
          ) : mode === 'light' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Monitor className="w-5 h-5" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5 text-sm font-semibold">Theme Mode</div>
        {modes.map((m) => (
          <DropdownMenuItem
            key={m.value}
            onClick={() => setMode(m.value)}
            className={cn(
              'flex items-center gap-2 cursor-pointer',
              mode === m.value && 'bg-accent text-accent-foreground'
            )}
          >
            {m.icon}
            <span>{m.label}</span>
          </DropdownMenuItem>
        ))}
        
        <div className="h-px bg-border my-1" />
        
        <div className="px-2 py-1.5 text-sm font-semibold">Accent Color</div>
        <div className="grid grid-cols-7 gap-2 px-2 py-2">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color.id}
              onClick={() => setAccent(color.id)}
              className={cn(
                'w-6 h-6 rounded-full transition-transform hover:scale-110',
                color.class,
                accent === color.id && 'ring-2 ring-offset-2 ring-ring'
              )}
              aria-label={`Set ${color.name} accent color`}
              title={color.name}
            />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
