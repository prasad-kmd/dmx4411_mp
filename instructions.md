
- the [DMX4411_Mini Project_2025.pdf](/DMX4411_Mini%20Project_2025.pdf) file is a mini project. and i want to generate matlab code for each and every specific sections and its questions. 
- as mentioned and required by the project, the required music files in [mp3 format](audio/mp3/) and [wav format](audio/wav/) files are in [audio](audio) folder.
- create folders for each sections. 
    - create .md file for answers for relevant questions each.
    - create .m (matlab code ) file for matlab instructions
- create a simple but elegant website (html, css and js only) for above sections and its answers, with guiding informations.
- use [common instructions](/common.md) given under common.md .
- in that [pdf](/DMX4411_Mini%20Project_2025.pdf) file , disregard any information after the point it mentioned as "Deliverables".
- if you can't read the [pdf](/DMX4411_Mini%20Project_2025.pdf) file use following content.
-----------------------------------
# Music Player Equalizer 
Suppose  that  you  work  as  an  assistant  engineer  at  a  consumer  electronics  company  that 
manufactures portable music players. Your team has received complaints that some audio files 
have  background  noise  and  poor  quality.  Your  task  is  to  develop  a  basic  signal  processing 
system that can analyze audio signals, identify noise components, and design filters to improve 
the audio quality. 
- Objectives: 
    - Load and manipulate audio signals in MATLAB  
    - Apply signal processing fundamentals (time domain, frequency domain)  
    - Design and implement basic filters  
    - Analyze and visualize signal characteristics  
    - Document their findings professionally 
 
- Section 01: Signal Acquisition 
    - a. Record three music files for 1 minutes each in different noisy environment (.mp3 files) 
    - b. Load all three .wav files to MATLAB (Key instruction → audioread()) 
    - c. Pot the time-domain signals of audio on one space (Key instruction → subplot()) 
    - d. Display Sampling frequency of each signal. 
 
- Section 02: Frequency Domain Analysis 
    - a. Compute the Fast Fourier Transform (FFT) of each signal (Key instruction → fft()) 
    - b. Identify the fundamental frequency component of each signal. 
    - c. Plot the magnitude spectrums of each signal (single-sided) on one figure. 
 
- Section 03: Filter design and Implementation 
    - a. Design appropriate filter for each noisy audio files by identifying cut-off frequencies. 
Provide all calculations and justifications for filter selection. 
    - b. Plot frequency response of your filter designs (Key instruction → freqz()) 
    - c. Apply appropriate filter designs to each noisy signal. 
    - d. Plot following signals in same space and use separate figures for each three signal 
samples. 
        - Frequency spectrum of original signal 
        - Frequency spectrum of filtered signal  
    - e. Compute and display the FFT of the filtered signal  
    - f. Play the filtered audio and describe the improvement 
 
- Section 04: Performance Evaluation 
    - a. Calculate the Mean Square Error (MSE) between noisy signal and filtered signal 
    - b. Calculate the SNR improvement after filtering 
    - c. Present results in a table format. 
    - d. Describe the effectiveness of your filter 
    - e. What are the limitations of your approach? 
    - f. Suggest one improvement that could be made
-----------------------------------


- resources used. 
    - sound generation - used presets (Distant Thunder, Autumn Walk, Data Center)- [MyNoise.net](https://mynoise.net/noiseMachines.php)
    - sound recording and processing - [Audaciy](https://www.audacityteam.org/download/)