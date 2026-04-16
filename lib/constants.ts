export const PROJECT_DATA = {
  title: "Audio Denoising System Using Digital Signal Processing",
  subtitle: "DMX4411 Mini Project — Signal Acquisition, Filter Design & Performance Evaluation",
  samplingRate: 44100,
  audioSignals: [
    {
      id: "audio1",
      name: "Audio 1",
      filename: "Crysis3Intro.wav",
      noiseType: "High-Frequency Hiss",
      filterType: "Low-Pass",
      fundamentalFreq: 439.83,
      mse: 0.00295201,
      snrOriginalSignal: -8.46,
      snrFilteredSignal: -9.15,
      snrImprovementSignal: -0.69,
      snrOriginalSignalNoise: 6.32,
      snrFilteredSignalNoise: 3.61,
      snrImprovementSignalNoise: -2.71,
      filterParams: {
        cutoff: 300,
        normalizedFreq: 0.0136,
        order: 1
      }
    },
    {
      id: "audio2",
      name: "Audio 2",
      filename: "DreamsBenSound.wav",
      noiseType: "Tonal Interference (50Hz Hum)",
      filterType: "Band-Stop / Notch",
      fundamentalFreq: 50.67,
      mse: 0.00845865,
      snrOriginalSignal: -14.38,
      snrFilteredSignal: -16.23,
      snrImprovementSignal: -1.85,
      snrOriginalSignalNoise: 9.85,
      snrFilteredSignalNoise: 9.09,
      snrImprovementSignalNoise: -0.75,
      filterParams: {
        centerFreq: 50.67,
        bandwidth: 8,
        cutoffLow: 46.66,
        cutoffHigh: 54.67,
        normalizedFreqLow: 0.0021,
        normalizedFreqHigh: 0.0025,
        order: 2
      }
    },
    {
      id: "audio3",
      name: "Audio 3",
      filename: "LastSummer.wav",
      noiseType: "Low-Frequency Rumble",
      filterType: "High-Pass",
      fundamentalFreq: 42.20,
      mse: 0.04110691,
      snrOriginalSignal: -21.73,
      snrFilteredSignal: -30.32,
      snrImprovementSignal: -8.59,
      snrOriginalSignalNoise: 0.61,
      snrFilteredSignalNoise: -9.82,
      snrImprovementSignalNoise: -10.43,
      filterParams: {
        cutoff: 1000,
        normalizedFreq: 0.0454,
        order: 2
      }
    }
  ],
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Introduction", href: "/introduction" },
    { label: "Methodology", href: "/methodology" },
    { label: "Design", href: "/design" },
    { label: "Results", href: "/results" },
    { label: "Discussion", href: "/discussion" },
    { label: "Conclusion", href: "/conclusion" },
    { label: "References", href: "/references" },
    { label: "Appendix", href: "/appendix" }
  ]
};
