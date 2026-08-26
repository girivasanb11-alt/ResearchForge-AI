"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Terminal,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ResearchJob } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AgentExecutionStreamProps {
  job: ResearchJob;
  onReset: () => void;
}

export function AgentExecutionStream({ job, onReset }: AgentExecutionStreamProps) {
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [job.steps]);

  const allLogs = job.steps.flatMap((s) => s.logs);

  return (
    <div className="rounded-3xl border border-border bg-card/90 shadow-2xl p-6 sm:p-8 backdrop-blur-xl space-y-8 animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/70">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 animate-ping" />
            <h2 className="text-xl font-bold text-foreground">
              {job.status === "completed" ? "Research Dossier Ready" : "Multi-Agent Synthesis Engine Active"}
            </h2>
            <Badge variant={job.status === "completed" ? "success" : "default"} className="font-mono text-[10px]">
              {job.status.toUpperCase()}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-mono line-clamp-1">
            Query: &ldquo;{job.query}&rdquo;
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2">
          {job.status === "completed" && job.reportId && (
            <Link href={`/report/${job.reportId}`}>
              <Button variant="glow" size="sm" className="flex items-center gap-2 font-semibold">
                <BookOpen className="h-4 w-4" />
                <span>Open Full Research Dossier</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          )}
          <Button variant="secondary" size="sm" onClick={onReset} className="text-xs">
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            New Query
          </Button>
        </div>
      </div>

      {/* 4 Agent Step Trackers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {job.steps.map((step, idx) => {
          const isCurrent = job.currentStepIndex === idx && job.status === "running";
          const isDone = step.status === "completed";

          return (
            <div
              key={step.id}
              className={cn(
                "p-4 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between",
                isCurrent
                  ? "bg-indigo-500/10 border-indigo-500/80 shadow-md ring-1 ring-indigo-500/30"
                  : isDone
                  ? "bg-card border-border/70"
                  : "bg-secondary/20 border-border/40 opacity-60"
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-muted-foreground">
                    AGENT 0{idx + 1}
                  </span>
                  {isDone ? (
                    <div className="flex items-center gap-1 text-emerald-400 text-xs font-mono">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Done</span>
                    </div>
                  ) : isCurrent ? (
                    <div className="flex items-center gap-1 text-indigo-400 text-xs font-mono animate-pulse">
                      <span className="h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
                      <span>Running</span>
                    </div>
                  ) : (
                    <span className="text-[11px] font-mono text-muted-foreground">Queued</span>
                  )}
                </div>

                <h4 className="text-xs font-bold text-foreground mb-1">{step.agentName}</h4>
                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-tight mb-3">
                  {step.description}
                </p>
              </div>

              <div>
                <Progress value={step.progressPercent} className="h-1.5 mb-2" />
                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                  <span>{step.sourcesDiscovered ? `${step.sourcesDiscovered} sources` : "Pending"}</span>
                  <span>{step.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-time Agent Log Stream Terminal */}
      <div className="rounded-2xl border border-border bg-zinc-950 shadow-2xl overflow-hidden">
        {/* Terminal Tab Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/90 text-xs">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-indigo-400" />
            <span className="font-mono text-zinc-300 font-semibold">
              Live Multi-Agent Chain-of-Thought Stream
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              Stream Active
            </span>
          </div>
        </div>

        {/* Terminal Content */}
        <div
          ref={logContainerRef}
          className="p-5 font-mono text-xs text-zinc-300 bg-zinc-950/80 max-h-[300px] overflow-y-auto space-y-2 leading-relaxed"
        >
          {allLogs.length === 0 ? (
            <div className="text-muted-foreground italic">Initializing agent subprocesses...</div>
          ) : (
            allLogs.map((log, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-zinc-500 select-none">&gt;</span>
                <span
                  className={cn(
                    log.includes("Consensus") || log.includes("completed")
                      ? "text-emerald-400 font-semibold"
                      : log.includes("Conflict") || log.includes("Anomaly")
                      ? "text-amber-400 font-semibold"
                      : log.includes("Parsing") || log.includes("Crawling")
                      ? "text-indigo-300"
                      : "text-zinc-300"
                  )}
                >
                  {log}
                </span>
              </div>
            ))
          )}
          {job.status === "running" && (
            <div className="flex items-center gap-2 text-indigo-400 font-mono animate-pulse">
              <span className="h-2 w-2 rounded-full bg-indigo-400" />
              <span>Agents synthesizing cross-source findings...</span>
            </div>
          )}
        </div>
      </div>

      {/* Completed Callout */}
      {job.status === "completed" && job.reportId && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in zoom-in-95 duration-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Deep Research Dossier Successfully Compiled
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                48 Verified citations, interactive knowledge graph, contradiction breakdown, and audio briefing generated.
              </p>
            </div>
          </div>

          <Link href={`/report/${job.reportId}`} className="shrink-0 w-full sm:w-auto">
            <Button variant="glow" size="default" className="w-full sm:w-auto flex items-center gap-2 font-semibold">
              <BookOpen className="h-4 w-4" />
              <span>Inspect Full Report</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
