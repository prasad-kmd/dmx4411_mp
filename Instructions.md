# Comprehensive Prompt: Interactive Audio Denoising Research Website

## Project Context
Create a high-end, interactive research website for a **Signal Processing Mini Project (DMX 4411)** focused on **Audio Denoising**. The website must document the entire project lifecycle—from noise identification to filter design and performance evaluation—using a premium engineering aesthetic.

### Reference Templates & Assets
- **Design Inspiration**: [featured-project-web](https://github.com/prasad-kmd/featured-project-web) (local: `E:\Projects\code\featured-project-web`). 
  - *Key Features to replicate*: Glassmorphism, MagicBento grid navigation, dynamic accent colors, smooth Framer Motion transitions, and a structured article sidebar with TOC.
- **Project Report**: Use `public/Full-report/MP-Report-TXT.txt` and `public/Full-report/MP-Report-HTML.htm` as the primary content source.
- **Images**: Extract visuals from `public/Full-report/MP-Report-HTML_files/`.
- **Audio Assets**: Compare files in `public/audio/Noisy/wav/` against their counterparts in `public/audio/Filtered/`.

---

## Implementation Stages

### Stage 1: Core Architecture & Design System (Easy)
1. **Initialize Next.js**: Set up a Next.js (App Router) project with TypeScript and Tailwind CSS.
2. **Global Styles**: Define a "Premium Dark" theme with glassmorphic depth. Use **Inter** for body text and **Philosopher** (or a similar elegant serif) for headings.
3. **Dynamic Theme**: Implement an accent color picker and initializer (syncing CSS variables) similar to the reference template.
4. **Layout Wrappers**: Create a global `Layout` with a `FloatingNavbar` and a multi-column `Footer`.

### Stage 2: Homepage & Navigation (Medium)
1. **Featured Hero**: Build an interactive slideshow hero section (using `FeaturedHero.tsx` as a model) showcasing the three main audio denoising cases (Hiss, Hum, Rumble).
2. **Magic Bento Grid**: Implement a `MagicBento` navigation system on the homepage to link to major report sections:
   - *Introduction & Objectives*
   - *Methodology (Signal Acquisition & FFT)*
   - *Design (Filter Calculations)*
   - *Results (SNR/MSE Analysis)*
3. **Aesthetic Micro-interactions**: Integrate components like `CustomCursor`, `ClickSpark`, and `ScrollProgress` for a "wow" factor.

### Stage 3: Content Transformation & Sidebar (Medium)
1. **Report Content Structure**: Populate the main project page using the content from the report files. Use MDX or a similar system to allow for rich layouts.
2. **Interactive Sidebar**: Implement an `ArticleSidebar` with a real-time `Table of Contents` (TOC) that tracks scroll position.
3. **Math & Figures**: Render signal processing equations using KaTeX/LaTeX. Use the images from the report files folder, styled within premium "figure" containers with captions.

### Stage 4: Interactive Signal Processing Tools (Hard)
1. **Dual Audio Comparison Player**: 
   - Build a custom audio player that lazily loads files only on interaction.
   - Include a "Before" and "After" toggle for each of the three denoising samples.
   - Show the noise type (e.g., "50Hz Mains Hum") and the applied filter (e.g., "Notch Filter").
2. **Dynamic Data Visualizations**:
   - Use `Recharts` to create interactive frequency spectrum charts (Comparison of original vs. filtered FFT).
   - Visualize Filter Frequency Responses (Magnitude and Phase plots) based on the report data.
   - Animate the bars for SNR and MSE performance metrics as the user scrolls into view.

### Stage 5: Final Optimization & Deployment (Medium)
1. **Performance Tuning**: Implement Framer Motion `FadeIn` and `Viewport` triggers to ensure a smooth, "living" interface.
2. **Accessibility & SEO**: Ensure all interactive elements have unique IDs and proper ARIA labels. Add SEO meta-data (Open Graph, Twitter cards).
3. **CI/CD Workflow**: Create a GitHub Actions workflow (`deploy.yml`) for deployment to GitHub Pages (Static export), while ensuring compatibility with Vercel/Netlify.

---

## Technical Specifics for the AI
- **Strict Adherence**: Do not simplify the design. Maintain the complex, layered look of the reference repository.
- **Component Reusability**: Extract UI logic into modular components (e.g., `BentoCard`, `MetricCard`, `ComparisonPlayer`).
- **Placeholder Logic**: If a specific asset or diagram is missing, use a high-quality stylized placeholder (e.g., a blurred gradient or an icon) until it can be manually replaced.
- **No Manual Code Interventions**: The goal is for the app to be fully functional post-generation with minimal configuration.
