import * as React from "react"
import { cn } from "@/lib/utils"

export interface DropdownMenuProps {
  children: React.ReactNode
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  return children
}

export function DropdownMenuTrigger({ 
  children, 
  asChild 
}: { 
  children: React.ReactNode
  asChild?: boolean
}) {
  return <>{children}</>
}

export function DropdownMenuContent({ 
  children, 
  align = "center",
  className 
}: { 
  children: React.ReactNode
  align?: "start" | "center" | "end"
  className?: string
}) {
  return (
    <div 
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      style={{ position: 'absolute' }}
    >
      {children}
    </div>
  )
}

export function DropdownMenuItem({ 
  children, 
  onClick,
  className 
}: { 
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return (
    <div className={cn("-mx-1 my-1 h-px bg-muted", className)} />
  )
}
