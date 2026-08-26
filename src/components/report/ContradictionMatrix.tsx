"use client";

import React from "react";
import { GitCompare, CheckCircle2, Sparkles } from "lucide-react";
import { ContradictionPoint } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface ContradictionMatrixProps {
  contradictions: ContradictionPoint[];
}

export function ContradictionMatrix({ contradictions }: ContradictionMatrixProps) {
  if (contradictions.length === 0) {
    return (
      <div className="p-8 rounded-3xl border border-border bg-card/60 text-center space-y-2">
        <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
        <h3 className="text-sm font-bold text-foreground">High Empirical Consensus (100%)</h3>
        <p className="text-xs text-muted-foreground">
          No unresolved scientific contradictions or experimental conflicts identified across ingested literature.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card/90 shadow-2xl p-6 sm:p-8 backdrop-blur-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div>
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <GitCompare className="h-5 w-5 text-amber-400" />
            <span>Scientific Contradiction & Consensus Matrix</span>
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Automated detection and triangulation of conflicting claims across independent laboratories.
          </p>
        </div>

        <Badge variant="warning" className="font-mono text-xs">
          {contradictions.length} Active Debates
        </Badge>
      </div>

      {/* Contradiction Items */}
      <div className="space-y-6">
        {contradictions.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl border border-border/80 bg-secondary/20 space-y-5"
          >
            {/* Debate Title & Consensus Score */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400">DEBATE #{idx + 1}:</span>
                <h4 className="text-sm font-bold text-foreground">{item.topic}</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-muted-foreground">Consensus Level:</span>
                <Badge variant={item.consensusScore > 60 ? "cyan" : "warning"} className="font-mono text-[10px]">
                  {item.consensusScore}% Agreement
                </Badge>
              </div>
            </div>

            {/* Two Conflicting Perspectives Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* View A */}
              <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-400">HYPOTHESIS A</span>
                  <Badge variant="secondary" className="text-[9px] font-mono">
                    Weight: {item.viewA.evidenceWeight}
                  </Badge>
                </div>
                <p className="text-xs text-foreground font-medium leading-relaxed">
                  &ldquo;{item.viewA.claim}&rdquo;
                </p>
                <div className="text-[11px] text-muted-foreground font-mono pt-1">
                  Advocates: {item.viewA.advocates.join(", ")}
                </div>
              </div>

              {/* View B */}
              <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-purple-400">HYPOTHESIS B</span>
                  <Badge variant="secondary" className="text-[9px] font-mono">
                    Weight: {item.viewB.evidenceWeight}
                  </Badge>
                </div>
                <p className="text-xs text-foreground font-medium leading-relaxed">
                  &ldquo;{item.viewB.claim}&rdquo;
                </p>
                <div className="text-[11px] text-muted-foreground font-mono pt-1">
                  Advocates: {item.viewB.advocates.join(", ")}
                </div>
              </div>
            </div>

            {/* Reconciled Synthesis Model */}
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400">
                <Sparkles className="h-4 w-4" />
                <span>Multi-Mechanism Reconciled Synthesis:</span>
              </div>
              <p className="text-xs text-foreground/90 leading-relaxed font-sans">
                {item.synthesis}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
