import SectionLayout from "@/components/sections/section-layout";
import PDFViewer from "@/components/pdf-viewer/pdf-viewer";
import { SafeLink } from "@/components/ui/safe-link";

export default function ReferencesPage() {
  return (
    <SectionLayout
      title="References"
      subtitle="Source material, software tools, and research documentation"
    >
      <div className="space-y-12 prose prose-invert max-w-none pb-20">
        <section>
          <h2 id="references" className="font-google-sans font-bold">Research References</h2>
          <p className="local-inter text-muted-foreground leading-relaxed">
            The following resources were utilized for theoretical background, MATLAB implementation guidance, and software tools.
          </p>

          <div className="not-prose space-y-6 my-10">
            {/* Software & Tools */}
            <div className="p-6 rounded-3xl border border-border bg-card">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 3v18"/><path d="M3 9h18"/></svg>
                Software & Tools
              </h4>
              <ul className="list-none p-0 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-xs font-bold text-muted-foreground mt-0.5 whitespace-nowrap">01.</span>
                  <div className="text-sm">
                    <strong>MATLAB 2024b</strong> by MathWorks. Including "Signal Analyzer" & "Filter Designer" interactive apps (Built-in "Signal Processing Toolbox 24.2").
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xs font-bold text-muted-foreground mt-0.5 whitespace-nowrap">02.</span>
                  <div className="text-sm">
                    <strong>Audacity</strong>. Open-source audio editor used for MP3 to WAV conversion.
                    <SafeLink href="https://www.audacityteam.org/download/" className="ml-2 inline-flex items-center gap-1 text-primary hover:underline font-bold">
                       Download <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </SafeLink>
                  </div>
                </li>
              </ul>
            </div>

            {/* Documentation */}
            <div className="p-6 rounded-3xl border border-border bg-card">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>
                Academic & Documentation
              </h4>
              <ul className="list-none p-0 space-y-3">
                <li className="flex items-start gap-3 group">
                  <span className="text-xs font-bold text-muted-foreground mt-0.5 whitespace-nowrap">03.</span>
                  <div className="text-sm">
                    <strong>Practical Introduction to Digital Filtering</strong>, MathWorks.
                    <SafeLink href="https://www.mathworks.com/help/signal/ug/practical-introduction-to-digital-filtering.html" className="block text-primary/60 hover:text-primary transition-colors truncate font-medium">View Documentation</SafeLink>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <span className="text-xs font-bold text-muted-foreground mt-0.5 whitespace-nowrap">04.</span>
                  <div className="text-sm">
                    <strong>Signal Processing Toolbox</strong>, MathWorks. Frequency domain analysis using the FFT.
                    <SafeLink href="https://www.mathworks.com/help/signal/ug/frequency-domain-analysis-using-the-fft.html" className="block text-primary/60 hover:text-primary transition-colors truncate font-medium">View Documentation</SafeLink>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <span className="text-xs font-bold text-muted-foreground mt-0.5 whitespace-nowrap">05.</span>
                  <div className="text-sm">
                    <strong>Smoothing & Denoising</strong>, MathWorks. Techniques for signal enhancement.
                  </div>
                </li>
              </ul>
            </div>

            {/* Music Assets */}
            <div className="p-6 rounded-3xl border border-border bg-card">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                Music & Audio Assets
              </h4>
              <ul className="list-none p-0 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-xs font-bold text-muted-foreground mt-0.5 whitespace-nowrap">06.</span>
                  <div className="text-sm"><strong>Crysis 3 (PC) OST</strong> by Crytek G.m.b.H</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xs font-bold text-muted-foreground mt-0.5 whitespace-nowrap">07.</span>
                  <div className="text-sm"><strong>Last Summer</strong> by Ikson(tm).</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xs font-bold text-muted-foreground mt-0.5 whitespace-nowrap">08.</span>
                  <div className="text-sm"><strong>Dreams</strong> - Chill Royalty Free Music by Bensound.</div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 id="full-report" className="font-google-sans font-bold">Research Report Viewer</h2>
          <p className="local-inter text-muted-foreground leading-relaxed">
            The complete 42-page technical report is available below for in-depth review of methodology, mathematical derivations, and detailed results.
          </p>
          <div className="not-prose mt-8">
            <PDFViewer 
               url="/MP_Full-Report.pdf"
               title="DMX4411 Mini Project Report"
            />
          </div>
        </section>
      </div>
    </SectionLayout>
  );
}
