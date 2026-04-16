"use client"

import React from "react"
import { motion } from "framer-motion"
import { Activity, BarChart3, Info } from "lucide-react"
import SingleAudioPlayer from "./single-audio-player"
import { cn } from "@/lib/utils"

interface ComparisonAudioPlayerProps {
  signalName: string
  originalSrc: string
  filteredSrc: string
  noiseType: string
  filterType: string
  mse: number
  snrImprovement: number
  className?: string
}

export default function ComparisonAudioPlayer({
  signalName,
  originalSrc,
  filteredSrc,
  noiseType,
  filterType,
  mse,
  snrImprovement,
  className,
}: ComparisonAudioPlayerProps) {
  return (
    <div className={cn("rounded-3xl border border-border bg-card p-1", className)}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 border-b border-border/50">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-google-sans leading-tight">{signalName}</h3>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-black mt-1">
              {noiseType} <span className="mx-2 text-border">|</span> {filterType} Filter
            </p>
          </div>
        </div>
        
        <div className="flex gap-4">
           <div className="rounded-2xl border border-border bg-muted/30 px-4 py-2 text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">MSE</p>
              <p className="text-sm font-bold local-jetbrains-mono">{mse.toFixed(6)}</p>
           </div>
           <div className="rounded-2xl border border-border bg-muted/30 px-4 py-2 text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">SNR Δ</p>
              <p className={cn(
                "text-sm font-bold local-jetbrains-mono",
                snrImprovement > 0 ? "text-emerald-500" : "text-amber-500"
              )}>
                {snrImprovement > 0 ? "+" : ""}{snrImprovement.toFixed(2)} dB
              </p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
            <Info size={12} />
            Unprocessed Signal
          </div>
          <SingleAudioPlayer
            src={originalSrc}
            title="Original Audio"
            subtitle="Raw corrupted recording"
            type="Original"
            accentColor="muted"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
            <BarChart3 size={12} />
            Denoised Result
          </div>
          <SingleAudioPlayer
            src={filteredSrc}
            title="Filtered Audio"
            subtitle={`${filterType} processed`}
            type="Filtered"
            accentColor="primary"
          />
        </div>
      </div>

      <div className="bg-muted/30 px-6 py-4 rounded-b-[22px] flex items-center justify-center">
         <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest text-center italic">
           * Visualization represents frequency spectrum characteristics in real-time
         </p>
      </div>
    </div>
  )
}
