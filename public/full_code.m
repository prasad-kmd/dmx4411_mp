Full MATLAB code (.m) that used for this project
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
N1 = length(audio1);
N2 = length(audio2);
N3 = length(audio3);

t1 = (0:N1-1) / Fs1;
t2 = (0:N2-1) / Fs2;
t3 = (0:N3-1) / Fs3;

% Time-Domain waveforms in one figure 
figure;
subplot(3,1,1);
plot(t1, audio1);
xlabel('Time (s)');
ylabel('Amplitude');
title('Audio Signal 1 - Time Domain');
grid on;grid("minor");

subplot(3,1,2);
plot(t2, audio2);
xlabel('Time (s)');
ylabel('Amplitude');
title('Audio Signal 2 - Time Domain');
grid on;grid("minor");

subplot(3,1,3);
plot(t3, audio3);
xlabel('Time (s)');
ylabel('Amplitude');
title('Audio Signal 3 - Time Domain');
grid on;grid("minor");

% Display Sampling Frequencies
fprintf('Sampling Frequencies:\n');
fprintf('Audio 1: Fs = %d Hz\n', Fs1);
fprintf('Audio 2: Fs = %d Hz\n', Fs2);
fprintf('Audio 3: Fs = %d Hz\n', Fs3);

% Section 02: Frequency Domain Analysis
% Compute FFT for Audio 1
Y1 = fft(audio1); % Compute FFT
P2_1 = abs(Y1/N1); % Two-sided spectrum
P1_1 = P2_1(1:N1/2+1); % Single-sided
P1_1(2:end-1) = 2*P1_1(2:end-1); % Adjust amplitude
f1 = Fs1*(0:(N1/2))/N1; % Frequency vector

% Compute FFT for Audio 2
Y2 = fft(audio2);
P2_2 = abs(Y2/N2);
P1_2 = P2_2(1:N2/2+1);
P1_2(2:end-1) = 2*P1_2(2:end-1);
f2 = Fs2*(0:(N2/2))/N2;

% Compute FFT for Audio 3
Y3 = fft(audio3);
P2_3 = abs(Y3/N3);
P1_3 = P2_3(1:N3/2+1);
P1_3(2:end-1) = 2*P1_3(2:end-1);
f3 = Fs3*(0:(N3/2))/N3;

% Identify Fundamental Frequencies
[~, idx1] = max(P1_1);
fund_freq1 = f1(idx1);

[~, idx2] = max(P1_2);
fund_freq2 = f2(idx2);

[~, idx3] = max(P1_3);
fund_freq3 = f3(idx3);

fprintf('\nFundamental Frequency Components:\n');
fprintf('Audio 1: %.2f Hz\n', fund_freq1);
fprintf('Audio 2: %.2f Hz\n', fund_freq2);
fprintf('Audio 3: %.2f Hz\n', fund_freq3);

% Plot Single-Sided Magnitude Spectrums
figure;
subplot(3,1,1);
plot(f1, P1_1);
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('Audio Signal 1 - Single-Sided Magnitude Spectrum');
grid on;grid("minor");
xlim([0 Fs1/2]);

subplot(3,1,2);
plot(f2, P1_2);
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('Audio Signal 2 - Single-Sided Magnitude Spectrum');
grid on;grid("minor");
xlim([0 Fs2/2]);

subplot(3,1,3);
plot(f3, P1_3);
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('Audio Signal 3 - Single-Sided Magnitude Spectrum');
grid on;grid("minor");
xlim([0 Fs3/2]);

% Audio 1: Analysis
fprintf('\n--- AUDIO 1 ANALYSIS ---\n');
% Calculate average magnitudes in different bands
mag_0_50 = mean(P1_1(f1 >= 10 & f1 <= 50));
mag_50_100 = mean(P1_1(f1 >= 50 & f1 <= 100));
mag_100_200 = mean(P1_1(f1 >= 100 & f1 <= 200));
mag_200_400 = mean(P1_1(f1 >= 200 & f1 <= 400));

fprintf('Average Magnitude Analysis:\n');
fprintf('  10-50 Hz:    %.6f\n', mag_0_50);
fprintf('  50-100 Hz:   %.6f\n', mag_50_100);
fprintf('  100-200 Hz:  %.6f\n', mag_100_200);
fprintf('  200-400 Hz:  %.6f\n', mag_200_400);

