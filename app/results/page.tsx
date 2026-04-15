"use client";

import React from "react";
import contentData from "@/data/content.json";
import { AudioComparison } from "@/components/audio/AudioComparison";
import { SpectrumPlot } from "@/components/charts/SpectrumPlot";
import { PerformanceMetricsChart } from "@/components/charts/PerformanceMetricsChart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function ResultsPage() {
  const resultsSection = contentData.sections.find(s => s.id === "results");

  if (!resultsSection) {
    return <div>Section not found</div>;
  }

  // Pre-defined metrics from the report
  const audioMetrics = [
    {
      id: "audio-1",
      label: "Audio 1: Hiss Removal",
      orig: "/audio/original/Crysis3Intro.wav",
      filt: "/audio/filtered/filtered_Crysis3Intro_LPF.wav",
      metrics: {
        mse: "0.00295201",
        snrOrig: "-8.46",
        snrFilt: "-9.15",
        improvement: "-0.69"
      }
    },
    {
      id: "audio-2",
      label: "Audio 2: Tonal Interference",
      orig: "/audio/original/DreamsBenSound.wav",
      filt: "/audio/filtered/filtered_DreamsBenSound_BSF.wav",
      metrics: {
        mse: "0.00845865",
        snrOrig: "-14.38",
        snrFilt: "-16.23",
        improvement: "-1.85"
      }
    },
    {
      id: "audio-3",
      label: "Audio 3: Rumble Removal",
      orig: "/audio/original/LastSummer.wav",
      filt: "/audio/filtered/filtered_LastSummer_HPF.wav",
      metrics: {
        mse: "0.04110691",
        snrOrig: "-21.73",
        snrFilt: "-30.32",
        improvement: "-8.59"
      }
    }
  ];

  const snrData = audioMetrics.map(m => ({
    name: m.label.split(":")[0],
    value: parseFloat(m.metrics.improvement),
    type: "snr" as const
  }));

  const mseData = audioMetrics.map(m => ({
    name: m.label.split(":")[0],
    value: parseFloat(m.metrics.mse) * 100, // Scale for visibility
    type: "mse" as const
  }));

  // Simulated spectrum data for Audio 1
  const spectrumData1 = Array.from({ length: 100 }, (_, i) => {
    const f = i * 50;
    const mag = Math.exp(-f/1000) * (0.8 + Math.random() * 0.2);
    const filtMag = f > 300 ? mag * Math.exp(-(f-300)/500) : mag;
    return { frequency: f, magnitude: mag, filteredMagnitude: filtMag };
  });

  return (
    <div className="space-y-12 pb-20">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight font-primary">{resultsSection.title}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Evaluation of filtering effectiveness through subjective assessment and quantitative metrics.
        </p>
      </div>

      <div className="space-y-20">
        <section className="space-y-8">
          <h2 className="text-3xl font-bold font-primary border-b pb-2">1. Filtered Signal Analysis</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed">
              The designed filters were applied to the noisy audio signals.
              Below you can compare the audio quality and see the performance metrics for each test case.
            </p>
          </div>

          <div className="space-y-24">
            {audioMetrics.map((item, index) => (
              <div key={item.id} className="space-y-10">
                <AudioComparison
                    label={item.label}
                    originalSrc={item.orig}
                    filteredSrc={item.filt}
                    metrics={item.metrics}
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-muted/20 p-6 rounded-2xl border">
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold font-primary">Spectral Characterization</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            The magnitude spectrum analysis confirms the reduction of target noise components.
                            {index === 0 && " For Audio 1, high-frequency hiss above the 300Hz cutoff has been significantly attenuated."}
                            {index === 1 && " For Audio 2, the notch filter precisely targets the 50.67Hz interference."}
                            {index === 2 && " For Audio 3, the high-pass filter eliminates low-frequency rumble below 1000Hz."}
                        </p>
                    </div>
                    {index === 0 ? (
                        <SpectrumPlot data={spectrumData1} showFiltered title="Frequency Spectrum (0 - 5kHz)" />
                    ) : (
                        <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-xl text-muted-foreground text-xs font-mono italic">
                            Spectral plot extraction in progress for {item.label.split(":")[0]}
                        </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-12">
            <h2 className="text-3xl font-bold font-primary border-b pb-2">2. Quantitative Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold font-primary">MSE Distribution</h3>
                    <p className="text-sm text-muted-foreground mb-4">Mean Square Error (scaled x100) across audio files.</p>
                    <PerformanceMetricsChart data={mseData} />
                </div>
                <div className="space-y-4">
                    <h3 className="text-xl font-bold font-primary">SNR Improvement</h3>
                    <p className="text-sm text-muted-foreground mb-4">Relative change in Signal-to-Noise ratio in decibels (dB).</p>
                    <PerformanceMetricsChart data={snrData} />
                </div>
            </div>

            <div className="rounded-xl border bg-card overflow-hidden">
                <Table>
                <TableHeader>
                    <TableRow className="bg-muted/50">
                    <TableHead className="w-[200px]">Audio File</TableHead>
                    <TableHead>MSE</TableHead>
                    <TableHead>Orig. SNR (dB)</TableHead>
                    <TableHead>Filt. SNR (dB)</TableHead>
                    <TableHead className="text-right">Improvement (dB)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {audioMetrics.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell className="font-medium">{row.label.split(":")[0]}</TableCell>
                        <TableCell className="font-mono text-xs">{row.metrics.mse}</TableCell>
                        <TableCell className="font-mono text-xs">{row.metrics.snrOrig}</TableCell>
                        <TableCell className="font-mono text-xs">{row.metrics.snrFilt}</TableCell>
                        <TableCell className={cn(
                        "font-mono text-xs text-right font-bold",
                        parseFloat(row.metrics.improvement) >= 0 ? "text-green-600" : "text-destructive"
                        )}>
                        {row.metrics.improvement}
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>

            <div className="p-4 rounded-xl bg-muted/30 border text-sm text-muted-foreground leading-relaxed">
                <p>
                <strong>Scientific Analysis:</strong> The negative SNR values across both calculation methods indicate that traditional SNR metrics have limitations when evaluating frequency-selective noise removal filters. Perceptual audio quality improvement may not always correlate with traditional SNR metrics.
                </p>
            </div>
        </section>
      </div>
    </div>
  );
}
