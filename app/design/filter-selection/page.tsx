import SectionLayout from "@/components/sections/section-layout";

const content = `
<h2 id="filter-selection-and-design-calculations">Filter Selection and Design Calculations</h2>
<p>
Based on the identified noise characteristics, appropriate Butterworth IIR filters were designed. Butterworth filters were selected for their maximally flat passband response and smooth transition characteristics.
</p>

<div class="grid gap-6 my-12">
    <!-- Filter 1 -->
    <div class="p-8 rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">
        <div class="flex items-center gap-2 mb-6">
            <div class="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20v-6M9 20v-10M6 20v-4M15 20v-12M18 20v-16"/></svg>
            </div>
            <h3 class="text-xl font-bold amoriaregular m-0">Audio 1: Low-Pass Filter</h3>
        </div>
        <p class="text-sm text-muted-foreground mb-6 leading-relaxed google-sans">A first-order filter designed to attenuate high-frequency content above 300 Hz while preserving the lower harmonics of the music.</p>
        <div class="grid grid-cols-2 gap-4 text-xs google-sans mb-8">
            <div class="p-4 rounded-xl bg-muted/50 border border-border">
                <div class="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Cutoff Freq</div>
                <div class="font-bold">300 Hz</div>
            </div>
            <div class="p-4 rounded-xl bg-muted/50 border border-border">
                <div class="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Filter Order</div>
                <div class="font-bold">1</div>
            </div>
            <div class="p-4 rounded-xl bg-muted/50 border border-border">
                <div class="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Normalized</div>
                <div class="font-bold">0.0136</div>
            </div>
            <div class="p-4 rounded-xl bg-muted/50 border border-border">
                <div class="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Rolloff</div>
                <div class="font-bold">6 dB/octave</div>
            </div>
        </div>
        <div class="math-display text-center p-4 rounded-2xl bg-primary/5 border border-primary/10">
            $$H(s) = \\frac{\\omega_c}{s + \\omega_c}$$
        </div>
    </div>

    <!-- Filter 2 -->
    <div class="p-8 rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">
        <div class="flex items-center gap-2 mb-6">
            <div class="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/></svg>
            </div>
            <h3 class="text-xl font-bold amoriaregular m-0">Audio 2: Notch Filter</h3>
        </div>
        <p class="text-sm text-muted-foreground mb-6 leading-relaxed google-sans">A second-order band-stop filter targeting the narrow tonal interference peak at 50.67 Hz.</p>
        <div class="grid grid-cols-2 gap-4 text-xs google-sans mb-8">
            <div class="p-4 rounded-xl bg-muted/50 border border-border">
                <div class="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Center Freq</div>
                <div class="font-bold">50.67 Hz</div>
            </div>
            <div class="p-4 rounded-xl bg-muted/50 border border-border">
                <div class="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Bandwidth</div>
                <div class="font-bold">8 Hz</div>
            </div>
            <div class="p-4 rounded-xl bg-muted/50 border border-border">
                <div class="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Stopband</div>
                <div class="font-bold">46.67 - 54.67 Hz</div>
            </div>
            <div class="p-4 rounded-xl bg-muted/50 border border-border">
                <div class="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Filter Order</div>
                <div class="font-bold">2</div>
            </div>
        </div>
        <div class="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-xs italic google-sans">
            "Justification: Selective removal of mains hum with minimal impact on adjacent bass frequencies."
        </div>
    </div>

    <!-- Filter 3 -->
    <div class="p-8 rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">
        <div class="flex items-center gap-2 mb-6">
            <div class="h-8 w-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20v-6M9 20v-10M6 20v-4M15 20v-12M18 20v-16"/></svg>
            </div>
            <h3 class="text-xl font-bold amoriaregular m-0">Audio 3: High-Pass Filter</h3>
        </div>
        <p class="text-sm text-muted-foreground mb-6 leading-relaxed google-sans">A second-order Butterworth filter attenuating frequencies below 1000 Hz to eliminate rumble noise.</p>
        <div class="grid grid-cols-2 gap-4 text-xs google-sans mb-8">
            <div class="p-4 rounded-xl bg-muted/50 border border-border">
                <div class="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Cutoff Freq</div>
                <div class="font-bold">1000 Hz</div>
            </div>
            <div class="p-4 rounded-xl bg-muted/50 border border-border">
                <div class="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Normalized</div>
                <div class="font-bold">0.0454</div>
            </div>
            <div class="p-4 rounded-xl bg-muted/50 border border-border">
                <div class="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Filter Order</div>
                <div class="font-bold">2</div>
            </div>
            <div class="p-4 rounded-xl bg-muted/50 border border-border">
                <div class="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Rolloff</div>
                <div class="font-bold">12 dB/octave</div>
            </div>
        </div>
    </div>
</div>

<h3 id="summary-of-filter-design-parameters">IV. Summary of Filter Design Parameters</h3>
<div class="overflow-hidden rounded-2xl border border-border my-10 shadow-lg">
<table class="w-full text-left">
  <thead class="bg-muted">
    <tr>
      <th class="p-4 text-xs font-black uppercase tracking-widest border-b border-border">Audio File</th>
      <th class="p-4 text-xs font-black uppercase tracking-widest border-b border-border">Filter Type</th>
      <th class="p-4 text-xs font-black uppercase tracking-widest border-b border-border">Cutoff (Hz)</th>
      <th class="p-4 text-xs font-black uppercase tracking-widest border-b border-border">Order</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-border local-inter">
    <tr class="hover:bg-primary/5 transition-colors">
      <td class="p-4 text-sm font-bold">Audio 1</td>
      <td class="p-4 text-sm text-muted-foreground">Low-Pass</td>
      <td class="p-4 text-sm">300 Hz</td>
      <td class="p-4 text-sm">1</td>
    </tr>
    <tr class="hover:bg-primary/5 transition-colors">
      <td class="p-4 text-sm font-bold">Audio 2</td>
      <td class="p-4 text-sm text-muted-foreground">Band-Stop/Notch</td>
      <td class="p-4 text-sm">50.67 Hz</td>
      <td class="p-4 text-sm">2</td>
    </tr>
    <tr class="hover:bg-primary/5 transition-colors">
      <td class="p-4 text-sm font-bold">Audio 3</td>
      <td class="p-4 text-sm text-muted-foreground">High-Pass</td>
      <td class="p-4 text-sm">1000 Hz</td>
      <td class="p-4 text-sm">2</td>
    </tr>
  </tbody>
</table>
</div>
`;

export default function FilterSelectionPage() {
  return (
    <SectionLayout
      title="Filter Selection"
      subtitle="Mathematical design parameters and filter justifications"
      content={content}
    />
  );
}