% Audio 3: Analysis
fprintf('\n--- AUDIO 3 ANALYSIS ---\n');
% Calculate average magnitudes in different bands
mag_1k_4k = mean(P1_3(f3 >= 1000 & f3 <= 4000));
mag_4k_8k = mean(P1_3(f3 >= 4000 & f3 <= 8000));
mag_8k_12k = mean(P1_3(f3 >= 8000 & f3 <= 12000));

fprintf('Average Magnitude Analysis:\n');
fprintf('  1-4 kHz:    %.6f\n', mag_1k_4k);
fprintf('  4-8 kHz:    %.6f\n', mag_4k_8k);
fprintf('  8-12 kHz:   %.6f\n', mag_8k_12k);

% Section 03a & 03b: Filter Design and Frequency Response
% Design Filter 1: Low-Pass for Audio 1 (Hiss Removal)
% First-order Butterworth low-pass filter
fc1 = 300;
fc1_norm = fc1 / (Fs1/2);
order1 = 1;

[b1, a1] = butter(order1, fc1_norm, 'low');

fprintf('Filter 1 (Low-Pass) designed:\n');
fprintf('  Cutoff: %d Hz, Order: %d\n', fc1, order1);

% Design Filter 2: Band-Stop for Audio 2 (Fan Noise Removal)
% Second-order Butterworth band-stop filter
fc2_center = 50.67;
fc2_bw = 8;
fc2_low = fc2_center - fc2_bw/2;
fc2_high = fc2_center + fc2_bw/2;
fc2_low_norm = fc2_low / (Fs2/2);
fc2_high_norm = fc2_high / (Fs2/2);
order2 = 2;

[b2, a2] = butter(order2, [fc2_low_norm fc2_high_norm], 'stop');

fprintf('Filter 2 (Band-Stop) designed:\n');
fprintf('  Center: %.2f Hz, Bandwidth: %d Hz, Order: %d\n', fc2_center, fc2_bw, order2);

% Design Filter 3: High-Pass for Audio 3 (Rumble Removal)
% Second-order Butterworth high-pass filter
fc3 = 1000;
fc3_norm = fc3 / (Fs3/2);
order3 = 2;

[b3, a3] = butter(order3, fc3_norm, 'high');

fprintf('Filter 3 (High-Pass) designed:\n');
fprintf('  Cutoff: %d Hz, Order: %d\n', fc3, order3);

% Plot Frequency Responses
figure;
freqz(b1, a1, 1024, Fs1);
title('Filter 1: Low-Pass Filter Frequency Response (Audio 1 - Hiss Removal)');

figure;
freqz(b2, a2, 1024, Fs2);
title('Filter 2: Band-Stop Filter Frequency Response (Audio 2 - Fan Noise Removal)');

figure;
freqz(b3, a3, 1024, Fs3);
title('Filter 3: High-Pass Filter Frequency Response (Audio 3 - Rumble Removal)');

fprintf('\nAll filters designed and frequency responses plotted.\n');

% ===== SECTION 03c: APPLY FILTERS =====
fprintf('\n--- APPLYING FILTERS ---\n');
% Apply using filtfilt for zero-phase filtering
filtered_audio1 = filtfilt(b1, a1, audio1);
filtered_audio2 = filtfilt(b2, a2, audio2);
filtered_audio3 = filtfilt(b3, a3, audio3);

fprintf('Filters applied successfully.\n');
% ===== SAVE FILTERED AUDIO FILES =====
fprintf('\nSAVING FILTERED AUDIO FILES\n');

% Normalize to prevent clipping
filtered_audio1_norm = filtered_audio1 / max(abs(filtered_audio1));
filtered_audio2_norm = filtered_audio2 / max(abs(filtered_audio2));
filtered_audio3_norm = filtered_audio3 / max(abs(filtered_audio3));

% Save files
audiowrite('filtered_Crysis3Intro_LPF.wav', filtered_audio1_norm, Fs1);
audiowrite('filtered_DreamsBenSound_BSF.wav', filtered_audio2_norm, Fs2);
audiowrite('filtered_LastSummer_HPF.wav', filtered_audio3_norm, Fs3);

