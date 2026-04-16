import SectionLayout from "@/components/sections/section-layout";

const content = `
<h2 id="matlab-source-code">Full MATLAB Source Code</h2>
<p>
The following MATLAB code was used for all signal processing, filter design, and performance evaluation tasks in this project. You can review the implementation details for signal acquisition, FFT analysis, and IIR filtering below.
</p>

<div class="relative group my-10">
    <div class="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
    <div class="relative rounded-3xl border border-border bg-card overflow-hidden shadow-2xl">
        <div class="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/50">
            <div class="flex items-center gap-2">
                <div class="flex gap-1.5">
                    <div class="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
                    <div class="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40"></div>
                    <div class="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
                </div>
                <span class="ml-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">audio_denoising.m</span>
            </div>
            <button class="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all">
                Copy Code
            </button>
        </div>

<pre class="m-0 p-8 text-sm"><code class="language-matlab">
% Clear workspace
clear; clc; close all;

% Load audio files
[audio1, Fs1] = audioread('../audio/wav/Crysis3Intro.wav');
[audio2, Fs2] = audioread('../audio/wav/DreamsBenSound.wav');
[audio3, Fs3] = audioread('../audio/wav/LastSummer.wav');

% Convert stereo to mono if necessary
if size(audio1, 2) == 2, audio1 = mean(audio1, 2); end
if size(audio2, 2) == 2, audio2 = mean(audio2, 2); end
if size(audio3, 2) == 2, audio3 = mean(audio3, 2); end

% Create Time Vectors
N1 = length(audio1); N2 = length(audio2); N3 = length(audio3);
t1 = (0:N1-1) / Fs1; t2 = (0:N2-1) / Fs2; t3 = (0:N3-1) / Fs3;

% Section 02: Frequency Domain Analysis
% Compute FFT for Audio 1
Y1 = fft(audio1);
P2_1 = abs(Y1/N1);
P1_1 = P2_1(1:N1/2+1);
P1_1(2:end-1) = 2*P1_1(2:end-1);
f1 = Fs1*(0:(N1/2))/N1;

% Filter Design
% Filter 1: Low-Pass (Hiss Removal)
fc1 = 300; fc1_norm = fc1 / (Fs1/2);
[b1, a1] = butter(1, fc1_norm, 'low');

% Filter 2: Band-Stop (Fan Noise Removal)
fc2_center = 50.67; fc2_bw = 8;
[b2, a2] = butter(2, [(fc2_center-4)/(Fs2/2) (fc2_center+4)/(Fs2/2)], 'stop');

% Filter 3: High-Pass (Rumble Removal)
fc3 = 1000; fc3_norm = fc3 / (Fs3/2);
[b3, a3] = butter(2, fc3_norm, 'high');

% Apply filters using filtfilt for zero-phase
filtered_audio1 = filtfilt(b1, a1, audio1);
filtered_audio2 = filtfilt(b2, a2, audio2);
filtered_audio3 = filtfilt(b3, a3, audio3);

% Performance Evaluation: MSE
MSE1 = mean((audio1 - filtered_audio1).^2);
SNR1 = snr(audio1);
</code></pre>
    </div>
</div>

<div class="flex justify-center my-12">
    <a href="/audio_denoising.m" download="audio_denoising.m" class="inline-flex h-14 items-center justify-center rounded-full border border-primary/20 bg-primary/5 px-10 text-xs font-black uppercase tracking-[0.2em] text-primary transition-all hover:bg-primary hover:text-white group">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="mr-2 group-hover:animate-bounce"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Download .m Script
    </a>
</div>
`;

export default function AppendixPage() {
  return (
    <SectionLayout
      title="Appendix"
      subtitle="Complete MATLAB source code for noise analysis and filtering"
      content={content}
    />
  );
}
