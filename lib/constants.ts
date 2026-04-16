export const PROJECT_DATA = {
  title: "Audio Denoising System Using Digital Signal Processing",
  subtitle: "DMX4411 Mini Project — Signal Acquisition, Filter Design & Performance Evaluation",
  samplingRate: 44100,
  audioSignals: [
    {
      id: "audio-1",
      name: "Audio 1",
      file: "Crysis3Intro.wav",
      noiseType: "High-Frequency Hiss",
      filterType: "Low-Pass",
      fundamentalFreq: 439.83,
      noiseDescription: "Broadband high-frequency hiss typically originating from analog recording equipment or environmental sources.",
      filterParams: {
        type: "Low-Pass",
        cutoff: 300,
        normalizedFreq: 0.0136,
        order: 1,
        rolloff: "6 dB/octave"
      },
      metrics: {
        mse: 0.00295201,
        snrSignal: {
          original: -8.46,
          filtered: -9.15,
          improvement: -0.69
        },
        snrSignalNoise: {
          original: 6.32,
          filtered: 3.61,
          improvement: -2.71
        }
      }
    },
    {
      id: "audio-2",
      name: "Audio 2",
      file: "DreamsBenSound.wav",
      noiseType: "Tonal Interference",
      filterType: "Band-Stop/Notch",
      fundamentalFreq: 50.67,
      noiseDescription: "Narrow-band tonal interference closely corresponding to 50 Hz mains frequency or mechanical vibration.",
      filterParams: {
        type: "Band-Stop/Notch",
        centerFreq: 50.67,
        bandwidth: 8,
        lowCutoff: 46.67,
        highCutoff: 54.67,
        normalizedFreqLow: 0.0021,
        normalizedFreqHigh: 0.0025,
        order: 2,
        rolloff: "N/A"
      },
      metrics: {
        mse: 0.00845865,
        snrSignal: {
          original: -14.38,
          filtered: -16.23,
          improvement: -1.85
        },
        snrSignalNoise: {
          original: 9.85,
          filtered: 9.09,
          improvement: -0.75
        }
      }
    },
    {
      id: "audio-3",
      name: "Audio 3",
      file: "LastSummer.wav",
      noiseType: "Low-Frequency Rumble",
      filterType: "High-Pass",
      fundamentalFreq: 42.20,
      noiseDescription: "Broadband low-frequency rumble originating from structural vibrations, handling noise, or traffic.",
      filterParams: {
        type: "High-Pass",
        cutoff: 1000,
        normalizedFreq: 0.0454,
        order: 2,
        rolloff: "12 dB/octave"
      },
      metrics: {
        mse: 0.04110691,
        snrSignal: {
          original: -21.73,
          filtered: -30.32,
          improvement: -8.59
        },
        snrSignalNoise: {
          original: 0.61,
          filtered: -9.82,
          improvement: -10.43
        }
      }
    }
  ]
};
