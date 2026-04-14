"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 md:pl-16 lg:pl-64 transition-all duration-300">
        <Navbar />

        <main className="flex-1 p-6 md:p-10 lg:p-12 pt-24 md:pt-24 lg:pt-24">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
