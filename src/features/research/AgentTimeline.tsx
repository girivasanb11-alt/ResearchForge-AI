"use client";

import React from "react";
import {
  Globe,
  Building2,
  Users2,
  TrendingUp,
  Cpu,
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
  Clock,
  Terminal,
  Activity,
  Sparkles,
} from "lucide-react";
import { AgentStage } from "@/types/agents";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface AgentTimelineProps {
  stages: AgentStage[];
  onOpenApproval?: () => void;
}

export function AgentTimeline({ stages, onOpenApproval }: AgentTimelineProps) {
  const getStageIcon = (id: string) => {
    switch (id) {
      case "web_search_mcp":
        return Globe;
      case "company_agent":
        return Building2;
      case "competitor_agent":
        return Users2;
      case "market_agent":
        return TrendingUp;
      case "sandbox_analysis":
        return Cpu;
      case "approval_required":
        return ShieldCheck;
      case "generate_report":
        return FileCheck2;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <Activity className="h-3.5 w-3.5 animate-pulse" />
            <span>TrueForge Autonomous Pipeline</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground font-sans mt-0.5">
            7-Stage Agent Orchestration Timeline
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <span>Telemetry Active</span>
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping inline-block" />
        </div>
      </div>

      {/* 7 Stage Flow */}
      <div className="space-y-4">
        {stages.map((stage, idx) => {
          const Icon = getStageIcon(stage.id);
          const isCompleted = stage.status === "completed";
          const isRunning = stage.status === "running";
          const isWaitingApproval = stage.status === "waiting_approval";
          const isPending = stage.status === "pending";

          return (
            <div
              key={stage.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isRunning
                  ? "bg-purple-500/10 border-purple-500/40 shadow-lg shadow-purple-500/5"
                  : isWaitingApproval
                  ? "bg-amber-500/10 border-amber-500/40 shadow-lg shadow-amber-500/5"
                  : isCompleted
                  ? "bg-card/40 border-border/70"
                  : "bg-secondary/10 border-border/40 opacity-70"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3.5 min-w-0">
                  {/* Stage Number & Icon */}
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold transition-colors ${
                      isCompleted
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : isRunning
                        ? "bg-purple-600 text-white shadow-md shadow-purple-500/40 animate-pulse"
                        : isWaitingApproval
                        ? "bg-amber-500 text-slate-950 font-black animate-bounce"
                        : "bg-secondary text-muted-foreground border border-border/60"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>

                  {/* Stage Details */}
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-muted-foreground">
                        Stage {idx + 1}:
                      </span>
                      <h4 className="text-sm font-bold text-foreground font-sans">
                        {stage.name}
                      </h4>
                      <Badge
                        variant={
                          isCompleted
                            ? "success"
                            : isRunning
                            ? "purple"
                            : isWaitingApproval
                            ? "warning"
                            : "secondary"
                        }
                        className="text-[10px] font-mono capitalize"
                      >
                        {stage.status.replace("_", " ")}
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                      {stage.description}
                    </p>

                    {stage.outputSummary && (
                      <p className="text-xs font-mono text-emerald-400 pt-1 flex items-center gap-1.5">
                        <span>✓</span>
                        <span>{stage.outputSummary}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Progress / Action */}
                <div className="flex items-center gap-3 shrink-0 self-end sm:self-start">
                  {isWaitingApproval && onOpenApproval && (
                    <Button
                      size="sm"
                      variant="glow"
                      onClick={onOpenApproval}
                      className="text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 h-9"
                    >
                      <ShieldCheck className="h-4 w-4 mr-1.5" />
                      <span>Review & Approve</span>
                    </Button>
                  )}

                  {isRunning && (
                    <div className="w-28 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono text-purple-300">
                        <span>Executing</span>
                        <span>{stage.progress}%</span>
                      </div>
                      <Progress value={stage.progress} className="h-1.5" />
                    </div>
                  )}

                  {isPending && (
                    <span className="text-xs font-mono text-muted-foreground/60 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Queued</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Log Stream Snippet */}
              {stage.logs.length > 0 && (
                <div className="mt-3 p-2.5 rounded-xl bg-slate-950/80 border border-border/50 text-[11px] font-mono text-slate-400 space-y-1">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] border-b border-border/40 pb-1">
                    <Terminal className="h-3 w-3 text-purple-400" />
                    <span>Agent Telemetry Stream</span>
                  </div>
                  {stage.logs.map((log, i) => (
                    <div key={i} className="text-cyan-300/90 font-mono">
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
