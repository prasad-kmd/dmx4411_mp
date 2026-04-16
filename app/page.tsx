import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PROJECT_DATA } from "@/lib/constants";
import { ArrowRight, Play, AudioWaveform as Waveform } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="flex flex-col items-center text-center space-y-8 mb-24">
        <Badge variant="outline" className="px-4 py-1 rounded-full border-primary/20 bg-primary/5 text-primary">
          DMX4411 Signal Processing Mini Project
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent leading-tight">
          {PROJECT_DATA.title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          {PROJECT_DATA.subtitle}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" className="rounded-full gap-2 group" asChild>
            <Link href="/introduction">
              Explore Research <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full gap-2" asChild>
            <a href="/MP_Full-Report.pdf" target="_blank">
              View Report PDF
            </a>
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {PROJECT_DATA.audioSignals.map((signal) => (
          <Card key={signal.id} className="group relative overflow-hidden">
            <CardContent className="p-8">
              <div className="mb-6 flex justify-between items-start">
                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <Waveform className="size-6" />
                </div>
                <Badge>{signal.filterType}</Badge>
              </div>
              <h3 className="text-2xl font-bold mb-2">{signal.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Noise: <span className="text-foreground font-medium">{signal.noiseType}</span>
              </p>
              <Button variant="secondary" className="w-full rounded-xl gap-2 group/btn">
                <Play className="size-4 fill-current group-hover/btn:scale-110 transition-transform" />
                Listen Samples
              </Button>
            </CardContent>
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </Card>
        ))}
      </div>
    </div>
  );
}
