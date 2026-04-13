"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Sun, Moon, Search, ExternalLink, X } from 'lucide-react';
import { useStore } from '@/lib/store';

interface NavbarProps {
  onSearch: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const { theme, toggleTheme } = useStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3 shrink-0"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-black text-xl">A</span>
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block">DSP.Audio</span>
        </motion.div>

        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search content, equations, code..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-gray-100 dark:bg-gray-900 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </button>

          <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-1" />

          <a
            href="/MP_Full-Report.pdf"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full text-xs font-bold hover:opacity-90 transition-opacity"
          >
            Report <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="absolute inset-0 bg-white dark:bg-[#0a0a0a] z-[60] flex items-center px-6 md:hidden">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            autoFocus
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-1 bg-transparent border-none focus:ring-0 text-lg"
          />
          <button onClick={() => setIsSearchOpen(false)}>
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
