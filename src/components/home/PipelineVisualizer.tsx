"use client";

import React, { useState } from "react";
import {
  GitFork,
  Search,
  CheckCircle2,
  FileSpreadsheet,
  Terminal,
  ArrowRight,
  ShieldAlert,
  Cpu,
  Layers,
  Sparkles,
  Share2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PipelineVisualizer() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "decompose",
      stepNum: "01",
      name: "Decomposer & Planner",
      role: "Recursive Task Breakdown",
      icon: GitFork,
      color: "from-indigo-500 to-blue-500",
      textColor: "text-indigo-400",
      description: "Splits broad research queries into 8-16 targeted orthogonal sub-inquiries with boundary constraints.",
      outputMetrics: "12 Sub-Queries Generated",
      terminalSnippet: `[PLANNER] Received Query: "Solid-State Battery Degradation"
[PLANNER] Extracting parameters: [Temperature: -20C to 60C, Stack Pressure: 1-5 MPa]
[PLANNER] Sub-query 01: Li6PS5Cl vs LLZO room-temperature critical current density
[PLANNER] Sub-query 02: Roll-to-roll dry electrode fibrillation yield bottlenecks
[PLANNER] Delegating search parameters to 4 worker agents...`,
    },
    {
      id: "crawl",
      stepNum: "02",
      name: "Deep Web & ArXiv Crawler",
      role: "Multi-Source Ingestion",
      icon: Search,
      color: "from-blue-500 to-cyan-500",
      textColor: "text-cyan-400",
      description: "Traverses academic repositories (Nature, ScienceDirect, arXiv, PubMed), USPTO patents, and whitepapers in parallel.",
      outputMetrics: "542 Primary Sources Ingested",
      terminalSnippet: `[CRAWLER] Connected to CrossRef & Semantic Scholar API endpoints
[CRAWLER] Ingested 142 Nature/Science peer-reviewed full-texts (2024–2026)
[CRAWLER] Ingested 45 patent filings from QuantumScape, Toyota, CATL
[CRAWLER] Extracted 88 empirical data tables and Nyquist electrochem plots
[CRAWLER] Vectorizing 1.4M tokens with domain embedding weights...`,
    },
    {
      id: "verify",
      stepNum: "03",
      name: "Contradiction Engine",
      role: "Triangulation & Fact-Checking",
      icon: ShieldAlert,
      color: "from-amber-500 to-rose-500",
      textColor: "text-amber-400",
      description: "Compares divergent claims across independent laboratories. Isolates disputed metrics and calculates consensus ratios.",
      outputMetrics: "6 Contradictions Reconciled",
      terminalSnippet: `[VERIFIER] Triangulating critical current density metrics across 18 labs
[VERIFIER] Conflict detected: Lab A claims dendrite short at 8mA/cm² vs Lab B at 14mA/cm²
[VERIFIER] Anomaly isolated: Lab A operated under 0.5 MPa pressure; Lab B utilized 5 MPa
[VERIFIER] Consensus established: High-rate cycling requires >= 3.5 MPa stack pressure
[VERIFIER] Confidence score calibrated to 98.4%`,
    },
    {
      id: "synthesize",
      stepNum: "04",
      name: "Knowledge Graph Compiler",
      role: "Multi-Modal Dossier Output",
      icon: Share2,
      color: "from-emerald-500 to-teal-500",
      textColor: "text-emerald-400",
      description: "Generates structured executive briefing, comparative matrices, interactive citation graphs, and audio briefings.",
      outputMetrics: "100% Ground-Truthed Report",
      terminalSnippet: `[COMPILER] Assembling Executive Briefing & Key Comparative Matrix
[COMPILER] Constructing interactive 3D Knowledge Graph (9 core ontology nodes)
[COMPILER] Generating Recharts comparative cost & conductivity curves
[COMPILER] Compiling BibTeX citations & audio briefing podcast script
[COMPILER] Deep Research Dossier completed in 38.4s.`,
    },
  ];

  return (
    <section className="py-20 border-t border-border/60 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="default" className="font-mono text-xs">
            Autonomous Architecture
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            The Multi-Agent Consensus Pipeline
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Unlike generic single-turn LLMs, ResearchForge AI deploys specialized autonomous agents in an adversarial verification loop.
          </p>
        </div>

        {/* 4 Interactive Pipeline Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={cn(
                  "flex flex-col text-left p-5 rounded-2xl border transition-all duration-200 relative overflow-hidden group",
                  isSelected
                    ? "bg-card border-indigo-500/80 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30"
                    : "bg-card/40 border-border/70 hover:bg-secondary/40 hover:border-border"
                )}
              >
                {/* Step number badge */}
                <div className="flex items-center justify-between w-full mb-3">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-xl bg-secondary border border-border/80 transition-colors",
                      isSelected ? "text-indigo-400 border-indigo-500/40 bg-indigo-500/10" : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-mono font-bold text-muted-foreground">STEP {step.stepNum}</span>
                </div>

                <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-indigo-300 transition-colors">
                  {step.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                  {step.description}
                </p>

                <div className="mt-auto pt-2 border-t border-border/50 flex items-center justify-between text-[11px] font-mono">
                  <span className={cn("font-medium", step.textColor)}>{step.outputMetrics}</span>
                  <span className={cn("text-xs transition-transform", isSelected ? "text-indigo-400 translate-x-0.5" : "text-muted-foreground")}>
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Step Inspector / Live Console Preview */}
        <div className="rounded-2xl border border-border bg-dark-card/90 shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Terminal Titlebar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/80 bg-zinc-950/80">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono text-muted-foreground ml-2 flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-indigo-400" />
                <span>agent://orchestrator/pipeline/{steps[activeStep].id}.log</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="cyan" className="text-[10px] font-mono">
                {steps[activeStep].role}
              </Badge>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-xs text-zinc-300 bg-zinc-950/60 leading-relaxed overflow-x-auto space-y-2">
            <div className="text-muted-foreground pb-2 border-b border-zinc-800 flex items-center justify-between text-[11px]">
              <span>[STATE: ACTIVE_INSPECTION]</span>
              <span className="text-emerald-400">● 100% Deterministic Grounding</span>
            </div>
            <pre className="text-indigo-300 font-sans text-xs sm:text-sm font-mono whitespace-pre-wrap">
              {steps[activeStep].terminalSnippet}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
