import SectionLayout from "@/components/sections/section-layout";
import ComparisonAudioPlayer from "@/components/audio-player/comparison-audio-player";
import { PROJECT_DATA } from "@/lib/constants";

export default function FilterImplementationPage() {
  const [audio1, audio2, audio3] = PROJECT_DATA.audioSignals;

  return (
    <SectionLayout
      title="Filter Implementation"
      subtitle="MATLAB implementation, response analysis, and zero-phase application"
    >
      <div className="space-y-12 prose prose-invert max-w-none">
        <section>
          <h2 id="matlab-filter-design" className="font-google-sans font-bold">I. MATLAB Filter Design</h2>
          <p className="local-inter text-muted-foreground leading-relaxed">
            The designed IIR filters were implemented in MATLAB using Infinite Impulse Response digital filter structures. The process involves generating filter coefficients based on the calculated parameters and verifying the response using analysis functions.
          </p>

          <div className="not-prose bg-primary/5 rounded-2xl p-6 border border-primary/10 my-8">
              <div className="flex items-center gap-3 mb-2">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-xs font-black uppercase tracking-widest text-primary">MATLAB Functionality</span>
              </div>
              <p className="text-sm google-sans leading-relaxed">
                  The <code>butter()</code> function was used to generate numerator and denominator coefficients using the bilinear transformation method, preserves the magnitude response characteristics.
              </p>
          </div>

          <pre><code className="language-matlab">
% Design Filter 1: Low-Pass for Audio 1 (Hiss Removal) 
fc1 = 300; 
fc1_norm = fc1 / (Fs1/2); 
order1 = 1; 
[b1, a1] = butter(order1, fc1_norm, 'low'); 

% Design Filter 2: Band-Stop for Audio 2 (Fan Noise Removal) 
fc2_center = 50.67; 
fc2_bw = 8; 
fc2_low = fc2_center - fc2_bw/2; 
fc2_high = fc2_center + fc2_bw/2; 
[b2, a2] = butter(2, [fc2_low/(Fs2/2) fc2_high/(Fs2/2)], 'stop'); 
          </code></pre>
        </section>

        <section>
          <h2 id="frequency-response-analysis" className="font-google-sans font-bold">II. Frequency Response Analysis</h2>
          <p className="local-inter text-muted-foreground leading-relaxed">
            The magnitude and phase responses were computed using the <code>freqz()</code> function, spanning 1024 discrete frequency points.
          </p>

          <div className="not-prose grid md:grid-cols-2 gap-8 my-10">
              <div className="p-4 rounded-3xl bg-card border border-border overflow-hidden shadow-lg">
                  <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground italic flex-col gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                      <span className="text-xs">Figure 3.1 - LPF Response</span>
                  </div>
                  <div className="mt-4 px-2 text-[10px] text-center text-muted-foreground uppercase font-black">Low-Pass magnitude roll-off</div>
              </div>
              <div className="p-4 rounded-3xl bg-card border border-border overflow-hidden shadow-lg">
                  <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground italic flex-col gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                      <span className="text-xs">Figure 3.2 - Notch Response</span>
                  </div>
                  <div className="mt-4 px-2 text-[10px] text-center text-muted-foreground uppercase font-black">Notch attenuation at 50 Hz</div>
              </div>
          </div>
        </section>

        <section>
          <h2 id="filter-application" className="font-google-sans font-bold">III. Filter Application</h2>
          <p className="local-inter text-muted-foreground leading-relaxed">
            Filters were applied to noisy signals using <code>filtfilt()</code>, implementing zero-phase forward and reverse filtering. This approach is critical for audio to eliminate phase distortion and maintain temporal relationships.
          </p>

          <pre><code className="language-matlab">
% Apply using filtfilt for zero-phase filtering 
filtered_audio1 = filtfilt(b1, a1, audio1); 
filtered_audio2 = filtfilt(b2, a2, audio2); 
filtered_audio3 = filtfilt(b3, a3, audio3); 
          </code></pre>
        </section>

        <section>
          <h2 id="audio-exports" className="font-google-sans font-bold">IV. Normalization and Export</h2>
          <p className="local-inter text-muted-foreground leading-relaxed">
            To ensure compatibility and prevent digital clipping, filtered signals were normalized to the range [-1, 1] before being exported using <code>audiowrite()</code>.
          </p>

          <pre><code className="language-matlab">
% Normalize and export
filtered_audio1_norm = filtered_audio1 / max(abs(filtered_audio1)); 
audiowrite('filtered_Crysis3Intro_LPF.wav', filtered_audio1_norm, Fs1);
          </code></pre>

          <div className="not-prose space-y-8 mt-12">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-center text-muted-foreground/60 mb-8">Generated Audio Exports</h3>
            
            <ComparisonAudioPlayer
              signalName={audio1.name}
              originalSrc={`/audio/Noisy/wav/${audio1.file}`}
              filteredSrc={`/audio/Filtered/filtered_${audio1.file.replace('.wav', '_LPF.wav')}`}
              noiseType={audio1.noiseType}
              filterType={audio1.filterType}
              mse={audio1.metrics.mse}
              snrImprovement={audio1.metrics.snrSignalNoise.improvement}
            />

            <ComparisonAudioPlayer
              signalName={audio2.name}
              originalSrc={`/audio/Noisy/wav/${audio2.file}`}
              filteredSrc={`/audio/Filtered/filtered_${audio2.file.replace('.wav', '_BSF.wav')}`}
              noiseType={audio2.noiseType}
              filterType={audio2.filterType}
              mse={audio2.metrics.mse}
              snrImprovement={audio2.metrics.snrSignalNoise.improvement}
            />

            <ComparisonAudioPlayer
              signalName={audio3.name}
              originalSrc={`/audio/Noisy/wav/${audio3.file}`}
              filteredSrc={`/audio/Filtered/filtered_${audio3.file.replace('.wav', '_HPF.wav')}`}
              noiseType={audio3.noiseType}
              filterType={audio3.filterType}
              mse={audio3.metrics.mse}
              snrImprovement={audio3.metrics.snrSignalNoise.improvement}
            />
          </div>
        </section>
      </div>
    </SectionLayout>
  );
}
