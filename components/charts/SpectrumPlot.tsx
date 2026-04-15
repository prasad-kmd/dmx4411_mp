"use client";

import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

interface SpectrumPlotProps {
  data: { frequency: number; magnitude: number; filteredMagnitude?: number }[];
  title?: string;
  showFiltered?: boolean;
}

const chartConfig = {
  magnitude: {
    label: "Original",
    color: "hsl(var(--destructive))",
  },
  filteredMagnitude: {
    label: "Filtered",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function SpectrumPlot({ data, title, showFiltered = false }: SpectrumPlotProps) {
  return (
    <div className="space-y-4">
      {title && <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{title}</h4>}
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorOrig" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-magnitude)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--color-magnitude)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorFilt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-filteredMagnitude)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--color-filteredMagnitude)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis
            dataKey="frequency"
            type="number"
            domain={[0, 'dataMax']}
            tickFormatter={(val) => `${val}Hz`}
            fontSize={10}
            stroke="hsl(var(--muted-foreground))"
          />
          <YAxis
            fontSize={10}
            stroke="hsl(var(--muted-foreground))"
            tickFormatter={(val) => val.toFixed(3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="magnitude"
            stroke="var(--color-magnitude)"
            fillOpacity={1}
            fill="url(#colorOrig)"
            strokeWidth={2}
          />
          {showFiltered && (
            <Area
              type="monotone"
              dataKey="filteredMagnitude"
              stroke="var(--color-filteredMagnitude)"
              fillOpacity={1}
              fill="url(#colorFilt)"
              strokeWidth={2}
            />
          )}
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
