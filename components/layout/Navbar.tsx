"use client";

import React, { useState, useEffect } from "react";
import { Settings, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-4 right-4 z-50 transition-all duration-300 ease-in-out flex items-center gap-2 px-3 py-2 rounded-full border bg-background/80 backdrop-blur-md shadow-sm",
        isScrolled ? "scale-95 shadow-md" : "scale-100"
      )}
    >
      <button className="p-2 rounded-full hover:bg-accent transition-colors" title="Settings">
        <Settings size={20} className="text-muted-foreground" />
      </button>

      <div className="w-px h-6 bg-border mx-1" />

      <ThemeToggle />

      <button className="md:hidden p-2 rounded-full hover:bg-accent transition-colors" title="Menu">
        <Menu size={20} className="text-muted-foreground" />
      </button>
    </header>
  );
}
