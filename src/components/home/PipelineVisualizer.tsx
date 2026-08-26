"use client";

import React, { useState } from "react";
import {
  Globe,
  Building2,
  Users2,
  TrendingUp,
  Cpu,
  Clock,
  Terminal,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PipelineVisualizer() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "search_web",
      stepNum: "01",
      name: "Searching Web",
      role: "Multi-Source Crawler",
      icon: Globe,
      color: "from-indigo-500 to-blue-500",
      textColor: "text-indigo-400",
      description: "Crawls academic preprints (Nature, arXiv, PubMed), USPTO patent claims, and SEC filings in parallel.",
      outputMetrics: "542 Sources Ingested",
      terminalSnippet: `[SEARCH_AGENT] Connecting to CrossRef, Semantic Scholar, and USPTO APIs...
[SEARCH_AGENT] Ingested 142 Nature/Science peer-reviewed full-texts (2024–2026)
[SEARCH_AGENT] Extracted 88 empirical data tables and Nyquist electrochem plots
[SEARCH_AGENT] Vectorizing 1.4M tokens with domain embedding weights...`,
    },
    {
      id: "company_agent",
      stepNum: "02",
      name: "Company Agent Running",
      role: "Primary IP & Tech Extraction",
      icon: Building2,
      color: "from-blue-500 to-cyan-500",
      textColor: "text-cyan-400",
      description: "Extracts primary technical architectures, patent disclosures, pilot gigafactory yields, and commercial roadmaps.",
      outputMetrics: "45 Patent Filings Parsed",
      terminalSnippet: `[COMPANY_AGENT] Ingesting QuantumScape (Cobra separator) & Toyota-Idemitsu disclosures
[COMPANY_AGENT] Mapping roll-to-roll solvent-free dry electrode production parameters
[COMPANY_AGENT] Extracting continuous 100Ah pouch cell cycling data at 25°C
[COMPANY_AGENT] Verifying 10-minute fast charging (10-80% SOC) retention curves...`,
    },
    {
      id: "competitor_agent",
      stepNum: "03",
      name: "Competitor Agent Running",
      role: "Adversarial Triangulation",
      icon: Users2,
      color: "from-cyan-500 to-teal-500",
      textColor: "text-teal-400",
      description: "Cross-checks competing chemical architectures (Sulfide vs Oxide vs Polymer) across 18 independent research labs.",
      outputMetrics: "18 Labs Benchmarked",
      terminalSnippet: `[COMPETITOR_AGENT] Triangulating critical current density metrics across 18 labs
[COMPETITOR_AGENT] Conflict detected: Lab A claims dendrite short at 8mA/cm² vs Lab B at 14mA/cm²
[COMPETITOR_AGENT] Anomaly isolated: Lab A operated under 0.5 MPa; Lab B utilized 5 MPa
[COMPETITOR_AGENT] Reconciled consensus: High-rate cycling requires >= 3.5 MPa stack pressure`,
    },
    {
      id: "market_agent",
      stepNum: "04",
      name: "Market Agent Running",
      role: "Macro TAM & Parity Modeling",
      icon: TrendingUp,
      color: "from-amber-500 to-orange-500",
      textColor: "text-amber-400",
      description: "Models cost per kWh trajectories, gigafactory capex reductions, and luxury EV commercial adoption timelines.",
      outputMetrics: "$82/kWh by 2028",
      terminalSnippet: `[MARKET_AGENT] Modeling dry electrode capex elimination (-40% gigafactory floor space)
[MARKET_AGENT] Generating cost trajectory: $145/kWh (2026) -> $82/kWh (2028 cost parity)
[MARKET_AGENT] Aggregating Tier-1 OEM commitment timelines (Toyota, BMW, Mercedes-Benz)
[MARKET_AGENT] Projecting 120 GWh global SSB capacity operational by 2030...`,
    },
    {
      id: "sandbox_analysis",
      stepNum: "05",
      name: "Sandbox Analysis",
      role: "Numerical Code Execution",
      icon: Cpu,
      color: "from-purple-500 to-pink-500",
      textColor: "text-purple-400",
      description: "Runs Monte Carlo regressions, AST linters, and electrochemical simulation scripts in an isolated execution sandbox.",
      outputMetrics: "6 Contradictions Resolved",
      terminalSnippet: `[SANDBOX_AGENT] Spawning isolated Python 3.12 sandbox environment
[SANDBOX_AGENT] Executing Monte Carlo regression over 48 cited dataset tables
[SANDBOX_AGENT] Validating ionic conductivity temperature dependence curves
[SANDBOX_AGENT] Calibrating empirical confidence score to 98.4% (Zero Hallucination)`,
    },
    {
      id: "waiting_approval",
      stepNum: "06",
      name: "Waiting Approval",
      role: "Human-in-the-Loop Signoff",
      icon: Clock,
      color: "from-emerald-500 to-teal-500",
      textColor: "text-emerald-400",
      description: "Assembles interactive knowledge graph, executive audio podcast, and waits for user verification sign-off.",
      outputMetrics: "Dossier Ready for Signoff",
      terminalSnippet: `[SUPERVISOR] Assembling 9-node interactive Knowledge Graph
[SUPERVISOR] Compiling BibTeX citation dataset and dual-voice podcast briefing
[SUPERVISOR] Generating PDF and LaTeX printable formats
[SUPERVISOR] Swarm execution complete. Awaiting user signoff to publish dossier.`,
    },
  ];

  return (
    <section className="py-20 border-t border-border/60 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="cyan" className="font-mono text-xs">
            Agent Activity & Orchestration
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            TrueForge Multi-Agent Pipeline
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Watch autonomous agents execute in parallel, cross-verifying facts across web, company specs, competitors, and sandbox simulations.
          </p>
        </div>

        {/* 6 Interactive Pipeline Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={cn(
                  "flex flex-col text-left p-4 rounded-2xl border transition-all duration-200 relative overflow-hidden group",
                  isSelected
                    ? "bg-card border-indigo-500/80 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30"
                    : "bg-card/40 border-border/70 hover:bg-secondary/40 hover:border-border"
                )}
              >
                {/* Step number and check */}
                <div className="flex items-center justify-between w-full mb-2.5">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-xl bg-secondary border border-border/80 transition-colors",
                      isSelected ? "text-indigo-400 border-indigo-500/40 bg-indigo-500/10" : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400 font-mono text-[11px] font-bold">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>✓</span>
                  </div>
                </div>

                <h3 className="text-xs font-bold text-foreground mb-1 group-hover:text-indigo-300 transition-colors line-clamp-1">
                  {step.name}
                </h3>
                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-tight mb-2">
                  {step.description}
                </p>

                <div className="mt-auto pt-1.5 border-t border-border/50 flex items-center justify-between text-[10px] font-mono">
                  <span className={cn("font-medium truncate", step.textColor)}>{step.outputMetrics}</span>
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
                <span>agent://swarm/activity/{steps[activeStep].id}.log</span>
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
              <span>[STAGE: {steps[activeStep].stepNum} OF 06]</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                <span>Verified Cross-Validation Active</span>
              </span>
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
