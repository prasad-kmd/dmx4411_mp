import SectionLayout from "@/components/sections/section-layout";
import { MethodologyFlowchart } from "@/components/research/methodology-flowchart";
import { processHardcodedContent } from "@/lib/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology",
  description: "Signal acquisition, MATLAB implementation, and analysis techniques.",
  openGraph: {
    title: "Research Methodology | DSP Research",
    description: "Detailed breakdown of signal acquisition and MATLAB implementation workflow.",
    images: [`/api/og?title=${encodeURIComponent("Research Methodology")}&description=${encodeURIComponent("Signal acquisition and MATLAB implementation.")}&type=research`],
  },
};

const content = `
<h2 id="signal-acquisition">Signal Acquisition</h2>
<p>
Three music clips, each approximately one minute in duration, were recorded in distinct noisy environments to ensure a variety of noise types were captured. These initial recordings were saved in the compressed .mp3 format. As required for stable and uncompressed signal processing, these files were converted to the Waveform Audio File Format (.wav) using the open-source audio editor, Audacity.
</p>

<div class="my-10 p-4 rounded-3xl bg-card border border-border overflow-hidden shadow-2xl">
    <div class="aspect-video bg-muted flex items-center justify-center text-muted-foreground italic flex-col gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        <span>Figure 2.1 - Exporting the Audio as .wav file in Audacity</span>
    </div>
    <div class="mt-4 px-2">
        <p class="text-xs text-muted-foreground text-center font-medium uppercase tracking-widest">Audacity Export Workflow</p>
    </div>
</div>

<p>
This conversion ensures that all analysis is performed on uncompressed linear Pulse Code Modulation (PCM) data. This conversion was necessary to preserve signal fidelity and avoid artifacts introduced by lossy compression, which could interfere with subsequent frequency domain analysis.
</p>

<h2 id="matlab-implementation">MATLAB Implementation</h2>
<p>
The converted .wav files were loaded into the MATLAB for initial processing and visualization. The audio signals are loaded using the <code>audioread()</code> function, which returns the audio signal data and its corresponding sampling frequency (Fs).
</p>

<pre><code class="language-matlab">
% Load audio files into MATLAB workspace
[audio1, Fs1] = audioread('../audio/wav/Crysis3Intro.wav'); 
[audio2, Fs2] = audioread('../audio/wav/DreamsBenSound.wav'); 
[audio3, Fs3] = audioread('../audio/wav/LastSummer.wav');
</code></pre>

<h3 id="time-domain-analysis">I. Time Domain Analysis</h3>
<p>
The time-domain waveforms of all three audio signals were visualized using MATLAB's <code>subplot()</code> function to display them in a single figure for comparative analysis.
</p>

<div class="my-10 p-4 rounded-3xl bg-card border border-border overflow-hidden shadow-2xl">
    <div class="aspect-video bg-muted flex items-center justify-center text-muted-foreground italic flex-col gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        <span>Figure 2.3 - Time Domain Representation (Stereo)</span>
    </div>
</div>

<p>
This time domain analysis shows that these three audio files are stereo which have two audio channels. To enhance the performance, we can use mono audio by taking mean values of those two channels.
</p>

<pre><code class="language-matlab">
% Convert stereo channels to mono channel
if size(audio1, 2) == 2, audio1 = mean(audio1, 2); end 
if size(audio2, 2) == 2, audio2 = mean(audio2, 2); end 
if size(audio3, 2) == 2, audio3 = mean(audio3, 2); end
</code></pre>

<div class="bg-primary/5 rounded-2xl p-6 border border-primary/10 my-8">
    <div class="flex items-center gap-3 mb-2">
        <div class="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
        <span class="text-xs font-black uppercase tracking-widest text-primary">Technical Specification</span>
    </div>
    <p class="text-sm google-sans leading-relaxed">
        Sampling frequencies for all audio files were identified as <strong>44.1 kHz</strong>, matching the export "Sample Rate" chosen during the Audacity conversion process.
    </p>
</div>

<h3 id="frequency-domain-analysis">II. Frequency Domain Analysis</h3>
<p>
To identify noise components in the audio signals, frequency domain analysis was performed using the Fast Fourier Transform (FFT). The FFT converts time-domain signals into their frequency-domain representation, revealing the magnitude and distribution of frequency components present in each signal.
</p>

<p>
For a discrete signal $x(n)$ of length $N$, the FFT is computed as:
</p>
<div class="math-display">
$$X(k) = \\sum_{n=0}^{N-1} x(n) e^{-j\\frac{2\\pi kn}{N}}$$
</div>
<p>
where $k$ represents the frequency bin index.
</p>

<pre><code class="language-matlab">
% Compute FFT and extract single-sided spectrum
Y1 = fft(audio1); % Compute FFT 
P2_1 = abs(Y1/N1); % Two-sided spectrum 
P1_1 = P2_1(1:N1/2+1); % Single-sided 
P1_1(2:end-1) = 2*P1_1(2:end-1); % Adjust amplitude 
f1 = Fs1*(0:(N1/2))/N1; % Frequency vector
</code></pre>

<p>
The single-sided magnitude spectrum was calculated to focus on positive frequencies, as audio signals are real-valued and symmetric in the frequency domain. This visualization revealed distinct noise profiles:
</p>

<div class="grid md:grid-cols-3 gap-4 my-10">
    <div class="group relative overflow-hidden p-6 rounded-[2rem] bg-card/50 border border-border hover:border-blue-500/30 transition-all duration-300">
        <div class="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></svg>
        </div>
        <div class="relative z-10">
            <div class="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500/70 mb-2">Signal A-01</div>
            <h4 class="text-lg font-bold font-google-sans mb-3">Broadband Hiss</h4>
            <p class="text-xs leading-relaxed text-muted-foreground mb-6 opacity-80">Characteristic white-noise profile with wide-spectrum energy distribution.</p>
            <div class="flex items-end justify-between">
                <div>
                    <div class="text-xl font-black font-google-sans text-foreground tabular-nums">439.83 Hz</div>
                    <div class="text-[8px] uppercase tracking-widest font-bold text-muted-foreground/50">Fundamental Freq</div>
                </div>
            </div>
        </div>
    </div>
    <div class="group relative overflow-hidden p-6 rounded-[2rem] bg-card/50 border border-border hover:border-emerald-500/30 transition-all duration-300">
        <div class="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>
        </div>
        <div class="relative z-10">
            <div class="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500/70 mb-2">Signal A-02</div>
            <h4 class="text-lg font-bold font-google-sans mb-3">Tonal Hum</h4>
            <p class="text-xs leading-relaxed text-muted-foreground mb-6 opacity-80">Localized interference peak specifically at power line frequency harmonics.</p>
            <div class="flex items-end justify-between">
                <div>
                    <div class="text-xl font-black font-google-sans text-foreground tabular-nums">50.67 Hz</div>
                    <div class="text-[8px] uppercase tracking-widest font-bold text-muted-foreground/50">Fundamental Freq</div>
                </div>
            </div>
        </div>
    </div>
    <div class="group relative overflow-hidden p-6 rounded-[2rem] bg-card/50 border border-border hover:border-orange-500/30 transition-all duration-300">
        <div class="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500"><path d="m3 11 18-5v12L3 14v-3z"/></svg>
        </div>
        <div class="relative z-10">
            <div class="text-[9px] font-black uppercase tracking-[0.2em] text-orange-500/70 mb-2">Signal A-03</div>
            <h4 class="text-lg font-bold font-google-sans mb-3">LF Rumble</h4>
            <p class="text-xs leading-relaxed text-muted-foreground mb-6 opacity-80">Sub-harmonic vibrations and structural noise in the lower audible range.</p>
            <div class="flex items-end justify-between">
                <div>
                    <div class="text-xl font-black font-google-sans text-foreground tabular-nums">42.20 Hz</div>
                    <div class="text-[8px] uppercase tracking-widest font-bold text-muted-foreground/50">Fundamental Freq</div>
                </div>
            </div>
        </div>
    </div>
</div>

<h2 id="methodology-flowchart">Methodology Flowchart</h2>
`;

export default async function MethodologyPage() {
  const processedContent = await processHardcodedContent(content);
  return (
    <SectionLayout
      title="Methodology"
      subtitle="Signal Acquisition and MATLAB Implementation"
      content={processedContent}
    >
        <MethodologyFlowchart />
    </SectionLayout>
  );
}
