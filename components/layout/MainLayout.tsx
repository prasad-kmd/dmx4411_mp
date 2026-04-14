'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ClickSparkEffect } from '../interactive/ClickSparkEffect';
import { CustomContextMenu } from '../interactive/CustomContextMenu';
import { TooltipProvider } from '../interactive/CustomTooltip';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={100}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <ClickSparkEffect />
        <Sidebar />
        <div className="flex flex-col min-h-screen md:ml-64 transition-[margin] duration-300">
          <Navbar />
          <CustomContextMenu>
            <main className="flex-1 pt-20 px-6 pb-12 overflow-x-hidden">
              <div className="max-w-3xl mx-auto">
                {children}
              </div>
            </main>
          </CustomContextMenu>
          <Footer />
        </div>
      </div>
    </TooltipProvider>
  );
}
