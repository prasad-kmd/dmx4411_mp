import { Home, BookOpen, FlaskConical, Ruler, CircleHelp, MessageSquare, CheckCircle, Book, Folder } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NAVIGATION_ITEMS } from '@/lib/constants'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-1 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg px-2 py-1.5">
        <ThemeToggle />
        
        <div className="h-6 w-px bg-border mx-1" />
        
        <Link
          href="/"
          className={cn(
            'inline-flex items-center justify-center rounded-full p-2 transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            pathname === '/' && 'bg-accent text-accent-foreground'
          )}
          aria-label="Home"
        >
          <Home className="w-5 h-5" />
        </Link>
      </div>
    </nav>
  )
}
