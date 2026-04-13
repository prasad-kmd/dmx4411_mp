## 📋 STAGE 0: Initial Setup & PDF Extraction (CRITICAL FIRST STEP)

### Overview
Before any website development begins, we must extract all content from the provided PDF document and set up the project foundation.

### Tasks

#### Task 0.1: PDF Content Extraction Script
Create a comprehensive PDF extraction system that processes the provided document and saves structured data.

**Requirements:**
- Create `/scripts/extract-pdf-content.ts`
- Use pdf-parse or pdf.js library
- Implement OCR capabilities if needed (tesseract.js)
- Handle errors gracefully with detailed logging

**Content to Extract:**

1. **Section Headings:**
   - All heading levels (h1, h2, h3, h4)
   - Preserve hierarchy and numbering
   - Generate unique IDs for navigation

2. **Body Text:**
   - All paragraph content
   - Maintain formatting markers
   - Preserve citation references
   - Handle multi-column layouts

3. **Mathematical Equations:**
   - Identify inline and display equations
   - Extract as LaTeX format
   - Validate syntax
   - Store with surrounding context

4. **MATLAB Code Blocks:**
   - Extract all code snippets
   - Preserve indentation
   - Identify function names
   - Store with descriptions

5. **Tables:**
   - Extract tabular data
   - Preserve headers and structure
   - Include captions
   - Convert to JSON format

6. **Figures and Images:**
   - Extract captions and descriptions
   - Note figure numbers
   - Store metadata for placeholders

**Output Structure:**
Save to `/data` directory:
- `content.json` - Complete structured content
- `raw-text.txt` - Raw extraction for reference
- `equations.json` - All LaTeX equations
- `code-snippets.json` - MATLAB code
- `tables.json` - Tabular data
- `figures.json` - Figure metadata

**TypeScript Interfaces:**
Define complete type system for all extracted content types with proper relationships.

#### Task 0.2: Placeholder Content Generation
Create comprehensive placeholder content for any missing/failed extractions.

**Requirements:**
- Generate descriptive placeholders for figures
- Create sample equations with explanations
- Provide example table structures
- Include contextual descriptions

**Placeholder Types:**

1. **Figure Placeholders:**
   - Figure number and title
   - Detailed description of what figure should show
   - Technical details (axes, labels, data ranges)
   - Visual suggestion (chart type, layout)

2. **Equation Placeholders:**
   - Equation reference number
   - Description of what equation represents
   - Variable definitions
   - Unicode approximation if possible

3. **Table Placeholders:**
   - Table structure with headers
   - Sample data matching expected format
   - Column descriptions
   - Context explanation

4. **Code Placeholders:**
   - Function/script name
   - Purpose description
   - Input/output specifications
   - Key algorithm steps

**Validation:**
- Verify all extracted LaTeX equations compile
- Check code syntax
- Validate JSON structure
- Ensure no duplicate IDs

#### Task 0.3: Project Initialization
Set up the Next.js 15 project with proper configuration.

**Requirements:**
- Initialize Next.js 15 (latest) with App Router
- TypeScript with strict mode
- NO src directory - root level app folder
- PNPM as package manager

**Installation Commands:**
Use create-next-app with appropriate flags

**Dependencies to Install:**

**Core:**
- next@latest
- react@latest
- react-dom@latest
- typescript
- @types/node
- @types/react
- @types/react-dom

**Styling:**
- tailwindcss
- postcss
- autoprefixer
- tailwind-merge
- clsx

**UI Components:**
- @radix-ui/react-* (all needed primitives)
- lucide-react
- class-variance-authority

**State Management:**
- zustand

**Math & Code:**
- katex
- @types/katex
- shiki

**Animations:**
- framer-motion
- gsap

**Utilities:**
- date-fns or dayjs
- sonner (toast notifications)

**Configuration Files:**

1. **next.config.mjs:**
   - Enable static export
   - Configure basePath for GitHub Pages
   - Image optimization settings
   - Trailing slash configuration

2. **tsconfig.json:**
   - Strict mode enabled
   - Path aliases configured (@/ pointing to root)
   - Modern target settings

3. **tailwind.config.ts:**
   - Content paths for all files
   - Theme extension with CSS variables
   - Custom colors for theming
   - Animation configurations

4. **components.json (shadcn/ui):**
   - Configure shadcn/ui
   - Set up component paths
   - Choose style preference
   - Set up aliases

**Folder Structure:**
Create complete directory structure as specified in main prompt:
- app/
- components/ (with all subdirectories)
- lib/
- data/
- public/
- scripts/
- styles/

#### Task 0.4: Essential Configuration Files
Create all necessary configuration and utility files.

**Files to Create:**

1. **lib/utils.ts:**
   - cn() function for className merging
   - Common utility functions
   - Format helpers

2. **lib/types.ts:**
   - All TypeScript interfaces
   - Content types from PDF extraction
   - Component prop types
   - State types

3. **lib/constants.ts:**
   - Site metadata
   - Navigation items
   - Filter parameters from PDF
   - Performance metrics data
   - Color schemes

4. **styles/globals.css:**
   - Tailwind directives
   - CSS variables for theming
   - Custom scrollbar styles
   - Base styles
   - Animation keyframes

**Deliverables:**
- ✅ PDF extraction script running successfully
- ✅ Structured data saved in /data directory
- ✅ Next.js 15 project initialized
- ✅ All dependencies installed
- ✅ Configuration files created
- ✅ Folder structure complete
- ✅ TypeScript compiling without errors
- ✅ Can run `pnpm dev` successfully

---

## 📋 STAGE 1: Core Layout & Navigation

### Overview
Build the fundamental layout structure with sidebar, navbar, footer, and basic routing.

### Tasks

#### Task 1.1: Root Layout Setup
Create the root layout with theme provider and global elements.

**File: app/layout.tsx**

**Requirements:**
- Set up HTML structure with proper lang attribute
- Include metadata (title, description, keywords)
- Add ThemeProvider wrapper
- Include global components (ClickSparkEffect)
- Set up font configuration (Inter or similar)
- Add viewport meta tags
- Configure for dark mode default

**Metadata:**
- Title: "Audio Signal Denoising System - DSP Mini Project"
- Description: Comprehensive description from PDF content
- Keywords: DSP, audio processing, noise removal, MATLAB, filters
- Author information
- Open Graph tags
- Twitter card tags

**Providers:**
- ThemeProvider component wrapping children
- Toaster for notifications
- Any context providers needed

#### Task 1.2: Collapsible Sidebar Component
Build a fully functional left sidebar with navigation.

**File: components/layout/Sidebar.tsx**

**Requirements:**
- Client component with useState for collapse state
- Fixed position, full height
- Smooth transition animations (300ms)
- Responsive behavior (hidden on mobile)

**States:**
- Collapsed: 64px width, icons only
- Expanded: 256px width, icons + text

**Navigation Items:**
Extract from PDF table of contents:
- Home / Landing
- Introduction
- Methodology  
- Design
- Results
- Discussion
- Conclusion
- References
- Appendix

**Features:**
- Active section highlighting (use pathname)
- Hover tooltips in collapsed state
- Smooth scroll on navigation click
- Keyboard navigation support (Tab, Arrow keys)
- Toggle button (ChevronLeft/Right icons)
- Footer section with project info

**Styling:**
- Border on right edge
- Background matches theme
- Hover states on nav items
- Active item with accent color
- Icons from lucide-react

#### Task 1.3: Sticky Navbar Component
Create a compact, rounded navbar in top-right corner.

**File: components/layout/Navbar.tsx**

**Requirements:**
- Client component
- Fixed position top-right
- Rounded pill shape
- Backdrop blur effect
- Semi-transparent background
- Shrinks slightly on scroll

**Components:**
- Theme toggle button (sun/moon icon)
- Settings dropdown button
- Mobile menu toggle (hamburger, mobile only)

**Features:**
- Smooth animations on all interactions
- Drop shadow that increases on scroll
- Responsive sizing
- z-index above content but below modals

**Visual Effects:**
- useEffect hook tracking scroll position
- Conditional styling based on scroll
- Hover states on all buttons
- Active button highlighting

#### Task 1.4: Footer Component
Build a comprehensive footer with multiple sections.

**File: components/layout/Footer.tsx**

**Requirements:**
- Full-width container
- Responsive grid layout (1 column mobile, 4 columns desktop)
- Top border separator
- Generous padding

**Sections:**

1. **About Column:**
   - Project title
   - Brief description (2-3 sentences from PDF intro)
   - Key stats (3 audio files, 3 filters, etc.)

2. **Quick Links Column:**
   - Links to all main sections
   - External resource links
   - Related projects

3. **Technologies Column:**
   - MATLAB R2024b
   - Next.js 15
   - TypeScript
   - List with icons

4. **Resources Column:**
   - Download PDF button
   - GitHub repository link
   - Share buttons
   - Citation info

**Bottom Bar:**
- Copyright notice
- "Built with Next.js 15 & TypeScript"
- Privacy/Terms links
- Last updated date

**Styling:**
- Dark background variant
- Accent color for links
- Hover effects
- Responsive stacking

#### Task 1.5: Main Layout Wrapper
Create a component that combines all layout elements.

**File: components/layout/MainLayout.tsx**

**Requirements:**
- Compose Sidebar, Navbar, Footer
- Main content area with proper margins
- Account for sidebar width
- Responsive padding
- Smooth page transitions

