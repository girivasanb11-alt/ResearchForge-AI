"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  BookOpen,
  Scale,
  Building,
  FileCode2,
  ShieldCheck,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CitationSource } from "@/lib/types";

interface SourceInspectorProps {
  sources: CitationSource[];
}

export function SourceInspector({ sources }: SourceInspectorProps) {
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSources = sources.filter((s) => {
    const matchesType = filterType === "all" || s.type === filterType;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.snippet.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getSourceIcon = (type: CitationSource["type"]) => {
    switch (type) {
      case "academic":
        return BookOpen;
      case "patent":
        return Scale;
      case "industry-report":
        return Building;
      default:
        return FileCode2;
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card/90 shadow-2xl p-6 backdrop-blur-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <span>Primary Sources & Citation Corpus</span>
            <Badge variant="cyan" className="font-mono text-[10px]">
              {sources.length} Ingested
            </Badge>
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Indexed academic DOIs, patent filings, and industry datasets.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter sources..."
              className="h-8 rounded-lg border border-border bg-secondary/40 px-2.5 pl-7 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500 w-44 sm:w-56"
            />
            <Search className="h-3.5 w-3.5 text-muted-foreground absolute left-2 top-2.5" />
          </div>

          <div className="flex items-center gap-1 bg-secondary/50 p-0.5 rounded-lg border border-border/60">
            {["all", "academic", "patent", "industry-report"].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-2 py-1 rounded-md text-[10px] font-mono capitalize transition-all ${
                  filterType === t
                    ? "bg-card text-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "industry-report" ? "market" : t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sources List */}
      <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
        {filteredSources.map((source) => {
          const Icon = getSourceIcon(source.type);
          return (
            <div
              key={source.id}
              className="p-4 rounded-xl border border-border/70 bg-secondary/20 hover:bg-secondary/40 hover:border-border transition-all space-y-2 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="mt-0.5 p-1.5 rounded-lg bg-secondary border border-border/80 text-indigo-400 shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-foreground hover:text-indigo-400 transition-colors flex items-center gap-1 group-hover:underline"
                    >
                      <span className="line-clamp-1">{source.title}</span>
                      <ExternalLink className="h-3 w-3 shrink-0 opacity-60" />
                    </a>
                    <div className="text-[11px] text-muted-foreground flex flex-wrap items-center gap-2 mt-0.5 font-mono">
                      <span className="text-indigo-400">{source.domain}</span>
                      {source.publishedDate && <span>• {source.publishedDate}</span>}
                      {source.authors && <span>• {source.authors.slice(0, 2).join(", ")}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="success" className="text-[10px] font-mono">
                    {source.relevanceScore}% Match
                  </Badge>
                  {source.verified && (
                    <div title="Peer-reviewed & verified DOI">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    </div>
                  )}
                </div>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2 italic bg-secondary/30 p-2 rounded-lg border border-border/40 font-sans">
                &ldquo;{source.snippet}&rdquo;
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
