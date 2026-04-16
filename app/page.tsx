import DspHero from "@/components/dsp-hero";
import ProjectHighlights from "@/components/project-highlights";
import Link from "next/link";
import { FileText, BookOpen, GitBranch, Newspaper, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <DspHero />

      {/* Project Highlights Section */}
      <ProjectHighlights />

      {/* Content Navigation Section */}
      <section className="px-6 py-24 lg:px-8 border-t border-border bg-muted/5">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold philosopher lg:text-4xl">
              Research Documentation
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground local-inter">
              Access the complete research lifecycle, from initial signal acquisition to final performance evaluation.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Introduction",
                href: "/introduction",
                icon: FileText,
                desc: "Project background, problem statement, and core objectives.",
                color: "text-blue-500",
                bg: "bg-blue-500/10"
              },
              {
                title: "Methodology",
                href: "/methodology",
                icon: GitBranch,
                desc: "Signal acquisition, time-domain and frequency-domain analysis.",
                color: "text-emerald-500",
                bg: "bg-emerald-500/10"
              },
              {
                title: "Filter Design",
                href: "/design/noise-identification",
                icon: Newspaper,
                desc: "Mathematical design and implementation of Butterworth filters.",
                color: "text-purple-500",
                bg: "bg-purple-500/10"
              },
              {
                title: "Results",
                href: "/results/performance-metrics",
                icon: BookOpen,
                desc: "Quantitative evaluation using MSE and SNR metrics.",
                color: "text-orange-500",
                bg: "bg-orange-500/10"
              },
              {
                title: "Discussion",
                href: "/discussion",
                icon: FileText,
                desc: "Critical analysis of findings and system limitations.",
                color: "text-rose-500",
                bg: "bg-rose-500/10"
              },
              {
                title: "Conclusion",
                href: "/conclusion",
                icon: BookOpen,
                desc: "Final project summary and learning outcomes.",
                color: "text-cyan-500",
                bg: "bg-cyan-500/10"
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className={`mb-6 inline-flex rounded-xl ${item.bg} p-4 ${item.color} group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold font-google-sans">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed local-inter mb-6">
                  {item.desc}
                </p>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-primary">
                  Enter Section
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Abstract/Mission Section */}
      <section className="px-6 py-24 lg:px-8 border-t border-border">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-3xl font-bold philosopher lg:text-4xl">
            Project Abstract
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-google-sans italic">
            <p>
              "This project addresses the challenge of background noise in digital audio signals through an automated, signal processing-based system. By analyzing the spectral characteristics of corrupted audio files, we design and apply targeted digital filters—Low-Pass, Notch, and High-Pass—using the Butterworth approximation."
            </p>
            <p>
              "The system's performance is evaluated using both subjective listening tests and objective quantitative metrics, providing insights into the trade-offs between noise suppression and signal preservation in real-world engineering scenarios."
            </p>
          </div>
        </div>
      </section>

      {/* Manual Page Navigation (Compact) */}
      <div className="mx-auto max-w-6xl px-6 pb-20 lg:px-8">
        <div className="flex justify-end border-t border-border pt-10">
          <Link
            href="/introduction"
            className="group flex flex-col gap-1.5 min-w-[160px] text-right transition-all hover:translate-x-1"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-1 justify-end group-hover:text-primary transition-colors">
              Next Section <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
            </span>
            <span className="text-[13px] font-bold font-google-sans text-foreground group-hover:text-primary transition-colors">
              Introduction
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
