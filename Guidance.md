## Project Overview & Context

You are building an interactive research project website for a Digital Signal Processing (DSP) Mini Project focused on audio denoising using MATLAB-designed digital filters. The project analyzes three noisy audio recordings, applies Low-Pass, Notch/Band-Stop, and High-Pass Butterworth IIR filters, and evaluates performance using MSE and SNR metrics.

**Repository Structure:**
- Current working repo: `https://github.com/prasad-kmd/dmx4411_mp` (project website repo where you will work)
- Design reference template: `https://github.com/prasad-kmd/featured-project-web` (heavily designed Next.js template — replicate its advanced elegant design system faithfully)
- Report PDF: `public/MP_Full-Report.pdf`
- Report HTML: `public/Full-report/MP-Report-HTML.htm`
- Report TXT: `public/Full-report/MP-Report-TXT.txt`

**Critical Design Requirement:** Study the reference template repository thoroughly before building. Replicate its design language, component architecture, animation philosophy, color tokens, typography scale, layout patterns, glassmorphism/gradient effects, and interactive behaviors. Do NOT simplify or water down the design. This must be an equally advanced and elegant implementation.

**Deployment Target:** Vercel or Netlify (primary). Also create a GitHub Actions workflow for GitHub Pages deployment.

---

## STAGE 1 — Project Initialization & Design System Foundation

### Task 1.1 — Repository Analysis & Setup

Study both repositories thoroughly:

- Examine every component, page, layout, and style file in the reference template at `https://github.com/prasad-kmd/featured-project-web`
- Identify: the color palette system, font stack, spacing scale, border radius tokens, shadow system, gradient patterns, glassmorphism styles, animation library usage (Framer Motion or similar), component hierarchy, and any custom hooks
- Read `public/Full-report/MP-Report-TXT.txt` completely to extract all textual content, data tables, numerical values, equations, section structure, and figure references
- Cross-reference with `public/Full-report/MP-Report-HTML.htm` for any formatting nuances
- Map the report's section hierarchy to website page sections

Initialize a Next.js project with App Router, TypeScript, and Tailwind CSS. Install all dependencies used in the reference template. Mirror the reference template's folder structure and configuration files including next.config.js, tailwind.config.ts, and any global CSS files.

### Task 1.2 — Design Token System

Replicate the exact design token system from the reference template:

- Port all CSS custom properties and Tailwind theme extensions exactly
- Implement the same color system: primary palette, accent colors, surface colors, border colors, and semantic color tokens for noise types (use a distinct accent for Low-Pass, Notch, and High-Pass filter contexts throughout the site)
- Implement the identical typography scale with the same font families — if the template uses variable fonts or Google Fonts, replicate those exactly
- Port the spacing, sizing, border-radius, shadow, and z-index scales
- Implement the same dark/light mode system if present in the reference; default to dark mode for this technical project
- Create a `lib/constants.ts` file containing all project-specific data: audio signal names (Crysis3Intro.wav, DreamsBenSound.wav, LastSummer.wav), filter parameters, MSE values, SNR values, fundamental frequencies, and all numerical data from the report

### Task 1.3 — Component Library Foundation

Replicate and extend the reference template's component library:

- Port every reusable UI primitive from the reference template: Button variants, Card variants, Badge variants, Tooltip, Modal/Dialog, Tabs, Accordion, Separator, Icon wrapper
- Implement the same animation system — if the template uses Framer Motion, replicate the exact motion variants (fade-in, slide-up, stagger children, viewport-triggered animations, hover effects, and scroll-linked animations)
- Create a `components/ui/` directory mirroring the reference template's structure
- Implement the identical Navbar/Header component with the same behavior (sticky, blur-on-scroll, active link highlighting, mobile hamburger menu with the same animation)
- Implement the Footer component matching the reference template's style

---

## STAGE 2 — Page Architecture & Navigation System

### Task 2.1 — Site Map & Routing

The website will have the following route structure. Every section maps directly to the project report:

