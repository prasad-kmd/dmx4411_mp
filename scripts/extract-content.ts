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
  let codeCount = 0;
  let figCount = 0;
  let tableCount = 0;

  $('p, h1, h2, h3, table').each((_, element) => {
    const $el = $(element);
    const className = ($el.attr('class') || '').toUpperCase();
    const tagName = element.tagName.toLowerCase();
    const text = cleanText($el.text());

    if (!text && tagName !== 'table') return;

    const isHeading1 = className === 'HEAD1' || tagName === 'h1';
    const isHeading2 = className === 'HEAD2' || tagName === 'h2';
    const isHeading3 = className === 'HEAD3' || tagName === 'h3';

    if (isHeading1 || isHeading2 || isHeading3) {
      const level = isHeading1 ? 1 : isHeading2 ? 2 : 3;
      const section: ContentSection = {
        id: slugify(text),
        title: text,
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
        if (className === 'MATLABCODE') {
            if (currentSection) {
                const code = $el.text().trim();
                const codeBlock: CodeBlock = {
                  id: `code-${++codeCount}`,
                  language: 'matlab',
                  code,
                  sectionId: currentSection.id,
                  lineCount: code.split('\n').length,
                };
                currentSection.codeBlocks.push(codeBlock);
                contentData.codeBlocks.push(codeBlock);
            }
        } else if (className === 'IMGCAP') {
             if (currentSection) {
                const figure: Figure = {
                  id: `fig-${++figCount}`,
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
            id: `table-${++tableCount}`,
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
