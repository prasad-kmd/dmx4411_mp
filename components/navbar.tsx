'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PROJECT_DATA } from '@/lib/constants';
import { useThemeStore, ACCENT_COLORS } from '@/lib/theme-store';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const pathname = usePathname();
  const { accentColor, setAccentColor } = useThemeStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-4 px-4 py-2 pointer-events-auto glass rounded-full"
      >
        <Link href="/" className="flex items-center gap-2 mr-4">
          <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            DSP
          </div>
          <span className="hidden md:block font-semibold text-sm">Research Portal</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {PROJECT_DATA.navLinks.slice(0, 5).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors hover:bg-white/10",
                pathname === link.href ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full size-8"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings2 className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full lg:hidden size-8"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-20 right-4 p-4 glass rounded-2xl pointer-events-auto min-w-[200px]"
          >
            <h4 className="text-xs font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Accent Color</h4>
            <div className="grid grid-cols-5 gap-2">
              {ACCENT_COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setAccentColor(color.value)}
                  className={cn(
                    "size-6 rounded-full border-2 transition-transform hover:scale-110",
                    accentColor === color.value ? "border-white" : "border-transparent"
                  )}
                  style={{ backgroundColor: `hsl(${color.value})` }}
                  title={color.name}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 top-20 z-40 bg-background/80 backdrop-blur-xl lg:hidden pointer-events-auto"
          >
            <div className="flex flex-col p-6 gap-4">
              {PROJECT_DATA.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-2xl font-bold transition-colors",
                    pathname === link.href ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
