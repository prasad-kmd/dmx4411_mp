import React from "react"
import SectionLayout from "@/components/sections/section-layout"
import ComparisonAudioPlayer from "@/components/audio-player/comparison-audio-player"
import { PROJECT_DATA } from "@/lib/constants"
import { Music, AudioWaveform as Waveform, Info } from "lucide-react"

export default function AudioDemoPage() {
  return (
    <SectionLayout
      title="Audio Denoising Showcase"
      subtitle="Interactive side-by-side comparison of original corrupted signals and their filtered counterparts."
    >
      <div className="space-y-16 py-12">
        {/* Intro Card */}
        <div className="rounded-3xl border border-border bg-primary/5 p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1">
               <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-primary mb-6">
                 <Music size={14} />
                 Audio Laboratory
               </div>
               <h2 className="text-3xl font-bold font-google-sans mb-4">A/B Quality Assessment</h2>
               <p className="text-muted-foreground leading-relaxed local-inter">
                 The following players allow for direct comparison between the noisy acquisition and the processed output.
                 Use the visualizers to observe how specific frequency components are attenuated by the Butterworth filters.
                 All audio is sampled at 44.1 kHz.
               </p>
            </div>
            <div className="w-full lg:w-1/3 aspect-square rounded-2xl bg-card border border-border flex items-center justify-center relative overflow-hidden group">
               <Waveform size={120} className="text-primary/20 group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            </div>
          </div>
        </div>

        {/* Comparison Players */}
        <div className="space-y-12">
          {PROJECT_DATA.audioSignals.map((signal) => (
            <div key={signal.id} className="space-y-6">
              <div className="flex items-center gap-4 px-4">
                 <div className="h-px flex-1 bg-border/50" />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">
                   Processing Stage: {signal.name}
                 </span>
                 <div className="h-px flex-1 bg-border/50" />
              </div>

              <ComparisonAudioPlayer
                signalName={signal.name}
                originalSrc={`/audio/Noisy/wav/${signal.file}`}
                filteredSrc={`/audio/Filtered/filtered_${signal.file.replace('.wav', `_${signal.filterType === 'Low-Pass' ? 'LPF' : signal.filterType === 'High-Pass' ? 'HPF' : 'BSF'}.wav`)}`}
                noiseType={signal.noiseType}
                filterType={signal.filterType}
                mse={signal.metrics.mse}
                snrImprovement={signal.metrics.snrSignalNoise.improvement}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                 <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
                       <Info size={14} />
                    </div>
                    <div>
                       <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Observation</h4>
                       <p className="text-[11px] text-muted-foreground leading-relaxed">
                          {signal.noiseDescription}
                       </p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                       <Info size={14} />
                    </div>
                    <div>
                       <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Filter Action</h4>
                       <p className="text-[11px] text-muted-foreground leading-relaxed">
                          Applied a {signal.filterParams.order}-order {signal.filterType} filter with fc = {signal.filterType === 'Band-Stop/Notch' ? `${signal.filterParams.centerFreq} Hz` : `${signal.filterParams.cutoff} Hz`}.
                       </p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 rounded-lg bg-purple-500/10 text-purple-500">
                       <Info size={14} />
                    </div>
                    <div>
                       <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Result</h4>
                       <p className="text-[11px] text-muted-foreground leading-relaxed">
                          Reduced MSE to {signal.metrics.mse.toFixed(6)} with a spectral shift observed in the visualizer.
                       </p>
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionLayout>
  )
}
