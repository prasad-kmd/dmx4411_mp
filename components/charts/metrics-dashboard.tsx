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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-xl font-bold font-google-sans mb-1">Mean Squared Error (MSE)</h3>
              <p className="text-xs text-muted-foreground local-inter mb-8">
                Lower values indicate higher signal fidelity after noise removal.
              </p>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mseData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(var(--border), 0.3)" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fontWeight: 'bold' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }}
                      formatter={(value: number) => [value.toFixed(8), "MSE"]}
                    />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={40}>
                      {mseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? "#3b82f6" : index === 1 ? "#a855f7" : "#ec4899"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="space-y-6">
               <Card className="rounded-3xl bg-primary/5 border-primary/10">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2"><Target size={16} /> MSE Findings</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs space-y-4 leading-relaxed local-inter">
                     <p>Audio 1 shows the lowest MSE (0.00295), indicating the most effective reconstruction among the three tests.</p>
                     <p>Audio 3 exhibits the highest error (0.04111), likely due to the removal of low-frequency content that overlapped with the signal spectrum.</p>
                  </CardContent>
               </Card>
               <div className="flex items-start gap-3 p-4 rounded-2xl bg-muted/50 border border-border/50">
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-relaxed">
                    MSE calculation assumes original clean signal availability, which was approximated via post-filtering correlation.
                  </p>
               </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="snr" className="mt-0">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-bold font-google-sans mb-1">SNR Comparison</h3>
            <p className="text-xs text-muted-foreground local-inter mb-8">
              Signal-to-Noise Ratio (signal, noise method) before and after filtering.
            </p>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={snrData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--border), 0.3)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 'bold' }} />
                  <YAxis label={{ value: 'SNR (dB)', angle: -90, position: 'insideLeft', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }}
                    formatter={(value: number) => [`${value.toFixed(2)} dB`, ""]}
                  />
                  <Legend wrapperStyle={{ paddingTop: "20px" }} />
                  <Bar dataKey="original" name="Original SNR" fill="#94a3b8" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="filtered" name="Filtered SNR" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="improvement" className="mt-0">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-bold font-google-sans mb-1">SNR Improvement (Delta)</h3>
            <p className="text-xs text-muted-foreground local-inter mb-8">
              The change in SNR (Filtered - Original) for each processed signal.
            </p>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={improvementData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--border), 0.3)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 'bold' }} />
                  <YAxis label={{ value: 'Improvement (dB)', angle: -90, position: 'insideLeft', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }}
                    formatter={(value: number) => [`${value.toFixed(2)} dB`, "Δ SNR"]}
                  />
                  <Bar dataKey="improvement" radius={[8, 8, 0, 0]}>
                    {improvementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.improvement >= 0 ? "#10b981" : "#f59e0b"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 flex items-start gap-4 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10">
               <TrendingUp className="h-6 w-6 text-amber-500 shrink-0" />
               <div>
                 <h4 className="text-sm font-bold mb-2">Observation on Negative Improvement</h4>
                 <p className="text-xs text-muted-foreground leading-relaxed local-inter">
                    While the filters effectively removed noise, the SNR metrics show a decrease. This is a known phenomenon in some DSP scenarios where the filter attenuates some signal energy along with the noise, or the metric calculation method captures artifacts as noise.
                 </p>
               </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
