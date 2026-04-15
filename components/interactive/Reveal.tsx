"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className
}: RevealProps) {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;

    const x = direction === "left" ? -50 : direction === "right" ? 50 : 0;
    const y = direction === "up" ? 50 : direction === "down" ? -50 : 0;

    gsap.fromTo(el,
      {
        opacity: 0,
        x,
        y
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        delay,
        duration,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, [direction, delay, duration]);

  return (
    <div ref={revealRef} className={className}>
      {children}
    </div>
  );
}
