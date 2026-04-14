'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-col min-h-screen md:ml-64 transition-[margin] duration-300">
        <Navbar />
        <main className="flex-1 pt-20 px-6 pb-12 overflow-x-hidden">
          <div className="max-w-3xl mx-auto">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
