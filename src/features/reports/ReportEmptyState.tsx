"use client";

import React from "react";
import Link from "next/link";
import { FileText, PlusCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReportEmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-border/80 bg-card/40 p-12 sm:p-16 text-center max-w-2xl mx-auto space-y-5 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
        <FileText className="h-7 w-7" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold tracking-tight text-foreground font-sans">
          No reports generated
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
          Autonomous research dossiers compiled by TrueForge multi-agent swarms will appear here with full citation trails, market projections, and export options.
        </p>
      </div>

      <div className="pt-2 flex items-center justify-center gap-3">
        <Link href="/research">
          <Button variant="glow" size="sm" className="text-xs font-mono font-bold flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Launch New Research</span>
          </Button>
        </Link>
      </div>

      <div className="pt-4 border-t border-border/40 text-[11px] font-mono text-muted-foreground flex items-center justify-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-purple-400" />
        <span>Synthesizes PDF & Markdown with verified DOIs</span>
      </div>
    </div>
  );
}
