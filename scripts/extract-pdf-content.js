/**
 * PDF Content Extraction Script
 * 
 * Task 0.1: Comprehensive PDF extraction system that processes the provided document
 * and saves structured data.
 * 
 * Features:
 * - Extracts section headings, body text, equations, MATLAB code, tables, and figures
 * - Uses pdf-parse library for text extraction
 * - Implements pattern matching for LaTeX equations and code blocks
 * - Handles errors gracefully with detailed logging
 * - Outputs structured JSON files to /data directory
 */

const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

// Configuration
const PDF_PATH = path.join(__dirname, '../public/MP_Full-Report.pdf');
const DATA_DIR = path.join(__dirname, '../data');

// Logger utility
class Logger {
  constructor() {
    this.logs = [];
  }

  info(message) {
    const timestamp = new Date().toISOString();
    const log = `[INFO] ${timestamp} - ${message}`;
    console.log(log);
    this.logs.push(log);
  }

  error(message) {
    const timestamp = new Date().toISOString();
    const log = `[ERROR] ${timestamp} - ${message}`;
    console.error(log);
    this.logs.push(log);
  }

  warn(message) {
    const timestamp = new Date().toISOString();
    const log = `[WARN] ${timestamp} - ${message}`;
    console.warn(log);
    this.logs.push(log);
  }

  getLogs() {
    return this.logs;
  }
}

const logger = new Logger();

// Generate unique ID
function generateId(prefix, index) {
  return `${prefix}-${index.toString().padStart(3, '0')}`;
}

// Generate heading ID from text
function generateHeadingId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Pattern to detect LaTeX equations
const LATEX_PATTERNS = [
  /\$([^$]+)\$/g,                    // Inline equations $...$
  /\$\$([^$]+)\$\$/g,                 // Display equations $$...$$
];

// Pattern to detect figure references
const FIGURE_PATTERN = /Figure\s+(\d+(?:\.\d+)?)[:\s.-]*([^\n]+)/gi;

// Pattern to detect section headings
const HEADING_PATTERNS = [
  { level: 1, pattern: /^(\d+\.)\s+([A-Z][^\n]+)/gm },      // 1. Heading
  { level: 2, pattern: /^(\d+\.\d+)\s+([A-Z][^\n]+)/gm },   // 1.1 Heading
  { level: 3, pattern: /^(\d+\.\d+\.\d+)\s+([A-Z][^\n]+)/gm }, // 1.1.1 Heading
];

/**
 * Extract section headings from text
 */
function extractHeadings(text) {
  logger.info('Extracting section headings...');
  const headings = [];
  let index = 0;

  for (const { level, pattern } of HEADING_PATTERNS) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const [, number, title] = match;
      const heading = {
        id: generateHeadingId(title),
        level,
        text: title.trim(),
        pageNumber: 1,
      };
      headings.push(heading);
      index++;
    }
  }

  logger.info(`Found ${headings.length} headings`);
  return headings;
}

/**
 * Extract body text paragraphs
 */
function extractBodyText(text, headings) {
  logger.info('Extracting body text...');
  const bodyTexts = [];
  
  // Split by double newlines to get paragraphs
  const paragraphs = text.split(/\n\n+/);
  let index = 0;

  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    
    // Skip if it looks like a heading, equation, or code
    if (trimmed.length < 50 || 
        trimmed.startsWith('$') || 
        trimmed.startsWith('function') ||
        trimmed.startsWith('%')) {
      continue;
    }

    // Check if paragraph contains citations
    const citations = [];
    const citationPattern = /\[(\d+(?:,\s*\d+)*)\]/g;
    let citationMatch;
    while ((citationMatch = citationPattern.exec(trimmed)) !== null) {
      citations.push(citationMatch[1]);
    }

    const bodyText = {
      id: generateId('body', index++),
      content: trimmed,
      pageNumber: 1,
      citations: citations.length > 0 ? citations : undefined,
    };

    bodyTexts.push(bodyText);
  }

  logger.info(`Found ${bodyTexts.length} body text paragraphs`);
  return bodyTexts;
}

/**
 * Extract LaTeX equations from text
 */
function extractEquations(text) {
  logger.info('Extracting LaTeX equations...');
  const equations = [];
  let index = 0;

  for (const pattern of LATEX_PATTERNS) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const latex = match[1].trim();
      
      // Validate basic LaTeX syntax
      const isValid = validateLatex(latex);

      const equation = {
        id: generateId('eq', index),
        referenceNumber: `(${index + 1})`,
        latex,
        description: `Equation ${index + 1}`,
        context: getContextAroundMatch(text, match.index, 100),
        type: pattern.toString().includes('$$') ? 'display' : 'inline',
        pageNumber: 1,
        isValid,
      };

      if (!isValid) {
        logger.warn(`Invalid LaTeX syntax in equation ${index + 1}: ${latex.substring(0, 50)}...`);
      }

      equations.push(equation);
      index++;
    }
  }

  logger.info(`Found ${equations.length} equations`);
  return equations;
}

