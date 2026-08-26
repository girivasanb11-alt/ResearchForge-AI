"use client";

import React from "react";
import Link from "next/link";
import {
  Bookmark,
  Share2,
  Download,
  Headphones,
  MessageSquare,
  ShieldCheck,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResearchReport } from "@/lib/types";
import { useResearch } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

interface ReportHeaderProps {
  report: ResearchReport;
  onOpenExport: () => void;
  onToggleChat: () => void;
  onToggleAudio: () => void;
  isChatOpen: boolean;
  isAudioOpen: boolean;
}

export function ReportHeader({
  report,
  onOpenExport,
  onToggleChat,
  onToggleAudio,
  isChatOpen,
  isAudioOpen,
}: ReportHeaderProps) {
  const { bookmarkedReportIds, toggleBookmark } = useResearch();
  const isBookmarked = bookmarkedReportIds.includes(report.id);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Dossier URL copied to clipboard!");
  };

  return (
    <div className="space-y-6 pb-6 border-b border-border/80">
      {/* Top Navigation Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/research"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Research Studio</span>
        </Link>

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Audio Briefing Toggle */}
          <Button
            variant={isAudioOpen ? "default" : "outline"}
            size="sm"
            onClick={onToggleAudio}
            className="flex items-center gap-1.5 text-xs font-mono"
          >
            <Headphones className="h-3.5 w-3.5 text-indigo-400" />
            <span>Audio Briefing</span>
            <Badge variant="purple" className="text-[9px] px-1 py-0 ml-1">
              4:32
            </Badge>
          </Button>

          {/* AI Copilot Chat Toggle */}
          <Button
            variant={isChatOpen ? "default" : "outline"}
            size="sm"
            onClick={onToggleChat}
            className="flex items-center gap-1.5 text-xs font-mono"
          >
            <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
            <span>Ask Copilot</span>
          </Button>

          {/* Export Dossier */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenExport}
            className="flex items-center gap-1.5 text-xs font-mono"
          >
            <Download className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Export</span>
          </Button>

          {/* Bookmark */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              toggleBookmark(report.id);
              toast.success(isBookmarked ? "Removed from bookmarks" : "Saved to bookmarks");
            }}
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
            title="Bookmark Dossier"
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-indigo-500 text-indigo-500" : ""}`} />
          </Button>

          {/* Share */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopyLink}
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
            title="Share Dossier"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="cyan" className="font-mono text-xs">
            Deep Research Dossier
          </Badge>
          <Badge variant="success" className="font-mono text-xs flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" />
            <span>{report.confidenceScore}% Empirical Confidence</span>
          </Badge>
          <Badge variant="secondary" className="font-mono text-xs">
            {report.depth.toUpperCase()}
          </Badge>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-[1.2]">
          {report.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-4xl">
          {report.subtitle}
        </p>
      </div>

      {/* Metadata Bar */}
      <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-muted-foreground font-mono pt-2 border-t border-border/40">
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-indigo-400" />
          <span>{report.readTimeMinutes} min estimated read</span>
        </div>
        <div>Generated: {formatDate(report.createdAt)}</div>
        <div>Corpus: {report.stats.sourcesScanned} Sources Scanned</div>
        <div>Citations: {report.stats.sourcesCited} Verified Primary Anchors</div>
        <div className="text-emerald-400 font-semibold">● 100% Peer-Reviewed Grounding</div>
      </div>
    </div>
  );
}
