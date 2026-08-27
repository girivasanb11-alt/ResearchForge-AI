"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Building2,
  Users2,
  TrendingUp,
  Cpu,
  ShieldCheck,
  FileText,
  ArrowRight,
} from "lucide-react";

export function WorkflowPipeline() {
  const stages = [
    {
      id: 1,
      name: "Web Search MCP",
      role: "arXiv & Crossref Ingestion",
      icon: Globe,
      color: "text-cyan-400 bg-cyan-500/15 border-cyan-500/30",
    },
    {
      id: 2,
      name: "Company Agent",
      role: "Patent & SEC Extraction",
      icon: Building2,
      color: "text-purple-400 bg-purple-500/15 border-purple-500/30",
    },
    {
      id: 3,
      name: "Competitor Agent",
      role: "Triangulation & Benchmarks",
      icon: Users2,
      color: "text-indigo-400 bg-indigo-500/15 border-indigo-500/30",
    },
    {
      id: 4,
      name: "Market Agent",
      role: "TAM & Unit Economics",
      icon: TrendingUp,
      color: "text-pink-400 bg-pink-500/15 border-pink-500/30",
    },
    {
      id: 5,
      name: "Sandbox Analysis",
      role: "Python 3.12 Simulation",
      icon: Cpu,
      color: "text-blue-400 bg-blue-500/15 border-blue-500/30",
    },
    {
      id: 6,
      name: "Approval Sentinel",
      role: "Human-in-the-Loop Signoff",
      icon: ShieldCheck,
      color: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30",
    },
    {
      id: 7,
      name: "Generate Report",
      role: "Structured Dossier & PDF",
      icon: FileText,
      color: "text-amber-400 bg-amber-500/15 border-amber-500/30",
    },
  ];

  return (
    <section className="space-y-8 rounded-3xl border border-[#1e293b]/90 bg-gradient-to-b from-[#090f1e]/90 via-[#060a14]/95 to-[#040710] p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider mb-1">
            Autonomous Pipeline
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
            7-Stage TrueForge Multi-Agent Swarm
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Every investigation executes through verified tool calling, numerical verification, and human consensus.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono text-emerald-400 font-semibold">Live Swarm Ready</span>
        </div>
      </div>

      {/* Horizontal / Grid Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="relative p-3.5 rounded-2xl border border-white/10 bg-[#070c18]/80 flex flex-col justify-between space-y-3 group hover:border-purple-500/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className={`h-8 w-8 rounded-xl border flex items-center justify-center shrink-0 ${stage.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-mono text-slate-500 font-bold">0{stage.id}</span>
              </div>

              <div className="space-y-0.5 text-left">
                <h4 className="text-xs font-bold text-white font-sans group-hover:text-purple-300 transition-colors">
                  {stage.name}
                </h4>
                <p className="text-[10px] text-slate-400 font-sans leading-tight">
                  {stage.role}
                </p>
              </div>

              {idx < stages.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                  <ArrowRight className="h-3 w-3" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
