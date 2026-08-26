"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useResearch } from "@/lib/store";
import { ReportHeader } from "@/components/report/ReportHeader";
import { ReportOverviewMetrics } from "@/components/report/ReportOverviewMetrics";
import { ReportBodyViewer } from "@/components/report/ReportBodyViewer";
import { KnowledgeGraph } from "@/components/report/KnowledgeGraph";
import { ContradictionMatrix } from "@/components/report/ContradictionMatrix";
import { ReportChatSidebar } from "@/components/report/ReportChatSidebar";
import { AudioBriefingPlayer } from "@/components/report/AudioBriefingPlayer";
import { ExportShareModal } from "@/components/report/ExportShareModal";
import { Share2, GitCompare, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ReportDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { getReportById } = useResearch();

  const report = getReportById(id) || getReportById("solid-state-batteries-2026");

  const [activeTab, setActiveTab] = useState<"dossier" | "graph" | "contradictions">("dossier");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [selectedCitationId, setSelectedCitationId] = useState<string | null>(null);

  if (!report) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold">Dossier Not Found</h2>
        <p className="text-sm text-muted-foreground">The requested research report does not exist.</p>
        <Link href="/research">
          <Button variant="default">Back to Research Studio</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header Bar */}
      <ReportHeader
        report={report}
        onOpenExport={() => setIsExportOpen(true)}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        onToggleAudio={() => setIsAudioOpen(!isAudioOpen)}
        isChatOpen={isChatOpen}
        isAudioOpen={isAudioOpen}
      />

      {/* Main Mode Tabs (Dossier Document / Knowledge Graph / Contradiction Engine) */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-border/80 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("dossier")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                activeTab === "dossier"
                  ? "bg-secondary text-indigo-400 border border-border shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Synthesized Dossier</span>
            </button>

            <button
              onClick={() => setActiveTab("graph")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                activeTab === "graph"
                  ? "bg-secondary text-cyan-400 border border-border shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Knowledge Graph ({report.graphNodes?.length || 9})</span>
            </button>

            <button
              onClick={() => setActiveTab("contradictions")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                activeTab === "contradictions"
                  ? "bg-secondary text-amber-400 border border-border shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <GitCompare className="h-3.5 w-3.5" />
              <span>Contradiction Matrix ({report.contradictions?.length || 2})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Comprehensive Dossier */}
        {activeTab === "dossier" && (
          <div className="space-y-12 animate-in fade-in duration-200">
            <ReportOverviewMetrics
              report={report}
              onSelectCitation={(cId) => setSelectedCitationId(cId)}
            />
            <ReportBodyViewer
              sections={report.sections}
              sources={report.sources}
              activeCitationId={selectedCitationId}
              onSelectCitation={(cId) => setSelectedCitationId(cId)}
            />
          </div>
        )}

        {/* Tab 2: Interactive Knowledge Graph */}
        {activeTab === "graph" && (
          <div className="animate-in fade-in duration-200">
            <KnowledgeGraph nodes={report.graphNodes || []} />
          </div>
        )}

        {/* Tab 3: Scientific Contradiction Matrix */}
        {activeTab === "contradictions" && (
          <div className="animate-in fade-in duration-200">
            <ContradictionMatrix contradictions={report.contradictions || []} />
          </div>
        )}
      </div>

      {/* Floating Audio Briefing Player */}
      <AudioBriefingPlayer
        report={report}
        isOpen={isAudioOpen}
        onClose={() => setIsAudioOpen(false)}
      />

      {/* AI Copilot Right Drawer */}
      <ReportChatSidebar
        report={report}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Export / Share Modal */}
      <ExportShareModal
        report={report}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}
