% Section 01: Signal Acquisition

% b. Load all three .wav files to MATLAB
[y1, Fs1] = audioread('../audio/wav/MP_AUDIO01.wav');
[y2, Fs2] = audioread('../audio/wav/MP_AUDIO02.wav');
[y3, Fs3] = audioread('../audio/wav/MP_AUDIO03.wav');

% c. Plot the time-domain signals of audio on one space
t1 = (0:length(y1)-1)/Fs1;
t2 = (0:length(y2)-1)/Fs2;
t3 = (0:length(y3)-1)/Fs3;

figure;
subplot(3,1,1);
plot(t1, y1);
title('Audio Signal 1');
xlabel('Time (s)');
ylabel('Amplitude');

subplot(3,1,2);
plot(t2, y2);
title('Audio Signal 2');
xlabel('Time (s)');
ylabel('Amplitude');

subplot(3,1,3);
plot(t3, y3);
title('Audio Signal 3');
xlabel('Time (s)');
ylabel('Amplitude');

% d. Display Sampling frequency of each signal.
disp(['Sampling frequency of Audio 1: ', num2str(Fs1), ' Hz']);
disp(['Sampling frequency of Audio 2: ', num2str(Fs2), ' Hz']);
disp(['Sampling frequency of Audio 3: ', num2str(Fs3), ' Hz']);
