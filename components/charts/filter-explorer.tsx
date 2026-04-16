"use client"

import React, { useState, useMemo } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Info, RefreshCw, Settings2 } from "lucide-react"

type FilterType = "lowpass" | "highpass" | "bandstop"

export default function FilterExplorer() {
  const [type, setType] = useState<FilterType>("lowpass")
  const [cutoff, setCutoff] = useState(300)
  const [order, setOrder] = useState(1)
  const [lowCut, setLowCut] = useState(46)
  const [highCut, setHighCut] = useState(54)

  const reset = () => {
    if (type === "lowpass") {
      setCutoff(300)
      setOrder(1)
    } else if (type === "highpass") {
      setCutoff(1000)
      setOrder(2)
    } else {
      setLowCut(46)
      setHighCut(54)
      setOrder(2)
    }
  }

  const data = useMemo(() => {
    const points = []
    const numPoints = 120
    const Fs = 44100

    for (let i = 0; i <= numPoints; i++) {
      const freq = Math.pow(10, (i / numPoints) * Math.log10(22050 - 1)) + 1
      let mag = 0

      if (type === "lowpass") {
        mag = 1 / Math.sqrt(1 + Math.pow(freq / cutoff, 2 * order))
      } else if (type === "highpass") {
        mag = 1 / Math.sqrt(1 + Math.pow(cutoff / freq, 2 * order))
      } else {
        const fc = Math.sqrt(lowCut * highCut)
        const BW = highCut - lowCut
        const x = (freq * freq - fc * fc) / (freq * BW)
        mag = 1 / Math.sqrt(1 + Math.pow(1 / x, 2 * order))
      }

      points.push({
        freq: Math.round(freq),
        magnitude: parseFloat((20 * Math.log10(Math.max(mag, 0.0001))).toFixed(2))
      })
    }
    return points
  }, [type, cutoff, order, lowCut, highCut])

  return (
    <div className="rounded-3xl border border-border bg-card p-1 shadow-sm overflow-hidden">
      <div className="flex flex-col lg:flex-row h-[600px]">
        {/* Controls Sidebar */}
        <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border p-6 bg-muted/20">
          <div className="flex items-center gap-2 mb-6">
             <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Settings2 size={18} />
             </div>
             <h3 className="text-lg font-bold font-google-sans">Parameters</h3>
          </div>

          <Tabs defaultValue="lowpass" onValueChange={(v) => setType(v as FilterType)} className="mb-8">
            <TabsList className="grid grid-cols-3 w-full h-10 bg-background/50 p-1 rounded-xl">
              <TabsTrigger value="lowpass" className="text-[10px] uppercase font-bold tracking-widest rounded-lg">LPF</TabsTrigger>
              <TabsTrigger value="bandstop" className="text-[10px] uppercase font-bold tracking-widest rounded-lg">BSF</TabsTrigger>
              <TabsTrigger value="highpass" className="text-[10px] uppercase font-bold tracking-widest rounded-lg">HPF</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Order (n)</span>
                <Badge variant="secondary" className="font-mono text-xs">{order}</Badge>
              </div>
              <Slider value={[order]} min={1} max={8} step={1} onValueChange={(v) => setOrder(v[0])} />
            </div>

            {type !== "bandstop" ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Cutoff (Hz)</span>
                  <Badge variant="secondary" className="font-mono text-xs">{cutoff}</Badge>
                </div>
                <Slider value={[cutoff]} min={10} max={5000} step={10} onValueChange={(v) => setCutoff(v[0])} />
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Low Cut (Hz)</span>
                    <Badge variant="secondary" className="font-mono text-xs">{lowCut}</Badge>
                  </div>
                  <Slider value={[lowCut]} min={10} max={200} step={1} onValueChange={(v) => setLowCut(v[0])} />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">High Cut (Hz)</span>
                    <Badge variant="secondary" className="font-mono text-xs">{highCut}</Badge>
                  </div>
                  <Slider value={[highCut]} min={20} max={500} step={1} onValueChange={(v) => setHighCut(v[0])} />
                </div>
              </>
            )}

            <Button onClick={reset} variant="outline" className="w-full text-[10px] uppercase font-black tracking-widest h-12 rounded-xl">
               <RefreshCw className="mr-2 h-3 w-3" /> Reset to Defaults
            </Button>
          </div>
        </div>

        {/* Chart Area */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="mb-6">
             <h4 className="text-xl font-bold font-google-sans capitalize">{type} Butterworth Response</h4>
             <p className="text-xs text-muted-foreground local-inter mt-1">Adjust sliders to see real-time changes in attenuation slope and cutoff characteristics.</p>
          </div>

          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorExplorer" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--border), 0.3)" />
                <XAxis
                  dataKey="freq"
                  scale="log"
                  domain={[1, 22050]}
                  type="number"
                  tick={{ fontSize: 10, fill: "currentColor", opacity: 0.5 }}
                  ticks={[10, 100, 1000, 10000]}
                />
                <YAxis
                  domain={[-100, 5]}
                  tick={{ fontSize: 10, fill: "currentColor", opacity: 0.5 }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }}
                  formatter={(value: number) => [`${value} dB`, 'Magnitude']}
                />
                <Area
                  type="monotone"
                  dataKey="magnitude"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorExplorer)"
                  animationDuration={0}
                />
                {type !== "bandstop" ? (
                  <ReferenceLine x={cutoff} stroke="hsl(var(--primary))" strokeDasharray="3 3" label={{ position: 'top', value: 'fc', fill: 'hsl(var(--primary))', fontSize: 10 }} />
                ) : (
                  <>
                    <ReferenceLine x={lowCut} stroke="hsl(var(--primary))" strokeDasharray="3 3" />
                    <ReferenceLine x={highCut} stroke="hsl(var(--primary))" strokeDasharray="3 3" />
                  </>
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-primary/5 p-4">
            <Info className="mt-0.5 h-4 w-4 text-primary shrink-0" />
            <p className="text-[10px] text-muted-foreground leading-relaxed uppercase font-black tracking-widest">
              Roll-off Rate: {order * 20} dB per decade ({order * 6} dB per octave).
              Lower order = gradual transition. Higher order = steeper cut.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
