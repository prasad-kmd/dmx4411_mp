import fs from 'fs';
import path from 'path';

const reportPath = path.join(process.cwd(), 'public/Full-report/MP-Report-TXT.txt');
const outputPath = path.join(process.cwd(), 'data/content.json');

function extractContent() {
  if (!fs.existsSync(reportPath)) {
    console.error('Report file not found at:', reportPath);
    return;
  }

  const text = fs.readFileSync(reportPath, 'utf8');

  // Clean up the text - remove the BOM if present
  const cleanText = text.replace(/^\uFEFF/, '');
  const allLines = cleanText.split(/\r?\n/);

  const contentMap: Record<string, string> = {};

  const sections = [
    { id: 'introduction', start: 'INTRODUCTION', end: 'METHODOLOGY' },
    { id: 'methodology', start: 'METHODOLOGY', end: 'DESIGN' },
    { id: 'design', start: 'DESIGN', end: 'RESULTS' },
    { id: 'results', start: 'RESULTS', end: 'DISCUSSION' },
    { id: 'discussion', start: 'DISCUSSION', end: 'CONCLUSION' },
    { id: 'conclusion', start: 'CONCLUSION', end: 'REFERENCES' },
    { id: 'references', start: 'REFERENCES', end: 'APPENDIX' },
    { id: 'appendix', start: 'APPENDIX', end: null }
  ];

  const findSectionLine = (title: string) => {
    for (let i = 0; i < allLines.length; i++) {
      if (allLines[i].trim() === title) {
        return i;
      }
    }
    return -1;
  };

  sections.forEach((section) => {
    const startLine = findSectionLine(section.start);
    if (startLine !== -1) {
      let endLine = section.end ? findSectionLine(section.end) : allLines.length;
      if (endLine === -1) endLine = allLines.length;

      const sectionContent = allLines.slice(startLine + 1, endLine).join('\n').trim();
      contentMap[section.id] = sectionContent;
    }
  });

  // Ensure data directory exists
  if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
    fs.mkdirSync(path.join(process.cwd(), 'data'));
  }

  fs.writeFileSync(outputPath, JSON.stringify(contentMap, null, 2));
  console.log('Content extracted to:', outputPath);
  console.log('Extracted sections:', Object.keys(contentMap));
}

extractContent();
