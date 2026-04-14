import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t py-8 px-6 mt-auto">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Audio Signal Denoising System</h3>
          <p className="text-sm text-muted-foreground">
            A digital signal processing project focused on removing noise from audio signals using MATLAB-designed filters.
          </p>
          <div className="flex gap-4 text-xs font-medium">
            <span className="bg-primary/30 px-2 py-1 rounded">3 Audio Files</span>
            <span className="bg-primary/30 px-2 py-1 rounded">3 Filter Types</span>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold uppercase text-xs tracking-tight text-muted-foreground">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/introduction" className="hover:underline">Introduction</Link></li>
            <li><Link href="/methodology" className="hover:underline">Methodology</Link></li>
            <li><Link href="/results" className="hover:underline">Results</Link></li>
            <li><Link href="/appendix" className="hover:underline">Full Code</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold uppercase text-xs tracking-tight text-muted-foreground">Technologies</h4>
          <ul className="space-y-2 text-sm">
            <li>MATLAB R2024b</li>
            <li>Next.js 15</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold uppercase text-xs tracking-tight text-muted-foreground">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">GitHub</a></li>
            <li><a href="#" className="hover:underline">Documentation</a></li>
            <li><a href="#" className="hover:underline">Report</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-8 pt-4 border-t text-center text-xs text-muted-foreground">
        © 2024 Audio Signal Denoising System. All rights reserved.
      </div>
    </footer>
  );
}
