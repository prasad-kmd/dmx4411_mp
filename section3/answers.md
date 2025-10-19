# Section 3: Filter Design and Implementation

## a. Design appropriate filter for each noisy audio files by identifying cut-off frequencies. Provide all calculations and justifications for filter selection.

The `filter_design.m` script designs filters for each audio file. The filter design is based on the frequency spectrum analysis from Section 2.

*   **Audio 1 (Thunder):** The frequency spectrum of this audio file shows a significant amount of low-frequency noise below 100 Hz, which corresponds to the thunder rumble. To remove this noise, a high-pass Butterworth filter is designed with a cutoff frequency of 100 Hz.
*   **Audio 2 (Autumn Walk):** The frequency spectrum of this audio file shows high-frequency noise above 4000 Hz, which corresponds to a hissing sound. To remove this noise, a low-pass Butterworth filter is designed with a cutoff frequency of 4000 Hz.
*   **Audio 3 (Data Center):** The frequency spectrum of this audio file shows a low-frequency hum around 150 Hz. To remove this noise, a high-pass Butterworth filter is designed with a cutoff frequency of 150 Hz.

## b. Plot frequency response of your filter designs

The script plots the frequency response of each filter design using the `freqz()` function.

## c. Apply appropriate filter designs to each noisy signal.

The script applies the designed filters to the noisy signals using the `filter()` function.

## d. Plot following signals in same space and use separate figures for each three signal samples.

The script generates plots showing the frequency spectrum of the original and filtered signals for each of the three audio samples.

## e. Compute and display the FFT of the filtered signal

The FFT of the filtered signal is computed and displayed as part of the plots in the previous step.

## f. Play the filtered audio and describe the improvement

The script contains commands to play the filtered audio. The expected improvements are:
*   **Audio 1:** Reduction of low-frequency thunder rumble.
*   **Audio 2:** Reduction of high-frequency hiss.
*   **Audio 3:** Reduction of low-frequency data center hum.
