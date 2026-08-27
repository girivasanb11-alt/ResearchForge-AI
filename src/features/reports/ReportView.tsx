"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Download,
  Printer,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  BookOpen,
  ArrowLeft,
  Clock,
  Sparkles,
} from "lucide-react";
import { ResearchReport } from "@/types/research";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { downloadMarkdownReport, printPdfReport, exportReportToMarkdown } from "@/services/export-service";
import { toast } from "sonner";

interface ReportViewProps {
  report: ResearchReport;
}

export function ReportView({ report }: ReportViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = () => {
    const md = exportReportToMarkdown(report);
    navigator.clipboard.writeText(md);
    setCopied(true);
    toast.success("Markdown copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="max-w-4xl mx-auto space-y-10">
      {/* Header Bar */}
      <div className="space-y-4 pb-6 border-b border-border/80">
        <div className="flex items-center justify-between">
          <Link
            href="/reports"
            className="text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Reports</span>
          </Link>

          {/* Export Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyMarkdown}
              className="text-xs font-mono h-8 flex items-center gap-1.5"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied" : "Copy Markdown"}</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadMarkdownReport(report)}
              className="text-xs font-mono h-8 flex items-center gap-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export .MD</span>
            </Button>

            <Button
              variant="glow"
              size="sm"
              onClick={printPdfReport}
              className="text-xs font-mono h-8 flex items-center gap-1.5"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / PDF</span>
            </Button>
          </div>
        </div>

        {/* Badges & Meta */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <Badge variant="purple" className="font-mono text-[10px] capitalize">
            {report.depth} Investigation
          </Badge>
          <div className="flex items-center gap-1 text-xs font-mono text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{report.confidenceScore}% Empirical Confidence</span>
          </div>
          <span className="text-xs font-mono text-muted-foreground">•</span>
          <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{report.readTimeMinutes} min read</span>
          </span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground font-sans leading-tight">
            {report.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
            {report.subtitle}
          </p>
        </div>
      </div>

      {/* Report Body Sections */}
      <div className="space-y-12 text-foreground font-sans">
        {/* Section 1: Executive Summary */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b border-border/60 pb-2">
            <div className="h-2 w-2 rounded-full bg-purple-500" />
            <h2 className="text-xl font-bold tracking-tight text-foreground font-sans">
              1. Executive Summary
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            {report.executiveSummary}
          </p>
        </section>

        {/* Section 2: Market Analysis */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b border-border/60 pb-2">
            <div className="h-2 w-2 rounded-full bg-cyan-500" />
            <h2 className="text-xl font-bold tracking-tight text-foreground font-sans">
              2. Market Analysis
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            {report.marketAnalysis}
          </p>
        </section>

        {/* Section 3: Competitor Analysis */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b border-border/60 pb-2">
            <div className="h-2 w-2 rounded-full bg-amber-500" />
            <h2 className="text-xl font-bold tracking-tight text-foreground font-sans">
              3. Competitor Analysis
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            {report.competitorAnalysis}
          </p>
        </section>

        {/* Section 4: Key Insights */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-border/60 pb-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight text-foreground font-sans">
              4. Key Insights
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {report.keyInsights.map((insight, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-border/70 bg-card/60 space-y-1.5"
              >
                <div className="text-xs font-mono font-bold text-purple-400">
                  Insight 0{idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {insight}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Recommendations */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b border-border/60 pb-2">
            <div className="h-2 w-2 rounded-full bg-indigo-500" />
            <h2 className="text-xl font-bold tracking-tight text-foreground font-sans">
              5. Strategic Recommendations
            </h2>
          </div>
          <div className="space-y-2.5">
            {report.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-border/60 bg-secondary/20 flex items-start gap-3"
              >
                <div className="h-5 w-5 rounded-md bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {rec}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Verified Citation Sources */}
        <section className="space-y-4 pt-6 border-t border-border/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-purple-400" />
              <h3 className="text-base font-bold text-foreground font-sans">
                Verified Citation Sources ({report.sources.length})
              </h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>DOIs Verified</span>
            </span>
          </div>

          <div className="space-y-3">
            {report.sources.map((src) => (
              <div
                key={src.id}
                className="p-4 rounded-2xl border border-border/70 bg-card/40 hover:bg-card/70 transition-all space-y-2 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="cyan" className="text-[9px] font-mono capitalize">
                        {src.type}
                      </Badge>
                      <span className="text-xs font-mono text-purple-400">{src.domain}</span>
                      {src.publishedDate && (
                        <span className="text-xs font-mono text-muted-foreground">• {src.publishedDate}</span>
                      )}
                    </div>

                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-bold text-foreground hover:text-purple-400 flex items-center gap-1.5 transition-colors group-hover:underline"
                    >
                      <span>{src.title}</span>
                      <ExternalLink className="h-3.5 w-3.5 opacity-60 shrink-0" />
                    </a>
                  </div>

                  <Badge variant="success" className="text-[10px] font-mono shrink-0">
                    {src.relevanceScore}% Match
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground italic bg-secondary/30 p-2.5 rounded-xl border border-border/40 font-sans">
                  &ldquo;{src.snippet}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer Meta */}
      <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
        <span>Session ID: {report.sessionId}</span>
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-purple-400" />
          <span>TrueForge Autonomous Engine v4.2</span>
        </div>
      </div>
    </article>
  );
}
