export default function MethodologyPage() {
  return (
    <article>
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Methodology</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Signal Processing Workflow</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Our approach follows a systematic digital signal processing workflow to analyze and filter audio signals.
        </p>
        
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <StepCard number={1} title="Acquisition" description="Load audio files" />
          <StepCard number={2} title="Analysis" description="FFT spectrum analysis" />
          <StepCard number={3} title="Design" description="Filter specification" />
          <StepCard number={4} title="Implementation" description="Apply filters" />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">MATLAB Implementation</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The complete MATLAB implementation is available in the Appendix section. Key functions include:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><code className="bg-muted px-2 py-0.5 rounded">fft()</code> - Fast Fourier Transform for frequency analysis</li>
          <li><code className="bg-muted px-2 py-0.5 rounded">butter()</code> - Butterworth filter design</li>
          <li><code className="bg-muted px-2 py-0.5 rounded">freqz()</code> - Frequency response computation</li>
          <li><code className="bg-muted px-2 py-0.5 rounded">filter()</code> - Digital filter application</li>
        </ul>
      </section>

      <div className="p-6 rounded-lg border border-border bg-card">
        <h3 className="font-semibold mb-2">Note</h3>
        <p className="text-sm text-muted-foreground">
          This page will be populated with detailed methodology content extracted from the PDF report. 
          The extraction script will process the MP_Full-Report.pdf to extract all sections, equations, 
          and code snippets.
        </p>
      </div>
    </article>
  )
}

function StepCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg border border-border bg-card text-center">
      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold">
        {number}
      </div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}
