export default function AppendixPage() {
  return (
    <article>
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Appendix</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">MATLAB Code</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Complete MATLAB implementation for the DSP mini project.
        </p>
        
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
            <span className="text-sm font-mono">full_code.m</span>
            <a 
              href="/public/full_code.m" 
              download
              className="text-sm text-primary hover:underline"
            >
              Download
            </a>
          </div>
          <pre className="p-4 overflow-x-auto text-sm font-mono bg-muted/30">
            <code className="language-matlab">
{`% DSP Mini Project - Audio Noise Removal
% Complete MATLAB Implementation

clc; clear; close all;

%% Audio File Loading
[audio1, fs] = audioread('audio1_noisy.wav');
[audio2, fs] = audioread('audio2_noisy.wav');
[audio3, fs] = audioread('audio3_noisy.wav');

%% FFT Analysis
N = length(audio1);
f = (0:N-1)*(fs/N);
X1 = fft(audio1);

%% Filter Design - Butterworth LPF
fc1 = 300; % Cutoff frequency
[b1, a1] = butter(1, fc1/(fs/2), 'low');

%% Filter Application
filtered1 = filter(b1, a1, audio1);

%% Frequency Response
[H1, w1] = freqz(b1, a1, 1024, fs);

%% Performance Metrics
mse = mean((audio1 - filtered1).^2);
snr = 10*log10(var(audio1)/var(audio1-filtered1));

%% Save Filtered Audio
audiowrite('filtered_audio1.wav', filtered1, fs);`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <ResourceCard 
            title="Full Report PDF" 
            description="Complete project documentation"
            href="/public/MP_Full-Report.pdf"
          />
          <ResourceCard 
            title="Project Guide PDF" 
            description="Step-by-step implementation guide"
            href="/public/MP_Guide.pdf"
          />
        </div>
      </section>
    </article>
  )
}

function ResourceCard({ title, description, href }: { 
  title: string; description: string; href: string 
}) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-6 rounded-lg border border-border bg-card hover:border-accent hover:bg-accent/10 transition-colors"
    >
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </a>
  )
}
