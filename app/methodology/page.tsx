import { FloatingTOC } from "@/components/floating-toc";
import { MethodologyFlowchart } from "@/components/methodology-flowchart";
import { CodeBlock } from "@/components/code-block";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import contentData from "@/data/content.json";
import { PROJECT_DATA } from "@/lib/constants";
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import { Activity } from "lucide-react";

const content = contentData as Record<string, string>;

export default function MethodologyPage() {
  const tocItems = [
    { id: "acquisition", label: "Signal Acquisition" },
    { id: "matlab", label: "MATLAB Implementation" },
    { id: "flowchart", label: "Methodology Flowchart" },
  ];

  const acqCode = `[audio1, Fs1] = audioread('../audio/wav/Crysis3Intro.wav');
[audio2, Fs2] = audioread('../audio/wav/DreamsBenSound.wav');
[audio3, Fs3] = audioread('../audio/wav/LastSummer.wav');`;

  const monoCode = `if size(audio, 2) == 2
    audio = mean(audio, 2);
end`;

  const fftCode = `Y = fft(audio);
P2 = abs(Y/N);
P1 = P2(1:N/2+1);
P1(2:end-1) = 2*P1(2:end-1);
f = Fs*(0:(N/2))/N;`;

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col xl:flex-row gap-12">
      <div className="max-w-4xl flex-1 prose dark:prose-invert">
        <h1 className="text-4xl font-bold mb-8">Methodology</h1>

        <section id="acquisition" className="mb-16 scroll-mt-32">
          <h2 className="text-2xl font-bold mb-6">1. Signal Acquisition</h2>
          <div className="text-muted-foreground leading-relaxed mb-6">
            Three music clips were recorded in distinct noisy environments. These recordings, initially in .mp3 format, were converted to .wav using Audacity to ensure linear PCM data for processing.
          </div>
          <CodeBlock code={acqCode} filename="acquisition.m" />
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 text-sm italic">
              "Conversion was necessary to preserve signal fidelity and avoid artifacts introduced by lossy compression."
            </CardContent>
          </Card>
        </section>

        <section id="matlab" className="mb-16 scroll-mt-32">
          <h2 className="text-2xl font-bold mb-6">2. MATLAB Implementation</h2>

          <h3 className="text-xl font-bold mb-4">I. Time Domain Analysis</h3>
          <p className="text-muted-foreground mb-4">
            Initial analysis revealed that the signals were stereo. To simplify processing, they were converted to mono by averaging the channels.
          </p>
          <CodeBlock code={monoCode} filename="stereo_to_mono.m" />

          <div className="grid grid-cols-3 gap-4 my-8">
            {PROJECT_DATA.audioSignals.map(s => (
              <div key={s.id} className="p-4 glass rounded-xl text-center border-white/5">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Sampling Rate</p>
                <p className="font-bold text-primary">{PROJECT_DATA.samplingRate / 1000} kHz</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-4">II. Frequency Domain Analysis</h3>
          <p className="text-muted-foreground mb-4">
            The Fast Fourier Transform (FFT) was used to reveal the spectral characteristics of the embedded noise. For a discrete signal <InlineMath math="x(n)" /> of length <InlineMath math="N" />, the FFT is computed as:
          </p>
          <div className="my-6 bg-white/5 p-8 rounded-2xl border border-white/5">
            <BlockMath math="X(k) = \sum_{n=0}^{N-1} x(n) e^{-j\frac{2\pi kn}{N}}" />
          </div>
          <CodeBlock code={fftCode} filename="fft_analysis.m" />

          <h4 className="text-lg font-bold mb-4 mt-8">Fundamental Frequencies Identified:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {PROJECT_DATA.audioSignals.map(s => (
              <div key={s.id} className="p-6 glass rounded-2xl border-white/5 relative overflow-hidden group">
                <div className="relative z-10">
                  <p className="text-xs font-bold text-primary uppercase mb-2">{s.name}</p>
                  <p className="text-3xl font-black">{s.fundamentalFreq}<span className="text-sm font-normal text-muted-foreground ml-1">Hz</span></p>
                </div>
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-125 transition-transform">
                  <Activity className="size-12" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="flowchart" className="mb-16 scroll-mt-32">
          <h2 className="text-2xl font-bold mb-8">Project Methodology Flowchart</h2>
          <MethodologyFlowchart />
        </section>
      </div>
      <FloatingTOC items={tocItems} />
    </div>
  );
}
