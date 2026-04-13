"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white dark:bg-[#0a0a0a] text-center">
      <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-8">
        <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
      </div>
      <h1 className="text-4xl font-black mb-4 tracking-tight">Something went wrong</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-12 max-w-md mx-auto">
        An unexpected error occurred while rendering this page. Our team has been notified.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="default">Try again</Button>
        <Button onClick={() => window.location.href = '/'} variant="outline">Go home</Button>
      </div>
    </div>
  );
}
