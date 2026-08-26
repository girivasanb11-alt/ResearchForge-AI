"use client";

import React from "react";
import { CheckCircle2, XCircle, HelpCircle, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface HypothesisBoardProps {
  hypotheses: {
    id: string;
    statement: string;
    status: "investigating" | "validated" | "refuted" | "inconclusive";
    confidence: number;
  }[];
}

export function HypothesisBoard({ hypotheses }: HypothesisBoardProps) {
  const getStatusBadge = (status: "investigating" | "validated" | "refuted" | "inconclusive") => {
    switch (status) {
      case "validated":
        return (
          <Badge variant="success" className="text-[10px] font-mono flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>Validated</span>
          </Badge>
        );
      case "refuted":
        return (
          <Badge variant="warning" className="text-[10px] font-mono flex items-center gap-1 text-rose-400 bg-rose-500/10 border-rose-500/30">
            <XCircle className="h-3 w-3" />
            <span>Refuted</span>
          </Badge>
        );
      case "investigating":
        return (
          <Badge variant="cyan" className="text-[10px] font-mono flex items-center gap-1">
            <Activity className="h-3 w-3 animate-pulse" />
            <span>Investigating</span>
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-[10px] font-mono flex items-center gap-1">
            <HelpCircle className="h-3 w-3" />
            <span>Inconclusive</span>
          </Badge>
        );
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card/90 shadow-2xl p-6 backdrop-blur-xl space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-border/70">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <span>Hypothesis & Falsification Board</span>
            <Badge variant="purple" className="font-mono text-[10px]">
              {hypotheses.length} Active
            </Badge>
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Adversarial cross-checking against contradictory literature.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {hypotheses.map((hyp, i) => (
          <div
            key={hyp.id}
            className="p-4 rounded-xl border border-border/70 bg-secondary/20 space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <span className="text-xs font-mono font-bold text-indigo-400 mt-0.5">
                  H{i + 1}:
                </span>
                <p className="text-xs text-foreground font-medium leading-relaxed">
                  {hyp.statement}
                </p>
              </div>
              {getStatusBadge(hyp.status)}
            </div>

            <div className="space-y-1 pt-1 border-t border-border/40">
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span>Empirical Confidence:</span>
                <span className="text-indigo-400 font-bold">{hyp.confidence}%</span>
              </div>
              <Progress value={hyp.confidence} className="h-1.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
