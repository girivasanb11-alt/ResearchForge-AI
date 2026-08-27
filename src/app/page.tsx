"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Bot,
  Terminal,
  Cpu,
  Layers,
  FileCheck2,
  Lock,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ParticleWaveCanvas } from "@/components/canvas/ParticleWaveCanvas";
import { HolographicOrb } from "@/components/canvas/HolographicOrb";
import { StarField } from "@/components/canvas/StarField";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthModal } from "@/features/auth/AuthModal";

export default function LandingPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const realCapabilities = [
    {
      title: "MCP Tool Integration",
      description:
        "Direct Model Context Protocol connectivity to academic preprints, USPTO patent claims, and SEC Edgar corporate filings.",
      icon: Globe,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Secure Sandbox Execution",
      description:
        "Air-gapped Python 3.12 containers executing Monte Carlo regressions and AST mathematical verification before report compilation.",
      icon: Cpu,
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Human Approval Workflow",
      description:
        "Interactive Stage 6 signoff gate ensuring zero autonomous hallucination reaches final publication without researcher consent.",
      icon: ShieldCheck,
      color: "from-amber-500 to-orange-600",
    },
    {
      title: "Multi-Agent Collaboration",
      description:
        "Synchronized swarm of specialized agents (Web Search, Company, Competitor, and Market) orchestrating consensus.",
      icon: Bot,
      color: "from-indigo-500 to-purple-600",
    },
    {
      title: "Persistent Sessions",
      description:
        "Full session history indexing live agent logs, discovered citation DOIs, and reproducible execution environments.",
      icon: Layers,
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Report Generation",
      description:
        "Synthesizes publication-grade research dossiers complete with Executive Summary, Market Dynamics, and PDF/Markdown exports.",
      icon: FileCheck2,
      color: "from-pink-500 to-rose-600",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#030712] text-foreground overflow-x-hidden flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      {/* 1. Animated Atmospheric Background & Stars */}
      <StarField />

      {/* 2. Real-time 3D Particle Wave Mesh */}
      <ParticleWaveCanvas />

      {/* Top Navbar */}
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-16 sm:pt-24 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-ping" />
                <span>TrueForge Autonomous Multi-Agent Desk v4.2</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-sans leading-[1.1]">
                ResearchForge<span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 font-sans max-w-2xl leading-relaxed">
                Transform hours of research into minutes with autonomous AI agents powered by TrueForge.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <Link href="/research">
                  <Button
                    size="lg"
                    variant="glow"
                    className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold font-mono text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-purple-600/30"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Start Research</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <a href="#architecture">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-12 px-8 rounded-2xl font-mono text-sm border-border/80 bg-card/40 hover:bg-card/80 backdrop-blur-xl transition-all"
                  >
                    <span>View Architecture</span>
                  </Button>
                </a>
              </div>

              {/* Enterprise Trust Micro-Bar */}
              <div className="pt-8 flex flex-wrap items-center gap-6 text-xs font-mono text-muted-foreground border-t border-border/40">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Human-in-the-Loop Signoff</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Terminal className="h-4 w-4 text-purple-400" />
                  <span>Python 3.12 Sandbox Verified</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Lock className="h-4 w-4 text-cyan-400" />
                  <span>Model Context Protocol (MCP)</span>
                </span>
              </div>
            </div>

            {/* Right: Floating Holographic Orb */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
              <HolographicOrb />
            </div>
          </div>
        </section>

        {/* Feature Section: ONLY Real Platform Capabilities */}
        <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="purple" className="font-mono text-xs uppercase tracking-wider">
              TrueForge Architecture
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
              Engineered for Autonomous Rigor
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
              Every stage of the ResearchForge desk is strictly air-gapped, verifiable via scholarly DOIs, and mathematically validated.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {realCapabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="rounded-3xl border border-border/80 bg-card/60 p-6 backdrop-blur-xl hover:border-purple-500/50 hover:bg-card/90 transition-all duration-300 group shadow-xl space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${cap.color} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">Verified</span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-white font-sans group-hover:text-purple-300 transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />

      {/* Enterprise Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
