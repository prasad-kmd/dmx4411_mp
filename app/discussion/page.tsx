import SectionLayout from "@/components/sections/section-layout";
import { processHardcodedContent } from "@/lib/content";

const content = `
<h2 id="effectiveness-of-designed-filters">Effectiveness of Designed Filters</h2>
<p>
The three designed filters demonstrated varying levels of effectiveness in removing their target noise components, as evidenced by both subjective listening tests and quantitative analysis.
</p>

<div class="grid gap-6 my-10">
    <div class="p-6 rounded-3xl bg-card border border-border">
        <h4 class="font-bold mb-3 flex items-center gap-2">
            <span class="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
            Audio 1: LPF Hiss Removal
        </h4>
        <p class="text-sm text-muted-foreground leading-relaxed google-sans">Successfully reduced high-frequency hiss. However, the 300 Hz cutoff also attenuates mid-frequency musical content between 300-1000 Hz, reflecting the negative SNR improvement.</p>
    </div>
    <div class="p-6 rounded-3xl bg-card border border-border">
        <h4 class="font-bold mb-3 flex items-center gap-2">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            Audio 2: Notch Tonal Interference
        </h4>
        <p class="text-sm text-muted-foreground leading-relaxed google-sans">Showed limited effectiveness. Factors include narrow bandwidth (8 Hz) which may not account for modulation, and potentially unaddressed harmonic components of the noise.</p>
    </div>
    <div class="p-6 rounded-3xl bg-card border border-border">
        <h4 class="font-bold mb-3 flex items-center gap-2">
            <span class="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
            Audio 3: HPF Rumble Removal
        </h4>
        <p class="text-sm text-muted-foreground leading-relaxed google-sans">Effectively removed low-frequency rumble, but at a significant cost of bass content preservation due to the 1000 Hz cutoff frequency.</p>
    </div>
</div>

<h2 id="limitations-of-the-approach">Limitations of the Approach</h2>
<div class="space-y-4 my-8">
    <div class="group p-1 bg-gradient-to-r from-border to-transparent rounded-2xl">
        <div class="bg-card p-5 rounded-[0.9rem] flex gap-4 items-start">
            <span class="h-8 w-8 rounded-lg bg-muted flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">01</span>
            <div>
                <h5 class="font-bold text-sm mb-1 uppercase tracking-wider">Fixed Filter Parameters</h5>
                <p class="text-xs text-muted-foreground leading-relaxed">Predetermined parameters do not adapt to variations in non-stationary noise characteristics across segments.</p>
            </div>
        </div>
    </div>
    <div class="group p-1 bg-gradient-to-r from-border to-transparent rounded-2xl">
        <div class="bg-card p-5 rounded-[0.9rem] flex gap-4 items-start">
            <span class="h-8 w-8 rounded-lg bg-muted flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">02</span>
            <div>
                <h5 class="font-bold text-sm mb-1 uppercase tracking-wider">Noise/Signal Overlap</h5>
                <p class="text-xs text-muted-foreground leading-relaxed">Simple band-limiting filters cannot discriminate between noise and signal when they occupy overlapping frequency bands.</p>
            </div>
        </div>
    </div>
    <div class="group p-1 bg-gradient-to-r from-border to-transparent rounded-2xl">
        <div class="bg-card p-5 rounded-[0.9rem] flex gap-4 items-start">
            <span class="h-8 w-8 rounded-lg bg-muted flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">03</span>
            <div>
                <h5 class="font-bold text-sm mb-1 uppercase tracking-wider">Metric Correlation</h5>
                <p class="text-xs text-muted-foreground leading-relaxed">Traditional SNR metrics do not accurately reflect perceptual improvement for frequency-selective filters.</p>
            </div>
        </div>
    </div>
</div>

<h2 id="suggested-improvements">Suggested Improvements</h2>
<p>
Several improvements could enhance the noise removal system, moving beyond basic frequency-selective filtering to more intelligent and adaptive algorithms.
</p>

<div class="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 my-10 relative overflow-hidden">
    <div class="relative z-10">
        <h4 class="text-primary font-black uppercase tracking-widest text-xs mb-4">Deep Learning Integration</h4>
        <p class="leading-relaxed google-sans text-muted-foreground mb-6">
            Modern deep learning techniques for audio denoising (e.g., <strong>U-Net architectures</strong>, CNNs) can learn complex mappings from noisy to clean audio, automatically learning optimal suppression strategies.
        </p>
        <ul class="grid grid-cols-2 gap-x-8 gap-y-2 text-xs font-bold text-primary list-none p-0">
            <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Adaptive Filtering</li>
            <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Spectral Subtraction</li>
            <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Multi-Band EQ</li>
            <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Perceptual Weighting</li>
        </ul>
    </div>
    <div class="absolute -right-20 -bottom-20 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
    </div>
</div>
`;

export default async function DiscussionPage() {
  const processedContent = await processHardcodedContent(content);
  return (
    <SectionLayout
      title="Discussion"
      subtitle="Critical analysis of filter effectiveness and system limitations"
      content={processedContent}
    />
  );
}
