"use client";

import React from "react";
import Link from "next/link";
import { Bot, ShieldCheck, Globe, Building2, Users2, TrendingUp, Cpu, Sparkles } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DashboardAgentsPage() {
  const agentHarnesses = [
    {
      name: "Web Ingestion MCP Agent",
      role: "Stage 1 • Corpus Crawler",
      description: "Direct Model Context Protocol queries across arXiv, Crossref, and web endpoints with semantic vector ranking.",
      icon: Globe,
      status: "online",
      tools: ["arxiv_search", "crossref_doi_lookup", "web_search_mcp"],
    },
    {
      name: "Company Architecture Agent",
      role: "Stage 2 • Primary IP Analyst",
      description: "Extracts technical architectures, patent disclosures, pilot yield metrics, and roadmaps.",
      icon: Building2,
      status: "online",
      tools: ["patent_claims_parser", "sec_10k_extractor", "tech_stack_mapper"],
    },
    {
      name: "Competitor Benchmark Agent",
      role: "Stage 3 • Adversarial Triangulator",
      description: "Cross-checks competing chemical/software architectures and benchmarks across independent labs.",
      icon: Users2,
      status: "online",
      tools: ["peer_benchmarking", "contradiction_engine", "yield_comparison"],
    },
    {
      name: "Market Dynamics Agent",
      role: "Stage 4 • Unit Economics Forecaster",
      description: "Models cost per unit trajectories, capex reduction curves, and commercial adoption timelines.",
      icon: TrendingUp,
      status: "online",
      tools: ["tam_curve_projector", "capex_discount_model", "supply_chain_auditor"],
    },
    {
      name: "Sandbox Execution Agent",
      role: "Stage 5 • Numerical Code Verifier",
      description: "Executes Monte Carlo regressions and AST linters in an isolated Python 3.12 sandbox.",
      icon: Cpu,
      status: "online",
      tools: ["python312_wasm_sandbox", "monte_carlo_engine", "ast_safety_linter"],
    },
    {
      name: "Human Consensus Sentinel",
      role: "Stage 6 • Signoff Gatekeeper",
      description: "Researcher reviews synthesized facts, grounded DOIs, and signs off before report generation.",
      icon: ShieldCheck,
      status: "online",
      tools: ["human_approval_gate", "integrity_signature_verifier", "doi_grounding_audit"],
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold uppercase tracking-wider mb-1">
              <Bot className="h-3.5 w-3.5" />
              <span>Multi-Agent Swarm</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
              TrueForge Agent Swarm Harness
            </h1>
            <p className="text-xs text-muted-foreground font-sans mt-0.5">
              Live status, Model Context Protocol configurations, and execution parameters.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="success" className="text-xs font-mono flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Harness Active ({agentHarnesses.length}/6 Agents Ready)</span>
            </Badge>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {agentHarnesses.map((agent) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.name}
                className="p-5 rounded-2xl border border-border/80 bg-card/60 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="h-9 w-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="success" className="text-[10px] font-mono capitalize">
                      {agent.status}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-foreground font-sans">{agent.name}</h4>
                    <span className="text-[11px] font-mono text-purple-400">{agent.role}</span>
                  </div>

                  <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                    {agent.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/50 space-y-1.5">
                  <div className="text-[10px] font-mono text-muted-foreground uppercase">Tools Bound:</div>
                  <div className="flex flex-wrap gap-1">
                    {agent.tools.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono bg-secondary/70 text-slate-300 px-2 py-0.5 rounded-md border border-border/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Launch CTA */}
        <div className="p-6 rounded-3xl border border-border/80 bg-card/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-foreground font-sans">Ready to deploy swarm on a research topic?</h4>
            <p className="text-xs text-muted-foreground font-mono">Autonomous pipeline executes across all 6 specialized agents.</p>
          </div>
          <Link href="/dashboard/research">
            <Button variant="glow" size="sm" className="font-mono text-xs font-bold flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>Launch Swarm</span>
            </Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
