export default function DiscussionPage() {
  return (
    <article>
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Discussion</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Effectiveness Analysis</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The implemented filters demonstrated varying levels of effectiveness depending on the 
          noise characteristics and filter parameters.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Simple Butterworth filters may not handle complex noise profiles</li>
          <li>Fixed cutoff frequencies limit adaptability</li>
          <li>Phase distortion in filtered signals</li>
          <li>Trade-off between noise removal and signal preservation</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Potential Improvements</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Adaptive filtering techniques</li>
          <li>Machine learning-based noise identification</li>
          <li>Multi-band processing</li>
          <li>Higher-order filter designs</li>
        </ul>
      </section>
    </article>
  )
}
