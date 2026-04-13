export default function ReferencesPage() {
  const references = [
    { id: 1, text: 'Oppenheim, A. V., & Schafer, R. W. (2010). Discrete-Time Signal Processing (3rd ed.). Prentice Hall.', type: 'book' },
    { id: 2, text: 'Proakis, J. G., & Manolakis, D. K. (2007). Digital Signal Processing (4th ed.). Pearson Education.', type: 'book' },
    { id: 3, text: 'Smith, S. W. (1997). The Scientist and Engineer\'s Guide to Digital Signal Processing. California Technical Publishing.', type: 'book' },
    { id: 4, text: 'MathWorks. (2024). MATLAB Signal Processing Toolbox Documentation. Retrieved from mathworks.com', type: 'web' },
    { id: 5, text: 'Lyons, R. G. (2011). Understanding Digital Signal Processing (3rd ed.). Prentice Hall.', type: 'book' },
  ]

  return (
    <article>
      <h1 className="text-3xl md:text-4xl font-bold mb-8">References</h1>
      
      <div className="space-y-6">
        {references.map((ref) => (
          <div key={ref.id} className="p-4 rounded-lg border border-border bg-card">
            <div className="flex gap-4">
              <span className="text-sm font-mono text-muted-foreground">[{ref.id}]</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{ref.text}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
