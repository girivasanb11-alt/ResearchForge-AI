"use client";

import React from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { useResearch } from "@/lib/store";

export default function ReportsGalleryPage() {
  const { reports } = useResearch();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-1">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Reports</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
            Research Reports
          </h1>
        </div>
      </div>

      {/* Empty State */}
      {reports.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card/40 p-16 text-center space-y-4">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-secondary/60 flex items-center justify-center text-muted-foreground">
            <BookOpen className="h-6 w-6 text-muted-foreground/60" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-bold text-foreground">
              No reports generated
            </h2>
            <p className="text-xs font-mono text-muted-foreground">
              Waiting for real data. Research sessions and dossiers will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <Link
              key={report.id}
              href={`/report/${report.id}`}
              className="p-5 rounded-2xl border border-border bg-card/60 hover:bg-card transition-colors block space-y-2"
            >
              <h3 className="text-sm font-bold text-foreground line-clamp-1">{report.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{report.summary}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
