import SectionLayout from "@/components/sections/section-layout";

const content = `
<h2 id="noise-identification-and-characterization">Noise Identification and Characterization</h2>
<p>
Following the frequency domain analysis, each audio signal was examined to identify the specific noise characteristics present. The magnitude spectrums revealed distinct noise patterns requiring different filtering approaches.
</p>

<div class="grid gap-8 my-12">
    <div class="p-8 rounded-[2.5rem] bg-card border border-border hover:border-blue-500/30 transition-all shadow-xl shadow-primary/5">
        <div class="flex items-center gap-3 mb-6">
            <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">Audio Signal 1</span>
            <span class="px-3 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-widest">High-Freq Hiss</span>
        </div>
        <p class="leading-relaxed google-sans text-muted-foreground mb-6">
            Analysis shows while the primary musical content resides in the mid-frequency range (200-4000 Hz), there exists a proportionally significant noise floor extending across frequencies <strong>above 5 kHz</strong>. The noise manifests as a broadband elevation typical of recording equipment noise or tape hiss.
        </p>
        <div class="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-xs italic google-sans">
            "The hiss extends broadly across the upper spectrum, reducing perceived clarity and masking natural decay."
        </div>
    </div>

    <div class="p-8 rounded-[2.5rem] bg-card border border-border hover:border-emerald-500/30 transition-all shadow-xl shadow-primary/5">
        <div class="flex items-center gap-3 mb-6">
            <span class="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">Audio Signal 2</span>
            <span class="px-3 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Tonal Interference</span>
        </div>
        <p class="leading-relaxed google-sans text-muted-foreground mb-6">
            Shows a prominent narrow peak at <strong>50.67 Hz</strong> with a magnitude of 0.0419. This sharp spectral feature indicate electromagnetic interference from power systems or mechanical vibration from equipment such as fans.
        </p>
        <div class="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-xs italic google-sans">
            "This discrete component can be selectively attenuated without significantly affecting adjacent musical frequencies."
        </div>
    </div>

    <div class="p-8 rounded-[2.5rem] bg-card border border-border hover:border-orange-500/30 transition-all shadow-xl shadow-primary/5">
        <div class="flex items-center gap-3 mb-6">
            <span class="px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-[10px] font-black uppercase tracking-widest border border-orange-500/20">Audio Signal 3</span>
            <span class="px-3 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Low-Freq Rumble</span>
        </div>
        <p class="leading-relaxed google-sans text-muted-foreground mb-6">
            Exhibits elevated magnitude levels in the low-frequency region <strong>below 200 Hz</strong>. Commonly referred to as rumble, originating from mechanical vibrations, structural transmission, or handling noise.
        </p>
        <div class="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 text-xs italic google-sans">
            "Rumble reduces clarity of bass instruments and creates a muddy sound quality."
        </div>
    </div>
</div>

<h3 id="summary-of-noise-characteristics">IV. Summary of Noise Characteristics</h3>
<div class="overflow-hidden rounded-2xl border border-border my-10 shadow-lg">
<table class="w-full text-left">
  <thead class="bg-muted">
    <tr>
      <th class="p-4 text-xs font-black uppercase tracking-widest border-b border-border">Audio File</th>
      <th class="p-4 text-xs font-black uppercase tracking-widest border-b border-border">Noise Type</th>
      <th class="p-4 text-xs font-black uppercase tracking-widest border-b border-border">Filtering Strategy</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-border local-inter">
    <tr class="hover:bg-primary/5 transition-colors group">
      <td class="p-4 text-sm font-bold group-hover:text-primary transition-colors">Audio 1</td>
      <td class="p-4 text-sm text-muted-foreground">Broadband high-frequency hiss</td>
      <td class="p-4 text-sm"><span class="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-widest">Low-pass filtering</span></td>
    </tr>
    <tr class="hover:bg-primary/5 transition-colors group">
      <td class="p-4 text-sm font-bold group-hover:text-primary transition-colors">Audio 2</td>
      <td class="p-4 text-sm text-muted-foreground">Narrow-band tonal interference</td>
      <td class="p-4 text-sm"><span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">Notch/Band-stop filtering</span></td>
    </tr>
    <tr class="hover:bg-primary/5 transition-colors group">
      <td class="p-4 text-sm font-bold group-hover:text-primary transition-colors">Audio 3</td>
      <td class="p-4 text-sm text-muted-foreground">Broadband low-frequency rumble</td>
      <td class="p-4 text-sm"><span class="px-2 py-0.5 rounded bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase tracking-widest">High-pass filtering</span></td>
    </tr>
  </tbody>
</table>
</div>
`;

export default function NoiseIdentificationPage() {
  return (
    <SectionLayout
      title="Noise Identification"
      subtitle="Characterizing spectral noise patterns across audio signals"
      content={content}
    />
  );
}
