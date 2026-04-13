const fs = require('fs');
const path = require('path');

// Read the extracted content from Task 0.1
const contentPath = path.join(__dirname, '..', 'data', 'content.json');
const outputPath = path.join(__dirname, '..', 'data', 'structured-content.json');
const htmlOutputPath = path.join(__dirname, '..', 'data', 'report.html');

// Load the extracted content
const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

console.log('Starting HTML structure generation...');
console.log(`Loaded ${content.headings.length} headings`);
const bodyTexts = content.bodyTexts || [];
console.log(`Loaded ${bodyTexts.length} body text paragraphs`);
console.log(`Loaded ${content.codeSnippets.length} code snippets`);
console.log(`Loaded ${content.figures.length} figures`);
console.log(`Loaded ${content.tables.length} tables`);

// Create a mapping of page numbers to content
const pageContent = {};

// Initialize page content structure
content.headings.forEach(h => {
    const pageNum = h.pageNumber;
    if (!pageContent[pageNum]) {
        pageContent[pageNum] = {
            headings: [],
            bodyText: [],
            codeSnippets: [],
            figures: [],
            tables: []
        };
    }
    pageContent[pageNum].headings.push(h);
});

// Map body text to pages (approximate based on order)
bodyTexts.forEach((textObj, index) => {
    const totalPages = Math.max(...Object.keys(pageContent).map(Number));
    const pageNum = Math.min(Math.floor(index / (bodyTexts.length / totalPages)) + 1, totalPages);
    const actualPage = Math.max(1, pageNum);
    
    if (!pageContent[actualPage]) {
        pageContent[actualPage] = {
            headings: [],
            bodyText: [],
            codeSnippets: [],
            figures: [],
            tables: []
        };
    }
    // Extract content from the object
    const textContent = typeof textObj === 'object' ? textObj.content : textObj;
    pageContent[actualPage].bodyText.push(textContent);
});

// Map code snippets to pages
content.codeSnippets.forEach(code => {
    const pageNum = code.pageNumber || 1;
    if (pageContent[pageNum]) {
        pageContent[pageNum].codeSnippets.push(code);
    } else {
        pageContent[1].codeSnippets.push(code);
    }
});

// Map figures to pages
content.figures.forEach(fig => {
    const pageNum = fig.pageNumber || 1;
    if (pageContent[pageNum]) {
        pageContent[pageNum].figures.push(fig);
    } else {
        pageContent[1].figures.push(fig);
    }
});

// Map tables to pages
content.tables.forEach(table => {
    const pageNum = table.pageNumber || 1;
    if (pageContent[pageNum]) {
        pageContent[pageNum].tables.push(table);
    } else {
        pageContent[1].tables.push(table);
    }
});

