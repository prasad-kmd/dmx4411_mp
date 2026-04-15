import React from "react";
import { BarChart3, LineChart, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChartPlaceholderProps {
  title: string;
  type?: "line" | "bar" | "area";
  description?: string;
  className?: string;
}

export function ChartPlaceholder({
  title,
  type = "line",
  description,
  className,
}: ChartPlaceholderProps) {
  return (
    <div className={cn("my-6 p-8 rounded-xl border-2 border-dashed bg-muted/30 flex flex-col items-center text-center space-y-4", className)}>
      <div className="p-4 rounded-full bg-background border shadow-sm text-muted-foreground opacity-50">
        {type === "bar" ? <BarChart3 size={32} /> : <LineChart size={32} />}
      </div>

      <div className="space-y-1">
        <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground font-mono">Visualization data extraction pending</p>
      </div>

      {description && (
        <div className="flex gap-2 max-w-md">
            <Info size={14} className="text-primary mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed italic">
            {description}
            </p>
        </div>
      )}

      <div className="w-full max-w-md pt-4 grid grid-cols-6 gap-2 items-end h-16 opacity-10 select-none">
        <div className="h-1/2 bg-primary rounded-t" />
        <div className="h-3/4 bg-primary rounded-t" />
        <div className="h-full bg-primary rounded-t" />
        <div className="h-1/4 bg-primary rounded-t" />
        <div className="h-2/3 bg-primary rounded-t" />
        <div className="h-1/2 bg-primary rounded-t" />
      </div>
    </div>
  );
}