% Compute FFT of Filtered Signals
% FFT of Filtered Audio 1
Y1_filt = fft(filtered_audio1);
P2_1_filt = abs(Y1_filt/N1);
P1_1_filt = P2_1_filt(1:N1/2+1);
P1_1_filt(2:end-1) = 2*P1_1_filt(2:end-1);
f1_filt = Fs1*(0:(N1/2))/N1;

% FFT of Filtered Audio 2
Y2_filt = fft(filtered_audio2);
P2_2_filt = abs(Y2_filt/N2);
P1_2_filt = P2_2_filt(1:N2/2+1);
P1_2_filt(2:end-1) = 2*P1_2_filt(2:end-1);
f2_filt = Fs2*(0:(N2/2))/N2;

% FFT of Filtered Audio 3
Y3_filt = fft(filtered_audio3);
P2_3_filt = abs(Y3_filt/N3);
P1_3_filt = P2_3_filt(1:N3/2+1);
P1_3_filt(2:end-1) = 2*P1_3_filt(2:end-1);
f3_filt = Fs3*(0:(N3/2))/N3;

fprintf('FFT computed for all filtered signals.\n');

% Figure 1: Audio 1 Comparison
figure;
subplot(2,1,1);
plot(f1, P1_1, 'LineWidth', 1.5);
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('Audio 1: Original Signal - Frequency Spectrum');
grid on;grid("minor");
% xlim([0 5000]);

subplot(2,1,2);
plot(f1_filt, P1_1_filt, 'r', 'LineWidth', 1.5);
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('Audio 1: Filtered Signal - Frequency Spectrum');
grid on;grid("minor");
% xlim([0 5000]);

sgtitle('Audio 1: Original vs Filtered Frequency Spectrum Comparison', 'FontSize', 12,
'FontWeight', 'bold');

% Figure 2: Audio 2 Comparison
figure;
subplot(2,1,1);
plot(f2, P1_2, 'LineWidth', 1.5);
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('Audio 2: Original Signal - Frequency Spectrum');
grid on;grid("minor");
% xlim([0 200]);

subplot(2,1,2);
plot(f2_filt, P1_2_filt, 'r', 'LineWidth', 1.5);
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('Audio 2: Filtered Signal - Frequency Spectrum');
grid on;grid("minor");
% xlim([0 200]);

sgtitle('Audio 2: Original vs Filtered Frequency Spectrum Comparison', 'FontSize', 12,
'FontWeight', 'bold');

% Figure 3: Audio 3 Comparison
figure;
subplot(2,1,1);
plot(f3, P1_3, 'LineWidth', 1.5);
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('Audio 3: Original Signal - Frequency Spectrum');
grid on;grid("minor");
% xlim([0 3000]);

subplot(2,1,2);
plot(f3_filt, P1_3_filt, 'r', 'LineWidth', 1.5);
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('Audio 3: Filtered Signal - Frequency Spectrum');
grid on;grid("minor");
% xlim([0 3000]);

sgtitle('Audio 3: Original vs Filtered Frequency Spectrum Comparison', 'FontSize', 12,
'FontWeight', 'bold');

% Section 03e: Display FFT Results of Filtered Signals
% Audio 1 Filtered
fprintf('\nAudio 1 (Filtered):\n');
fprintf('  Sampling Frequency: %d Hz\n', Fs1);
fprintf('  Number of Samples: %d\n', length(filtered_audio1));
fprintf('  Frequency Resolution: %.2f Hz\n', Fs1/length(filtered_audio1));
fprintf('  Max Magnitude in 0-300 Hz: %.6f\n', max(P1_1_filt(f1_filt <= 300)));
fprintf('  Max Magnitude in 300-5000 Hz: %.6f\n', max(P1_1_filt(f1_filt > 300 & f1_filt <=
5000)));

% Audio 2 Filtered
fprintf('\nAudio 2 (Filtered):\n');
fprintf('  Sampling Frequency: %d Hz\n', Fs2);
fprintf('  Number of Samples: %d\n', length(filtered_audio2));
fprintf('  Frequency Resolution: %.2f Hz\n', Fs2/length(filtered_audio2));
fprintf('  Magnitude at ~50 Hz (Original): %.6f\n', P1_2(find(f2 >= 50, 1)));
fprintf('  Magnitude at ~50 Hz (Filtered): %.6f\n', P1_2_filt(find(f2_filt >= 50, 1)));

