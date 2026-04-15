"use client";

import React from "react";
import contentData from "@/data/content.json";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { CodeBlock } from "@/components/code/CodeBlock";
import { FileCode, Calendar, User, Terminal } from "lucide-react";

export default function AppendixPage() {
  const appendixSection = contentData.sections.find(s => s.id === "appendix");

  if (!appendixSection) {
    return <div>Section not found</div>;
  }

  return (
    <div className="space-y-12 pb-20 max-w-5xl mx-auto">
      <div className="space-y-4">
        <Breadcrumbs />
        <h1 className="text-4xl font-bold tracking-tight font-primary">{appendixSection.title}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Full MATLAB implementation scripts used for audio analysis and digital filtering.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 rounded-xl border bg-muted/20 flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-background border flex items-center justify-center text-primary">
                <FileCode size={20} />
            </div>
            <div>
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Version</p>
                <p className="text-sm font-medium">MATLAB R2024b</p>
            </div>
        </div>
        <div className="p-4 rounded-xl border bg-muted/20 flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-background border flex items-center justify-center text-primary">
                <User size={20} />
            </div>
            <div>
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Publisher</p>
                <p className="text-sm font-medium">Research Team</p>
            </div>
        </div>
        <div className="p-4 rounded-xl border bg-muted/20 flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-background border flex items-center justify-center text-primary">
                <Calendar size={20} />
            </div>
            <div>
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Last Modified</p>
                <p className="text-sm font-medium">April 2024</p>
            </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center gap-3 text-muted-foreground border-b pb-4">
            <Terminal size={20} />
            <h2 className="text-2xl font-bold font-primary">main_processing_script.m</h2>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
            {appendixSection.content.split('\n\n').map((p, i) => (
                p.trim() && <p key={i}>{p}</p>
            ))}
        </div>

        {appendixSection.codeBlocks.map((block) => (
          <CodeBlock
            key={block.id}
            filename="denoising_system.m"
            code={block.code}
            language="matlab"
          />
        ))}
      </div>
    </div>
  );
}
