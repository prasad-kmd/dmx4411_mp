import SectionLayout from "@/components/sections/section-layout";

const content = `
<h2 id="background-and-context">Background and Context</h2>
<p>
In the world of consumer electronics, portable music players and smartphones are primary devices for personal audio enjoyment. Users expect high-quality playback regardless of the source file's origin. However, audio signals are frequently corrupted by various forms of background noise during recording, transmission, or storage. Common noise types include constant tonal hum (50/60 Hz electrical interference), broadband hiss (from electronic components or tape), low-frequency rumble and complex environmental sounds (chatter, wind). These unwanted components significantly degrade the listening experience, obscuring the clarity and detail of the original music.
</p>
<p>
These results in customer dissatisfaction and diminishes the intended listening experience. Addressing these audio imperfections is important to maintaining product quality and meeting consumer demand in the competitive electronics market.
</p>

<h2 id="problem-statement">Problem Statement</h2>
<div class="p-6 rounded-2xl bg-primary/5 border border-primary/20 my-8">
    <div class="flex items-center gap-2 mb-4 text-primary font-bold uppercase tracking-widest text-xs">
        <span class="p-1 rounded-md bg-primary text-primary-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </span>
        Engineering Challenge
    </div>
    <p class="text-foreground italic leading-relaxed google-sans">
        "A consumer electronics company has received customer complaints regarding poor audio quality and persistent background noise in some files played on its portable devices. Manually cleaning these files is not a scalable solution."
    </p>
</div>

<p>
There is a clear need for an automated, signal processing-based system that can analyze an audio file, identify the spectral characteristics of the embedded noise and apply a targeted filtering algorithm to suppress it while preserving the desired musical content. This project involves the development, implementation and evaluation of such such a system using MATLAB while moving from theoretical concepts to a functional solution.
</p>

<h2 id="project-objectives">Project Objectives</h2>
<div class="grid gap-4 my-8">
    <div class="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors flex gap-4">
        <div class="h-10 w-10 shrink-0 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
        <div>
            <h4 class="font-bold text-foreground mb-1">Acquire and Analyze</h4>
            <p class="text-sm text-muted-foreground leading-relaxed">Record music in noisy environments and perform both time and frequency-domain analyses to identify noise components.</p>
        </div>
    </div>
    <div class="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors flex gap-4">
        <div class="h-10 w-10 shrink-0 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20v-6M9 20v-10M6 20v-4M15 20v-12M18 20v-16"/></svg>
        </div>
        <div>
            <h4 class="font-bold text-foreground mb-1">Design Digital Filters</h4>
            <p class="text-sm text-muted-foreground leading-relaxed">Design appropriate digital filters (Low-pass, High-pass, Band-stop) with calculated parameters targeting specific frequencies.</p>
        </div>
    </div>
    <div class="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors flex gap-4">
        <div class="h-10 w-10 shrink-0 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
        </div>
        <div>
            <h4 class="font-bold text-foreground mb-1">Implement and Test</h4>
            <p class="text-sm text-muted-foreground leading-relaxed">Apply designed filters and implement an objective evaluation framework using standard metrics like SNR and MSE.</p>
        </div>
    </div>
    <div class="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors flex gap-4">
        <div class="h-10 w-10 shrink-0 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        <div>
            <h4 class="font-bold text-foreground mb-1">Evaluate System Performance</h4>
            <p class="text-sm text-muted-foreground leading-relaxed">Quantify improvement achieved, critically assess limitations, and suggest potential enhancements for the system.</p>
        </div>
    </div>
</div>

<p>
This project focuses on the application of fundamental concepts covered in Signal Processing, including signal acquisition, Fourier analysis, filter design, and quantitative performance evaluation using metrics such as mean square error (MSE) and signal-to-noise ratio (SNR).
</p>
<p>
Digital Signal Processing (DSP) techniques are fundamental in audio engineering, enabling the enhancement of perceived audio quality through the selective attenuation of noise.
</p>
`;

export default function IntroductionPage() {
  return (
    <SectionLayout
      title="Introduction"
      subtitle="Background, Problem Statement and Project Objectives"
      content={content}
    />
  );
}
