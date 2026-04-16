# Audio Signal Denoising System

A professional, highly interactive portfolio website for a Digital Signal Processing (DSP) Mini Project focused on audio noise removal using MATLAB.

## 🚀 Overview

This project transforms a technical research report into an immersive web experience. It showcases the analysis of noisy audio signals and the design of digital filters (Low-pass, Band-stop, and High-pass) to restore audio quality.

### Key Features

- **Interactive Comparisons:** Listen to original vs. filtered audio side-by-side.
- **Technical Visualizations:** Frequency spectrums and filter response charts built with Recharts.
- **Math & Code:** Mathematical justifications rendered with KaTeX and MATLAB syntax highlighting via Shiki.
- **Modern UI/UX:** Responsive design with Next.js 15, Tailwind CSS, GSAP animations, and a customizable theme system.
- **Advanced Navigation:** Command palette (Ctrl+K), Breadcrumbs, and active Table of Contents.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS, Radix UI, shadcn/ui
- **State Management:** Zustand
- **Animations:** GSAP, Framer Motion
- **Data Visualization:** Recharts
- **Math Rendering:** KaTeX
- **Code Highlighting:** Shiki
- **Content Parsing:** Cheerio

## 📂 Project Structure

- `app/`: Main application routes and page layouts.
- `components/`: Modular React components (UI, Navigation, Charts, Audio).
- `data/`: Structured project content in JSON format.
- `scripts/`: Custom content extraction script (`extract-content.ts`).
- `public/`: Project assets including the original PDF report and audio files.

## 🚦 Getting Started

1. **Clone and Install:**
   ```bash
   pnpm install
   ```

2. **Run Content Extraction:**
   Extracts fresh data from the HTML report.
   ```bash
   pnpm run extract
   ```

3. **Development Mode:**
   ```bash
   pnpm run dev
   ```

4. **Build & Export:**
   Generates a static site in the `out/` directory.
   ```bash
   pnpm run build
   ```

## 📋 Stages of Development

- **Stage 0-2:** Project initialization, content extraction, and theme system.
- **Stage 3-5:** Error handling, core page population, and audio player integration.
- **Stage 6-8:** Data visualization, advanced navigation, and GSAP polish.
- **Stage 9:** Final documentation and deployment configuration.

## 📄 License

Undergraduate Research Project - 2024.
