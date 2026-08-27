"use client";

import React, { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function StarField() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate star positions client-side to prevent SSR hydration mismatch
    const generatedStars = Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.8,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.5 + 0.15,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none">
      {/* Deep Obsidian Background Base */}
      <div className="absolute inset-0 bg-[#030612]" />

      {/* Atmospheric Glowing Radial Vignettes matching reference */}
      {/* Bottom-left glow under particle wave */}
      <div className="absolute -bottom-20 -left-20 w-[800px] h-[600px] bg-gradient-to-tr from-purple-900/30 via-indigo-950/20 to-transparent rounded-full blur-[120px]" />

      {/* Top-left glow behind iridescent bubble */}
      <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-800/15 via-purple-900/10 to-transparent rounded-full blur-[100px]" />

      {/* Center-right glow behind dashboard */}
      <div className="absolute top-1/3 right-10 w-[700px] h-[600px] bg-gradient-to-tl from-cyan-950/20 via-indigo-950/15 to-transparent rounded-full blur-[130px]" />

      {/* Star Particles - Rendered client-side only */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white/90 animate-pulse"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
