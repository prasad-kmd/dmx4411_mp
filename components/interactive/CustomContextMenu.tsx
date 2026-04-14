'use client';

import * as React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import {
  Copy,
  Search,
  Share2,
  Sun,
  Moon,
  Maximize2,
  ChevronRight,
  Download,
  Terminal
} from 'lucide-react';
import { useThemeStore } from '../../lib/theme-store';
import { cn } from '../../lib/utils';

export function CustomContextMenu({ children }: { children: React.ReactNode }) {
  const { mode, toggleMode } = useThemeStore();

  return (
    <ContextMenuPrimitive.Root>
      <ContextMenuPrimitive.Trigger asChild>
        {children}
      </ContextMenuPrimitive.Trigger>

      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Content
          className="min-w-[160px] bg-popover text-popover-foreground rounded-lg p-1.5 shadow-xl border border-border z-50 animate-in fade-in-0 zoom-in-95"
        >
          <ContextMenuPrimitive.Item
            className="flex items-center justify-between px-2 py-1.5 text-sm rounded-md cursor-pointer outline-none hover:bg-accent hover:text-accent-foreground transition-colors group"
            onClick={() => {
              const selection = window.getSelection()?.toString();
              if (selection) navigator.clipboard.writeText(selection);
            }}
          >
            <div className="flex items-center gap-2">
              <Copy size={16} className="text-muted-foreground group-hover:text-accent-foreground" />
              <span>Copy Selection</span>
            </div>
          </ContextMenuPrimitive.Item>

          <ContextMenuPrimitive.Item
            className="flex items-center justify-between px-2 py-1.5 text-sm rounded-md cursor-pointer outline-none hover:bg-accent hover:text-accent-foreground transition-colors group"
          >
            <div className="flex items-center gap-2">
              <Search size={16} className="text-muted-foreground group-hover:text-accent-foreground" />
              <span>Search Web</span>
            </div>
          </ContextMenuPrimitive.Item>

          <ContextMenuPrimitive.Separator className="h-px bg-border my-1.5" />

          <ContextMenuPrimitive.Item
            className="flex items-center justify-between px-2 py-1.5 text-sm rounded-md cursor-pointer outline-none hover:bg-accent hover:text-accent-foreground transition-colors group"
            onClick={toggleMode}
          >
            <div className="flex items-center gap-2">
              {mode === 'light' ? (
                <Moon size={16} className="text-muted-foreground group-hover:text-accent-foreground" />
              ) : (
                <Sun size={16} className="text-muted-foreground group-hover:text-accent-foreground" />
              )}
              <span>Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode</span>
            </div>
          </ContextMenuPrimitive.Item>

          <ContextMenuPrimitive.Sub>
            <ContextMenuPrimitive.SubTrigger className="flex items-center justify-between px-2 py-1.5 text-sm rounded-md cursor-pointer outline-none hover:bg-accent hover:text-accent-foreground transition-colors group">
              <div className="flex items-center gap-2">
                <Share2 size={16} className="text-muted-foreground group-hover:text-accent-foreground" />
                <span>Share Content</span>
              </div>
              <ChevronRight size={14} className="ml-auto" />
            </ContextMenuPrimitive.SubTrigger>
            <ContextMenuPrimitive.Portal>
              <ContextMenuPrimitive.SubContent className="min-w-[140px] bg-popover text-popover-foreground rounded-lg p-1.5 shadow-xl border border-border z-50">
                <ContextMenuPrimitive.Item className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer outline-none hover:bg-accent hover:text-accent-foreground transition-colors">
                  Current Page
                </ContextMenuPrimitive.Item>
                <ContextMenuPrimitive.Item className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer outline-none hover:bg-accent hover:text-accent-foreground transition-colors">
                  Specific Section
                </ContextMenuPrimitive.Item>
              </ContextMenuPrimitive.SubContent>
            </ContextMenuPrimitive.Portal>
          </ContextMenuPrimitive.Sub>

          <ContextMenuPrimitive.Separator className="h-px bg-border my-1.5" />

          <ContextMenuPrimitive.Item className="flex items-center justify-between px-2 py-1.5 text-sm rounded-md cursor-pointer outline-none hover:bg-accent hover:text-accent-foreground transition-colors group">
            <div className="flex items-center gap-2">
              <Download size={16} className="text-muted-foreground group-hover:text-accent-foreground" />
              <span>Save as PDF</span>
            </div>
          </ContextMenuPrimitive.Item>

        </ContextMenuPrimitive.Content>
      </ContextMenuPrimitive.Portal>
    </ContextMenuPrimitive.Root>
  );
}
