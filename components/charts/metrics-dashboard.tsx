"use client"

import React, { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PROJECT_DATA } from "@/lib/constants"
import { Info, Target, TrendingUp, AlertCircle } from "lucide-react"

export default function MetricsDashboard() {
  const mseData = PROJECT_DATA.audioSignals.map(s => ({
    name: s.name,
    value: s.metrics.mse,
    noise: s.noiseType
  }))

  const snrData = PROJECT_DATA.audioSignals.map(s => ({
    name: s.name,
    original: s.metrics.snrSignalNoise.original,
    filtered: s.metrics.snrSignalNoise.filtered,
    improvement: s.metrics.snrSignalNoise.improvement
  }))

  const improvementData = snrData.map(d => ({
    name: d.name,
    improvement: d.improvement
  }))

  return (
    <div className="space-y-8">
      <Tabs defaultValue="mse" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-14 bg-muted/50 p-1.5 rounded-2xl mb-8">
          <TabsTrigger value="mse" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm font-bold uppercase tracking-widest text-[10px]">
             MSE Analysis
          </TabsTrigger>
          <TabsTrigger value="snr" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm font-bold uppercase tracking-widest text-[10px]">
             SNR Comparison
          </TabsTrigger>
          <TabsTrigger value="improvement" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm font-bold uppercase tracking-widest text-[10px]">
             SNR Delta
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mse" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 rounded-[2rem] border border-border bg-card/50 p-6 shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold font-google-sans">Mean Squared Error (MSE)</h3>
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-1">
                    Lower values = Higher Fidelity
                  </p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                   <Target size={20} />
                </div>
              </div>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mseData} layout="vertical" margin={{ left: 10, right: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(var(--border), 0.3)" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fontWeight: 'bold', fill: 'currentColor' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "16px", boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      formatter={(value: number) => [value.toFixed(8), "MSE"]}
                    />
                    <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={32}>
                      {mseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? "hsl(var(--primary))" : index === 1 ? "#a855f7" : "#ec4899"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="space-y-4">
               <div className="p-5 rounded-[2rem] bg-primary/5 border border-primary/10 shadow-sm">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                    <TrendingUp size={12} /> Key Finding
                  </h4>
                  <p className="text-xs leading-relaxed text-muted-foreground font-medium italic">
                    Audio 1 achieved the highest fidelity with MSE of 0.00295.
                  </p>
               </div>
               <div className="p-5 rounded-[2rem] bg-muted/30 border border-border shadow-sm">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                    <AlertCircle size={12} /> Technical Note
                  </h4>
                  <p className="text-[10px] leading-relaxed text-muted-foreground/80 font-google-sans">
                    Audio 3 error spike (0.041) correlates with necessary removal of overlapping signal-noise frequencies.
                  </p>
               </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="snr" className="mt-0">
          <div className="rounded-[2.5rem] border border-border bg-card/50 p-8 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-xl font-bold font-google-sans">SNR Comparison Matrix</h3>
                  <p className="text-xs text-muted-foreground font-medium mt-1">Quantitative power ratio analysis across all test signals</p>
               </div>
               <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary">
                  Metric: Decibels (dB)
               </div>
            </div>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={snrData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--border), 0.3)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 'bold', fill: 'currentColor' }} />
                  <YAxis tick={{ fontSize: 10, fill: 'currentColor' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "16px" }}
                    formatter={(value: number) => [`${value.toFixed(2)} dB`, ""]}
                  />
                  <Legend wrapperStyle={{ paddingTop: "30px", fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }} />
                  <Bar dataKey="original" name="Original SNR" fill="#64748b" radius={[12, 12, 0, 0]} barSize={24} />
                  <Bar dataKey="filtered" name="Filtered SNR" fill="hsl(var(--primary))" radius={[12, 12, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="improvement" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 rounded-[2rem] border border-border bg-card/50 p-8 shadow-xl">
              <h3 className="text-xl font-bold font-google-sans mb-6">SNR Delta (Δ)</h3>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={improvementData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--border), 0.3)" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 'bold', fill: 'currentColor' }} />
                    <YAxis tick={{ fontSize: 10, fill: 'currentColor' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "16px" }}
                      formatter={(value: number) => [`${value.toFixed(2)} dB`, "Δ SNR"]}
                    />
                    <Bar dataKey="improvement" radius={[12, 12, 0, 0]} barSize={40}>
                      {improvementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.improvement >= 0 ? "#10b981" : "#f43f5e"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="p-8 rounded-[2rem] bg-amber-500/5 border border-amber-500/10 flex flex-col justify-center">
               <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
                  <AlertCircle size={24} />
               </div>
               <h4 className="text-sm font-black uppercase tracking-widest text-amber-700 mb-3">Anomaly Detection</h4>
               <p className="text-xs text-muted-foreground leading-relaxed italic font-medium">
                  Negative SNR delta indicates traditional metric limitations. While noise was removed, some desired signal energy was also attenuated by the Butterworth roll-off.
               </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
