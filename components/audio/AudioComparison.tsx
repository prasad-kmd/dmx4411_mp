"use client";

import React, { useState } from "react";
import { CustomAudioPlayer } from "./CustomAudioPlayer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  ToggleGroup,
  ToggleGroupItem
} from "@/components/ui/toggle-group";
import { LayoutGrid, Layers, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioComparisonProps {
  originalSrc: string;
  filteredSrc: string;
  label: string;
  metrics?: {
    mse: string;
    snrOrig: string;
    snrFilt: string;
    improvement: string;
  };
  className?: string;
}

export function AudioComparison({
  originalSrc,
  filteredSrc,
  label,
  metrics,
  className
}: AudioComparisonProps) {
  const [viewMode, setViewMode] = useState<"side-by-side" | "toggle">("side-by-side");

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold font-primary">{label}</h3>
          <p className="text-sm text-muted-foreground">Compare the original noisy signal with the filtered output.</p>
        </div>

        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(v) => v && setViewMode(v as "side-by-side" | "toggle")}
          className="justify-start"
        >
          <ToggleGroupItem value="side-by-side" aria-label="Side by Side" title="Side by Side">
            <LayoutGrid size={16} className="mr-2" />
            <span className="text-xs">Grid</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="toggle" aria-label="Toggle View" title="Toggle View">
            <Layers size={16} className="mr-2" />
            <span className="text-xs">Tabs</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {viewMode === "side-by-side" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomAudioPlayer
            src={originalSrc}
            label="Original (Noisy)"
            className="border-destructive/20 bg-destructive/5"
          />
          <CustomAudioPlayer
            src={filteredSrc}
            label="Filtered (Clean)"
            className="border-green-500/20 bg-green-500/5"
          />
        </div>
      ) : (
        <Tabs defaultValue="filtered" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="original">Original</TabsTrigger>
            <TabsTrigger value="filtered">Filtered</TabsTrigger>
          </TabsList>
          <TabsContent value="original">
            <CustomAudioPlayer
              src={originalSrc}
              label="Original (Noisy)"
              className="border-destructive/20 bg-destructive/5"
            />
          </TabsContent>
          <TabsContent value="filtered">
            <CustomAudioPlayer
              src={filteredSrc}
              label="Filtered (Clean)"
              className="border-green-500/20 bg-green-500/5"
            />
          </TabsContent>
        </Tabs>
      )}

      {metrics && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border bg-muted/30">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">MSE</p>
            <p className="text-sm font-mono">{metrics.mse}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Orig. SNR</p>
            <p className="text-sm font-mono">{metrics.snrOrig} dB</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Filt. SNR</p>
            <p className="text-sm font-mono">{metrics.snrFilt} dB</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Improvement</p>
            <p className={cn(
              "text-sm font-bold font-mono",
              parseFloat(metrics.improvement) >= 0 ? "text-green-600" : "text-destructive"
            )}>
              {metrics.improvement} dB
            </p>
          </div>
        </div>
      )}

      <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10 text-xs text-muted-foreground leading-relaxed">
        <Info size={14} className="text-primary mt-0.5 shrink-0" />
        <p>
          Switch between original and filtered tracks to hear the noise suppression effectiveness.
          {viewMode === "toggle" && " Use the tabs above to toggle sources without changing layout."}
        </p>
      </div>
    </div>
  );
}
