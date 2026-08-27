"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users2,
  Globe,
  Cpu,
  ShieldCheck,
  Sparkles,
  FileText,
} from "lucide-react";

export function FeatureGrid() {
  const features = [
    {
      title: "Multi-Agent Intelligence",
      description:
        "Autonomous swarm of specialized agents covering deep technical architectures, IP disclosures, peer benchmarking, and TAM forecasting.",
      icon: Users2,
      badge: "6 Agent Swarms",
      color: "from-purple-500/20 to-indigo-500/10 text-purple-400 border-purple-500/30",
      iconBg: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    },
    {
      title: "MCP Tool Integration",
      description:
        "Standardized Model Context Protocol tool calling directly querying arXiv academic papers, Crossref DOIs, USPTO patent claims, and SEC filings.",
      icon: Globe,
      badge: "4 MCP Endpoints",
      color: "from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30",
      iconBg: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    },
    {
      title: "Sandbox Execution",
      description:
        "Isolated Python 3.12 execution container running Monte Carlo simulations, yield regressions, and AST syntax linters with mathematical rigor.",
      icon: Cpu,
      badge: "Python 3.12 WASM",
      color: "from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/30",
      iconBg: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    },
    {
      title: "Human Approval Workflow",
      description:
        "Stage 6 Human-in-the-Loop consensus gatekeeper ensuring human researcher verification of synthesized findings before report compilation.",
      icon: ShieldCheck,
      badge: "Stage 6 Gate",
      color: "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30",
      iconBg: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    },
    {
      title: "Research Automation",
      description:
        "Zero-prompt-engineering autonomous orchestration transforming simple topic queries into multi-stage structured intelligence dossiers.",
      icon: Sparkles,
      badge: "Autonomous Engine",
      color: "from-pink-500/20 to-purple-500/10 text-pink-400 border-pink-500/30",
      iconBg: "bg-pink-500/15 text-pink-400 border-pink-500/30",
    },
    {
      title: "Report Generation",
      description:
        "Comprehensive publication dossiers complete with executive summary, market modeling, verified DOI citations, and instant PDF/Markdown exports.",
      icon: FileText,
      badge: "PDF & Markdown",
      color: "from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30",
      iconBg: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    },
  ];

  return (
    <section className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono font-semibold uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" />
          <span>TrueForge Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
          Built for Deep Autonomous Synthesis
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
          From live arXiv retrieval to isolated sandbox simulations and human consensus approval.
        </p>
      </div>

      {/* 6 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative rounded-3xl border border-[#1e293b]/80 bg-gradient-to-b from-[#0a1020]/90 to-[#060a14]/95 p-6 backdrop-blur-xl shadow-xl hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`h-11 w-11 rounded-2xl border flex items-center justify-center shadow-lg ${feature.iconBg}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-secondary/50 px-2 py-0.5 rounded-full border border-border/50">
                    {feature.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-white font-sans group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>TrueForge Powered</span>
                <span>→</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
