# DSP Mini Project Website

A professional, interactive portfolio website for a **Digital Signal Processing Mini Project** focused on audio noise removal using MATLAB.

## 🚀 Features

- **Interactive Audio Players** - Compare original noisy audio with filtered results
- **Customizable Charts** - Spectrum plots and filter response visualizations
- **Math Equations** - KaTeX-rendered mathematical notation
- **Syntax Highlighting** - MATLAB code blocks with Shiki
- **Theme System** - Dark/Light mode with multiple accent colors
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Click Spark Effects** - Interactive particle effects on click
- **Custom Context Menu** - Right-click menu with useful actions

## 📁 Project Structure

```
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Landing page
│   ├── introduction/        # Introduction section
│   ├── methodology/         # Methodology section
│   ├── design/              # Filter design section
│   ├── results/             # Results and audio comparison
│   ├── discussion/          # Discussion section
│   ├── conclusion/          # Conclusion section
│   ├── references/          # References section
│   └── appendix/            # MATLAB code and resources
├── components/              # React components
│   ├── ui/                  # Base UI components
│   ├── layout/              # Layout components (Sidebar, Navbar, Footer)
│   ├── interactive/         # ClickSparkEffect, CustomContextMenu
│   ├── theme/               # ThemeProvider, ThemeToggle
│   └── ...
├── lib/                     # Utilities, stores, constants
│   ├── utils.ts             # Utility functions
│   ├── types.ts             # TypeScript type definitions
│   ├── constants.ts         # Site constants
│   ├── theme-store.ts       # Zustand theme store
│   └── hooks/               # Custom React hooks
├── public/                  # Static assets
│   ├── audio/               # Audio files (noisy and filtered)
│   ├── fonts/               # Custom fonts
│   └── images/              # Images and icons
├── styles/                  # Global CSS
└── data/                    # Extracted PDF content (JSON)
```

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI primitives
- **State Management:** Zustand
- **Animations:** Framer Motion, GSAP
- **Math Rendering:** KaTeX
- **Code Highlighting:** Shiki
- **Audio:** Web Audio API

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- PNPM 8+

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 🎨 Configuration

### Theme Customization

The theme system supports:
- Light/Dark/System modes
- 7 accent colors: Blue, Purple, Green, Orange, Pink, Cyan, Red

Theme preferences are persisted in localStorage.

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_BASE_PATH=/dsp-mini-project
NEXT_PUBLIC_SITE_URL=https://yourusername.github.io
```

## 📄 Content Extraction

To extract content from the PDF report:

```bash
pnpm extract:pdf
```

This will process `MP_Full-Report.pdf` and generate structured JSON files in the `/data` directory.

## 🚢 Deployment

### GitHub Pages

1. Update `next.config.mjs` with your repository name as `basePath`
2. Build the static site:
   ```bash
   pnpm build
   ```
3. Deploy the `/out` directory to GitHub Pages

### GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm build
      
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px  
- **Desktop:** > 1024px
- **Wide Desktop:** > 1536px

## ♿ Accessibility

This project aims for WCAG 2.1 Level AA compliance:
- Keyboard navigation support
- Screen reader friendly
- Color contrast requirements
- Semantic HTML structure
- ARIA labels where needed

## 📊 Performance Targets

- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- Lighthouse Score: > 90

## 📝 License

MIT License - feel free to use this project for educational purposes.

## 👨‍💻 Author

Undergraduate Research Project - Digital Signal Processing

---

Built with ❤️ using Next.js, Tailwind CSS, and TypeScript
