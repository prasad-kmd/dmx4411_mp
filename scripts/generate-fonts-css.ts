import fs from 'fs';
import path from 'path';

const fontsDir = path.join(process.cwd(), 'public', 'fonts');
const cssPath = path.join(process.cwd(), 'styles', 'fonts.css');

const fontFiles = fs.readdirSync(fontsDir);

let cssContent = '';

fontFiles.forEach(file => {
  if (file.endsWith('.woff2') || file.endsWith('.woff')) {
    const fileName = file.replace(/\.(woff2|woff)$/, '');
    const parts = fileName.split('-');
    const fontName = parts[0];
    const weightName = parts[1] || 'Regular';

    let weight = '400';
    if (weightName.includes('Bold')) weight = '700';
    if (weightName.includes('Light')) weight = '300';
    if (weightName.includes('ExtraLight')) weight = '200';
    if (weightName.includes('Medium')) weight = '500';
    if (weightName.includes('SemiBold')) weight = '600';

    const format = file.endsWith('.woff2') ? 'woff2' : 'woff';

    cssContent += `
@font-face {
  font-family: '${fontName}';
  src: url('/fonts/${file}') format('${format}');
  font-weight: ${weight};
  font-style: normal;
  font-display: swap;
}
`;
  }
});

fs.writeFileSync(cssPath, cssContent);
console.log('Font CSS generated with weights.');
