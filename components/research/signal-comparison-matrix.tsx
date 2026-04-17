"use client"

import React, { useState } from "react"
import { PROJECT_DATA } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Star, ShieldCheck, Activity, Filter, Info } from "lucide-react"

export default function SignalComparisonMatrix() {
  const [hoveredCol, setHoveredCol] = useState<number | null>(null)

  const rows = [
    { label: "Signal Name", key: "name", icon: Info },
    { label: "Filename", key: "file", icon: Info },
    { label: "Noise Type", key: "noiseType", icon: Activity, badge: true },
    { label: "Filter Applied", key: "filterType", icon: Filter, badge: true },
    { label: "Cutoff Frequency", key: (s: any) => s.filterType === 'Band-Stop/Notch' ? `${s.filterParams.centerFreq} Hz` : `${s.filterParams.cutoff} Hz`, icon: Activity },
    { label: "Filter Order", key: (s: any) => s.filterParams.order, icon: Activity },
    { label: "MSE Value", key: (s: any) => s.metrics.mse.toFixed(6), icon: Activity, mono: true },
    { label: "SNR Improvement", key: (s: any) => `${s.metrics.snrSignalNoise.improvement.toFixed(2)} dB`, icon: ShieldCheck, mono: true, colorScale: true },
    { label: "Qualitative Assessment", key: (s: any) => {
        if (s.id === 'audio-1') return "Excellent"
        if (s.id === 'audio-2') return "Partial"
        if (s.id === 'audio-3') return "Good"
        return "N/A"
    }, icon: Star, rating: true }
  ]

  return (
    <div className="w-full overflow-x-auto rounded-[2.5rem] border border-border bg-card/50 shadow-2xl backdrop-blur-sm">
      <table className="w-full border-collapse min-w-[800px] table-fixed">
        <thead>
          <tr className="border-b border-border/50 bg-muted/20">
            <th className="p-6 text-left sticky left-0 bg-card/90 backdrop-blur-md z-10 w-48">
               <span className="text-[10px] font-black uppercase tracking-widest text-primary/70">Comparison Matrix</span>
            </th>
            {PROJECT_DATA.audioSignals.map((signal, idx) => (
              <th 
                key={signal.id} 
                className={cn(
                  "p-6 text-center transition-colors",
                  hoveredCol === idx ? "bg-primary/5" : ""
                )}
                onMouseEnter={() => setHoveredCol(idx)}
                onMouseLeave={() => setHoveredCol(null)}
              >
                <div className="flex flex-col items-center gap-2">
                   <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-black">
                      {idx + 1}
                   </div>
                   <span className="text-sm font-black font-google-sans tracking-tight">{signal.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/30">
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="group hover:bg-muted/20 transition-colors">
              <td className="p-4 pl-6 font-bold text-[10px] uppercase tracking-widest text-muted-foreground/60 sticky left-0 bg-card/90 backdrop-blur-md group-hover:bg-muted/20 z-10 flex items-center gap-2 h-14">
                <row.icon size={12} className="text-primary/30" />
                {row.label}
              </td>
              {PROJECT_DATA.audioSignals.map((signal, colIdx) => {
                const value = typeof row.key === 'function' ? row.key(signal) : (signal as any)[row.key]
                
                return (
                  <td 
                    key={signal.id} 
                    className={cn(
                      "p-4 text-center transition-colors h-14",
                      hoveredCol === colIdx ? "bg-primary/5" : ""
                    )}
                    onMouseEnter={() => setHoveredCol(colIdx)}
                    onMouseLeave={() => setHoveredCol(null)}
                  >
                    {row.badge ? (
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border",
                        row.label === "Noise Type" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-primary/10 text-primary border-primary/20"
                      )}>
                        {value}
                      </span>
                    ) : row.rating ? (
                      <div className="flex items-center justify-center gap-1 text-primary">
                        {Array.from({ length: 5 }).map((_, i) => (
                           <Star 
                            key={i} 
                            size={12} 
                            className={cn(
                                i < (value === "Excellent" ? 5 : value === "Good" ? 4 : 3) ? "fill-current" : "opacity-20"
                            )} 
                           />
                        ))}
                      </div>
                    ) : (
                      <span className={cn(
                        "text-sm font-bold",
                        row.mono ? "local-jetbrains-mono" : "font-google-sans",
                        row.colorScale ? (parseFloat(value) > 0 ? "text-emerald-500" : "text-amber-500") : ""
                      )}>
                        {value}
                      </span>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
