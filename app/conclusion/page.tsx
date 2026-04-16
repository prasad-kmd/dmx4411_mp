import { FloatingTOC } from "@/components/floating-toc";
import { Badge } from "@/components/ui/badge";
import contentData from "@/data/content.json";
import { CheckCircle2, Award, Lightbulb, Wrench as Tool } from 'lucide-react';

const content = contentData as Record<string, string>;

export default function ConclusionPage() {
  const tocItems = [
    { id: "summary", label: "Project Summary" },
    { id: "findings", label: "Key Findings" },
    { id: "accomplishments", label: "Technical Accomplishments" },
  ];

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col xl:flex-row gap-12">
      <div className="max-w-4xl flex-1 prose dark:prose-invert">
        <h1 className="text-4xl font-bold mb-8">Conclusion</h1>

        <section id="summary" className="mb-16 scroll-mt-32">
          <h2 className="text-2xl font-bold mb-6">1. Project Summary</h2>
          <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {content.conclusion?.split('2.	Key Findings')[0] || "Content loading..."}
          </div>
        </section>

        <section id="findings" className="mb-16 scroll-mt-32">
          <h2 className="text-2xl font-bold mb-8">2. Key Findings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 glass rounded-2xl border-emerald-500/20 bg-emerald-500/5">
              <div className="flex items-center gap-3 mb-4 text-emerald-500">
                <CheckCircle2 className="size-6" />
                <h4 className="font-bold">Successful Removal</h4>
              </div>
              <p className="text-sm text-muted-foreground">Audio 1 and 3 showed effective noise reduction confirmed by subjective listening.</p>
            </div>
            <div className="p-6 glass rounded-2xl border-amber-500/20 bg-amber-500/5">
              <div className="flex items-center gap-3 mb-4 text-amber-500">
                <Award className="size-6" />
                <h4 className="font-bold">Trade-offs</h4>
              </div>
              <p className="text-sm text-muted-foreground">Aggressive filtering leads to signal degradation in overlapping frequency bands.</p>
            </div>
          </div>
        </section>

        <section id="accomplishments" className="mb-16 scroll-mt-32">
          <h2 className="text-2xl font-bold mb-8">3. Technical Accomplishments</h2>
          <div className="space-y-4">
             {[
               "FFT-based Noise Characterization",
               "Butterworth IIR Filter Design",
               "Zero-Phase Implementation (filtfilt)",
               "Objective Performance Metrics (MSE/SNR)",
               "Frequency Response Verification"
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-4 p-5 glass rounded-2xl border-white/5 group hover:border-primary/30 transition-colors">
                 <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                   <Tool className="size-5" />
                 </div>
                 <span className="font-bold">{item}</span>
               </div>
             ))}
          </div>
        </section>
      </div>
      <FloatingTOC items={tocItems} />
    </div>
  );
}
