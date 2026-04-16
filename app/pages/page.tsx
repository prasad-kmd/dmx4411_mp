import type { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  UserRound,
  FileText,
  BookOpen,
  GitBranch,
  Newspaper,
  Wrench,
  Users,
  Mail,
  ArrowRight,
  ShieldCheck,
  Scale,
  AlertTriangle,
  Image as ImageIcon,
  Gamepad2,
  Rss,
  FlaskConical,
  Library,
  Book,
  Github,
  FileArchive,
  Printer,
  Activity,
  Accessibility,
  ShieldAlert,
  Palette,
  Search,
  Hash,
  Heart,
  Trophy,
  Clapperboard,
  Globe,
} from "lucide-react";

import { siteConfig } from "@/lib/config";

const title = "Site Directory";
const description =
  "A comprehensive, categorized overview of all sections within the platform.";

export const metadata: Metadata = {
  title,
  description,
};

const categories = [
  {
    name: "Core Content",
    id: "core",
    description: "Primary hubs for engineering projects and documentation.",
    pages: [
      {
        name: "Home",
        href: "/",
        icon: Home,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        description: "The central hub for news and featured content.",
      },
      {
        name: "Portfolio",
        href: siteConfig.mainWebsiteUrl + "/portfolio",
        icon: UserRound,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        description: "Professional showcase of engineering expertise.",
      },
      {
        name: "Blog",
        href: siteConfig.mainWebsiteUrl + "/blog",
        icon: FileText,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
        description: "Chronological logs of the engineering journey.",
      },
      {
        name: "Articles",
        href: siteConfig.mainWebsiteUrl + "/articles",
        icon: BookOpen,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        description: "In-depth technical papers and essays.",
      },
      {
        name: "Projects",
        href: siteConfig.mainWebsiteUrl + "/projects",
        icon: GitBranch,
        color: "text-pink-500",
        bgColor: "bg-pink-500/10",
        description: "Documentation of mechanical and mechatronics builds.",
      },
      {
        name: "Tutorials",
        href: siteConfig.mainWebsiteUrl + "/tutorials",
        icon: Newspaper,
        color: "text-cyan-500",
        bgColor: "bg-cyan-500/10",
        description: "Educational resources and technical guides.",
      },
    ],
  },
  {
    name: "Engineering Hub",
    id: "engineering",
    description: "Specialized tools and technical knowledge bases.",
    pages: [
      {
        name: "Quiz Library",
        href: siteConfig.mainWebsiteUrl + "/quiz",
        icon: Trophy,
        color: "text-amber-500",
        bgColor: "bg-amber-500/10",
        description: "Interactive engineering knowledge assessments.",
      },
      {
        name: "Engineering Wiki",
        href: siteConfig.mainWebsiteUrl + "/wiki",
        icon: Book,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        description: "Searchable collection of engineering concepts.",
      },
      {
        name: "Engineering Researches",
        href: siteConfig.mainWebsiteUrl + "/researches",
        icon: FlaskConical,
        color: "text-teal-500",
        bgColor: "bg-teal-500/10",
        description: "Search scholarly articles on arXiv.",
      },
      {
        name: "Open Books",
        href: siteConfig.mainWebsiteUrl + "/open-books",
        icon: Library,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        description: "Digital resources from Open Library.",
      },
      {
        name: "Code Snippets",
        href: siteConfig.mainWebsiteUrl + "/snippets",
        icon: FileText,
        color: "text-pink-500",
        bgColor: "bg-pink-500/10",
        description: "Reusable technical shortcuts and cheatsheets.",
      },
    ],
  },
  {
    name: "Knowledge & Resources",
    id: "resources",
    description: "Downloadable assets and reference materials.",
    pages: [],
  },
  {
    name: "About & Career",
    id: "career",
    description: "Professional background and personal snapshots.",
    pages: [],
  },
  {
    name: "Legal & Technical",
    id: "legal",
    description: "Policies, status, and brand guidelines.",
    pages: [
      {
        name: "Privacy Policy",
        href: "/privacy-policy",
        icon: ShieldCheck,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        description: "How we handle your data.",
      },
      {
        name: "Terms of Service",
        href: "/terms-and-conditions",
        icon: Scale,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        description: "Rules for using this platform.",
      },
      {
        name: "Disclaimer",
        href: "/disclaimer",
        icon: AlertTriangle,
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10",
        description: "Legal limitations and liabilities.",
      },
    ],
  },
  {
    name: "Discovery",
    id: "discovery",
    description: "Integrations and site overview.",
    pages: [
      {
        name: "Global Search",
        href: "/search",
        icon: Search,
        color: "text-indigo-500",
        bgColor: "bg-indigo-500/10",
        description: "Find any content across the platform.",
      },
      {
        name: "External Links",
        href: "/external-link",
        icon: Newspaper,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
        description: "Verified external engineering resources.",
      },
    ],
  },
];

