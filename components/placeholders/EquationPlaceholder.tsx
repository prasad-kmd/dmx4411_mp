import React from "react";
import { Sigma, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface EquationPlaceholderProps {
  label?: string;
  description?: string;
  variables?: string[];
  className?: string;
}

export function EquationPlaceholder({
  label,
  description,
  variables,
  className,
}: EquationPlaceholderProps) {
  return (
    <div className={cn("my-8 p-6 rounded-xl border-2 border-dashed bg-muted/30 space-y-4", className)}>
      <div className="flex items-center gap-3 text-muted-foreground">
        <div className="p-2 rounded-lg bg-background border shadow-sm">
          <Sigma size={20} />
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider">
            {label || "Mathematical Equation"}
          </h4>
          <p className="text-xs">Formula extraction in progress</p>
        </div>
      </div>

      {description && (
        <p className="text-sm text-muted-foreground leading-relaxed italic">
          &quot;{description}&quot;
        </p>
      )}

      {variables && variables.length > 0 && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Info size={12} />
            <span>Variables & Constants:</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
            {variables.map((v, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                <span className="text-primary font-mono">•</span>
                {v}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pt-4 flex justify-center opacity-20 select-none pointer-events-none">
        <Sigma size={48} className="text-muted-foreground" />
      </div>
    </div>
  );
}
