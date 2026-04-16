import SectionLayout from "@/components/sections/section-layout";

const content = `
<h2 id="high-frequency-hiss-removal">I. Audio 1: High-Frequency Hiss Removal</h2>
<p>
Clear reduction in high-frequency content visible above the 300 Hz cutoff frequency. The magnitude of frequency components above 1000 Hz has been substantially attenuated, demonstrating effective removal of the hiss noise.
</p>

<h2 id="tonal-interference-removal">II. Audio 2: Tonal Interference Removal</h2>
<p>
Demonstrates almost successful attenuation of the 50.67 Hz peak. This selective attenuation confirms the effectiveness of the band-stop filter in removing the tonal interference without degrading adjacent frequency content.
</p>

<h2 id="low-frequency-rumble-removal">III. Audio 3: Low-Frequency Rumble Removal</h2>
<p>
Substantial attenuation of low-frequency content below the 1000 Hz cutoff. The magnitude of frequency components below 500 Hz has been dramatically reduced, effectively removing the rumble noise.
</p>
`;

export default function FilteredSignalAnalysisPage() {
  return (
    <SectionLayout
      title="Signal Analysis"
      subtitle="Comparing original and filtered frequency spectrums"
      content={content}
    />
  );
}
