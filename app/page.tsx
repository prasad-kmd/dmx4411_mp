export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-4xl font-bold mb-4 font-primary">DSP Mini Project</h1>
      <p className="text-xl mb-8 font-primary">
        Audio Signal Denoising System using MATLAB
      </p>
      <div className="p-4 bg-muted rounded-lg font-mono">
        <p>Testing monospace font: JetBrains Mono</p>
        <code className="text-sm">const dsp = &quot;signal processing&quot;;</code>
      </div>
    </div>
  );
}