% Audio 3 Filtered
fprintf('\nAudio 3 (Filtered):\n');
fprintf('  Sampling Frequency: %d Hz\n', Fs3);
fprintf('  Number of Samples: %d\n', length(filtered_audio3));
fprintf('  Frequency Resolution: %.2f Hz\n', Fs3/length(filtered_audio3));
fprintf('  Max Magnitude in 0-1000 Hz: %.6f\n', max(P1_3_filt(f3_filt <= 1000)));
fprintf('  Max Magnitude in 1000-5000 Hz: %.6f\n', max(P1_3_filt(f3_filt > 1000 & f3_filt <=
5000)));

% Section 03f: Audio Playback and Subjective Assessment
% Audio 1 Comparison
% fprintf('\nPlaying Audio 1 - Original (5 seconds)...\n');
% sound(audio1(1:min(Fs1*5, length(audio1))), Fs1);
% pause(6);

% fprintf('Playing Audio 1 - Filtered (5 seconds)...\n');
% sound(filtered_audio1(1:min(Fs1*5, length(filtered_audio1))), Fs1);
% pause(6);

% Audio 2 Comparison
% fprintf('\nPlaying Audio 2 - Original (5 seconds)...\n');
% sound(audio2(1:min(Fs2*5, length(audio2))), Fs2);
% pause(6);

% fprintf('Playing Audio 2 - Filtered (5 seconds)...\n');
% sound(filtered_audio2(1:min(Fs2*5, length(filtered_audio2))), Fs2);
% pause(6);

% Audio 3 Comparison
% fprintf('\nPlaying Audio 3 - Original (5 seconds)...\n');
% sound(audio3(1:min(Fs3*5, length(audio3))), Fs3);
% pause(6);

% fprintf('Playing Audio 3 - Filtered (5 seconds)...\n');
% sound(filtered_audio3(1:min(Fs3*5, length(filtered_audio3))), Fs3);
% pause(6);

% fprintf('\nAudio playback testing complete.\n');
% Audio Playback was commented to increase MATLAB running preformance,
% for external media player can be use to play original & exported filtered
% audio

% Section 04: Performance Evaluation
% Section 04a: Calculate Mean Square Error (MSE)
fprintf('\n--- Mean Square Error (MSE) Calculation ---\n');

% MSE between original (noisy) and filtered signals
MSE1 = mean((audio1 - filtered_audio1).^2);
MSE2 = mean((audio2 - filtered_audio2).^2);
MSE3 = mean((audio3 - filtered_audio3).^2);

fprintf('Audio 1 MSE: %.8f\n', MSE1);
fprintf('Audio 2 MSE: %.8f\n', MSE2);
fprintf('Audio 3 MSE: %.8f\n', MSE3);

% Section 04b: Calculate SNR Improvement using MATLAB snr() function

fprintf('\n--- Signal-to-Noise Ratio (SNR) Calculation ---\n');
% Using snr(x)
% Calculate SNR for original (noisy) signals
SNR1_original = snr(audio1);
SNR2_original = snr(audio2);
SNR3_original = snr(audio3);

fprintf('Original SNR (Noisy Signals):\n');
fprintf('  Audio 1: %.2f dB\n', SNR1_original);
fprintf('  Audio 2: %.2f dB\n', SNR2_original);
fprintf('  Audio 3: %.2f dB\n', SNR3_original);

% Calculate SNR for filtered signals
SNR1_filtered = snr(filtered_audio1);
SNR2_filtered = snr(filtered_audio2);
SNR3_filtered = snr(filtered_audio3);

fprintf('\nFiltered SNR (After Noise Removal):\n');
fprintf('  Audio 1: %.2f dB\n', SNR1_filtered);
fprintf('  Audio 2: %.2f dB\n', SNR2_filtered);
fprintf('  Audio 3: %.2f dB\n', SNR3_filtered);

% Calculate SNR improvement
SNR_improvement1 = SNR1_filtered - SNR1_original;
SNR_improvement2 = SNR2_filtered - SNR2_original;
SNR_improvement3 = SNR3_filtered - SNR3_original;

