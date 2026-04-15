"use client";

import React from "react";
import contentData from "@/data/content.json";
import { TableOfContents } from "@/components/navigation/TableOfContents";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export default function IntroductionPage() {
  const introSection = contentData.sections.find(s => s.id === "introduction");

  if (!introSection) {
    return <div>Section not found</div>;
  }

  return (
    <div className="flex gap-12 pb-20">
      <div className="flex-1 space-y-12">
        <Breadcrumbs />
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight font-primary">{introSection.title}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Background, Problem Statement, and Objectives of the Audio Signal Denoising project.
        </p>
      </div>

        <div className="space-y-12">
          {introSection.subsections.map((sub) => (
            <section key={sub.id} id={sub.id} className="space-y-6 scroll-mt-24">
              <h2 className="text-2xl font-bold font-primary border-b pb-2">{sub.title}</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {sub.content.split('\n\n').map((paragraph, i) => (
                paragraph.trim() && <p key={i} className="leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </section>
          ))}
        </div>
      </div>
      <TableOfContents />
    </div>
  );
}
