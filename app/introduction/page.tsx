import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function IntroductionPage() {
  return (
    <article className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Introduction</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Background</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Digital Signal Processing (DSP) is a fundamental technology that has revolutionized how we analyze, 
          modify, and synthesize signals. In the modern era of digital audio, noise removal has become an 
          essential application of DSP techniques, finding uses in telecommunications, audio engineering, 
          medical imaging, and countless other fields.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          This project explores the practical implementation of digital filters for removing unwanted noise 
          from audio signals using MATLAB, providing hands-on experience with core DSP concepts including 
          Fourier analysis, filter design, and frequency-domain processing.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Problem Statement</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Audio recordings often contain various types of noise that degrade quality and intelligibility. 
          Common noise sources include:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>High-frequency hiss from recording equipment</li>
          <li>Low-frequency hum from electrical interference</li>
          <li>Narrowband noise from specific frequency sources</li>
          <li>Environmental background noise</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          The challenge lies in designing filters that effectively remove these unwanted components while 
          preserving the desired audio content and maintaining signal quality.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Objectives</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <ObjectiveCard
            title="Understand DSP Fundamentals"
            description="Learn core concepts of digital signal processing, sampling theory, and frequency analysis"
          />
          <ObjectiveCard
            title="Implement FFT Analysis"
            description="Apply Fast Fourier Transform to analyze frequency content of audio signals"
          />
          <ObjectiveCard
            title="Design Digital Filters"
            description="Create Butterworth low-pass, high-pass, and band-stop filters for noise removal"
          />
          <ObjectiveCard
            title="Evaluate Performance"
            description="Assess filter effectiveness using metrics like SNR, MSE, and subjective audio quality"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Project Structure</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          This interactive website presents our findings in a structured manner:
        </p>
        <div className="space-y-3">
          <SectionLink href="/methodology" title="Methodology" description="Signal acquisition and processing workflow" />
          <SectionLink href="/design" title="Design" description="Filter specifications and frequency response analysis" />
          <SectionLink href="/results" title="Results" description="Audio comparisons and performance metrics" />
          <SectionLink href="/discussion" title="Discussion" description="Analysis of effectiveness and limitations" />
          <SectionLink href="/conclusion" title="Conclusion" description="Summary of findings and accomplishments" />
        </div>
      </section>

      <div className="flex justify-end mt-12">
        <Link
          href="/methodology"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Continue to Methodology
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </article>
  )
}

function ObjectiveCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg border border-border bg-card">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function SectionLink({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <Link href={href} className="block p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/10 transition-colors">
      <div className="font-medium">{title}</div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </Link>
  )
}
