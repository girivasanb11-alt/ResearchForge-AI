"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  PlusCircle,
  Clock,
  FileText,
  Terminal,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useResearch } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const { sessions, reports, currentSession } = useResearch();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/70">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>TrueForge Multi-Agent Desk</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-sans">
              Autonomous Research Desk
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-sans">
              Orchestrate multi-corpus retrieval, patent claim validation, and sandbox simulations.
            </p>
          </div>

          <Link href="/research">
            <Button variant="glow" size="sm" className="h-10 px-5 rounded-xl font-bold font-mono text-xs flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>New Research</span>
            </Button>
          </Link>
        </div>

        {/* Real Status Metrics (0 if empty) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-border/80 bg-card/60 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>Total Investigations</span>
              <Clock className="h-4 w-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-foreground">{sessions.length}</div>
            <p className="text-[11px] font-mono text-muted-foreground">
              {sessions.length === 0 ? "No active sessions yet" : "Indexed in persistent storage"}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border/80 bg-card/60 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>Compiled Reports</span>
              <FileText className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-foreground">{reports.length}</div>
            <p className="text-[11px] font-mono text-muted-foreground">
              {reports.length === 0 ? "No dossiers generated" : "Verified with DOI citations"}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border/80 bg-card/60 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>Harness Status</span>
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400">Online</div>
            <p className="text-[11px] font-mono text-muted-foreground">
              TrueForge v4.2 • 4 MCP Servers connected
            </p>
          </div>
        </div>

        {/* Current Active Run or Quick Launcher */}
        {currentSession && currentSession.status === "running" ? (
          <div className="p-6 rounded-3xl border border-purple-500/40 bg-purple-500/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping" />
                <span className="text-xs font-mono text-purple-300 font-bold uppercase">Active Investigation</span>
              </div>
              <Link href="/research">
                <Button size="sm" variant="glow" className="text-xs font-mono">
                  View Real-Time Swarm
                </Button>
              </Link>
            </div>
            <h3 className="text-lg font-bold text-foreground">{currentSession.topic}</h3>
          </div>
        ) : sessions.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border/80 bg-card/40 p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Terminal className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-foreground font-sans">No research sessions yet</h3>
              <p className="text-xs font-mono text-muted-foreground">
                Enter your research topic to trigger the 7-stage TrueForge autonomous swarm.
              </p>
            </div>
            <Link href="/research">
              <Button variant="glow" size="sm" className="text-xs font-mono font-bold">
                Deploy Agent Swarm
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <h3 className="text-sm font-bold text-foreground font-sans">Recent Research Investigations</h3>
              <Link href="/sessions" className="text-xs font-mono text-purple-400 hover:underline">
                View All ({sessions.length})
              </Link>
            </div>

            <div className="space-y-3">
              {sessions.slice(0, 3).map((s) => (
                <div
                  key={s.id}
                  className="p-4 rounded-2xl border border-border/70 bg-card/40 flex items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{s.topic}</h4>
                    <span className="text-[11px] font-mono text-muted-foreground">{formatDate(s.createdAt)}</span>
                  </div>
                  {s.reportId && (
                    <Link
                      href={`/report/${s.reportId}`}
                      className="text-xs font-mono text-purple-400 font-semibold flex items-center gap-1 hover:underline"
                    >
                      <span>Read Dossier</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