export default function PagesOverview() {
  return (
    <div className="min-h-screen px-6 py-12 lg:px-8 bg-background">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 text-center lg:text-left">
          <h1 className="mb-4 text-4xl font-bold mozilla-headline lg:text-5xl">
            Site Directory
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl google-sans">
            {description}
          </p>
        </header>

        {/* Quick Navigation */}
        <div className="sticky top-20 z-10 mb-12 flex flex-wrap justify-center gap-2 p-2 rounded-2xl bg-background/50 backdrop-blur-xl border border-border/50 shadow-sm">
          {categories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all hover:bg-primary/10 hover:text-primary text-muted-foreground local-jetbrains-mono"
            >
              {c.name.split(" ")[0]}
            </a>
          ))}
        </div>

        <div className="space-y-20">
          {categories.map((category) => (
            <section
              key={category.name}
              id={category.id}
              className="scroll-mt-32"
            >
              <div className="mb-8 border-b border-border pb-4">
                <h2 className="text-2xl font-bold mozilla-headline flex items-center gap-3">
                  {category.name}
                  <span className="text-xs font-normal text-muted-foreground uppercase tracking-widest bg-muted px-2 py-0.5 rounded">
                    {category.pages.length} Pages
                  </span>
                </h2>
                <p className="mt-1 text-muted-foreground google-sans italic text-sm">
                  {category.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.id === "resources" || category.id === "career" ? (
                  <Link
                    href={siteConfig.mainWebsiteUrl}
                    className="group relative flex flex-col items-center justify-center rounded-3xl border border-dashed border-primary/30 bg-primary/5 p-12 text-center transition-all hover:border-primary/50 hover:bg-primary/10 sm:col-span-2 lg:col-span-3 lg:p-16"
                  >
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                      <Globe className="h-8 w-8" />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold google-sans group-hover:text-primary transition-colors">
                      View {category.name} on Main Platform
                    </h3>
                    <p className="mx-auto max-w-md text-sm text-muted-foreground local-inter leading-relaxed">
                      Our comprehensive {category.name.toLowerCase()} hub, containing all professional assets, 
                      career history, and integrated resources, is hosted on our main website.
                    </p>
                    <div className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
                      Visit Main Website
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                    <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ) : (
                  category.pages.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      className="group relative flex flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${page.bgColor} ${page.color} transition-transform group-hover:scale-110`}
                        >
                          <page.icon className="h-5 w-5" />
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors google-sans">
                          {page.name}
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed local-inter line-clamp-2">
                          {page.description}
                        </p>
                      </div>
                      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  ))
                )}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-24 flex flex-col items-center gap-4 py-12 border-t border-border/50">
          <p className="text-sm text-muted-foreground google-sans italic text-center">
            Can&apos;t find what you&apos;re looking for? Use the Command
            Palette (Cmd + K) anywhere on the site.
          </p>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}
