"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, ShieldCheck, Sparkles, Clock } from "lucide-react";
import { useResearch } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ReportsGalleryPage() {
  const { reports } = useResearch();
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");

  const tags = ["all", "Energy Storage", "Artificial Intelligence", "Metabolic Therapeutics"];

  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.summary.toLowerCase().includes(search.toLowerCase()) ||
      r.query.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-1">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Reports Dossiers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Synthesized Research Dossiers
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Explore verified deep research dossiers across academic, patent, and market corpora.
          </p>
        </div>

        <Link href="/research">
          <Button variant="glow" size="sm" className="flex items-center gap-2 font-semibold">
            <Sparkles className="h-4 w-4" />
            <span>Generate New Dossier</span>
          </Button>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dossiers, queries, findings..."
            className="w-full h-10 rounded-xl border border-border bg-card px-3.5 pl-9 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-3" />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors capitalize ${
                selectedTag === tag
                  ? "bg-secondary text-indigo-400 font-bold border border-border"
                  : "text-muted-foreground hover:bg-secondary/50"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="rounded-3xl border border-border/80 bg-card/80 p-6 flex flex-col justify-between hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group backdrop-blur-md"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="cyan" className="text-[10px] font-mono">
                  {report.depth.toUpperCase()}
                </Badge>
                <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{report.confidenceScore}%</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-foreground group-hover:text-indigo-400 transition-colors line-clamp-2">
                {report.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {report.summary}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-border/50 flex items-center justify-between text-xs font-mono">
              <span className="text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {report.readTimeMinutes} min read
              </span>
              <Link
                href={`/report/${report.id}`}
                className="text-indigo-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1"
              >
                <span>Read Dossier</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
