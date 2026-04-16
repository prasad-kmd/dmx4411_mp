import SectionLayout from "@/components/sections/section-layout";

const content = `
<h2 id="matlab-filter-design">MATLAB Filter Design</h2>
<p>
The three IIR filters were implemented in MATLAB using the <code>butter()</code> function, which generates the numerator and denominator coefficients of the transfer function based on specified filter order, normalized cutoff frequencies and filter type.
</p>

<pre><code class="language-matlab">
% Design Filter 1: Low-Pass for Audio 1 (Hiss Removal)
fc1 = 300; fc1_norm = fc1 / (Fs1/2); order1 = 1;
[b1, a1] = butter(order1, fc1_norm, 'low');

% Design Filter 2: Band-Stop for Audio 2 (Fan Noise Removal)
fc2_center = 50.67; fc2_bw = 8; order2 = 2;
fc2_low = fc2_center - fc2_bw/2; fc2_high = fc2_center + fc2_bw/2;
fc2_low_norm = fc2_low / (Fs2/2); fc2_high_norm = fc2_high / (Fs2/2);
[b2, a2] = butter(order2, [fc2_low_norm fc2_high_norm], 'stop');
</code></pre>

<h2 id="filter-application">Filter Application</h2>
<p>
The designed filters were applied using the <code>filtfilt()</code> function to achieve zero-phase filtering, preserving temporal relationships while removing noise.
</p>

<pre><code class="language-matlab">
% Apply using filtfilt for zero-phase filtering
filtered_audio1 = filtfilt(b1, a1, audio1);
filtered_audio2 = filtfilt(b2, a2, audio2);
filtered_audio3 = filtfilt(b3, a3, audio3);
</code></pre>

<h2 id="normalization-and-export">Normalization and Export</h2>
<p>
To prevent digital clipping, each filtered signal was normalized to the range [-1, 1] before being exported as a .wav file.
</p>

<pre><code class="language-matlab">
% Normalize to prevent clipping
filtered_audio1_norm = filtered_audio1 / max(abs(filtered_audio1));
audiowrite('filtered_Audio1_LPF.wav', filtered_audio1_norm, Fs1);
</code></pre>
`;

export default function FilterImplementationPage() {
  return (
    <SectionLayout
      title="Filter Implementation"
      subtitle="MATLAB implementation and audio export"
      content={content}
    />
  );
}
