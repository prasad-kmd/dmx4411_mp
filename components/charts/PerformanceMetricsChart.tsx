"use client";

import React from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

interface PerformanceMetricsChartProps {
  data: { name: string; value: number; type: "mse" | "snr" }[];
}

const chartConfig = {
  value: {
    label: "Metric Value",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function PerformanceMetricsChart({ data }: PerformanceMetricsChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
        <XAxis
          dataKey="name"
          fontSize={10}
          stroke="hsl(var(--muted-foreground))"
        />
        <YAxis
          fontSize={10}
          stroke="hsl(var(--muted-foreground))"
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.value < 0 ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
