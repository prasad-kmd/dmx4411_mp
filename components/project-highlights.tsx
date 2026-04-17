"use client"

import React from "react"
import { motion } from "framer-motion"
import { AudioWaveform as Waveform, Music, Filter, Zap, Play, Activity, Settings2, BarChart } from "lucide-react"
import { PROJECT_DATA } from "@/lib/constants"
import CompactAudioPlayer from "@/components/audio-player/compact-audio-player"
import Link from "next/link"

export default function ProjectHighlights() {
  return (
    <section className="px-6 py-32 lg:px-8 bg-muted/5 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="mb-20 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest"
          >
            <Settings2 size={12} />
            Signal Analysis
          </motion.div>
          <h2 className="text-3xl font-black philosopher lg:text-5xl tracking-tight">
            Project Highlights
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground local-inter text-lg font-light">
            Analysis of three distinct signal corruption profiles and their optimized digital restoration strategies.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {PROJECT_DATA.audioSignals.map((signal, idx) => (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative flex flex-col h-full rounded-[2rem] border border-border bg-card/50 backdrop-blur-sm p-6 transition-all hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5"
            >
              {/* Top Section */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">
                        {signal.name}
                    </span>
                    <h3 className="text-xl font-black font-google-sans group-hover:text-primary transition-colors">
                        {signal.file.replace('.wav', '')}
                    </h3>
                </div>
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:rotate-12 transition-transform">
                  <Music className="h-5 w-5" />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background border border-border text-[9px] font-black uppercase tracking-wider text-muted-foreground">
                    <Activity size={10} className="text-blue-500" />
                    {signal.noiseType}
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background border border-border text-[9px] font-black uppercase tracking-wider text-muted-foreground">
                    <Filter size={10} className="text-emerald-500" />
                    {signal.filterType}
                </div>
              </div>

              <p className="mb-8 text-xs text-muted-foreground leading-relaxed local-inter font-medium flex-grow">
                {signal.noiseDescription}
              </p>

              {/* Mini Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                 <div className="p-3 rounded-2xl bg-muted/30 border border-border/50">
                    <div className="text-[8px] uppercase tracking-widest font-black text-muted-foreground/60 mb-1">Fundamental</div>
                    <div className="text-xs font-black font-google-sans">{signal.fundamentalFreq} Hz</div>
                 </div>
                 <div className="p-3 rounded-2xl bg-muted/30 border border-border/50">
                    <div className="text-[8px] uppercase tracking-widest font-black text-muted-foreground/60 mb-1">Filter Order</div>
                    <div className="text-xs font-black font-google-sans">{signal.filterParams.order}</div>
                 </div>
              </div>

              {/* Audio Player */}
              <div className="mt-auto">
                <CompactAudioPlayer 
                    src={`/audio/Filtered/filtered_${signal.file.replace('.wav', `_${signal.filterType === 'Low-Pass' ? 'LPF' : signal.filterType === 'High-Pass' ? 'HPF' : 'BSF'}.wav`)}`}
                    title={signal.file}
                    subtitle="Processed Result"
                    type="Filtered"
                    triggerLabel="Listen Processed"
                />
              </div>
              
              {/* Subtle background icon */}
              <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                 <Waveform size={140} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all button / CTA */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center"
        >
            <Link 
                href="/audio-demo" 
                className="group flex items-center gap-3 px-8 py-3 rounded-full border border-border bg-card hover:bg-muted transition-all text-[11px] font-black uppercase tracking-[0.2em]"
            >
                <BarChart size={14} className="text-primary" />
                View Full Signal Comparison
            </Link>
        </motion.div>
      </div>
    </section>
  )
}
