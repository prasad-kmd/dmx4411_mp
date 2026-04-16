import SectionLayout from "@/components/sections/section-layout";

const content = `
<h2 id="project-summary">Project Summary</h2>
<p>
This project successfully developed and implemented a signal processing system for analyzing and removing noise from audio recordings using frequency-selective digital filters.
</p>

<h2 id="key-findings">Key Findings</h2>
<ul>
  <li><strong>Successful Noise Removal:</strong> Audio 1 and Audio 3 showed substantial improvement in perceptual audio quality.</li>
  <li><strong>Partial Effectiveness:</strong> Audio 2 highlighted the challenges of removing persistent tonal components.</li>
  <li><strong>SNR Metric Limitations:</strong> Objective metrics yielded negative improvements due to harmonic signal loss, despite subjective gains.</li>
</ul>

<h2 id="technical-accomplishments">Technical Accomplishments</h2>
<ul>
  <li>Time and frequency-domain signal analysis using FFT.</li>
  <li>Digital filter design using Butterworth approximation.</li>
  <li>Zero-phase filtering implementation using <code>filtfilt()</code>.</li>
  <li>Performance evaluation using multiple metrics (MSE, SNR).</li>
</ul>

<h2 id="final-remarks">Final Remarks</h2>
<p>
The project achieved its core objectives: demonstrating signal processing fundamentals, designing and implementing digital filters, and evaluating performance through multiple metrics.
</p>
`;

export default function ConclusionPage() {
  return (
    <SectionLayout
      title="Conclusion"
      subtitle="Final project summary and findings"
      content={content}
    />
  );
}
