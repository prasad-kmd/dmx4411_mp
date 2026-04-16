import { FloatingTOC } from "@/components/floating-toc";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import contentData from "@/data/content.json";

const content = contentData as Record<string, string>;

export default function DiscussionPage() {
  const tocItems = [
    { id: "effectiveness", label: "Filter Effectiveness" },
    { id: "limitations", label: "Approach Limitations" },
    { id: "improvements", label: "Suggested Improvements" },
  ];

  const limitations = [
    { title: "Fixed Filter Parameters", content: "Filters do not adapt to variations in noise characteristics over time (non-stationary noise)." },
    { title: "Noise/Signal Overlap", content: "Frequency-selective filters remove all content in stopband, potentially degrading desired signal harmonics." },
    { title: "Harmonic Interference", content: "Single notch filters do not address harmonic series often found in mechanical fan noise." },
    { title: "Manual Design Process", content: "Requires expertise and time-consuming spectral analysis for each file." },
  ];

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col xl:flex-row gap-12">
      <div className="max-w-4xl flex-1 prose dark:prose-invert">
        <h1 className="text-4xl font-bold mb-8">Discussion</h1>

        <section id="effectiveness" className="mb-16 scroll-mt-32">
          <h2 className="text-2xl font-bold mb-6">1. Effectiveness of Designed Filters</h2>
          <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap mb-8">
            {content.discussion?.split('2.	Filter Design Tool')[0] || "Content loading..."}
          </div>
        </section>

        <section id="limitations" className="mb-16 scroll-mt-32">
          <h2 className="text-2xl font-bold mb-8">2. Limitations of the Approach</h2>
          <Accordion type="single" collapsible className="w-full">
            {limitations.map((lim, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                <AccordionTrigger className="text-lg font-bold hover:text-primary transition-colors">
                  {lim.title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {lim.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section id="improvements" className="mb-16 scroll-mt-32">
          <h2 className="text-2xl font-bold mb-6">3. Suggested Improvements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {[
               "Machine Learning & Deep Denoising",
               "Adaptive Filtering (LMS/RLS)",
               "Spectral Subtraction (STFT)",
               "Multi-Band Parametric EQ",
               "Real-Time Implementation",
               "Perceptually-Optimized Design"
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-3 p-4 glass rounded-xl border-white/5">
                 <div className="size-2 rounded-full bg-primary" />
                 <span className="text-sm font-medium">{item}</span>
               </div>
             ))}
          </div>
        </section>
      </div>
      <FloatingTOC items={tocItems} />
    </div>
  );
}
