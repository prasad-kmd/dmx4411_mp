"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, FileText, Activity, Zap, Radio, Database } from "lucide-react"
import { motion, useSpring, useTransform, animate } from "framer-motion"
import { PROJECT_DATA } from "@/lib/constants"

function Counter({ value, suffix = "" }: { value: string, suffix?: string }) {
  const [displayValue, setDisplayValue] = useState("0")
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, "")) || 0
  const isInteger = !value.includes(".")

  useEffect(() => {
    const controls = animate(0, numericValue, {
      duration: 2,
      onUpdate(value) {
        setDisplayValue(isInteger ? Math.floor(value).toString() : value.toFixed(1))
      },
    })
    return () => controls.stop()
  }, [numericValue, isInteger])

  return <span>{displayValue}{suffix}</span>
}

export default function DspHero() {
  return (
    <section className="relative min-h-screen flex items-center py-20 lg:py-0 overflow-hidden bg-background">
      {/* Dynamic Background Grid with Waveform Motif */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        {/* Animated Waveform Background */}
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20">
            <svg viewBox="0 0 1440 320" className="w-full h-full preserve-3d">
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    fill="none"
                    stroke="currentColor"
                    className="text-primary"
                    strokeWidth="2"
                    d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,186.7C960,171,1056,85,1152,80C1248,75,1344,149,1392,186.7L1440,224"
                />
            </svg>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest local-jetbrains-mono">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Digital Signal Processing
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black amoriaregular leading-[0.9] tracking-tight text-foreground">
              {PROJECT_DATA.title}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground google-sans leading-relaxed max-w-2xl font-light">
              {PROJECT_DATA.subtitle}
            </p>

            <div className="text-base md:text-lg text-muted-foreground/80 local-inter leading-relaxed max-w-3xl border-l-2 border-primary/30 pl-6 italic bg-primary/5 py-4 rounded-r-2xl">
              "This project addresses the challenge of background noise in digital audio signals through an automated, signal processing-based system. By analyzing the spectral characteristics of corrupted audio files, we design and apply targeted digital filters—Low-Pass, Notch, and High-Pass—using the Butterworth approximation."
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/introduction"
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-foreground px-10 text-sm font-bold text-background transition-all hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest">
                  Explore Research
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <a
                href="/MP_Full-Report.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center rounded-full border border-border bg-card/40 px-10 text-sm font-bold backdrop-blur-xl transition-all hover:bg-muted active:scale-95 uppercase tracking-widest flex items-center gap-2"
              >
                <FileText size={18} />
                View Full Report
              </a>
            </div>
          </motion.div>

          {/* Metric Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
          >
            {[
              { label: "Audio Signals", value: "3", icon: Radio },
              { label: "Filter Types", value: "3", icon: Activity },
              { label: "Sample Rate", value: "44.1", suffix: " kHz", icon: Zap },
              { label: "Performance Metrics", value: "4", icon: Database },
            ].map((metric, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm group hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                <metric.icon className="w-5 h-5 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold font-google-sans mb-1">
                    <Counter value={metric.value} suffix={metric.suffix} />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-black leading-tight">{metric.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
