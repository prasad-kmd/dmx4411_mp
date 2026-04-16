import SectionLayout from "@/components/sections/section-layout";

const content = `
<h2 id="noise-identification-and-characterization">Noise Identification and Characterization</h2>
<p>
Following the frequency domain analysis, each audio signal was examined to identify the specific noise characteristics present. The magnitude spectrums revealed distinct noise patterns requiring different filtering approaches.
</p>

<h3 id="audio-signal-1-analysis">I. Audio Signal 1 Analysis</h3>
<p>
Analysis shows while the primary musical content resides in the mid-frequency range (200-4000 Hz), there exists a proportionally significant noise floor extending across frequencies above 5 kHz. The noise manifests as a broadband elevation characteristic of high-frequency hiss.
</p>

<h3 id="audio-signal-2-analysis">II. Audio Signal 2 Analysis</h3>
<p>
Shows a prominent narrow peak at 50.67 Hz. This sharp spectral feature indicates the presence of tonal interference, suggesting possible electromagnetic interference from power systems or mechanical vibration from rotating equipment.
</p>

<h3 id="audio-signal-3-analysis">III. Audio Signal 3 Analysis</h3>
<p>
Exhibits elevated magnitude levels in the low-frequency region below 200 Hz. Commonly referred to as rumble, originating from mechanical vibrations, structural transmission, or handling noise.
</p>

<h3 id="summary-of-noise-characteristics">IV. Summary of Noise Characteristics</h3>
<table>
  <thead>
    <tr>
      <th>Audio File</th>
      <th>Noise Type</th>
      <th>Filtering Strategy</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Audio 1</td>
      <td>Broadband high-frequency hiss</td>
      <td>Low-pass filtering</td>
    </tr>
    <tr>
      <td>Audio 2</td>
      <td>Narrow-band tonal interference</td>
      <td>Notch/Band-stop filtering</td>
    </tr>
    <tr>
      <td>Audio 3</td>
      <td>Broadband low-frequency rumble</td>
      <td>High-pass filtering</td>
    </tr>
  </tbody>
</table>
`;

export default function NoiseIdentificationPage() {
  return (
    <SectionLayout
      title="Noise Identification"
      subtitle="Characterizing spectral noise patterns"
      content={content}
    />
  );
}
