import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BookOpen, AudioWaveform, Code2, BarChart3 } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Digital Signal Processing Mini Project
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Audio Noise Removal using MATLAB
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            An interactive exploration of filter design and implementation for removing noise from audio signals using digital signal processing techniques.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/introduction"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="/public/MP_Full-Report.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              View PDF Report
            </a>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <FeatureCard
            icon={BookOpen}
            title="Theory & Background"
            description="Learn about DSP fundamentals, FFT analysis, and filter design principles"
            href="/introduction"
          />
          <FeatureCard
            icon={AudioWaveform}
            title="Audio Samples"
            description="Listen to original noisy audio and filtered results with interactive players"
            href="/results"
          />
          <FeatureCard
            icon={Code2}
            title="MATLAB Code"
            description="Explore the complete MATLAB implementation with syntax highlighting"
            href="/appendix"
          />
          <FeatureCard
            icon={BarChart3}
            title="Visual Analysis"
            description="Interactive spectrum plots and filter response charts"
            href="/design"
          />
        </motion.div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-lg border border-border p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <div className="text-sm text-muted-foreground">Audio Samples</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <div className="text-sm text-muted-foreground">Filter Types</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">44.1kHz</div>
              <div className="text-sm text-muted-foreground">Sample Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">+20dB</div>
              <div className="text-sm text-muted-foreground">SNR Improvement</div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="group p-6 rounded-lg border border-border bg-card hover:border-accent hover:bg-accent/10 transition-all duration-300"
    >
      <Icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  )
}
