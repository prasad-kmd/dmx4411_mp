import { Hero } from "@/components/hero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PROJECT_DATA } from "@/lib/constants";
import { ArrowRight, Play, AudioWaveform as Waveform, FileText, Settings, BarChart3, Binary } from "lucide-react";

export default function Home() {
  const bentoItems = [
    { title: "Introduction", description: "Background, Problem Statement and Objectives", href: "/introduction", icon: FileText, color: "bg-blue-500" },
    { title: "Methodology", description: "Signal Acquisition and MATLAB Implementation", href: "/methodology", icon: Settings, color: "bg-emerald-500" },
    { title: "Design", description: "Filter selection and mathematical calculations", href: "/design", icon: Binary, color: "bg-violet-500" },
    { title: "Results", description: "SNR/MSE analysis and performance metrics", href: "/results", icon: BarChart3, color: "bg-amber-500" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Project Overview Cards */}
      <section className="container mx-auto px-4 py-24 border-t border-border/40">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Highlights</h2>
            <p className="text-muted-foreground">
              Three distinct audio signals were analyzed and processed using specialized Butterworth IIR filters to address specific noise profiles.
            </p>
          </div>
          <Button variant="outline" className="rounded-full" asChild>
            <Link href="/methodology">View Full Methodology</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECT_DATA.audioSignals.map((signal) => (
            <Card key={signal.id} className="group relative overflow-hidden">
              <CardContent className="p-8">
                <div className="mb-6 flex justify-between items-start">
                  <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5">
                    <Waveform className="size-6" />
                  </div>
                  <Badge variant="secondary" className="rounded-full">{signal.filterType}</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-2">{signal.name}</h3>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1 font-bold">Filename</p>
                <p className="text-sm font-mono mb-6 bg-white/5 p-2 rounded-lg border border-white/5">{signal.filename}</p>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm border-b border-border/40 pb-2">
                    <span className="text-muted-foreground">Noise Type</span>
                    <Badge variant="outline" className="text-[10px]">{signal.noiseType}</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-border/40 pb-2">
                    <span className="text-muted-foreground">Fund. Freq</span>
                    <span className="font-mono text-xs">{signal.fundamentalFreq} Hz</span>
                  </div>
                </div>

                <Button variant="secondary" className="w-full mt-8 rounded-xl gap-2 group/btn">
                  <Play className="size-4 fill-current group-hover/btn:scale-110 transition-transform" />
                  Listen Sample
                </Button>
              </CardContent>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Card>
          ))}
        </div>
      </section>

      {/* Magic Bento Navigation Placeholder */}
      <section className="container mx-auto px-4 py-24 bg-primary/[0.02] border-y border-border/40">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive Research Navigation</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Deep dive into the specific phases of the project, from initial signal acquisition to final performance evaluation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bentoItems.map((item, i) => (
            <Link key={i} href={item.href} className="group">
              <Card className="h-full border-white/5 hover:border-primary/50 transition-all duration-500 overflow-hidden relative">
                <CardContent className="p-8 flex flex-col h-full relative z-10">
                  <div className={`size-12 rounded-2xl ${item.color} flex items-center justify-center text-white mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon className="size-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-8 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                    Explore <ArrowRight className="size-4" />
                  </div>
                </CardContent>
                <div className="absolute -right-4 -bottom-4 size-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