**Layout Structure:**
- Sidebar on left
- Navbar floating top-right
- Main content area (adjust margin-left for sidebar)
- Footer at bottom
- Proper z-index layering

#### Task 1.6: Basic Page Routes
Create all page route files with placeholder content.

**Files to Create:**
- app/page.tsx (Landing)
- app/introduction/page.tsx
- app/methodology/page.tsx
- app/design/page.tsx
- app/results/page.tsx
- app/discussion/page.tsx
- app/conclusion/page.tsx
- app/references/page.tsx
- app/appendix/page.tsx

**Each Page Should Have:**
- Proper heading with section title
- Brief placeholder text
- Simple layout structure
- Unique metadata export
- Export default function component

**Metadata for Each Page:**
Use generateMetadata or metadata export with:
- Title specific to section
- Description from PDF content
- Canonical URL

#### Task 1.7: Navigation Testing
Ensure all navigation works correctly.

**Test:**
- Click sidebar links navigate correctly
- Active section highlights properly
- Sidebar collapse/expand works
- Mobile responsiveness
- Smooth scrolling behavior
- Browser back/forward navigation

**Deliverables:**
- ✅ Root layout with theme setup
- ✅ Functional collapsible sidebar
- ✅ Sticky navbar component
- ✅ Complete footer
- ✅ All page routes created
- ✅ Navigation working correctly
- ✅ Responsive on all screen sizes
- ✅ No console errors

---

## 📋 STAGE 2: Theme System & Interactive Base

### Overview
Implement the theme system with dark/light mode, accent colors, and foundational interactive elements.

### Tasks

#### Task 2.1: Theme Store with Zustand
Create state management for theme preferences.

**File: lib/theme-store.ts**

**Requirements:**
- Zustand store with persist middleware
- localStorage key: 'theme-storage'

**State Interface:**
- mode: 'dark' | 'light'
- accentColor: string (color name)
- setMode: function
- setAccentColor: function  
- toggleMode: function

**Accent Color Options:**
Define object with 5-7 colors:
- blue (default)
- purple
- green
- orange
- pink
- cyan
- red

Each color needs:
- Light mode HSL value
- Dark mode HSL value
- CSS variable string
- Display name

**Default State:**
- mode: 'dark'
- accentColor: 'blue'

#### Task 2.2: Theme Provider Component
Create provider that applies theme to entire app.

**File: components/theme/ThemeProvider.tsx**

**Requirements:**
- Client component
- Subscribe to theme store
- Apply theme class to document element
- Update CSS variables dynamically
- Handle initial load (prevent flash)

**Features:**
- useEffect to apply theme on mount
- useEffect to apply on theme changes
- Set data-theme attribute on html element
- Update CSS variables for accent color
- Smooth transitions between themes

**CSS Variables to Update:**
- --accent (main accent color)
- --accent-foreground
- --accent-hover
- Background colors
- Text colors
- Border colors

#### Task 2.3: Theme Toggle Component
Build the theme switcher UI.

**File: components/theme/ThemeToggle.tsx**

**Requirements:**
- Client component
- Dropdown menu using Radix UI
- Trigger button with sun/moon icon
- Icon animation on theme change

**Dropdown Sections:**

1. **Mode Selection:**
   - Light mode option
   - Dark mode option
   - Icons for each
   - Current selection indicator

2. **Separator**

3. **Accent Color Selection:**
   - Label: "Accent Color"
   - Grid of color options
   - Color swatch preview for each
   - Current selection checkmark
   - Hover effects

**Animations:**
- Icon rotation on mode change (Framer Motion)
- Smooth dropdown open/close
- Color swatch hover scale
- Transition when accent changes

**Integration:**
- Import theme store
- Call setMode and setAccentColor
- Display current theme state
- Instant visual feedback

#### Task 2.4: Global CSS Variables Setup
Configure Tailwind and CSS for theming.

**File: styles/globals.css**

**Requirements:**
- Define CSS variables for all theme colors
- Light mode variables in :root
- Dark mode variables in .dark class
- Accent color variables
- Smooth transitions on theme change

**Variable Structure:**
```
Light mode:
- --background
- --foreground
- --card
- --card-foreground
- --popover
- --popover-foreground
- --primary
- --primary-foreground
- --secondary
- --secondary-foreground
- --muted
- --muted-foreground
- --accent
- --accent-foreground
- --destructive
- --destructive-foreground
- --border
- --input
- --ring
```

Dark mode:
- All same variables with dark values

**Transitions:**
Add transition property to all color changes (200ms ease)

#### Task 2.5: Click Spark Effect
Implement global click particle effect.

**File: components/interactive/ClickSparkEffect.tsx**

