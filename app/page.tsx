import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <section className="space-y-4">
        <h1 className="text-5xl font-bold tracking-tight">Audio Signal Denoising System</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Welcome to the digital signal processing mini project report. This website presents our findings on removing various types of noise from audio signals using MATLAB.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-xl bg-card hover:shadow-lg transition-shadow space-y-3">
          <h2 className="text-2xl font-bold">Introduction</h2>
          <p className="text-muted-foreground text-sm">Background, problem statement and project objectives.</p>
          <Link href="/introduction" className="inline-block text-primary font-medium hover:underline">View Introduction →</Link>
        </div>
        <div className="p-6 border rounded-xl bg-card hover:shadow-lg transition-shadow space-y-3">
          <h2 className="text-2xl font-bold">Methodology</h2>
          <p className="text-muted-foreground text-sm">Signal acquisition and MATLAB implementation details.</p>
          <Link href="/methodology" className="inline-block text-primary font-medium hover:underline">View Methodology →</Link>
        </div>
      </div>

      <section className="p-8 rounded-2xl bg-primary text-primary-foreground space-y-4">
        <h2 className="text-3xl font-bold">Project Overview</h2>
        <p className="opacity-90 leading-relaxed">
          Removing Noise (AWGN, Impulse, Periodic) from audio signals using Low-pass, High-pass, and Band-stop filters.
        </p>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20">
            <span className="font-bold">3</span> Audio Files
          </div>
          <div className="px-4 py-2 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20">
            <span className="font-bold">3</span> Filter Types
          </div>
        </div>
      </section>
    </div>
  );
}
