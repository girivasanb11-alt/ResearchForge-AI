"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Globe,
  Terminal,
  FileSpreadsheet,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ParticleWaveCanvas } from "@/components/canvas/ParticleWaveCanvas";
import { StarField } from "@/components/canvas/StarField";
import { HolographicOrb } from "@/components/canvas/HolographicOrb";
import { FloatingFeatureBadge } from "@/components/landing/FloatingFeatureBadge";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { WorkflowPipeline } from "@/components/landing/WorkflowPipeline";
import { TrustBadges } from "@/components/trust/TrustBadges";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030612] text-foreground relative overflow-x-hidden flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      {/* 1. Animated Atmospheric Background & Stars */}
      <StarField />

      {/* 2. Real-time 3D Particle Wave Mesh */}
      <ParticleWaveCanvas />

      {/* 3. Top Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#030612]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo textClassName="text-base font-bold text-white tracking-tight" />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-sans text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">
              Platform Features
            </a>
            <a href="#pipeline" className="hover:text-white transition-colors">
              7-Stage Pipeline
            </a>
            <Link href="/dashboard/agents" className="hover:text-white transition-colors">
              Agent Swarms
            </Link>
            <Link href="/dashboard/sandbox" className="hover:text-white transition-colors">
              Python Sandbox
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm" className="text-xs font-sans text-slate-300 hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button
                size="sm"
                className="text-xs font-bold font-sans bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-600/25 rounded-xl h-8 px-3.5"
              >
                Start Research
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 4. Main Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-24 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono font-semibold uppercase tracking-wider"
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
              <span>TrueForge Multi-Agent Desk v4.2</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white font-sans"
            >
              Autonomous Multi-Agent{" "}
              <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Research Desk
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-xl"
            >
              Deploy coordinated AI swarms that execute live Model Context Protocol tool queries across arXiv, Crossref, and USPTO patents, run isolated Python 3.12 sandboxes, and synthesize verified publication dossiers.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="h-12 px-7 rounded-2xl font-bold font-sans text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-xl shadow-purple-600/30 flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Start Free Research</span>
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-6 rounded-2xl font-semibold font-sans text-sm border-white/15 bg-white/5 hover:bg-white/10 text-white flex items-center gap-2"
                >
                  <span>Launch Agent Desk</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            {/* Fast Stats Bar */}
            <div className="pt-6 border-t border-white/10 flex items-center gap-6 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Zero Mock Data</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-cyan-400" />
                <span>4 MCP Servers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="h-4 w-4 text-purple-400" />
                <span>WASM Sandbox</span>
              </div>
            </div>
          </div>

          {/* Right Hero Column: 3D Holographic Research Core */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[420px]">
            <HolographicOrb />

            {/* Floating Badges around Holographic Core */}
            <FloatingFeatureBadge
              icon={Globe}
              title="arXiv & Crossref"
              subtitle="Direct MCP Ingestion"
              badgeColor="text-cyan-400 bg-cyan-500/15 border-cyan-500/30"
              delay={0.2}
              className="absolute -top-4 left-0"
            />

            <FloatingFeatureBadge
              icon={Terminal}
              title="Python 3.12 WASM"
              subtitle="Monte Carlo (N=10,000)"
              badgeColor="text-purple-400 bg-purple-500/15 border-purple-500/30"
              delay={0.5}
              className="absolute bottom-6 -left-4"
            />

            <FloatingFeatureBadge
              icon={FileSpreadsheet}
              title="Stage 6 Sentinel"
              subtitle="Human Consensus Gate"
              badgeColor="text-emerald-400 bg-emerald-500/15 border-emerald-500/30"
              delay={0.8}
              className="absolute top-1/2 -right-4 -translate-y-1/2"
            />
          </div>
        </div>

        {/* 5. 6 Feature Section Cards */}
        <div id="features">
          <FeatureGrid />
        </div>

        {/* 6. 7-Stage Workflow Pipeline Visualizer */}
        <div id="pipeline">
          <WorkflowPipeline />
        </div>

        {/* 7. Bottom 4 Feature Trust Badges */}
        <TrustBadges />
      </main>

      {/* 8. Global Enterprise Footer */}
      <footer className="w-full border-t border-white/10 bg-[#02050d] py-10 mt-16 text-xs text-slate-400 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo textClassName="text-sm font-bold text-white tracking-tight" />
            <span className="text-slate-600">|</span>
            <span>© 2026 ResearchForge AI. TrueForge Agent Desk Hackathon.</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact & Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
