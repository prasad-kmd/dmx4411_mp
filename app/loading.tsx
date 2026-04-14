import React from "react";

export default function Loading() {
  return (
    <div className="w-full space-y-8 animate-pulse">
      <div className="h-10 bg-muted rounded-md w-1/3 mb-4" />
      <div className="h-6 bg-muted rounded-md w-2/3 mb-8" />

      <div className="space-y-4">
        <div className="h-32 bg-muted rounded-xl w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-64 bg-muted rounded-xl w-full" />
          <div className="h-64 bg-muted rounded-xl w-full" />
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-[90%]" />
      </div>
    </div>
  );
}
