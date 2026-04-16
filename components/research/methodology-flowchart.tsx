"use client"

import React from "react"
import { motion } from "framer-motion"
import { Check, ArrowDown } from "lucide-react"

const steps = [
  {
    title: "Signal Acquisition",
    description: "Recording audio and converting to .wav format",
    details: ["Recording in noisy environments", "MP3 to WAV conversion", "Audacity post-processing"]
  },
  {
    title: "MATLAB Implementation",
    description: "Loading and preparing signals for analysis",
    details: ["audioread() integration", "Stereo-to-Mono conversion", "Time-domain visualization"]
  },
  {
    title: "Noise Identification",
    description: "Spectral analysis to characterize interference",
    details: ["FFT computation", "Magnitude spectrum analysis", "Noise profile categorization"]
  },
  {
    title: "Filter Selection & Design",
    description: "Mathematical modeling of digital filters",
    details: ["Butterworth approximation", "Cutoff frequency calculation", "Filter order derivation"]
  },
  {
    title: "Filter Implementation",
    description: "Applying filters to corrupted signals",
    details: ["butter() coefficient generation", "filtfilt() zero-phase filtering", "Normalization & export"]
  },
  {
    title: "Performance Evaluation",
    description: "Quantitative and subjective assessment",
    details: ["MSE & SNR metrics", "Side-by-side comparison", "Critical analysis"]
  }
]

export function MethodologyFlowchart() {
  return (
    <div className="py-12 flex flex-col items-center">
      <div className="w-full max-w-2xl space-y-8">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="group relative bg-card border border-border rounded-[2rem] p-8 shadow-xl shadow-primary/5 hover:border-primary/50 transition-all">
                <div className="flex items-start gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      {index + 1}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold amoriaregular mb-2 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground google-sans mb-4">
                      {step.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {step.details.map((detail, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-muted text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                          <Check size={10} className="text-primary" />
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {index < steps.length - 1 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                whileInView={{ height: 32, opacity: 1 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <div className="w-[2px] bg-gradient-to-b from-primary/50 to-transparent flex items-end justify-center">
                   <ArrowDown size={14} className="text-primary/50 -mb-2" />
                </div>
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
