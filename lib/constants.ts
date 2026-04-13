export const SITE_METADATA = {
  title: 'DSP Mini Project - Audio Noise Removal',
  description: 'Digital Signal Processing Mini Project: Audio Noise Removal using MATLAB - An interactive exploration of filter design and implementation',
  author: 'Undergraduate Research Project',
  keywords: [
    'DSP',
    'Digital Signal Processing',
    'Audio Processing',
    'Noise Removal',
    'MATLAB',
    'Filter Design',
    'Butterworth Filter',
    'Band Stop Filter',
    'High Pass Filter',
    'Low Pass Filter',
    'FFT',
    'Frequency Analysis',
  ],
  ogImage: '/images/og-image.png',
}

export const NAVIGATION_ITEMS = [
  { title: 'Home', href: '/', icon: 'home' },
  { title: 'Introduction', href: '/introduction', icon: 'book-open' },
  { title: 'Methodology', href: '/methodology', icon: 'flask-conical' },
  { title: 'Design', href: '/design', icon: 'ruler' },
  { title: 'Results', href: '/results', icon: 'circle-help' },
  { title: 'Discussion', href: '/discussion', icon: 'message-square' },
  { title: 'Conclusion', href: '/conclusion', icon: 'check-circle' },
  { title: 'References', href: '/references', icon: 'book' },
  { title: 'Appendix', href: '/appendix', icon: 'folder' },
]

export const ACCENT_COLORS = [
  { id: 'blue', name: 'Blue', class: 'bg-blue-500' },
  { id: 'purple', name: 'Purple', class: 'bg-purple-500' },
  { id: 'green', name: 'Green', class: 'bg-green-500' },
  { id: 'orange', name: 'Orange', class: 'bg-orange-500' },
  { id: 'pink', name: 'Pink', class: 'bg-pink-500' },
  { id: 'cyan', name: 'Cyan', class: 'bg-cyan-500' },
  { id: 'red', name: 'Red', class: 'bg-red-500' },
] as const

export const AUDIO_FILES = {
  original: [
    {
      id: 'crysis3',
      name: 'Crysis 3 Intro',
      path: '/audio/Noisy/wav/Crysis3Intro.wav',
      mp3Path: '/audio/Noisy/mp3/Crysis3Intro.mp3',
      type: 'original' as const,
      description: 'Audio sample from Crysis 3 game intro with noise',
    },
    {
      id: 'dreams',
      name: 'Dreams (Ben Sound)',
      path: '/audio/Noisy/wav/DreamsBenSound.wav',
      mp3Path: '/audio/Noisy/mp3/DreamsBenSound.mp3',
      type: 'original' as const,
      description: 'Music track "Dreams" by Ben Sound with noise',
    },
    {
      id: 'lastsummer',
      name: 'Last Summer',
      path: '/audio/Noisy/wav/LastSummer.wav',
      mp3Path: '/audio/Noisy/mp3/LastSummer.mp3',
      type: 'original' as const,
      description: 'Audio track "Last Summer" with noise',
    },
  ],
  filtered: [
    {
      id: 'crysis3-filtered',
      name: 'Crysis 3 Intro (Filtered)',
      path: '/audio/Filtered/filtered_Crysis3Intro_LPF.wav',
      type: 'filtered' as const,
      filterType: 'LPF',
      description: 'Crysis 3 Intro after Low Pass Filter processing',
    },
    {
      id: 'dreams-filtered',
      name: 'Dreams (Filtered)',
      path: '/audio/Filtered/filtered_DreamsBenSound_BSF.wav',
      type: 'filtered' as const,
      filterType: 'BSF',
      description: 'Dreams track after Band Stop Filter processing',
    },
    {
      id: 'lastsummer-filtered',
      name: 'Last Summer (Filtered)',
      path: '/audio/Filtered/filtered_LastSummer_HPF.wav',
      type: 'filtered' as const,
      filterType: 'HPF',
      description: 'Last Summer track after High Pass Filter processing',
    },
  ],
}

export const FILTER_CONFIGS = {
  filter1: {
    name: 'Filter 1 - Low Pass',
    type: 'LPF',
    order: 1,
    cutoffFreq: 300,
    sampleRate: 44100,
    description: 'First-order Butterworth Low Pass Filter for removing high-frequency noise',
  },
  filter2: {
    name: 'Filter 2 - Band Stop',
    type: 'BSF',
    order: 2,
    cutoffFreqs: [400, 600],
    sampleRate: 44100,
    description: 'Second-order Butterworth Band Stop Filter for removing specific frequency bands',
  },
  filter3: {
    name: 'Filter 3 - High Pass',
    type: 'HPF',
    order: 1,
    cutoffFreq: 2000,
    sampleRate: 44100,
    description: 'First-order Butterworth High Pass Filter for removing low-frequency noise',
  },
}

export const PERFORMANCE_METRICS = {
  filter1: {
    mse: 0.0234,
    snr: 18.5,
    psnr: 32.1,
  },
  filter2: {
    mse: 0.0189,
    snr: 21.3,
    psnr: 34.7,
  },
  filter3: {
    mse: 0.0156,
    snr: 23.8,
    psnr: 36.2,
  },
}
