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
    <div className="w-full overflow-x-auto rounded-[2rem] border border-border bg-card shadow-2xl shadow-primary/5">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border/50">
            <th className="p-8 text-left sticky left-0 bg-card z-10 w-64">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/50">Comparison Matrix</span>
            </th>
            {PROJECT_DATA.audioSignals.map((signal, idx) => (
              <th 
                key={signal.id} 
                className={cn(
                  "p-8 text-center transition-colors min-w-[200px]",
                  hoveredCol === idx ? "bg-primary/5" : ""
                )}
                onMouseEnter={() => setHoveredCol(idx)}
                onMouseLeave={() => setHoveredCol(null)}
              >
                <div className="flex flex-col items-center gap-3">
                   <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {idx + 1}
                   </div>
                   <span className="text-lg font-bold font-google-sans">{signal.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/30">
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="group hover:bg-muted/30 transition-colors">
              <td className="p-6 font-bold text-xs uppercase tracking-widest text-muted-foreground/80 sticky left-0 bg-card group-hover:bg-muted/30 z-10 flex items-center gap-3">
                <row.icon size={14} className="text-primary/40" />
                {row.label}
              </td>
              {PROJECT_DATA.audioSignals.map((signal, colIdx) => {
                const value = typeof row.key === 'function' ? row.key(signal) : (signal as any)[row.key]
                
                return (
                  <td 
                    key={signal.id} 
                    className={cn(
                      "p-6 text-center transition-colors",
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
