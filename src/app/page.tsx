"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Globe, Cpu } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SceneEnvironment } from "@/components/canvas/SceneEnvironment";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#020617] text-white selection:bg-purple-500 overflow-hidden">
      {/* Unified 3D Environment Background */}
      <SceneEnvironment />

      {/* Floating UI Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* ONLY ONE CLEAN NAVIGATION HEADER */}
        <header className="w-full flex-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Logo textClassName="text-xl font-extrabold text-white tracking-tight" />
            </Link>

            <div className="flex items-center gap-4">
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm" className="text-sm font-semibold font-sans text-slate-300 hover:text-white hover:bg-white/5 h-10 px-4 rounded-xl transition-colors">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button
                  size="sm"
                  className="relative group overflow-hidden text-sm font-bold font-sans h-10 px-6 rounded-xl border border-white/10 bg-black/20 backdrop-blur-md shadow-2xl hover:border-purple-500/50 transition-all"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600/40 via-indigo-600/40 to-blue-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center gap-2 text-white">
                    Start Research
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section Split Layout */}
        <main className="flex-1 flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 lg:pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT SIDE: Content */}
            <div className="lg:col-span-6 space-y-8 text-left z-20">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 backdrop-blur-md text-purple-200 text-xs font-mono font-semibold uppercase tracking-wider"
              >
                <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
                <span>Next-Gen Research Platform</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.05] text-white font-sans"
              >
                Enterprise Grade
                <br />
                <span className="bg-gradient-to-r from-white via-purple-300 to-[#38BDF8] bg-clip-text text-transparent">
                  AI Synthesis.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg text-slate-300/90 font-sans leading-relaxed max-w-lg"
              >
                Deploy autonomous multi-agent swarms to synthesize peer-reviewed papers, patents, and market data into verified dossiers in seconds.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="relative group h-14 px-8 rounded-2xl font-bold font-sans text-sm border border-purple-500/30 bg-purple-600/20 hover:bg-purple-600/40 hover:border-purple-400/50 backdrop-blur-md text-white shadow-[0_0_40px_-10px_rgba(147,51,234,0.4)] transition-all overflow-hidden flex items-center gap-2"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-20 group-hover:opacity-40 transition-opacity" />
                    <span className="relative z-10 flex items-center gap-2">
                      Initialize Agents
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                </Link>

                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 px-7 rounded-2xl font-semibold font-sans text-sm border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white flex items-center gap-2 transition-colors"
                  >
                    View Architecture
                  </Button>
                </Link>
              </motion.div>

              {/* Fast Stats Bar */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="pt-8 flex items-center gap-6 text-xs font-mono text-slate-400/80"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400/80" />
                  <span>Zero Hallucination</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-cyan-400/80" />
                  <span>Real-time Citing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-purple-400/80" />
                  <span>WASM Sandbox</span>
                </div>
              </motion.div>
            </div>
            
            {/* RIGHT SIDE: Visual anchor logic (space preserved for the background Canvas elements) */}
            <div className="lg:col-span-6 hidden lg:block pointer-events-none min-h-[500px]" />

          </div>
        </main>
      </div>
    </div>
  );
}
