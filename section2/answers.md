# Section 2: Frequency Domain Analysis

## a. Compute the Fast Fourier Transform (FFT) of each signal

The `frequency_analysis.m` script computes the FFT of each signal using the `fft()` function.

## b. Identify the dominant frequency component of each signal.

The script identifies the dominant frequency by finding the maximum value in the FFT output. This is a simplification and may not represent the true fundamental frequency of the music, but it gives an indication of the most prominent frequency component. The dominant frequencies are printed to the console.

## c. Plot the magnitude spectrums of each signal (single-sided) on one figure.

The script plots the single-sided magnitude spectrums of the three audio signals in a single figure with three subplots.
