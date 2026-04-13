"use client";

import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathEquationProps {
  equation: string;
  displayMode?: boolean;
}

const MathEquation: React.FC<MathEquationProps> = ({ equation, displayMode = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);

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

  return <div ref={containerRef} className="my-4 overflow-x-auto" />;
};

export default MathEquation;
