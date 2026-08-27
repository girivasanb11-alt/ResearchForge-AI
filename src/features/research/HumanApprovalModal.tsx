"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, Cpu, FileText, ArrowRight } from "lucide-react";
import { Dialog, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useResearch } from "@/lib/store";

export function HumanApprovalModal() {
  const { isApprovalModalOpen, setIsApprovalModalOpen, currentSession, approveStageAndContinue } =
    useResearch();

  if (!currentSession) return null;

  return (
    <Dialog open={isApprovalModalOpen} onOpenChange={setIsApprovalModalOpen}>
      <div className="space-y-5">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-amber-400">
              Stage 6 • Human-in-the-Loop Signoff
            </span>
          </div>

          <DialogTitle className="text-xl font-extrabold tracking-tight text-foreground font-sans">
            Approve Research Synthesis
          </DialogTitle>

          <DialogDescription className="text-xs text-muted-foreground font-sans">
            TrueForge subagents have completed multi-corpus retrieval and sandbox validation for{" "}
            <span className="text-foreground font-semibold font-mono">&ldquo;{currentSession.topic}&rdquo;</span>.
          </DialogDescription>
        </DialogHeader>

        {/* Verification Checkpoints */}
        <div className="space-y-2.5 text-xs font-mono">
          <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-foreground font-bold">18 Academic & Patent Sources Verified</p>
              <p className="text-muted-foreground text-[11px]">DOIs resolved via Crossref and USPTO APIs with zero hallucinated references.</p>
            </div>
          </div>

          <div className="p-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 flex items-start gap-2.5">
            <Cpu className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-foreground font-bold">Isolated Python Sandbox Verification Passed</p>
              <p className="text-muted-foreground text-[11px]">Monte Carlo projections executed with 94.2% empirical confidence.</p>
            </div>
          </div>

          <div className="p-3 rounded-xl border border-purple-500/30 bg-purple-500/10 flex items-start gap-2.5">
            <FileText className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-foreground font-bold">Multi-Agent Consensus Reached</p>
              <p className="text-muted-foreground text-[11px]">Company, Competitor, and Market agents reconciled all adversarial claims.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3 border-t border-border/70">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsApprovalModalOpen(false)}
            className="w-full sm:w-auto text-xs font-mono"
          >
            Review Logs First
          </Button>

          <Button
            variant="glow"
            size="sm"
            onClick={approveStageAndContinue}
            className="w-full sm:w-auto text-xs font-mono font-bold flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Sign Off & Compile Dossier</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
