'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  BookOpen,
  FlaskConical,
  Settings,
  BarChart3,
  MessageSquare,
  CheckCircle,
  Link as LinkIcon,
  FileText
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Introduction', href: '/introduction', icon: BookOpen },
  { name: 'Methodology', href: '/methodology', icon: FlaskConical },
  { name: 'Design', href: '/design', icon: Settings },
  { name: 'Results', href: '/results', icon: BarChart3 },
  { name: 'Discussion', href: '/discussion', icon: MessageSquare },
  { name: 'Conclusion', href: '/conclusion', icon: CheckCircle },
  { name: 'References', href: '/references', icon: LinkIcon },
  { name: 'Appendix', href: '/appendix', icon: FileText },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-card border-r transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center justify-between px-4 border-b">
          {!collapsed && <span className="font-bold text-lg truncate">DSP Project</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md hover:bg-accent transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon size={20} className="shrink-0" />
                {!collapsed && <span className="font-medium truncate">{item.name}</span>}
                {collapsed && (
                  <div className="absolute left-16 bg-popover text-popover-foreground px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-md border">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t text-xs text-muted-foreground">
          {!collapsed ? (
            <div className="space-y-1">
              <p>© 2024 Audio Signal Denoising</p>
              <p>Undergraduate Research</p>
            </div>
          ) : (
            <div className="text-center">©</div>
          )}
        </div>
      </div>
    </aside>
  );
}
