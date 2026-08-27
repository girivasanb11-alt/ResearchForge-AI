"use client";

import React from "react";
import {
  Globe,
  Building2,
  Users2,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Bot,
  Activity,
} from "lucide-react";
import { useResearch } from "@/lib/store";
import { Badge } from "@/components/ui/badge";

export function ActiveAgentsPanel() {
  const { activeAgentStatus, activeStages } = useResearch();

  const agents = [
    {
      id: "agent-web",
      name: "Web Ingestion MCP Agent",
      role: "Literature Retrieval",
      icon: Globe,
      stageMatch: "web_search_mcp",
    },
    {
      id: "agent-company",
      name: "Company IP Agent",
      role: "Architecture Extraction",
      icon: Building2,
      stageMatch: "company_agent",
    },
    {
      id: "agent-competitor",
      name: "Competitor Benchmark Agent",
      role: "Adversarial Triangulation",
      icon: Users2,
      stageMatch: "competitor_agent",
    },
    {
      id: "agent-market",
      name: "Market Dynamics Agent",
      role: "TAM & Unit Cost Forecast",
      icon: TrendingUp,
      stageMatch: "market_agent",
    },
    {
      id: "agent-sandbox",
      name: "Sandbox Execution Agent",
      role: "Python 3.12 Verification",
      icon: Cpu,
      stageMatch: "sandbox_analysis",
    },
    {
      id: "agent-approval",
      name: "Human Consensus Sentinel",
      role: "Sign-Off & Integrity Gate",
      icon: ShieldCheck,
      stageMatch: "approval_required",
    },
  ];

  return (
    <div className="rounded-3xl border border-border/80 bg-card/60 p-6 backdrop-blur-xl shadow-2xl space-y-5">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-purple-400" />
          <h3 className="text-sm font-bold text-foreground font-sans">
            Active Agent Swarm
          </h3>
        </div>
        <Badge
          variant={activeAgentStatus !== "idle" ? "purple" : "secondary"}
          className="text-[10px] font-mono flex items-center gap-1"
        >
          <Activity className="h-3 w-3" />
          <span className="capitalize">{activeAgentStatus.replace("_", " ")}</span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {agents.map((agent) => {
          const Icon = agent.icon;
          const stage = activeStages.find((s) => s.id === agent.stageMatch);
          const isRunning = stage?.status === "running";
          const isCompleted = stage?.status === "completed";
          const isWaiting = stage?.status === "waiting_approval";

          return (
            <div
              key={agent.id}
              className={`p-3.5 rounded-2xl border transition-all space-y-2 ${
                isRunning
                  ? "bg-purple-500/15 border-purple-500/50 shadow-md shadow-purple-500/10"
                  : isWaiting
                  ? "bg-amber-500/15 border-amber-500/50 shadow-md shadow-amber-500/10"
                  : isCompleted
                  ? "bg-card/40 border-border/70"
                  : "bg-secondary/20 border-border/40 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-7 w-7 rounded-lg flex items-center justify-center ${
                      isRunning
                        ? "bg-purple-600 text-white animate-pulse"
                        : isWaiting
                        ? "bg-amber-500 text-slate-950"
                        : isCompleted
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-left">
                    <h5 className="text-xs font-bold text-foreground truncate">{agent.name}</h5>
                    <span className="text-[10px] font-mono text-muted-foreground">{agent.role}</span>
                  </div>
                </div>

                {isRunning && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-border/40 text-muted-foreground">
                <span>Status:</span>
                <span
                  className={
                    isRunning
                      ? "text-purple-400 font-bold"
                      : isWaiting
                      ? "text-amber-400 font-bold"
                      : isCompleted
                      ? "text-emerald-400 font-bold"
                      : "text-muted-foreground"
                  }
                >
                  {stage ? stage.status.replace("_", " ") : "idle"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
