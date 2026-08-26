"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  FileCode2,
  Building,
  Scale,
  Sliders,
  Zap,
  Clock,
  Layers,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResearchDepth, ResearchScope } from "@/lib/types";
import { useResearch } from "@/lib/store";
import { cn } from "@/lib/utils";

interface QueryStudioProps {
  onStartResearch: (params: {
    query: string;
    objective?: string;
    depth: ResearchDepth;
    scope: ResearchScope[];
  }) => void;
  isExecuting: boolean;
}

export function QueryStudio({ onStartResearch, isExecuting }: QueryStudioProps) {
  const [query, setQuery] = useState("");
  const [objective, setObjective] = useState("");
  const [depth, setDepth] = useState<ResearchDepth>("exhaustive");
  const [scope, setScope] = useState<ResearchScope[]>([
    "academic",
    "patents",
    "market",
    "technical",
  ]);

  const scopesList: { id: ResearchScope; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
    { id: "academic", label: "Academic Journals", icon: BookOpen, desc: "Nature, arXiv, PubMed, IEEE, ScienceDirect" },
    { id: "patents", label: "Patent Registries", icon: Scale, desc: "USPTO, WIPO, EPO claims & prior art" },
    { id: "market", label: "Market & Financials", icon: Building, desc: "BNEF, SEC 10-K, earnings transcripts" },
    { id: "technical", label: "Engineering Specs", icon: FileCode2, desc: "RFCs, whitepapers, electrochem datasets" },
  ];

  const depthLevels: { id: ResearchDepth; label: string; time: string; sources: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "rapid", label: "Rapid Brief", time: "~15s", sources: "20+ Sources", icon: Zap },
    { id: "standard", label: "Standard Deep Dive", time: "~30s", sources: "100+ Sources", icon: Clock },
    { id: "exhaustive", label: "Exhaustive Triangulation", time: "~45s", sources: "400+ Sources", icon: Layers },
  ];

  const templateQueries = [
    {
      title: "Solid-State Batteries",
      text: "Solid-State Battery Commercialization: Electrolyte Architectures, Scalability Hurdles, and Market Deployment (2025–2030)",
    },
    {
      title: "Multi-Agent Systems",
      text: "Multi-Agent Autonomous Orchestration Frameworks: Self-Correction, Reasoning Over Graphs, and Benchmark Evaluations",
    },
    {
      title: "GLP-1 Triple Agonists",
      text: "Next-Wave GLP-1/GIP and Triple Agonists: Clinical Efficacy, Lean Muscle Retention, and Market Dynamics",
    },
    {
      title: "Quantum Error Mitigation",
      text: "Surface Code Quantum Error Correction Thresholds and Fault-Tolerant Logical Qubit Scaling",
    },
  ];

  const toggleScope = (id: ResearchScope) => {
    if (scope.includes(id)) {
      if (scope.length > 1) {
        setScope(scope.filter((s) => s !== id));
      }
    } else {
      setScope([...scope, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isExecuting) return;
    onStartResearch({ query, objective, depth, scope });
  };

  return (
    <div className="rounded-3xl border border-border bg-card/90 shadow-2xl p-6 sm:p-8 backdrop-blur-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/70">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-foreground">Deep Research Protocol Configurator</h2>
            <Badge variant="cyan" className="font-mono text-[10px]">
              Multi-Agent v4.2
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Specify inquiry vectors, academic corpora, and verification depth parameters.
          </p>
        </div>

        {/* Quick templates dropdown/pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-muted-foreground font-mono text-[11px]">Presets:</span>
          {templateQueries.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuery(item.text);
                setObjective("Conduct a multi-agent empirical synthesis with focus on 2025-2026 data.");
              }}
              className="px-2 py-0.5 rounded-md bg-secondary text-muted-foreground hover:text-indigo-300 hover:bg-indigo-500/10 border border-border/50 text-[11px] font-mono transition-colors"
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Query Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-foreground flex items-center justify-between">
            <span>Primary Research Objective / Hypothesis</span>
            <span className="text-muted-foreground font-mono text-[11px]">Required</span>
          </label>
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Analyze solid-state battery commercial readiness, evaluating sulfide vs oxide electrolytes and roll-to-roll dry electrode processing bottlenecks..."
              rows={3}
              className="w-full rounded-xl border border-border bg-secondary/30 p-3.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500/80 transition-all font-sans leading-relaxed"
            />
          </div>
        </div>

        {/* Constraints / Focus Lens */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-foreground flex items-center justify-between">
            <span>Target Focus & Methodological Constraints (Optional)</span>
            <span className="text-muted-foreground font-mono text-[11px]">Context Lens</span>
          </label>
          <input
            type="text"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            placeholder="e.g. Focus on commercial pilot yields, 10-80% fast-charging cycle retention, and cost per kWh by 2028"
            className="w-full rounded-xl border border-border bg-secondary/30 px-3.5 py-2.5 text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500/80 transition-all"
          />
        </div>

        {/* Scope Selection */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-foreground">
            Search Corpora & Data Pipelines:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {scopesList.map((item) => {
              const Icon = item.icon;
              const isSelected = scope.includes(item.id);
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => toggleScope(item.id)}
                  className={cn(
                    "flex flex-col text-left p-3.5 rounded-xl border transition-all duration-150",
                    isSelected
                      ? "bg-indigo-500/10 border-indigo-500/60 text-foreground shadow-sm"
                      : "bg-secondary/20 border-border/60 text-muted-foreground hover:bg-secondary/40"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className={cn("h-4 w-4", isSelected ? "text-indigo-400" : "text-muted-foreground")} />
                    <span className="text-xs font-bold">{item.label}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                    {item.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Depth Level Selection */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-foreground">
            Triangulation Depth & Rigor:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {depthLevels.map((lvl) => {
              const Icon = lvl.icon;
              const isSelected = depth === lvl.id;
              return (
                <button
                  type="button"
                  key={lvl.id}
                  onClick={() => setDepth(lvl.id)}
                  className={cn(
                    "flex items-center justify-between p-3.5 rounded-xl border transition-all duration-150",
                    isSelected
                      ? "bg-indigo-500/15 border-indigo-500/80 text-foreground shadow-sm ring-1 ring-indigo-500/30"
                      : "bg-secondary/20 border-border/60 text-muted-foreground hover:bg-secondary/40"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={cn("h-4 w-4", isSelected ? "text-indigo-400" : "text-muted-foreground")} />
                    <div className="text-left">
                      <div className="text-xs font-bold text-foreground">{lvl.label}</div>
                      <div className="text-[10px] text-muted-foreground font-mono">{lvl.sources}</div>
                    </div>
                  </div>
                  <Badge variant={isSelected ? "cyan" : "secondary"} className="text-[10px] font-mono">
                    {lvl.time}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit CTA */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border/70">
          <div className="text-[11px] font-mono text-muted-foreground flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
            <span>Multi-Agent Cluster ready • 4 Agents standby</span>
          </div>

          <Button
            type="submit"
            disabled={!query.trim() || isExecuting}
            variant="glow"
            size="lg"
            className="flex items-center justify-center gap-2 font-semibold"
          >
            {isExecuting ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Agent Swarm Executing...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Launch Autonomous Deep Research</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
