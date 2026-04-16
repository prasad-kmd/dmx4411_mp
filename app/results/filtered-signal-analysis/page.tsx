import SectionLayout from "@/components/sections/section-layout";
import FrequencySpectrumChart from "@/components/charts/frequency-spectrum-chart";
import { PROJECT_DATA } from "@/lib/constants";

export default function FilteredSignalAnalysisPage() {
  const [audio1, audio2, audio3] = PROJECT_DATA.audioSignals;

  return (
    <SectionLayout
      title="Signal Analysis"
      subtitle="Comparing spectral characteristics before and after filtering"
    >
      <div className="space-y-16 prose prose-invert max-w-none pb-20">
        <section>
          <h2 id="filtered-signal-analysis" className="font-google-sans font-bold">Filtered Signal Analysis</h2>
          <p className="local-inter text-muted-foreground leading-relaxed">
            The frequency spectrums of both original (noisy) and filtered signals were computed using FFT to quantitatively assess the effectiveness of each filter in removing its target noise component.
          </p>
        </section>

        {/* Audio 1 Analysis */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 not-prose">
            <h3 id="high-frequency-hiss-removal" className="m-0 text-2xl font-bold font-google-sans">I. Audio 1: High-Frequency Hiss Removal</h3>
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[9px] font-black uppercase tracking-widest border border-blue-500/20">LPF applied</span>
          </div>
          <p className="text-muted-foreground local-inter leading-relaxed">
            Clear reduction in high-frequency content visible above the 300 Hz cutoff frequency. Magnitude of components above 1000 Hz has been substantially attenuated, while low-frequency content below 300 Hz remains intact.
          </p>
          <div className="not-prose mt-8">
            <FrequencySpectrumChart
              audioId={audio1.id}
              signalName={audio1.name}
              noiseType={audio1.noiseType}
              cutoffFreq={audio1.filterParams.cutoff}
            />
          </div>
        </section>

        {/* Audio 2 Analysis */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 not-prose">
            <h3 id="tonal-interference-removal" className="m-0 text-2xl font-bold font-google-sans">II. Audio 2: Tonal Interference Removal</h3>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">Notch applied</span>
          </div>
          <p className="text-muted-foreground local-inter leading-relaxed">
            Demonstrates attenuation of the 50.67 Hz peak. Selective attenuation confirms the effectiveness of the band-stop filter in removing tonal interference without degrading adjacent frequency content.
          </p>
          <div className="not-prose mt-8">
            <FrequencySpectrumChart
              audioId={audio2.id}
              signalName={audio2.name}
              noiseType={audio2.noiseType}
              centerFreq={audio2.filterParams.centerFreq}
            />
          </div>
        </section>

        {/* Audio 3 Analysis */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 not-prose">
            <h3 id="low-frequency-rumble-removal" className="m-0 text-2xl font-bold font-google-sans">III. Audio 3: Low-Frequency Rumble Removal</h3>
            <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-500 text-[9px] font-black uppercase tracking-widest border border-orange-500/20">HPF applied</span>
          </div>
          <p className="text-muted-foreground local-inter leading-relaxed">
            Substantial attenuation of low-frequency content below the 1000 Hz cutoff. Content above 1000 Hz remains unaffected, preserving mid and high-frequency musical information.
          </p>
          <div className="not-prose mt-8">
            <FrequencySpectrumChart
              audioId={audio3.id}
              signalName={audio3.name}
              noiseType={audio3.noiseType}
              cutoffFreq={audio3.filterParams.cutoff}
            />
          </div>
        </section>
      </div>
    </SectionLayout>
  );
}
