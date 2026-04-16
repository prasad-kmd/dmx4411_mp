"use client"

import React from "react"
import { ContentRenderer } from "@/components/content-renderer"
import { ScrollProgress } from "@/components/scroll-progress"
import { motion } from "framer-motion"
import { ArticleSidebar } from "@/components/article-sidebar"

interface SectionLayoutProps {
  title: string
  subtitle?: string
  content?: string
  children?: React.ReactNode
  date?: string
  author?: {
    name: string;
    avatar: string;
    role: string;
    bio: string;
  } | null;
}

export default function SectionLayout({ title, subtitle, content, children, date, author }: SectionLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <ScrollProgress />

      <header className="relative py-24 px-6 lg:px-8 overflow-hidden border-b border-border bg-card/30">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,var(--primary)_0%,transparent_100%)] opacity-[0.03]" />
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-black amoriaregular tracking-tight mb-6">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-muted-foreground google-sans font-light max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <main className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {content && <ContentRenderer content={content} />}
              {children}
            </motion.div>
          </main>

          <ArticleSidebar
            content={content || ""}
            author={author}
            lastUpdated={date}
          />
        </div>
      </div>
    </div>
  )
}
