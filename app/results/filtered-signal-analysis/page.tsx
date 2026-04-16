import SectionLayout from "@/components/sections/section-layout";

const content = `
<h2 id="filtered-signal-analysis">Filtered Signal Analysis</h2>
<p>
The frequency spectrums of both original (noisy) and filtered signals were computed using FFT to quantitatively assess the effectiveness of each filter in removing its target noise component.
</p>

<div class="space-y-16 my-16">
    <!-- Audio 1 Analysis -->
    <div class="space-y-6">
        <div class="flex items-center gap-3">
            <h3 id="high-frequency-hiss-removal" class="m-0 text-2xl font-bold amoriaregular">I. Audio 1: High-Frequency Hiss Removal</h3>
            <span class="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[9px] font-black uppercase tracking-widest border border-blue-500/20">LPF applied</span>
        </div>
        <p class="text-muted-foreground google-sans leading-relaxed">
            Clear reduction in high-frequency content visible above the 300 Hz cutoff frequency. Magnitude of components above 1000 Hz has been substantially attenuated, while low-frequency content below 300 Hz remains intact.
        </p>
        <div class="grid md:grid-cols-2 gap-4">
            <div class="p-4 rounded-3xl bg-card border border-border shadow-md">
                <div class="aspect-video bg-muted flex items-center justify-center text-muted-foreground italic text-xs">Figure 4.1 - Original Spectrum</div>
            </div>
            <div class="p-4 rounded-3xl bg-card border border-border shadow-md">
                <div class="aspect-video bg-muted flex items-center justify-center text-muted-foreground italic text-xs">Figure 4.2 - Filtered Spectrum</div>
            </div>
        </div>
    </div>

    <!-- Audio 2 Analysis -->
    <div class="space-y-6">
        <div class="flex items-center gap-3">
            <h3 id="tonal-interference-removal" class="m-0 text-2xl font-bold amoriaregular">II. Audio 2: Tonal Interference Removal</h3>
            <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">Notch applied</span>
        </div>
        <p class="text-muted-foreground google-sans leading-relaxed">
            Demonstrates attenuation of the 50.67 Hz peak. Selective attenuation confirms the effectiveness of the band-stop filter in removing tonal interference without degrading adjacent frequency content.
        </p>
        <div class="grid md:grid-cols-2 gap-4">
            <div class="p-4 rounded-3xl bg-card border border-border shadow-md">
                <div class="aspect-video bg-muted flex items-center justify-center text-muted-foreground italic text-xs">Figure 4.3 - Original Spectrum (0-200 Hz)</div>
            </div>
            <div class="p-4 rounded-3xl bg-card border border-border shadow-md">
                <div class="aspect-video bg-muted flex items-center justify-center text-muted-foreground italic text-xs">Figure 4.4 - Filtered Spectrum (0-200 Hz)</div>
            </div>
        </div>
    </div>

    <!-- Audio 3 Analysis -->
    <div class="space-y-6">
        <div class="flex items-center gap-3">
            <h3 id="low-frequency-rumble-removal" class="m-0 text-2xl font-bold amoriaregular">III. Audio 3: Low-Frequency Rumble Removal</h3>
            <span class="px-2 py-0.5 rounded bg-orange-500/10 text-orange-500 text-[9px] font-black uppercase tracking-widest border border-orange-500/20">HPF applied</span>
        </div>
        <p class="text-muted-foreground google-sans leading-relaxed">
            Substantial attenuation of low-frequency content below the 1000 Hz cutoff. Content above 1000 Hz remains unaffected, preserving mid and high-frequency musical information.
        </p>
        <div class="grid md:grid-cols-2 gap-4">
            <div class="p-4 rounded-3xl bg-card border border-border shadow-md">
                <div class="aspect-video bg-muted flex items-center justify-center text-muted-foreground italic text-xs">Figure 4.5 - Original Spectrum</div>
            </div>
            <div class="p-4 rounded-3xl bg-card border border-border shadow-md">
                <div class="aspect-video bg-muted flex items-center justify-center text-muted-foreground italic text-xs">Figure 4.6 - Filtered Spectrum</div>
            </div>
        </div>
    </div>
</div>
`;

export default function FilteredSignalAnalysisPage() {
  return (
    <SectionLayout
      title="Signal Analysis"
      subtitle="Comparing spectral characteristics before and after filtering"
      content={content}
    />
  );
}