/**
 * Validate LaTeX syntax (basic validation)
 */
function validateLatex(latex) {
  // Check for balanced braces
  const braceCount = (latex.match(/{/g) || []).length - (latex.match(/}/g) || []).length;
  if (braceCount !== 0) return false;

  // Check for balanced parentheses
  const parenCount = (latex.match(/\(/g) || []).length - (latex.match(/\)/g) || []).length;
  if (parenCount !== 0) return false;

  return true;
}

/**
 * Extract MATLAB code snippets
 */
function extractCodeSnippets(text) {
  logger.info('Extracting MATLAB code snippets...');
  const codeSnippets = [];
  let index = 0;

  // Look for function definitions
  const functionPattern = /function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)([\s\S]*?)(?=function|$)/g;
  let match;

  while ((match = functionPattern.exec(text)) !== null) {
    const [, outputVars, functionName, inputVars, codeBody] = match;
    
    const codeSnippet = {
      id: generateId('code', index),
      code: match[0].trim(),
      functionName,
      description: `MATLAB function: ${functionName}`,
      language: 'matlab',
      inputs: inputVars.split(',').map(s => s.trim()).filter(s => s),
      outputs: outputVars.split(',').map(s => s.trim()).filter(s => s),
      pageNumber: 1,
    };

    codeSnippets.push(codeSnippet);
    index++;
  }

  // Also look for standalone code blocks (comments followed by code)
  const commentCodePattern = /(%[\s\S]*?)(?=\n\n|\Z)/g;
  let commentMatch;
  while ((commentMatch = commentCodePattern.exec(text)) !== null) {
    const comment = commentMatch[1];
    if (comment.includes('MATLAB') || comment.includes('function') || comment.includes('algorithm')) {
      const codeSnippet = {
        id: generateId('code', index),
        code: comment.trim(),
        description: 'MATLAB code block or algorithm description',
        language: 'matlab',
        pageNumber: 1,
      };
      codeSnippets.push(codeSnippet);
      index++;
    }
  }

  logger.info(`Found ${codeSnippets.length} code snippets`);
  return codeSnippets;
}

/**
 * Extract table data
 */
function extractTables(text) {
  logger.info('Extracting tables...');
  const tables = [];
  let index = 0;

  // Look for markdown-style tables
  const tablePattern = /(\|[^|\n]+\|[^|\n]+\|[^|\n]+\|(?:\n\|?-[-| ]+\|?)+(?:\n\|[^|\n]+\|[^|\n]+\|[^|\n]+\|)+)/g;
  let match;

  while ((match = tablePattern.exec(text)) !== null) {
    const tableText = match[1];
    const rows = tableText.split('\n').filter(row => row.includes('|'));
    
    if (rows.length >= 3) {
      const headers = rows[0].split('|').map(h => h.trim()).filter(h => h);
      const dataRows = rows.slice(2).map(row => 
        row.split('|').map(cell => cell.trim()).filter(cell => cell)
      );

      const tableData = {
        id: generateId('table', index),
        caption: `Table ${index + 1}`,
        headers,
        rows: dataRows,
        pageNumber: 1,
        tableNumber: `${index + 1}`,
      };

      tables.push(tableData);
      index++;
    }
  }

  logger.info(`Found ${tables.length} tables`);
  return tables;
}

/**
 * Extract figure metadata
 */
function extractFigures(text) {
  logger.info('Extracting figure metadata...');
  const figures = [];
  let index = 0;

  let match;
  while ((match = FIGURE_PATTERN.exec(text)) !== null) {
    const [, figureNumber, title] = match;
    
    const contextStart = Math.max(0, match.index - 200);
    const contextEnd = Math.min(text.length, match.index + 500);
    const context = text.substring(contextStart, contextEnd);

    const figure = {
      id: generateId('fig', index),
      figureNumber,
      title: title.trim(),
      caption: title.trim(),
      description: `Figure ${figureNumber}: ${title.trim()}`,
      pageNumber: 1,
      technicalDetails: {
        axes: ['x-axis', 'y-axis'],
        labels: [],
        dataRanges: [],
      },
      visualSuggestion: 'Line chart or plot showing signal processing results',
    };

    figures.push(figure);
    index++;
  }

  logger.info(`Found ${figures.length} figures`);
  return figures;
}

/**
 * Get context around a match in text
 */
function getContextAroundMatch(text, matchIndex, contextLength) {
  const start = Math.max(0, matchIndex - contextLength);
  const end = Math.min(text.length, matchIndex + contextLength);
  return text.substring(start, end).replace(/\s+/g, ' ').trim();
}

/**
 * Parse PDF and extract all content
 */
