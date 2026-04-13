export default function ConclusionPage() {
  return (
    <article>
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Conclusion</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Summary</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          This project successfully demonstrated the application of digital signal processing 
          techniques for audio noise removal using MATLAB.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Key Findings</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Butterworth filters provide effective noise reduction for specific frequency bands</li>
          <li>FFT analysis is crucial for identifying noise characteristics</li>
          <li>Filter order affects both performance and computational complexity</li>
          <li>SNR improvements of 18-24 dB were achieved across test samples</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Accomplishments</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Implemented complete DSP workflow in MATLAB</li>
          <li>Designed and tested three different filter types</li>
          <li>Analyzed frequency spectra before and after filtering</li>
          <li>Quantified performance using standard metrics</li>
        </ul>
      </section>
    </article>
  )
}
