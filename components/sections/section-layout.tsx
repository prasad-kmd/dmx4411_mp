"use client"

import React from "react"
import { ContentRenderer } from "@/components/content-renderer"
import { ScrollProgress } from "@/components/scroll-progress"
import { motion } from "framer-motion"
import { ArticleSidebar } from "@/components/article-sidebar"
import { PageNavigation } from "./page-navigation"
import Image from "next/image"

interface SectionLayoutProps {
  title: string
  subtitle?: string
  content?: string
  children?: React.ReactNode
  heroImage?: string
}

export default function SectionLayout({ 
  title, 
  subtitle, 
  content, 
  children, 
  heroImage = "/img/about_us.webp" 
}: SectionLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <ScrollProgress />
      
      <header className="relative py-24 px-6 lg:px-8 overflow-hidden border-b border-border min-h-[40vh] flex items-center justify-center">
        <Image 
          src={heroImage} 
          alt={title} 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-black/60 z-0" />
        
        <div className="relative z-10 mx-auto max-w-6xl text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-black amoriaregular tracking-tight mb-6 drop-shadow-lg">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-gray-200 google-sans font-light max-w-2xl mx-auto drop-shadow-md">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <main id="article-content" className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {content && <ContentRenderer content={content} />}
              {children}
              <PageNavigation />
            </motion.div>
          </main>
          
          <ArticleSidebar 
            content={content || ""} 
          />
        </div>
      </div>
    </div>
  )
}
