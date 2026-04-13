"use client";

import React, { useEffect, useRef, useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Copy, Check } from 'lucide-react';

interface MathEquationProps {
  equation: string;
  displayMode?: boolean;
}

const MathEquation: React.FC<MathEquationProps> = ({ equation, displayMode = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(equation, containerRef.current, {
          displayMode,
          throwOnError: false,
        });
      } catch (err) {
        console.error("KaTeX rendering error:", err);
      }
    }
  }, [equation, displayMode]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(equation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      <div ref={containerRef} className="overflow-x-auto py-4 px-2" />
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
        title="Copy LaTeX"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};

export default MathEquation;
