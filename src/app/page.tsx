import React from "react";
import { Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)] items-center justify-center p-6 text-center">
      <div className="w-full max-w-3xl mx-auto space-y-6">
        {/* Minimal Logo & Title */}
        <div className="flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-sans">
            ResearchForge<span className="text-indigo-500 font-mono">AI</span>
          </h1>
        </div>

        {/* Empty Layout Container */}
        <div className="rounded-3xl border border-dashed border-border/80 bg-card/40 p-12 backdrop-blur-sm space-y-3">
          <p className="text-sm font-mono text-muted-foreground">
            Content removed for redesign
          </p>
          <p className="text-xs text-muted-foreground/60 font-mono">
            Empty layout container ready for new design system.
          </p>
        </div>
      </div>
    </div>
  );
}
