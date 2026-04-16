import SectionLayout from "@/components/sections/section-layout";

const content = `
<h2 id="matlab-source-code">Full MATLAB Source Code</h2>
<p>
The following MATLAB code was used for all signal processing, filter design, and performance evaluation tasks in this project.
</p>

<pre><code class="language-matlab">
% Clear workspace
clear; clc; close all;

% Load audio files
[audio1, Fs1] = audioread('../audio/wav/Crysis3Intro.wav');
[audio2, Fs2] = audioread('../audio/wav/DreamsBenSound.wav');
[audio3, Fs3] = audioread('../audio/wav/LastSummer.wav');

% Convert stereo to mono if necessary
if size(audio1, 2) == 2, audio1 = mean(audio1, 2); end
if size(audio2, 2) == 2, audio2 = mean(audio2, 2); end
if size(audio3, 2) == 2, audio3 = mean(audio3, 2); end

% Create Time Vectors
N1 = length(audio1); N2 = length(audio2); N3 = length(audio3);
t1 = (0:N1-1) / Fs1; t2 = (0:N2-1) / Fs2; t3 = (0:N3-1) / Fs3;

% Design Filter 1: Low-Pass for Audio 1 (Hiss Removal)
fc1 = 300; fc1_norm = fc1 / (Fs1/2); order1 = 1;
[b1, a1] = butter(order1, fc1_norm, 'low');

% Design Filter 2: Band-Stop for Audio 2 (Fan Noise Removal)
fc2_center = 50.67; fc2_bw = 8;
fc2_low = fc2_center - fc2_bw/2; fc2_high = fc2_center + fc2_bw/2;
[b2, a2] = butter(2, [fc2_low/(Fs2/2) fc2_high/(Fs2/2)], 'stop');

% Design Filter 3: High-Pass for Audio 3 (Rumble Removal)
fc3 = 1000; fc3_norm = fc3 / (Fs3/2); order3 = 2;
[b3, a3] = butter(order3, fc3_norm, 'high');

% Apply filters
filtered_audio1 = filtfilt(b1, a1, audio1);
filtered_audio2 = filtfilt(b2, a2, audio2);
filtered_audio3 = filtfilt(b3, a3, audio3);

% Normalize and Save
audiowrite('filtered_Audio1.wav', filtered_audio1/max(abs(filtered_audio1)), Fs1);
audiowrite('filtered_Audio2.wav', filtered_audio2/max(abs(filtered_audio2)), Fs2);
audiowrite('filtered_Audio3.wav', filtered_audio3/max(abs(filtered_audio3)), Fs3);
</code></pre>
`;

export default function AppendixPage() {
  return (
    <SectionLayout
      title="Appendix"
      subtitle="Complete MATLAB source code"
      content={content}
    />
  );
}
