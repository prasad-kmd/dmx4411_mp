import React from "react";
import Link from "next/link";
import {
  Github as GithubIcon,
  FileDown,
  AudioLines,
  Cpu,
  Mail,
  ExternalLink
} from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="w-full border-t bg-card text-card-foreground py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Section 1: About */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">About Project</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Digital Signal Processing mini project focused on audio noise removal
            using MATLAB filter design techniques and frequency domain analysis.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">3</span>
              <span className="text-[10px] uppercase text-muted-foreground">Signals</span>
            </div>
            <div className="flex flex-col items-center border-l pl-4">
              <span className="text-xl font-bold">3</span>
              <span className="text-[10px] uppercase text-muted-foreground">Filters</span>
            </div>
            <div className="flex flex-col items-center border-l pl-4">
              <span className="text-xl font-bold">MATLAB</span>
              <span className="text-[10px] uppercase text-muted-foreground">Tech</span>
            </div>
          </div>
        </div>

        {/* Section 2: Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Quick Links</h3>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: Technologies */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Technologies</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 text-muted-foreground">
              <Cpu size={16} /> MATLAB R2024b
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <ExternalLink size={16} /> Next.js 15
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <ExternalLink size={16} /> TypeScript
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <ExternalLink size={16} /> Tailwind CSS
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <AudioLines size={16} /> Recharts
            </li>
          </ul>
        </div>

        {/* Section 4: Resources */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Resources</h3>
          <div className="flex flex-col gap-3">
            <Link
              href="/MP_Full-Report.pdf"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm font-medium"
              target="_blank"
            >
              <FileDown size={18} /> Download PDF Report
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 px-4 py-2 rounded-md border hover:bg-accent transition-colors text-sm font-medium"
            >
              <GithubIcon size={18} /> View on GitHub
            </Link>
            <Link
              href="mailto:contact@example.com"
              className="flex items-center gap-2 px-4 py-2 rounded-md border hover:bg-accent transition-colors text-sm font-medium"
            >
              <Mail size={18} /> Contact Author
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <p>© 2024 DSP Mini Project</p>
          <span className="hidden md:inline">•</span>
          <p>Built with Next.js 15 & TypeScript</p>
        </div>
        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-primary">Privacy Policy</Link>
          <Link href="#" className="hover:text-primary">Terms of Service</Link>
          <p>Last Updated: April 2024</p>
        </div>
      </div>
    </footer>
  );
}
