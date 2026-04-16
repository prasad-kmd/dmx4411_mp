'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  label: string;
}

export function FloatingTOC({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = React.useState<string>('');
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -35% 0%', threshold: 0 }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
      <motion.div
        animate={{ width: isCollapsed ? 48 : 240 }}
        className="glass rounded-2xl overflow-hidden p-2"
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-3 w-full p-2 hover:bg-white/5 rounded-xl transition-colors mb-2"
        >
          <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
            <List className="size-4" />
          </div>
          {!isCollapsed && <span className="text-xs font-bold uppercase tracking-widest">On this page</span>}
        </button>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-1"
            >
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left",
                    activeId === item.id
                      ? "bg-primary text-primary-foreground translate-x-1"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  <ChevronRight className={cn("size-3 transition-transform", activeId === item.id ? "rotate-90" : "")} />
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
