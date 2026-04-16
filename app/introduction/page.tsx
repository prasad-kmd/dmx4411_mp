import { FloatingTOC } from "@/components/floating-toc";
import contentData from "@/data/content.json";

const content = contentData as Record<string, string>;

export default function IntroductionPage() {
  const tocItems = [
    { id: "background", label: "Background and Context" },
    { id: "problem", label: "Problem Statement" },
    { id: "objectives", label: "Project Objectives" },
  ];

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col xl:flex-row gap-12">
      <div className="max-w-4xl flex-1 prose dark:prose-invert">
        <h1 className="text-4xl font-bold mb-8">Introduction</h1>

        <section id="background" className="mb-12 scroll-mt-32">
          <h2 className="text-2xl font-bold mb-4">Background and Context</h2>
          <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {content.introduction ? content.introduction.split('2.\tProblem Statement')[0] : "Content loading..."}
          </div>
        </section>

        <section id="problem" className="mb-12 scroll-mt-32">
          <h2 className="text-2xl font-bold mb-4">Problem Statement</h2>
          <div className="glass p-6 rounded-2xl border-primary/20 bg-primary/5 mb-6">
             <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {content.introduction ? content.introduction.split('2.\tProblem Statement')[1]?.split('3.\tProject Objective')[0] : "Content loading..."}
             </div>
          </div>
        </section>

        <section id="objectives" className="mb-12 scroll-mt-32">
          <h2 className="text-2xl font-bold mb-4">Project Objectives</h2>
          <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {content.introduction ? content.introduction.split('3.\tProject Objective')[1] : "Content loading..."}
          </div>
        </section>
      </div>
      <FloatingTOC items={tocItems} />
    </div>
  );
}
