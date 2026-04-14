"use client";

import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuShortcut
} from "@/components/ui/context-menu";
import {
  Copy,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  Home,
  Download,
  Share2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useThemeStore } from "@/lib/theme-store";

export function CustomContextMenu({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { toggleMode } = useThemeStore();

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Back</span>
          <ContextMenuShortcut>Alt+←</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => router.forward()}>
          <ArrowRight className="mr-2 h-4 w-4" />
          <span>Forward</span>
          <ContextMenuShortcut>Alt+→</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => window.location.reload()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          <span>Reload</span>
          <ContextMenuShortcut>Ctrl+R</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem onClick={() => router.push("/")}>
          <Home className="mr-2 h-4 w-4" />
          <span>Go to Home</span>
        </ContextMenuItem>
        <ContextMenuItem onClick={copyUrl}>
          <Copy className="mr-2 h-4 w-4" />
          <span>Copy Page URL</span>
        </ContextMenuItem>
        <ContextMenuItem onClick={toggleMode}>
          <RefreshCw className="mr-2 h-4 w-4" />
          <span>Toggle Dark Mode</span>
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem>
          <Download className="mr-2 h-4 w-4" />
          <span>Download Report</span>
        </ContextMenuItem>
        <ContextMenuItem>
          <Share2 className="mr-2 h-4 w-4" />
          <span>Share Project</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
