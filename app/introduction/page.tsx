import SectionLayout from "@/components/sections/section-layout";

const content = `
<h2 id="background-and-context">Background and Context</h2>
<p>
In the world of consumer electronics, portable music players and smartphones are primary devices for personal audio enjoyment. Users expect high-quality playback regardless of the source file's origin. However, audio signals are frequently corrupted by various forms of background noise during recording, transmission, or storage. Common noise types include constant tonal hum (50/60 Hz electrical interference), broadband hiss (from electronic components or tape), low-frequency rumble and complex environmental sounds (chatter, wind). These unwanted components significantly degrade the listening experience, obscuring the clarity and detail of the original music.
</p>
<p>
These results in customer dissatisfaction and diminishes the intended listening experience. Addressing these audio imperfections is important to maintaining product quality and meeting consumer demand in the competitive electronics market.
</p>

<h2 id="problem-statement">Problem Statement</h2>
<blockquote>
<p>[!IMPORTANT]
A consumer electronics company has received customer complaints regarding poor audio quality and persistent background noise in some files played on its portable devices. Manually cleaning these files is not a scalable solution.
</p>
</blockquote>
<p>
There is a clear need for an automated, signal processing-based system that can analyze an audio file, identify the spectral characteristics of the embedded noise and apply a targeted filtering algorithm to suppress it while preserving the desired musical content. This project involves the development, implementation and evaluation of such a system using MATLAB while moving from theoretical concepts to a functional solution.
</p>

<h2 id="project-objectives">Project Objectives</h2>
<ul>
  <li><strong>Acquire and Analyze Audio Signals:</strong> Record music in noisy environments, import the signals into MATLAB and perform both time-domain and frequency-domain analyses to characterize the signal and identify noise components.</li>
  <li><strong>Design Digital Filters:</strong> Based on spectral analysis, design appropriate digital filters (Low-pass, High-pass, Band-stop) with calculated parameters to target specific noise frequencies.</li>
  <li><strong>Implement and Test Filters:</strong> Apply the designed filters to the noisy audio signals and implement an objective evaluation framework using standard metrics like Signal-to-Noise Ratio (SNR) and Mean Square Error (MSE).</li>
  <li><strong>Evaluate System Performance:</strong> Quantify the improvement achieved, critically assess the effectiveness and limitations of the chosen approach, and suggest potential enhancements.</li>
</ul>
<p>
This project focuses on the application of fundamental concepts covered in Signal Processing, including signal acquisition, Fourier analysis, filter design, and quantitative performance evaluation using metrics such as mean square error (MSE) and signal-to-noise ratio (SNR).
</p>
<p>
Digital Signal Processing (DSP) techniques are fundamental in audio engineering, enabling the enhancement of perceived audio quality through the selective attenuation of noise.
</p>
`;

export default function IntroductionPage() {
  return (
    <SectionLayout
      title="Introduction"
      subtitle="Background, Problem Statement and Project Objectives"
      content={content}
    />
  );
}
