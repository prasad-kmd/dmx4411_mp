"use client";

import React, { useState, useEffect } from "react";
import { codeToHtml } from "shiki";
import { cn } from "@/lib/utils";
import { FileCode, Terminal } from "lucide-react";
import { CodeCopyButton } from "./CodeCopyButton";
import { useThemeStore } from "@/lib/theme-store";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  highlightLines?: number[];
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = "matlab",
  filename,
  highlightLines = [],
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = highlightLines;
  const [html, setHtml] = useState<string>("");
  const { mode } = useThemeStore();

  useEffect(() => {
    const highlight = async () => {
      try {
        const out = await codeToHtml(code, {
          lang: language,
          theme: mode === "dark" ? "github-dark" : "github-light",
        });
        setHtml(out);
      } catch (err) {
        console.error("Shiki highlighting error:", err);
        setHtml(`<pre><code>${code}</code></pre>`);
      }
    };
    highlight();
  }, [code, language, mode]);

  return (
    <div className={cn("my-6 rounded-xl border bg-card overflow-hidden shadow-sm", className)}>
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
        <div className="flex items-center gap-2">
          {filename ? (
            <FileCode size={16} className="text-primary" />
          ) : (
            <Terminal size={16} className="text-primary" />
          )}
          <span className="text-xs font-mono font-medium text-muted-foreground">
            {filename || language}
          </span>
        </div>
        <CodeCopyButton code={code} />
      </div>
      <div
        className={cn(
          "p-4 overflow-x-auto font-mono text-sm leading-relaxed",
          showLineNumbers && "line-numbers"
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
