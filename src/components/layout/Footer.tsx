import React from "react";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/20 py-6 text-muted-foreground text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-400">
            <Sparkles className="h-3 w-3" />
          </div>
          <span className="font-semibold text-foreground font-sans text-xs">
            ResearchForge<span className="text-indigo-500 font-mono">AI</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono">
          <span>© {new Date().getFullYear()} ResearchForge AI</span>
          <span className="text-border">|</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            Operational
          </span>
        </div>
      </div>
    </footer>
  );
}
