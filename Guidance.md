## Project Overview
Create a professional, interactive portfolio website for a **Digital Signal Processing Mini Project** focused on audio noise removal using MATLAB. The website should transform the technical report into an immersive, highly interactive web experience with custom UI elements and advanced features.

---

## Technology Stack Requirements

### Core Framework & Tools
- **Next.js 15** (latest patched version)
  - App Router (NOT Pages Router)
  - TypeScript (strict mode)
  - NO `src` directory (root-level `app/` folder)
- **Package Manager:** PNPM
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix UI
- **Math Rendering:** KaTeX + Temml (LaTeX to MathML conversion)
- **Animations:** GSAP + Framer Motion
- **Code Highlighting:** Shiki
- **Deployment:** GitHub Pages (static export)

### Additional Recommended Libraries
- **react-hot-toast** or **sonner** for notifications
- **zustand** or **jotai** for state management (theme, sidebar, etc.)
- **lucide-react** for icons
- **recharts** or **visx** for customizable charts
- **wavesurfer.js** or **react-h5-audio-player** (customized) for audio
- **pdf-parse** or **pdf.js** for PDF OCR processing
- **react-markdown** or **MDX** for content rendering
- **canvas-confetti** or custom canvas for click spark effects

---

## Pre-Processing Step: PDF OCR & Text Extraction

### CRITICAL FIRST STEP - PDF Content Extraction

**Objective:** Extract all content from the provided PDF document and save it in structured formats for website consumption.

**Create Extraction Script:**
- Location: `/scripts/extract-pdf-content.ts`
- Use pdf-parse or pdf.js libraries
- Implement OCR capabilities for images/equations (tesseract.js if needed)

**Content Categories to Extract:**

1. **Section Headings**
   - Extract all h1, h2, h3, h4 level headings
   - Preserve hierarchy and numbering
   - Store with unique IDs for navigation

2. **Body Text**
   - Extract all paragraph content
   - Maintain formatting markers (bold, italic, lists)
   - Preserve citation references

3. **Mathematical Equations**
   - Identify LaTeX formatted equations
   - Extract both inline and display equations
   - Convert to proper LaTeX syntax
   - Validate equation syntax
   - Store with context (section, paragraph)

4. **MATLAB Code Blocks**
   - Extract all code snippets
   - Preserve indentation and formatting
   - Identify language (MATLAB)
   - Store with proper syntax highlighting markers

5. **Tables and Data**
   - Extract tabular data structures
   - Preserve headers and row/column relationships
   - Convert to JSON or structured format
   - Include captions and labels

6. **Figures and Images**
   - Extract figure captions
   - Note figure numbers and references
   - Store descriptions for alt text

**Output Structure:**

Save extracted data to `/data` directory:
- `content.json` - Structured complete content
- `raw-text.txt` - Raw extracted text for reference
- `equations.json` - All LaTeX equations with context
- `code-snippets.json` - MATLAB code blocks with metadata
- `tables.json` - All tabular data structures
- `figures.json` - Figure metadata and descriptions

**Data Schema Structure:**

Define TypeScript interfaces for all extracted content:
- Section interface with id, title, level, content
- Equation interface with latex, mathml, context, location
- CodeBlock interface with language, code, filename, description
- Table interface with headers, rows, caption, reference
- Figure interface with id, caption, description, placeholder

---

## Fallback & Placeholder System

### Detailed Placeholder Requirements

**If PDF Extraction Fails or Data is Missing:**

**For Images/Figures:**
- Display a sophisticated placeholder card
- Include figure number and caption text if available
- Show descriptive text explaining what the figure should contain
- Use lucide-react icon representing the content type (BarChart, Image, FileAudio)
- Include "Image extraction failed" message in small text
- Provide dimensions matching typical figure sizes
- Style with gradient background and border
- Add hover effect suggesting content type

**Example placeholder content:**
- "Figure 3.1 - Filter 1 Frequency Response"
- "This chart displays the magnitude and phase response of the first-order Butterworth low-pass filter designed for Audio 1. The magnitude plot shows attenuation characteristics across the frequency spectrum from 0 to 22 kHz, with -3dB cutoff at 300 Hz and 6 dB/octave rolloff rate."

**For Equations:**
- Display placeholder with equation context
- Show equation number/reference
- Include descriptive text of what the equation represents
- Use mathematical symbols in Unicode as fallback
- Example: "Equation 2.1 - Fast Fourier Transform (FFT) formula for discrete signal x(n) of length N, computing frequency components X(k)"

**For Tables:**
- Create structured table layout with headers
- Use sample/placeholder data matching expected structure
- Include column descriptions
- Show "Data extraction pending" indicator
- Maintain proper table formatting and styling

**For Audio Files:**
- Display audio player placeholder
- Show file name and description
- Include waveform placeholder graphic
- Display expected duration and sample rate
- Add "Audio file not available" message with explanation

**For Code Blocks:**
- Display syntax-highlighted placeholder
- Show expected function/script name
- Include comments describing code purpose
- Use representative MATLAB syntax structure

