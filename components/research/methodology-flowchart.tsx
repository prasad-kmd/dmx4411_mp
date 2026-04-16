"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ArrowDown, ArrowRight, Info, PlayCircle, Code, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    id: "acquisition",
    title: "Signal Acquisition",
    description: "Recording audio and converting to .wav format",
    details: ["Recording in noisy environments", "MP3 to WAV conversion", "Audacity post-processing"],
    longDesc: "The first phase involved acquiring audio in real-world scenarios. We used Audacity to convert raw MP3 recordings into mono-channel WAV files at 44.1 kHz, ensuring high-fidelity data for MATLAB processing.",
    icon: PlayCircle
  },
  {
    id: "prep",
    title: "MATLAB Implementation",
    description: "Loading and preparing signals for analysis",
    details: ["audioread() integration", "Stereo-to-Mono conversion", "Time-domain visualization"],
    longDesc: "Signals were imported into MATLAB where we normalized amplitudes and performed time-domain analysis. This stage confirmed sample rates and established baseline signal integrity.",
    icon: Code
  },
  {
    id: "id",
    title: "Noise Identification",
    description: "Spectral analysis to characterize interference",
    details: ["FFT computation", "Magnitude spectrum analysis", "Noise profile categorization"],
    longDesc: "Using the Fast Fourier Transform (FFT), we analyzed the magnitude spectrum of each signal to identify noise types—broadband hiss, tonal drone, and low-frequency rumble.",
    icon: Info
  },
  {
    id: "design",
    title: "Filter Selection & Design",
    description: "Mathematical modeling of digital filters",
    details: ["Butterworth approximation", "Cutoff frequency calculation", "Filter order derivation"],
    longDesc: "We calculated filter orders and cutoff frequencies based on noise profiles. Butterworth filters were selected for their maximally flat magnitude response in the passband.",
    icon: Layers
  },
  {
    id: "filter",
    title: "Filter Implementation",
    description: "Applying filters to corrupted signals",
    details: ["butter() coefficient generation", "filtfilt() zero-phase filtering", "Normalization & export"],
    longDesc: "Digital filters were implemented using the butter() function. Zero-phase filtering was achieved via filtfilt() to eliminate phase distortion in the audio output.",
    icon: Check
  },
  {
    id: "eval",
    title: "Performance Evaluation",
    description: "Quantitative and subjective assessment",
    details: ["MSE & SNR metrics", "Side-by-side comparison", "Critical analysis"],
    longDesc: "Final evaluation combined quantitative metrics (Mean Squared Error, Signal-to-Noise Ratio) with subjective listening tests to determine overall denoising effectiveness.",
    icon: Check
  }
]

export function MethodologyFlowchart() {
  const [activeStep, setActiveStep] = useState<string | null>(null)

  return (
    <div className="py-12 flex flex-col lg:flex-row gap-12 items-start">
      {/* Interactive Pipeline */}
      <div className="w-full lg:w-1/2 space-y-6">
        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground/60 mb-8 px-4">Interactive Research Pipeline</h3>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <motion.button
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={cn(
                  "w-full text-left group relative bg-card border rounded-3xl p-6 transition-all",
                  activeStep === step.id
                    ? "border-primary shadow-xl shadow-primary/10 ring-1 ring-primary/20"
                    : "border-border hover:border-primary/40 hover:bg-muted/30"
                )}
              >
                <div className="flex items-center gap-5">
                  <div className={cn(
                    "h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-300",
                    activeStep === step.id
                      ? "bg-primary text-primary-foreground rotate-6"
                      : "bg-primary/10 text-primary group-hover:scale-110"
                  )}>
                    <step.icon size={22} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={cn(
                        "text-lg font-bold font-google-sans transition-colors",
                        activeStep === step.id ? "text-primary" : ""
                      )}>
                        {step.title}
                      </h4>
                      <ArrowRight size={16} className={cn(
                        "text-muted-foreground/40 transition-transform duration-300",
                        activeStep === step.id ? "translate-x-1 text-primary opacity-100" : "group-hover:translate-x-1"
                      )} />
                    </div>
                    <p className="text-xs text-muted-foreground local-inter mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.button>

              {index < steps.length - 1 && (
                <div className="flex justify-center h-4">
                  <div className="w-px h-full bg-border" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Details Side Panel */}
      <div className="w-full lg:w-1/2 sticky top-24">
        <AnimatePresence mode="wait">
          {activeStep ? (
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-card border border-primary/20 rounded-[2.5rem] p-8 shadow-2xl shadow-primary/5 relative overflow-hidden"
            >
              {/* Abstract decorative background */}
              <div className="absolute top-0 right-0 p-8 text-primary/5 -mr-12 -mt-12">
                 {(() => {
                    const step = steps.find(s => s.id === activeStep)
                    return step && <step.icon size={200} />
                 })()}
              </div>

              <div className="relative">
                <Badge className="mb-4 uppercase tracking-widest text-[10px]">Step Details</Badge>
                <h3 className="text-3xl font-bold font-google-sans mb-6">
                  {steps.find(s => s.id === activeStep)?.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed local-inter mb-8">
                  {steps.find(s => s.id === activeStep)?.longDesc}
                </p>

                <div className="space-y-4">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Core Activities</h4>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {steps.find(s => s.id === activeStep)?.details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-muted/50 border border-border/50 text-[11px] font-bold local-inter uppercase tracking-wider">
                           <div className="h-2 w-2 rounded-full bg-primary" />
                           {detail}
                        </div>
                      ))}
                   </div>
                </div>

                <div className="mt-10 pt-8 border-t border-border flex items-center justify-between">
                   <div className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                      DMX4411 Research Stage
                   </div>
                   <button
                     onClick={() => setActiveStep(null)}
                     className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                   >
                     Close Panel
                   </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-[500px] border border-dashed border-border rounded-[2.5rem] flex flex-col items-center justify-center text-center p-12"
            >
              <div className="h-20 w-20 rounded-3xl bg-muted flex items-center justify-center text-muted-foreground mb-6">
                 <Layers size={32} />
              </div>
              <h4 className="text-xl font-bold font-google-sans mb-2">Select a pipeline stage</h4>
              <p className="text-sm text-muted-foreground local-inter">
                Click on any step in the methodology pipeline to explore detailed research activities and outcomes.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary", className)}>
      {children}
    </span>
  )
}
