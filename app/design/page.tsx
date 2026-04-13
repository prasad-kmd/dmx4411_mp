export default function DesignPage() {
  return (
    <article>
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Design</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Filter Specifications</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Three different filter types were designed to address various noise characteristics in the audio samples.
        </p>
        
        <div className="grid gap-6 md:grid-cols-3">
          <FilterCard 
            title="Low Pass Filter" 
            type="LPF" 
            order={1} 
            cutoff="300 Hz"
            audio="Crysis 3 Intro"
          />
          <FilterCard 
            title="Band Stop Filter" 
            type="BSF" 
            order={2} 
            cutoff="400-600 Hz"
            audio="Dreams (Ben Sound)"
          />
          <FilterCard 
            title="High Pass Filter" 
            type="HPF" 
            order={1} 
            cutoff="2000 Hz"
            audio="Last Summer"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Butterworth Filter Design</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Butterworth filters were chosen for their maximally flat frequency response in the passband,
          providing smooth rolloff characteristics without ripple.
        </p>
      </section>

      <div className="p-6 rounded-lg border border-border bg-card">
        <h3 className="font-semibold mb-2">Interactive Charts</h3>
        <p className="text-sm text-muted-foreground">
          Frequency response charts and spectrum plots will be displayed here once the PDF content 
          is extracted. The extraction script will process chart data from MP_Full-Report.pdf.
        </p>
      </div>
    </article>
  )
}

function FilterCard({ title, type, order, cutoff, audio }: { 
  title: string; type: string; order: number; cutoff: string; audio: string 
}) {
  return (
    <div className="p-6 rounded-lg border border-border bg-card">
      <div className="text-xs font-mono text-primary mb-2">{type}</div>
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Order:</span>
          <span>{order}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Cutoff:</span>
          <span>{cutoff}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Audio:</span>
          <span>{audio}</span>
        </div>
      </div>
    </div>
  )
}
