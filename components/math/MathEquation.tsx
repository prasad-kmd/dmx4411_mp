"use client";

import React, { useEffect, useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import { cn } from "@/lib/utils";
import { EquationCopyMenu } from "./EquationCopyMenu";

interface MathEquationProps {
  latex: string;
  displayMode?: boolean;
  copyable?: boolean;
  label?: string;
  className?: string;
}

export function MathEquation({
  latex,
  displayMode = false,
  copyable = true,
  label,
  className,
}: MathEquationProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(latex, containerRef.current, {
          displayMode,
          throwOnError: false,
          output: "html",
        });
        setError(null);
      } catch (err) {
        console.error("KaTeX rendering error:", err);
        setError(latex);
      }
    }
  }, [latex, displayMode]);

  const content = (
    <div
      className={cn(
        "relative group",
        displayMode ? "my-8 flex justify-center" : "inline-block",
        className
      )}
    >
      <div
        ref={containerRef}
        className={cn(
          "transition-colors duration-200",
          copyable && "cursor-pointer hover:bg-accent/10 rounded px-1 -mx-1"
        )}
      />
      {error && (
        <span className="text-destructive font-mono text-sm">
          [Math Error: {error}]
        </span>
      )}
      {label && displayMode && (
        <span className="absolute right-0 bottom-0 text-xs text-muted-foreground translate-y-6">
          ({label})
        </span>
      )}
    </div>
  );

  if (copyable) {
    return (
      <EquationCopyMenu latex={latex}>
        {content}
      </EquationCopyMenu>
    );
  }

  return content;
}
