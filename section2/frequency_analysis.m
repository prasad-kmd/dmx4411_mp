% Section 02: Frequency Domain Analysis

% Load the audio files
[y1, Fs1] = audioread('../audio/wav/MP_AUDIO01.wav');
[y2, Fs2] = audioread('../audio/wav/MP_AUDIO02.wav');
[y3, Fs3] = audioread('../audio/wav/MP_AUDIO03.wav');

% a. Compute the Fast Fourier Transform (FFT) of each signal
fft1 = fft(y1);
fft2 = fft(y2);
fft3 = fft(y3);

% b. Identify the dominant frequency component of each signal.
[~, index1] = max(abs(fft1));
[~, index2] = max(abs(fft2));
[~, index3] = max(abs(fft3));

f1 = (index1 - 1) * Fs1 / length(fft1);
f2 = (index2 - 1) * Fs2 / length(fft2);
f3 = (index3 - 1) * Fs3 / length(fft3);

disp(['Dominant frequency of Audio 1: ', num2str(f1), ' Hz']);
disp(['Dominant frequency of Audio 2: ', num2str(f2), ' Hz']);
disp(['Dominant frequency of Audio 3: ', num2str(f3), ' Hz']);

% c. Plot the magnitude spectrums of each signal (single-sided) on one figure.
L1 = length(y1);
P2_1 = abs(fft1/L1);
P1_1 = P2_1(1:L1/2+1);
P1_1(2:end-1) = 2*P1_1(2:end-1);
f_1 = Fs1*(0:(L1/2))/L1;

L2 = length(y2);
P2_2 = abs(fft2/L2);
P1_2 = P2_2(1:L2/2+1);
P1_2(2:end-1) = 2*P1_2(2:end-1);
f_2 = Fs2*(0:(L2/2))/L2;

L3 = length(y3);
P2_3 = abs(fft3/L3);
P1_3 = P2_3(1:L3/2+1);
P1_3(2:end-1) = 2*P1_3(2:end-1);
f_3 = Fs3*(0:(L3/2))/L3;

figure;
subplot(3,1,1);
plot(f_1,P1_1);
title('Single-Sided Amplitude Spectrum of Audio 1');
xlabel('f (Hz)');
ylabel('|P1(f)|');

subplot(3,1,2);
plot(f_2,P1_2);
title('Single-Sided Amplitude Spectrum of Audio 2');
xlabel('f (Hz)');
ylabel('|P1(f)|');

subplot(3,1,3);
plot(f_3,P1_3);
title('Single-Sided Amplitude Spectrum of Audio 3');
xlabel('f (Hz)');
ylabel('|P1(f)|');
