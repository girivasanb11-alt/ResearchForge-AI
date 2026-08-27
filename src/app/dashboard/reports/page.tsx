"use client";

import React from "react";
import Link from "next/link";
import { PlusCircle, FileText, ArrowRight, ShieldCheck } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReportEmptyState } from "@/features/reports/ReportEmptyState";
import { useResearch } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default function DashboardReportsPage() {
  const { reports } = useResearch();

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold uppercase tracking-wider mb-1">
              <FileText className="h-3.5 w-3.5" />
              <span>Synthesized Intelligence</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
              Research Reports ({reports.length})
            </h1>
            <p className="text-xs text-muted-foreground font-sans mt-0.5">
              Verified multi-agent dossiers with empirical DOIs and Python sandbox validations.
            </p>
          </div>

          <Link href="/dashboard/research">
            <Button variant="glow" size="sm" className="font-mono text-xs font-bold flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>New Research</span>
            </Button>
          </Link>
        </div>

        {/* Reports Catalog or Real Empty State */}
        {reports.length === 0 ? (
          <ReportEmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reports.map((report) => (
              <div
                key={report.id}
                className="p-5 rounded-2xl border border-border/80 bg-card/60 hover:bg-card hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <Badge variant="purple" className="text-[10px] font-mono capitalize">
                      {report.depth} Investigation
                    </Badge>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {formatDate(report.createdAt)}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-foreground font-sans line-clamp-2 group-hover:text-purple-400 transition-colors">
                    {report.title}
                  </h3>

                  <p className="text-xs text-muted-foreground font-sans line-clamp-3">
                    {report.executiveSummary}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{report.confidenceScore}% Confidence</span>
                  </div>

                  <Link
                    href={`/dashboard/reports/${report.id}`}
                    className="text-xs font-mono text-purple-400 font-bold flex items-center gap-1 hover:text-purple-300 transition-colors"
                  >
                    <span>Read Dossier</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
