'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Database, Terminal, Search, Ruler, Activity, CheckCircle2, ArrowRight } from 'lucide-react';

const stages = [
  { id: 'acq', label: 'Signal Acquisition', icon: Database, description: 'Recording in noisy environments & format conversion.' },
  { id: 'impl', label: 'MATLAB Implementation', icon: Terminal, description: 'Loading signals and initial domain analysis.' },
  { id: 'ident', label: 'Noise Identification', icon: Search, description: 'Frequency domain analysis using FFT.' },
  { id: 'select', label: 'Filter Selection & Design', icon: Ruler, description: 'Calculating filter parameters & orders.' },
  { id: 'apply', label: 'Filter Implementation', icon: Activity, description: 'Applying zero-phase digital filtering.' },
  { id: 'eval', label: 'Performance Evaluation', icon: CheckCircle2, description: 'Quantifying results with MSE & SNR.' },
];

export function MethodologyFlowchart() {
  return (
    <div className="py-12 px-4 glass rounded-[2.5rem] border-white/5 bg-white/[0.02]">
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {stages.map((stage, i) => (
          <React.Fragment key={stage.id}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group flex items-start gap-6 p-6 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10"
            >
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
                <stage.icon className="size-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold mb-1">{stage.label}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{stage.description}</p>
              </div>
            </motion.div>
            {i < stages.length - 1 && (
              <div className="flex justify-center py-2 text-primary/30">
                <ArrowRight className="size-6 rotate-90" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
