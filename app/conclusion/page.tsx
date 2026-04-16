import SectionLayout from "@/components/sections/section-layout";
import { processHardcodedContent } from "@/lib/content";

const content = `
<h2 id="project-summary">Project Summary</h2>
<p>
This project successfully developed and implemented a signal processing system for analyzing and removing noise from audio recordings using frequency-selective digital filters. By leveraging MATLAB for design and evaluation, we transitioned from theoretical concepts to a functional engineering solution.
</p>

<h2 id="key-findings">Key Findings</h2>
<div class="grid gap-6 my-10">
    <div class="p-8 rounded-3xl border border-border bg-card hover:border-primary/30 transition-all shadow-lg group">
        <div class="flex items-center gap-3 mb-4">
            <div class="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h4 class="font-bold m-0 text-foreground">Successful Noise Removal</h4>
        </div>
        <p class="text-sm text-muted-foreground google-sans leading-relaxed">Audio 1 and Audio 3 demonstrated effective reduction of hiss and rumble, confirmed by both spectrum analysis and subjective listening tests.</p>
    </div>

    <div class="p-8 rounded-3xl border border-border bg-card hover:border-primary/30 transition-all shadow-lg group">
        <div class="flex items-center gap-3 mb-4">
            <div class="p-2 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </div>
            <h4 class="font-bold m-0 text-foreground">Metric Limitations</h4>
        </div>
        <p class="text-sm text-muted-foreground google-sans leading-relaxed">Objective metrics (SNR) yielded negative improvements due to signal loss, highlighting the need for multiple evaluation methods in signal processing.</p>
    </div>

    <div class="p-8 rounded-3xl border border-border bg-card hover:border-primary/30 transition-all shadow-lg group">
        <div class="flex items-center gap-3 mb-4">
            <div class="p-2 rounded-lg bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m10 10-2 2 2 2"/><path d="m14 14 2-2-2-2"/><rect width="20" height="16" x="2" y="4" rx="2"/></svg>
            </div>
            <h4 class="font-bold m-0 text-foreground">Technical Accomplishments</h4>
        </div>
        <ul class="text-xs text-muted-foreground leading-relaxed p-0 list-none space-y-2 mt-4">
            <li class="flex items-center gap-2"><div class="h-1 w-1 rounded-full bg-primary"></div> Time and frequency-domain signal analysis</li>
            <li class="flex items-center gap-2"><div class="h-1 w-1 rounded-full bg-primary"></div> Butterworth approximation filter design</li>
            <li class="flex items-center gap-2"><div class="h-1 w-1 rounded-full bg-primary"></div> Zero-phase filtering implementation</li>
            <li class="flex items-center gap-2"><div class="h-1 w-1 rounded-full bg-primary"></div> Multi-metric performance evaluation</li>
        </ul>
    </div>
</div>

<h2 id="final-remarks">Final Remarks</h2>
<blockquote class="border-l-4 border-primary bg-primary/5 py-4 px-8 rounded-r-2xl my-10 italic font-google-sans text-foreground">
    "The project achieved its core objectives: demonstrating signal processing fundamentals and evaluating performance through multiple metrics. The combination of theoretical knowledge and practical implementation provided a comprehensive understanding applicable to real-world engineering challenges."
</blockquote>
`;

export default async function ConclusionPage() {
  const processedContent = await processHardcodedContent(content);
  return (
    <SectionLayout
      title="Conclusion"
      subtitle="Final project summary and major learning outcomes"
      content={processedContent}
    />
  );
}