**General Placeholder Styling:**
- Professional appearance matching site design
- Clear indication of missing content
- Descriptive information to convey intended content
- Consistent styling across all placeholder types
- Interactive hover states
- Option to "Report missing content" button

---

## Required App Router Files

### Error Handling Files

**1. Global Error Boundary**
- File: `/app/error.tsx`
- Must be a Client Component
- Props: error, reset function
- Features:
  - Display user-friendly error message
  - Error details in development mode only
  - "Try Again" button calling reset()
  - Navigation back to home
  - Error logging to console
  - Themed styling matching site design
  - Animated entrance (Framer Motion)

**2. Global Error Handler**
- File: `/app/global-error.tsx`
- Handles errors in root layout
- Must include html and body tags
- Features similar to error.tsx
- More critical error messaging
- Fallback UI for complete failures

**3. Not Found Page**
- File: `/app/not-found.tsx`
- Custom 404 page design
- Features:
  - Creative 404 message
  - Animated illustration or graphic
  - Search functionality
  - Popular pages links
  - Navigation breadcrumbs
  - Return to home button
  - Theme-aware styling
  - Suggested sections based on URL

**4. Loading States**
- File: `/app/loading.tsx` (root level)
- File: `/app/[section]/loading.tsx` (per section if needed)
- Features:
  - Skeleton loaders matching content layout
  - Animated loading indicators
  - Progress bars for long operations
  - Themed spinner/loader design
  - Smooth transitions
  - Content shape preservation

**Loading Component Types:**
- Page skeleton loader
- Sidebar skeleton
- Chart/graph loading placeholder
- Audio player skeleton
- Code block shimmer effect
- Table loading state

### Sitemap Generation

**1. Static Sitemap**
- File: `/app/sitemap.ts`
- Export sitemap function returning MetadataRoute.Sitemap
- Include all pages:
  - Landing page
  - Introduction
  - Methodology
  - Design
  - Results
  - Discussion
  - Conclusion
  - References
  - Appendix
- Set priorities (homepage: 1.0, main sections: 0.8, subsections: 0.6)
- Set change frequencies (homepage: weekly, content: monthly)
- Include last modified dates

**2. Dynamic Sitemap Considerations**
- Generate URLs for all sub-sections
- Include anchor links for major headings
- Exclude utility pages (404, error)
- Format URLs correctly for GitHub Pages base path

**3. Robots.txt**
- File: `/app/robots.ts`
- Allow all crawlers
- Reference sitemap location
- Specify any crawl delays if needed

---

## Interactive Elements Requirements

### 1. Custom Right-Click Context Menu

**Implementation Requirements:**
- Suppress default browser context menu globally
- Create custom context menu component using Radix UI ContextMenu
- Context-aware menu items based on element type
- Smooth animations on open/close
- Keyboard shortcuts displayed beside actions

**Menu Items by Context:**

**On Text Selection:**
- Copy text
- Search selected text
- Highlight selection
- Share section

**On Code Block:**
- Copy entire code
- Copy selected lines
- Download as .m file
- Open in new tab

**On Math Equation:**
- Copy as LaTeX
- Copy as MathML
- Copy as plain text
- Export as image

**On Image/Chart:**
- Download image
- Copy image
- View fullscreen
- Share

**Global Menu Items:**
- Toggle dark mode
- Change accent color
- Toggle sidebar
- Download page as PDF
- Print page

### 2. Custom Tooltips System

**Requirements:**
- Completely suppress default browser tooltips
- Remove all title attributes from elements
- Custom Radix UI Tooltip implementation
- Animated entrance/exit with Framer Motion

**Tooltip Features:**
- 100ms delay on hover
- Smooth fade-in animation
- Position awareness (avoid screen edges)
- Rich content support (formatted text, icons, small previews)
- Themeable styling
- Arrow pointing to trigger element

**Tooltip Types:**

**Simple Text Tooltips:**
- Icon explanations
- Button descriptions
- Navigation hints

**Rich Content Tooltips:**
- Chart data point details
- Variable definitions
- Abbreviation expansions
- Citation previews
- Code function descriptions

**Interactive Tooltips:**
- Hoverable tooltip content
- Links within tooltips
- Dismissible tooltips
- Delayed close on mouse leave

### 3. Custom Click Spark Effect

**Implementation:**
- Canvas-based particle system
- Global click event listener
- Triggered on every click anywhere on page

**Spark Characteristics:**
- Particle count: 8-12 per click
- Radial burst pattern from click point
- Random velocities and angles
- Gravity effect pulling particles down
- Fade out animation
- Duration: 300-500ms
- Color: Matches current accent theme color

**Spark Variations:**
- Different intensity for different element types
- Larger burst for button clicks
- Subtle for text selections
- Intense for major interactions (play audio, download)
- Color variations based on element context

**Performance:**
- Use requestAnimationFrame for smooth animation
- Particle pooling to prevent memory leaks
- Automatic cleanup after animation
- Canvas positioned as fixed overlay, pointer-events-none

**Settings:**
- User preference to enable/disable
- Intensity slider (subtle to intense)
- Color override option
- Stored in localStorage

### 4. Math Equation Interaction

