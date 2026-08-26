"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  FileQuestion,
  Network,
  Bot,
  Terminal,
  ShieldCheck,
  FileText,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Play,
  RotateCcw,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface McpOrchestratorPipelineProps {
  query?: string;
  reportId?: string;
}

export function McpOrchestratorPipeline({
  query = "Solid-State Battery Commercialization: Electrolyte Architectures and Market Deployment",
  reportId = "solid-state-batteries-2026",
}: McpOrchestratorPipelineProps) {
  const [activeStage, setActiveStage] = useState<number>(2); // Default to MCP Tool stage
  const [isApproved, setIsApproved] = useState(false);

  const stages = [
    {
      id: "user",
      num: "01",
      title: "User",
      subtitle: "Inquiry Input",
      icon: User,
      badge: "Inquiry Formulated",
      color: "from-blue-500 to-indigo-500",
      description: "Human researcher defines domain hypothesis, constraints, and target research depth.",
      payload: {
        rawQuery: query,
        depth: "Exhaustive Triangulation (400+ Sources)",
        constraints: "Focus on 2025-2026 commercial pilot yields and fast-charge retention",
        targetFormat: "Publication-Grade Dossier + BibTeX + Audio Briefing",
      },
    },
    {
      id: "research_request",
      num: "02",
      title: "Research Request",
      subtitle: "Task Decomposition",
      icon: FileQuestion,
      badge: "12 Sub-Queries",
      color: "from-indigo-500 to-purple-500",
      description: "Autonomous supervisor breaks objective into 12 targeted orthogonal sub-inquiries.",
      payload: {
        decomposedVectors: [
          "Li6PS5Cl vs LLZO room-temp critical current density",
          "PTFE dry electrode roll-to-roll fibrillation bottlenecks",
          "Automotive Tier-1 OEM validation milestones (2026-2028)",
          "10-minute fast charging cycle retention at 5 MPa stack pressure",
        ],
      },
    },
    {
      id: "mcp_tool",
      num: "03",
      title: "MCP Tool",
      subtitle: "Model Context Protocol",
      icon: Network,
      badge: "4 MCP Servers Connected",
      color: "from-purple-500 to-pink-500",
      description: "Standardized Model Context Protocol calls external scholarly & patent tool registries.",
      payload: {
        mcpCalls: [
          { tool: "mcp://arxiv-server/query", args: { query: "solid electrolyte dendrite", limit: 50 }, status: "200 OK" },
          { tool: "mcp://uspto-patents/search", args: { assignee: "QuantumScape", status: "active" }, status: "200 OK" },
          { tool: "mcp://sec-edgar/filings", args: { ticker: "QS", form: "10-K", year: "2025" }, status: "200 OK" },
          { tool: "mcp://crossref/doi-lookup", args: { query: "halidosulfide interface", limit: 40 }, status: "200 OK" },
        ],
      },
    },
    {
      id: "subagents",
      num: "04",
      title: "Subagents",
      subtitle: "Parallel Worker Swarm",
      icon: Bot,
      badge: "4 Agents Running",
      color: "from-pink-500 to-rose-500",
      description: "Domain subagents ingest, parse, and cross-reference citations in parallel.",
      payload: {
        agents: [
          { name: "Web Crawler Subagent", status: "Completed", output: "542 Papers & Whitepapers indexed" },
          { name: "Company Specs Subagent", status: "Completed", output: "QuantumScape Cobra & Toyota specs mapped" },
          { name: "Competitor Subagent", status: "Completed", output: "18 Independent lab benchmarks compared" },
          { name: "Market TAM Subagent", status: "Completed", output: "$82/kWh cost parity model synthesized" },
        ],
      },
    },
    {
      id: "sandbox",
      num: "05",
      title: "Sandbox",
      subtitle: "Isolated Code Execution",
      icon: Terminal,
      badge: "Python 3.12 Sandbox",
      color: "from-amber-500 to-emerald-500",
      description: "Executes numerical data verification and Monte Carlo simulations in an isolated environment.",
      payload: {
        scriptSnippet: `import numpy as np\n# Monte Carlo Cost Parity Simulation\nruns = 10000\ncapex_reduction = np.random.normal(0.40, 0.05, runs)\ncell_cost_2028 = 135 * (1 - capex_reduction * 0.65)\nconsensus_mean = np.mean(cell_cost_2028)\n# Output: $82.40 / kWh (95% CI: [$78.20, $86.50])`,
        contradictionsResolved: "6 scientific debates reconciled with 98.4% confidence score",
      },
    },
    {
      id: "approval",
      num: "06",
      title: "Approval",
      subtitle: "Human-in-the-Loop",
      icon: ShieldCheck,
      badge: isApproved ? "Approved & Verified" : "Verification Gate",
      color: "from-cyan-500 to-blue-500",
      description: "Researcher reviews synthesized facts, grounded DOIs, and signs off before publication.",
      payload: {
        confidenceScore: "98.4% Empirical Confidence",
        sourcesAnchored: "48 Primary DOI Citations (0 Hallucinations)",
        actionRequired: isApproved ? "Dossier Signoff Complete" : "Pending Human Signoff",
      },
    },
    {
      id: "report",
      num: "07",
      title: "Report",
      subtitle: "Publication Dossier",
      icon: FileText,
      badge: "Publication Grade",
      color: "from-emerald-500 to-teal-500",
      description: "Generates multi-modal interactive dossier, 3D knowledge graph, audio podcast, and PDF export.",
      payload: {
        dossierId: reportId,
        readTime: "12 min read",
        exportFormats: ["PDF Dossier", "Markdown", "BibTeX", "JSON"],
        audioBriefing: "4:32 Dual-Voice AI Podcast",
      },
    },
  ];

  const handleApprove = () => {
    setIsApproved(true);
    toast.success("Research Dossier Approved & Ready for Export!");
  };

  return (
    <div className="rounded-3xl border border-border bg-card/90 shadow-2xl p-6 sm:p-8 backdrop-blur-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 animate-ping" />
            <h3 className="text-xl font-bold text-foreground font-sans">
              TrueForge Architecture Pipeline
            </h3>
            <Badge variant="cyan" className="font-mono text-[10px]">
              MCP + Multi-Agent Swarm
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            User → Research Request → MCP Tool → Subagents → Sandbox → Approval → Report
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setActiveStage((prev) => (prev + 1) % stages.length);
            }}
            className="text-xs font-mono"
          >
            <Play className="h-3 w-3 mr-1 text-indigo-400" />
            <span>Next Pipeline Step</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setActiveStage(0);
              setIsApproved(false);
            }}
            className="text-xs font-mono"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            <span>Reset</span>
          </Button>
        </div>
      </div>

      {/* 7-Step Pipeline Breadcrumb Track */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isSelected = activeStage === idx;
          const isPassed = activeStage > idx;

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(idx)}
              className={cn(
                "p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between relative overflow-hidden group",
                isSelected
                  ? "bg-card border-indigo-500 ring-2 ring-indigo-500/40 shadow-lg shadow-indigo-500/10 scale-[1.02]"
                  : isPassed
                  ? "bg-card/70 border-emerald-500/40 hover:bg-card"
                  : "bg-secondary/20 border-border/40 hover:bg-secondary/40 opacity-70"
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={cn(
                      "h-7 w-7 rounded-lg flex items-center justify-center border text-xs",
                      isSelected
                        ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/40"
                        : isPassed
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                        : "bg-secondary text-muted-foreground border-border"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-muted-foreground">
                    {stage.num}
                  </span>
                </div>

                <div className="text-xs font-bold text-foreground leading-tight group-hover:text-indigo-400 transition-colors">
                  {stage.title}
                </div>
                <div className="text-[10px] text-muted-foreground font-mono truncate">
                  {stage.subtitle}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[10px] font-mono">
                {isPassed ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Done</span>
                  </span>
                ) : isSelected ? (
                  <span className="text-indigo-400 font-bold animate-pulse">Active</span>
                ) : (
                  <span className="text-muted-foreground">Queued</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Deep Stage Inspector */}
      <div className="rounded-2xl border border-border bg-dark-card/80 p-6 backdrop-blur-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              {React.createElement(stages[activeStage].icon, { className: "h-5 w-5" })}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-400">
                  STAGE {stages[activeStage].num}:
                </span>
                <h4 className="text-base font-bold text-foreground font-sans">
                  {stages[activeStage].title} — {stages[activeStage].subtitle}
                </h4>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {stages[activeStage].description}
              </p>
            </div>
          </div>

          <Badge variant="cyan" className="font-mono text-xs self-start sm:self-center">
            {stages[activeStage].badge}
          </Badge>
        </div>

        {/* Stage Content Payload Display */}
        <div className="space-y-4 pt-1">
          {/* Stage 03: MCP Tool Call Inspector */}
          {stages[activeStage].id === "mcp_tool" && (
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-muted-foreground text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Code2 className="h-3.5 w-3.5 text-purple-400" />
                  <span>Model Context Protocol (MCP) Dispatch Table:</span>
                </span>
                <span className="text-emerald-400">● 4/4 Endpoints Healthy</span>
              </div>
              <div className="space-y-1.5">
                {stages[activeStage].payload.mcpCalls?.map((call, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="purple" className="text-[10px] font-mono">
                        TOOL CALL
                      </Badge>
                      <span className="text-indigo-300 font-bold">{call.tool}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground text-[11px]">
                      <span>args: {JSON.stringify(call.args)}</span>
                      <span className="text-emerald-400 font-bold">{call.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stage 05: Sandbox Code Execution */}
          {stages[activeStage].id === "sandbox" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5 text-amber-400" />
                  <span>Sandbox Environment: Python 3.12 (Isolated WASM Enclave)</span>
                </span>
                <span className="text-emerald-400">● Exit code 0</span>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/90 p-4 font-mono text-xs text-zinc-300 overflow-x-auto space-y-2">
                <pre className="text-indigo-300">{stages[activeStage].payload.scriptSnippet}</pre>
                <div className="pt-2 border-t border-zinc-800 text-emerald-400">
                  {stages[activeStage].payload.contradictionsResolved}
                </div>
              </div>
            </div>
          )}

          {/* Stage 06: Human Approval Gate */}
          {stages[activeStage].id === "approval" && (
            <div className="p-5 rounded-2xl border border-indigo-500/30 bg-indigo-500/5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-bold text-foreground flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span>Deterministic Evidence Verification Sign-Off</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    48 peer-reviewed citations grounded with zero hallucination. Ready for report generation.
                  </p>
                </div>

                <Button
                  variant="glow"
                  size="default"
                  onClick={handleApprove}
                  className="font-bold flex items-center gap-2"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{isApproved ? "Signoff Completed ✓" : "Approve & Compile Dossier"}</span>
                </Button>
              </div>
            </div>
          )}

          {/* Other Stages Generic Payload View */}
          {["user", "research_request", "subagents", "report"].includes(stages[activeStage].id) && (
            <div className="p-4 rounded-xl border border-border/70 bg-secondary/30 font-mono text-xs space-y-2">
              <div className="text-muted-foreground uppercase text-[10px] tracking-wider">
                Stage Execution Data:
              </div>
              <pre className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
                {JSON.stringify(stages[activeStage].payload, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="pt-3 border-t border-border/50 flex items-center justify-between">
          <span className="text-[11px] font-mono text-muted-foreground">
            Stage {activeStage + 1} of {stages.length}
          </span>

          <div className="flex items-center gap-2">
            {reportId && (
              <Link href={`/report/${reportId}`}>
                <Button variant="glow" size="sm" className="text-xs font-semibold flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>View Compiled Dossier</span>
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
