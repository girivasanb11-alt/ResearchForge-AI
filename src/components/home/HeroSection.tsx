"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Database,
  Cpu,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useResearch } from "@/lib/store";

export function HeroSection() {
  const router = useRouter();
  const { startNewResearch } = useResearch();
  const [query, setQuery] = useState("");

  const suggestedPills = [
    "Solid-State Battery Commercialization 2026",
    "Multi-Agent Orchestration Frameworks",
    "GLP-1 / GIP Triple Agonist Trials",
    "Quantum Error Correction Code Roadmaps",
  ];

  const handleLaunch = (topicQuery?: string) => {
    const finalQuery = topicQuery || query;
    if (!finalQuery.trim()) return;

    startNewResearch({
      query: finalQuery,
      depth: "exhaustive",
      scope: ["academic", "patents", "market", "technical"],
    });
    router.push("/research");
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 border border-border/80 text-xs font-medium backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-300 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
          <span className="text-muted-foreground">Announcing</span>
          <span className="font-semibold text-foreground">Multi-Agent Consensus Engine v4.2</span>
          <ArrowRight className="h-3 w-3 text-indigo-400" />
        </div>

        {/* Hero Title */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Turn Unstructured Science into{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              Verified Intelligence.
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Autonomous multi-agent research that crawls hundreds of academic journals, patents, and technical archives. Detecting contradictions, ground-truthing citations, and compiling publication-grade dossiers in seconds.
          </p>
        </div>

        {/* Hero Search Box */}
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLaunch();
            }}
            className="relative flex items-center p-1.5 rounded-2xl bg-card/90 border border-border/90 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl focus-within:border-indigo-500/80 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all duration-200"
          >
            <div className="pl-3.5 pr-2 text-muted-foreground">
              <Sparkles className="h-5 w-5 text-indigo-400 animate-pulse" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter complex research objective, patent query, or thesis..."
              className="w-full bg-transparent text-sm sm:text-base placeholder:text-muted-foreground/70 text-foreground focus:outline-none py-2"
            />
            <Button
              type="submit"
              variant="glow"
              size="default"
              className="shrink-0 rounded-xl px-5 flex items-center gap-1.5 font-medium"
            >
              <span>Research</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Quick topic pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-muted-foreground font-mono text-[11px] mr-1">Trending Topics:</span>
            {suggestedPills.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => handleLaunch(pill)}
                className="px-2.5 py-1 rounded-lg bg-secondary/60 hover:bg-indigo-500/15 hover:border-indigo-500/40 border border-border/60 text-muted-foreground hover:text-indigo-300 transition-all duration-150 text-[11px] font-medium"
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        {/* Live Empirical Stats Strip */}
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-border/50 text-left">
          <div className="space-y-0.5">
            <div className="text-2xl font-bold font-mono text-foreground flex items-center gap-1">
              <span>98.4%</span>
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-wider">Citation Accuracy</p>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-bold font-mono text-foreground flex items-center gap-1">
              <span>500M+</span>
              <Database className="h-4 w-4 text-indigo-400" />
            </div>
            <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-wider">Indexed Papers & Patents</p>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-bold font-mono text-foreground flex items-center gap-1">
              <span>&lt; 35s</span>
              <Zap className="h-4 w-4 text-amber-400" />
            </div>
            <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-wider">Dossier Synthesis Time</p>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-bold font-mono text-foreground flex items-center gap-1">
              <span>4-Agent</span>
              <Cpu className="h-4 w-4 text-cyan-400" />
            </div>
            <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-wider">Consensus Topology</p>
          </div>
        </div>
      </div>
    </section>
  );
}
