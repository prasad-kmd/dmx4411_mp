export interface ExtractedContent {
  text: string;
  info: any;
  metadata: any;
  numPages: number;
}

export interface Section {
  id: string;
  title: string;
  level: number;
  content: string[];
}

export interface MathEquation {
  id: string;
  latex: string;
  description: string;
  context?: string;
}

export interface CodeSnippet {
  id: string;
  name: string;
  language: string;
  code: string;
  description?: string;
}

export interface TableData {
  id: string;
  caption: string;
  headers: string[];
  rows: any[][];
}

export interface FigureMetadata {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface ProjectData {
  sections: Section[];
  equations: MathEquation[];
  codeSnippets: CodeSnippet[];
  tables: TableData[];
  figures: FigureMetadata[];
}
