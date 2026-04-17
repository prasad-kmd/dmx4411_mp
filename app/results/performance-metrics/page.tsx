import SectionLayout from "@/components/sections/section-layout";
import MetricsDashboard from "@/components/charts/metrics-dashboard";
import SignalComparisonMatrix from "@/components/research/signal-comparison-matrix";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

export default function PerformanceMetricsPage() {
  return (
    <SectionLayout
      title="Performance Metrics"
      subtitle="Quantitative evaluation of filter effectiveness using MSE and SNR"
    >
      <div className="space-y-12 prose prose-invert max-w-none pb-20">
        <section>
          <h2 id="mean-square-error-mse" className="font-google-sans font-bold">I. Mean Square Error (MSE)</h2>
          <p className="local-inter text-muted-foreground leading-relaxed">
            The MSE quantifies the average squared difference between the original noisy signal and the filtered signal, representing the power of the content removed.
          </p>
          <div className="not-prose math-display text-center p-8 rounded-[2rem] bg-primary/5 border border-primary/10 my-8 shadow-inner overflow-x-auto">
              <BlockMath math={"MSE = \\frac{1}{N} \\sum_{n=1}^{N} [x_{noisy}(n) - x_{filtered}(n)]^2"} />
          </div>
        </section>

        <section>
          <h2 id="signal-to-noise-ratio-snr" className="font-google-sans font-bold">II. Signal-to-Noise Ratio (SNR)</h2>
          <p className="local-inter text-muted-foreground leading-relaxed">
            SNR quantifies the ratio of signal power to noise power. Improvement was calculated as the difference between filtered and original SNR baseline.
          </p>
          <div className="not-prose math-display text-center p-8 rounded-[2rem] bg-primary/5 border border-primary/10 my-8 shadow-inner overflow-x-auto">
              <BlockMath math={"SNR = 10 \\log_{10} \\left( \\frac{P_{signal}}{P_{noise}} \\right) \\text{ dB}"} />
          </div>
        </section>

        <section>
          <h2 id="performance-visualization" className="font-google-sans font-bold">III. Performance Visualization</h2>
          <div className="not-prose mt-8">
            <MetricsDashboard />
          </div>
        </section>

        <section>
          <h2 id="results-summary" className="font-google-sans font-bold">IV. Signal Comparison Matrix</h2>
          <div className="not-prose mt-8 mb-16">
             <SignalComparisonMatrix />
          </div>

          <h2 id="tabular-summary" className="font-google-sans font-bold">V. Tabular Summary</h2>
          <div className="not-prose overflow-x-auto rounded-[2rem] border border-border my-10 shadow-xl bg-card/50">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-muted/50">
                  <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] border-b border-border">Audio File</th>
                  <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] border-b border-border text-center">MSE</th>
                  <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] border-b border-border text-center">Orig SNR</th>
                  <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] border-b border-border text-center">Filt SNR</th>
                  <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] border-b border-border text-center">Imp (dB)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 local-inter">
                <tr className="hover:bg-primary/5 transition-colors group">
                  <td className="p-5 text-sm font-bold font-google-sans">Audio 1</td>
                  <td className="p-5 text-sm text-center font-mono opacity-80 group-hover:opacity-100 transition-opacity">0.00295</td>
                  <td className="p-5 text-sm text-center font-mono opacity-80 group-hover:opacity-100 transition-opacity">-8.46</td>
                  <td className="p-5 text-sm text-center font-mono opacity-80 group-hover:opacity-100 transition-opacity">-9.15</td>
                  <td className="p-5 text-sm text-center font-mono text-red-400 font-bold">-0.69</td>
                </tr>
                <tr className="hover:bg-primary/5 transition-colors group">
                  <td className="p-5 text-sm font-bold font-google-sans">Audio 2</td>
                  <td className="p-5 text-sm text-center font-mono opacity-80 group-hover:opacity-100 transition-opacity">0.00845</td>
                  <td className="p-5 text-sm text-center font-mono opacity-80 group-hover:opacity-100 transition-opacity">-14.38</td>
                  <td className="p-5 text-sm text-center font-mono opacity-80 group-hover:opacity-100 transition-opacity">-16.23</td>
                  <td className="p-5 text-sm text-center font-mono text-red-400 font-bold">-1.85</td>
                </tr>
                <tr className="hover:bg-primary/5 transition-colors bg-primary/5 group">
                  <td className="p-5 text-sm font-bold font-google-sans text-primary">Audio 3</td>
                  <td className="p-5 text-sm text-center font-mono font-bold">0.04110</td>
                  <td className="p-5 text-sm text-center font-mono opacity-80 group-hover:opacity-100 transition-opacity">-21.73</td>
                  <td className="p-5 text-sm text-center font-mono opacity-80 group-hover:opacity-100 transition-opacity">-30.32</td>
                  <td className="p-5 text-sm text-center font-mono text-red-500 font-black">-8.59</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="not-prose p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 my-8">
              <div className="flex items-center gap-2 mb-4 text-amber-600 font-bold uppercase tracking-widest text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                  Analysis of Negative Improvement
              </div>
              <p className="text-sm local-inter leading-relaxed text-muted-foreground italic">
                {"Negative SNR improvements persistence indicate that traditional metrics have limitations when evaluating band-limiting filters. Aggressive cutoffs necessarily removed desired signal components alongside noise, which the calculation treats as signal loss despite perceptual quality improvement."}
              </p>
          </div>
        </section>
      </div>
    </SectionLayout>
  );
}
