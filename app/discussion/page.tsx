import SectionLayout from "@/components/sections/section-layout";

const content = `
<h2 id="effectiveness-of-designed-filters">Effectiveness of Designed Filters</h2>
<p>
The three designed filters demonstrated varying levels of effectiveness in removing their target noise components. Audio 1 showed excellent hiss removal, while Audio 2 showed partial improvement, and Audio 3 showed significant rumble reduction at the cost of some bass content.
</p>

<h2 id="limitations-of-the-approach">Limitations of the Approach</h2>
<ul>
  <li><strong>Fixed Filter Parameters:</strong> Do not adapt to variations in noise characteristics over time.</li>
  <li><strong>Trade-off:</strong> Frequency-selective filters remove both noise and desired signal in the stopband.</li>
  <li><strong>Harmonic Interference:</strong> Single notch filters do not address harmonics of the noise fundamental.</li>
  <li><strong>SNR Metric Limitations:</strong> Conventional SNR may not reflect perceptual audio quality improvement for band-limiting filters.</li>
</ul>

<h2 id="suggested-improvements">Suggested Improvements</h2>
<p>
Modern deep learning techniques (CNNs, RNNs, U-Net) could automatically learn optimal noise suppression strategies. Other improvements include adaptive filtering (LMS, RLS), spectral subtraction, and multi-band parametric equalization.
</p>
`;

export default function DiscussionPage() {
  return (
    <SectionLayout
      title="Discussion"
      subtitle="Critical analysis of findings and limitations"
      content={content}
    />
  );
}
