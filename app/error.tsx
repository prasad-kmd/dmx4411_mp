"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <div className="bg-destructive/10 p-4 rounded-full mb-6">
        <AlertTriangle size={48} className="text-destructive" />
      </div>
      <h2 className="text-2xl font-bold mb-2 font-primary">Something went wrong</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        We encountered an error while loading this section. This might be a temporary issue.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity font-medium"
        >
          <RefreshCw size={18} />
          Try Again
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors font-medium"
        >
          <Home size={18} />
          Return Home
        </Link>
      </div>
      {process.env.NODE_ENV === "development" && (
        <div className="mt-12 p-4 bg-muted rounded-lg text-left max-w-2xl overflow-auto border">
          <p className="font-mono text-xs text-destructive mb-2">{error.message}</p>
          <pre className="font-mono text-[10px] text-muted-foreground whitespace-pre-wrap">
            {error.stack}
          </pre>
        </div>
      )}
    </div>
  );
}