```
/ (Home / Hero)
/introduction
/methodology
/design
  /design/noise-identification
  /design/filter-selection
  /design/filter-implementation
/results
  /results/filtered-signal-analysis
  /results/audio-quality-assessment
  /results/performance-metrics
/discussion
/conclusion
/references
/appendix
```

Implement Next.js App Router layout files. The root layout must include: the Navbar with all section links, a floating Table of Contents component (collapsible, highlights active section on scroll), and the Footer.

### Task 2.2 — Floating Table of Contents (TOC)

Build an advanced sticky/floating TOC component:

- Mirrors the exact visual style of any sidebar or navigation component in the reference template
- Uses Intersection Observer API to track which section is currently in viewport
- Highlights the active section with an animated indicator (sliding pill or highlighted line matching the reference template's active state style)
- Collapses to a small icon button on mobile with a slide-in drawer
- Supports two levels of nesting (main sections and subsections)
- Includes smooth scroll behavior when clicking TOC items
- Animates in on page load with a stagger effect
- Place it as a fixed sidebar on desktop (right side), hidden on mobile unless toggled

### Task 2.3 — Progress & Reading Indicator

Implement a reading progress bar at the top of every content page, styled in the reference template's accent color. Animate it smoothly as the user scrolls.

---

## STAGE 3 — Hero & Home Page

### Task 3.1 — Hero Section

Build the Hero section matching the reference template's hero design language exactly:

- Full-viewport-height hero with the project title: "Audio Denoising System Using Digital Signal Processing"
- Subtitle: "DMX4411 Mini Project — Signal Acquisition, Filter Design & Performance Evaluation"
- A dynamic animated background — replicate whatever the reference template uses (particle system, gradient mesh, animated blobs, or grid pattern); adapt it to use an audio/waveform visual motif (animated sine wave or frequency spectrum visualization using Canvas or SVG)
- A brief one-paragraph abstract extracted from the report's introduction
- Two CTA buttons: "Explore Research" (scrolls to introduction) and "View Full Report" (links to `public/MP_Full-Report.pdf` in a new tab)
- Animated statistics/metric cards floating or arranged in a grid below the main text — display: 3 Audio Signals, 3 Filter Types, 44.1 kHz Sampling Rate, 3 Performance Metrics
- Animate the hero content with staggered entrance animations matching the reference template's motion style

### Task 3.2 — Project Overview Cards (Below Hero)

Below the hero, render a "Project Highlights" strip with three cards — one per audio signal. Each card must:

- Display the audio signal name and original filename
- Show the noise type (High-Freq Hiss / Tonal Interference / Low-Freq Rumble) as a colored badge
- Show the filter applied (Low-Pass / Notch / High-Pass) as a secondary badge
- Display the fundamental frequency
- Include a "Listen" button that will connect to the custom audio player (implemented in Stage 5)
- Use hover effects matching the reference template's card hover behavior (lift, glow, border highlight)

---

## STAGE 4 — Content Sections (Text-Heavy Pages)

For every section below, the content must be extracted from the report files. If specific text cannot be confirmed, use a clearly marked placeholder comment. Apply the reference template's content section patterns (section headers, body text styling, pull quotes, callout boxes) faithfully.

### Task 4.1 — Introduction Section

Build the Introduction page with three subsections:

**Background and Context:** Render the full text content as body copy. Style it with the reference template's prose styling. Add a decorative side element (icon or illustration placeholder) representing audio waves.

**Problem Statement:** Render as body copy. Add a styled "Problem" callout box using the reference template's alert/callout component style. Inside it, summarize: consumer electronics company scenario, need for automated noise removal, MATLAB-based solution.

**Project Objectives:** Render as a styled list with animated icons for each of the four objectives (Acquire & Analyze, Design Filters, Implement & Test, Evaluate Performance). Use the reference template's feature list or bullet list component style.

### Task 4.2 — Methodology Section

Build the Methodology page with two subsections:

**Signal Acquisition subsection:** Render as body copy with a styled code block showing the audioread() MATLAB code snippet (extracted from the appendix). Style code blocks to match the reference template's code display style. Add an inline note card explaining the .mp3 to .wav conversion step, with the Audacity Export dialog information as a screenshot placeholder with descriptive alt text.

**MATLAB Implementation with two sub-subsections:**

For Time Domain Analysis: Include body text, a placeholder image card for Figure 2.3 (Stereo time domain plot), body text about mono conversion, a styled code block for the stereo-to-mono conversion code, a placeholder image card for Figure 2.5 (Mono time domain plot), and a placeholder image card for Figure 2.6 (Sampling frequency display). Add an info callout: "All three signals sampled at 44.1 kHz."

For Frequency Domain Analysis: Render the FFT equation using a math rendering library (KaTeX or MathJax). Render the FFT computation code as a styled code block. Add a fundamental frequency display component — a styled three-column info card showing Audio 1: 439.83 Hz, Audio 2: 50.67 Hz, Audio 3: 42.20 Hz. Add a placeholder image card for Figure 2.9 (Magnitude spectrum). Render the three noise profile bullet points as styled list items with colored indicator dots per noise type.

**Methodology Flowchart:** Render the full methodology flowchart from the report as a custom SVG or React component (not an image). Use the reference template's visual style for boxes and arrows. Include all five stages: Signal Acquisition, MATLAB Implementation, Noise Identification, Filter Selection & Design, Filter Implementation & Frequency Response, Comparison, Performance Evaluation. Animate the flowchart stages sequentially on scroll entry.

### Task 4.3 — Design Section

Build the Design page with three major subsections:

**Noise Identification and Characterization:**

Create three expandable analysis cards (one per audio signal), using the reference template's accordion or expandable card style. Each card must contain: signal name and file, noise type badge, detailed text analysis extracted from the report, and a key finding callout.

Then render the Summary of Noise Characteristics as a three-column comparison table styled with the reference template's table component.

**Filter Selection and Design Calculations:**

For each of the three filters, build a dedicated filter design card containing:
- Filter type as a prominent header badge
- All design parameters rendered as a styled definition list or parameter table
- Mathematical equations rendered with KaTeX: the cutoff frequency, normalized frequency calculation, rolloff rate equation, filter order derivation, and transfer function H(s)
- A Justification section in a styled callout box
- Full text from the report for each filter

Then render Table 3.1 (Summary of Filter Design Parameters) as a fully styled interactive table with hover row highlighting:

| Audio File | Filter Type | Cutoff Frequency | Normalized Frequency | Order |
|---|---|---|---|---|
| Audio 1 | Low-Pass | 300 Hz | 0.0136 | 1 |
| Audio 2 | Band-Stop/Notch | 46.66 Hz – 54.67 Hz | 0.0021 – 0.0025 | 2 |
| Audio 3 | High-Pass | 1000 Hz | 0.0454 | 2 |

**Filter Implementation and Frequency Response:**

Render the MATLAB implementation body text and the magnitude/phase response equations with KaTeX. Add styled code blocks for the butter() and freqz() implementation.

For each of the three filter frequency response subsections: render the body text, add a placeholder image card for the frequency response figure (Figures 3.1, 3.2, 3.3), and render the characteristic bullet points as a styled list.

For Filter Application & Audio Exports: render body text, code blocks for filtfilt(), normalization, and audiowrite() with styled syntax highlighting.

### Task 4.4 — Results Section

Build the Results page with three major subsections:

**Filtered Signal Analysis:**

For each audio signal (Audio 1, 2, 3): render the body text analysis. Add placeholder image cards for the before/after frequency spectrum comparison figures (Figures 4.1–4.6). Style the before/after comparison as a two-panel layout with "Original" and "Filtered" labels in colored badges.

**Audio Quality Assessment:**

For each audio signal: render the assessment text. Add the custom audio player component (see Stage 5) showing both original and filtered audio side by side. Style as a comparison widget.

**Quantitative Performance Metrics:**

For MSE section: render body text, render the MSE formula with KaTeX, display the three MSE values (Audio 1: 0.00295201, Audio 2: 0.00845865, Audio 3: 0.04110691) as animated metric cards that count up on scroll entry, render the interpretation bullet points.

For SNR section: render body text, render the SNR formula with KaTeX and the delta-SNR formula, render the alternative method code block.

For Results Summary (Table 4.1): build the full interactive performance metrics table with all columns:

| Audio File | MSE | SNR Original (signal) | SNR Filtered (signal) | SNR Improvement (signal) | SNR Original (signal,noise) | SNR Filtered (signal,noise) | SNR Improvement (signal,noise) |
|---|---|---|---|---|---|---|---|
| Audio 1 | 0.00295 | -8.46 | -9.15 | -0.69 | 6.32 | 3.61 | -2.71 |
| Audio 2 | 0.00845 | -14.38 | -16.23 | -1.85 | 9.85 | 9.09 | -0.75 |
| Audio 3 | 0.04110 | -21.73 | -30.32 | -8.59 | 0.61 | -9.82 | -10.43 |

Color-code cells: positive SNR improvements in green, negative in red/amber.

### Task 4.5 — Discussion Section

Build the Discussion page with four subsections. Use the reference template's long-form content prose styling:

**Effectiveness of Designed Filters:** Three subsections (one per audio). Render all body text. For Audio 2's limitations, render as a numbered styled list with the four factors. Add pull quotes for key findings.

**Filter Design Tool:** Render body text. Add a placeholder image card for Figure 5.1 (MATLAB Filter Designer App screenshot). Render the five capability bullet points as a styled feature list.

**Limitations of the Approach:** Render all eight limitations as an expandable accordion, each with the limitation name as the trigger and the full explanation as the body. Use the reference template's accordion component.

**Suggested Improvements:** Render the Machine Learning Approaches subsection as a highlighted feature callout. Render improvements ii–ix as a styled numbered list with icons.

### Task 4.6 — Conclusion Section

Build the Conclusion page with six subsections. Extract all content from the report. Style as long-form prose with the reference template's content patterns. Key findings (Successful Noise Removal, Partial Effectiveness, Trade-offs, SNR Limitations, MSE as Alternative Metric) must be styled as distinct highlighted callout boxes with appropriate accent colors. The Technical Accomplishments section renders as a five-item icon list. Learning Outcomes and Practical Applications render as styled lists. Remarks renders as a styled closing statement with a blockquote component.

### Task 4.7 — References Section

Build a References page. Render all 14 references as a numbered list. For references with URLs, render the URL as a styled external link with an icon. Group references by type: Software, Music, Academic/Documentation. Style using the reference template's list component patterns.

### Task 4.8 — Appendix Section

Build an Appendix page displaying the full MATLAB code. Render the complete code block from pages 36–42 of the report as a syntax-highlighted code block using Shiki or Prism. Include a "Copy Code" button. Add line numbers. Add a "Download as .m file" button that creates a blob download of the code text. Style the code viewer container to match the reference template's code display design.

---

## STAGE 5 — Custom Audio Player Components

### Task 5.1 — Audio Player Architecture

Build a custom audio player component system. Critical requirement: audio files must NOT be loaded or fetched until the user explicitly clicks the play button or a designated load trigger. This is a lazy-load-on-interaction pattern.

The audio files are located in `public/audio/`. If actual audio files are not present, create placeholder paths and document them clearly. The six audio tracks are:
- `public/audio/wav/Crysis3Intro.wav` (Audio 1 — Original)
- `public/audio/wav/DreamsBenSound.wav` (Audio 2 — Original)
- `public/audio/wav/LastSummer.wav` (Audio 3 — Original)
- `public/audio/wav/filtered_Crysis3Intro_LPF.wav` (Audio 1 — Filtered)
- `public/audio/wav/filtered_DreamsBenSound_BSF.wav` (Audio 2 — Filtered)
- `public/audio/wav/filtered_LastSummer_HPF.wav` (Audio 3 — Filtered)

### Task 5.2 — Single Track Audio Player

Build a `SingleAudioPlayer` component with these features:

- An idle state showing the track name, a badge for type (Original/Filtered), filter type badge, and a large play button with a waveform animation placeholder
- On first click of the play button: show a loading indicator, dynamically create an HTML Audio element and set the src, begin fetching the audio (do not preload), then play when ready
- After load: display a custom playback UI showing: track title, current time / total duration, a scrubber (custom styled range input), volume control, play/pause toggle, mute toggle
- Animate a live waveform visualizer using the Web Audio API AnalyserNode and Canvas — visualize the frequency bars while the audio plays
- The waveform visualizer must match the reference template's color palette
- Display a "Not yet loaded" state with a clear CTA to indicate clicking will load and play
- Fully accessible with ARIA labels

### Task 5.3 — Comparison Audio Player Widget

Build a `ComparisonAudioPlayer` component that displays two SingleAudioPlayer instances side by side (Original vs. Filtered) for the same audio signal. Features:

- A header showing the signal name and noise/filter type metadata
- Both players are displayed in a two-column layout on desktop, stacked on mobile
- An "A/B Toggle" mode: a single play/pause button that alternates between original and filtered at a user-set crossfade point or on demand, to facilitate direct comparison
- The two players are color-coded: Original in a neutral/blue tone, Filtered in a green/teal success tone
- Display the key metrics below the players: MSE value and SNR improvement for that signal

### Task 5.4 — Audio Player Placement

Place the audio player components in the following locations:

- In the Project Overview Cards on the Home page: a compact SingleAudioPlayer for each signal's filtered version
- In the Results section (Audio Quality Assessment): a full ComparisonAudioPlayer widget for each of the three signals
- In the Design section (Filter Application & Audio Exports subsection): a ComparisonAudioPlayer for each signal
- Create a standalone `/audio-demo` page that displays all three ComparisonAudioPlayer widgets in sequence, with a brief description of each

---

## STAGE 6 — Interactive Charts & Data Visualizations

Use Recharts, Chart.js (via react-chartjs-2), or Plotly.js. Match the chart color scheme to the reference template's palette. All charts must be responsive, animated on mount, and have interactive tooltips.

### Task 6.1 — Frequency Spectrum Charts

Build a `FrequencySpectrumChart` component that renders the single-sided magnitude spectrum for each audio signal. Use placeholder data arrays that approximate the shapes described in the report:

- Audio 1: elevated broadband content above 5 kHz (hiss shape — relatively flat high-frequency floor)
- Audio 2: sharp spike at ~50.67 Hz against a lower baseline
- Audio 3: elevated magnitude below 200 Hz (rumble shape — decaying from low frequency)

The chart must support toggling between Original and Filtered spectra on the same chart (as overlaid line series, color-coded: original in blue, filtered in red/orange).

Add a frequency range zoom control: buttons to set the x-axis range to full spectrum, 0–5000 Hz, 0–200 Hz, or a custom zoom via draggable handles.

Display a vertical marker line at the cutoff frequency/center frequency of the applied filter.

Add a legend and tooltips showing frequency (Hz) and magnitude values.

Include a note below each chart clarifying that data is approximated for visualization — actual values from MATLAB analysis are documented in the report.

### Task 6.2 — Filter Frequency Response Charts

Build a `FilterResponseChart` component for each of the three filters displaying both magnitude (dB) and phase (degrees) responses:

- Filter 1 (Low-Pass, fc=300 Hz): magnitude rolls off from 0 dB, reaching approximately -3 dB at 300 Hz, continuing to drop at 6 dB/octave
- Filter 2 (Band-Stop, center=50.67 Hz, BW=8 Hz): shows a sharp notch dip near 50.67 Hz, unity gain elsewhere
- Filter 3 (High-Pass, fc=1000 Hz): magnitude increases from a low level, reaching -3 dB at 1000 Hz, flat above

Use a dual-axis layout (magnitude on left y-axis, phase on right y-axis), two separate chart areas stacked vertically, or a tab toggle between magnitude and phase view.

All values are approximated based on the filter parameters in the report. Mark the cutoff frequency with a vertical annotation line.

Make the charts fully customizable: allow the user to toggle the display of passband/stopband regions as shaded zones, toggle the phase plot, and hover for precise values.

### Task 6.3 — Performance Metrics Charts

Build the following interactive charts for the Results section:

**MSE Comparison Bar Chart:** Horizontal bar chart with three bars (one per audio signal). Values: Audio 1: 0.00295201, Audio 2: 0.00845865, Audio 3: 0.04110691. Color each bar with the signal's associated noise type color. Add value labels on each bar. Include a tooltip explaining what MSE represents in context.

**SNR Comparison Grouped Bar Chart:** Two groups of three bars each — one group for snr(signal) method, one for snr(signal,noise) method. Within each group, show Original and Filtered bars side by side. Include negative values correctly with a zero baseline. Color-code: original in neutral, filtered in accent. Add threshold lines at 0 dB.

**SNR Improvement Chart:** A delta chart showing the improvement values (-0.69, -1.85, -8.59 for signal method; -2.71, -0.75, -10.43 for signal,noise method). Use a diverging color scale: values above 0 in green, values below 0 in red. Add annotations explaining why negative improvement occurs.

**Summary Dashboard:** Build a `MetricsDashboard` component combining all three charts in a responsive grid. Add a tab system to switch between chart types. Include an "Interpretation" accordion below each chart with the relevant text from the report.

### Task 6.4 — Interactive Filter Parameter Explorer

Build an interactive `FilterExplorer` component in the Design section:

- A tabbed interface with three tabs (Filter 1, Filter 2, Filter 3)
- For each filter: display the design parameters as an interactive form with sliders and number inputs for adjustable variables (cutoff frequency, filter order)
- As the user adjusts parameters, recalculate and re-render the estimated frequency response curve in real time using the mathematical formula for a Butterworth filter's magnitude response
- Display the normalized frequency and derived parameters as they update
- Add a "Reset to Report Values" button
- Show a warning message if the user sets parameters that would be problematic (e.g., cutoff above Nyquist)

This does not need to process actual audio — it is purely a mathematical visualization tool based on the Butterworth transfer function formula.

---

## STAGE 7 — Advanced Interactive Features

### Task 7.1 — Methodology Pipeline Visualization

Build an animated interactive version of the methodology flowchart from the report (replacing the static version in Task 4.2):

- Each stage (Signal Acquisition, MATLAB Implementation, Noise Identification, Filter Selection & Design, Filter Implementation & Frequency Response, Comparison, Performance Evaluation) is a clickable node
- Clicking a node expands a side panel showing the subsections within that stage and a brief description
- Animated connecting arrows between stages
- Active node is highlighted in the reference template's accent color
- On mobile, render as a vertical stepper

### Task 7.2 — Signal Type Comparison Matrix

Build a full-width comparison table/matrix component in the Results section showing all key information across the three audio signals in a visually rich format:

- Rows: Signal Name, Filename, Noise Type, Filter Applied, Cutoff Frequency, Filter Order, MSE, SNR Improvement (both methods), Qualitative Assessment
- Columns: Audio 1, Audio 2, Audio 3
- Each cell uses appropriate display: text, badges, metric values with color coding, or star/progress ratings for qualitative assessment
- Add hover state on entire column to highlight one signal
- Sticky first column (row labels)

### Task 7.3 — Equation Reference Panel

Build a collapsible `EquationPanel` component that can be triggered from any section. It displays all mathematical equations used in the project in a single reference panel:

- FFT formula
- Magnitude response equations
- MSE formula
- SNR formula
- Delta-SNR formula
- Filter transfer functions
- Normalized frequency formulas

All rendered with KaTeX. Toggle via a floating equation icon button or a TOC-integrated link. Style as a slide-in drawer or modal matching the reference template's overlay patterns.

### Task 7.4 — Report Viewer Integration

In the References or Appendix section, embed the full report PDF (`public/MP_Full-Report.pdf`) using a PDF viewer component. Implement lazy loading: the PDF viewer renders only when the user clicks "View Embedded Report." Use `react-pdf` or an iframe approach with a custom styled wrapper.

---

## STAGE 8 — Performance, Accessibility & SEO

### Task 8.1 — Performance Optimization

- Implement lazy loading for all chart components using `next/dynamic` with loading skeletons matching the reference template's skeleton style
- Implement lazy loading for all audio player components
- Use `next/image` for all placeholder images with appropriate dimensions and blur placeholders
- Implement route-based code splitting
- Audio files must never be fetched until user interaction — verify this is enforced at the component level

### Task 8.2 — Accessibility

- All interactive elements have proper ARIA labels
- Audio players have transcript/caption placeholders noting the audio content type
- Charts have text descriptions as figure captions
- All color-coded information has a non-color secondary indicator (icon, pattern, or text label)
- Full keyboard navigation for all custom components
- Focus styles match the reference template's focus ring pattern

### Task 8.3 — SEO & Metadata

Add Next.js metadata for each page: title, description, and OpenGraph tags. Use the project title and relevant keywords (Digital Signal Processing, Audio Denoising, Butterworth Filter, MATLAB, FFT). Add a `sitemap.ts` and `robots.ts`.

---

## STAGE 9 — Deployment Configuration

### Task 9.1 — Vercel/Netlify Configuration

Create `vercel.json` with appropriate configuration for static assets and routing. Create `netlify.toml` with build command and publish directory settings. Ensure the `public/` folder including the PDF and audio files is correctly handled by the build process.

### Task 9.2 — GitHub Actions Workflow

Create `.github/workflows/github-pages.yml`:

- Trigger on push to main branch
- Steps: checkout, setup Node.js, install dependencies, run `next build`, configure for static export if needed, deploy to GitHub Pages using `actions/deploy-pages`
- Include a separate job for running build checks
- Note in comments that GitHub Pages is a secondary deployment target and Vercel/Netlify is primary

---

## STAGE 10 — Final Integration & Polish

### Task 10.1 — Navigation & Cross-Linking

- Ensure every section has a "Previous Section" and "Next Section" navigation at the bottom, styled as the reference template's pagination or navigation component
- All figure references in text (e.g., "as shown in Figure 4.1") are clickable and scroll to or open the relevant chart/image component
- All table references scroll to the relevant table
- References section links back from citations in text

### Task 10.2 — Loading & Transition States

- Implement a page loader matching the reference template's loading pattern
- All page transitions use the reference template's transition animations
- Add skeleton loaders for every async component (charts, audio players, PDF viewer)

### Task 10.3 — Error & Empty States

- Implement an error state for the audio player when audio files are not found (show a placeholder with a note that audio files should be placed in `public/audio/wav/`)
- Implement a 404 page styled with the reference template's error page pattern
- Add boundary error handling for all chart components

### Task 10.4 — Final Content Audit

Go through every section and verify:
- All numerical values from the report are present and correctly displayed
- All equations are rendered
- All MATLAB code snippets are present in code blocks
- All table data matches the report exactly
- Every placeholder image has a descriptive alt text noting what the original figure shows
- Every placeholder audio file note clearly documents the expected filename and content
- The TOC accurately reflects all sections and subsections

---

## Important Implementation Notes for the AI Coding App

**Content sourcing order:** Always read `public/Full-report/MP-Report-TXT.txt` first for clean text extraction. Use `public/Full-report/MP-Report-HTML.htm` for structure hints. Cross-reference with the PDF content provided above.

**Placeholder policy:** When actual assets (images, audio files) are absent, insert clearly commented placeholder components with descriptive labels. Never silently skip content.

**Design fidelity:** Before implementing any component, re-read the corresponding component in the reference template repository. The goal is that someone familiar with the reference template would recognize the design language immediately when viewing the project site.

**Data integrity:** All numerical values (MSE: 0.00295201, 0.00845865, 0.04110691; SNR values; fundamental frequencies 439.83 Hz, 50.67 Hz, 42.20 Hz; filter parameters) must match the report exactly. Store all in `lib/constants.ts` and import from there — never hardcode in JSX.

**Audio lazy loading is non-negotiable:** Zero network requests for audio until user interaction. Implement this with a state machine: IDLE → LOADING → READY → PLAYING/PAUSED.

**Chart approximation transparency:** Every chart displaying approximated frequency data must include a visible disclaimer note in the UI.
