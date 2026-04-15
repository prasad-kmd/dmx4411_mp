import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/interactive/Reveal";
import {
  ArrowRight,
  AudioLines,
  Filter,
  Code,
  TrendingUp,
  BookOpen,
  FlaskConical,
  Settings,
  BarChart3,
  CheckCircle
} from "lucide-react";

export default function Home() {
  const stats = [
    { label: "Audio Signals", value: "3", icon: AudioLines, description: "Different noise environments" },
    { label: "Digital Filters", value: "3", icon: Filter, description: "LPF, BSF, and HPF designs" },
    { label: "Implementation", value: "MATLAB", icon: Code, description: "R2024b Signal Processing" },
    { label: "SNR Improvement", value: "Perceptual", icon: TrendingUp, description: "Subjective quality gain" },
  ];

  const sections = [
    {
      title: "Introduction",
      description: "Background and context of audio noise removal in consumer electronics.",
      href: "/introduction",
      icon: BookOpen,
    },
    {
      title: "Methodology",
      description: "Signal acquisition and FFT analysis techniques using MATLAB.",
      href: "/methodology",
      icon: FlaskConical,
    },
    {
      title: "Design",
      description: "Detailed filter design calculations and frequency response analysis.",
      href: "/design",
      icon: Settings,
    },
    {
      title: "Results",
      description: "Quantitative and qualitative analysis of the denoising performance.",
      href: "/results",
      icon: BarChart3,
    },
    {
      title: "Conclusion",
      description: "Key findings and technical accomplishments of the research.",
      href: "/conclusion",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <Reveal direction="down" className="relative py-20 flex flex-col items-center text-center space-y-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,var(--primary)_0%,transparent_100%)] opacity-[0.03]" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase border border-primary/20">
          Undergraduate Research Project
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl font-primary">
          Audio Signal <span className="text-primary">Denoising</span> System
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Exploring advanced digital signal processing techniques to remove high-frequency hiss,
          tonal interference, and low-frequency rumble from audio recordings using MATLAB.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/introduction"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
          >
            Explore Project <ArrowRight size={20} />
          </Link>
          <Link
            href="/MP_Full-Report.pdf"
            target="_blank"
            className="px-8 py-3 bg-card border rounded-full font-bold hover:bg-accent transition-colors"
          >
            Download Report
          </Link>
        </div>
      </Reveal>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Reveal key={i} delay={i * 0.1} direction="up" className="h-full">
            <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors group h-full">
              <stat.icon className="mb-4 text-muted-foreground group-hover:text-primary transition-colors" size={24} />
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm font-semibold mb-2">{stat.label}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{stat.description}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Section Previews */}
      <section className="space-y-12">
        <Reveal direction="up" className="text-center space-y-4">
          <h2 className="text-3xl font-bold font-primary">Project Roadmap</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Navigate through the different stages of our research and implementation.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, i) => (
            <Reveal key={i} delay={i * 0.1} direction="up" className="h-full">
              <Link
                href={section.href}
                className="p-8 rounded-2xl border bg-card hover:bg-accent/50 hover:shadow-xl hover:-translate-y-1 transition-all group h-full flex flex-col"
              >
                <section.icon className="mb-6 text-primary" size={32} />
                <h3 className="text-xl font-bold mb-3">{section.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                  {section.description}
                </p>
                <div className="flex items-center gap-2 text-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight size={16} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="p-12 rounded-3xl bg-primary text-primary-foreground text-center space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

        <h2 className="text-3xl font-bold relative z-10">Ready to hear the results?</h2>
        <p className="text-primary-foreground/80 max-w-xl mx-auto relative z-10">
          Listen to the original noisy recordings compared side-by-side with our filtered outputs.
        </p>
        <Link
          href="/results"
          className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-bold hover:scale-105 transition-transform relative z-10 shadow-lg"
        >
          View Comparisons
        </Link>
      </section>
    </div>
  );
}
