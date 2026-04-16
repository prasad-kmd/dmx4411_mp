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
 
% Section 02: Frequency Domain Analysis 
% Compute FFT for Audio 1 
Y1 = fft(audio1); 
P2_1 = abs(Y1/N1); 
P1_1 = P2_1(1:N1/2+1); 
P1_1(2:end-1) = 2*P1_1(2:end-1); 
f1 = Fs1*(0:(N1/2))/N1; 
 
% Filter Design
% Filter 1: Low-Pass (Hiss Removal) 
fc1 = 300; fc1_norm = fc1 / (Fs1/2); 
[b1, a1] = butter(1, fc1_norm, 'low'); 
 
% Filter 2: Band-Stop (Fan Noise Removal) 
fc2_center = 50.67; fc2_bw = 8; 
[b2, a2] = butter(2, [(fc2_center-4)/(Fs2/2) (fc2_center+4)/(Fs2/2)], 'stop'); 
 
% Filter 3: High-Pass (Rumble Removal) 
fc3 = 1000; fc3_norm = fc3 / (Fs3/2); 
[b3, a3] = butter(2, fc3_norm, 'high'); 
 
% Apply filters using filtfilt for zero-phase 
filtered_audio1 = filtfilt(b1, a1, audio1); 
filtered_audio2 = filtfilt(b2, a2, audio2); 
filtered_audio3 = filtfilt(b3, a3, audio3); 
 
% Performance Evaluation: MSE 
MSE1 = mean((audio1 - filtered_audio1).^2); 
SNR1 = snr(audio1);
