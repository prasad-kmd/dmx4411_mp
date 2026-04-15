"use client";

import React from "react";
import contentData from "@/data/content.json";
import { MathEquation } from "@/components/math/MathEquation";
import { CodeBlock } from "@/components/code/CodeBlock";
import { TableOfContents } from "@/components/navigation/TableOfContents";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export default function MethodologyPage() {
  const methodologySection = contentData.sections.find(s => s.id === "methodology");

  if (!methodologySection) {
    return <div>Section not found</div>;
  }

  return (
    <div className="flex gap-12 pb-20">
      <div className="flex-1 space-y-12">
        <Breadcrumbs />
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight font-primary">{methodologySection.title}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The technical approach, signal acquisition, and MATLAB implementation strategy.
        </p>
      </div>

        <div className="space-y-16">
          {methodologySection.subsections.map((sub) => (
            <section key={sub.id} id={sub.id} className="space-y-8 scroll-mt-24">
              <h2 className="text-3xl font-bold font-primary border-b pb-2">{sub.title}</h2>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              {sub.content.split('\n\n').map((paragraph, i) => (
                paragraph.trim() && <p key={i} className="leading-relaxed text-lg">{paragraph}</p>
              ))}
            </div>

            {/* Sub-sections like Time/Frequency Domain Analysis */}
            <div className="space-y-12 ml-4 border-l-2 pl-8">
              {sub.subsections.map((child) => (
                <div key={child.id} id={child.id} className="space-y-6 scroll-mt-24">
                  <h3 className="text-2xl font-bold font-primary">{child.title}</h3>

                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    {child.content.split('\n\n').map((p, i) => (
                      p.trim() && <p key={i} className="leading-relaxed">{p}</p>
                    ))}
                  </div>

                  {/* Manual addition of components for Stage 4 demonstration if not in JSON */}
                  {child.id === "i-time-domain-analysis" && (
                    <CodeBlock
                      filename="load_audio.m"
                      code={`% Load audio files
[audio1, Fs1] = audioread('Crysis3Intro.wav');

% Convert stereo to mono if necessary
if size(audio1, 2) == 2
    audio1 = mean(audio1, 2);
end

% Create Time Vector
N1 = length(audio1);
t1 = (0:N1-1) / Fs1;

% Plot Time-Domain waveform
figure;
plot(t1, audio1);
xlabel('Time (s)');
ylabel('Amplitude');
title('Audio Signal 1 - Time Domain');
grid on;`}
                    />
                  )}

                  {child.id === "ii-frequency-domain-analysis" && (
                    <div className="space-y-8">
                      <MathEquation
                        displayMode
                        label="Eq. 2.1"
                        latex="X(k) = \sum_{n=0}^{N-1} x(n) e^{-j\frac{2\pi}{N}kn}"
                      />

                      <CodeBlock
                        filename="fft_analysis.m"
                        code={`% Compute FFT for Audio 1
Y1 = fft(audio1);
P2_1 = abs(Y1/N1); % Two-sided spectrum
P1_1 = P2_1(1:N1/2+1); % Single-sided
P1_1(2:end-1) = 2*P1_1(2:end-1); % Adjust amplitude
f1 = Fs1*(0:(N1/2))/N1; % Frequency vector

% Plot Magnitude Spectrum
figure;
plot(f1, P1_1);
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('Single-Sided Magnitude Spectrum');
xlim([0 Fs1/2]);`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            </section>
          ))}
        </div>
      </div>
      <TableOfContents />
    </div>
  );
}
