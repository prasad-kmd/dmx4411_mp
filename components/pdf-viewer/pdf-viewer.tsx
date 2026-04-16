"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, ExternalLink, Loader2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PDFViewerProps {
  url: string
  title: string
}

export default function PDFViewer({ url, title }: PDFViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showViewer, setShowViewer] = useState(false)

  return (
    <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-2xl">
      {!showViewer ? (
        <div className="flex flex-col items-center justify-center p-16 text-center">
          <div className="h-24 w-24 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mb-6">
             <FileText size={48} />
          </div>
          <h3 className="text-2xl font-bold font-google-sans mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground local-inter mb-8 max-w-sm mx-auto">
             Click below to view the full research paper in an interactive PDF viewer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
                onClick={() => setShowViewer(true)}
                className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-xs"
            >
                Load Interactive Viewer
            </Button>
            <Button
                variant="outline"
                asChild
                className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-xs"
            >
                <a href={url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-2" />
                    Open in New Tab
                </a>
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative h-[800px] w-full bg-muted/50">
           {!isLoaded && (
             <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/50 backdrop-blur-sm z-10">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Streaming Document...</p>
             </div>
           )}
           <iframe
             src={`${url}#toolbar=0`}
             className="w-full h-full border-none"
             onLoad={() => setIsLoaded(true)}
             title={title}
           />
           <div className="absolute bottom-6 right-6 flex gap-3">
              <Button
                onClick={() => setShowViewer(false)}
                variant="secondary"
                className="h-10 px-6 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-xl"
              >
                Close Viewer
              </Button>
              <Button
                asChild
                className="h-10 px-6 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20"
              >
                <a href={url} target="_blank" rel="noopener noreferrer">
                    <Maximize2 size={14} className="mr-2" />
                    Full Screen
                </a>
              </Button>
           </div>
        </div>
      )}
    </div>
  )
}