// Generate HTML structure
function generateHTML() {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Audio Denoising System - Mini Project Report</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
        h2 { color: #34495e; border-bottom: 2px solid #ecf0f1; padding-bottom: 8px; margin-top: 30px; }
        h3 { color: #7f8c8d; margin-top: 25px; }
        p { color: #333; text-align: justify; }
        .code-block {
            background-color: #282c34;
            color: #abb2bf;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            margin: 15px 0;
        }
        .figure {
            background-color: #ecf0f1;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            text-align: center;
        }
        .figure-caption { font-style: italic; color: #7f8c8d; margin-top: 10px; }
        .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .table th, .table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        .table th { background-color: #3498db; color: white; }
        .table tr:nth-child(even) { background-color: #f2f2f2; }
        .page-marker {
            color: #95a5a6;
            font-size: 12px;
            text-align: center;
            margin: 30px 0;
            border-top: 1px dashed #bdc3c7;
            padding-top: 10px;
        }
        .toc {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .toc ul { list-style-type: none; padding-left: 20px; }
        .toc li { margin: 8px 0; }
        .toc a { color: #3498db; text-decoration: none; }
        .toc a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
`;

    html += `        <h1>Audio Denoising System - Mini Project Report</h1>\n\n`;
    
    // Table of Contents
    html += `        <div class="toc">\n            <h2>Table of Contents</h2>\n            <ul>\n`;
    
    content.headings.forEach((heading) => {
        if (heading.text && !heading.text.match(/^\d+\s*of\s*\d+/)) {
            const cleanText = heading.text.replace(/\t\d+$/, '').trim();
            if (cleanText) {
                html += `                <li><a href="#${heading.id}">${cleanText}</a></li>\n`;
            }
        }
    });
    
    html += `            </ul>\n        </div>\n\n`;

    // Generate content for each page
    const sortedPages = Object.keys(pageContent).map(Number).sort((a, b) => a - b);
    
    sortedPages.forEach(pageNum => {
        const page = pageContent[pageNum];
        
        html += `        <div class="page-marker">-- Page ${pageNum} --</div>\n\n`;
        
        if (page.headings && page.headings.length > 0) {
            page.headings.forEach(heading => {
                const cleanText = heading.text.replace(/\t\d+$/, '').trim();
                if (cleanText && !heading.text.match(/^\d+\s*of\s*\d+/)) {
                    const level = Math.min(heading.level || 1, 3);
                    html += `        <h${level} id="${heading.id}">${cleanText}</h${level}>\n\n`;
                    
                    if (page.bodyText && page.bodyText.length > 0) {
                        page.bodyText.forEach(text => {
                            const textStr = typeof text === 'object' ? (text.content || '') : (text || '');
                            if (textStr && textStr.trim()) {
                                html += `        <p>${textStr.replace(/\n/g, '<br>')}</p>\n\n`;
                            }
                        });
                        page.bodyText = [];
                    }
                }
            });
        }
        
        if (page.codeSnippets && page.codeSnippets.length > 0) {
            page.codeSnippets.forEach(code => {
                const codeStr = typeof code === 'object' ? (code.code || '') : code;
                const descStr = typeof code === 'object' ? (code.description || '') : '';
                html += `        <div class="code-block">\n            <pre><code>${codeStr}</code></pre>\n`;
                if (descStr) {
                    html += `            <div class="figure-caption">${descStr}</div>\n`;
                }
                html += `        </div>\n\n`;
            });
        }
        
        if (page.figures && page.figures.length > 0) {
            page.figures.forEach(fig => {
                const caption = typeof fig === 'object' ? (fig.caption || 'Figure') : fig;
                const desc = typeof fig === 'object' ? (fig.description || '') : '';
                html += `        <div class="figure">\n            <div>[Figure: ${caption}]</div>\n`;
                if (desc) {
                    html += `            <div class="figure-caption">${desc}</div>\n`;
                }
                html += `        </div>\n\n`;
            });
        }
        
        if (page.tables && page.tables.length > 0) {
            page.tables.forEach(table => {
                const tableContent = typeof table === 'object' ? (table.content || 'Table content') : table;
                html += `        <div class="table">\n            <p>${tableContent}</p>\n        </div>\n\n`;
            });
        }
    });

    html += `    </div>\n</body>\n</html>\n`;
    return html;
}

// Generate and save HTML
const htmlContent = generateHTML();
fs.writeFileSync(htmlOutputPath, htmlContent);
console.log(`\n✓ HTML file generated: ${htmlOutputPath}`);

// Create structured JSON with hierarchical organization
const structuredContent = {
    metadata: {
        title: "Audio Denoising System - Mini Project Report",
        generatedAt: new Date().toISOString(),
        sourcePDF: "mini_project_report.pdf",
        totalSections: content.headings.length,
        totalParagraphs: bodyTexts.length,
        totalCodeSnippets: content.codeSnippets.length,
        totalFigures: content.figures.length,
        totalTables: content.tables.length
    },
    sections: []
};

// Organize content hierarchically
const mainSections = {};
let currentSection = null;

content.headings.forEach(heading => {
    const cleanText = heading.text.replace(/\t\d+$/, '').trim();
    
    if (heading.level === 1 && cleanText) {
        currentSection = {
            id: heading.id,
            title: cleanText,
            level: 1,
            pageNumber: heading.pageNumber,
            content: [],
            subsections: []
        };
        mainSections[heading.id] = currentSection;
        structuredContent.sections.push(currentSection);
    } else if (currentSection && cleanText) {
        currentSection.subsections.push({
            id: heading.id,
            title: cleanText,
            level: heading.level || 2,
            pageNumber: heading.pageNumber,
            content: []
        });
    }
});

// Distribute body text to sections
let sectionIndex = 0;
const sectionKeys = Object.keys(mainSections);
bodyTexts.forEach((textObj, index) => {
    if (sectionKeys.length > 0) {
        const currentKey = sectionKeys[Math.min(sectionIndex, sectionKeys.length - 1)];
        if (mainSections[currentKey]) {
            const textContent = typeof textObj === 'object' ? textObj.content : textObj;
            mainSections[currentKey].content.push(textContent);
        }
        if (index % Math.ceil(bodyTexts.length / sectionKeys.length) === 0 && sectionIndex < sectionKeys.length - 1) {
            sectionIndex++;
        }
    }
});

structuredContent.codeSnippets = content.codeSnippets;
structuredContent.figures = content.figures;
structuredContent.tables = content.tables;

fs.writeFileSync(outputPath, JSON.stringify(structuredContent, null, 2));
console.log(`✓ Structured JSON generated: ${outputPath}`);

console.log('\n✅ Task 0.2 completed successfully!');
console.log('Generated files:');
console.log(`  - ${outputPath}`);
console.log(`  - ${htmlOutputPath}`);