**Requirements:**
- Client component
- Canvas element fixed overlay
- Pointer-events-none (doesn't block clicks)
- z-index above content

**Implementation:**
- useEffect to add click event listener
- Canvas API to draw particles
- requestAnimationFrame for smooth animation

**Particle Properties:**
- Count: 8-12 per click
- Position: Click coordinates
- Velocity: Random radial directions
- Color: Current accent color from theme
- Size: 3-6px
- Lifetime: 300-500ms
- Gravity: Pull down effect
- Fade out: Opacity decreases

**Optimization:**
- Particle pooling (reuse particles)
- Clear canvas between frames
- Remove particles after animation
- Limit total active particles

**Settings:**
- Read from theme store (optional enable/disable)
- Intensity based on theme preference
- Color matches accent

#### Task 2.6: Custom Tooltip System
Create custom tooltips that suppress browser defaults.

**File: components/interactive/CustomTooltip.tsx**

**Requirements:**
- Wrapper around Radix UI Tooltip
- Custom styling matching theme
- Suppress all default title tooltips globally

**Global Suppression:**
Add script in root layout to remove all title attributes on mount

**Tooltip Features:**
- 100ms delay before showing
- Smooth fade-in animation (Framer Motion)
- Position awareness (don't overflow screen)
- Arrow pointing to trigger
- Rich content support
- Maximum width (300px)
- Dark/light theme variants

**Variants:**

1. **Simple Text:**
   - Single line text
   - Small padding
   - Clear typography

2. **Rich Content:**
   - Multiple lines
   - Formatted text
   - Icons support
   - Links support

**Styling:**
- Background matches theme
- Border subtle accent color
- Box shadow for depth
- Rounded corners
- Proper contrast

**Export:**
Wrapper components: Tooltip, TooltipTrigger, TooltipContent, TooltipProvider

#### Task 2.7: Custom Context Menu
Build right-click menu system.

**File: components/interactive/CustomContextMenu.tsx**

**Requirements:**
- Suppress default browser context menu
- Radix UI ContextMenu implementation
- Context-aware menu items
- Smooth animations

**Global Suppression:**
Add event listener to prevent default context menu:
- document.addEventListener('contextmenu', handler)
- Allow context menu only on custom elements

**Context Menu Wrapper:**
Export reusable components for different contexts

**Menu Types:**

1. **Text Selection Menu:**
   - Copy text
   - Search text
   - Highlight selection
   - Share section

2. **Code Block Menu:**
   - Copy all code
   - Copy selection
   - Download as file
   - Open in new tab

3. **General Page Menu:**
   - Toggle dark mode
   - Change accent color
   - Toggle sidebar
   - Share page
   - Download PDF

**Animations:**
- Scale and fade in
- Smooth hover states
- Quick close on click outside
- Keyboard support (Escape to close)

**Styling:**
- Theme-aware colors
- Subtle backdrop blur
- Icons for each item
- Keyboard shortcuts displayed
- Separators between groups

#### Task 2.8: Integration & Testing
Connect all theme components and test interactions.

**Integration Points:**

1. **Add ThemeProvider to root layout**
2. **Add ThemeToggle to Navbar**
3. **Add ClickSparkEffect to root layout**
4. **Configure TooltipProvider globally**
5. **Test context menu on various elements**

**Testing Checklist:**
- Theme persists across page reloads
- Theme toggles correctly
- Accent color changes apply immediately
- Click sparks appear on all clicks
- Tooltips show on hover (no default tooltips)
- Context menu appears on right-click
- All animations smooth
- No console errors
- Works in both light and dark modes
- Responsive on all devices

**Deliverables:**
- ✅ Theme store functional
- ✅ Theme provider applying themes
- ✅ Theme toggle working
- ✅ CSS variables configured
- ✅ Click spark effect active
- ✅ Custom tooltips replacing defaults
- ✅ Custom context menu working
- ✅ Theme persists on reload
- ✅ All animations smooth
- ✅ No performance issues

---

## 📋 STAGE 3: Error Handling & Core Pages

### Overview
Implement error boundaries, loading states, 404 page, sitemap, and begin basic content pages.

### Tasks

#### Task 3.1: Error Boundary
Create error handling for page components.

**File: app/error.tsx**

**Requirements:**
- 'use client' directive
- Props: error object, reset function
- User-friendly error display
- Recovery options

**Content:**
- Heading: "Something Went Wrong"
- Description: "We encountered an error loading this section"
- Error icon (AlertTriangle from lucide-react)
- Error message (sanitized for users)
- Stack trace (development mode only)

**Actions:**
- "Try Again" button (calls reset)
- "Return Home" link
- "Report Issue" link (optional)

**Styling:**
- Centered layout
- Card/container design
- Theme-aware colors
- Framer Motion entrance animation
- Responsive design

**Error Logging:**
- Console.error in development
- Could integrate error tracking service
- Store error info for debugging

#### Task 3.2: Global Error Handler
Create root-level error boundary.

**File: app/global-error.tsx**

**Requirements:**
- 'use client' directive  
- Must include html and body tags
- Minimal dependencies
- Fallback for critical errors

**Content:**
- Critical error message
- Minimal styling (inline or minimal CSS)
- "Reload Page" button
- No theme dependencies
- No external state

**Design:**
- Basic centered layout
- High contrast text
- Clear error indication
- Safe fallback styling
- Works even if theme system fails

#### Task 3.3: 404 Not Found Page
Create custom 404 error page.

**File: app/not-found.tsx**

**Requirements:**
- Creative and engaging design
- Helpful navigation options
- Theme-aware styling

**Content:**
- Large "404" heading (creative typography)
- Message: "Page Not Found"
- Explanation: "The page you're looking for doesn't exist or has been moved"
- Search box (optional, can be placeholder)
- Popular pages links
- Navigation to all main sections
- "Go Home" prominent button

**Features:**
- Animated illustration or ASCII art
- Framer Motion animations
- Easter egg opportunity
- Suggested pages based on URL
- Breadcrumb trail showing where they are

**Styling:**
- Full page height
- Centered content
- Creative visuals
- Responsive design
- Themed colors

#### Task 3.4: Loading States
Create loading UI for all routes.

**File: app/loading.tsx (root)**

**Requirements:**
- Skeleton screen matching layout
- Smooth animations
- Theme-aware

**Content:**
- Sidebar skeleton
- Navbar skeleton
- Main content area skeleton
- Footer skeleton (optional)

**Animations:**
- Pulse/shimmer effect
- Smooth transitions
- Loading indicators

**File: app/[section]/loading.tsx (for each section)**

**Content Skeletons:**
- Section heading skeleton
- Paragraph skeletons (various widths)
- Chart placeholder
- Code block skeleton
- Table skeleton
- Button skeletons

**Design:**
- Match actual content layout
- Use gradient shimmer animation
- Background color variations
- Rounded corners matching design
- Proper spacing

#### Task 3.5: Sitemap Generation
Create dynamic sitemap.

**File: app/sitemap.ts**

**Requirements:**
- Export default function
- Return MetadataRoute.Sitemap type
- Include all pages

**Pages to Include:**
- Landing (/, priority: 1.0, changeFrequency: 'weekly')
- Introduction (/introduction, 0.8, monthly)
- Methodology (/methodology, 0.8, monthly)
- Design (/design, 0.8, monthly)
- Results (/results, 0.8, monthly)
- Discussion (/discussion, 0.8, monthly)
- Conclusion (/conclusion, 0.8, monthly)
- References (/references, 0.6, monthly)
- Appendix (/appendix, 0.6, monthly)

**Configuration:**
- Include basePath from environment
- Absolute URLs with domain
- Current date as lastModified
- Proper type annotations

#### Task 3.6: Robots.txt
Configure crawler access.

**File: app/robots.ts**

**Requirements:**
- Export default function
- Return MetadataRoute.Robots type

**Configuration:**
- userAgent: '*'
- allow: '/'
- disallow: none (or /api if applicable)
- sitemap: full URL to sitemap.xml

**Environment Awareness:**
- Different rules for dev vs production
- Respect GitHub Pages structure

#### Task 3.7: Landing Page Content
Create engaging homepage.

**File: app/page.tsx**

**Requirements:**
- Hero section with project title
- Key statistics cards
- Section preview cards
- Call-to-action buttons

**Hero Section:**
- Main title: "Audio Signal Denoising System"
- Subtitle: "Digital Signal Processing Mini Project"
- Brief description from PDF introduction
- Animated entrance (Framer Motion)
- Background gradient or pattern

**Statistics Grid:**
Display key project metrics:
- 3 Audio Signals Processed
- 3 Filter Types Designed
- SNR Improvements Achieved
- MATLAB Implementation

**Section Preview Cards:**
Grid of cards for each main section:
- Icon representing section
- Section title
- Brief description (1-2 sentences)
- "Learn More" link
- Hover effects

**Navigation:**
- Smooth scroll to sections
- Quick navigation buttons
- Visual hierarchy

**Styling:**
- Full viewport height hero
- Generous spacing
- Theme-aware gradients
- Responsive grid
- Animations on scroll (GSAP)

#### Task 3.8: Introduction Page
Build the introduction section.

**File: app/introduction/page.tsx**

**Requirements:**
- Load content from /data/content.json
- Structure with clear sections
- Engaging presentation

**Sections:**

1. **Background and Context:**
   - Extract from PDF
   - Format as readable paragraphs
   - Key points highlighted

2. **Problem Statement:**
   - Clear problem description
   - Visual representation (icon or simple diagram)
   - Statistics if available

3. **Project Objectives:**
   - List format
   - Icons for each objective
   - Expandable details

**Features:**
- Table of contents for subsections
- Smooth scroll navigation
- Animations on entrance (Framer Motion)
- Pull quotes or callouts
- Responsive layout

**Styling:**
- Maximum content width (prose)
- Proper typography hierarchy
- Adequate line spacing
- Section dividers
- Themed colors

#### Task 3.9: Testing Error States
Verify all error handling works.

**Tests:**

1. **Trigger Error Boundary:**
   - Create deliberate error in component
   - Verify error.tsx displays
   - Test reset functionality
   - Verify navigation works

2. **Test Global Error:**
   - Simulate critical error
   - Verify global-error.tsx displays
   - Test reload functionality

3. **Test 404:**
   - Navigate to non-existent route
   - Verify not-found.tsx displays
   - Test navigation links
   - Test search (if implemented)

4. **Test Loading States:**
   - Slow down network (DevTools)
   - Verify loading.tsx displays
   - Check skeleton matches layout
   - Verify smooth transition

5. **Test Sitemap:**
   - Navigate to /sitemap.xml
   - Verify all URLs present
   - Check format validity
   - Test robots.txt access

**Deliverables:**
- ✅ Error boundary functional
- ✅ Global error handler working
- ✅ 404 page creative and helpful
- ✅ Loading states smooth
- ✅ Sitemap generated correctly
- ✅ Robots.txt configured
- ✅ Landing page complete
- ✅ Introduction page with content
- ✅ All error states tested
- ✅ No console errors

---

## 📋 STAGE 4: Content Components - Math & Code

### Overview
Build components for displaying mathematical equations and code blocks with syntax highlighting.

### Tasks

#### Task 4.1: Math Equation Component
Create component for rendering LaTeX equations with KaTeX.

**File: components/math/MathEquation.tsx**

**Requirements:**
- Client component
- KaTeX library integration
- Support inline and display modes
- Click-to-copy functionality

**Props:**
- latex: string (LaTeX source)
- displayMode?: boolean (block or inline)
- copyable?: boolean (default true)
- label?: string (equation reference like "Eq. 2.1")

**Features:**

1. **Rendering:**
   - Use KaTeX renderToString
   - Handle rendering errors gracefully
   - Fallback to LaTeX source if error
   - Support both modes

2. **Copyable Interaction:**
   - Make equation clickable
   - Hover state (background highlight)
   - Cursor pointer
   - Click opens copy menu

3. **Copy Menu:**
   - Popover component
   - Three copy options buttons
   - Success toast on copy
   - Auto-dismiss after action

**Error Handling:**
- Try-catch around KaTeX rendering
- Display error message in development
- Show fallback in production
- Log errors to console

**Styling:**
- Proper math typography
- Padding and spacing
- Theme-aware colors
- Hover effects
- Transition animations

#### Task 4.2: Equation Copy Menu
Create the copy options menu for equations.

**File: components/math/EquationCopyMenu.tsx**

**Requirements:**
- Popover component using Radix UI
- Three copy format options
- Toast notifications

**Copy Formats:**

1. **LaTeX Source:**
   - Copy original LaTeX string
   - Useful for reuse in documents
   - Toast: "LaTeX copied to clipboard"

2. **MathML:**
   - Convert LaTeX to MathML using Temml
   - Accessible format
   - Toast: "MathML copied to clipboard"

3. **Unicode Plain Text:**
   - Convert to Unicode approximation
   - Best-effort conversion
   - Toast: "Plain text copied to clipboard"

**Implementation:**
- Use Clipboard API (navigator.clipboard.writeText)
- Handle clipboard permission
- Error handling if copy fails
- Keyboard shortcuts (optional)

**Styling:**
- Button grid layout
- Icons for each format
- Hover effects
- Theme styling
- Animations

#### Task 4.3: Code Block Component
Build syntax-highlighted code display.

**File: components/code/CodeBlock.tsx**

**Requirements:**
- Shiki library for highlighting
- MATLAB language support
- Line numbers
- Copy button

**Props:**
- code: string
- language: string (default 'matlab')
- filename?: string
- highlightLines?: number[]
- showLineNumbers?: boolean (default true)

**Features:**

1. **Syntax Highlighting:**
   - Use Shiki with MATLAB language
   - Theme aware (github-dark for dark mode, github-light for light)
   - Proper token colors
   - Support for all MATLAB syntax

2. **Line Numbers:**
   - Optional display
   - Aligned properly
   - Clickable to highlight line
   - Themed colors

3. **Highlight Lines:**
   - Accept array of line numbers
   - Highlight background
   - Useful for explanations

4. **Header:**
   - Show filename if provided
   - Language badge
   - Copy button in top-right

**Copy Button:**
- Icon button (Copy icon from lucide)
- Copies entire code to clipboard
- Changes to checkmark on success
- Toast notification
- Timeout before reverting icon

**Styling:**
- Monospace font (JetBrains Mono or Fira Code)
- Proper padding
- Border and rounded corners
- Background color
- Scrollbar for overflow
- Responsive width

#### Task 4.4: Code Copy Button
Create the copy button component.

**File: components/code/CodeCopyButton.tsx**

**Requirements:**
- Icon button component
- State for copied status
- Clipboard integration

**States:**
- Default: Copy icon
- Copied: Check icon (3 seconds)
- Error: X icon (if copy fails)

**Implementation:**
- useState for copied state
- useEffect for timeout reset
- Clipboard API
- Error handling

**Features:**
- Tooltip showing "Copy code"
- Toast notification on success
- Keyboard shortcut (Ctrl/Cmd + Shift + C when focused)
- Smooth icon transition

**Styling:**
- Ghost or subtle variant
- Absolute positioned in code block
- Top-right corner
- Hover effects
- Theme colors

#### Task 4.5: Math Equation Placeholder
Create placeholder for failed equation extractions.

**File: components/placeholders/EquationPlaceholder.tsx**

**Requirements:**
- Display when equation data missing
- Descriptive content
- Professional appearance

**Content:**
- Equation reference (e.g., "Equation 2.1")
- Description of what equation represents
- Variable definitions if available
- Unicode approximation if possible
- Note: "LaTeX source unavailable"

**Styling:**
- Card/container design
- Math-like font
- Background with pattern
- Icon (Function icon)
- Theme colors
- Proper spacing

#### Task 4.6: Code Block Placeholder
Create placeholder for missing code.

**File: components/placeholders/CodePlaceholder.tsx**

**Requirements:**
- Display when code extraction fails
- Simulate code block appearance

**Content:**
- Function/script name
- Purpose description
- Input/output specifications
- Algorithm steps as comments
- Note: "Code extraction pending"

**Styling:**
- Match CodeBlock styling
- Monospace font
- Line numbers (fake)
- Syntax highlighting colors (muted)
- Background and border
- Shimmer effect (optional)

#### Task 4.7: Integration in Methodology Page
Create methodology page using math and code components.

**File: app/methodology/page.tsx**

**Requirements:**
- Load methodology content from data
- Display equations and code
- Structured sections

**Sections:**

1. **Signal Acquisition:**
   - Description from PDF
   - Steps list
   - Code snippet for audioread

2. **MATLAB Implementation:**
   - Time domain analysis explanation
   - Code for time domain plotting
   - Frequency domain analysis explanation
   - FFT equation display
   - Code for FFT computation

**Equations to Include:**
- FFT formula
- Single-sided spectrum calculation
- Normalized frequency formula

**Code Blocks:**
- Loading audio files
- Stereo to mono conversion
- Computing FFT
- Plotting spectrums

**Layout:**
- Table of contents
- Section headings
- Paragraphs with equations
- Code blocks with descriptions
- Responsive layout

#### Task 4.8: Testing Math and Code Components
Verify all functionality works correctly.

**Test Equations:**
- Simple inline equation
- Complex display equation
- Equation with special characters
- Invalid LaTeX (error handling)

**Test Equation Copying:**
- Click equation opens menu
- Copy LaTeX works
- Copy MathML works
- Copy plain text works
- Toast notifications appear

**Test Code Blocks:**
- MATLAB syntax highlighting
- Line numbers display
- Code copy button works
- Highlighted lines appear
- Filename displays
- Long code scrolls properly

**Test Placeholders:**
- Equation placeholder renders
- Code placeholder renders
- Descriptions clear
- Styling matches theme

**Methodology Page:**
- All sections display
- Equations render correctly
- Code highlights properly
- Navigation works
- Responsive on mobile

**Deliverables:**
- ✅ MathEquation component working
- ✅ Equation copy menu functional
- ✅ CodeBlock with syntax highlighting
- ✅ Copy button working
- ✅ Equation placeholder created
- ✅ Code placeholder created
- ✅ Methodology page complete
- ✅ All equations render correctly
- ✅ All code highlights properly
- ✅ Copy functionality tested
- ✅ No console errors

---

## 📋 STAGE 5: Audio Components & Custom Players

### Overview
Build custom audio player components with lazy loading and comparison features.

### Tasks

#### Task 5.1: Custom Audio Player Base
Create foundational audio player component.

**File: components/audio/CustomAudioPlayer.tsx**

**Requirements:**
- Client component
- Lazy loading support
- Custom controls
- Theme-aware styling

**Props:**
- src: string (audio file path)
- label: string (display name)
- lazyLoad?: boolean (default true)
- waveform?: boolean (show waveform visualization)

**States:**
- isLoaded: boolean
- isPlaying: boolean
- currentTime: number
- duration: number
- volume: number (0-1)
- playbackRate: number

**Lazy Loading:**
- Initial state: unloaded
- Show preview card with metadata
- "Load Audio" button prominent
- On click: fetch audio, show loading spinner
- Initialize player when loaded
- Don't reload on subsequent plays

**Audio Element:**
- HTML audio element (hidden)
- useRef for audio element
- Event listeners (timeupdate, loadedmetadata, play, pause, ended)
- Cleanup in useEffect

#### Task 5.2: Audio Player Controls
Build the control interface.

**Controls to Include:**

1. **Play/Pause Button:**
   - Circular button
   - Play or Pause icon (lucide-react)
   - Toggle on click
   - Loading state during audio load

2. **Seek Slider:**
   - Radix UI Slider
   - Shows current position
   - Draggable to seek
   - Time display (current / total)
   - Gradient fill for progress

3. **Volume Control:**
   - Icon button (Volume2 icon)
   - Dropdown with slider
   - Mute toggle
   - Remember volume setting

4. **Playback Speed:**
   - Dropdown button
   - Options: 0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x
   - Current speed displayed
   - Apply to audio element

5. **Download Button:**
   - Icon button (Download icon)
   - Downloads original audio file
   - Tooltip "Download original"

6. **Loop Toggle:**
   - Optional
   - Icon button (Repeat icon)
   - Toggle state
   - Visual indication when active

**Layout:**
- Horizontal flexbox
- Play button on left
- Seek slider in center (flex-1)
- Additional controls on right
- Responsive stacking on mobile

#### Task 5.3: Audio Player Visual Design
Style the player to match site theme.

**Container:**
- Border and rounded corners
- Padding
- Background color (subtle)
- Box shadow
- Hover effects

**Preview State (Unloaded):**
- Display label/filename
- File size (if available)
- Duration (if available)
- Waveform placeholder or icon
- "Load Audio" button centered

**Loading State:**
- Spinner animation
- "Loading audio..." message
- Disable controls
- Progress indicator

**Loaded State:**
- Show all controls
- Animated entrance
- Interactive elements enabled

**Playing State:**
- Animated equalizer bars (optional)
- Progress bar animates
- Play button becomes pause

**Theming:**
- Use CSS variables
- Accent color for progress
- Proper contrast
- Dark/light mode variants

#### Task 5.4: Audio Comparison Component
Create side-by-side or toggle comparison.

**File: components/audio/AudioComparison.tsx**

**Requirements:**
- Two audio players
- Comparison modes
- Synchronized controls (optional)

**Props:**
- originalSrc: string
- filteredSrc: string
- label: string (e.g., "Audio 1: Hiss Removal")
- defaultMode?: 'side-by-side' | 'toggle'

**Modes:**

1. **Side-by-Side:**
   - Two players horizontal
   - Labels: "Original (Noisy)" and "Filtered (Clean)"
   - Independent controls
   - Optional sync button (play both)

2. **Toggle:**
   - Single player
   - Toggle switch above
   - Switch between sources
   - Maintain playback position when switching
   - Visual indicator of active source

**Mode Selector:**
- Button group above players
- Two buttons: "Side by Side" | "Toggle"
- Active state styling
- Smooth transition between modes

**Features:**
- Difference metrics display (SNR improvement)
- Visual indicators
- A/B test mode (optional: random order)
- Comparison tips/guide

**Layout:**
- Full width container
- Responsive: side-by-side on desktop, stacked on mobile
- Proper spacing
- Section headings

#### Task 5.5: Audio Waveform Visualization (Optional)
Add waveform display to player.

**File: components/audio/Waveform.tsx**

**Requirements:**
- Canvas-based waveform
- Load and parse audio data
- Display waveform shape
- Interactive (click to seek)

**Implementation:**
- Use Web Audio API
- Decode audio data
- Extract samples
- Draw on canvas
- Show progress overlay

**Features:**
- Hover shows time at position
- Click to seek
- Progress indicator overlays
- Responsive sizing
- Theme colors

**Performance:**
- Lazy load (only when requested)
- Throttle canvas redraws
- Cache computed waveform data

#### Task 5.6: Audio Placeholder
Create placeholder for missing audio files.

**File: components/placeholders/AudioPlaceholder.tsx**

**Requirements:**
- Display when audio file missing
- Provide context about the audio

**Content:**
- Audio label/filename
- Description of audio content
- Expected properties (duration, sample rate, format)
- Waveform placeholder graphic
- Note: "Audio file not available"

**Styling:**
- Match audio player dimensions
- Border and background
- Icon (AudioLines from lucide)
- Muted colors
- Professional appearance

#### Task 5.7: Results Page with Audio
Create results page featuring audio comparisons.

**File: app/results/page.tsx**

**Requirements:**
- Load results content from data
- Display filtered signal analysis
- Audio players for comparisons
- Performance metrics

**Sections:**

1. **Filtered Signal Analysis:**
   - Audio 1: High-Frequency Hiss Removal
   - Audio 2: Tonal Interference Removal
   - Audio 3: Low-Frequency Rumble Removal

Each subsection:
- Description from PDF
- AudioComparison component
- Spectrum plots (placeholder for now)
- Observations and analysis

2. **Audio Quality Assessment:**
   - Subjective listening test results
   - Before/after descriptions
   - Improvement notes

3. **Performance Metrics (Tables for now):**
   - MSE values
   - SNR values
   - Improvements

**Layout:**
- Clear section headings
- Audio comparisons prominent
- Text content around players
- Responsive layout
- Table of contents

#### Task 5.8: Testing Audio Components
Verify all audio functionality works.

**Test Player:**
- Lazy loading triggers correctly
- Audio loads and plays
- All controls work (play, pause, seek, volume, speed)
- Download button works
- Loop functionality
- Time displays correctly
- Progress bar updates
- Theme styling applied

**Test Comparison:**
- Both modes work (side-by-side, toggle)
- Mode switching smooth
- Audio sources switch correctly
- Maintain position on toggle
- Labels clear
- Responsive behavior

**Test Waveform (if implemented):**
- Loads correctly
- Displays waveform
- Click to seek works
- Progress overlay shows
- Theme colors applied

**Test Placeholder:**
- Displays when audio missing
- Information clear
- Styling matches theme

**Results Page:**
- All audio players load
- Comparisons work
- Content displays correctly
- Navigation functional
- Mobile responsive

**Deliverables:**
- ✅ Custom audio player working
- ✅ Lazy loading functional
- ✅ All controls working
- ✅ Audio comparison component
- ✅ Both comparison modes
- ✅ Waveform visualization (optional)
- ✅ Audio placeholder
- ✅ Results page with audio
- ✅ All audio files playable
- ✅ No audio errors
- ✅ Responsive on all devices

---

## 📋 STAGE 6: Charts, Graphs & Data Visualization

### Overview
Build customizable chart components for displaying frequency spectrums, filter responses, and performance metrics.

### Tasks

#### Task 6.1: Chart Data Preparation
Process and structure chart data from PDF extraction.

**Files to Create in /data/charts/:**
- audio1-spectrum-original.json
- audio1-spectrum-filtered.json
- audio2-spectrum-original.json
- audio2-spectrum-filtered.json
- audio3-spectrum-original.json
- audio3-spectrum-filtered.json
- filter1-response.json
- filter2-response.json
- filter3-response.json
- performance-metrics.json

**Data Structure for Spectrum:**
Array of objects:
- frequency: number (Hz)
- magnitude: number (normalized)

**Data Structure for Filter Response:**
Object containing:
- magnitude: array of { frequency, magnitude_db }
- phase: array of { frequency, phase_degrees }

**Data Structure for Metrics:**
Object containing:
- mse: { audio1, audio2, audio3 }
- snr: { audio1, audio2, audio3 } with original, filtered, improvement

**Placeholder Data:**
If extraction fails, generate representative sample data based on PDF descriptions

#### Task 6.2: Base Chart Component
Create foundation for all charts.

**File: components/charts/BaseChart.tsx**

**Requirements:**
- Recharts library
- Responsive container
- Theme-aware styling
- Export functionality

**Features:**
- Proper margins and padding
- Axis labels
- Grid (optional toggle)
- Legend
- Tooltips
- Responsive sizing

**Props:**
- data: array
- xKey: string
- yKey: string
- xLabel: string
- yLabel: string
- title: string
- showGrid?: boolean
- customizable?: boolean

**Theming:**
- Use CSS variables for colors
- Accent color for main line
- Background from theme
- Border colors
- Text colors

#### Task 6.3: Spectrum Plot Component
Create frequency spectrum visualization.

**File: components/charts/SpectrumPlot.tsx**

**Requirements:**
- Line chart
- X-axis: Frequency (Hz)
- Y-axis: Magnitude
- Customizable controls

**Props:**
- data: spectrum data array
- title: string
- originalData?: array (for comparison overlay)
- customizable?: boolean

**Customization Panel (if customizable=true):**

1. **X-Axis Range:**
   - Min frequency input
   - Max frequency input
   - Preset buttons (0-5kHz, 0-10kHz, 0-22kHz)

2. **Y-Axis Scale:**
   - Toggle: Linear | Logarithmic
   - Toggle group component

3. **Display Options:**
   - Show grid checkbox
   - Line color picker
   - Line width slider
   - Show points toggle

4. **Comparison:**
   - If originalData provided
   - Overlay toggle
   - Different colors for each dataset

**Chart Features:**
- Hover tooltip showing exact values
- Cursor crosshair (optional)
- Zoom/pan (optional via recharts)
- Export as PNG button
- Export as SVG button
- Export data as CSV button

**Layout:**
- Controls in collapsible panel above chart
- Chart takes full width
- Responsive height
- Legend if multiple datasets

#### Task 6.4: Filter Response Chart
Create filter frequency response visualization.

**File: components/charts/FilterResponseChart.tsx**

**Requirements:**
- Dual chart (magnitude and phase)
- Synchronized x-axis
- Filter-specific styling

**Props:**
- data: filter response data
- title: string
- filterType: 'lowpass' | 'highpass' | 'bandstop'
- customizable?: boolean

**Charts:**

1. **Magnitude Response:**
   - X: Frequency (Hz)
   - Y: Magnitude (dB)
   - Highlight cutoff frequency
   - Show -3dB line
   - Annotate passband/stopband

2. **Phase Response:**
   - X: Frequency (Hz)
   - Y: Phase (degrees)
   - Different color line
   - Below magnitude chart

**Customization:**
- Frequency range
- Scale options
- Grid visibility
- Annotation toggles
- Color customization

**Features:**
- Shared tooltip across charts
- Vertical line cursor
- Export options
- Responsive layout

#### Task 6.5: Performance Metrics Visualization
Create charts for MSE and SNR data.

**File: components/charts/PerformanceMetrics.tsx**

**Requirements:**
- Bar charts for comparisons
- Tables with visual bars
- Metrics dashboard

**Props:**
- data: performance metrics object
- metric: 'mse' | 'snr' | 'both'

**Visualizations:**

1. **MSE Comparison:**
   - Horizontal bar chart
   - Three bars (Audio 1, 2, 3)
   - Values displayed
   - Color coded by value

2. **SNR Comparison:**
   - Grouped bar chart
   - Three groups (Audio 1, 2, 3)
   - Two bars per group (Original, Filtered)
   - Legend
   - Improvement value displayed

3. **Metrics Table:**
   - Styled table
   - Visual progress bars
   - Color coding (green for improvement, red for degradation)
   - Sortable columns

**Dashboard Layout:**
- Grid of metric cards
- Summary statistics
- Key findings highlighted
- Responsive layout

#### Task 6.6: Chart Controls Component
Create reusable controls panel for customization.

**File: components/charts/ChartControls.tsx**

**Requirements:**
- Collapsible panel
- Form controls
- Real-time updates

**Controls:**

1. **Range Controls:**
   - Number inputs for min/max
   - Slider components
   - Preset buttons

2. **Toggle Controls:**
   - Checkbox components
   - Switch components
   - Toggle groups

3. **Color Controls:**
   - Color picker input
   - Preset color swatches
   - Accent color option

4. **Export Controls:**
   - Button group
   - PNG, SVG, CSV options
   - "Reset to defaults" button

**Features:**
- Collapsible sections
- Save preferences (localStorage)
- Responsive layout
- Theme styling

**Implementation:**
- Use Radix UI components
- State management for controls
- Callback props to update chart
- Debounced updates for performance

#### Task 6.7: Chart Placeholder
Create placeholder for missing chart data.

**File: components/placeholders/ChartPlaceholder.tsx**

**Requirements:**
- Professional appearance
- Descriptive content

**Content:**
- Chart title
- Chart type description
- What data would be shown
- Axis labels and ranges
- Visual representation (simple shape)
- Note: "Chart data unavailable"

**Visual:**
- Border and rounded corners
- Grid background pattern
- Chart icon (BarChart from lucide)
- Axes indicators
- Muted colors

**Styling:**
- Match chart dimensions
- Theme colors
- Proper spacing
- Responsive

#### Task 6.8: Design Page with Charts
Create design page featuring filter responses.

**File: app/design/page.tsx**

**Requirements:**
- Load design content from data
- Display filter design calculations
- Show filter response charts

**Sections:**

1. **Noise Identification:**
   - Audio 1, 2, 3 analysis
   - Spectrum plots showing noise
   - Tabbed interface or accordion

2. **Filter Selection and Design:**
   - Filter 1: Low-Pass (Audio 1)
   - Filter 2: Notch (Audio 2)
   - Filter 3: High-Pass (Audio 3)

Each filter section:
- Design calculations (equations)
- Parameters table
- Justification text

3. **Filter Implementation:**
   - MATLAB code snippets
   - Filter response charts
   - Frequency response analysis

**Layout:**
- Table of contents
- Tabbed interface for three filters
- Charts prominently displayed
- Code and equations integrated
- Responsive design

#### Task 6.9: Results Page Charts
Add spectrum comparison charts to results page.

**Update: app/results/page.tsx**

**Add to Each Audio Section:**
- Original spectrum plot
- Filtered spectrum plot
- Side-by-side comparison
- Difference visualization

**Spectrum Comparison:**
- Use SpectrumPlot component
- Overlay mode showing both
- Different colors for original vs filtered
- Annotations highlighting changes

**Performance Metrics:**
- Replace placeholder tables with PerformanceMetrics component
- Visual charts
- Interactive metrics
- Summary cards

**Layout Updates:**
- Integrate charts with audio players
- Logical flow of information
- Proper spacing
- Responsive grid

#### Task 6.10: Testing Charts and Visualizations
Verify all chart functionality.

**Test Spectrum Plots:**
- Data displays correctly
- Customization controls work
- Range adjustments update chart
- Scale toggle works
- Export functions work
- Overlay comparison works
- Theme colors applied
- Responsive on all sizes

**Test Filter Response:**
- Magnitude chart displays
- Phase chart displays
- Synchronized tooltips
- Annotations visible
- Cutoff frequencies highlighted
- Export functions work

**Test Performance Metrics:**
- Bar charts render
- Values accurate
- Table displays correctly
- Color coding appropriate
- Interactive elements work

**Test Chart Controls:**
- All inputs functional
- Updates apply real-time
- Reset to defaults works
- Preferences save
- Collapsible sections work

**Test Placeholders:**
- Display when data missing
- Information clear
- Styling matches

**Test Design Page:**
- All charts load
- Tabs/accordion works
- Navigation smooth
- Content displays
- Responsive layout

**Test Results Page:**
- Spectrum comparisons work
- Metrics visualizations display
- Integration with audio works
- Page layout logical

**Deliverables:**
- ✅ Chart data prepared
- ✅ Base chart component
- ✅ Spectrum plot with customization
- ✅ Filter response charts
- ✅ Performance metrics visualization
- ✅ Chart controls working
- ✅ Chart placeholder
- ✅ Design page with charts
- ✅ Results page updated with charts
- ✅ All charts responsive
- ✅ Export functionality working
- ✅ No chart errors

---

## 📋 STAGE 7: Table of Contents & Advanced Navigation

### Overview
Implement dynamic table of contents, scroll spy, breadcrumbs, and enhanced navigation features.

### Tasks

#### Task 7.1: Table of Contents Component
Create dynamic TOC based on page headings.

**File: components/TableOfContents.tsx**

**Requirements:**
- Client component
- Automatically extract headings
- Intersection Observer for active section
- Sticky positioning

**Implementation:**

1. **Extract Headings:**
   - useEffect on mount
   - Query all h2, h3, h4 elements
   - Build hierarchical structure
   - Store in state

2. **Generate IDs:**
   - Ensure all headings have IDs
   - Auto-generate if missing
   - Use slugified title
   - Prevent duplicates

3. **Track Active Section:**
   - Intersection Observer
   - Watch all headings
   - Update active ID in state
   - Threshold and rootMargin configuration

**TOC Item Interface:**
- id: string
- title: string
- level: number (2, 3, or 4)
- children?: TocItem[]

**Features:**
- Hierarchical indentation
- Active section highlighted
- Smooth scroll on click
- Collapsible subsections (optional)
- Progress indicator

**Styling:**
- Sticky position (top offset for navbar)
- Max height with scroll
- Fade gradient at bottom
- Border on left
- Active item with accent color
- Hover states

#### Task 7.2: TOC Active State Logic
Implement scroll spy functionality.

**Intersection Observer Configuration:**
- root: null (viewport)
- rootMargin: '-100px 0px -80% 0px'
- threshold: 0

**Logic:**
- Observer callback updates active ID
- When heading intersects, set as active
- Handles multiple headings intersecting
- Prefers topmost visible heading

**Active State Styling:**
- Border indicator on left
- Accent color text
- Bold font weight
- Smooth transition
- Background highlight (subtle)

**Keyboard Navigation:**
- Tab through TOC items
- Enter to navigate
- Arrow keys to move between items
- Escape to return focus to content

#### Task 7.3: TOC Layout Integration
Add TOC to appropriate pages.

**Desktop Layout:**
- Right sidebar (separate from main sidebar)
- Sticky position
- Visible on screens > 1024px
- Width: 200-250px

**Tablet/Mobile:**
- Hide desktop TOC
- Add floating button (bottom-right)
- Opens drawer/modal with TOC
- Drawer component with animation

**Pages to Include TOC:**
- Introduction (if subsections substantial)
- Methodology
- Design
- Results
- Discussion
- Conclusion

**Integration:**
- Wrap page content in layout with TOC
- Adjust main content max-width
- Proper spacing and margins
- Responsive breakpoints

#### Task 7.4: Breadcrumb Navigation
Create breadcrumb component for current location.

**File: components/navigation/Breadcrumbs.tsx**

**Requirements:**
- Show current page hierarchy
- Clickable navigation links
- Responsive display

**Structure:**
- Home > Section > Subsection (if applicable)
- Separator between items (ChevronRight icon)
- Current page not clickable

**Implementation:**
- Use usePathname hook
- Parse pathname to build crumbs
- Map segments to labels
- Generate links for each segment

**Features:**
- Schema.org breadcrumb markup
- Hover effects on links
- Truncate on mobile
- Dropdown for long paths (mobile)

**Styling:**
- Subtle text color
- Accent on hover
- Separator icons
- Padding and spacing
- Theme aware

#### Task 7.5: Scroll Progress Indicator
Add reading progress bar.

**File: components/interactive/ScrollProgress.tsx**

**Requirements:**
- Client component
- Track scroll progress
- Visual indicator

**Implementation:**
- useEffect with scroll listener
- Calculate percentage scrolled
- Update state
- Debounce for performance

**Calculation:**
```
progress = (scrollTop / (scrollHeight - clientHeight)) * 100
```

**Visual Options:**

1. **Top Bar:**
   - Fixed to top
   - Full width
   - Height: 2-4px
   - Gradient or solid accent color
   - Smooth transition

2. **Circular (Optional):**
   - In navbar or corner
   - Circular progress
   - Percentage display

**Features:**
- Smooth animation
- Accent color
- Z-index above content
- Minimal performance impact

#### Task 7.6: Quick Navigation Menu
Create quick access navigation.

**File: components/navigation/QuickNav.tsx**

**Requirements:**
- Floating action button
- Quick links menu
- Keyboard shortcuts

**Trigger:**
- Floating button (bottom-right on mobile, or in navbar)
- Icon: Menu or Navigation icon
- Badge with shortcut hint (⌘K or Ctrl+K)

**Menu Content:**
- All main sections
- Search box (placeholder for now)
- Theme toggle
- Download PDF
- Share page

**Keyboard Shortcut:**
- Listen for Cmd/Ctrl + K
- Open menu modal/popover
- Focus search
- Escape to close

**Implementation:**
- Dialog or Command menu pattern
- Fuzzy search through sections
- Navigate on selection
- Recent pages list

#### Task 7.7: Anchor Link Handling
Improve anchor link behavior.

**Features:**

1. **Smooth Scroll:**
   - CSS: scroll-behavior: smooth
   - Or JavaScript implementation
   - Account for sticky header offset

2. **Highlight Target:**
   - On navigation to anchor
   - Flash/highlight the target section
   - Animation (pulse or border)
   - Timeout to remove

3. **Copy Anchor Link:**
   - Button on heading hover
   - Copies full URL with hash
   - Toast notification
   - Share functionality

**Heading Anchor Links:**
- Add link icon on heading hover
- Small icon (Link icon)
- Positioned to right of heading
- Copies URL to clipboard
- Smooth appearance animation

#### Task 7.8: Enhanced Sidebar Navigation
Improve main sidebar with active states and icons.

**Update: components/layout/Sidebar.tsx**

**Enhancements:**

1. **Active State:**
   - Highlight current page
   - Accent color indicator
   - Background highlight
   - Icon color change

2. **Progress Indicators:**
   - Dot or checkmark for visited pages
   - Reading progress per section
   - Store in localStorage

3. **Expandable Subsections:**
   - If section has subsections
   - Chevron to expand/collapse
   - Smooth animation
   - Persist expansion state

4. **Icons:**
   - Add icon for each section
   - Home: Home icon
   - Introduction: BookOpen
   - Methodology: FlaskConical
   - Design: Settings
   - Results: BarChart3
   - Discussion: MessageSquare
   - Conclusion: CheckCircle
   - References: Link
   - Appendix: FileText

**Scroll Spy:**
- Track which section is visible
- Update sidebar active state
- Smooth transitions

#### Task 7.9: Integration & Testing
Integrate all navigation components and test.

**Add Components:**
- TOC to all major pages
- Breadcrumbs below navbar
- Scroll progress to root layout
- Quick nav to layout
- Enhanced sidebar

**Test TOC:**
- Headings extracted correctly
- Active section updates on scroll
- Click navigation works
- Smooth scrolling
- Responsive behavior (drawer on mobile)
- Keyboard navigation

**Test Breadcrumbs:**
- Correct path displayed
- Links work
- Responsive truncation
- Styling matches theme

**Test Scroll Progress:**
- Accurate percentage
- Smooth updates
- Doesn't impact performance
- Theme colors

**Test Quick Nav:**
- Keyboard shortcut works
- Menu opens/closes
- Search functional (if implemented)
- Navigation works

**Test Anchor Links:**
- Smooth scroll to anchor
- Highlight effect works
- Copy link works
- Toast notifications

**Test Enhanced Sidebar:**
- Active states correct
- Icons display
- Progress indicators
- Expandable sections (if implemented)
- Responsive behavior

**Deliverables:**
- ✅ Dynamic TOC working
- ✅ Scroll spy active states
- ✅ TOC responsive on all devices
- ✅ Breadcrumbs displaying
- ✅ Scroll progress indicator
- ✅ Quick navigation menu
- ✅ Anchor link enhancements
- ✅ Enhanced sidebar
- ✅ All navigation smooth
- ✅ Keyboard shortcuts working
- ✅ No navigation errors

---

## 📋 STAGE 8: Content Population & Polish

### Overview
Complete all remaining content pages, add animations, polish interactions, and prepare for deployment.

### Tasks

#### Task 8.1: Discussion Page
Create discussion section with analysis and limitations.

**File: app/discussion/page.tsx**

**Requirements:**
- Load discussion content from data
- Structure with accordion or sections
- Professional analysis presentation

**Sections:**

1. **Effectiveness of Designed Filters:**
   - Audio 1: Low-pass filter analysis
   - Audio 2: Band-stop filter analysis
   - Audio 3: High-pass filter analysis
   - Comparison and conclusions

2. **Filter Design Tool:**
   - MATLAB Filter Designer App section
   - Screenshots or descriptions
   - Benefits and usage

3. **Limitations of the Approach:**
   - Accordion component
   - Each limitation as expandable item
   - Detailed explanations
   - Visual examples

4. **Suggested Improvements:**
   - Machine learning approaches
   - Adaptive filtering
   - Multi-band processing
   - Other techniques

**Components:**
- Accordion for limitations
- Cards for effectiveness analysis
- Comparison tables
- Code snippets for improvements

**Layout:**
- Table of contents
- Clear section divisions
- Proper typography
- Responsive design

#### Task 8.2: Conclusion Page
Create conclusion section summarizing the project.

**File: app/conclusion/page.tsx**

**Requirements:**
- Load conclusion content
- Summary cards with highlights
- Timeline or process visualization

**Sections:**

1. **Project Summary:**
   - Overview of what was accomplished
   - Key objectives met
   - Brief recap

2. **Key Findings:**
   - Important discoveries
   - Success metrics
   - Insights gained
   - Bullet points or cards

3. **Technical Accomplishments:**
   - What was built/implemented
   - Technologies used successfully
   - Skills demonstrated
   - Timeline visualization

4. **Learning Outcomes:**
   - Knowledge gained
   - Skills developed
   - Challenges overcome
   - Personal growth

5. **Practical Applications:**
   - Real-world uses
   - Industry applications
   - Future potential
   - Impact

**Visual Elements:**
- Stats cards with animations
- Timeline component (optional)
- Achievement badges (optional)
- Quote callouts
- Summary infographic

**Layout:**
- Engaging visual hierarchy
- Mix of text and visuals
- Proper spacing
- Responsive design

#### Task 8.3: References Page
Create styled references/bibliography.

**File: app/references/page.tsx**

**Requirements:**
- Load references from data
- Formatted bibliography
- External link handling

**Reference Format:**
- Numbered list
- Author, title, source, date
- Clickable links to external resources
- Proper citation format (IEEE, APA, or similar)

**Features:**
- Copy citation button for each
- Filter/search references (optional)
- Category grouping (books, websites, papers)
- External link icon
- Open in new tab

**Styling:**
- Clean typography
- Proper indentation
- Hover effects
- Accent color for links
- Numbered markers

#### Task 8.4: Appendix Page
Create appendix with full code listings.

**File: app/appendix/page.tsx**

**Requirements:**
- Display full MATLAB code
- Syntax highlighting
- Code organization

**Content:**
- Complete MATLAB script from PDF
- Organized by sections
- Comments preserved
- Line numbers

**Features:**
- Code block with full highlighting
- Copy entire script button
- Download as .m file button
- Collapsible sections
- Line number linking

**Sections:**
- Signal Acquisition
- Frequency Analysis
- Filter Design
- Filter Application
- Performance Evaluation

**Layout:**
- Table of contents for code sections
- Full-width code blocks
- Sticky section headers
- Proper spacing

#### Task 8.5: Animation Integration
Add scroll-triggered animations with GSAP.

**File: lib/animations.ts**

**Requirements:**
- GSAP with ScrollTrigger plugin
- Reusable animation functions
- Performance optimized

**Animation Types:**

1. **Fade In:**
   - Elements fade in on scroll
   - From opacity 0 to 1
   - Slight upward movement

2. **Stagger:**
   - Multiple elements in sequence
   - Used for lists, cards
   - Delay between each

3. **Reveal:**
   - Slide in from side
   - Used for sections
   - With fade effect

4. **Count Up:**
   - Number animations
   - Used for statistics
   - Easing function

**ScrollTrigger Configuration:**
- trigger: element
- start: "top 80%"
- end: "bottom 20%"
- toggleActions: "play none none reverse"

**Apply to:**
- Section headings
- Cards and containers
- Lists
- Statistics/numbers
- Charts on reveal

#### Task 8.6: Micro-interactions
Add subtle animations to enhance UX.

**Button Interactions:**
- Hover scale (scale: 1.05)
- Active press (scale: 0.95)
- Loading spinner
- Success checkmark

**Card Interactions:**
- Hover lift (translateY: -4px)
- Shadow increase
- Border glow
- Tilt effect (subtle)

**Link Interactions:**
- Underline on hover
- Color transition
- Icon movement

**Form Interactions:**
- Focus ring
- Label float
- Error shake
- Success pulse

**Implementation:**
- Framer Motion for component animations
- CSS transitions for simple effects
- Tailwind classes for hovers
- Custom animations for complex

#### Task 8.7: Content Refinement
Review and polish all content.

**Tasks:**

1. **Typography:**
   - Consistent heading hierarchy
   - Proper line heights
   - Readable paragraph widths (65ch)
   - Font size scales

2. **Spacing:**
   - Consistent padding/margins
   - Proper section gaps
   - Component spacing
   - White space balance

3. **Color Consistency:**
   - Accent color usage
   - Text contrast ratios
   - Border colors
   - Background variations

4. **Content Formatting:**
   - Proofread all text
   - Format equations properly
   - Code indentation
   - Table alignment

5. **Image Placeholders:**
   - Ensure all have descriptive content
   - Proper sizing
   - Alt text
   - Professional appearance

6. **Metadata:**
   - All pages have proper titles
   - Descriptions accurate
   - Keywords relevant
   - Open Graph tags

#### Task 8.8: Accessibility Enhancements
Ensure WCAG AA compliance.

**Keyboard Navigation:**
- Test tab order logical
- All interactive elements reachable
- Focus indicators visible
- Skip links functional

**Screen Reader:**
- Test with NVDA or JAWS
- ARIA labels where needed
- Landmark regions defined
- Alt text on images
- Form labels associated

**Color Contrast:**
- Run axe DevTools audit
- Fix any contrast issues
- Test both themes
- Ensure focus indicators visible

**Motion:**
- Respect prefers-reduced-motion
- Add motion toggle in settings
- Reduce animations if preferred
- Maintain usability without motion

**Content:**
- Heading hierarchy logical
- Lists properly marked up
- Tables have headers
- Links descriptive

#### Task 8.9: Performance Optimization
Optimize for fast loading and smooth interactions.

**Code Splitting:**
- Dynamic imports for heavy components
- Route-based splitting (automatic)
- Lazy load charts and audio
- Defer non-critical scripts

**Assets:**
- Optimize images (if any added)
- Minimize CSS/JS
- Remove unused code
- Tree-shake dependencies

**Loading:**
- Prioritize above-fold content
- Preload critical assets
- Lazy load images
- Intersection observer for charts

**Caching:**
- Leverage browser caching
- Service worker (optional)
- localStorage for preferences
- Memoize expensive operations

**Lighthouse Audit:**
- Run Lighthouse in DevTools
- Aim for >90 in all categories
- Fix identified issues
- Re-test after changes

#### Task 8.10: Cross-Browser Testing
Test on multiple browsers and devices.

**Browsers:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Devices:**
- Desktop (1920x1080, 1366x768)
- Laptop (1440x900)
- Tablet (iPad, Android tablet)
- Mobile (iPhone, Android phone)
- Orientations (portrait, landscape)

**Test:**
- All pages load correctly
- Navigation works
- Interactions functional
- Animations smooth
- Audio plays
- Charts display
- Math renders
- Code highlights
- Theme persists
- No console errors

**Issues to Check:**
- Safari-specific bugs
- iOS Safari quirks
- Firefox rendering differences
- Touch interactions on mobile
- Responsive breakpoints

**Deliverables:**
- ✅ Discussion page complete
- ✅ Conclusion page complete
- ✅ References page styled
- ✅ Appendix page with code
- ✅ Scroll animations added
- ✅ Micro-interactions polished
- ✅ Content refined
- ✅ Accessibility compliant
- ✅ Performance optimized
- ✅ Cross-browser tested
- ✅ All pages complete
- ✅ No errors or warnings

---

## 📋 STAGE 9: Final Polish & Deployment

### Overview
Final refinements, documentation, deployment configuration, and launch to GitHub Pages.

### Tasks

#### Task 9.1: Final Visual Polish
Last refinements to visual design.

**Review Every Page:**
- Consistent styling
- Proper alignment
- Color harmony
- Visual hierarchy
- White space balance

**Polish Items:**

1. **Hover States:**
   - All buttons have hover
   - Links have underlines or color change
   - Cards lift on hover
   - Smooth transitions

2. **Loading States:**
   - All async operations show loading
   - Skeleton screens appropriate
   - Spinners where needed
   - Smooth transitions

3. **Empty States:**
   - Handle no data gracefully
   - Helpful messages
   - Suggest actions
   - Professional appearance

4. **Transitions:**
   - Page transitions smooth
   - Theme changes smooth
   - Modal/dialog animations
   - Menu animations

5. **Responsive:**
   - Test all breakpoints
   - Mobile menu works
   - Touch targets sized properly
   - No horizontal scroll

#### Task 9.2: Documentation
Create comprehensive documentation.

**README.md:**

```markdown
# Audio Signal Denoising System

Portfolio website for DSP Mini Project on audio noise removal using MATLAB.

## Overview
[Description from project]

## Features
- Interactive audio comparisons
- Mathematical equation display
- Syntax-highlighted code
- Customizable charts
- Dark/light theme
- Responsive design

## Technologies
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- KaTeX
- Shiki
- Recharts
- Framer Motion
- GSAP

## Getting Started

### Prerequisites
- Node.js 18+
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

### Deployment
[Deployment instructions]

## Project Structure
[Directory structure explanation]

## License
[License information]

## Contact
[Contact information]
```

**CONTRIBUTING.md** (if open source):
- How to contribute
- Code standards
- Pull request process
- Issue templates

**CHANGELOG.md:**
- Version history
- Major changes
- Bug fixes
- New features

#### Task 9.3: Configuration for GitHub Pages
Configure Next.js for static deployment.

**Update next.config.mjs:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/repo-name' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
```

**Environment Variables:**
Create `.env.local`:
```
NEXT_PUBLIC_BASE_PATH=/repo-name
NEXT_PUBLIC_SITE_URL=https://username.github.io/repo-name
```

**Update package.json scripts:**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "export": "next build && next export"
  }
}
```

#### Task 9.4: GitHub Actions Workflow
Set up automated deployment.

**File: .github/workflows/deploy.yml**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build
        run: pnpm build
        env:
          NODE_ENV: production
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v3
```

**Repository Settings:**
- Enable GitHub Pages
- Source: GitHub Actions
- Configure custom domain (if applicable)

#### Task 9.5: Pre-deployment Testing
Final testing before launch.

**Functionality Checklist:**
- [ ] All pages load
- [ ] Navigation works
- [ ] Sidebar toggles
- [ ] Theme persists
- [ ] Audio plays
- [ ] Charts display
- [ ] Code highlights
- [ ] Math renders
- [ ] Copy functions work
- [ ] Download buttons work
- [ ] External links work
- [ ] Forms work (if any)
- [ ] Search works (if implemented)
- [ ] Responsive on all devices
- [ ] No console errors
- [ ] No 404s

**Build Test:**
```bash
pnpm build
```
- Build completes successfully
- No build errors
- Check output size
- Verify /out directory created

**Local Static Test:**
```bash
cd out
python -m http.server 8000
# or
npx serve
```
- Test locally served static site
- All features work
- Assets load correctly
- Paths resolve properly

**Performance:**
- Run Lighthouse audit
- All scores >90
- Load time <3s
- No performance warnings

**Accessibility:**
- Run axe DevTools
- No violations
- Screen reader test
- Keyboard navigation works

#### Task 9.6: SEO Optimization
Ensure search engine optimization.

**Metadata Review:**
- All pages have titles
- All pages have descriptions
- Keywords relevant
- Canonical URLs set

**Open Graph Tags:**
- og:title
- og:description
- og:image (create social share image)
- og:url
- og:type

**Twitter Cards:**
- twitter:card
- twitter:title
- twitter:description
- twitter:image

**Structured Data:**
- Add JSON-LD schema
- BreadcrumbList schema
- WebSite schema
- Organization schema

**Sitemap:**
- Verify sitemap.xml accessible
- All URLs present
- Valid XML format

**Robots.txt:**
- Verify robots.txt accessible
- Sitemap referenced
- No blocking of important pages

#### Task 9.7: Analytics Setup (Optional)
Add analytics tracking.

**Options:**
- Google Analytics 4
- Plausible (privacy-friendly)
- Umami (self-hosted)
- Vercel Analytics

**Implementation:**
- Add tracking script
- Configure events
- Track page views
- Track interactions
- Respect Do Not Track
- GDPR compliance

**Events to Track:**
- Page views
- Audio plays
- Chart interactions
- Downloads
- External link clicks
- Theme changes

#### Task 9.8: Deployment
Deploy to GitHub Pages.

**Steps:**

1. **Final Commit:**
   - Commit all changes
   - Push to main branch
   - Ensure clean git status

2. **Trigger Build:**
   - GitHub Actions runs automatically
   - Monitor workflow progress
   - Check for errors

3. **Verify Deployment:**
   - Visit deployed URL
   - Test all functionality
   - Check browser console
   - Verify assets load

4. **DNS Configuration (if custom domain):**
   - Add CNAME record
   - Configure in repository settings
   - Wait for DNS propagation
   - Test custom domain

#### Task 9.9: Post-Deployment Verification
Comprehensive testing of live site.

**Test Everything:**
- [ ] Visit all pages
- [ ] Test all interactions
- [ ] Audio files play
- [ ] Charts render
- [ ] Math displays
- [ ] Code highlights
- [ ] Theme works
- [ ] Responsive design
- [ ] Performance good
- [ ] No broken links
- [ ] No missing assets
- [ ] Analytics tracking (if implemented)
- [ ] Sitemap accessible
- [ ] Social sharing works

**Browser Testing:**
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers

**Performance:**
- Run Lighthouse on live site
- Check Google PageSpeed Insights
- Verify Core Web Vitals

**Fix Any Issues:**
- Document problems
- Fix in code
- Redeploy
- Re-test

#### Task 9.10: Launch Checklist & Handoff
Final steps and documentation.

**Launch Checklist:**
- [ ] All content complete
- [ ] All features working
- [ ] All pages tested
- [ ] Performance optimized
- [ ] Accessibility compliant
- [ ] SEO configured
- [ ] Analytics set up
- [ ] Documentation complete
- [ ] Deployed successfully
- [ ] Live site tested
- [ ] No critical issues

**Handoff Documentation:**

Create **HANDOFF.md**:
```markdown
# Project Handoff

## Deployed URL
[Live site URL]

## Repository
[GitHub repository URL]

## Key Features
- Feature 1
- Feature 2
- ...

## Architecture
[Brief architecture overview]

## Content Management
[How to update content]

## Maintenance
[Ongoing maintenance needs]

## Known Issues
[Any known limitations]

## Future Enhancements
[Suggested improvements]

## Support
[Contact information]
```

**Celebrate! 🎉**
- Project complete
- Portfolio live
- Showcase your work
- Share with the world

**Deliverables:**
- ✅ Visual polish complete
- ✅ Documentation written
- ✅ GitHub Pages configured
- ✅ Deployment workflow set up
- ✅ Pre-deployment testing passed
- ✅ SEO optimized
- ✅ Analytics configured (optional)
- ✅ Deployed to GitHub Pages
- ✅ Post-deployment verified
- ✅ Launch checklist complete
- ✅ Handoff documentation ready
- ✅ **PROJECT COMPLETE!**

---

## 🎯 Summary of All Stages

### Stage Progression:
0. **PDF Extraction & Setup** - Foundation and content extraction
1. **Core Layout** - Sidebar, navbar, footer, basic routing
2. **Theme System** - Dark/light mode, interactive elements
3. **Error Handling** - Error pages, loading states, sitemap
4. **Math & Code** - Equations and syntax highlighting
5. **Audio Components** - Custom players and comparisons
6. **Charts & Visualization** - Interactive data displays
7. **Advanced Navigation** - TOC, breadcrumbs, scroll spy
8. **Content & Polish** - Complete pages, animations, accessibility
9. **Deployment** - Final testing, optimization, launch

### Total Deliverables:
- ✅ 9+ fully functional pages
- ✅ 30+ reusable components
- ✅ Theme system with 5+ accent colors
- ✅ Custom audio players
- ✅ Interactive charts
- ✅ Math equation rendering
- ✅ Code syntax highlighting
- ✅ Full navigation system
- ✅ Error handling
- ✅ Loading states
- ✅ Accessibility compliant
- ✅ Performance optimized
- ✅ Deployed to GitHub Pages

---

This multi-stage approach breaks down the complex project into manageable chunks, progressing from easier foundational tasks to more complex interactive features, ensuring steady progress and easier debugging.