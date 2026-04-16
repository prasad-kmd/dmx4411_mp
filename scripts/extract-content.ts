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

  // Simple extraction logic - split by sections
  const sections = text.split(/\r?\n\r?\n(?=[A-Z]{3,})/);

  const contentMap: Record<string, string> = {};

  sections.forEach(section => {
    const lines = section.trim().split('\n');
    const title = lines[0].trim().toUpperCase();
    const body = lines.slice(1).join('\n').trim();

    if (title === 'INTRODUCTION') contentMap['introduction'] = body;
    else if (title === 'METHODOLOGY') contentMap['methodology'] = body;
    else if (title === 'DESIGN') contentMap['design'] = body;
    else if (title === 'RESULTS') contentMap['results'] = body;
    else if (title === 'DISCUSSION') contentMap['discussion'] = body;
    else if (title === 'CONCLUSION') contentMap['conclusion'] = body;
    else if (title === 'REFERENCES') contentMap['references'] = body;
    else if (title === 'APPENDIX') contentMap['appendix'] = body;
  });

  // Ensure data directory exists
  if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
    fs.mkdirSync(path.join(process.cwd(), 'data'));
  }

  fs.writeFileSync(outputPath, JSON.stringify(contentMap, null, 2));
  console.log('Content extracted to:', outputPath);
}

extractContent();
