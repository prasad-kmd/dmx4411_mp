"use client";

import React from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

interface FilterResponseChartProps {
  data: { freq: number; mag: number; phase: number }[];
  type: "magnitude" | "phase";
}

const chartConfig = {
  mag: {
    label: "Magnitude (dB)",
    color: "hsl(var(--primary))",
  },
  phase: {
    label: "Phase (deg)",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export function FilterResponseChart({ data, type }: FilterResponseChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
        <XAxis
          dataKey="freq"
          type="number"
          fontSize={10}
          stroke="hsl(var(--muted-foreground))"
          tickFormatter={(val) => `${val}Hz`}
        />
        <YAxis
          fontSize={10}
          stroke="hsl(var(--muted-foreground))"
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey={type === "magnitude" ? "mag" : "phase"}
          stroke={type === "magnitude" ? "var(--color-mag)" : "var(--color-phase)"}
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ChartContainer>
  );
}
