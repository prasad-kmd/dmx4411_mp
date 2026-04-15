'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { Card, CardContent } from '@/components/ui/Card';
import {
  AudioWaveform as Waveform,
  Target,
  AlertCircle,
  Settings,
  Activity,
  TrendingUp
} from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

export default function Introduction() {
  return (
    <div className="container max-w-5xl py-12 px-4 md:px-6">
      <SectionHeader
        title="Introduction"
        subtitle="Exploring the fundamentals of digital signal processing through automated audio denoising."
      />

      <div className="grid gap-12">
        {/* Background Section */}
        <motion.section {...fadeIn} className="space-y-4">
          <div className="flex items-center gap-3 text-accent-primary">
            <Waveform className="w-6 h-6" />
            <h2 className="text-2xl font-semibold tracking-tight">Background and Context</h2>
          </div>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              In the world of consumer electronics, portable music players and smartphones are primary devices for personal audio enjoyment.
              Users expect high-quality playback regardless of the source file's origin. However, audio signals are frequently corrupted by
              various forms of background noise during recording, transmission, or storage.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Common noise types include constant tonal hum, broadband hiss, and low-frequency rumble.
              These unwanted components significantly degrade the listening experience, obscuring the clarity and detail of the original music.
              Maintaining product quality and meeting consumer demand requires effective solutions for these audio imperfections.
            </p>
          </div>
        </motion.section>

        {/* Problem Statement Section */}
        <motion.section {...fadeIn} className="space-y-4">
          <div className="flex items-center gap-3 text-red-500">
            <AlertCircle className="w-6 h-6" />
            <h2 className="text-2xl font-semibold tracking-tight">Problem Statement</h2>
          </div>
          <Card className="border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-950/10">
            <CardContent className="pt-6">
              <p className="text-muted-foreground italic leading-relaxed">
                "A consumer electronics company has received customer complaints regarding poor audio quality and persistent background noise in some files played on its portable devices.
                Manually cleaning these files is not a scalable solution. There is a clear need for an automated, signal processing-based system that can analyze an audio file,
                identify noise characteristics, and apply targeted filtering algorithms."
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Project Objectives Section */}
        <motion.section {...fadeIn} className="space-y-6">
          <div className="flex items-center gap-3 text-accent-primary">
            <Target className="w-6 h-6" />
            <h2 className="text-2xl font-semibold tracking-tight">Project Objectives</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Activity className="w-5 h-5" />,
                title: "Acquire & Analyze",
                desc: "Record music in noisy environments and perform time/frequency domain analysis to characterize noise."
              },
              {
                icon: <Settings className="w-5 h-5" />,
                title: "Design Filters",
                desc: "Calculate parameters for digital filters (Low-pass, High-pass, Band-stop) to target specific frequencies."
              },
              {
                icon: <TrendingUp className="w-5 h-5" />,
                title: "Implement & Test",
                desc: "Apply zero-phase digital filtering using MATLAB and verify results with objective metrics."
              },
              {
                icon: <Waveform className="w-5 h-5" />,
                title: "Evaluate Performance",
                desc: "Quantify improvements using SNR and MSE metrics and assess system limitations."
              }
            ].map((obj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="pt-6 flex gap-4">
                    <div className="mt-1 p-2 rounded-lg bg-accent-primary/10 text-accent-primary shrink-0">
                      {obj.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{obj.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{obj.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Bottom Navigation */}
        <motion.div
          {...fadeIn}
          className="pt-8 border-t flex justify-end"
        >
          <Link
            href="/methodology"
            className="group flex flex-col items-end gap-1"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Next Section</span>
            <span className="text-lg font-semibold group-hover:text-accent-primary transition-colors flex items-center gap-2">
              Methodology
              <TrendingUp className="w-5 h-5" />
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
