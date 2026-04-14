import React from "react";
import { Terminal, Code, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodePlaceholderProps {
  filename?: string;
  description?: string;
  steps?: string[];
  className?: string;
}

export function CodePlaceholder({
  filename,
  description,
  steps,
  className,
}: CodePlaceholderProps) {
  return (
    <div className={cn("my-6 rounded-xl border-2 border-dashed bg-muted/30 overflow-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-2 border-b bg-background/50">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-muted-foreground" />
          <span className="text-xs font-mono font-medium text-muted-foreground italic">
            {filename || "matlab_script.m"} (pending extraction)
          </span>
        </div>
        <Code size={14} className="text-muted-foreground opacity-50" />
      </div>

      <div className="p-6 space-y-4">
        {description && (
          <div className="flex gap-3">
            <Info size={16} className="text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        )}

        {steps && steps.length > 0 && (
          <div className="space-y-2 font-mono text-[13px]">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Expected Logic:</p>
            <div className="space-y-1.5 border-l-2 border-primary/20 pl-4 py-1">
              {steps.map((step, i) => (
                <div key={i} className="text-muted-foreground flex gap-2">
                  <span className="opacity-30">{i + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1.5 opacity-10 select-none pointer-events-none pt-2">
          <div className="h-2 w-3/4 bg-muted-foreground rounded" />
          <div className="h-2 w-1/2 bg-muted-foreground rounded" />
          <div className="h-2 w-2/3 bg-muted-foreground rounded" />
        </div>
      </div>
    </div>
  );
}
