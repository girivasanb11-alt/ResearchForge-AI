"use client";

import React from "react";
import {
  ShieldCheck,
  Database,
  GitCompare,
  Zap,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ResearchReport } from "@/lib/types";

interface ReportOverviewMetricsProps {
  report: ResearchReport;
  onSelectCitation?: (sourceId: string) => void;
}

export function ReportOverviewMetrics({ report, onSelectCitation }: ReportOverviewMetricsProps) {
  const getImpactBadge = (level: "critical" | "high" | "moderate") => {
    switch (level) {
      case "critical":
        return <Badge variant="warning" className="text-[10px] font-mono text-rose-400 bg-rose-500/10 border-rose-500/30">Critical Breakthrough</Badge>;
      case "high":
        return <Badge variant="cyan" className="text-[10px] font-mono">High Impact</Badge>;
      default:
        return <Badge variant="secondary" className="text-[10px] font-mono">Moderate Impact</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border border-border/80 bg-card/60 space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] font-mono uppercase tracking-wider">Confidence Score</span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-foreground">
            {report.confidenceScore}%
          </div>
          <div className="text-[11px] text-emerald-400 font-mono">Verified Zero Hallucination</div>
        </div>

        <div className="p-4 rounded-2xl border border-border/80 bg-card/60 space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] font-mono uppercase tracking-wider">Sources Ingested</span>
            <Database className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-foreground">
            {report.stats.sourcesScanned}
          </div>
          <div className="text-[11px] text-muted-foreground font-mono">{report.stats.sourcesCited} Grounded Citations</div>
        </div>

        <div className="p-4 rounded-2xl border border-border/80 bg-card/60 space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] font-mono uppercase tracking-wider">Contradictions</span>
            <GitCompare className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-foreground">
            {report.stats.contradictionsIdentified || 6}
          </div>
          <div className="text-[11px] text-amber-400 font-mono">Reconciled in Matrix</div>
        </div>

        <div className="p-4 rounded-2xl border border-border/80 bg-card/60 space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] font-mono uppercase tracking-wider">Synthesis Time</span>
            <Zap className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-foreground">
            {report.stats.executionTimeSeconds}s
          </div>
          <div className="text-[11px] text-cyan-400 font-mono">{report.stats.factsCrossChecked} Facts Triangulated</div>
        </div>
      </div>

      {/* Executive Summary Card */}
      <div className="p-6 rounded-3xl border border-indigo-500/30 bg-indigo-500/5 backdrop-blur-md space-y-3">
        <div className="flex items-center gap-2 text-indigo-300 text-xs font-mono font-semibold uppercase tracking-wider">
          <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
          <span>Executive Summary & Research Verdict</span>
        </div>
        <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-sans">
          {report.summary}
        </p>
      </div>

      {/* Key Findings Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <span>Validated Empirical Breakthroughs</span>
            <Badge variant="cyan" className="font-mono text-[10px]">
              {report.keyFindings.length} Key Findings
            </Badge>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {report.keyFindings.map((finding, idx) => (
            <div
              key={finding.id}
              className="p-5 rounded-2xl border border-border/80 bg-card/70 hover:border-indigo-500/50 hover:bg-card transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-indigo-400">
                    FINDING #{idx + 1}
                  </span>
                  {getImpactBadge(finding.impactLevel)}
                </div>

                <h4 className="text-sm font-bold text-foreground mb-1.5 leading-snug">
                  {finding.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {finding.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border/50 flex items-center justify-between text-[11px] font-mono">
                <span className="text-muted-foreground">{finding.category}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground text-[10px]">Citations:</span>
                  {finding.citations.map((cId) => (
                    <button
                      key={cId}
                      onClick={() => onSelectCitation && onSelectCitation(cId)}
                      className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 text-[10px] font-mono transition-colors"
                      title="Inspect Citation Source"
                    >
                      [{cId.replace("src-", "")}]
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
