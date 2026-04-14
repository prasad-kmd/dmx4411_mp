"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Copy, Code, FileCode, FileText } from "lucide-react";
import { toast } from "sonner";

interface EquationCopyMenuProps {
  latex: string;
  children: React.ReactNode;
}

export function EquationCopyMenu({ latex, children }: EquationCopyMenuProps) {
  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success(`${format} copied to clipboard`);
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy to clipboard");
      }
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="center">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium px-2 py-1.5 text-muted-foreground uppercase tracking-wider">
            Copy Format
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start font-normal"
            onClick={() => copyToClipboard(latex, "LaTeX")}
          >
            <Code className="mr-2 h-4 w-4" />
            <span>LaTeX Source</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start font-normal"
            onClick={() => copyToClipboard(`$${latex}$`, "Markdown")}
          >
            <Copy className="mr-2 h-4 w-4" />
            <span>Markdown Inline</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start font-normal"
            onClick={() => copyToClipboard(`\\[ ${latex} \\]`, "Markdown")}
          >
            <FileCode className="mr-2 h-4 w-4" />
            <span>Markdown Block</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start font-normal"
            onClick={() => copyToClipboard(latex.replace(/\\[a-zA-Z]+/g, ""), "Plain Text")}
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>Plain Text</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
