"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Maximize2,
  RotateCcw,
  Download,
  Settings2,
  LineChart as LineChartIcon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ChartControlsProps {
  onReset?: () => void;
  onDownload?: () => void;
  onToggleLogScale?: () => void;
  isLogScale?: boolean;
  className?: string;
}

export function ChartControls({
  onReset,
  onDownload,
  onToggleLogScale,
  isLogScale,
  className,
}: ChartControlsProps) {
  return (
    <div className={cn("flex items-center gap-1 bg-muted/30 p-1 rounded-lg border w-fit", className)}>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={onReset}
        title="Reset Zoom"
      >
        <RotateCcw size={14} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={onToggleLogScale}
        title={isLogScale ? "Switch to Linear Scale" : "Switch to Log Scale"}
      >
        <LineChartIcon size={14} className={cn(isLogScale && "text-primary")} />
      </Button>

      <div className="w-[1px] h-4 bg-border mx-1" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Settings2 size={14} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onDownload}>
            <Download size={14} className="mr-2" />
            Download Data (CSV)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.print()}>
            <Maximize2 size={14} className="mr-2" />
            Full Screen (Print View)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
