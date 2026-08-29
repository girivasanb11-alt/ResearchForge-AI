"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Cpu, Globe, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { Logo } from "@/components/brand/Logo";
import { SceneEnvironment } from "@/components/canvas/SceneEnvironment";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Cinematic GSAP Entrance
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gsap-reveal",
        { opacity: 0, y: 40, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.2 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020617] text-white selection:bg-[#8A5BFF]/30 overflow-hidden font-sans">
      
      {/* 3D Cosmic Environment (R3F Pipeline) */}
      <SceneEnvironment />

      {/* Floating UI Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* ONE CLEAN NAVIGATION BAR */}
        <header className="w-full flex-none sticky top-0 z-50">
          <div className="absolute inset-0 bg-[#020617]/40 backdrop-blur-xl border-b border-white/5" />
          <div className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Logo textClassName="text-xl font-extrabold text-white tracking-tight" />
            </Link>

            <div className="flex items-center gap-3 sm:gap-6">
              <Link href="/auth/signin">
                <Button variant="ghost" className="hidden sm:flex text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 h-11 px-5 rounded-xl transition-colors">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button
                  className="relative group overflow-hidden text-sm font-bold h-11 px-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl hover:border-[#8A5BFF]/50 hover:bg-white/10 transition-all"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#5A3BFF]/40 via-[#00BFFF]/40 to-[#00D8FF]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 text-white">Start Research</span>
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Cinematic Split Hero */}
        <main ref={heroRef} className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 w-full pt-12 lg:pt-0 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[75vh]">
            
            {/* LEFT SIDE: Typography & CTAs */}
            <div className="lg:col-span-7 space-y-8 text-left z-20">
              
              {/* Badge */}
              <div className="gsap-reveal inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#8A5BFF]/30 bg-[#8A5BFF]/10 backdrop-blur-md text-[#C26CFF] text-xs font-mono font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(138,91,255,0.2)]">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                <span>Living Intelligence Network</span>
              </div>

              {/* Massive Hero Typography */}
              <h1 className="gsap-reveal text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter leading-[1.05] text-white">
                Autonomous
                <br />
                <span className="bg-gradient-to-r from-[#8A5BFF] via-[#00BFFF] to-[#00D8FF] bg-clip-text text-transparent">
                  AI Synthesis.
                </span>
              </h1>

              <p className="gsap-reveal text-lg sm:text-xl text-slate-300/80 font-medium leading-relaxed max-w-xl">
                Deploy multi-agent swarms to synthesize peer-reviewed papers, patents, and market data inside a living cosmic digital universe.
              </p>

              {/* CTAs */}
              <div className="gsap-reveal flex flex-wrap items-center gap-4 pt-4">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="relative group h-14 px-8 rounded-2xl font-bold text-base border border-[#8A5BFF]/40 bg-[#5A3BFF]/20 hover:bg-[#5A3BFF]/40 hover:border-[#8A5BFF]/70 backdrop-blur-xl text-white shadow-[0_0_50px_-12px_rgba(90,59,255,0.6)] transition-all overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#5A3BFF] to-[#00BFFF] opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center gap-2">
                      Initialize Agents
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>

                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 px-8 rounded-2xl font-semibold text-base border-white/10 bg-white/5 hover:bg-white/15 backdrop-blur-xl text-white transition-all shadow-xl"
                  >
                    Explore Universe
                  </Button>
                </Link>
              </div>

              {/* Stats / Trust Badges */}
              <div className="gsap-reveal pt-12 flex items-center gap-8 text-xs font-mono font-medium text-slate-400/80">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-[#8A5BFF]" />
                  <span>Quantum Compute</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-[#00BFFF]" />
                  <span>Global Swarm</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#00D8FF]" />
                  <span>Verified Output</span>
                </div>
              </div>
            </div>
            
            {/* RIGHT SIDE: Reserved for 3D HeroSphere bounding box */}
            <div className="lg:col-span-5 hidden lg:block h-full w-full pointer-events-none" />

          </div>
        </main>
      </div>
    </div>
  );
}
