import { CodeBlock } from "@/components/code-block";
import contentData from "@/data/content.json";

const content = contentData as Record<string, string>;

export default function AppendixPage() {
  const fullCode = content.appendix || "% MATLAB code loading...";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold mb-4">Appendix</h1>
          <p className="text-muted-foreground">
            Complete MATLAB source code used for signal acquisition, filter design, implementation, and performance evaluation.
          </p>
        </div>
        <a
          href="/full_code.m"
          download
          className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-sm font-bold text-primary-foreground transition-all hover:scale-105"
        >
          Download .m File
        </a>
      </div>

      <CodeBlock code={fullCode} filename="audio_denoising_system.m" />
    </div>
  );
}
