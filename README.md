# PDF Content Extraction Project

## Overview
This project extracts structured content (headings, body text, equations, code snippets, tables, and figures) from PDF documents.

## Completed Tasks

### Stage 0: Setup and Initial Extraction

#### Task 0.1: PDF Parsing and Content Extraction
**Status:** ✅ Completed

**Description:**
- Created a PDF extraction script (`scripts/extract-pdf.js`) using the `pdf-parse` library
- Fixed compatibility issues with pdf-parse v2.4.5 (updated from deprecated function-based API to class-based API)
- Successfully processed the 41-page Guidance.pdf document

**Output Files Generated:**
All output files are stored in the `/data` directory:

| File | Description |
|------|-------------|
| `content.json` | Structured JSON with all extracted content sections |
| `raw-text.txt` | Plain text version of the entire document |
| `equations.json` | Extracted mathematical equations |
| `code-snippets.json` | MATLAB code snippets found in the document |
| `tables.json` | Table data extracted from the PDF |
| `figures.json` | Figure metadata and references |
| `extraction-log.txt` | Detailed log of the extraction process |

**Extraction Statistics:**
- **Section Headings:** 67
- **Body Text Paragraphs:** 41
- **MATLAB Code Snippets:** 3
- **Figure Metadata Entries:** 40

**Technical Notes:**
- The script uses Node.js with the `pdf-parse` library
- Compatible with pdf-parse v2.4.5+ (class-based API)
- Handles multi-column layouts and complex PDF structures

#### Task 0.2: HTML Structure Generation and Content Organization
**Status:** ✅ Completed

**Description:**
- Created an HTML generation script (`scripts/generate-html.js`) using the `cheerio` library
- Transformed extracted JSON content into a structured, styled HTML report
- Organized content hierarchically with table of contents, sections, and page markers
- Generated both HTML and structured JSON outputs

**Output Files Generated:**
| File | Description |
|------|-------------|
| `report.html` | Fully styled HTML report with navigation and formatting |
| `structured-content.json` | Hierarchically organized JSON with metadata and sections |

**Features:**
- **Table of Contents:** Auto-generated with anchor links to all sections
- **Styled Layout:** Professional CSS styling with responsive design
- **Content Organization:** 
  - Headings organized by level (H1, H2, H3)
  - Body text distributed across pages
  - Code snippets in syntax-highlighted blocks
  - Figures with captions and descriptions
  - Page markers for reference
- **Metadata:** Includes generation timestamp, source info, and content statistics

**Content Statistics:**
- Total Sections: 67 headings organized hierarchically
- Total Paragraphs: 41 body text sections
- Code Snippets: 3 MATLAB code blocks
- Figures: 40 figure references with metadata

## Project Structure
```
/workspace
├── Guidance.md          # Source guidance document
├── scripts/
│   ├── extract-pdf.js   # PDF extraction script (Task 0.1)
│   └── generate-html.js # HTML generation script (Task 0.2)
├── data/                # Extracted and structured content
│   ├── content.json         # Raw extracted content (Task 0.1)
│   ├── raw-text.txt         # Plain text version (Task 0.1)
│   ├── equations.json       # Mathematical equations (Task 0.1)
│   ├── code-snippets.json   # MATLAB code snippets (Task 0.1)
│   ├── tables.json          # Table data (Task 0.1)
│   ├── figures.json         # Figure metadata (Task 0.1)
│   ├── extraction-log.txt   # Extraction process log (Task 0.1)
│   ├── structured-content.json # Hierarchical JSON (Task 0.2)
│   └── report.html          # Styled HTML report (Task 0.2)
├── package.json         # Node.js dependencies
└── README.md            # This file
```

## Dependencies
- Node.js
- pdf-parse (^2.4.5)
- cheerio (for HTML generation)

## Usage
To run the PDF extraction (Task 0.1):
```bash
node scripts/extract-pdf.js
```

To generate HTML structure (Task 0.2):
```bash
node scripts/generate-html.js
```

## Next Steps
- Stage 1: [Pending]
