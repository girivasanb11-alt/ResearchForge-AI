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
    // Generate star coordinates client-side to prevent SSR hydration mismatches
    const generatedStars = Array.from({ length: 85 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.2 + 0.6,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.45 + 0.2,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none">
      {/* LAYER 1: Deep Space Background Base (#020617 -> #030712 -> #050816) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#030712] to-[#050816]" />

      {/* LAYER 2: Atmospheric Volumetric Drifting Fog Glows */}
      {/* 1. Bottom-Left Electric Purple Volumetric Fog */}
      <div className="absolute -bottom-28 -left-28 w-[950px] h-[750px] bg-gradient-to-tr from-purple-900/35 via-indigo-950/25 to-transparent rounded-full blur-[140px] animate-pulse duration-1000" />

      {/* 2. Top-Center Ethereal Blue/Purple Halo */}
      <div className="absolute -top-32 left-1/3 w-[700px] h-[600px] bg-gradient-to-br from-indigo-800/20 via-purple-900/15 to-transparent rounded-full blur-[130px]" />

      {/* 3. Center-Right Cyan Atmospheric Glow */}
      <div className="absolute top-1/4 right-0 w-[800px] h-[700px] bg-gradient-to-tl from-cyan-950/25 via-indigo-950/20 to-transparent rounded-full blur-[150px]" />

      {/* 4. Cinematic Soft Vignette Ring */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40 mix-blend-multiply" />

      {/* Star Particles */}
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
