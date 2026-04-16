'use client';

import * as React from 'react';
import { codeToHtml } from 'shiki';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = 'matlab', filename }: CodeBlockProps) {
  const [html, setHtml] = React.useState<string>('');

  React.useEffect(() => {
    codeToHtml(code, {
      lang: language,
      theme: 'github-dark',
    }).then(setHtml);
  }, [code, language]);

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl">
      {filename && (
        <div className="px-6 py-3 bg-white/5 border-b border-white/5 flex items-center justify-between">
          <span className="text-xs font-mono text-muted-foreground">{filename}</span>
          <div className="flex gap-1.5">
            <div className="size-2 rounded-full bg-white/10" />
            <div className="size-2 rounded-full bg-white/10" />
            <div className="size-2 rounded-full bg-white/10" />
          </div>
        </div>
      )}
      <div
        className="p-6 text-sm overflow-x-auto leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
