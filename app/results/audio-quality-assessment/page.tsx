import SectionLayout from "@/components/sections/section-layout";

const content = `
<h2 id="hiss-removal-assessment">I. Audio 1: Hiss Removal Assessment</h2>
<p>
The filtered version demonstrates substantial reduction in high-frequency hiss. The background noise floor appears lower, resulting in improved clarity and definition of the audio content.
</p>

<h2 id="tonal-interference-assessment">II. Audio 2: Tonal Interference Assessment</h2>
<p>
Shows partial effectiveness. While some attenuation of the low-frequency drone or fan is perceptible, the tonal component remains audible in the filtered output.
</p>

<h2 id="rumble-removal-assessment">III. Audio 3: Rumble Removal Assessment</h2>
<p>
Significant improvement in audio clarity through effective removal of low-frequency rumble. The muddy quality has been eliminated, resulting in cleaner and more defined audio.
</p>
`;

export default function AudioQualityAssessmentPage() {
  return (
    <SectionLayout
      title="Quality Assessment"
      subtitle="Subjective listening evaluation results"
      content={content}
    />
  );
}