**Click-to-Copy Feature:**

**Implementation:**
- Make all rendered equations clickable
- Show hover state (subtle background highlight)
- On click: display copy options menu

**Copy Options Menu:**
- Popover component positioned near equation
- Three copy buttons:
  - Copy LaTeX source
  - Copy MathML representation
  - Copy Unicode plain text approximation
- Success toast notification on copy
- Automatic menu dismissal after selection

**Visual Feedback:**
- Equation highlight on hover (accent color background at 10% opacity)
- Cursor changes to pointer
- Ripple effect on click
- Checkmark icon animation on successful copy
- Toast message showing what was copied

**Additional Features:**
- Double-click for quick LaTeX copy
- Keyboard shortcut support (Ctrl/Cmd + Shift + C when equation focused)
- Copy icon badge in corner on hover
- Equation numbering clickable to copy reference

---

## Theme System Requirements

### Dark Mode Default + Theme Toggle

**State Management:**
- Use Zustand or Jotai for theme state
- Persist preferences in localStorage
- Default: dark mode
- Sync across browser tabs

**Theme Configuration:**

**Mode Options:**
- Dark mode (default)
- Light mode
- System preference (optional)

**Accent Color Palette:**

Provide 5-7 accent color options:
- Blue (default)
- Purple
- Green
- Orange
- Pink
- Cyan
- Red

Each accent color should have:
- Light mode variant
- Dark mode variant
- Hover state variant
- Disabled state variant
- CSS variable definitions

**Theme Toggle Component:**
- Located in top-right navbar
- Compact icon button
- Dropdown menu for mode and accent selection
- Animated icon transition (sun/moon)
- Smooth theme transition animation
- Preview swatches for accent colors

**CSS Variables:**
- Define all theme colors as CSS variables
- Update variables on theme change
- Smooth transition for color changes
- Separate variables for:
  - Background colors (primary, secondary)
  - Text colors (primary, secondary, muted)
  - Border colors
  - Accent colors
  - Chart colors

**Theme Application:**
- Apply to all components
- Update syntax highlighting theme
- Update chart color schemes
- Update canvas effects (spark colors)
- Update custom scrollbar

---

## Custom Audio Player

### Requirements

**Core Features:**
- Lazy loading (only load file when player interacted with)
- Custom styled controls matching site theme
- Waveform visualization option
- Playback speed control
- Volume control
- Download button
- Loop option

**Player States:**
- Unloaded (show preview with load button)
- Loading (spinner and progress)
- Loaded and ready
- Playing
- Paused
- Ended

**Controls:**
- Play/Pause toggle button
- Seek slider with time display
- Current time / Total duration
- Volume slider (0-100%)
- Playback speed (0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x)
- Download original file button
- Loop toggle

**Visual Design:**
- Compact layout
- Rounded borders matching site design
- Gradient background option
- Waveform display (optional, load on demand)
- Animated equalizer bars when playing
- Progress bar with gradient fill
- Hover effects on all interactive elements

