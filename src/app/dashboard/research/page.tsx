"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { NewResearchInput } from "@/features/research/NewResearchInput";
import { AgentTimeline } from "@/features/research/AgentTimeline";
import { ActiveAgentsPanel } from "@/features/research/ActiveAgentsPanel";
import { HumanApprovalModal } from "@/features/research/HumanApprovalModal";
import { useResearch } from "@/lib/store";
import { Sparkles, Terminal, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardResearchPage() {
  const {
    currentSession,
    activeStages,
    activeAgentStatus,
    isApprovalModalOpen,
    setIsApprovalModalOpen,
    startResearch,
    approveStageAndContinue,
    cancelResearch,
  } = useResearch();

  const handleStart = (topic: string) => {
    startResearch(topic);
  };

  const isRunningOrPending =
    currentSession &&
    (currentSession.status === "running" ||
      currentSession.status === "waiting_approval" ||
      currentSession.status === "completed");

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold uppercase tracking-wider mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Multi-Agent Research Desk</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
              Autonomous Investigation
            </h1>
            <p className="text-xs text-muted-foreground font-sans mt-0.5">
              Launch live Model Context Protocol queries, adversarial agent swarms, and sandbox simulations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>TrueForge Engine Active</span>
            </span>
          </div>
        </div>

        {/* 1. Research Input Launcher */}
        <section>
          <NewResearchInput
            onStartResearch={handleStart}
            isLoading={activeAgentStatus === "searching" || activeAgentStatus === "analyzing"}
          />
        </section>

        {/* 2. Live 7-Stage Agent Timeline & Active Status Panel */}
        {isRunningOrPending ? (
          <section className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* 7-Stage Timeline */}
              <div className="lg:col-span-8 space-y-4">
                <AgentTimeline
                  stages={activeStages}
                  activeStatus={activeAgentStatus}
                  onCancel={cancelResearch}
                />
              </div>

              {/* Active Swarm Status Indicators */}
              <div className="lg:col-span-4 space-y-4">
                <ActiveAgentsPanel activeStatus={activeAgentStatus} />
              </div>
            </div>

            {/* Generated Report Ready Banner */}
            {currentSession?.status === "completed" && currentSession.reportId && (
              <div className="p-6 rounded-3xl border border-emerald-500/40 bg-emerald-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in zoom-in-95 duration-200">
                <div className="space-y-1 text-left">
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                    Investigation Dossier Ready
                  </span>
                  <h3 className="text-base font-bold text-foreground font-sans">
                    Autonomous report compiled with DOI citations & sandbox verifications
                  </h3>
                </div>

                <Link href={`/dashboard/reports/${currentSession.reportId}`}>
                  <Button variant="glow" className="font-mono text-xs font-bold flex items-center gap-2">
                    <span>Open Full Research Dossier</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </section>
        ) : (
          /* Empty / Standby Guidance */
          <div className="p-8 rounded-3xl border border-dashed border-border/80 bg-card/40 text-center space-y-3">
            <div className="mx-auto h-10 w-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Terminal className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground font-sans">
              Enter a research topic to deploy the 7-stage swarm
            </h3>
            <p className="text-xs font-mono text-muted-foreground max-w-md mx-auto">
              Agents coordinate via Model Context Protocol, evaluate arXiv preprints, run Python 3.12 sandbox code, and request Stage 6 approval before generating structured dossiers.
            </p>
          </div>
        )}

        {/* Stage 6 Human Approval Modal */}
        <HumanApprovalModal
          isOpen={isApprovalModalOpen}
          onClose={() => setIsApprovalModalOpen(false)}
          onApprove={approveStageAndContinue}
          topic={currentSession?.topic || "Research Topic"}
        />
      </div>
    </DashboardLayout>
  );
}
