import SectionLayout from "@/components/sections/section-layout";

const content = `
<h2 id="signal-acquisition">Signal Acquisition</h2>
<p>
Three music clips, each approximately one minute in duration, were recorded in distinct noisy environments to ensure a variety of noise types were captured. These initial recordings were saved in the compressed .mp3 format. As required for stable and uncompressed signal processing, these files were converted to the Waveform Audio File Format (.wav) using the open-source audio editor, Audacity.
</p>
<p>
This conversion ensures that all analysis is performed on uncompressed linear Pulse Code Modulation (PCM) data. This conversion was necessary to preserve signal fidelity and avoid artifacts introduced by lossy compression, which could interfere with subsequent frequency domain analysis.
</p>

<h2 id="matlab-implementation">MATLAB Implementation</h2>
<p>
The converted .wav files were loaded into the MATLAB for initial processing and visualization. The audio signals are loaded using the <code>audioread()</code> function, which returns the audio signal data and its corresponding sampling frequency (Fs).
</p>

<pre><code class="language-matlab">
% Load audio files
[audio1, Fs1] = audioread('../audio/wav/Crysis3Intro.wav');
[audio2, Fs2] = audioread('../audio/wav/DreamsBenSound.wav');
[audio3, Fs3] = audioread('../audio/wav/LastSummer.wav');
</code></pre>

<h3 id="time-domain-analysis">I. Time Domain Analysis</h3>
<p>
The time-domain waveforms of all three audio signals were visualized using MATLAB's <code>subplot()</code> function to display them in a single figure for comparative analysis.
</p>
<p>
This time domain analysis shows that these three audio files are stereo which have two audio channels. To enhance the performance, we can use mono audio by taking mean values of those two channels.
</p>

<pre><code class="language-matlab">
% Convert stereo to mono if necessary
if size(audio1, 2) == 2, audio1 = mean(audio1, 2); end
if size(audio2, 2) == 2, audio2 = mean(audio2, 2); end
if size(audio3, 2) == 2, audio3 = mean(audio3, 2); end
</code></pre>

<p>
Sampling frequencies of audio files are same which was 44.1kHz and it is always equal to the "Sample Rate" that we are chosen when we export the audio file as .wav file.
</p>

<h3 id="frequency-domain-analysis">II. Frequency Domain Analysis</h3>
<p>
To identify noise components in the audio signals, frequency domain analysis was performed using the Fast Fourier Transform (FFT). The FFT converts time-domain signals into their frequency-domain representation, revealing the magnitude and distribution of frequency components present in each signal.
</p>

<p>
For a discrete signal $x(n)$ of length $N$, the FFT is computed as:
</p>
<div class="math-display">
$$X(k) = \\sum_{n=0}^{N-1} x(n) e^{-j\\frac{2\\pi kn}{N}}$$
</div>
<p>
where $k$ represents the frequency bin index.
</p>

<pre><code class="language-matlab">
% Compute FFT for Audio 1
Y1 = fft(audio1); % Compute FFT
P2_1 = abs(Y1/N1); % Two-sided spectrum
P1_1 = P2_1(1:N1/2+1); % Single-sided
P1_1(2:end-1) = 2*P1_1(2:end-1); % Adjust amplitude
f1 = Fs1*(0:(N1/2))/N1; % Frequency vector
</code></pre>

<p>
The single-sided magnitude spectrum was calculated to focus on positive frequencies, as audio signals are real-valued and symmetric in the frequency domain. This visualization revealed distinct noise profiles:
</p>

<ul>
  <li><strong>Audio Signal 1:</strong> Wide range of frequencies, characteristic of broadband hiss noise.</li>
  <li><strong>Audio Signal 2:</strong> Sharp peak at 50.67 Hz (mains hum).</li>
  <li><strong>Audio Signal 3:</strong> Elevated magnitudes at lower frequencies, indicating rumble noise.</li>
</ul>

<p>
The fundamental frequency component of each signal was identified as the frequency bin with the maximum magnitude in the spectrum:
</p>
<ul>
  <li>Audio 01: <strong>439.83 Hz</strong></li>
  <li>Audio 02: <strong>50.67 Hz</strong></li>
  <li>Audio 03: <strong>42.20 Hz</strong></li>
</ul>
`;

export default function MethodologyPage() {
  return (
    <SectionLayout
      title="Methodology"
      subtitle="Signal Acquisition and MATLAB Implementation"
      content={content}
    />
  );
}