fprintf('\nSNR Improvement:\n');
fprintf('  Audio 1: %.2f dB\n', SNR_improvement1);
fprintf('  Audio 2: %.2f dB\n', SNR_improvement2);
fprintf('  Audio 3: %.2f dB\n', SNR_improvement3);

% Present Results in Table Format
fprintf('\nPERFORMANCE EVALUATION SUMMARY TABLE using snr(x) \n');

fprintf('\n%-12s %-15s %-18s %-18s %-20s\n', 'Audio File', 'MSE', 'Original SNR (dB)',
'Filtered SNR (dB)', 'SNR Improvement (dB)');
fprintf('%-12s %-15s %-18s %-18s %-20s\n', '----------', '-------------', '------------------
', '------------------', '--------------------');
fprintf('%-12s %-15.8f %-18.2f %-18.2f %-20.2f\n', 'Audio 1', MSE1, SNR1_original,
SNR1_filtered, SNR_improvement1);
fprintf('%-12s %-15.8f %-18.2f %-18.2f %-20.2f\n', 'Audio 2', MSE2, SNR2_original,
SNR2_filtered, SNR_improvement2);
fprintf('%-12s %-15.8f %-18.2f %-18.2f %-20.2f\n', 'Audio 3', MSE3, SNR3_original,
SNR3_filtered, SNR_improvement3);
fprintf('\n');
% Method: Use filtered signal as reference (clean signal)
% Calculate SNR by comparing noisy vs clean reference
% Using snr(x,y)
% Audio 1: SNR calculation
SNR1_original = snr(audio1, audio1 - filtered_audio1);  % signal, noise
SNR1_filtered = snr(filtered_audio1, audio1 - filtered_audio1);

% Audio 2: SNR calculation
SNR2_original = snr(audio2, audio2 - filtered_audio2);
SNR2_filtered = snr(filtered_audio2, audio2 - filtered_audio2);

% Audio 3: SNR calculation
SNR3_original = snr(audio3, audio3 - filtered_audio3);
SNR3_filtered = snr(filtered_audio3, audio3 - filtered_audio3);

fprintf('Original SNR (with noise):\n');
fprintf('  Audio 1: %.2f dB\n', SNR1_original);
fprintf('  Audio 2: %.2f dB\n', SNR2_original);
fprintf('  Audio 3: %.2f dB\n', SNR3_original);

fprintf('\nFiltered SNR (noise removed):\n');
fprintf('  Audio 1: %.2f dB\n', SNR1_filtered);
fprintf('  Audio 2: %.2f dB\n', SNR2_filtered);
fprintf('  Audio 3: %.2f dB\n', SNR3_filtered);

% Calculate SNR improvement
SNR_improvement1 = SNR1_filtered - SNR1_original;
SNR_improvement2 = SNR2_filtered - SNR2_original;
SNR_improvement3 = SNR3_filtered - SNR3_original;

fprintf('\nSNR Improvement:\n');
fprintf('  Audio 1: %.2f dB\n', SNR_improvement1);
fprintf('  Audio 2: %.2f dB\n', SNR_improvement2);
fprintf('  Audio 3: %.2f dB\n', SNR_improvement3);

% Present Results in Table Format
fprintf('\nPERFORMANCE EVALUATION SUMMARY TABLE using snr(x,y) \n');

fprintf('\n%-12s %-15s %-18s %-18s %-20s\n', 'Audio File', 'MSE', 'Original SNR (dB)',
'Filtered SNR (dB)', 'SNR Improvement (dB)');
fprintf('%-12s %-15s %-18s %-18s %-20s\n', '----------', '-------------', '------------------
', '------------------', '--------------------');
fprintf('%-12s %-15.8f %-18.2f %-18.2f %-20.2f\n', 'Audio 1', MSE1, SNR1_original,
SNR1_filtered, SNR_improvement1);
fprintf('%-12s %-15.8f %-18.2f %-18.2f %-20.2f\n', 'Audio 2', MSE2, SNR2_original,
SNR2_filtered, SNR_improvement2);
fprintf('%-12s %-15.8f %-18.2f %-18.2f %-20.2f\n', 'Audio 3', MSE3, SNR3_original,
SNR3_filtered, SNR_improvement3);
Published with MATLAB(r) R2024b


1 | Page