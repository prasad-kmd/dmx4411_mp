"use client";

import React from "react";
import contentData from "@/data/content.json";
import { TableOfContents } from "@/components/navigation/TableOfContents";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export default function DiscussionPage() {
  const discussionSection = contentData.sections.find(s => s.id === "discussion");

  if (!discussionSection) {
    return <div>Section not found</div>;
  }

  return (
    <div className="flex gap-12 pb-20">
      <div className="flex-1 space-y-12">
        <Breadcrumbs />
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight font-primary">{discussionSection.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Critical analysis of filter effectiveness, design tool usage, and project limitations.
          </p>
        </div>

        <div className="space-y-12">
          {discussionSection.subsections.map((sub) => (
            <section key={sub.id} id={sub.id} className="space-y-6 scroll-mt-24">
              <h2 className="text-2xl font-bold font-primary border-b pb-2">{sub.title}</h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {sub.content.split('\n\n').map((paragraph, i) => (
                  paragraph.trim() && <p key={i} className="leading-relaxed">{paragraph}</p>
                ))}
              </div>

              {/* Nested sub-sections (e.g., Audio 1, 2, 3 analysis) */}
              {sub.subsections.length > 0 && (
                <div className="space-y-8 ml-4 border-l-2 pl-6">
                  {sub.subsections.map((child) => (
                    <div key={child.id} id={child.id} className="space-y-4 scroll-mt-24">
                      <h3 className="text-xl font-bold font-primary">{child.title}</h3>
                      <div className="prose prose-sm prose-slate dark:prose-invert max-w-none">
                        {child.content.split('\n\n').map((p, i) => (
                          p.trim() && <p key={i}>{p}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
      <TableOfContents />
    </div>
  );
}
