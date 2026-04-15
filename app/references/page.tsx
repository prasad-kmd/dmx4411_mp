"use client";

import React from "react";
import contentData from "@/data/content.json";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Link as LinkIcon, Book } from "lucide-react";

export default function ReferencesPage() {
  const referencesSection = contentData.sections.find(s => s.id === "references");

  if (!referencesSection) {
    return <div>Section not found</div>;
  }

  // Parse references from content text (looking for lines starting with numbers)
  const references = referencesSection.content
    .split('\n\n')
    .filter(line => /^\d+\./.test(line.trim()))
    .map(ref => {
        const match = ref.match(/^(\d+)\.\s*(.*)/);
        return {
            id: match ? match[1] : Math.random().toString(),
            text: match ? match[2] : ref
        };
    });

  return (
    <div className="space-y-12 pb-20 max-w-4xl mx-auto">
      <div className="space-y-4">
        <Breadcrumbs />
        <h1 className="text-4xl font-bold tracking-tight font-primary">{referencesSection.title}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Bibliography and technical documentation used throughout the project.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {references.map((ref) => (
          <div key={ref.id} className="group p-6 rounded-xl border bg-card hover:border-primary/50 transition-all flex gap-6 items-start">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors font-mono font-bold">
              {ref.id}
            </div>
            <div className="space-y-3 flex-1">
              <p className="text-lg leading-relaxed text-card-foreground group-hover:text-primary transition-colors">
                {ref.text.split('(')[0].trim()}
              </p>
              {ref.text.includes('(') && (
                <a
                  href={ref.text.match(/\((.*?)\)/)?.[1] || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary underline decoration-dotted underline-offset-4"
                >
                  <LinkIcon size={12} />
                  {ref.text.match(/\((.*?)\)/)?.[1]}
                </a>
              )}
            </div>
            <Book size={18} className="text-muted-foreground opacity-20 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
}
