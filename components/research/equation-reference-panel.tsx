"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calculator, Hash, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BlockMath } from "react-katex"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import "katex/dist/katex.min.css"

const equations = [
  {
    category: "Spectral Analysis",
    title: "Discrete Fourier Transform (DFT)",
    formula: "X(k) = \\sum_{n=0}^{N-1} x(n) e^{-j 2 \\pi k n / N}",
    description: "Converts time-domain signals into their frequency-domain representation."
  },
  {
    category: "Performance Metrics",
    title: "Mean Squared Error (MSE)",
    formula: "MSE = \\frac{1}{N} \\sum_{n=1}^{N} [x_{noisy}(n) - x_{filtered}(n)]^2",
    description: "Measures the average squared difference between signal variations."
  },
  {
    category: "Performance Metrics",
    title: "Signal-to-Noise Ratio (SNR)",
    formula: "SNR = 10 \\log_{10} \\left( \\frac{P_{signal}}{P_{noise}} \\right) \\text{ dB}",
    description: "Evaluates the level of a desired signal compared to the level of background noise."
  },
  {
    category: "Filter Design",
    title: "Butterworth Magnitude Response",
    formula: "|H(f)| = \\frac{1}{\\sqrt{1 + (f/f_c)^{2n}}}",
    description: "Defines the maximally flat magnitude response for low-pass filters."
  },
  {
    category: "Filter Design",
    title: "Normalized Frequency",
    formula: "f_{norm} = \\frac{f_c}{F_s / 2}",
    description: "Normalizes the cutoff frequency relative to the Nyquist frequency."
  },
  {
    category: "Filter Design",
    title: "Low-Pass Transfer Function",
    formula: "H(s) = \\frac{\\omega_c}{s + \\omega_c}",
    description: "The first-order continuous-time transfer function used in Audio 1 design."
  }
]

export default function EquationReferencePanel() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Toggle Button */}
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-[5.5rem] z-50 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 hover:scale-110 transition-transform active:scale-95"
          >
            <Calculator size={20} />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="mb-2">
           Mathematical Reference
        </TooltipContent>
      </Tooltip>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[101] w-full max-w-md bg-card border-l border-border shadow-2xl p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded-xl bg-primary/10 text-primary">
                      <Calculator size={20} />
                   </div>
                   <h2 className="text-xl font-bold font-google-sans">Mathematical Reference</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full">
                  <X size={20} />
                </Button>
              </div>

              <div className="space-y-10">
                {equations.map((eq, idx) => (
                  <div key={idx} className="group">
                    <div className="flex items-center gap-2 mb-3">
                       <Badge variant="outline" className="text-[9px] uppercase tracking-widest px-2 py-0">{eq.category}</Badge>
                    </div>
                    <h3 className="text-sm font-bold mb-4 font-google-sans group-hover:text-primary transition-colors">{eq.title}</h3>
                    <div className="p-6 rounded-2xl bg-muted/50 border border-border/50 flex justify-center mb-4 overflow-x-auto overflow-y-hidden">
                       <div className="text-lg scale-110">
                          <BlockMath math={eq.formula} />
                       </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed local-inter italic">
                       {eq.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                 <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
                    <span>Research Fundamentals</span>
                    <span>DMX4411</span>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
