import React from "react";

export function Logo({ className = "h-5 w-5", textClassName = "text-base font-bold" }: { className?: string; textClassName?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      {/* 3-Dot Colorful Gradient Logo Icon */}
      <div className={`relative flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Cyan Dot */}
          <circle cx="10" cy="11" r="6" fill="#38BDF8" />
          {/* Blue Dot */}
          <circle cx="22" cy="11" r="6" fill="#6366F1" fillOpacity="0.9" />
          {/* Purple Dot */}
          <circle cx="16" cy="21" r="6" fill="#A855F7" />
        </svg>
      </div>
      <span className={`tracking-tight text-white font-sans ${textClassName}`}>
        ResearchForge <span className="font-semibold text-slate-100">AI</span>
      </span>
    </div>
  );
}
