"use client"

import React from "react"
import SectionLayout from "@/components/sections/section-layout"
import ComparisonAudioPlayer from "@/components/audio-player/comparison-audio-player"
import { PROJECT_DATA } from "@/lib/constants"
import { Music, AudioWaveform as Waveform, Info, Headphones, Sliders, Zap } from "lucide-react"
import { motion } from "framer-motion"

export default function AudioDemoPage() {
  return (
    <SectionLayout
      title="Audio Laboratory"
      subtitle="Interactive side-by-side comparison of corrupted and restored signals."
    >
      <div className="space-y-24 py-12">
        {/* Modern Intro Card */}
        <div className="relative group overflow-hidden rounded-[3rem] border border-border bg-card shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <div className="relative z-10 p-10 lg:p-16 flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-8">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-primary"
               >
                 <Headphones size={14} />
                 Sonic Assessment
               </motion.div>
               <div className="space-y-4">
                <h2 id="quality-assessment" className="text-4xl lg:text-5xl font-black font-google-sans leading-tight">A/B Quality Testing</h2>
                <p className="text-muted-foreground leading-relaxed local-inter text-lg font-light max-w-2xl">
                    Experience the effectiveness of digital restoration first-hand. Compare the raw acquisition from noisy environments against the output of our optimized Butterworth filtering system.
                </p>
               </div>
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
                  <div className="space-y-2">
                    <div className="p-2 w-fit rounded-lg bg-blue-500/10 text-blue-500">
                        <Zap size={16} />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Sample Rate</div>
                    <div className="text-sm font-bold">44.1 kHz</div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 w-fit rounded-lg bg-emerald-500/10 text-emerald-500">
                        <Sliders size={16} />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Bit Depth</div>
                    <div className="text-sm font-bold">16-bit PCM</div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 w-fit rounded-lg bg-purple-500/10 text-purple-500">
                        <Waveform size={16} />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Channels</div>
                    <div className="text-sm font-bold">Mono Summed</div>
                  </div>
               </div>
            </div>
            <div className="w-full lg:w-1/3 aspect-square rounded-[2rem] bg-muted/20 border border-border/50 flex items-center justify-center relative overflow-hidden">
               <motion.div
                 animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.2, 0.1]
                 }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute inset-0 bg-primary/20 rounded-full blur-[80px]"
               />
               <Waveform size={140} className="text-primary/30 relative z-10" />
            </div>
          </div>
        </div>

        {/* Comparison Players */}
        <div className="space-y-32">
          {PROJECT_DATA.audioSignals.map((signal, idx) => (
            <motion.div 
                key={signal.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="space-y-10"
            >
              <div className="flex items-center gap-6 px-4">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black ring-1 ring-primary/20">
                        0{idx + 1}
                    </div>
                    <h3 id={`signal-${signal.id}`} className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
                        Stage: {signal.name}
                    </h3>
                 </div>
                 <div className="h-px flex-1 bg-gradient-to-r from-border/50 to-transparent" />
              </div>

              <div className="relative">
                <ComparisonAudioPlayer
                    signalName={signal.name}
                    originalSrc={`/audio/Noisy/wav/${signal.file}`}
                    filteredSrc={`/audio/Filtered/filtered_${signal.file.replace('.wav', `_${signal.filterType === 'Low-Pass' ? 'LPF' : signal.filterType === 'High-Pass' ? 'HPF' : 'BSF'}.wav`)}`}
                    noiseType={signal.noiseType}
                    filterType={signal.filterType}
                    mse={signal.metrics.mse}
                    snrImprovement={signal.metrics.snrSignalNoise.improvement}
                    className="shadow-2xl shadow-primary/5 border-border/50"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                 {[
                    { title: "Observation", content: signal.noiseDescription, icon: Info, color: "text-blue-500", bg: "bg-blue-500/5" },
                    { title: "Filter Action", content: `Applied a ${signal.filterParams.order}-order ${signal.filterType} filter with fc = ${signal.filterType === 'Band-Stop/Notch' ? `${signal.filterParams.centerFreq} Hz` : `${signal.filterParams.cutoff} Hz`}.`, icon: Sliders, color: "text-emerald-500", bg: "bg-emerald-500/5" },
                    { title: "Result", content: `Reduced MSE to ${signal.metrics.mse.toFixed(6)} with a spectral shift observed in the visualizer.`, icon: Zap, color: "text-purple-500", bg: "bg-purple-500/5" }
                 ].map((card, i) => (
                    <div key={i} className="group flex flex-col gap-4 p-6 rounded-[2rem] bg-card border border-border/50 hover:border-primary/30 transition-all shadow-sm">
                        <div className={cn("p-2.5 w-fit rounded-xl ring-1 ring-black/5 dark:ring-white/5", card.bg, card.color)}>
                           <card.icon size={16} />
                        </div>
                        <div className="space-y-2">
                           <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">{card.title}</h4>
                           <p className="text-xs text-muted-foreground leading-relaxed local-inter font-medium opacity-80">
                              {card.content}
                           </p>
                        </div>
                    </div>
                 ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionLayout>
  )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
