% Section 03: Filter design and Implementation

% Load the audio files
[y1, Fs1] = audioread('../audio/wav/MP_AUDIO01.wav');
[y2, Fs2] = audioread('../audio/wav/MP_AUDIO02.wav');
[y3, Fs3] = audioread('../audio/wav/MP_AUDIO03.wav');

% a. Design appropriate filter for each noisy audio files.
% Assuming Audio 1 (Thunder) has low-frequency noise, a high-pass filter is designed.
[b1, a1] = butter(6, 100/(Fs1/2), 'high');
% Assuming Audio 2 (Autumn Walk) has high-frequency hiss, a low-pass filter is designed.
[b2, a2] = butter(6, 4000/(Fs2/2), 'low');
% Assuming Audio 3 (Data Center) has low-frequency hum, a high-pass filter is designed.
[b3, a3] = butter(6, 150/(Fs3/2), 'high');

% b. Plot frequency response of your filter designs
figure;
freqz(b1, a1, [], Fs1);
title('Frequency Response of High-Pass Filter for Audio 1');

figure;
freqz(b2, a2, [], Fs2);
title('Frequency Response of Low-Pass Filter for Audio 2');

figure;
freqz(b3, a3, [], Fs3);
title('Frequency Response of High-Pass Filter for Audio 3');

% c. Apply appropriate filter designs to each noisy signal.
filtered_y1 = filter(b1, a1, y1);
filtered_y2 = filter(b2, a2, y2);
filtered_y3 = filter(b3, a3, y3);

% d. Plot original and filtered signals' frequency spectrums
% For Audio 1
[f1_orig, P1_orig1] = get_spectrum(y1, Fs1);
[f1_filt, P1_filt1] = get_spectrum(filtered_y1, Fs1);
figure;
subplot(2,1,1);
plot(f1_orig, P1_orig1);
title('Original Spectrum of Audio 1');
xlabel('f (Hz)');
ylabel('|P1(f)|');
subplot(2,1,2);
plot(f1_filt, P1_filt1);
title('Filtered Spectrum of Audio 1');
xlabel('f (Hz)');
ylabel('|P1(f)|');

% For Audio 2
[f2_orig, P1_orig2] = get_spectrum(y2, Fs2);
[f2_filt, P1_filt2] = get_spectrum(filtered_y2, Fs2);
figure;
subplot(2,1,1);
plot(f2_orig, P1_orig2);
title('Original Spectrum of Audio 2');
xlabel('f (Hz)');
ylabel('|P1(f)|');
subplot(2,1,2);
plot(f2_filt, P1_filt2);
title('Filtered Spectrum of Audio 2');
xlabel('f (Hz)');
ylabel('|P1(f)|');

% For Audio 3
[f3_orig, P1_orig3] = get_spectrum(y3, Fs3);
[f3_filt, P1_filt3] = get_spectrum(filtered_y3, Fs3);
figure;
subplot(2,1,1);
plot(f3_orig, P1_orig3);
title('Original Spectrum of Audio 3');
xlabel('f (Hz)');
ylabel('|P1(f)|');
subplot(2,1,2);
plot(f3_filt, P1_filt3);
title('Filtered Spectrum of Audio 3');
xlabel('f (Hz)');
ylabel('|P1(f)|');

% e. Compute and display the FFT of the filtered signal
% The FFT is already computed for the plots above. We can display a summary.
disp('FFT of filtered signals has been computed for plotting.');

% f. Play the filtered audio and describe the improvement
% sound(filtered_y1, Fs1); % Uncomment to play
% sound(filtered_y2, Fs2); % Uncomment to play
% sound(filtered_y3, Fs3); % Uncomment to play
disp('Audio playback commands are included in the script.');
disp('Expected improvement for Audio 1 is the reduction of low-frequency thunder rumble.');
disp('Expected improvement for Audio 2 is the reduction of high-frequency hiss.');
disp('Expected improvement for Audio 3 is the reduction of low-frequency data center hum.');

function [f, P1] = get_spectrum(y, Fs)
    L = length(y);
    Y = fft(y);
    P2 = abs(Y/L);
    P1 = P2(1:floor(L/2)+1);
    P1(2:end-1) = 2*P1(2:end-1);
    f = Fs*(0:(L/2))/L;
end
