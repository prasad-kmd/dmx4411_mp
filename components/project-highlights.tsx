"use client"

import React from "react"
import { motion } from "framer-motion"
import { AudioWaveform as Waveform, Music, Filter, Zap, Play } from "lucide-react"
import { PROJECT_DATA } from "@/lib/constants"
import CompactAudioPlayer from "@/components/audio-player/compact-audio-player"

export default function ProjectHighlights() {
  return (
    <section className="px-6 py-24 lg:px-8 bg-muted/5">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold philosopher lg:text-4xl">
            Project Highlights
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground local-inter">
            Deep dive into the three distinct audio signals analyzed and processed in this research.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {PROJECT_DATA.audioSignals.map((signal, idx) => (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Music className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-2 items-end">
                    <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
                    {signal.noiseType}
                    </span>
                    <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-secondary/10 text-secondary border border-secondary/20">
                    {signal.filterType}
                    </span>
                </div>
              </div>

              <h3 className="mb-2 text-2xl font-bold font-google-sans">
                {signal.file}
              </h3>
              <p className="mb-8 text-sm text-muted-foreground leading-relaxed local-inter">
                {signal.noiseDescription}
              </p>

              <div className="space-y-4 mb-8">
                 <div className="flex items-center justify-between text-xs border-b border-border/50 pb-2">
                    <span className="text-muted-foreground uppercase tracking-widest font-bold">Freq Component</span>
                    <span className="font-bold local-jetbrains-mono">{signal.fundamentalFreq} Hz</span>
                 </div>
                 <div className="flex items-center justify-between text-xs border-b border-border/50 pb-2">
                    <span className="text-muted-foreground uppercase tracking-widest font-bold">Filter Order</span>
                    <span className="font-bold local-jetbrains-mono">{signal.filterParams.order}</span>
                 </div>
              </div>

              <CompactAudioPlayer 
                src={`/audio/Filtered/filtered_${signal.file.replace('.wav', `_${signal.filterType === 'Low-Pass' ? 'LPF' : signal.filterType === 'High-Pass' ? 'HPF' : 'BSF'}.wav`)}`}
                title={signal.file}
                subtitle={`${signal.filterType} Filtered`}
                type="Filtered"
                triggerLabel="Listen Filtered"
              />
              
              {/* Decorative Background Element */}
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                 <Waveform size={180} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
