"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const DEMO_PRESETS = [
  {
    id: "ssb",
    title: "Solid-State Battery Fast Charging Limits",
    query: "Investigating critical current density and dendrite growth in Li6PS5Cl halidosulfide solid electrolytes under 10-minute fast charge protocols.",
    reportId: "solid-state-batteries-2026",
    findings: [
      "Critical current density threshold increased from 3.2 mA/cm² to 12.5 mA/cm² using dual-layer ALD passivation.",
      "Cost parity target ($82/kWh) projected for 2028 via roll-to-roll dry PTFE electrode fibrillation.",
    ],
    confidence: "98.4%",
    sourcesCount: 48,
  },
  {
    id: "agents",
    title: "Multi-Agent Graph Orchestration",
    query: "Evaluating self-correcting dynamic DAG routing vs centralized supervisor models on SWE-bench Verified benchmarks.",
    reportId: "multi-agent-orchestration-2026",
    findings: [
      "Dynamic DAG routing increases task completion from 52% to 68% over static supervisor chains.",
      "Deterministic AST validation nodes reduce context hallucination cascade by over 85%.",
    ],
    confidence: "97.8%",
    sourcesCount: 36,
  },
  {
    id: "glp1",
    title: "GLP-1 / GIP Triple Agonist Potency",
    query: "Synthesizing Phase III clinical efficacy of Retatrutide vs Tirzepatide regarding muscle preservation and hepatic fat clearance.",
    reportId: "glp1-dual-agonists-2026",
    findings: [
      "Retatrutide demonstrates up to 26.8% mean weight loss at 48 weeks with >80% liver fat reduction.",
      "Glucagon receptor stimulation elevates resting energy expenditure while preserving lean muscle mass.",
    ],
    confidence: "99.1%",
    sourcesCount: 54,
  },
];

export function InteractiveDemo() {
  const [selectedPreset, setSelectedPreset] = useState(DEMO_PRESETS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState("Ready to run synthesis");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleRunDemo = () => {
    setIsRunning(true);
    setProgress(15);
    setIsCompleted(false);
    setCurrentStatus("1/4 Decomposing query and parameterizing constraints...");

    setTimeout(() => {
      setProgress(45);
      setCurrentStatus("2/4 Ingesting 48 peer-reviewed full texts & patent databases...");
    }, 1000);

    setTimeout(() => {
      setProgress(75);
      setCurrentStatus("3/4 Cross-validating empirical numbers & detecting contradictions...");
    }, 2200);

    setTimeout(() => {
      setProgress(100);
      setCurrentStatus("4/4 Synthesis completed! Confidence calibrated to " + selectedPreset.confidence);
      setIsRunning(false);
      setIsCompleted(true);
    }, 3400);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setProgress(0);
    setCurrentStatus("Ready to run synthesis");
  };

  return (
    <section className="py-20 border-t border-border/60 relative bg-secondary/10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="cyan" className="font-mono text-xs">
            Interactive Playground
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Experience Autonomous Deep Research
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Select an active scientific thesis and test our multi-agent cross-validation loop in real-time.
          </p>
        </div>

        {/* Sandbox Card */}
        <div className="rounded-3xl border border-border bg-card/90 shadow-2xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
          {/* Preset Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
              Select Research Thesis:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {DEMO_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setSelectedPreset(preset);
                    handleReset();
                  }}
                  className={cn(
                    "p-3 rounded-xl border text-left text-xs font-medium transition-all duration-150",
                    selectedPreset.id === preset.id
                      ? "bg-indigo-500/15 border-indigo-500/60 text-indigo-300 shadow-sm"
                      : "bg-secondary/40 border-border/60 text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                  )}
                >
                  <div className="font-semibold text-foreground mb-0.5">{preset.title}</div>
                  <div className="text-[11px] text-muted-foreground font-mono">{preset.confidence} Confidence</div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Query Box */}
          <div className="p-4 rounded-xl bg-secondary/40 border border-border/70 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-muted-foreground flex items-center gap-1.5">
                <Search className="h-3.5 w-3.5 text-indigo-400" />
                Active Inquiry Vector
              </span>
              <span className="font-mono text-[11px] text-indigo-400">Depth: Exhaustive Triangulation</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground font-sans leading-relaxed">
              &ldquo;{selectedPreset.query}&rdquo;
            </p>
          </div>

          {/* Action & Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {!isCompleted ? (
                  <Button
                    onClick={handleRunDemo}
                    disabled={isRunning}
                    variant="glow"
                    size="sm"
                    className="flex items-center gap-2 px-5 font-semibold"
                  >
                    {isRunning ? (
                      <>
                        <span className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Synthesizing Agents...</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5 fill-current" />
                        <span>Run 10s Multi-Agent Demo</span>
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleReset}
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-1.5 text-xs"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Run Another Query</span>
                  </Button>
                )}
              </div>

              <span className="text-xs font-mono text-muted-foreground truncate">{currentStatus}</span>
            </div>

            {/* Progress Bar */}
            <Progress value={progress} className="h-2" />
          </div>

          {/* Result Findings Strip */}
          {isCompleted && (
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm font-bold text-foreground">
                    Empirical Synthesis Generated
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="success" className="text-xs font-mono">
                    {selectedPreset.confidence} Verified
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    {selectedPreset.sourcesCount} Primary Sources Cited
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {selectedPreset.findings.map((finding, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-foreground/90 leading-relaxed">
                    <span className="text-emerald-400 font-bold font-mono">0{i + 1}.</span>
                    <span>{finding}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <Link href={`/report/${selectedPreset.reportId}`}>
                  <Button variant="default" size="sm" className="flex items-center gap-1.5">
                    <span>Inspect Full 12-Page Deep Report Dossier</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
