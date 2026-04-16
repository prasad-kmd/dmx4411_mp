"use client"

import React, { useState, useMemo } from "react"
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
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Info, Maximize2, ZoomIn, RefreshCw } from "lucide-react"

interface DataPoint {
  freq: number
  original: number
  filtered: number
}

interface FrequencySpectrumChartProps {
  audioId: string
  signalName: string
  noiseType: string
  cutoffFreq?: number
  centerFreq?: number
}

export default function FrequencySpectrumChart({
  audioId,
  signalName,
  noiseType,
  cutoffFreq,
  centerFreq,
}: FrequencySpectrumChartProps) {
  const [zoomRange, setZoomRange] = useState<[number, number]>([0, 22050])

  // Generate deterministic approximation data
  const data = useMemo(() => {
    const points: DataPoint[] = []
    const numPoints = 200
    const maxFreq = 22050

    for (let i = 0; i <= numPoints; i++) {
      const freq = (i / numPoints) * maxFreq
      let original = 0
      let filtered = 0

      // Base signal (mostly silence/ambient)
      const base = Math.exp(-freq / 1000) * 0.1 + 0.05

      if (audioId === "audio-1") {
        // High-frequency hiss: broadband content above 5kHz
        const hiss = freq > 5000 ? (0.3 + Math.sin(freq / 100) * 0.05) : 0.02
        original = base + hiss
        // LPF @ 300Hz
        const lpfResponse = 1 / Math.sqrt(1 + Math.pow(freq / 300, 2))
        filtered = base * lpfResponse + hiss * lpfResponse
      } else if (audioId === "audio-2") {
        // Tonal interference @ 50.67Hz
        const tone = Math.exp(-Math.pow(freq - 50.67, 2) / 2) * 0.8
        original = base + tone
        // BSF @ 50.67Hz (width ~8Hz)
        const bsfResponse = Math.abs(freq - 50.67) < 4 ? 0.05 : 1
        filtered = base + tone * bsfResponse
      } else if (audioId === "audio-3") {
        // Low-frequency rumble: decaying from low frequency
        const rumble = freq < 1000 ? (0.6 * Math.exp(-freq / 200)) : 0.01
        original = base + rumble
        // HPF @ 1000Hz
        const hpfResponse = Math.pow(freq / 1000, 2) / Math.sqrt(1 + Math.pow(freq / 1000, 4))
        filtered = base + rumble * hpfResponse
      }

      points.push({
        freq: Math.round(freq),
        original: parseFloat(original.toFixed(4)),
        filtered: parseFloat(filtered.toFixed(4)),
      })
    }
    return points
  }, [audioId])

  const filteredData = useMemo(() => {
    return data.filter(d => d.freq >= zoomRange[0] && d.freq <= zoomRange[1])
  }, [data, zoomRange])

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest">
                {signalName}
             </Badge>
             <h3 className="text-xl font-bold font-google-sans">Magnitude Spectrum</h3>
          </div>
          <p className="text-xs text-muted-foreground local-inter">
            Comparison of frequency content before and after filtering ({noiseType})
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-[10px] uppercase font-bold tracking-widest h-8"
            onClick={() => setZoomRange([0, 22050])}
          >
            <RefreshCw className="mr-2 h-3 w-3" /> Full
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-[10px] uppercase font-bold tracking-widest h-8"
            onClick={() => setZoomRange([0, 5000])}
          >
            <ZoomIn className="mr-2 h-3 w-3" /> 5kHz
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-[10px] uppercase font-bold tracking-widest h-8"
            onClick={() => setZoomRange([0, 200])}
          >
            <Maximize2 className="mr-2 h-3 w-3" /> 200Hz
          </Button>
        </div>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorOriginal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorFiltered" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--border), 0.3)" />
            <XAxis
              dataKey="freq"
              tick={{ fontSize: 10, fill: "currentColor", opacity: 0.5 }}
              label={{ value: 'Frequency (Hz)', position: 'insideBottomRight', offset: -5, fontSize: 10, fill: "currentColor", opacity: 0.7 }}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "currentColor", opacity: 0.5 }}
              label={{ value: 'Magnitude', angle: -90, position: 'insideLeft', fontSize: 10, fill: "currentColor", opacity: 0.7 }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }}
              itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }} />

            <Area
              type="monotone"
              dataKey="original"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOriginal)"
              name="Original Spectrum"
              dot={false}
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="filtered"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorFiltered)"
              name="Filtered Spectrum"
              dot={false}
              animationDuration={1500}
            />

            {(cutoffFreq || centerFreq) && (
              <ReferenceLine
                x={cutoffFreq || centerFreq}
                stroke="hsl(var(--primary))"
                strokeDasharray="5 5"
                label={{ value: 'Cutoff', position: 'top', fill: 'hsl(var(--primary))', fontSize: 10, fontWeight: 'bold' }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl bg-muted/30 p-4">
        <Info className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
        <p className="text-[10px] text-muted-foreground leading-relaxed italic uppercase font-bold tracking-widest">
          * Note: Data is approximated based on mathematical noise models and filter response curves described in the project report.
          Actual spectral plots are documented in figures 4.1–4.6.
        </p>
      </div>
    </div>
  )
}
