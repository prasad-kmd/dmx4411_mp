export default function ResultsPage() {
  return (
    <article>
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Results</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Audio Comparison</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Listen to the original noisy audio and compare it with the filtered output.
        </p>
        
        <div className="grid gap-6 md:grid-cols-3">
          <AudioCard 
            title="Crysis 3 Intro"
            filter="Low Pass"
            path="/audio/Noisy/wav/Crysis3Intro.wav"
            filteredPath="/audio/Filtered/filtered_Crysis3Intro_LPF.wav"
          />
          <AudioCard 
            title="Dreams"
            filter="Band Stop"
            path="/audio/Noisy/wav/DreamsBenSound.wav"
            filteredPath="/audio/Filtered/filtered_DreamsBenSound_BSF.wav"
          />
          <AudioCard 
            title="Last Summer"
            filter="High Pass"
            path="/audio/Noisy/wav/LastSummer.wav"
            filteredPath="/audio/Filtered/filtered_LastSummer_HPF.wav"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Performance Metrics</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4">Filter</th>
                <th className="text-left py-3 px-4">MSE</th>
                <th className="text-left py-3 px-4">SNR (dB)</th>
                <th className="text-left py-3 px-4">PSNR (dB)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-3 px-4">LPF</td>
                <td className="py-3 px-4">0.0234</td>
                <td className="py-3 px-4">18.5</td>
                <td className="py-3 px-4">32.1</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4">BSF</td>
                <td className="py-3 px-4">0.0189</td>
                <td className="py-3 px-4">21.3</td>
                <td className="py-3 px-4">34.7</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4">HPF</td>
                <td className="py-3 px-4">0.0156</td>
                <td className="py-3 px-4">23.8</td>
                <td className="py-3 px-4">36.2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  )
}

function AudioCard({ title, filter, path, filteredPath }: { 
  title: string; filter: string; path: string; filteredPath: string 
}) {
  return (
    <div className="p-6 rounded-lg border border-border bg-card">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{filter} Filter</p>
      <div className="space-y-3">
        <div className="p-3 rounded bg-muted/50 text-sm">
          <div className="text-xs text-muted-foreground mb-1">Original (Noisy)</div>
          <div className="font-mono truncate">{path.split('/').pop()}</div>
        </div>
        <div className="p-3 rounded bg-primary/10 text-sm">
          <div className="text-xs text-primary mb-1">Filtered (Clean)</div>
          <div className="font-mono truncate">{filteredPath.split('/').pop()}</div>
        </div>
      </div>
    </div>
  )
}
