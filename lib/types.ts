// Theme types
export type ThemeMode = 'dark' | 'light' | 'system'
export type AccentColor = 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'cyan' | 'red'

export interface ThemeState {
  mode: ThemeMode
  accent: AccentColor
  isDark: boolean
  setMode: (mode: ThemeMode) => void
  setAccent: (accent: AccentColor) => void
  toggleTheme: () => void
}

// Content types
export interface Section {
  id: string
  title: string
  level: number
  content: string
  subsections?: Section[]
}

export interface Equation {
  id: string
  latex: string
  mathml?: string
  context: string
  location: {
    section: string
    subsection?: string
  }
  equationNumber?: string
}

export interface CodeBlock {
  id: string
  language: 'matlab' | 'javascript' | 'typescript' | 'json' | 'css'
  code: string
  filename?: string
  description?: string
  location?: {
    section: string
    subsection?: string
  }
}

export interface TableData {
  id: string
  headers: string[]
  rows: string[][]
  caption?: string
  reference?: string
}

export interface Figure {
  id: string
  caption: string
  description: string
  placeholder?: boolean
  src?: string
  alt?: string
}

// Audio types
export interface AudioFile {
  id: string
  name: string
  path: string
  type: 'original' | 'filtered'
  duration?: number
  sampleRate?: number
  size?: number
  description?: string
}

// Chart types
export interface ChartDataPoint {
  x: number
  y: number
  label?: string
}

export interface ChartDataset {
  label: string
  data: ChartDataPoint[]
  color?: string
}

export interface ChartConfig {
  title?: string
  xLabel?: string
  yLabel?: string
  showGrid?: boolean
  xScale?: 'linear' | 'logarithmic'
  yScale?: 'linear' | 'logarithmic'
  xAxisRange?: [number, number]
  yAxisRange?: [number, number]
}

// Navigation types
export interface NavItem {
  title: string
  href: string
  icon?: string
  children?: NavItem[]
}

// UI types
export interface SparkParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
}

// Site metadata
export interface SiteMetadata {
  title: string
  description: string
  author: string
  keywords: string[]
  ogImage?: string
}
