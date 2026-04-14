import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';
import { ContentData, ContentSection, Equation, CodeBlock, Table, Figure } from '../lib/types';

const HTML_PATH = 'public/Full-report/MP-Report-HTML.htm';
const OUTPUT_DIR = 'data';

function cleanText(text: string): string {
  return text
    .replace(/[\uFFFD\u00A0]/g, ' ')
    .replace(/\r\n/g, '\n')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function extractContent() {
  if (!fs.existsSync(HTML_PATH)) {
    console.error(`HTML file not found: ${HTML_PATH}`);
    return;
  }

  const html = fs.readFileSync(HTML_PATH, 'utf-8');
  const $ = cheerio.load(html);

  const contentData: ContentData = {
    sections: [],
    equations: [],
    codeBlocks: [],
    tables: [],
    figures: [],
    metadata: {
      title: $('title').text() || 'DSP Mini Project Report',
    },
  };

  let currentSection: ContentSection | null = null;
  const sectionStack: ContentSection[] = [];

  $('h1, h2, h3, h4, p, table').each((_, element) => {
    const $el = $(element);
    const tagName = element.tagName.toLowerCase();

    if (tagName.startsWith('h')) {
      const level = parseInt(tagName.substring(1));
      const title = cleanText($el.text());
      if (!title) return;

      const section: ContentSection = {
        id: slugify(title) || `section-${Math.random().toString(36).substr(2, 9)}`,
        title,
        level,
        content: '',
        subsections: [],
        equations: [],
        codeBlocks: [],
        tables: [],
        figures: [],
      };

      if (level === 1) {
        contentData.sections.push(section);
        sectionStack.length = 0;
        sectionStack.push(section);
        currentSection = section;
      } else {
        while (sectionStack.length > 0 && sectionStack[sectionStack.length - 1].level >= level) {
          sectionStack.pop();
        }

        if (sectionStack.length > 0) {
          sectionStack[sectionStack.length - 1].subsections.push(section);
          sectionStack.push(section);
          currentSection = section;
        } else {
          contentData.sections.push(section);
          sectionStack.push(section);
          currentSection = section;
        }
      }
    } else if (tagName === 'p') {
      const text = cleanText($el.text());
      if (!text) return;

      if ($el.hasClass('MATLABCode')) {
        const code = $el.text().trim();
        if (currentSection) {
          const codeBlock: CodeBlock = {
            id: `code-${Math.random().toString(36).substr(2, 9)}`,
            language: 'matlab',
            code,
            sectionId: currentSection.id,
            lineCount: code.split('\n').length,
          };
          currentSection.codeBlocks.push(codeBlock);
          contentData.codeBlocks.push(codeBlock);
        }
      } else if ($el.hasClass('ImgCap')) {
        if (currentSection) {
          const figure: Figure = {
            id: `fig-${Math.random().toString(36).substr(2, 9)}`,
            caption: text,
            description: '',
            figureType: 'chart',
            placeholder: text,
            sectionId: currentSection.id,
          };
          currentSection.figures.push(figure);
          contentData.figures.push(figure);
        }
      } else {
        if (text.includes('=') && (text.includes('+') || text.includes('-') || text.includes('*') || text.includes('/')) && text.length < 200) {
           if (currentSection) {
              const equation: Equation = {
                id: `eq-${Math.random().toString(36).substr(2, 9)}`,
                latex: text,
                display: true,
                sectionId: currentSection.id,
              };
              currentSection.equations.push(equation);
              contentData.equations.push(equation);
           }
        }

        if (currentSection) {
          currentSection.content += text + '\n\n';
        }
      }
    } else if (tagName === 'table') {
      const rows: string[][] = [];
      $el.find('tr').each((_, tr) => {
        const row: string[] = [];
        $(tr).find('td, th').each((_, td) => {
          row.push(cleanText($(td).text()));
        });
        rows.push(row);
      });

      if (rows.length > 0 && currentSection) {
        const table: Table = {
          id: `table-${Math.random().toString(36).substr(2, 9)}`,
          headers: rows[0],
          rows: rows.slice(1),
          sectionId: currentSection.id,
        };
        currentSection.tables.push(table);
        contentData.tables.push(table);
      }
    }
  });

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, 'content.json'), JSON.stringify(contentData, null, 2));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'sections.json'), JSON.stringify(contentData.sections, null, 2));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'equations.json'), JSON.stringify(contentData.equations, null, 2));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'code-snippets.json'), JSON.stringify(contentData.codeBlocks, null, 2));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'tables.json'), JSON.stringify(contentData.tables, null, 2));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'figures.json'), JSON.stringify(contentData.figures, null, 2));

  console.log('Extraction complete!');
}

extractContent();
