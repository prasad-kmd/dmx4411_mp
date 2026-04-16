import { FloatingTOC } from "@/components/floating-toc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PROJECT_DATA } from "@/lib/constants";
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import { Activity, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function ResultsPage() {
  const tocItems = [
    { id: "signal-analysis", label: "Filtered Signal Analysis" },
    { id: "quality-assessment", label: "Audio Quality Assessment" },
    { id: "performance-metrics", label: "Performance Metrics" },
  ];

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col xl:flex-row gap-12">
      <div className="max-w-4xl flex-1 prose dark:prose-invert">
        <h1 className="text-4xl font-bold mb-8">Experimental Results</h1>

        <section id="signal-analysis" className="mb-16 scroll-mt-32">
          <h2 className="text-2xl font-bold mb-6">1. Filtered Signal Analysis</h2>
          <div className="space-y-8">
            {PROJECT_DATA.audioSignals.map((s) => (
              <Card key={s.id} className="border-white/5 overflow-hidden">
                <CardHeader className="bg-white/5 border-b border-white/5">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-bold">{s.name} Frequency Spectrum Comparison</CardTitle>
                    <Badge variant="outline">{s.filterType}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center">
                         <Badge className="mb-2">Original</Badge>
                         <div className="h-24 flex items-end gap-0.5 px-4 opacity-40">
                            {Array.from({ length: 30 }).map((_, i) => (
                              <div key={i} className="flex-1 bg-muted-foreground" style={{ height: `${(Math.sin(i * 0.5) + 1) * 50}%` }} />
                            ))}
                         </div>
                      </div>
                      <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 text-center">
                         <Badge className="mb-2 bg-primary/20 text-primary border-primary/20">Filtered</Badge>
                         <div className="h-24 flex items-end gap-0.5 px-4 opacity-40">
                            {Array.from({ length: 30 }).map((_, i) => (
                              <div key={i} className="flex-1 bg-primary" style={{ height: `${(Math.cos(i * 0.3) + 1) * 30}%` }} />
                            ))}
                         </div>
                      </div>
                   </div>
                   <p className="text-sm text-muted-foreground italic">
                     Note: The above visualizations represent approximated spectral density changes. Quantitative results are detailed in Table 4.1.
                   </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="quality-assessment" className="mb-16 scroll-mt-32">
          <h2 className="text-2xl font-bold mb-6">2. Audio Quality Assessment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECT_DATA.audioSignals.map((s, i) => (
              <div key={s.id} className="p-6 glass rounded-2xl border-white/5">
                <h4 className="font-bold mb-2">{s.name}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {i === 0 && "Substantial reduction in high-frequency hiss. Improved clarity and definition."}
                  {i === 1 && "Partial effectiveness. Tonal component remains audible due to harmonic series."}
                  {i === 2 && "Significant improvement in clarity. Muddy or boomy quality eliminated."}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="performance-metrics" className="mb-16 scroll-mt-32">
          <h2 className="text-2xl font-bold mb-8">3. Quantitative Performance Metrics</h2>

          <div className="p-8 glass rounded-2xl border-white/5 mb-12">
             <h3 className="text-xl font-bold mb-4">Mean Square Error (MSE)</h3>
             <BlockMath math="MSE = \frac{1}{N} \sum_{n=1}^N [x_{noisy}(n) - x_{filtered}(n)]^2" />
             <div className="grid grid-cols-3 gap-4 mt-8">
                {PROJECT_DATA.audioSignals.map(s => (
                  <div key={s.id} className="text-center p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{s.name}</p>
                    <p className="font-mono text-sm font-bold text-primary">{s.mse}</p>
                  </div>
                ))}
             </div>
          </div>

          <div className="p-8 glass rounded-2xl border-white/5 mb-12">
             <h3 className="text-xl font-bold mb-4">Signal-to-Noise Ratio (SNR)</h3>
             <BlockMath math="SNR = 10 \log_{10}\left( \frac{P_{signal}}{P_{noise}} \right) \text{ dB}" />
             <p className="text-sm text-muted-foreground mt-4 italic">
                SNR was calculated using two methods: identified fundamental frequency power (<InlineMath math="\text{snr(signal)}" />) and filtered signal vs. noise reference (<InlineMath math="\text{snr(signal, noise)}" />).
             </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 glass">
            <table className="w-full text-[10px] text-left">
              <thead className="bg-white/5 border-b border-white/5">
                <tr>
                  <th className="p-4 font-bold uppercase tracking-wider text-muted-foreground">Audio</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-muted-foreground">MSE</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-muted-foreground">Original SNR (s)</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-muted-foreground">Filtered SNR (s)</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-muted-foreground">Imp. (s)</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-muted-foreground">Original SNR (s,n)</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-muted-foreground">Filtered SNR (s,n)</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-muted-foreground">Imp. (s,n)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {PROJECT_DATA.audioSignals.map(s => (
                  <tr key={s.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold">{s.name}</td>
                    <td className="p-4 font-mono">{s.mse.toFixed(5)}</td>
                    <td className="p-4 font-mono">{s.snrOriginalSignal}</td>
                    <td className="p-4 font-mono">{s.snrFilteredSignal}</td>
                    <td className={cn("p-4 font-mono font-bold", s.snrImprovementSignal > 0 ? "text-emerald-500" : "text-amber-500")}>
                      {s.snrImprovementSignal}
                    </td>
                    <td className="p-4 font-mono">{s.snrOriginalSignalNoise}</td>
                    <td className="p-4 font-mono">{s.snrFilteredSignalNoise}</td>
                    <td className={cn("p-4 font-mono font-bold", s.snrImprovementSignalNoise > 0 ? "text-emerald-500" : "text-amber-500")}>
                      {s.snrImprovementSignalNoise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 p-8 glass rounded-3xl border-amber-500/20 bg-amber-500/5">
            <div className="flex gap-4 items-start">
              <Info className="size-6 text-amber-500 shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-bold mb-2 text-amber-500">Note on SNR Results</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The negative SNR improvements persist across both methods. This occurs because the filters removed frequency bands containing both noise and signal. Traditional SNR metrics often fail to capture perceptual audio quality improvements for frequency-selective filters.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <FloatingTOC items={tocItems} />
    </div>
  );
}
