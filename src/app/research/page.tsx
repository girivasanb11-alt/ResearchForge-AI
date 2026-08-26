"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Activity,
  Cpu,
} from "lucide-react";
import { QueryStudio } from "@/components/research/QueryStudio";
import { AgentExecutionStream } from "@/components/research/AgentExecutionStream";
import { AgentActivityCard } from "@/components/research/AgentActivityCard";
import { SourceInspector } from "@/components/research/SourceInspector";
import { HypothesisBoard } from "@/components/research/HypothesisBoard";
import { useResearch } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_SOURCES } from "@/lib/sample-data";
import { formatDate } from "@/lib/utils";

export default function ResearchPage() {
  const { currentJob, startNewResearch, cancelResearch, reports } = useResearch();
  const [viewMode, setViewMode] = useState<"standard" | "agent_activity">("standard");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-1">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Research Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Autonomous Deep Research Studio
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Configure multi-agent parameters, crawl academic indices, and synthesize publication-grade dossiers.
          </p>
        </div>

        {/* View Mode Toggle & Sample Navigator */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-xl border border-border/60">
            <button
              onClick={() => setViewMode("standard")}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                viewMode === "standard"
                  ? "bg-card text-foreground font-bold shadow-xs border border-border/80"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Configurator
            </button>
            <button
              onClick={() => setViewMode("agent_activity")}
              className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                viewMode === "agent_activity"
                  ? "bg-card text-indigo-400 font-bold shadow-xs border border-border/80"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Activity className="h-3.5 w-3.5" />
              <span>Live Agent Activity</span>
            </button>
          </div>

          <Link href="/report/solid-state-batteries-2026">
            <Button variant="outline" size="sm" className="text-xs flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
              <span>Sample Dossier</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Studio Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Query Studio or Active Execution Stream or Agent Activity Card */}
        <div className="lg:col-span-8 space-y-8">
          {viewMode === "agent_activity" ? (
            <AgentActivityCard
              query={currentJob?.query || "Solid-State Battery Commercialization: Electrolyte Architectures and Market Deployment"}
              reportId={currentJob?.reportId || "solid-state-batteries-2026"}
            />
          ) : currentJob ? (
            <AgentExecutionStream job={currentJob} onReset={cancelResearch} />
          ) : (
            <QueryStudio
              onStartResearch={(params) => {
                startNewResearch(params);
                setViewMode("standard");
              }}
              isExecuting={false}
            />
          )}

          {/* Sources and Hypothesis Board side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HypothesisBoard
              hypotheses={
                currentJob?.hypotheses || [
                  {
                    id: "h1",
                    statement: "Critical current density >10 mA/cm² requires >=3.5 MPa stack pressure in sulfide cells.",
                    status: "validated",
                    confidence: 98,
                  },
                  {
                    id: "h2",
                    statement: "DBE roll-to-roll electrode processing reduces gigafactory capex by 35-40%.",
                    status: "validated",
                    confidence: 96,
                  },
                  {
                    id: "h3",
                    statement: "Garnet LLZO separators achieve commercial automotive yield before 2027.",
                    status: "refuted",
                    confidence: 84,
                  },
                ]
              }
            />
            <SourceInspector
              sources={currentJob?.discoveredSources || SAMPLE_SOURCES}
            />
          </div>
        </div>

        {/* Right Column: Pre-Compiled Dossiers & History Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* TrueForge Agent Activity Quick Monitor */}
          <div className="rounded-3xl border border-indigo-500/30 bg-card/90 shadow-xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/70">
              <h3 className="text-xs font-bold text-foreground flex items-center gap-2 font-mono uppercase tracking-wider">
                <Cpu className="h-4 w-4 text-indigo-400" />
                <span>Agent Activity Status</span>
              </h3>
              <Badge variant="cyan" className="text-[10px] font-mono">
                Live
              </Badge>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/40 border border-border/50">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span>✓</span> Searching Web
                </span>
                <span className="text-muted-foreground text-[10px]">542 Sources</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/40 border border-border/50">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span>✓</span> Company Agent Running
                </span>
                <span className="text-muted-foreground text-[10px]">Specs Ingested</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/40 border border-border/50">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span>✓</span> Competitor Agent Running
                </span>
                <span className="text-muted-foreground text-[10px]">18 Labs</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/40 border border-border/50">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span>✓</span> Market Agent Running
                </span>
                <span className="text-muted-foreground text-[10px]">$82/kWh TAM</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/40 border border-border/50">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span>✓</span> Sandbox Analysis
                </span>
                <span className="text-muted-foreground text-[10px]">Python Sim</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30">
                <span className="text-indigo-300 font-semibold flex items-center gap-1.5">
                  <span>✓</span> Waiting Approval
                </span>
                <span className="text-indigo-400 text-[10px] font-bold">Ready</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode("agent_activity")}
              className="w-full text-xs font-mono justify-center"
            >
              Inspect Swarm Details →
            </Button>
          </div>

          {/* Published Reports Gallery */}
          <div className="rounded-3xl border border-border bg-card/90 shadow-xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/70">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-400" />
                <span>Published Research Dossiers</span>
              </h3>
              <Badge variant="secondary" className="text-[10px] font-mono">
                {reports.length} Reports
              </Badge>
            </div>

            <div className="space-y-3">
              {reports.map((report) => (
                <Link
                  key={report.id}
                  href={`/report/${report.id}`}
                  className="block p-3.5 rounded-2xl border border-border/70 bg-secondary/20 hover:bg-secondary/50 hover:border-indigo-500/40 transition-all group"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <Badge variant="cyan" className="text-[9px] font-mono">
                      {report.depth.toUpperCase()}
                    </Badge>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {formatDate(report.createdAt)}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-foreground group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {report.title}
                  </h4>

                  <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-2 border-t border-border/40">
                    <span className="text-emerald-400 font-semibold">
                      {report.confidenceScore}% Confidence
                    </span>
                    <span className="flex items-center gap-1 group-hover:text-foreground">
                      Read Dossier <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Security Guarantee */}
          <div className="p-4 rounded-2xl border border-border/60 bg-secondary/15 space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Verifiable Deterministic Grounding</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Every factual assertion is triangulated against peer-reviewed literature with direct DOI links.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
