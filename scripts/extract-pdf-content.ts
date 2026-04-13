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

import * as fs from 'fs';
import * as path from 'path';
import pdfParse from 'pdf-parse';
import {
  ExtractedContent,
  SectionHeading,
  BodyText,
  Equation,
  CodeSnippet,
  TableData,
  FigureMetadata,
  ExtractionResult
} from './types';

// Configuration
const PDF_PATH = path.join(__dirname, '../public/MP_Full-Report.pdf');
const DATA_DIR = path.join(__dirname, '../data');

// Logger utility
class Logger {
  private static logs: string[] = [];

  static info(message: string): void {
    const timestamp = new Date().toISOString();
    const log = `[INFO] ${timestamp} - ${message}`;
    console.log(log);
    this.logs.push(log);
  }

  static error(message: string): void {
    const timestamp = new Date().toISOString();
    const log = `[ERROR] ${timestamp} - ${message}`;
    console.error(log);
    this.logs.push(log);
  }

  static warn(message: string): void {
    const timestamp = new Date().toISOString();
    const log = `[WARN] ${timestamp} - ${message}`;
    console.warn(log);
    this.logs.push(log);
  }

  static getLogs(): string[] {
    return this.logs;
  }
}

// Generate unique ID
function generateId(prefix: string, index: number): string {
  return `${prefix}-${index.toString().padStart(3, '0')}`;
}

// Generate heading ID from text
function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Pattern to detect LaTeX equations
const LATEX_PATTERNS = [
  /\$([^$]+)\$/g,                    // Inline equations $...$
  /\$\$([^$]+)\$\$/g,                 // Display equations $$...$$
  /\\\[([\s\S]*?)\\\]/g,            // Display equations \[...\]
  /\\begin\{equation\}([\s\S]*?)\\end\{equation\}/g,
  /\\begin\{align\}([\s\S]*?)\\end\{align\}/g,
];

// Pattern to detect MATLAB code
const MATLAB_PATTERNS = [
  /function\s+[a-zA-Z_][a-zA-Z0-9_]*\s*=/g,
  /function\s+[a-zA-Z_][a-zA-Z0-9_]*\s*\(/g,
  /end\s*%.*function/g,
  /%\s*[A-Z][a-zA-Z\s]+:/g,         // MATLAB comments with labels
];

// Pattern to detect tables
const TABLE_PATTERN = /^\|.*\|.*\|$/m;

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
function extractHeadings(text: string): SectionHeading[] {
  Logger.info('Extracting section headings...');
  const headings: SectionHeading[] = [];
  let index = 0;

  for (const { level, pattern } of HEADING_PATTERNS) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const [, number, title] = match;
      const heading: SectionHeading = {
        id: generateHeadingId(title),
        level,
        text: title.trim(),
        pageNumber: 1, // Will be updated with proper page tracking
      };
      headings.push(heading);
      index++;
    }
  }

  Logger.info(`Found ${headings.length} headings`);
  return headings;
}

/**
 * Extract body text paragraphs
 */
function extractBodyText(text: string, headings: SectionHeading[]): BodyText[] {
  Logger.info('Extracting body text...');
  const bodyTexts: BodyText[] = [];
  
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
    const citations: string[] = [];
    const citationPattern = /\[(\d+(?:,\s*\d+)*)\]/g;
    let citationMatch;
    while ((citationMatch = citationPattern.exec(trimmed)) !== null) {
      citations.push(citationMatch[1]);
    }

    const bodyText: BodyText = {
      id: generateId('body', index++),
      content: trimmed,
      pageNumber: 1,
      citations: citations.length > 0 ? citations : undefined,
    };

    bodyTexts.push(bodyText);
  }

  Logger.info(`Found ${bodyTexts.length} body text paragraphs`);
  return bodyTexts;
}

/**
 * Extract LaTeX equations from text
 */
function extractEquations(text: string): Equation[] {
  Logger.info('Extracting LaTeX equations...');
  const equations: Equation[] = [];
  let index = 0;

  for (const pattern of LATEX_PATTERNS) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const latex = match[1].trim();
      
      // Validate basic LaTeX syntax
      const isValid = validateLatex(latex);

      const equation: Equation = {
        id: generateId('eq', index),
        referenceNumber: `(${index + 1})`,
        latex,
        description: `Equation ${index + 1}`,
        context: getContextAroundMatch(text, match.index, 100),
        type: pattern.toString().includes('$$') || pattern.toString().includes('\\\\[') ? 'display' : 'inline',
        pageNumber: 1,
        isValid,
      };

      if (!isValid) {
        Logger.warn(`Invalid LaTeX syntax in equation ${index + 1}: ${latex.substring(0, 50)}...`);
      }

      equations.push(equation);
      index++;
    }
  }

  Logger.info(`Found ${equations.length} equations`);
  return equations;
}

