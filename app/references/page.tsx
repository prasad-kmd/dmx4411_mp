import { FloatingTOC } from "@/components/floating-toc";
import { ExternalLink } from "lucide-react";

export default function ReferencesPage() {
  const references = [
    { id: "01", title: "Practical Introduction to Digital Filtering", source: "MathWorks", url: "https://www.mathworks.com/help/signal/ug/practical-introduction-to-digital-filtering.html" },
    { id: "02", title: "Introduction to Filter Designer", source: "MathWorks", url: "https://www.mathworks.com/help/signal/ug/introduction-to-filter-designer.html" },
    { id: "03", title: "Smoothing & Denoising", source: "MathWorks", url: "https://www.mathworks.com/help/signal/smoothing-and-denoising.html" },
    { id: "08", title: "Audacity [Software]", source: "Audacity Team", url: "https://www.audacityteam.org/download/" },
    { id: "10", title: "Last Summer by Ikson(tm)", source: "YouTube [Music]", url: "https://www.youtube.com/watch?v=oR41ejcZ9P4" },
    { id: "11", title: "Dreams - Chill Royalty Free Music by Bensound", source: "YouTube [Music]", url: "https://www.youtube.com/watch?v=0oH9zS6Lufw" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12">References</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        {references.map((ref) => (
          <a
            key={ref.id}
            href={ref.url}
            target="_blank"
            className="group p-6 glass rounded-2xl border-white/5 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 block">Reference {ref.id}</span>
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{ref.title}</h3>
              <p className="text-sm text-muted-foreground">{ref.source}</p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
              Access Resource <ExternalLink className="size-3" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
