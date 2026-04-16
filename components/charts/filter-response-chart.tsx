"use client"

import React, { useMemo } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
  Area,
  AreaChart,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Info, BarChart } from "lucide-react"

interface ResponsePoint {
  freq: number
  magnitude: number
  phase: number
}

interface FilterResponseChartProps {
  filterType: "Low-Pass" | "Band-Stop/Notch" | "High-Pass"
  order: number
  cutoffFreq?: number
  centerFreq?: number
  bandwidth?: number
  lowCutoff?: number
  highCutoff?: number
}

export default function FilterResponseChart({
  filterType,
  order,
  cutoffFreq,
  centerFreq,
  bandwidth,
  lowCutoff,
  highCutoff,
}: FilterResponseChartProps) {
  const data = useMemo(() => {
    const points: ResponsePoint[] = []
    const numPoints = 150
    const maxFreq = 22050
    const Fs = 44100

    for (let i = 0; i <= numPoints; i++) {
      // Use log scale for better visualization of frequency response
      const freq = Math.pow(10, (i / numPoints) * Math.log10(maxFreq - 1)) + 1
      let magnitude = 0
      let phase = 0

      if (filterType === "Low-Pass" && cutoffFreq) {
        // Butterworth Magnitude Response: |H(f)| = 1 / sqrt(1 + (f/fc)^(2n))
        magnitude = 1 / Math.sqrt(1 + Math.pow(freq / cutoffFreq, 2 * order))
        // Approximation of Phase Response
        phase = - (order * 90) * (freq / (freq + cutoffFreq))
      } else if (filterType === "Band-Stop/Notch" && lowCutoff && highCutoff) {
        const fc = centerFreq || Math.sqrt(lowCutoff * highCutoff)
        const BW = bandwidth || (highCutoff - lowCutoff)
        // Normalized frequency difference
        const x = (freq * freq - fc * fc) / (freq * BW)
        magnitude = 1 / Math.sqrt(1 + Math.pow(1 / x, 2 * order))
        phase = Math.atan(1/x) * (180/Math.PI)
      } else if (filterType === "High-Pass" && cutoffFreq) {
        // Butterworth High-Pass: |H(f)| = 1 / sqrt(1 + (fc/f)^(2n))
        magnitude = 1 / Math.sqrt(1 + Math.pow(cutoffFreq / freq, 2 * order))
        phase = (order * 90) * (cutoffFreq / (freq + cutoffFreq))
      }

      // Convert magnitude to dB
      const magDB = 20 * Math.log10(Math.max(magnitude, 0.0001))

      points.push({
        freq: Math.round(freq),
        magnitude: parseFloat(magDB.toFixed(2)),
        phase: parseFloat(phase.toFixed(2)),
      })
    }
    return points
  }, [filterType, order, cutoffFreq, centerFreq, bandwidth, lowCutoff, highCutoff])

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
           <Badge className="text-[10px] font-black uppercase tracking-widest">
              {filterType}
           </Badge>
           <h3 className="text-xl font-bold font-google-sans">Frequency Response</h3>
        </div>
        <p className="text-xs text-muted-foreground local-inter">
          Magnitude (dB) and Phase (deg) characteristics for order {order} Butterworth filter.
        </p>
      </div>

      <div className="space-y-6">
        {/* Magnitude Plot */}
        <div className="h-[220px] w-full">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
            <BarChart size={12} className="text-primary" /> Magnitude Response (dB)
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
               <defs>
                <linearGradient id="colorMag" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--border), 0.3)" />
              <XAxis
                dataKey="freq"
                scale="log"
                domain={[1, 22050]}
                type="number"
                tick={{ fontSize: 9, fill: "currentColor", opacity: 0.5 }}
                ticks={[10, 100, 1000, 10000]}
              />
              <YAxis
                domain={[-60, 5]}
                tick={{ fontSize: 9, fill: "currentColor", opacity: 0.5 }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "10px" }}
                formatter={(value: any) => [`${value} dB`, 'Magnitude']}
              />
              <Area
                type="monotone"
                dataKey="magnitude"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorMag)"
                dot={false}
              />
              {cutoffFreq && (
                <ReferenceLine x={cutoffFreq} stroke="hsl(var(--primary))" strokeDasharray="3 3" />
              )}
              {lowCutoff && <ReferenceLine x={lowCutoff} stroke="hsl(var(--primary))" strokeDasharray="3 3" />}
              {highCutoff && <ReferenceLine x={highCutoff} stroke="hsl(var(--primary))" strokeDasharray="3 3" />}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Phase Plot */}
        <div className="h-[150px] w-full pt-4 border-t border-border/50">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">
            Phase Response (degrees)
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--border), 0.3)" />
              <XAxis
                dataKey="freq"
                scale="log"
                domain={[1, 22050]}
                type="number"
                tick={{ fontSize: 9, fill: "currentColor", opacity: 0.5 }}
                ticks={[10, 100, 1000, 10000]}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "currentColor", opacity: 0.5 }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "10px" }}
                formatter={(value: any) => [`${value}°`, 'Phase']}
              />
              <Line
                type="monotone"
                dataKey="phase"
                stroke="#a855f7"
                strokeWidth={2}
                dot={false}
              />
              {cutoffFreq && (
                <ReferenceLine x={cutoffFreq} stroke="#a855f7" strokeDasharray="3 3" />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl bg-muted/30 p-4">
        <Info className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
        <p className="text-[10px] text-muted-foreground leading-relaxed italic uppercase font-bold tracking-widest">
          * Mathematical approximation using the Butterworth transfer function.
          Order {order} filter provides a roll-off rate of {order * 6} dB/octave.
        </p>
      </div>
    </div>
  )
}
