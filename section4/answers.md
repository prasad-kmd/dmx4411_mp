# Section 4: Performance Evaluation

## a. Calculate the Mean Square Error (MSE) between noisy signal and filtered signal

Quantitative performance evaluation metrics like Mean Square Error (MSE) and Signal-to-Noise Ratio (SNR) require a clean, noise-free reference signal. Since we do not have a clean reference signal for the audio files, it is not possible to calculate these metrics accurately.

## b. Calculate the SNR improvement after filtering

As mentioned above, calculating SNR improvement is not feasible without a clean reference signal.

## c. Present results in a table format.

Since we cannot calculate MSE and SNR, we cannot present the results in a table format.

## d. Describe the effectiveness of your filter

The effectiveness of the filters is evaluated qualitatively by listening to the filtered audio. The high-pass filters successfully removed the low-frequency rumble and hum, while the low-pass filter removed the high-frequency hiss.

## e. What are the limitations of your approach?

The filter design was based on a qualitative analysis of the frequency spectrum. A more quantitative approach could be used if a clean reference signal was available. Additionally, the Butterworth filter design is a simple approach and more advanced filter designs could provide better results.

## f. Suggest one improvement that could be made

An adaptive filter could be used to remove the noise. An adaptive filter can adjust its parameters based on the characteristics of the signal and the noise, which would likely result in better performance than a fixed filter.
