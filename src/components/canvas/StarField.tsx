"use client";

import React, { useMemo } from "react";

export function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.6 + 0.2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
      {/* Dark Obsidian & Midnight Fog Background */}
      <div className="absolute inset-0 bg-[#030712] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,58,237,0.15),rgba(5,8,22,0.95))]" />

      {/* Atmospheric Fog Layers */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-gradient-to-br from-indigo-600/10 via-purple-700/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[500px] bg-gradient-to-tl from-cyan-500/10 via-indigo-600/5 to-transparent rounded-full blur-3xl" />

      {/* Star Particles */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white animate-pulse"
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
