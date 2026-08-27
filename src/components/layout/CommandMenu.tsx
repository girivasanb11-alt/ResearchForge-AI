"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Sparkles,
  BookOpen,
  Terminal,
  ArrowRight,
  Clock,
  Settings,
  Bot,
  X,
} from "lucide-react";
import { useResearch } from "@/lib/store";

export function CommandMenu() {
  const router = useRouter();
  const { isCommandMenuOpen, setIsCommandMenuOpen, reports, startResearch } = useResearch();
  const [search, setSearch] = useState("");

  const filteredReports = reports.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.query.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectReport = (id: string) => {
    setIsCommandMenuOpen(false);
    setSearch("");
    router.push(`/dashboard/reports/${id}`);
  };

  const handleStartQuickSearch = (query: string) => {
    setIsCommandMenuOpen(false);
    setSearch("");
    startResearch(query);
    router.push("/dashboard/research");
  };

  if (!isCommandMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
        onClick={() => setIsCommandMenuOpen(false)}
      />

      {/* Palette Modal */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-border/80 bg-card/95 shadow-2xl backdrop-blur-2xl overflow-hidden animate-in zoom-in-95 duration-150">
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
            placeholder="Search research topics or type a query to deploy swarm..."
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
          <div className="p-2 border-b border-border/60 bg-purple-500/10">
            <button
              onClick={() => handleStartQuickSearch(search)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 text-xs font-medium transition-all group"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
                <span>
                  Deploy TrueForge Swarm on: <strong className="text-white font-semibold">&ldquo;{search}&rdquo;</strong>
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-purple-300 group-hover:translate-x-1 transition-transform">
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
              Platform Navigation
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
              <button
                onClick={() => {
                  setIsCommandMenuOpen(false);
                  router.push("/dashboard");
                }}
                className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg hover:bg-secondary text-left transition-colors"
              >
                <Terminal className="h-3.5 w-3.5 text-purple-400" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => {
                  setIsCommandMenuOpen(false);
                  router.push("/dashboard/research");
                }}
                className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg hover:bg-secondary text-left transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                <span>New Research</span>
              </button>

              <button
                onClick={() => {
                  setIsCommandMenuOpen(false);
                  router.push("/dashboard/sessions");
                }}
                className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg hover:bg-secondary text-left transition-colors"
              >
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                <span>Sessions</span>
              </button>

              <button
                onClick={() => {
                  setIsCommandMenuOpen(false);
                  router.push("/dashboard/agents");
                }}
                className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg hover:bg-secondary text-left transition-colors"
              >
                <Bot className="h-3.5 w-3.5 text-emerald-400" />
                <span>Agent Swarm</span>
              </button>

              <button
                onClick={() => {
                  setIsCommandMenuOpen(false);
                  router.push("/dashboard/reports");
                }}
                className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg hover:bg-secondary text-left transition-colors"
              >
                <BookOpen className="h-3.5 w-3.5 text-blue-400" />
                <span>Reports</span>
              </button>

              <button
                onClick={() => {
                  setIsCommandMenuOpen(false);
                  router.push("/dashboard/settings");
                }}
                className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg hover:bg-secondary text-left transition-colors"
              >
                <Settings className="h-3.5 w-3.5 text-slate-400" />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Research Reports List */}
          {filteredReports.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 py-1 text-[10px] font-mono text-muted-foreground uppercase tracking-wider font-semibold">
                Compiled Reports ({filteredReports.length})
              </div>
              {filteredReports.map((report) => (
                <button
                  key={report.id}
                  onClick={() => handleSelectReport(report.id)}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-secondary text-left transition-all group"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-0.5 p-1.5 rounded-md bg-secondary text-purple-400">
                      <BookOpen className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-foreground truncate group-hover:text-purple-400 transition-colors">
                        {report.title}
                      </div>
                      <div className="text-[11px] text-muted-foreground truncate">{report.query}</div>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-border/60 bg-secondary/30 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <span>Press Enter to deploy research swarm</span>
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
        </div>
      </div>
    </div>
  );
}
