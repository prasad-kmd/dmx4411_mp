# Audio Signal Denoising System

An interactive web experience for a Digital Signal Processing (DSP) research project focused on audio noise removal using MATLAB.

## Features

- **Interactive UI:** Built with Next.js 15, Tailwind CSS, and Radix UI.
- **Theme System:** Support for dark and light modes with customizable accent colors.
- **Content-Rich:** Extracted data from technical reports including MATLAB code and mathematical equations.
- **Advanced Interactivity:** Custom tooltips, context menus, and interactive audio players (upcoming).
- **Data Visualization:** Frequency spectrums and filter response charts (upcoming).

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui (Radix UI)
- **State Management:** Zustand
- **Animations:** Framer Motion + GSAP
- **Math Rendering:** KaTeX
- **Code Highlighting:** Shiki

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm dev
   ```

3. Build for production (static export):
   ```bash
   pnpm build
   ```

## Project Structure

- `app/`: Application routes and layouts.
- `components/`: Reusable React components.
- `lib/`: Utilities, types, and state stores.
- `data/`: Extracted project content in JSON format.
- `public/`: Static assets (audio, fonts, images).
- `scripts/`: Content extraction and build scripts.
