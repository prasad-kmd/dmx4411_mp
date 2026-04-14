import fs from 'fs';
import path from 'path';
// @ts-ignore
import pdf from 'pdf-parse';

async function extractPDFContent() {
  const pdfPath = path.join(process.cwd(), 'public', 'MP_Full-Report.pdf');
  const dataBuffer = fs.readFileSync(pdfPath);

  try {
    const data = await pdf(dataBuffer);

    const content = {
      text: data.text,
      info: data.info,
      metadata: data.metadata,
      numPages: data.numpages,
    };

    if (!fs.existsSync('data')) {
      fs.mkdirSync('data');
    }

    fs.writeFileSync('data/raw-text.txt', data.text);
    fs.writeFileSync('data/content.json', JSON.stringify(content, null, 2));

    console.log('PDF extraction successful. Files saved to /data directory.');
  } catch (error) {
    console.error('Error extracting PDF content:', error);
  }
}

extractPDFContent();
