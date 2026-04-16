"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleSidebarProps {
  content: string;
}

export function ArticleSidebar({ content }: ArticleSidebarProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = document.getElementById("article-content");
    if (!container) return;

    const extractHeadings = () => {
      const headingElements = container.querySelectorAll("h2, h3, h4");
      const extractedHeadings = Array.from(headingElements).map((el) => {
        // Use existing ID or generate a stable-ish one from text
        if (!el.id) {
          el.id = el.textContent 
            ? el.textContent.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
            : `section-${Math.random().toString(36).substring(2, 9)}`;
        }
        return {
          level: parseInt(el.tagName.replace("H", "")),
          id: el.id,
          text: el.textContent?.trim() || "",
        };
      });
      setHeadings(extractedHeadings);
    };

    // Wait a bit for React to render children
    const timer = setTimeout(extractHeadings, 100);

    // Re-scan if the DOM changes
    const observer = new MutationObserver(extractHeadings);
    observer.observe(container, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" },
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    if (activeId && navRef.current) {
      const activeLink = navRef.current.querySelector(
        `a[href="#${activeId}"]`,
      ) as HTMLElement;
      if (activeLink) {
        activeLink.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [activeId]);

  return (
    <aside className="hidden lg:block w-72 shrink-0">
      <div className="sticky top-24 flex flex-col gap-10 max-h-[calc(100vh-8rem)]">
        {headings.length > 0 && (
          <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="flex items-center gap-2 mb-6 px-1 shrink-0">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/50">
                Table of Contents
              </p>
            </div>
            <nav
              ref={navRef}
              className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-8 text-pretty"
            >
              <ul className="space-y-1 border-l border-border/40 ml-0.5">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(heading.id)?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                      className={cn(
                        "group flex items-center py-2 pr-4 transition-all hover:text-primary relative",
                        heading.level === 4
                          ? "pl-12 text-[11px]"
                          : heading.level === 3
                            ? "pl-8 text-xs"
                            : "pl-4 text-sm font-medium",
                        activeId === heading.id
                          ? "text-primary border-l-2 border-primary -ml-[1.5px] bg-primary/5"
                          : "text-muted-foreground border-l border-transparent",
                      )}
                    >
                      <span className="line-clamp-2">{heading.text}</span>
                      <ChevronRight
                        className={cn(
                          "h-3 w-3 ml-auto opacity-0 transition-all group-hover:opacity-100 shrink-0",
                          activeId === heading.id && "opacity-100",
                        )}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </aside>
  );
}
