import React from "react";
import Link from "next/link";
import { Home, BookOpen, BarChart3, FlaskConical } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
      <div className="relative mb-8">
        <h1 className="text-9xl font-black text-primary/10 select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold font-primary">Page Not Found</span>
        </div>
      </div>

      <p className="text-muted-foreground mb-12 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved to a new frequency.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 w-full max-w-3xl">
        <Link href="/introduction" className="p-4 rounded-xl border hover:border-primary hover:bg-primary/5 transition-all group">
          <BookOpen className="mx-auto mb-2 text-muted-foreground group-hover:text-primary" size={24} />
          <span className="text-sm font-medium">Introduction</span>
        </Link>
        <Link href="/methodology" className="p-4 rounded-xl border hover:border-primary hover:bg-primary/5 transition-all group">
          <FlaskConical className="mx-auto mb-2 text-muted-foreground group-hover:text-primary" size={24} />
          <span className="text-sm font-medium">Methodology</span>
        </Link>
        <Link href="/results" className="p-4 rounded-xl border hover:border-primary hover:bg-primary/5 transition-all group">
          <BarChart3 className="mx-auto mb-2 text-muted-foreground group-hover:text-primary" size={24} />
          <span className="text-sm font-medium">Results</span>
        </Link>
      </div>

      <Link
        href="/"
        className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full hover:scale-105 transition-transform font-bold"
      >
        <Home size={20} />
        Back to Homepage
      </Link>
    </div>
  );
}
