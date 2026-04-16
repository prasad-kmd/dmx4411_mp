import { FloatingTOC } from "@/components/floating-toc";
import { CodeBlock } from "@/components/code-block";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PROJECT_DATA } from "@/lib/constants";
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function DesignPage() {
  const tocItems = [
    { id: "noise-id", label: "Noise Identification" },
    { id: "filter-selection", label: "Filter Selection & Design" },
    { id: "implementation", label: "MATLAB Implementation" },
  ];

  const butterCode = `[b, a] = butter(order, fc_norm, 'type');`;
  const freqzCode = `[h, f] = freqz(b, a, 1024, Fs);
mag = 20*log10(abs(h));`;

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col xl:flex-row gap-12">
      <div className="max-w-4xl flex-1 prose dark:prose-invert">
        <h1 className="text-4xl font-bold mb-8">Filter Design & Identification</h1>

        <section id="noise-id" className="mb-16 scroll-mt-32">
          <h2 className="text-2xl font-bold mb-8">1. Noise Identification and Characterization</h2>
          <div className="space-y-6">
            {PROJECT_DATA.audioSignals.map((s, i) => (
              <Card key={s.id} className="border-white/5 overflow-hidden">
                <CardHeader className="bg-white/5 border-b border-white/5">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold">{s.name} Analysis</CardTitle>
                    <Badge className="bg-primary/20 text-primary border-primary/30 uppercase text-[10px] tracking-widest">{s.noiseType}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Frequency domain analysis for {s.name} ({s.filename}) revealed a fundamental component at {s.fundamentalFreq} Hz.
                    {i === 0 && " The spectrum showed elevated magnitude levels in the high-frequency region above 5 kHz, characteristic of broadband hiss."}
                    {i === 1 && " A prominent narrow peak was detected at 50.67 Hz, indicating tonal interference typical of power line hum or fan noise."}
                    {i === 2 && " Analysis exhibited elevated magnitude levels in the low-frequency region below 200 Hz, consistent with low-frequency rumble."}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="filter-selection" className="mb-16 scroll-mt-32">
          <h2 className="text-2xl font-bold mb-8">2. Filter Selection and Design Calculations</h2>
          <p className="text-muted-foreground mb-8">
            Butterworth IIR filters were selected for their maximally flat passband response. The filter order <InlineMath math="n" /> was determined by the required rolloff rate.
          </p>

          <div className="overflow-x-auto my-8 rounded-2xl border border-white/10 glass">
            <table className="w-full text-sm text-left">
              <thead className="bg-white/5 border-b border-white/5">
                <tr>
                  <th className="p-4 font-bold uppercase tracking-wider text-[10px] text-muted-foreground">Audio File</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-[10px] text-muted-foreground">Filter Type</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-[10px] text-muted-foreground">Cutoff (Hz)</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-[10px] text-muted-foreground">Norm. Freq</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-[10px] text-muted-foreground">Order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {PROJECT_DATA.audioSignals.map(s => (
                  <tr key={s.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium">{s.name}</td>
                    <td className="p-4"><Badge variant="outline">{s.filterType}</Badge></td>
                    <td className="p-4 font-mono">{s.filterParams.cutoff || `${s.filterParams.cutoffLow}-${s.filterParams.cutoffHigh}`}</td>
                    <td className="p-4 font-mono text-xs">{s.filterParams.normalizedFreq || `${s.filterParams.normalizedFreqLow}-${s.filterParams.normalizedFreqHigh}`}</td>
                    <td className="p-4 font-mono">{s.filterParams.order}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold mb-6 mt-12">Mathematical Foundations</h3>
          <div className="space-y-6">
             <div className="p-8 glass rounded-2xl border-white/5">
               <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">I. Cutoff Normalization</p>
               <BlockMath math="f_{c,norm} = \frac{f_c}{F_s / 2}" />
             </div>
             <div className="p-8 glass rounded-2xl border-white/5">
               <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">II. Filter Order vs Rolloff</p>
               <BlockMath math="\text{Rolloff} = n \times 6 \text{ dB/octave}" />
             </div>
             <div className="p-8 glass rounded-2xl border-white/5">
               <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">III. Transfer Function (S-Domain)</p>
               <BlockMath math="H(s) = \frac{\omega_c}{s + \omega_c} \quad (\text{1st Order LPF})" />
             </div>
          </div>
        </section>

        <section id="implementation" className="mb-16 scroll-mt-32">
          <h2 className="text-2xl font-bold mb-8">3. MATLAB Filter Implementation</h2>
          <p className="text-muted-foreground mb-6">
            The filters were implemented using the <code className="text-primary">butter()</code> function and verified using <code className="text-primary">freqz()</code> for frequency response analysis.
          </p>
          <CodeBlock code={butterCode} filename="filter_design.m" />
          <CodeBlock code={freqzCode} filename="response_analysis.m" />

          <div className="mt-12 p-8 glass rounded-3xl border-primary/20 bg-primary/5">
            <h4 className="text-lg font-bold mb-4">Implementation Note: Zero-Phase Filtering</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To eliminate phase distortion, <code className="text-primary">filtfilt()</code> was used. This performs forward and reverse filtering, resulting in zero-phase shift, which is critical for maintaining audio timing relationships.
            </p>
          </div>
        </section>
      </div>
      <FloatingTOC items={tocItems} />
    </div>
  );
}

import { Button } from "@/components/ui/button";
