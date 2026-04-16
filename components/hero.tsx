"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Play, AudioWaveform as Waveform, Activity, Zap, Headphones } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { PROJECT_DATA } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROJECT_DATA.audioSignals.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) return null

  const stats = [
    { label: "Audio Signals", value: "3", icon: Headphones },
    { label: "Filter Types", value: "3", icon: Zap },
    { label: "Sampling Rate", value: "44.1 kHz", icon: Activity },
    { label: "Metrics", value: "4", icon: Waveform },
  ]

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(var(--primary-h),var(--primary-s),var(--primary-l),0.05)_0%,transparent_50%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="px-4 py-1 rounded-full border-primary/20 bg-primary/5 text-primary mb-6">
                Research & Engineering
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-foreground mb-6">
                Audio <span className="text-primary italic">Denoising</span> <br /> System
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                {PROJECT_DATA.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="rounded-full px-8 group" asChild>
                <Link href="/introduction">
                  Explore Research
                  <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                <a href="/MP_Full-Report.pdf" target="_blank">
                  Full Report PDF
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-border/40"
            >
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-2 text-primary">
                    <stat.icon className="size-4" />
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative glass rounded-[2.5rem] p-6 shadow-2xl overflow-hidden border-white/10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-red-500/50" />
                  <div className="size-3 rounded-full bg-amber-500/50" />
                  <div className="size-3 rounded-full bg-emerald-500/50" />
                </div>
                <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                  Signal_Analyzer.m
                </div>
              </div>

              <div className="relative h-[320px] rounded-2xl bg-black/40 border border-white/5 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 p-8 flex flex-col justify-center"
                  >
                    <div className="mb-4">
                      <Badge className="bg-primary/20 text-primary border-primary/30 uppercase text-[10px] tracking-widest px-3 py-1">
                        {PROJECT_DATA.audioSignals[currentIndex].filterType}
                      </Badge>
                    </div>
                    <h3 className="text-3xl font-bold mb-3">{PROJECT_DATA.audioSignals[currentIndex].name}</h3>
                    <p className="text-muted-foreground text-sm mb-8 leading-relaxed italic">
                      "Targeting {PROJECT_DATA.audioSignals[currentIndex].noiseType.toLowerCase()} to restore signal fidelity."
                    </p>
                    <Button variant="secondary" className="w-fit rounded-xl gap-2 group">
                      <Play className="size-4 fill-current group-hover:scale-110 transition-transform" />
                      Listen Processed
                    </Button>
                  </motion.div>
                </AnimatePresence>

                {/* Animated Waveform Placeholder */}
                <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end gap-1 px-8 pb-4 opacity-20 pointer-events-none">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [20, 40, 20, 60, 20] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                      className="flex-1 bg-primary rounded-t-full"
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-8">
                {PROJECT_DATA.audioSignals.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      currentIndex === i ? "w-8 bg-primary" : "w-1.5 bg-white/10"
                    )}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
