export interface ContentSection {
  id: string;
  title: string;
  level: number;
  content: string;
  subsections: ContentSection[];
  equations: Equation[];
  codeBlocks: CodeBlock[];
  tables: Table[];
  figures: Figure[];
}

export interface Equation {
  id: string;
  latex: string;
  display: boolean;
  label?: string;
  context?: string;
  sectionId: string;
}

export interface CodeBlock {
  id: string;
  language: string;
  code: string;
  filename?: string;
  description?: string;
  sectionId: string;
  lineCount: number;
}

export interface Table {
  id: string;
  caption?: string;
  headers: string[];
  rows: string[][];
  sectionId: string;
}

export interface Figure {
  id: string;
  caption: string;
  description: string;
  figureType: string;
  placeholder: string;
  sectionId: string;
}

export interface ContentData {
  sections: ContentSection[];
  equations: Equation[];
  codeBlocks: CodeBlock[];
  tables: Table[];
  figures: Figure[];
  metadata: {
    title: string;
    author?: string;
    date?: string;
    abstract?: string;
  };
}