async function parsePDF(filePath) {
  const errors = [];
  const warnings = [];

  try {
    logger.info(`Starting PDF extraction from: ${filePath}`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`PDF file not found: ${filePath}`);
    }

    // Read PDF file
    const pdfBuffer = fs.readFileSync(filePath);
    logger.info(`PDF file size: ${(pdfBuffer.length / 1024 / 1024).toFixed(2)} MB`);

    // Parse PDF using the new PDFParse class API
    const parser = new PDFParse({ data: pdfBuffer });
    const infoResult = await parser.getInfo();
    const numPages = infoResult.total;
    logger.info(`Successfully parsed PDF with ${numPages} pages`);
    logger.info(`PDF Info: ${JSON.stringify(infoResult.info)}`);

    // Extract text from all pages
    const textResult = await parser.getText();
    const rawText = textResult.text;

    // Extract different content types
    const headings = extractHeadings(rawText);
    const bodyTexts = extractBodyText(rawText, headings);
    const equations = extractEquations(rawText);
    const codeSnippets = extractCodeSnippets(rawText);
    const tables = extractTables(rawText);
    const figures = extractFigures(rawText);

    // Build complete content structure
    const content = {
      headings,
      bodyTexts,
      equations,
      codeSnippets,
      tables,
      figures,
      metadata: {
        extractedAt: new Date().toISOString(),
        sourceFile: filePath,
        totalPages: numPages,
        extractionMethod: 'pdf-parse',
      },
    };

    logger.info('PDF extraction completed successfully');

    return {
      success: true,
      content,
      rawText,
      errors,
      warnings,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    logger.error(`PDF parsing failed: ${errorMessage}`);
    errors.push(errorMessage);

    return {
      success: false,
      errors,
      warnings,
    };
  }
}

/**
 * Save extracted content to files
 */
function saveContent(result) {
  logger.info('Saving extracted content to /data directory...');

  // Ensure data directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    logger.info(`Created data directory: ${DATA_DIR}`);
  }

  if (result.success && result.content) {
    // Save complete structured content
    const contentPath = path.join(DATA_DIR, 'content.json');
    fs.writeFileSync(contentPath, JSON.stringify(result.content, null, 2));
    logger.info(`Saved: ${contentPath}`);

    // Save raw text
    if (result.rawText) {
      const rawTextPath = path.join(DATA_DIR, 'raw-text.txt');
      fs.writeFileSync(rawTextPath, result.rawText);
      logger.info(`Saved: ${rawTextPath}`);
    }

    // Save equations separately
    const equationsPath = path.join(DATA_DIR, 'equations.json');
    fs.writeFileSync(equationsPath, JSON.stringify(result.content.equations, null, 2));
    logger.info(`Saved: ${equationsPath}`);

    // Save code snippets separately
    const codePath = path.join(DATA_DIR, 'code-snippets.json');
    fs.writeFileSync(codePath, JSON.stringify(result.content.codeSnippets, null, 2));
    logger.info(`Saved: ${codePath}`);

    // Save tables separately
    const tablesPath = path.join(DATA_DIR, 'tables.json');
    fs.writeFileSync(tablesPath, JSON.stringify(result.content.tables, null, 2));
    logger.info(`Saved: ${tablesPath}`);

    // Save figures separately
    const figuresPath = path.join(DATA_DIR, 'figures.json');
    fs.writeFileSync(figuresPath, JSON.stringify(result.content.figures, null, 2));
    logger.info(`Saved: ${figuresPath}`);

    // Summary
    logger.info('=== EXTRACTION SUMMARY ===');
    logger.info(`Headings: ${result.content.headings.length}`);
    logger.info(`Body Text Paragraphs: ${result.content.bodyTexts.length}`);
    logger.info(`Equations: ${result.content.equations.length}`);
    logger.info(`Code Snippets: ${result.content.codeSnippets.length}`);
    logger.info(`Tables: ${result.content.tables.length}`);
    logger.info(`Figures: ${result.content.figures.length}`);
    logger.info(`Total Pages: ${result.content.metadata.totalPages}`);
  } else {
    logger.error('Extraction failed, cannot save content');
  }

  // Save extraction log
  const logPath = path.join(DATA_DIR, 'extraction-log.txt');
  fs.writeFileSync(logPath, logger.getLogs().join('\n'));
  logger.info(`Saved extraction log: ${logPath}`);
}

/**
 * Main execution function
 */
async function main() {
  logger.info('===========================================');
  logger.info('PDF Content Extraction Script - Task 0.1');
  logger.info('===========================================');
  logger.info(`Start time: ${new Date().toISOString()}`);

  const result = await parsePDF(PDF_PATH);
  
  if (result.success) {
    saveContent(result);
    logger.info('===========================================');
    logger.info('Task 0.1 COMPLETED SUCCESSFULLY');
    logger.info('===========================================');
  } else {
    logger.error('Extraction failed!');
    logger.error(`Errors: ${result.errors.join(', ')}`);
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  logger.error(`Unhandled error: ${error.message}`);
  process.exit(1);
});
