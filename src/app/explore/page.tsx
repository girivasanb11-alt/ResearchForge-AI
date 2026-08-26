"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { SAMPLE_SOURCES } from "@/lib/sample-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ExploreKnowledgePage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredSources = SAMPLE_SOURCES.filter((s) => {
    const matchesType = typeFilter === "all" || s.type === typeFilter;
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.domain.toLowerCase().includes(search.toLowerCase()) ||
      s.snippet.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-1">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Knowledge Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Citation Verification Index
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Searchable academic DOIs, patents, and datasets indexed across all deep research operations.
          </p>
        </div>

        <Link href="/research">
          <Button variant="glow" size="sm" className="text-xs font-medium">
            Launch Agent Search
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search authors, journal titles, DOIs, patents..."
            className="w-full h-10 rounded-xl border border-border bg-card px-3.5 pl-9 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-3" />
        </div>

        <div className="flex items-center gap-1.5 bg-secondary/50 p-1 rounded-xl border border-border/60">
          {["all", "academic", "patent", "industry-report", "whitepaper"].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                typeFilter === t
                  ? "bg-card text-foreground font-bold shadow-xs border border-border/80"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "industry-report" ? "Market Reports" : t}
            </button>
          ))}
        </div>
      </div>

      {/* Sources List */}
      <div className="space-y-4">
        {filteredSources.map((source) => (
          <div
            key={source.id}
            className="p-6 rounded-3xl border border-border/80 bg-card/70 hover:border-indigo-500/40 hover:bg-card transition-all space-y-3 group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="cyan" className="text-[10px] font-mono capitalize">
                    {source.type}
                  </Badge>
                  <span className="text-xs font-mono text-muted-foreground">{source.domain}</span>
                  {source.publishedDate && (
                    <span className="text-xs font-mono text-muted-foreground">• {source.publishedDate}</span>
                  )}
                </div>

                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-bold text-foreground hover:text-indigo-400 transition-colors flex items-center gap-1.5 group-hover:underline"
                >
                  <span>{source.title}</span>
                  <ExternalLink className="h-4 w-4 opacity-60 shrink-0" />
                </a>

                {source.authors && (
                  <p className="text-xs text-muted-foreground font-mono">
                    Authors: {source.authors.join(", ")}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Badge variant="success" className="text-xs font-mono flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{source.relevanceScore}% Relevance</span>
                </Badge>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground bg-secondary/30 p-3.5 rounded-2xl border border-border/40 font-sans italic leading-relaxed">
              &ldquo;{source.snippet}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
