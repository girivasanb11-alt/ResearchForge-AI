"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Sparkles,
  BookOpen,
  Terminal,
  Flame,
  ArrowRight,
  Compass,
  X,
} from "lucide-react";
import { useResearch } from "@/lib/store";
import { Badge } from "@/components/ui/badge";

export function CommandMenu() {
  const router = useRouter();
  const { isCommandMenuOpen, setIsCommandMenuOpen, reports, startNewResearch } = useResearch();
  const [search, setSearch] = useState("");

  const filteredReports = reports.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.query.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectReport = (id: string) => {
    setIsCommandMenuOpen(false);
    setSearch("");
    router.push(`/report/${id}`);
  };

  const handleStartQuickSearch = (query: string) => {
    setIsCommandMenuOpen(false);
    setSearch("");
    startNewResearch({
      query,
      depth: "standard",
      scope: ["academic", "market", "technical"],
    });
    router.push("/research");
  };

  if (!isCommandMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md animate-in fade-in duration-150"
        onClick={() => setIsCommandMenuOpen(false)}
      />

      {/* Palette Modal */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-border/80 gap-3">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            autoFocus
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && search.trim()) {
                handleStartQuickSearch(search);
              }
            }}
            placeholder="Search reports, hypotheses, or type a research query..."
            className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none text-foreground"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="text-[10px] font-mono bg-secondary px-2 py-0.5 rounded border border-border text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Quick Launch Direct Query */}
        {search.trim().length > 0 && (
          <div className="p-2 border-b border-border/60 bg-indigo-500/5">
            <button
              onClick={() => handleStartQuickSearch(search)}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-medium transition-all group"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
                <span>
                  Launch Deep Multi-Agent Research on: <strong className="text-white font-semibold">&ldquo;{search}&rdquo;</strong>
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-indigo-400 group-hover:translate-x-1 transition-transform">
                <span>Execute</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </button>
          </div>
        )}

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-4">
          {/* Quick Navigation Section */}
          <div className="space-y-1">
            <div className="px-2 py-1 text-[10px] font-mono text-muted-foreground uppercase tracking-wider font-semibold">
              Navigation
            </div>
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => {
                  setIsCommandMenuOpen(false);
                  router.push("/research");
                }}
                className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg hover:bg-secondary text-left transition-colors"
              >
                <Terminal className="h-3.5 w-3.5 text-indigo-400" />
                <span>Research Studio</span>
              </button>
              <button
                onClick={() => {
                  setIsCommandMenuOpen(false);
                  router.push("/report/solid-state-batteries-2026");
                }}
                className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg hover:bg-secondary text-left transition-colors"
              >
                <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
                <span>Browse Reports Dossiers</span>
              </button>
              <button
                onClick={() => {
                  setIsCommandMenuOpen(false);
                  router.push("/");
                }}
                className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg hover:bg-secondary text-left transition-colors"
              >
                <Flame className="h-3.5 w-3.5 text-amber-400" />
                <span>Overview & Benchmarks</span>
              </button>
              <button
                onClick={() => {
                  setIsCommandMenuOpen(false);
                  router.push("/explore");
                }}
                className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg hover:bg-secondary text-left transition-colors"
              >
                <Compass className="h-3.5 w-3.5 text-emerald-400" />
                <span>Knowledge Vault</span>
              </button>
            </div>
          </div>

          {/* Research Reports List */}
          <div className="space-y-1">
            <div className="px-2 py-1 text-[10px] font-mono text-muted-foreground uppercase tracking-wider font-semibold">
              Pre-Compiled Deep Research Dossiers ({filteredReports.length})
            </div>
            {filteredReports.map((report) => (
              <button
                key={report.id}
                onClick={() => handleSelectReport(report.id)}
                className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-secondary text-left transition-all group"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5 p-1.5 rounded-md bg-secondary text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                    <BookOpen className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-foreground truncate group-hover:text-indigo-400 transition-colors">
                      {report.title}
                    </div>
                    <div className="text-[11px] text-muted-foreground truncate">{report.query}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <Badge variant="success" className="text-[10px] font-mono">
                    {report.confidenceScore}% Verified
                  </Badge>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-border/60 bg-secondary/30 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <span>Tip: Press Enter to launch instant agent on typed query</span>
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
        </div>
      </div>
    </div>
  );
}