**Lazy Loading Implementation:**
- Show preview card with metadata
- Display file name, duration (if available), size
- "Load Audio" button
- On click: fetch audio file
- Show loading spinner
- Initialize player once loaded
- Cache loaded audio (don't reload on replay)

### Audio Comparison Component

**Modes:**

**Side-by-Side Mode:**
- Two players displayed horizontally
- Synchronized controls option
- Play both simultaneously option
- Visual diff indicator

**Toggle Mode:**
- Single player with toggle switch
- Switch between original and filtered
- Smooth transition
- Remember playback position when switching
- A/B test mode with random order

**Features:**
- Labels: "Original (Noisy)" and "Filtered (Clean)"
- Visual indicators of which is playing
- Difference metrics display (SNR improvement)
- Waveform comparison overlay
- Spectrum analyzer comparison

---

## Customizable Charts/Graphs

### Requirements

**Interactive Controls:**
- X-axis range sliders
- Y-axis scale toggle (linear/logarithmic)
- Grid visibility toggle
- Line color picker
- Line width slider
- Point markers toggle
- Legend visibility toggle

**Chart Types Needed:**

**Spectrum Plots:**
- Single-sided magnitude spectrum
- Frequency vs Magnitude
- Customizable frequency range
- Zoom and pan capabilities
- Cursor crosshair with value display

**Filter Response Charts:**
- Magnitude response
- Phase response
- Combined magnitude/phase plots
- Frequency range selection
- dB scale toggle

**Performance Metrics Visualizations:**
- Bar charts for MSE comparison
- Line charts for SNR trends
- Comparison tables with visual bars
- Before/after comparison charts

**Interactive Features:**
- Hover tooltips on data points
- Click to highlight specific values
- Drag to zoom
- Double-click to reset view
- Export as PNG/SVG/CSV
- Print-friendly version

**Customization Panel:**
- Collapsible settings panel
- Real-time preview of changes
- Reset to defaults button
- Save custom view preferences
- Share custom view link

**Data Loading:**
- Load chart data from extracted PDF data files
- Fallback to sample/placeholder data if extraction failed
- Show loading skeleton while processing
- Error state if data invalid

---

## Layout Components

### 1. Collapsible Sidebar (Left)

**Structure:**
- Fixed position on left side
- Full viewport height
- Collapsible to icon-only width
- Smooth transition animation

**Collapsed State:**
- Width: 64px (icon-only)
- Show only icons for sections
- Tooltip on hover showing full section name
- Toggle button visible

**Expanded State:**
- Width: 256px
- Show icon + section name
- Subsection navigation
- Current section highlight
- Progress indicator

**Navigation Items:**
- Home/Landing
- Introduction
- Methodology
- Design
- Results
- Discussion
- Conclusion
- References
- Appendix

**Features:**
- Active section highlighting
- Scroll spy (highlight current viewport section)
- Smooth scroll on click
- Expandable subsections
- Sticky position
- Keyboard navigation (Tab, Arrow keys)
- Mobile: Transform to bottom sheet

**Footer Section:**
- Copyright info when expanded
- Avatar/logo when collapsed
- Theme indicator
- Version number

### 2. Sticky Rounded Compact Navbar (Top Right)

**Position:**
- Fixed top-right corner
- Margin from edges: 16px
- Sticky behavior on scroll
- Reduce size slightly when scrolled

**Layout:**
- Rounded pill shape
- Backdrop blur effect
- Semi-transparent background
- Shadow that increases on scroll

**Components:**

**Icon Buttons (compact, circular):**
- Theme toggle (sun/moon icon)
- Accent color picker (palette icon)
- Settings (gear icon)
- Mobile menu toggle (hamburger icon, mobile only)

**Dropdown Menus:**
- Theme dropdown: Light/Dark mode + accent colors
- Settings dropdown: Preferences, accessibility, about
- Mobile menu: Full navigation for mobile devices

**Visual Effects:**
- Hover states on all buttons
- Active button highlighting
- Smooth transitions
- Badge indicators for notifications/updates

### 3. Featured Footer

**Structure:**
- Full-width container
- Top border separator
- Padding: generous vertical spacing
- Responsive grid layout

**Sections:**

**About Column:**
- Project title
- Brief description (2-3 sentences)
- Key highlights/stats

**Quick Links Column:**
- Navigation links to all main sections
- External resources links
- Related projects

**Technologies Column:**
- List of technologies used
- Icons for each technology
- Versions where applicable

**Resources Column:**
- Download PDF button
- GitHub repository link
- Share buttons (Twitter, LinkedIn)
- Citation information

**Bottom Bar:**
- Copyright notice
- Built with technologies mention
- Privacy/Terms links
- Contact information
- Last updated date

**Design:**
- Dark background variant
- Accent color highlights
- Hover effects on links
- Responsive layout (stacks on mobile)
- Subtle animations on hover

---

## Table of Contents (TOC)

### Implementation

**Location:**
- Sticky position on right side (desktop)
- Shows next to main content
- Hidden on mobile (show in sidebar instead)
- Top offset to account for navbar

**Generation:**
- Automatically extract from page headings (h2, h3, h4)
- Generate unique IDs for each heading
- Build hierarchical structure
- Update dynamically on page load

**Features:**

**Visual Indicators:**
- Active section highlighted with accent color
- Border/indicator line showing current section
- Indentation for heading hierarchy
- Font size variation by heading level

**Interaction:**
- Smooth scroll on click
- Keyboard navigation
- Collapse/expand subsections
- Progress indicator (% of page read)

**Scroll Spy:**
- Intersection Observer API
- Update active section as user scrolls
- Trigger when heading enters top 20% of viewport
- Smooth transition between active states

**Design:**
- Compact layout
- Maximum height with scroll
- Fade-out gradient at bottom
- Themed styling
- Responsive hiding/showing

**Mobile Adaptation:**
- Integrate into collapsible sidebar
- Floating button to show TOC overlay
- Drawer component for mobile TOC
- Breadcrumb navigation alternative

---

## File Structure

**Root Level:**
- `app/` - Next.js app router directory
- `components/` - All React components
- `lib/` - Utilities, stores, constants
- `data/` - Extracted PDF content (JSON files)
- `public/` - Static assets
- `scripts/` - Build and extraction scripts
- `styles/` - Global CSS files
- Configuration files

**App Directory Structure:**

```
app/
├── layout.tsx                      # Root layout with providers
├── page.tsx                        # Landing page
├── error.tsx                       # Error boundary
├── global-error.tsx                # Global error handler
├── not-found.tsx                   # 404 page
├── loading.tsx                     # Root loading state
├── sitemap.ts                      # Sitemap generator
├── robots.ts                       # Robots.txt
├── introduction/
│   ├── page.tsx
│   └── loading.tsx
├── methodology/
│   ├── page.tsx
│   └── loading.tsx
├── design/
│   ├── page.tsx
│   └── loading.tsx
├── results/
│   ├── page.tsx
│   └── loading.tsx
├── discussion/
│   ├── page.tsx
│   └── loading.tsx
├── conclusion/
│   ├── page.tsx
│   └── loading.tsx
├── references/
│   ├── page.tsx
│   └── loading.tsx
└── appendix/
    ├── page.tsx
    └── loading.tsx
```

**Components Directory:**

```
components/
├── layout/
│   ├── Sidebar.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── MainLayout.tsx
├── ui/                             # shadcn/ui components
│   ├── button.tsx
│   ├── tooltip.tsx
│   ├── context-menu.tsx
│   ├── dropdown-menu.tsx
│   ├── popover.tsx
│   ├── slider.tsx
│   ├── toggle.tsx
│   ├── separator.tsx
│   └── ...
├── interactive/
│   ├── ClickSparkEffect.tsx
│   ├── CustomTooltip.tsx
│   ├── CustomContextMenu.tsx
│   └── ScrollProgress.tsx
├── theme/
│   ├── ThemeProvider.tsx
│   ├── ThemeToggle.tsx
│   └── AccentColorPicker.tsx
├── math/
│   ├── MathEquation.tsx
│   └── EquationCopyMenu.tsx
├── code/
│   ├── CodeBlock.tsx
│   └── CodeCopyButton.tsx
├── audio/
│   ├── CustomAudioPlayer.tsx
│   ├── AudioComparison.tsx
│   └── Waveform.tsx
├── charts/
│   ├── SpectrumPlot.tsx
│   ├── FilterResponseChart.tsx
│   ├── PerformanceMetrics.tsx
│   └── ChartControls.tsx
├── content/
│   ├── Section.tsx
│   ├── Subsection.tsx
│   └── ContentBlock.tsx
├── placeholders/
│   ├── ImagePlaceholder.tsx
│   ├── ChartPlaceholder.tsx
│   ├── EquationPlaceholder.tsx
│   └── AudioPlaceholder.tsx
└── TableOfContents.tsx
```

**Lib Directory:**

```
lib/
├── utils.ts                        # Utility functions (cn, formatters)
├── theme-store.ts                  # Zustand theme store
├── constants.ts                    # Site constants
├── types.ts                        # TypeScript type definitions
├── hooks/
│   ├── useMediaQuery.ts
│   ├── useScrollSpy.ts
│   └── useLocalStorage.ts
└── data-loaders/
    ├── load-equations.ts
    ├── load-code.ts
    └── load-charts.ts
```

**Data Directory:**

```
data/
├── content.json                    # Structured page content
├── raw-text.txt                    # Raw PDF text
├── equations.json                  # All equations
├── code-snippets.json              # MATLAB code
├── tables.json                     # Tabular data
├── figures.json                    # Figure metadata
└── charts/
    ├── audio1-spectrum.json
    ├── audio2-spectrum.json
    ├── audio3-spectrum.json
    ├── filter1-response.json
    ├── filter2-response.json
    └── filter3-response.json
```

**Public Directory:**

```
public/
├── audio/
│   ├── original/
│   │   ├── Crysis3Intro.wav
│   │   ├── DreamsBenSound.wav
│   │   └── LastSummer.wav
│   └── filtered/
│       ├── filtered_Crysis3Intro_LPF.wav
│       ├── filtered_DreamsBenSound_BSF.wav
│       └── filtered_LastSummer_HPF.wav
├── images/
│   ├── methodology-flowchart.svg
│   ├── filter-designs/
│   └── placeholders/
└── fonts/
    └── (custom fonts if needed)
```

**Scripts Directory:**

```
scripts/
├── extract-pdf-content.ts          # Main extraction script
├── validate-equations.ts           # Validate LaTeX syntax
├── generate-chart-data.ts          # Process chart data
└── optimize-audio.ts               # Compress audio files
```

---

## Error Handling Specifications

### Error.tsx Requirements

**Purpose:**
- Handle errors in page components
- Provide recovery options
- Maintain site navigation

**Features:**
- User-friendly error message (avoid technical jargon)
- Descriptive heading: "Something went wrong"
- Explanation: "We encountered an error while loading this section"
- "Try Again" button (calls reset function)
- "Return to Home" link
- Error details in development mode only
- Contact/report issue link

**Design:**
- Centered layout
- Error icon (AlertTriangle from lucide-react)
- Themed styling
- Framer Motion animation on mount
- Matches site aesthetic

### Global-Error.tsx Requirements

**Purpose:**
- Catch errors in root layout
- Last resort error boundary
- Must be minimal and reliable

**Features:**
- Include html and body tags
- Critical error message
- Minimal styling (inline if needed)
- "Reload Page" button
- No dependencies on theme system
- No external state dependencies

**Design:**
- Basic centered layout
- High contrast text
- Clear error indication
- Safe fallback styling

### Not-Found.tsx Requirements

**Purpose:**
- Custom 404 page
- Engaging user experience
- Help users find their way

**Features:**
- Creative 404 heading
- Friendly message: "Page not found"
- Possible reasons (typed wrong URL, outdated link, page moved)
- Search box to find content
- Popular pages links
- Section navigation
- "Go Home" button
- ASCII art or animated illustration (optional)

**Design:**
- Full page layout
- Centered content
- Animated elements (Framer Motion)
- Themed styling
- Responsive design
- Easter egg opportunity

### Loading.tsx Requirements

**Purpose:**
- Show loading state while page loads
- Prevent layout shift
- Improve perceived performance

**Features:**

**Root Loading (/app/loading.tsx):**
- Full page skeleton
- Sidebar skeleton
- Navbar placeholder
- Content area shimmer

**Section Loading (/app/[section]/loading.tsx):**
- Section title skeleton
- Content blocks skeleton
- Chart/graph placeholders
- Code block shimmer
- Table structure skeleton

**Design:**
- Skeleton screens matching actual layout
- Shimmer/pulse animation
- Themed colors (background/foreground)
- Smooth transition when content loads
- Appropriate height/width matching content

---

## Sitemap Implementation

### Sitemap.ts

**Export:**
- Default export function returning MetadataRoute.Sitemap
- Array of URL objects

**URL Objects Structure:**
- url: string (full URL including base path)
- lastModified: Date (current date or actual last modified)
- changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
- priority: number (0.0 to 1.0)

**Pages to Include:**
- Landing page (/, priority: 1.0, changeFrequency: 'weekly')
- Introduction (/introduction, priority: 0.8, changeFrequency: 'monthly')
- Methodology (/methodology, priority: 0.8, changeFrequency: 'monthly')
- Design (/design, priority: 0.8, changeFrequency: 'monthly')
- Results (/results, priority: 0.8, changeFrequency: 'monthly')
- Discussion (/discussion, priority: 0.8, changeFrequency: 'monthly')
- Conclusion (/conclusion, priority: 0.8, changeFrequency: 'monthly')
- References (/references, priority: 0.6, changeFrequency: 'monthly')
- Appendix (/appendix, priority: 0.6, changeFrequency: 'monthly')

**GitHub Pages Compatibility:**
- Include basePath in URLs if deployed to subdirectory
- Use environment variable for base URL
- Ensure URLs are absolute
- Test sitemap generation locally

### Robots.ts

**Export:**
- Default export function returning MetadataRoute.Robots

**Configuration:**
- rules:
  - userAgent: '*'
  - allow: '/'
  - disallow: '/api/' (if any internal routes)
- sitemap: full URL to sitemap.xml

**Production Considerations:**
- Different rules for development vs production
- Respect GitHub Pages subdirectory structure
- Allow all search engines

---

## Content Migration Strategy

### From PDF to Website

**Section Mapping:**

**Introduction Section:**
- Extract: Background, Problem Statement, Objectives
- Present as: Hero section + expandable cards
- Include: Timeline/stats visualization
- Animations: Stagger reveal on scroll

**Methodology Section:**
- Extract: Signal acquisition steps, MATLAB implementation
- Present as: Step-by-step flow diagram
- Include: Interactive flowchart
- Code snippets: MATLAB implementation examples
- Animations: Flow diagram progression

**Design Section:**
- Extract: Noise identification, filter calculations, frequency responses
- Present as: Tabbed interface for 3 audio signals
- Include: Interactive parameter displays, filter response charts
- Tables: Filter design parameters
- Animations: Chart animations, parameter highlights

**Results Section:**
- Extract: Filtered signal analysis, audio quality assessment, metrics
- Present as: Comparison views (before/after)
- Include: Audio players, spectrum comparison charts
- Tables: Performance metrics (MSE, SNR)
- Animations: Chart transitions, metric counters

**Discussion Section:**
- Extract: Effectiveness analysis, limitations, improvements
- Present as: Accordion sections
- Include: Pros/cons lists, comparison tables
- Expandable details for each limitation

**Conclusion Section:**
- Extract: Summary, findings, accomplishments
- Present as: Summary cards with highlights
- Include: Key stats visualization
- Timeline of project phases

**References & Appendix:**
- Extract: Bibliography, code listings
- Present as: Styled reference list, code viewer
- Include: Copy buttons, external links
- Code: Full MATLAB implementation with syntax highlighting

---

## Responsive Design Requirements

### Breakpoints

**Mobile:** < 640px
- Sidebar: Hidden, accessible via bottom sheet
- Navbar: Compact, hamburger menu
- Audio: Stacked comparison
- Charts: Full width, simplified controls
- TOC: In sidebar or floating button

**Tablet:** 640px - 1024px
- Sidebar: Collapsible, icon-only default
- Navbar: Full controls visible
- Audio: Side-by-side if space permits
- Charts: Full width with all controls
- TOC: Sticky in content if width allows

**Desktop:** > 1024px
- Sidebar: Expanded by default
- Navbar: All features visible
- Audio: Side-by-side comparison
- Charts: Optimal sizing with controls
- TOC: Sticky right column

**Wide Desktop:** > 1536px
- Maximum content width: 1280px
- Center content with margins
- Sidebar and TOC in optimal positions

### Mobile-Specific Features

**Touch Interactions:**
- Larger touch targets (min 44px)
- Swipe gestures for navigation
- Pull-to-refresh consideration
- Touch-friendly audio controls

**Performance:**
- Lazy load images aggressively
- Defer non-critical JavaScript
- Optimize font loading
- Reduce animation complexity

---

## Accessibility Requirements

### WCAG 2.1 Level AA Compliance

**Keyboard Navigation:**
- All interactive elements keyboard accessible
- Visible focus indicators
- Logical tab order
- Skip to main content link
- Escape key closes modals/menus

**Screen Readers:**
- Semantic HTML (header, nav, main, article, aside, footer)
- ARIA labels where needed
- ARIA live regions for dynamic content
- Alt text for all images (use figure descriptions from extracted data)
- Descriptive link text

**Color Contrast:**
- Minimum 4.5:1 for normal text
- Minimum 3:1 for large text
- Test both light and dark themes
- Don't rely on color alone for information

**Content:**
- Clear heading hierarchy
- Descriptive labels for form elements
- Error messages associated with fields
- Status messages announced

**Media:**
- Transcripts for audio content (if applicable)
- Captions for video (if any)
- Audio descriptions
- Control over autoplay (none by default)

---

## Performance Optimization

### Core Web Vitals Targets

**LCP (Largest Contentful Paint):** < 2.5s
- Optimize hero images
- Preload critical assets
- Use Next.js Image component
- Lazy load below-fold content

**FID (First Input Delay):** < 100ms
- Minimize JavaScript execution
- Code splitting
- Defer non-essential scripts
- Optimize event handlers

**CLS (Cumulative Layout Shift):** < 0.1
- Set dimensions on media
- Reserve space for dynamic content
- Avoid inserting content above existing content
- Use transform for animations

### Optimization Strategies

**Code Splitting:**
- Dynamic imports for heavy components
- Route-based splitting (automatic with Next.js)
- Lazy load charts, audio players
- Defer animations libraries to interaction

**Asset Optimization:**
- Compress images (WebP, AVIF)
- Optimize SVGs
- Minify CSS/JS
- Tree-shake unused code

**Caching:**
- Static asset caching (1 year)
- Service worker for offline (optional)
- localStorage for theme preferences
- Memoize expensive computations

**Loading Strategies:**
- Prioritize above-fold content
- Lazy load images with intersection observer
- Preload critical fonts
- Defer analytics scripts

---

## Deployment Configuration

### Next.config.mjs

**Static Export:**
- output: 'export'
- Configure basePath for GitHub Pages subdirectory
- Images: unoptimized: true (GitHub Pages limitation)
- trailingSlash: true (better GitHub Pages compatibility)

**Environment Variables:**
- NEXT_PUBLIC_BASE_PATH for base URL
- NEXT_PUBLIC_SITE_URL for absolute URLs
- NODE_ENV for environment detection

### GitHub Pages Setup

**Repository Settings:**
- Enable GitHub Pages
- Source: gh-pages branch
- Custom domain (optional)

**Build Process:**
- Install dependencies: pnpm install
- Build static site: pnpm build
- Output directory: /out
- Deploy: Push /out to gh-pages branch or use GitHub Actions

**GitHub Actions Workflow:**
- Trigger on push to main
- Checkout code
- Setup Node.js and PNPM
- Install dependencies
- Run build
- Deploy to gh-pages branch
- Automatic deployment on push

### Post-Deployment Checks

**Verify:**
- All pages load correctly
- Asset paths resolve (images, audio, fonts)
- Theme persistence works
- Audio files load and play
- Charts render correctly
- Math equations display properly
- Navigation functions
- Search engines can crawl (sitemap accessible)

---

## Additional Features

### Nice-to-Have Enhancements

**Search Functionality:**
- Global search box
- Search through content, equations, code
- Keyboard shortcut (Cmd/Ctrl + K)
- Fuzzy search with highlights
- Recent searches

**Print Styles:**
- Printer-friendly CSS
- Page breaks in appropriate places
- Expand all collapsible sections
- Include URLs for links
- Footer on each page

**Share Features:**
- Share specific sections
- Generate shareable links with anchors
- Social media meta tags (Open Graph, Twitter Cards)
- Copy link button with toast confirmation

**Progress Tracking:**
- Reading progress indicator
- Section completion checkmarks
- "Resume where you left off" feature
- Reading time estimates

**Annotations:**
- Personal notes on sections (localStorage)
- Highlight important parts
- Bookmark favorite sections
- Export notes as markdown

**Comparison Tools:**
- Interactive filter comparison
- Parameter adjustment simulator
- Real-time equation calculator
- Before/after slider for spectrum plots

---

## Implementation Phases

### Phase 1: PDF Extraction (CRITICAL FIRST)
- Set up extraction script
- Run OCR on provided PDF
- Extract all content types
- Validate and structure data
- Save to JSON files
- Create placeholder content for missing data

### Phase 2: Project Foundation
- Initialize Next.js 15 with TypeScript
- Configure PNPM and dependencies
- Set up Tailwind CSS
- Install and configure shadcn/ui
- Create basic file structure
- Set up error/loading/not-found pages

### Phase 3: Core Layout
- Build Sidebar component
- Create Navbar component
- Implement Footer
- Set up root layout with providers
- Create MainLayout wrapper
- Test responsive behavior

### Phase 4: Theme System
- Implement Zustand theme store
- Create ThemeProvider
- Build ThemeToggle component
- Implement accent color system
- Test persistence and transitions

### Phase 5: Interactive Features
- Custom right-click context menu
- Custom tooltip system (suppress defaults)
- Click spark effect implementation
- Math equation copy menu
- Test all interactive elements

### Phase 6: Content Components
- MathEquation component with KaTeX
- CodeBlock with Shiki highlighting
- CustomAudioPlayer with lazy loading
- Chart components with customization
- Placeholder components
- TableOfContents

### Phase 7: Pages & Content
- Create all page routes
- Load content from extracted data
- Implement navigation
- Add TOC where needed
- Test content rendering

### Phase 8: Animations
- GSAP scroll-triggered animations
- Framer Motion page transitions
- Component entrance/exit animations
- Micro-interactions
- Test performance impact

### Phase 9: Sitemap & SEO
- Generate sitemap.ts
- Configure robots.ts
- Add metadata to all pages
- Implement Open Graph tags
- Test SEO optimization

### Phase 10: Optimization & Testing
- Performance audit
- Accessibility testing
- Cross-browser testing
- Mobile responsiveness
- Load time optimization
- Bundle size analysis

### Phase 11: Deployment
- Configure for GitHub Pages
- Set up build process
- Test local static export
- Deploy to GitHub Pages
- Verify all functionality
- Monitor for issues

---

## Testing Requirements

### Functionality Testing

**Interactive Elements:**
- All click handlers work
- Context menus display correctly
- Tooltips show/hide properly
- Spark effects render
- Copy functions work

**Navigation:**
- Sidebar navigation functional
- TOC scrolls correctly
- Breadcrumbs accurate
- Back/forward browser navigation

**Theme:**
- Mode toggle works
- Accent colors apply correctly
- Preferences persist
- Transitions smooth

**Content:**
- Equations render correctly
- Code syntax highlighted
- Audio loads and plays
- Charts display data accurately
- Tables formatted properly

### Performance Testing

**Metrics:**
- Lighthouse score > 90
- Load time < 3 seconds
- Time to interactive < 3 seconds
- Bundle size reasonable
- No memory leaks

**Load Testing:**
- Test with slow connection
- Test with many tabs open
- Test audio loading
- Test chart rendering

### Accessibility Testing

**Tools:**
- WAVE browser extension
- axe DevTools
- Lighthouse accessibility audit
- Screen reader testing (NVDA/JAWS)

**Manual Testing:**
- Keyboard-only navigation
- High contrast mode
- Zoom to 200%
- Screen reader compatibility

### Cross-Browser Testing

**Browsers:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

**Devices:**
- Desktop (various resolutions)
- Tablet (iPad, Android tablets)
- Mobile (iPhone, Android phones)
- Different orientations

---

## Documentation Requirements

### Code Documentation

**Component Documentation:**
- JSDoc comments for all components
- PropTypes or TypeScript interfaces
- Usage examples
- Known limitations

**Function Documentation:**
- Purpose description
- Parameter descriptions
- Return value description
- Example usage

### Project Documentation

**README.md:**
- Project overview
- Installation instructions
- Development setup
- Build process
- Deployment steps
- Environment variables
- Contributing guidelines
- License

**Technical Documentation:**
- Architecture overview
- Data flow diagrams
- Component hierarchy
- State management explanation
- Theming system guide
- Custom hooks documentation

**User Guide:**
- How to navigate the site
- Interactive features explanation
- Accessibility features
- Keyboard shortcuts
- Browser compatibility
- Troubleshooting

---

## Final Checklist

### Pre-Deployment

- [ ] PDF content extracted and validated
- [ ] All pages created and populated
- [ ] Navigation functional
- [ ] Theme system working
- [ ] Interactive features tested
- [ ] Equations rendering correctly
- [ ] Code blocks highlighted
- [ ] Audio players functional
- [ ] Charts displaying accurately
- [ ] Error pages implemented
- [ ] Loading states appropriate
- [ ] 404 page creative and helpful
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] SEO optimized
- [ ] Accessibility compliant
- [ ] Performance optimized
- [ ] Cross-browser tested
- [ ] Mobile responsive
- [ ] Documentation complete

### Post-Deployment

- [ ] Site loads on GitHub Pages
- [ ] All assets loading correctly
- [ ] Navigation working
- [ ] Audio files accessible
- [ ] Theme persists
- [ ] Forms functional (if any)
- [ ] Analytics configured (if desired)
- [ ] Sitemap accessible
- [ ] Search engines can crawl
- [ ] Social sharing works
- [ ] No console errors
- [ ] Performance metrics acceptable

---

## Success Criteria

**User Experience:**
- Intuitive navigation
- Fast page loads
- Smooth animations
- Accessible to all users
- Works on all devices
- Professional appearance

**Technical Excellence:**
- Clean, maintainable code
- Proper error handling
- Optimized performance
- SEO friendly
- Accessible (WCAG AA)
- Well documented

**Content Quality:**
- Accurate representation of PDF content
- Proper mathematical notation
- Functional code examples
- Working audio demonstrations
- Clear data visualizations
- Comprehensive explanations

---
