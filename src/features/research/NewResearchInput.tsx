"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Layers, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResearchDepth, ResearchScope } from "@/types/research";

interface NewResearchInputProps {
  onStart: (topic: string, depth: ResearchDepth, scope: ResearchScope[]) => void;
  isLoading?: boolean;
}

export function NewResearchInput({ onStart, isLoading }: NewResearchInputProps) {
  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState<ResearchDepth>("standard");
  const [scopes, setScopes] = useState<ResearchScope[]>(["academic", "market", "technical"]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const samplePrompts = [
    { label: "NVIDIA Blackwell AI Strategy", query: "NVIDIA AI Strategy: Blackwell B200 Architecture & Enterprise Inference Monopolization" },
    { label: "OpenAI Revenue Model & Capex", query: "OpenAI Revenue Model: Enterprise API Unit Economics & Frontier Inference Capex" },
    { label: "Anthropic vs OpenAI Reasoning", query: "Anthropic vs OpenAI: Constitutional AI, Hybrid Reasoning & Enterprise Market Share" },
    { label: "Tesla FSD v13 End-to-End VLA", query: "Tesla FSD v13: End-to-End Neural Networks & Hardware 4 Vision Transformers" },
    { label: "Semiconductor CoWoS Packaging", query: "Global Semiconductor Supply Chain: TSMC CoWoS Capacity & High-NA EUV Deployment" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onStart(topic.trim(), depth, scopes);
  };

  const toggleScope = (scope: ResearchScope) => {
    setScopes((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]
    );
  };

  return (
    <div className="rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>TrueForge Multi-Agent Desk</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
            Supabase DB Synced
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-sans">
          Initialize Autonomous Investigation
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans">
          Enter a company, market vector, or technical paradigm to deploy the 7-stage TrueForge agent swarm.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search Input Box */}
        <div className="relative">
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Research NVIDIA AI Strategy, revenue mix, and GPU packaging constraints..."
            rows={3}
            required
            className="w-full rounded-2xl border border-border/80 bg-secondary/30 p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 font-sans transition-all resize-none"
          />
        </div>

        {/* 1-Click Hackathon Demo Investigations */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
            <span>⚡ 1-Click Hackathon Demo Topics:</span>
            <span className="text-purple-400 font-semibold">Pre-verified DOIs & Benchmarks</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setTopic(p.query)}
                className="px-3 py-1.5 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-400 text-xs font-mono text-purple-200 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="h-3 w-3 text-purple-400" />
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Options & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/60">
          <div className="flex items-center gap-3">
            {/* Depth Selector */}
            <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-xl border border-border/60 text-xs font-mono">
              {(["rapid", "standard", "exhaustive"] as ResearchDepth[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDepth(d)}
                  className={`px-3 py-1 rounded-lg capitalize transition-all ${
                    depth === d
                      ? "bg-purple-600 text-white font-bold shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/60 text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            >
              <Sliders className="h-3 w-3" />
              <span>Scope ({scopes.length})</span>
            </button>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !topic.trim()}
            variant="glow"
            className="h-11 px-6 rounded-xl font-bold flex items-center justify-center gap-2 text-xs font-mono shadow-lg shadow-purple-500/20"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Deploying Swarm...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Start Research</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {/* Advanced Scope Drawer */}
        {showAdvanced && (
          <div className="p-4 rounded-2xl border border-border/60 bg-secondary/20 space-y-3 animate-in fade-in duration-150">
            <div className="text-xs font-bold font-sans text-foreground flex items-center gap-2">
              <Layers className="h-3.5 w-3.5 text-purple-400" />
              <span>Corpus Ingestion Scope</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["academic", "patents", "market", "technical", "codebases"] as ResearchScope[]).map((sc) => (
                <button
                  key={sc}
                  type="button"
                  onClick={() => toggleScope(sc)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono capitalize transition-all border ${
                    scopes.includes(sc)
                      ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/40 font-bold"
                      : "bg-secondary/40 text-muted-foreground border-border/60 hover:text-foreground"
                  }`}
                >
                  {scopes.includes(sc) ? "✓ " : "+ "}
                  {sc}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
