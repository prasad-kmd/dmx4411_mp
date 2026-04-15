"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, ListIcon } from "lucide-react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export function TableOfContents() {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll("h2, h3"))
      .map((element) => ({
        id: element.id,
        title: element.textContent || "",
        level: parseInt(element.tagName.charAt(1)),
      }))
      .filter((item) => item.id);

    setItems(headings);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0% -80% 0%" }
    );

    headings.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <nav className="hidden xl:block sticky top-32 w-64 h-fit ml-8 space-y-4">
      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
        <ListIcon size={16} />
        <span>On this page</span>
      </div>
      <ul className="space-y-2 border-l-2 border-muted pl-4">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              "text-sm transition-all duration-200",
              item.level === 3 ? "pl-4" : "",
              activeId === item.id
                ? "text-primary font-medium translate-x-1"
                : "text-muted-foreground hover:text-foreground hover:translate-x-0.5"
            )}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-2 py-1"
            >
              {activeId === item.id && <ChevronRight size={12} className="shrink-0" />}
              <span className="truncate">{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
