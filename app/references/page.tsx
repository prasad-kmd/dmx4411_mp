import SectionLayout from "@/components/sections/section-layout";

const content = `
<h2 id="references">References</h2>
<ol>
  <li>Practical Introduction to Digital Filtering, MathWorks</li>
  <li>Introduction to Filter Designer, MathWorks</li>
  <li>Smoothing & Denoising, MathWorks</li>
  <li>Real-Time Audio in MATLAB, MathWorks</li>
  <li>Denoising Overview, MathWorks</li>
  <li>Audacity [Software]</li>
  <li>Crysis 3 (PC) OST by Crytek G.m.b.H [Music]</li>
  <li>Last Summer by Ikson(tm), YouTube [Music]</li>
  <li>Dreams - Chill Royalty Free Music by Bensound, YouTube [Music]</li>
  <li>MATLAB 2024b by MathWorks [Software]</li>
  <li>Signal Processing Toolbox, MathWorks</li>
</ol>
`;

export default function ReferencesPage() {
  return (
    <SectionLayout
      title="References"
      subtitle="Resources and documentation"
      content={content}
    />
  );
}
