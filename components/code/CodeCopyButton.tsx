"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CodeCopyButtonProps {
  code: string;
  className?: string;
}

export function CodeCopyButton({ code, className }: CodeCopyButtonProps) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setState("copied");
      toast.success("Code copied to clipboard");
      setTimeout(() => setState("idle"), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
      setState("error");
      toast.error("Failed to copy code");
      setTimeout(() => setState("idle"), 2000);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8 transition-all", className)}
      onClick={copy}
    >
      {state === "idle" && <Copy size={14} />}
      {state === "copied" && <Check size={14} className="text-green-500" />}
      {state === "error" && <X size={14} className="text-destructive" />}
      <span className="sr-only">Copy code</span>
    </Button>
  );
}
