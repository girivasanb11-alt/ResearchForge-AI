"use client";

import React from "react";
import Link from "next/link";
import { Database } from "lucide-react";
import { SAMPLE_SOURCES } from "@/lib/sample-data";

export default function ExploreKnowledgePage() {
  const sources = SAMPLE_SOURCES;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-1">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Knowledge Vault</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
            Citation Index
          </h1>
        </div>
      </div>

      {/* Empty State */}
      {sources.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card/40 p-16 text-center space-y-4">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-secondary/60 flex items-center justify-center text-muted-foreground">
            <Database className="h-6 w-6 text-muted-foreground/60" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-bold text-foreground">
              No citation sources indexed
            </h2>
            <p className="text-xs font-mono text-muted-foreground">
              Waiting for real data. Primary citations and papers will appear here upon ingestion.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {sources.map((source) => (
            <div key={source.id} className="p-4 rounded-xl border border-border bg-card/60">
              <h3 className="text-sm font-bold text-foreground">{source.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
