import SectionLayout from "@/components/sections/section-layout";
import FilterResponseChart from "@/components/charts/filter-response-chart";
import FilterExplorer from "@/components/charts/filter-explorer";
import { PROJECT_DATA } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Filter Selection",
  description: "Mathematical design parameters and filter justifications.",
  openGraph: {
    title: "Filter Selection & Design | DSP Research",
    description: "Detailed parameters for Low-Pass, High-Pass, and Notch filters.",
    images: [`/api/og?title=${encodeURIComponent("Filter Selection")}&description=${encodeURIComponent("Mathematical design and filter justifications.")}&type=research`],
  },
};

export default function FilterSelectionPage() {
  const [audio1, audio2, audio3] = PROJECT_DATA.audioSignals;

  return (
    <SectionLayout
      title="Filter Selection"
      subtitle="Mathematical design parameters and filter justifications"
    >
      <div className="space-y-12 prose prose-invert max-w-none pb-20">
        <section>
          <h2 id="filter-selection-and-design-calculations" className="font-google-sans font-bold">Filter Selection and Design Calculations</h2>
          <p className="local-inter text-muted-foreground leading-relaxed">
            Based on the identified noise characteristics, appropriate Butterworth IIR filters were designed. Butterworth filters were selected for their maximally flat passband response and smooth transition characteristics.
          </p>
        </section>

        <div className="not-prose grid gap-12 my-12">
            {/* Filter 1 */}
            <div className="space-y-6">
                <div className="p-8 rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M9 20v-10M6 20v-4M15 20v-12M18 20v-16"/></svg>
                        </div>
                        <h3 className="text-xl font-bold font-google-sans m-0">Audio 1: Low-Pass Filter</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed local-inter">A first-order filter designed to attenuate high-frequency content above 300 Hz while preserving the lower harmonics of the music.</p>
                    <div className="grid grid-cols-2 gap-4 text-xs local-inter mb-8">
                        <div className="p-4 rounded-xl bg-muted/50 border border-border">
                            <div className="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Cutoff Freq</div>
                            <div className="font-bold">300 Hz</div>
                        </div>
                        <div className="p-4 rounded-xl bg-muted/50 border border-border">
                            <div className="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Filter Order</div>
                            <div className="font-bold">1</div>
                        </div>
                        <div className="p-4 rounded-xl bg-muted/50 border border-border">
                            <div className="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Normalized</div>
                            <div className="font-bold">0.0136</div>
                        </div>
                        <div className="p-4 rounded-xl bg-muted/50 border border-border">
                            <div className="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Rolloff</div>
                            <div className="font-bold">6 dB/octave</div>
                        </div>
                    </div>
                </div>
                <FilterResponseChart
                  filterType="Low-Pass"
                  order={audio1.filterParams.order}
                  cutoffFreq={audio1.filterParams.cutoff}
                />
            </div>

            {/* Filter 2 */}
            <div className="space-y-6">
                <div className="p-8 rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/></svg>
                        </div>
                        <h3 className="text-xl font-bold font-google-sans m-0">Audio 2: Notch Filter</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed local-inter">A second-order band-stop filter targeting the narrow tonal interference peak at 50.67 Hz.</p>
                    <div className="grid grid-cols-2 gap-4 text-xs local-inter mb-8">
                        <div className="p-4 rounded-xl bg-muted/50 border border-border">
                            <div className="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Center Freq</div>
                            <div className="font-bold">50.67 Hz</div>
                        </div>
                        <div className="p-4 rounded-xl bg-muted/50 border border-border">
                            <div className="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Bandwidth</div>
                            <div className="font-bold">8 Hz</div>
                        </div>
                        <div className="p-4 rounded-xl bg-muted/50 border border-border">
                            <div className="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Stopband</div>
                            <div className="font-bold">46.67 - 54.67 Hz</div>
                        </div>
                        <div className="p-4 rounded-xl bg-muted/50 border border-border">
                            <div className="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Filter Order</div>
                            <div className="font-bold">2</div>
                        </div>
                    </div>
                </div>
                <FilterResponseChart
                  filterType="Band-Stop/Notch"
                  order={audio2.filterParams.order}
                  centerFreq={audio2.filterParams.centerFreq}
                  lowCutoff={audio2.filterParams.lowCutoff}
                  highCutoff={audio2.filterParams.highCutoff}
                  bandwidth={audio2.filterParams.bandwidth}
                />
            </div>

            {/* Filter 3 */}
            <div className="space-y-6">
                <div className="p-8 rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-8 w-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M9 20v-10M6 20v-4M15 20v-12M18 20v-16"/></svg>
                        </div>
                        <h3 className="text-xl font-bold font-google-sans m-0">Audio 3: High-Pass Filter</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed local-inter">A second-order Butterworth filter attenuating frequencies below 1000 Hz to eliminate rumble noise.</p>
                    <div className="grid grid-cols-2 gap-4 text-xs local-inter mb-8">
                        <div className="p-4 rounded-xl bg-muted/50 border border-border">
                            <div className="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Cutoff Freq</div>
                            <div className="font-bold">1000 Hz</div>
                        </div>
                        <div className="p-4 rounded-xl bg-muted/50 border border-border">
                            <div className="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Normalized</div>
                            <div className="font-bold">0.0454</div>
                        </div>
                        <div className="p-4 rounded-xl bg-muted/50 border border-border">
                            <div className="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Filter Order</div>
                            <div className="font-bold">2</div>
                        </div>
                        <div className="p-4 rounded-xl bg-muted/50 border border-border">
                            <div className="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Rolloff</div>
                            <div className="font-bold">12 dB/octave</div>
                        </div>
                    </div>
                </div>
                <FilterResponseChart
                  filterType="High-Pass"
                  order={audio3.filterParams.order}
                  cutoffFreq={audio3.filterParams.cutoff}
                />
            </div>
        </div>

        <section>
          <h2 id="interactive-explorer" className="font-google-sans font-bold">IV. Interactive Filter Explorer</h2>
          <p className="local-inter text-muted-foreground leading-relaxed">
            The following laboratory tool allows for the real-time adjustment of filter parameters to observe the impact on the frequency response curve.
          </p>
          <div className="not-prose mt-8">
            <FilterExplorer />
          </div>
        </section>

        <section>
          <h2 id="summary-of-filter-design-parameters" className="font-google-sans font-bold">V. Summary of Filter Design Parameters</h2>
          <div className="not-prose overflow-hidden rounded-2xl border border-border my-10 shadow-lg">
            <table className="w-full text-left">
              <thead className="bg-muted">
                <tr>
                  <th className="p-4 text-xs font-black uppercase tracking-widest border-b border-border">Audio File</th>
                  <th className="p-4 text-xs font-black uppercase tracking-widest border-b border-border">Filter Type</th>
                  <th className="p-4 text-xs font-black uppercase tracking-widest border-b border-border">Cutoff (Hz)</th>
                  <th className="p-4 text-xs font-black uppercase tracking-widest border-b border-border">Order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border local-inter">
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="p-4 text-sm font-bold">Audio 1</td>
                  <td className="p-4 text-sm text-muted-foreground">Low-Pass</td>
                  <td className="p-4 text-sm">300 Hz</td>
                  <td className="p-4 text-sm">1</td>
                </tr>
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="p-4 text-sm font-bold">Audio 2</td>
                  <td className="p-4 text-sm text-muted-foreground">Band-Stop/Notch</td>
                  <td className="p-4 text-sm">50.67 Hz</td>
                  <td className="p-4 text-sm">2</td>
                </tr>
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="p-4 text-sm font-bold">Audio 3</td>
                  <td className="p-4 text-sm text-muted-foreground">High-Pass</td>
                  <td className="p-4 text-sm">1000 Hz</td>
                  <td className="p-4 text-sm">2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </SectionLayout>
  );
}
