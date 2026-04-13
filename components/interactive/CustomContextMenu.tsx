'use client'

import { useEffect, useState } from 'react'
import * as ContextMenu from '@radix-ui/react-context-menu'
import { 
  Copy, 
  Download, 
  Image, 
  Moon, 
  Sun, 
  Share2, 
  Type,
  FileCode,
  Sigma
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface ContextMenuProps {
  children: React.ReactNode
}

export function CustomContextMenu({ children }: ContextMenuProps) {
  const [selectedText, setSelectedText] = useState('')
  const [contextType, setContextType] = useState<'text' | 'code' | 'image' | 'equation' | 'global'>('global')

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection()
      setSelectedText(selection?.toString() || '')
    }

    document.addEventListener('selectionchange', handleSelectionChange)
    return () => document.removeEventListener('selectionchange', handleSelectionChange)
  }, [])

  const copyToClipboard = async (text: string, message: string = 'Copied!') => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(message)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const toggleTheme = () => {
    const html = document.documentElement
    html.classList.toggle('dark')
    toast.success('Theme toggled')
  }

  if (!children) return null

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content
          className={cn(
            'min-w-[220px] bg-popover text-popover-foreground rounded-lg shadow-lg p-2 z-50',
            'animate-in fade-in zoom-in-95 duration-200',
            'border border-border'
          )}
        >
          {/* Text Selection Context */}
          {selectedText && (
            <>
              <ContextMenu.Item
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground outline-none cursor-default"
                onSelect={() => copyToClipboard(selectedText, 'Text copied!')}
              >
                <Copy className="w-4 h-4" />
                <span>Copy Text</span>
              </ContextMenu.Item>
              <ContextMenu.Separator className="h-px bg-border my-1" />
            </>
          )}

          {/* Global Menu Items */}
          <ContextMenu.Item
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground outline-none cursor-default"
            onSelect={toggleTheme}
          >
            <Moon className="w-4 h-4 dark:hidden" />
            <Sun className="w-4 h-4 hidden dark:block" />
            <span>Toggle Theme</span>
          </ContextMenu.Item>

          <ContextMenu.Item
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground outline-none cursor-default"
            onSelect={() => window.print()}
          >
            <Download className="w-4 h-4" />
            <span>Print Page</span>
          </ContextMenu.Item>

          <ContextMenu.Item
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground outline-none cursor-default"
            onSelect={() => copyToClipboard(window.location.href, 'URL copied!')}
          >
            <Share2 className="w-4 h-4" />
            <span>Share Page</span>
          </ContextMenu.Item>

          <ContextMenu.Separator className="h-px bg-border my-1" />

          <ContextMenu.Sub>
            <ContextMenu.SubTrigger className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground outline-none cursor-default">
              <Type className="w-4 h-4" />
              <span>Font Size</span>
            </ContextMenu.SubTrigger>
            <ContextMenu.Portal>
              <ContextMenu.SubContent
                className={cn(
                  'min-w-[150px] bg-popover text-popover-foreground rounded-lg shadow-lg p-2',
                  'border border-border'
                )}
              >
                <ContextMenu.Item
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground outline-none cursor-default"
                  onSelect={() => document.documentElement.style.setProperty('--font-size-base', '14px')}
                >
                  Small
                </ContextMenu.Item>
                <ContextMenu.Item
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground outline-none cursor-default"
                  onSelect={() => document.documentElement.style.setProperty('--font-size-base', '16px')}
                >
                  Medium
                </ContextMenu.Item>
                <ContextMenu.Item
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground outline-none cursor-default"
                  onSelect={() => document.documentElement.style.setProperty('--font-size-base', '18px')}
                >
                  Large
                </ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}
