import React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Target, Lightbulb, ArrowRight, Settings, Cpu, HardDrive, ShieldCheck } from "lucide-react"
import Roadmap from "@/components/roadmap"
import { siteConfig } from "@/lib/config"
const title = `About ${siteConfig.author}`
const description =
  "A personal engineering initiative focused on solving real-world challenges through innovative mechanical and mechatronics solutions."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/about",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(title)}`,
        width: 1280,
        height: 720,
        alt: description,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`/api/og?title=${encodeURIComponent(title)}`],
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative border-b border-border">
        <Image src="/img/about_us.webp" alt="About Me" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight text-balance lg:text-5xl amoriaregular">About My Journey</h1>
            <p className="mt-6 text-lg leading-8 text-gray-200 text-pretty">
              {siteConfig.description}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Core Pillars */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-lg">
            <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-4 text-primary">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="mb-4 text-xl font-bold">Mission</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {siteConfig.mission.content[0]}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-lg">
            <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-4 text-primary">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h2 className="mb-4 text-xl font-bold">Vision</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              To become a leading platform for sharing technical knowledge and engineering excellence through high-fidelity documentation.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-lg">
            <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-4 text-primary">
              <Cpu className="h-6 w-6" />
            </div>
            <h2 className="mb-4 text-xl font-bold">Strategy</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Utilizing modern web frameworks and technical pipelines to present complex engineering concepts in an intuitive way.
            </p>
          </div>
        </div>

        <div className="mt-24 grid gap-16 lg:grid-cols-2">
          {/* Detailed Context */}
          <div className="space-y-8">
            <section>
              <h2 className="mb-6 text-3xl font-bold philosopher">Professional Context</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {siteConfig.mission.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            {/* Engineering Toolbox */}
            <section className="rounded-2xl border border-border bg-muted/30 p-8">
              <h2 className="mb-6 text-2xl font-bold philosopher flex items-center gap-2">
                <Settings className="h-6 w-6 text-primary" />
                Engineering Toolbox
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {siteConfig.toolbox.map((category, idx) => {
                  const Icon = idx === 0 ? HardDrive : idx === 1 ? Cpu : idx === 2 ? Target : ShieldCheck;
                  return (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center gap-2 font-semibold text-foreground">
                        <Icon className="h-4 w-4 text-primary" />
                        {category.title}
                      </div>
                      <ul className="text-xs text-muted-foreground space-y-1 ml-6 list-disc">
                        {category.items.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Project Roadmap */}
          <section>
            <h2 className="mb-8 text-3xl font-bold philosopher flex items-center gap-3">
              Project Roadmap
            </h2>
            <div className="rounded-2xl border border-border bg-card p-8">
              <Roadmap />
            </div>
          </section>
        </div>

        {/* CTA Section */}
        <section className="mt-24 rounded-3xl bg-primary/5 border border-primary/20 p-12 text-center backdrop-blur-sm">
          <h2 className="mb-4 text-3xl font-bold philosopher">Interested in my work?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Explore my latest project logs, technical articles, and demonstrations as I work towards developing innovative engineering solutions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              href="/portfolio" 
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              View Portfolio
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-8 py-3 font-semibold transition-all hover:bg-muted"
            >
              Read My Blog
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
