"use client";

import React, { useEffect, useState } from 'react';
import { createHighlighter } from 'shiki';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'matlab' }) => {
  const [highlightedCode, setHighlightedCode] = useState<string>('');

  useEffect(() => {
    async function highlight() {
      try {
        const highlighter = await createHighlighter({
          themes: ['github-dark'],
          langs: ['matlab'],
        });
        const html = highlighter.codeToHtml(code, {
          lang: 'matlab',
          theme: 'github-dark',
        });
        setHighlightedCode(html);
      } catch (err) {
        console.error("Shiki error:", err);
      }
    }
    highlight();
  }, [code, language]);

  if (!highlightedCode) return <pre className="bg-[#24292e] p-4 rounded text-white overflow-x-auto"><code>{code}</code></pre>;

  return <div dangerouslySetInnerHTML={{ __html: highlightedCode }} className="rounded overflow-hidden my-6 shadow-lg" />;
};

export default CodeBlock;
