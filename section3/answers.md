# Section 3: Filter Design and Implementation

## a. Design appropriate filter for each noisy audio files by identifying cut-off frequencies. Provide all calculations and justifications for filter selection.

The `filter_design.m` script designs filters for each audio file. The filter design is based on the frequency spectrum analysis from Section 2.

### Filter Justification and Calculations

The Butterworth filter is chosen for its maximally flat frequency response in the passband. The magnitude of the Butterworth filter's frequency response is given by the formula:

$$
|H(j\\Omega)| = \\frac{1}{\\sqrt{1 + (\\frac{\\Omega}{\\Omega_c})^{2N}}}
$$

Where:
- $|H(j\\Omega)|$ is the magnitude of the frequency response
- $\\Omega$ is the frequency
- $\\Omega_c$ is the cutoff frequency
- $N$ is the filter order

A higher filter order $N$ results in a sharper transition from the passband to the stopband. For this project, a filter order of 6 was chosen as a compromise between a sharp cutoff and computational complexity.

The cutoff frequencies were determined by analyzing the frequency spectrums from Section 2:

*   **Audio 1 (Thunder):** A high-pass filter is needed to remove the low-frequency thunder rumble. The noise is concentrated below 100 Hz, so a cutoff frequency of $\\Omega_c = 100$ Hz is chosen.
*   **Audio 2 (Autumn Walk):** A low-pass filter is needed to remove the high-frequency hiss. The noise is concentrated above 4000 Hz, so a cutoff frequency of $\\Omega_c = 4000$ Hz is chosen.
*   **Audio 3 (Data Center):** A high-pass filter is needed to remove the low-frequency hum. The noise is concentrated around 150 Hz, so a cutoff frequency of $\\Omega_c = 150$ Hz is chosen.

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
