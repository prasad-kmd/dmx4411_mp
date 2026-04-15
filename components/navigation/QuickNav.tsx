"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  BookOpen,
  FlaskConical,
  Settings,
  BarChart3,
  MessageSquare,
  CheckCircle,
  FileText,
  Home,
  Sun,
  Moon,
  Keyboard
} from "lucide-react";
import { useThemeStore } from "@/lib/theme-store";
import { NAV_ITEMS } from "@/lib/constants";

export function QuickNav() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { mode, toggleMode } = useThemeStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-all z-40 group"
        title="Quick Navigation (Ctrl+K)"
      >
        <Keyboard size={20} />
        <span className="absolute right-full mr-3 bg-card px-2 py-1 rounded border text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Ctrl + K
        </span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            {NAV_ITEMS.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => runCommand(() => router.push(item.href))}
              >
                {/* Fallback to FileText if icon not found */}
                <FileText className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => runCommand(() => toggleMode())}>
              {mode === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
              <span>Toggle {mode === "dark" ? "Light" : "Dark"} Mode</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
