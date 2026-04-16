"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

const PAGE_SEQUENCE = [
  { title: "Home", href: "/" },
  { title: "Introduction", href: "/introduction" },
  { title: "Methodology", href: "/methodology" },
  { title: "Noise Identification", href: "/design/noise-identification" },
  { title: "Filter Selection", href: "/design/filter-selection" },
  { title: "Filter Implementation", href: "/design/filter-implementation" },
  { title: "Filtered Signal Analysis", href: "/results/filtered-signal-analysis" },
  { title: "Performance Metrics", href: "/results/performance-metrics" },
  { title: "Audio Quality Assessment", href: "/results/audio-quality-assessment" },
  { title: "Audio Demo Showcase", href: "/audio-demo" },
  { title: "Discussion", href: "/discussion" },
  { title: "Conclusion", href: "/conclusion" },
  { title: "References", href: "/references" },
  { title: "Appendix", href: "/appendix" },
]

export function PageNavigation() {
  const pathname = usePathname()
  
  // Find current index based on exact match or being the start of the path
  const currentIndex = PAGE_SEQUENCE.findIndex(page => {
    if (page.href === "/") return pathname === "/"
    return pathname === page.href || pathname.startsWith(page.href + "/")
  })

  if (currentIndex === -1) return null

  const prevPage = PAGE_SEQUENCE[currentIndex - 1]
  const nextPage = PAGE_SEQUENCE[currentIndex + 1]

  return (
    <div className="mt-20 border-t border-border pt-10">
      <div className="flex flex-col sm:flex-row gap-8 justify-between items-center max-w-4xl mx-auto">
        {prevPage ? (
          <Link
            href={prevPage.href}
            className="group flex flex-col gap-1.5 min-w-[160px] text-left transition-all hover:-translate-x-1"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-1 group-hover:text-primary transition-colors">
              <ChevronLeft size={12} className="transition-transform group-hover:-translate-x-1" /> Previous
            </span>
            <span className="text-[13px] font-bold font-google-sans text-foreground group-hover:text-primary transition-colors truncate max-w-[250px]">
              {prevPage.title}
            </span>
          </Link>
        ) : <div className="hidden sm:block min-w-[160px]" />}

        {nextPage ? (
          <Link
            href={nextPage.href}
            className="group flex flex-col gap-1.5 min-w-[160px] text-right transition-all hover:translate-x-1"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-1 justify-end group-hover:text-primary transition-colors">
              Next <ChevronRight size={12} className="transition-transform group-hover:translate-x-1" />
            </span>
            <span className="text-[13px] font-bold font-google-sans text-foreground group-hover:text-primary transition-colors truncate max-w-[250px]">
              {nextPage.title}
            </span>
          </Link>
        ) : <div className="hidden sm:block min-w-[160px]" />}
      </div>
    </div>
  )
}
