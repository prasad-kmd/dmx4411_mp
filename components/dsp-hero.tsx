"use client"

import React, { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { ArrowRight, FileText, Activity, Zap, Radio, Database, Waves, BarChart3, Binary } from "lucide-react"
import { motion, useSpring, useTransform, animate, useScroll } from "framer-motion"
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

const BackgroundWaves = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-30 pointer-events-none overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: i * 0.5 }}
        >
          <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full preserve-3d" preserveAspectRatio="none">
            <motion.path
              fill="none"
              stroke="currentColor"
              className="text-primary/40"
              strokeWidth="1"
              animate={{
                d: [
                  `M0,${160 + i * 20} Q360,${80 + i * 20} 720,${160 + i * 20} T1440,${160 + i * 20}`,
                  `M0,${160 + i * 20} Q360,${240 + i * 20} 720,${160 + i * 20} T1440,${160 + i * 20}`,
                  `M0,${160 + i * 20} Q360,${80 + i * 20} 720,${160 + i * 20} T1440,${160 + i * 20}`,
                ]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </svg>
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
    </div>
  )
}

const FloatingParticles = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary/20 rounded-full"
                    initial={{ 
                        x: Math.random() * 100 + "%", 
                        y: Math.random() * 100 + "%",
                        opacity: 0 
                    }}
                    animate={{ 
                        y: [null, "-20%"],
                        opacity: [0, 1, 0]
                    }}
                    transition={{ 
                        duration: Math.random() * 10 + 10, 
                        repeat: Infinity, 
                        ease: "linear",
                        delay: Math.random() * 5
                    }}
                />
            ))}
        </div>
    )
}

export default function DspHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const yContent = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacityContent = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={containerRef} className="relative h-screen flex items-center overflow-hidden bg-background">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px]" />
        <BackgroundWaves />
        <FloatingParticles />
      </div>

      <div className="container relative z-10 mx-auto px-6 h-full flex flex-col justify-center">
        <motion.div
          style={{ y: yContent, opacity: opacityContent }}
          className="max-w-5xl mx-auto text-center space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] local-jetbrains-mono mx-auto"
          >
            <Activity size={14} className="animate-pulse" />
            Digital Signal Processing Lab
          </motion.div>
          
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black amoriaregular leading-[1.1] tracking-tight text-foreground"
            >
              Transforming <span className="text-primary italic">Noisy</span> Audio <br />
              into <span className="text-primary">Pristine</span> Signals
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground google-sans leading-relaxed max-w-2xl mx-auto font-light"
            >
              {PROJECT_DATA.subtitle}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/introduction"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-primary px-8 text-[11px] font-black text-primary-foreground transition-all hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] active:scale-95 uppercase tracking-widest"
            >
              Start Exploration
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="/MP_Full-Report.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card/50 px-8 text-[11px] font-black backdrop-blur-sm transition-all hover:bg-muted active:scale-95 uppercase tracking-widest flex items-center gap-2"
            >
              <FileText size={16} />
              Full Report
            </a>
          </motion.div>
        </motion.div>

        {/* Metric Cards - More compact and elegant */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto w-full"
        >
          {[
            { label: "Analysed Signals", value: "3", icon: Radio, color: "text-blue-500" },
            { label: "Digital Filters", value: "3", icon: Binary, color: "text-emerald-500" },
            { label: "Sample Rate", value: "44.1", suffix: " kHz", icon: Zap, color: "text-amber-500" },
            { label: "Success Metrics", value: "4", icon: Database, color: "text-purple-500" },
          ].map((metric, idx) => (
            <div key={idx} className="relative group p-4 rounded-2xl border border-border bg-card/30 backdrop-blur-md overflow-hidden transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                <div className="relative z-10 flex flex-col gap-2">
                    <div className={`p-2 rounded-lg bg-background/50 border border-border w-fit ${metric.color}`}>
                        <metric.icon size={16} />
                    </div>
                    <div>
                        <div className="text-xl font-black font-google-sans leading-none">
                            <Counter value={metric.value} suffix={metric.suffix} />
                        </div>
                        <div className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-bold mt-1 leading-tight">{metric.label}</div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                    <metric.icon size={48} />
                </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom decorative bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/20 flex justify-center p-1">
            <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1 rounded-full bg-primary"
            />
        </div>
      </motion.div>
    </section>
  )
}
