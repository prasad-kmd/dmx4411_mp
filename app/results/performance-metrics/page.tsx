import SectionLayout from "@/components/sections/section-layout";

const content = `
<h2 id="mean-square-error-mse">I. Mean Square Error (MSE)</h2>
<p>
The MSE quantifies the average squared difference between the original noisy signal and the filtered signal.
</p>
<div class="math-display">
$$MSE = \\frac{1}{N} \\sum_{n=1}^{N} [x_{noisy}(n) - x_{filtered}(n)]^2$$
</div>
<ul>
  <li>Audio 1: <strong>0.00295201</strong></li>
  <li>Audio 2: <strong>0.00845865</strong></li>
  <li>Audio 3: <strong>0.04110691</strong></li>
</ul>

<h2 id="signal-to-noise-ratio-snr">II. Signal-to-Noise Ratio (SNR)</h2>
<div class="math-display">
$$SNR = 10 \\log_{10} \\left( \\frac{P_{signal}}{P_{noise}} \\right) \\text{ dB}$$
</div>

<h2 id="results-summary">III. Results Summary</h2>
<table>
  <thead>
    <tr>
      <th>Audio File</th>
      <th>MSE</th>
      <th>Original SNR (dB)</th>
      <th>Filtered SNR (dB)</th>
      <th>Improvement (dB)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Audio 1</td>
      <td>0.00295</td>
      <td>-8.46</td>
      <td>-9.15</td>
      <td>-0.69</td>
    </tr>
    <tr>
      <td>Audio 2</td>
      <td>0.00845</td>
      <td>-14.38</td>
      <td>-16.23</td>
      <td>-1.85</td>
    </tr>
    <tr>
      <td>Audio 3</td>
      <td>0.04110</td>
      <td>-21.73</td>
      <td>-30.32</td>
      <td>-8.59</td>
    </tr>
  </tbody>
</table>
<p>
Negative SNR improvements indicate that the filters removed frequency bands containing both noise and signal content, which the SNR calculation treats as signal loss.
</p>
`;

export default function PerformanceMetricsPage() {
  return (
    <SectionLayout
      title="Performance Metrics"
      subtitle="Quantitative evaluation of filter effectiveness"
      content={content}
    />
  );
}
