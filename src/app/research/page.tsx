"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { QueryStudio } from "@/components/research/QueryStudio";
import { AgentExecutionStream } from "@/components/research/AgentExecutionStream";
import { SourceInspector } from "@/components/research/SourceInspector";
import { HypothesisBoard } from "@/components/research/HypothesisBoard";
import { useResearch } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_SOURCES } from "@/lib/sample-data";

export default function ResearchPage() {
  const { currentJob, startNewResearch, cancelResearch, reports } = useResearch();

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

        {/* Quick Report Navigator */}
        <div className="flex items-center gap-2">
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
        {/* Left Column: Query Studio or Active Execution Stream */}
        <div className="lg:col-span-8 space-y-8">
          {currentJob ? (
            <AgentExecutionStream job={currentJob} onReset={cancelResearch} />
          ) : (
            <QueryStudio
              onStartResearch={(params) => startNewResearch(params)}
              isExecuting={false}
            />
          )}

          {/* Sources and Hypothesis Board side-by-side or stacked */}
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
          <div className="rounded-3xl border border-border bg-card/90 shadow-xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/70">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-400" />
                <span>Verified Dossiers Vault</span>
              </h3>
              <Badge variant="cyan" className="text-[10px] font-mono">
                {reports.length} Reports
              </Badge>
            </div>

            <div className="space-y-2.5">
              {reports.map((report) => (
                <Link
                  key={report.id}
                  href={`/report/${report.id}`}
                  className="p-3.5 rounded-xl border border-border/60 bg-secondary/20 hover:bg-secondary/50 hover:border-indigo-500/40 transition-all block group"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-xs font-bold text-foreground group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {report.title}
                    </h4>
                    <span className="text-[10px] font-mono text-emerald-400 shrink-0 font-semibold">
                      {report.confidenceScore}%
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed mb-2">
                    {report.summary}
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-2 border-t border-border/40">
                    <span>{report.readTimeMinutes} min read</span>
                    <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Read Dossier <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Engine Status Card */}
          <div className="rounded-3xl border border-border bg-secondary/30 p-6 backdrop-blur-md space-y-4 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <h4 className="font-bold text-foreground">Grounded Multi-Agent Protocol</h4>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Every synthesized claim undergoes adversarial verification. Disagreements between experimental papers are automatically extracted into contradiction matrices.
            </p>
            <div className="pt-2 border-t border-border/50 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
              <span>Status: Online</span>
              <span className="text-emerald-400">99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
