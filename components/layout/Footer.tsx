import { SITE_METADATA } from '@/lib/constants'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {SITE_METADATA.description}
            </p>
            <div className="flex gap-2">
              <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                DSP
              </span>
              <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                MATLAB
              </span>
              <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                Audio Processing
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <Link href="/introduction" className="block hover:text-accent transition-colors">
                Introduction
              </Link>
              <Link href="/methodology" className="block hover:text-accent transition-colors">
                Methodology
              </Link>
              <Link href="/design" className="block hover:text-accent transition-colors">
                Design
              </Link>
              <Link href="/results" className="block hover:text-accent transition-colors">
                Results
              </Link>
              <Link href="/discussion" className="block hover:text-accent transition-colors">
                Discussion
              </Link>
            </nav>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Technologies</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Next.js 15</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>MATLAB</li>
              <li>KaTeX</li>
              <li>Framer Motion</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <div className="space-y-2 text-sm">
              <a 
                href="/public/MP_Full-Report.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover:text-accent transition-colors"
              >
                Download PDF Report
              </a>
              <Link href="/references" className="block hover:text-accent transition-colors">
                View References
              </Link>
              <Link href="/appendix" className="block hover:text-accent transition-colors">
                Appendix & Code
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} DSP Mini Project. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with Next.js, Tailwind CSS, and TypeScript
          </p>
        </div>
      </div>
    </footer>
  )
}
