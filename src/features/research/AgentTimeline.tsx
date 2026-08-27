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
  onCancel?: () => void;
}

export function AgentTimeline({ stages, onOpenApproval, onCancel }: AgentTimelineProps) {
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
        return Activity;
    }
  };

  const getStatusBadge = (status: AgentStage["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="success" className="text-[10px] font-mono">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Done
          </Badge>
        );
      case "running":
        return (
          <Badge variant="cyan" className="text-[10px] font-mono animate-pulse">
            <Activity className="h-3 w-3 mr-1" />
            Executing
          </Badge>
        );
      case "waiting_approval":
        return (
          <Badge variant="warning" className="text-[10px] font-mono animate-bounce bg-amber-500/15 text-amber-300 border-amber-500/30">
            <ShieldCheck className="h-3 w-3 mr-1" />
            Approval Required
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive" className="text-[10px] font-mono">
            Failed
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-[10px] font-mono text-muted-foreground">
            Queued
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Timeline Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl border border-border/80 bg-card/60">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-400" />
          <h3 className="text-sm font-bold text-foreground font-sans">
            TrueForge 7-Stage Autonomous Pipeline
          </h3>
        </div>

        {onCancel && (
          <button
            onClick={onCancel}
            className="text-xs font-mono text-rose-400 hover:text-rose-300 hover:underline"
          >
            Cancel Swarm
          </button>
        )}
      </div>

      {/* Stages List */}
      <div className="space-y-3">
        {stages.map((stage, idx) => {
          const Icon = getStageIcon(stage.id);
          const isCurrent = stage.status === "running" || stage.status === "waiting_approval";
          const isWaiting = stage.status === "waiting_approval";

          return (
            <div
              key={stage.id}
              className={`p-4 rounded-2xl border transition-all ${
                isCurrent
                  ? "border-purple-500/50 bg-card/90 shadow-lg shadow-purple-500/5"
                  : stage.status === "completed"
                  ? "border-border/60 bg-card/40 opacity-90"
                  : "border-border/40 bg-secondary/20 opacity-50"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 border ${
                      isCurrent
                        ? "bg-purple-500/20 text-purple-400 border-purple-500/40"
                        : stage.status === "completed"
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                        : "bg-secondary text-muted-foreground border-border/60"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-muted-foreground font-semibold">
                        Stage 0{idx + 1}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <h4 className="text-xs sm:text-sm font-bold text-foreground truncate font-sans">
                        {stage.name}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground font-sans truncate">
                      {stage.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {getStatusBadge(stage.status)}
                </div>
              </div>

              {/* Progress & Logs (When running or completed) */}
              {(isCurrent || stage.status === "completed") && (
                <div className="mt-3 pt-3 border-t border-border/40 space-y-2">
                  {stage.progress > 0 && stage.status !== "completed" && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                        <span>Agent Execution</span>
                        <span>{stage.progress}%</span>
                      </div>
                      <Progress value={stage.progress} className="h-1.5" />
                    </div>
                  )}

                  {/* Terminal Log Output Stream */}
                  {stage.logs && stage.logs.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-black/60 border border-border/50 text-[11px] font-mono text-slate-300 space-y-1 max-h-24 overflow-y-auto">
                      {stage.logs.map((log, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Terminal className="h-3 w-3 text-purple-400 shrink-0 mt-0.5" />
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Summary Callout */}
                  {stage.outputSummary && (
                    <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                      ✓ {stage.outputSummary}
                    </div>
                  )}

                  {/* Stage 6 Approval Action Trigger */}
                  {isWaiting && onOpenApproval && (
                    <div className="pt-2 flex justify-end">
                      <Button
                        onClick={onOpenApproval}
                        variant="glow"
                        size="sm"
                        className="font-mono text-xs font-bold"
                      >
                        <span>Review & Sign Off Gate</span>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
