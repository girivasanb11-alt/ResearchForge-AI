"use client";

import React from "react";
import Link from "next/link";
import { Terminal, Database, ShieldCheck, FolderGit2 } from "lucide-react";
import { useResearch } from "@/lib/store";

export default function ResearchPage() {
  const { currentJob } = useResearch();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Navigation / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-1">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Dashboard</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
            Research Studio
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
          <span>System Idle</span>
        </div>
      </div>

      {/* Main Layout: Sidebar & Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="rounded-2xl border border-border bg-card/60 p-4 space-y-3">
            <div className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
              Navigation
            </div>
            <nav className="space-y-1 text-xs font-mono">
              <div className="p-2 rounded-lg bg-secondary text-foreground font-semibold flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5 text-indigo-400" />
                <span>Active Workspace</span>
              </div>
              <div className="p-2 rounded-lg text-muted-foreground flex items-center gap-2">
                <Database className="h-3.5 w-3.5" />
                <span>Datasets</span>
              </div>
              <div className="p-2 rounded-lg text-muted-foreground flex items-center gap-2">
                <FolderGit2 className="h-3.5 w-3.5" />
                <span>Repositories</span>
              </div>
            </nav>
          </div>
        </aside>

        {/* Empty Content Area */}
        <main className="lg:col-span-9 space-y-6">
          <div className="rounded-3xl border border-dashed border-border bg-card/40 p-16 text-center space-y-4">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-secondary/60 flex items-center justify-center text-muted-foreground">
              <Terminal className="h-6 w-6 text-muted-foreground/60" />
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-bold text-foreground">
                Dashboard under construction
              </h2>
              <p className="text-xs font-mono text-muted-foreground">
                {currentJob ? "Processing research inquiry..." : "No research sessions available. Waiting for real data."}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-border/60 bg-card/20 flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Authentication & Engine Active</span>
            </span>
            <span>Empty state ready for redesign</span>
          </div>
        </main>
      </div>
    </div>
  );
}
