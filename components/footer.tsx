import Link from 'next/link';
import { PROJECT_DATA } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 py-12 glass mt-20">
      <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
              DSP
            </div>
            <span className="font-bold tracking-tight">Audio Denoising Research</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Digital Signal Processing (DSP) Mini Project focused on audio denoising using MATLAB-designed digital filters.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h4>
          <ul className="space-y-2">
            {PROJECT_DATA.navLinks.slice(0, 5).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/appendix" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                MATLAB Code
              </Link>
            </li>
            <li>
              <Link href="/references" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                References
              </Link>
            </li>
            <li>
              <a href="/MP_Full-Report.pdf" target="_blank" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Full PDF Report
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container px-4 mx-auto mt-12 pt-8 border-t border-border/20 text-center">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} DMX 4411 Signal Processing Mini Project. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
