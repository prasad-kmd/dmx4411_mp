"use client";

import React from "react";
import {
  ResponsiveContainer,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface BaseChartProps {
  data: Record<string, unknown>[];
  config: ChartConfig;
  children: React.ReactNode;
  xAxisKey?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  height?: number;
  className?: string;
}

export function BaseChart({
  data,
  config,
  children,
  xAxisKey: _xAxisKey,
  xAxisLabel,
  yAxisLabel,
  height = 350,
  className,
}: BaseChartProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = _xAxisKey;
  return (
    <div className={cn("w-full bg-card rounded-xl border p-4 shadow-sm", className)}>
      <ChartContainer config={config} className={cn("w-full", `h-[${height}px]`)}>
        <ResponsiveContainer width="100%" height={height}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {React.cloneElement(children as React.ReactElement<any>, { data })}
        </ResponsiveContainer>
      </ChartContainer>

      {(xAxisLabel || yAxisLabel) && (
        <div className="flex justify-between px-2 mt-2 text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
          <span>{xAxisLabel}</span>
          <span>{yAxisLabel}</span>
        </div>
      )}
    </div>
  );
}
