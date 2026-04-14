"use client";

import React from "react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-4xl font-bold text-destructive">Critical Error</h1>
          <p className="text-muted-foreground">
            The application encountered a critical error and cannot continue.
            Please reload the page or try again later.
          </p>
          <button
            onClick={() => reset()}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
