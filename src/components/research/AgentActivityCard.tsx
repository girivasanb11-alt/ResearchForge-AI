"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  Building2,
  Users2,
  TrendingUp,
  Cpu,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Terminal,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export interface AgentActivityStep {
  id: string;
  name: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "completed" | "running" | "pending";
  progress: number;
  badge: string;
  details: string[];
}

interface AgentActivityCardProps {
  query?: string;
  reportId?: string;
  onApprove?: () => void;
  onReset?: () => void;
}

export function AgentActivityCard({
  query = "Solid-State Battery Commercialization: Electrolyte Architectures and Market Deployment",
  reportId = "solid-state-batteries-2026",
  onApprove,
  onReset,
}: AgentActivityCardProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(4); // Default to Sandbox Analysis / Waiting Approval
  const [isApproved, setIsApproved] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState<"activity" | "logs">("activity");

  const [steps, setSteps] = useState<AgentActivityStep[]>([
    {
      id: "search_web",
      name: "Searching Web",
      subtext: "Crawling arXiv, Nature, ScienceDirect, USPTO & SEC 10-K feeds",
      icon: Globe,
      status: "completed",
      progress: 100,
      badge: "542 Sources Ingested",
      details: [
        "Traversed 142 Nature & Science full-text preprints",
        "Queried USPTO patent registry for solid electrolyte claims",
        "Filtered 88 empirical data tables and Nyquist impedance curves",
      ],
    },
    {
      id: "company_agent",
      name: "Company Agent Running",
      subtext: "Extracting primary company specs, patents & pilot factory roadmaps",
      icon: Building2,
      status: "completed",
      progress: 100,
      badge: "QuantumScape / Toyota / CATL",
      details: [
        "Parsed QuantumScape Cobra separator specifications",
        "Extracted Toyota & Idemitsu 2027 pilot gigawatt timeline",
        "Validated CATL Shenxing battery energy density metrics",
      ],
    },
    {
      id: "competitor_agent",
      name: "Competitor Agent Running",
      subtext: "Cross-analyzing competing chemistries, TRL levels & trade-offs",
      icon: Users2,
      status: "completed",
      progress: 100,
      badge: "18 Competing Labs",
      details: [
        "Compared Sulfide (Li6PS5Cl) vs Oxide Garnet (LLZO) vs PEO Polymer",
        "Triangulated 10-80% fast charging rates at 5 MPa stack pressure",
        "Identified cathode interface space-charge degradation trade-offs",
      ],
    },
    {
      id: "market_agent",
      name: "Market Agent Running",
      subtext: "Modeling cost parity trajectories, capex reduction & global TAM",
      icon: TrendingUp,
      status: "completed",
      progress: 100,
      badge: "$82/kWh by 2028",
      details: [
        "Simulated 40% capex reduction from roll-to-roll dry electrode processing",
        "Projected 120 GWh global SSB capacity operational by 2030",
        "Calculated luxury EV adoption inflection point at late 2027",
      ],
    },
    {
      id: "sandbox_analysis",
      name: "Sandbox Analysis",
      subtext: "Running numerical code simulation & contradiction triangulation",
      icon: Cpu,
      status: "completed",
      progress: 100,
      badge: "6 Contradictions Resolved",
      details: [
        "Reconciled critical current density conflict (8 mA/cm² vs 14 mA/cm²)",
        "Executed Monte Carlo unit-cost regression in isolated Python sandbox",
        "Calibrated empirical confidence score to 98.4%",
      ],
    },
    {
      id: "waiting_approval",
      name: "Waiting Approval",
      subtext: "Human-in-the-loop synthesis checkpoint before dossier compilation",
      icon: Clock,
      status: isApproved ? "completed" : "running",
      progress: isApproved ? 100 : 85,
      badge: isApproved ? "Dossier Approved" : "Action Required",
      details: [
        "Synthesized 48 primary DOI citations and dynamic knowledge graph",
        "Generated multi-speaker executive audio briefing podcast script",
        "Ready for final verification sign-off and publication export",
      ],
    },
  ]);

  const handleApprove = () => {
    setIsApproved(true);
    setSteps((prev) =>
      prev.map((s) => (s.id === "waiting_approval" ? { ...s, status: "completed", progress: 100, badge: "Dossier Approved" } : s))
    );
    toast.success("Research Dossier Approved & Compiled Successfully!");
    if (onApprove) onApprove();
  };

  const handleRerun = () => {
    setIsApproved(false);
    setIsSimulating(true);
    setCurrentStepIndex(0);
    setSteps((prev) =>
      prev.map((s, idx) => ({
        ...s,
        status: idx === 0 ? "running" : "pending",
        progress: idx === 0 ? 30 : 0,
      }))
    );

    // Simulate multi-step progression
    const timers = [
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, idx) => ({
            ...s,
            status: idx < 1 ? "completed" : idx === 1 ? "running" : "pending",
            progress: idx < 1 ? 100 : idx === 1 ? 40 : 0,
          }))
        );
        setCurrentStepIndex(1);
      }, 1200),
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, idx) => ({
            ...s,
            status: idx < 2 ? "completed" : idx === 2 ? "running" : "pending",
            progress: idx < 2 ? 100 : idx === 2 ? 60 : 0,
          }))
        );
        setCurrentStepIndex(2);
      }, 2400),
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, idx) => ({
            ...s,
            status: idx < 3 ? "completed" : idx === 3 ? "running" : "pending",
            progress: idx < 3 ? 100 : idx === 3 ? 80 : 0,
          }))
        );
        setCurrentStepIndex(3);
      }, 3600),
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, idx) => ({
            ...s,
            status: idx < 4 ? "completed" : idx === 4 ? "running" : "pending",
            progress: idx < 4 ? 100 : idx === 4 ? 90 : 0,
          }))
        );
        setCurrentStepIndex(4);
      }, 4800),
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, idx) => ({
            ...s,
            status: idx < 5 ? "completed" : "running",
            progress: idx < 5 ? 100 : 85,
          }))
        );
        setCurrentStepIndex(5);
        setIsSimulating(false);
      }, 6000),
    ];

    return () => timers.forEach(clearTimeout);
  };

  const completedCount = steps.filter((s) => s.status === "completed").length;
  const overallProgress = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="rounded-3xl border border-border bg-card/90 shadow-2xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h3 className="text-lg font-bold text-foreground font-sans">
              Agent Activity
            </h3>
            <Badge variant="cyan" className="font-mono text-[10px]">
              TrueForge Multi-Agent v4.2
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 font-mono line-clamp-1">
            Target: &ldquo;{query}&rdquo;
          </p>
        </div>

        {/* Tab & Action Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-xl border border-border/60">
            <button
              onClick={() => setActiveTab("activity")}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-mono transition-all",
                activeTab === "activity"
                  ? "bg-card text-foreground font-bold shadow-xs border border-border/80"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Activity View
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-mono transition-all",
                activeTab === "logs"
                  ? "bg-card text-foreground font-bold shadow-xs border border-border/80"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Agent Logs
            </button>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleRerun}
            disabled={isSimulating}
            className="text-xs font-mono h-8"
          >
            <RotateCcw className={cn("h-3 w-3 mr-1", isSimulating && "animate-spin")} />
            <span>Simulate Swarm</span>
          </Button>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-muted-foreground">Swarm Synthesis Status</span>
          <span className="text-indigo-400 font-bold">{overallProgress}% Completed</span>
        </div>
        <Progress value={overallProgress} className="h-2" />
      </div>

      {activeTab === "activity" ? (
        /* 6-Stage Agent Activity List */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isDone = step.status === "completed";
            const isRunning = step.status === "running";
            const isWaitingApproval = step.id === "waiting_approval" && !isApproved;

            return (
              <div
                key={step.id}
                className={cn(
                  "p-4 rounded-2xl border transition-all duration-200 relative overflow-hidden flex flex-col justify-between group",
                  isRunning
                    ? "bg-indigo-500/10 border-indigo-500/80 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/40"
                    : isDone
                    ? "bg-card/70 border-border/80 hover:border-border hover:bg-card"
                    : "bg-secondary/20 border-border/40 opacity-50"
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          "h-8 w-8 rounded-xl flex items-center justify-center border",
                          isDone
                            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                            : isRunning
                            ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/40 animate-pulse"
                            : "bg-secondary text-muted-foreground border-border/60"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="flex items-center gap-1.5">
                        {isDone ? (
                          <div className="flex items-center gap-1 text-emerald-400 font-mono text-xs font-bold">
                            <CheckCircle2 className="h-3.5 w-3.5 stroke-[2.5]" />
                            <span>✓</span>
                          </div>
                        ) : isRunning ? (
                          <Activity className="h-3.5 w-3.5 text-indigo-400 animate-spin" />
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-zinc-600 inline-block" />
                        )}
                        <h4 className="text-xs sm:text-sm font-bold text-foreground">
                          {step.name}
                        </h4>
                      </div>
                    </div>

                    <Badge
                      variant={isDone ? "secondary" : isRunning ? "cyan" : "secondary"}
                      className="text-[10px] font-mono shrink-0"
                    >
                      {step.badge}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed pl-10 mb-3">
                    {step.subtext}
                  </p>
                </div>

                {/* Sub-item bullets */}
                <div className="pl-10 space-y-1 text-[11px] font-mono text-muted-foreground/80 border-t border-border/40 pt-2.5">
                  {step.details.slice(0, 2).map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-1.5 truncate">
                      <span className="h-1 w-1 rounded-full bg-indigo-400 shrink-0" />
                      <span className="truncate">{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Waiting Approval CTA Button */}
                {isWaitingApproval && (
                  <div className="mt-3 pt-3 border-t border-indigo-500/30 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-indigo-300 font-semibold">
                      Human-in-the-Loop Signoff:
                    </span>
                    <Button
                      variant="glow"
                      size="sm"
                      onClick={handleApprove}
                      className="h-7 text-xs px-3 font-bold flex items-center gap-1 rounded-lg"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Approve & Compile</span>
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Agent Terminal Logs View */
        <div className="rounded-2xl border border-border bg-zinc-950/80 p-4 font-mono text-xs text-zinc-300 space-y-2 max-h-80 overflow-y-auto">
          <div className="flex items-center justify-between text-muted-foreground border-b border-zinc-800 pb-2 text-[11px]">
            <div className="flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 text-indigo-400" />
              <span>agent://cluster/trueforge/execution.log</span>
            </div>
            <span className="text-emerald-400">● 6 Agents Active</span>
          </div>

          <div className="space-y-1 text-[11px] pt-1">
            <p className="text-indigo-300">[00:01] [SEARCH_AGENT] Initiated crawl across Nature, PubMed, CrossRef, and arXiv...</p>
            <p className="text-cyan-300">[00:04] [COMPANY_AGENT] Ingested QuantumScape Cobra and Toyota 2027 manufacturing whitepapers...</p>
            <p className="text-amber-300">[00:09] [COMPETITOR_AGENT] Cross-verified 18 lab benchmarks for room-temp ionic conductivity...</p>
            <p className="text-emerald-300">[00:14] [MARKET_AGENT] Synthesized 40% capex reduction model for dry electrode calendaring...</p>
            <p className="text-purple-300">[00:22] [SANDBOX_AGENT] Python Monte Carlo verification loop reconciled 6 disputed metrics...</p>
            <p className="text-indigo-400 font-bold">[00:30] [SUPERVISOR] Synthesized 48 DOI citations. Human approval gate triggered...</p>
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="pt-4 border-t border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>100% Deterministic Grounding • Zero Hallucination Guarantee</span>
        </div>

        <div className="flex items-center gap-2">
          {reportId && (
            <Link href={`/report/${reportId}`}>
              <Button variant="glow" size="sm" className="font-bold flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Inspect Full Dossier</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
