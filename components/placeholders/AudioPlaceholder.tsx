import React from "react";
import { AudioLines, FileWarning, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioPlaceholderProps {
  label: string;
  description?: string;
  expectedDuration?: string;
  className?: string;
}

export function AudioPlaceholder({
  label,
  description,
  expectedDuration,
  className,
}: AudioPlaceholderProps) {
  return (
    <div className={cn("my-6 p-6 rounded-xl border-2 border-dashed bg-muted/30 space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="p-2 rounded-lg bg-background border shadow-sm">
            <AudioLines size={20} />
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider">{label}</h4>
            <p className="text-[10px] font-mono">Status: Awaiting Asset</p>
          </div>
        </div>
        <FileWarning size={16} className="text-muted-foreground opacity-40" />
      </div>

      {description && (
        <div className="flex gap-2">
            <Info size={14} className="text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed italic">
            {description}
            </p>
        </div>
      )}

      <div className="pt-2 flex items-center justify-between border-t border-dashed">
        <div className="flex gap-4">
            <div className="space-y-0.5">
                <p className="text-[9px] uppercase font-bold text-muted-foreground">Format</p>
                <p className="text-xs font-mono">WAV (PCM)</p>
            </div>
            {expectedDuration && (
                <div className="space-y-0.5">
                    <p className="text-[9px] uppercase font-bold text-muted-foreground">Duration</p>
                    <p className="text-xs font-mono">~{expectedDuration}</p>
                </div>
            )}
        </div>
        <div className="h-6 w-24 bg-muted-foreground/10 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
