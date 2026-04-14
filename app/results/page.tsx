"use client";

import React from "react";
import contentData from "@/data/content.json";
import { AudioComparison } from "@/components/audio/AudioComparison";
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

          <div className="space-y-16">
            {audioMetrics.map((item) => (
              <AudioComparison
                key={item.id}
                label={item.label}
                originalSrc={item.orig}
                filteredSrc={item.filt}
                metrics={item.metrics}
              />
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold font-primary border-b pb-2">2. Quantitative Performance Metrics</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed">
              The Mean Square Error (MSE) and Signal-to-Noise Ratio (SNR) were calculated to objectively
              assess the effectiveness of the denoising system.
            </p>
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
              <strong>Note:</strong> The negative SNR improvements reflect the aggressive nature of the filters
              which removed significant spectral energy (both noise and some signal harmonics) to ensure audible
              noise suppression. This highlights the trade-off between absolute noise removal and signal preservation.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
