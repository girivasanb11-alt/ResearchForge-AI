"use client";

import React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { NewResearchInput } from "@/features/research/NewResearchInput";
import { AgentTimeline } from "@/features/research/AgentTimeline";
import { ActiveAgentsPanel } from "@/features/research/ActiveAgentsPanel";
import { HumanApprovalModal } from "@/features/research/HumanApprovalModal";
import { useResearch } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";

export default function ResearchStudioPage() {
  const {
    currentSession,
    activeStages,
    activeAgentStatus,
    startResearch,
    cancelResearch,
    setIsApprovalModalOpen,
  } = useResearch();

  const isExecuting =
    activeAgentStatus === "searching" ||
    activeAgentStatus === "analyzing" ||
    activeAgentStatus === "waiting_approval" ||
    activeAgentStatus === "generating_report";

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* If no active run or completed, show the New Research Input Launcher */}
        {!isExecuting && !currentSession?.reportId && (
          <NewResearchInput
            onStart={(topic, depth, scope) => startResearch(topic, depth, scope)}
            isLoading={isExecuting}
          />
        )}

        {/* If completed, show success card */}
        {currentSession && currentSession.status === "completed" && currentSession.reportId && (
          <div className="p-6 sm:p-8 rounded-3xl border border-emerald-500/40 bg-emerald-500/10 backdrop-blur-xl space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
              <CheckCircle2 className="h-4 w-4" />
              <span>Investigation Completed & Verified</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground font-sans">
              {currentSession.topic}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans">
              All 7 agent stages passed empirical validation, sandbox execution, and researcher sign-off.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href={`/report/${currentSession.reportId}`}>
                <Button variant="glow" size="sm" className="font-mono text-xs font-bold flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white">
                  <span>Open Full Research Dossier</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={cancelResearch}
                className="text-xs font-mono"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                <span>Start Another Investigation</span>
              </Button>
            </div>
          </div>
        )}

        {/* Active Agents Panel */}
        <ActiveAgentsPanel />

        {/* 7-Stage Agent Orchestration Timeline */}
        {currentSession && (
          <AgentTimeline
            stages={activeStages}
            onOpenApproval={() => setIsApprovalModalOpen(true)}
          />
        )}

        {/* Human Approval Gate Modal */}
        <HumanApprovalModal />
      </div>
    </DashboardLayout>
  );
}
