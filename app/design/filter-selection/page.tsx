import SectionLayout from "@/components/sections/section-layout";

const content = `
<h2 id="filter-selection-and-design-calculations">Filter Selection and Design Calculations</h2>
<p>
Based on the identified noise characteristics, appropriate Butterworth IIR filters were designed. Butterworth filters were selected for their maximally flat passband response.
</p>

<h3 id="audio-1-low-pass-filter-design">I. Audio 1: Low-Pass Filter Design</h3>
<p>
A low-pass filter was selected to attenuate high-frequency content above 300 Hz.
</p>
<ul>
  <li>Cutoff Frequency ($f_{c1}$): 300 Hz</li>
  <li>Normalized Frequency: 0.0136</li>
  <li>Filter Order ($n_1$): 1</li>
  <li>Rolloff: 6 dB/octave</li>
</ul>
<div class="math-display">
$$H(s) = \\frac{\\omega_c}{s + \\omega_c}$$
</div>

<h3 id="audio-2-notch-filter-design">II. Audio 2: Notch Filter Design</h3>
<p>
A notch filter was selected to selectively attenuate the 50.67 Hz tonal interference.
</p>
<ul>
  <li>Center Frequency ($f_0$): 50.67 Hz</li>
  <li>Bandwidth ($BW$): 8 Hz</li>
  <li>Cutoff Frequencies: 46.67 Hz - 54.67 Hz</li>
  <li>Filter Order ($n_2$): 2</li>
</ul>

<h3 id="audio-3-high-pass-filter-design">III. Audio 3: High-Pass Filter Design</h3>
<p>
A high-pass filter was selected to attenuate frequencies below 1000 Hz.
</p>
<ul>
  <li>Cutoff Frequency ($f_{c3}$): 1000 Hz</li>
  <li>Normalized Frequency: 0.0454</li>
  <li>Filter Order ($n_3$): 2</li>
  <li>Rolloff: 12 dB/octave</li>
</ul>

<h3 id="summary-of-filter-design-parameters">IV. Summary of Filter Design Parameters</h3>
<table>
  <thead>
    <tr>
      <th>Audio File</th>
      <th>Filter Type</th>
      <th>Cutoff Frequency</th>
      <th>Order</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Audio 1</td>
      <td>Low-Pass</td>
      <td>300 Hz</td>
      <td>1</td>
    </tr>
    <tr>
      <td>Audio 2</td>
      <td>Band-Stop/Notch</td>
      <td>50.67 Hz</td>
      <td>2</td>
    </tr>
    <tr>
      <td>Audio 3</td>
      <td>High-Pass</td>
      <td>1000 Hz</td>
      <td>2</td>
    </tr>
  </tbody>
</table>
`;

export default function FilterSelectionPage() {
  return (
    <SectionLayout
      title="Filter Selection"
      subtitle="Mathematical design parameters"
      content={content}
    />
  );
}
