'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  BookOpen, 
  FlaskConical, 
  Ruler, 
  CircleHelp, 
  MessageSquare, 
  CheckCircle, 
  Book, 
  Folder,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAVIGATION_ITEMS } from '@/lib/constants'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  'book-open': BookOpen,
  'flask-conical': FlaskConical,
  ruler: Ruler,
  'circle-help': CircleHelp,
  'message-square': MessageSquare,
  'check-circle': CheckCircle,
  book: Book,
  folder: Folder,
}

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true)
  const pathname = usePathname()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [isOpen, setIsOpen] = useState(false)

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 left-4 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25 }}
                className="fixed left-0 top-0 bottom-0 w-64 bg-background border-r border-border z-50 p-4"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Navigation</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-accent rounded-md"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
                <nav className="space-y-1">
                  {NAVIGATION_ITEMS.map((item) => {
                    const Icon = iconMap[item.icon || 'home']
                    const isActive = pathname === item.href
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                          'hover:bg-accent hover:text-accent-foreground',
                          isActive && 'bg-accent text-accent-foreground'
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    )
                  })}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    )
  }

  return (
    <motion.aside
      initial={{ width: isExpanded ? 256 : 64 }}
      animate={{ width: isExpanded ? 256 : 64 }}
      className="fixed left-0 top-0 bottom-0 z-40 bg-background border-r border-border overflow-hidden"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className={cn(
          'flex items-center justify-between p-4 border-b border-border',
          !isExpanded && 'justify-center'
        )}>
          {isExpanded && (
            <h1 className="text-lg font-bold truncate">DSP Project</h1>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-accent rounded-md transition-colors"
            aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isExpanded ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto scrollbar-thin">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = iconMap[item.icon || 'home']
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                  'hover:bg-accent hover:text-accent-foreground',
                  isActive && 'bg-accent text-accent-foreground',
                  !isExpanded && 'justify-center'
                )}
                title={!isExpanded ? item.title : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isExpanded && <span className="truncate">{item.title}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        {isExpanded && (
          <div className="p-4 border-t border-border text-xs text-muted-foreground">
            <p>DSP Mini Project</p>
            <p className="mt-1">© 2024</p>
          </div>
        )}
      </div>
    </motion.aside>
  )
}
