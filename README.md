# DSP Audio Noise Removal Project Website

This is a professional, interactive portfolio website for a Digital Signal Processing research project focused on audio noise removal using MATLAB.

## Features
- **PDF Extraction**: Content is dynamically extracted from the technical report.
- **Interactive UI**: Built with Next.js 15, Tailwind CSS, and shadcn/ui.
- **Audio Denoising Showcase**: Integrated audio players showing before/after results.
- **Mathematical Rendering**: High-quality LaTeX rendering using KaTeX.
- **Syntax Highlighting**: MATLAB code showcase with Shiki.
- **Animations**: Fluid transitions and scroll animations with GSAP and Framer Motion.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: GSAP, Framer Motion
- **Math**: KaTeX
- **Code**: Shiki
- **State**: Zustand

## Getting Started

### Prerequisites
- Node.js 22+
- PNPM

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm dev
```

### Build
```bash
pnpm build
```

## Deployment
The project is configured for static export to GitHub Pages.

## Project Structure
- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI and feature components.
- `data/`: Extracted content and metadata from the research report.
- `public/`: Static assets including audio files, fonts, and the original PDF.
- `scripts/`: Extraction and pre-processing scripts.