/**
 * Validate LaTeX syntax (basic validation)
 */
function validateLatex(latex: string): boolean {
  // Check for balanced braces
  const braceCount = (latex.match(/{/g) || []).length - (latex.match(/}/g) || []).length;
  if (braceCount !== 0) return false;

  // Check for balanced parentheses
  const parenCount = (latex.match(/\(/g) || []).length - (latex.match(/\)/g) || []).length;
  if (parenCount !== 0) return false;

  // Check for common LaTeX commands
  const validCommands = ['frac', 'sqrt', 'sum', 'int', 'prod', 'alpha', 'beta', 'gamma', 
                         'delta', 'theta', 'lambda', 'mu', 'pi', 'sigma', 'omega', 'infty',
                         'left', 'right', 'begin', 'end', 'matrix', 'pmatrix', 'bmatrix'];
  
  const commands = latex.match(/\\[a-zA-Z]+/g) || [];
  for (const cmd of commands) {
    const cmdName = cmd.slice(1);
    if (!validCommands.includes(cmdName) && !cmdName.startsWith('math')) {
      // Allow unknown commands but log warning
      // Logger.warn(`Unknown LaTeX command: ${cmd}`);
    }
  }

  return true;
}

/**
 * Extract MATLAB code snippets
 */
function extractCodeSnippets(text: string): CodeSnippet[] {
  Logger.info('Extracting MATLAB code snippets...');
  const codeSnippets: CodeSnippet[] = [];
  let index = 0;

  // Look for function definitions
  const functionPattern = /function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)([\s\S]*?)(?=function|$)/g;
  let match;

  while ((match = functionPattern.exec(text)) !== null) {
    const [, outputVars, functionName, inputVars, codeBody] = match;
    
    const codeSnippet: CodeSnippet = {
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
      const codeSnippet: CodeSnippet = {
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

  Logger.info(`Found ${codeSnippets.length} code snippets`);
  return codeSnippets;
}

/**
 * Extract table data
 */
function extractTables(text: string): TableData[] {
  Logger.info('Extracting tables...');
  const tables: TableData[] = [];
  let index = 0;

  // Look for markdown-style tables
  const tablePattern = /(\|[^|\n]+\|[^|\n]+\|[^|\n]+\|(?:\n\|?-[-| ]+\|?)+(?:\n\|[^|\n]+\|[^|\n]+\|[^|\n]+\|)+)/g;
  let match;

  while ((match = tablePattern.exec(text)) !== null) {
    const tableText = match[1];
    const rows = tableText.split('\n').filter(row => row.includes('|'));
    
    if (rows.length >= 3) { // Header + separator + at least one data row
      const headers = rows[0].split('|').map(h => h.trim()).filter(h => h);
      const dataRows = rows.slice(2).map(row => 
        row.split('|').map(cell => cell.trim()).filter(cell => cell)
      );

      const tableData: TableData = {
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

  Logger.info(`Found ${tables.length} tables`);
  return tables;
}

/**
 * Extract figure metadata
 */
function extractFigures(text: string): FigureMetadata[] {
  Logger.info('Extracting figure metadata...');
  const figures: FigureMetadata[] = [];
  let index = 0;

  let match;
  while ((match = FIGURE_PATTERN.exec(text)) !== null) {
    const [, figureNumber, title] = match;
    
    // Get surrounding context for description
    const contextStart = Math.max(0, match.index - 200);
    const contextEnd = Math.min(text.length, match.index + 500);
    const context = text.substring(contextStart, contextEnd);

    const figure: FigureMetadata = {
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

  Logger.info(`Found ${figures.length} figures`);
  return figures;
}

/**
 * Get context around a match in text
 */
function getContextAroundMatch(text: string, matchIndex: number, contextLength: number): string {
  const start = Math.max(0, matchIndex - contextLength);
  const end = Math.min(text.length, matchIndex + contextLength);
  return text.substring(start, end).replace(/\s+/g, ' ').trim();
}

/**
 * Parse PDF and extract all content
 */
async function parsePDF(filePath: string): Promise<ExtractionResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    Logger.info(`Starting PDF extraction from: ${filePath}`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`PDF file not found: ${filePath}`);
    }

    // Read PDF file
    const pdfBuffer = fs.readFileSync(filePath);
    Logger.info(`PDF file size: ${(pdfBuffer.length / 1024 / 1024).toFixed(2)} MB`);

    // Parse PDF
    const data = await pdfParse(pdfBuffer);
    Logger.info(`Successfully parsed PDF with ${data.npages} pages`);
    Logger.info(`PDF Info: ${JSON.stringify(data.info)}`);

    const rawText = data.text;

    // Extract different content types
    const headings = extractHeadings(rawText);
    const bodyTexts = extractBodyText(rawText, headings);
    const equations = extractEquations(rawText);
    const codeSnippets = extractCodeSnippets(rawText);
    const tables = extractTables(rawText);
    const figures = extractFigures(rawText);

    // Build complete content structure
    const content: ExtractedContent = {
      headings,
      bodyTexts,
      equations,
      codeSnippets,
      tables,
      figures,
      metadata: {
        extractedAt: new Date().toISOString(),
        sourceFile: filePath,
        totalPages: data.npages,
        extractionMethod: 'pdf-parse',
      },
    };

    Logger.info('PDF extraction completed successfully');

    return {
      success: true,
      content,
      rawText,
      errors,
      warnings,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    Logger.error(`PDF parsing failed: ${errorMessage}`);
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
function saveContent(result: ExtractionResult): void {
  Logger.info('Saving extracted content to /data directory...');

  // Ensure data directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    Logger.info(`Created data directory: ${DATA_DIR}`);
  }

  if (result.success && result.content) {
    // Save complete structured content
    const contentPath = path.join(DATA_DIR, 'content.json');
    fs.writeFileSync(contentPath, JSON.stringify(result.content, null, 2));
    Logger.info(`Saved: ${contentPath}`);

    // Save raw text
    if (result.rawText) {
      const rawTextPath = path.join(DATA_DIR, 'raw-text.txt');
      fs.writeFileSync(rawTextPath, result.rawText);
      Logger.info(`Saved: ${rawTextPath}`);
    }

    // Save equations separately
    const equationsPath = path.join(DATA_DIR, 'equations.json');
    fs.writeFileSync(equationsPath, JSON.stringify(result.content.equations, null, 2));
    Logger.info(`Saved: ${equationsPath}`);

    // Save code snippets separately
    const codePath = path.join(DATA_DIR, 'code-snippets.json');
    fs.writeFileSync(codePath, JSON.stringify(result.content.codeSnippets, null, 2));
    Logger.info(`Saved: ${codePath}`);

    // Save tables separately
    const tablesPath = path.join(DATA_DIR, 'tables.json');
    fs.writeFileSync(tablesPath, JSON.stringify(result.content.tables, null, 2));
    Logger.info(`Saved: ${tablesPath}`);

    // Save figures separately
    const figuresPath = path.join(DATA_DIR, 'figures.json');
    fs.writeFileSync(figuresPath, JSON.stringify(result.content.figures, null, 2));
    Logger.info(`Saved: ${figuresPath}`);

    // Summary
    Logger.info('=== EXTRACTION SUMMARY ===');
    Logger.info(`Headings: ${result.content.headings.length}`);
    Logger.info(`Body Text Paragraphs: ${result.content.bodyTexts.length}`);
    Logger.info(`Equations: ${result.content.equations.length}`);
    Logger.info(`Code Snippets: ${result.content.codeSnippets.length}`);
    Logger.info(`Tables: ${result.content.tables.length}`);
    Logger.info(`Figures: ${result.content.figures.length}`);
    Logger.info(`Total Pages: ${result.content.metadata.totalPages}`);
  } else {
    Logger.error('Extraction failed, cannot save content');
  }

  // Save extraction log
  const logPath = path.join(DATA_DIR, 'extraction-log.txt');
  fs.writeFileSync(logPath, Logger.getLogs().join('\n'));
  Logger.info(`Saved extraction log: ${logPath}`);
}

/**
 * Main execution function
 */
async function main(): Promise<void> {
  Logger.info('===========================================');
  Logger.info('PDF Content Extraction Script - Task 0.1');
  Logger.info('===========================================');
  Logger.info(`Start time: ${new Date().toISOString()}`);

  const result = await parsePDF(PDF_PATH);
  
  if (result.success) {
    saveContent(result);
    Logger.info('===========================================');
    Logger.info('Task 0.1 COMPLETED SUCCESSFULLY');
    Logger.info('===========================================');
  } else {
    Logger.error('Extraction failed!');
    Logger.error(`Errors: ${result.errors.join(', ')}`);
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  Logger.error(`Unhandled error: ${error.message}`);
  process.exit(1);
});
