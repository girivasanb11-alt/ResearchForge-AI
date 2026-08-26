import React from "react";
import Link from "next/link";
import { Sparkles, Terminal, ShieldCheck, Cpu, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/40 backdrop-blur-md pt-14 pb-10 text-muted-foreground text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold text-foreground font-sans">
                ResearchForge<span className="text-indigo-500 font-mono">AI</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm text-muted-foreground">
              Autonomous multi-agent deep research platform designed for scientists, quantitative researchers, patent attorneys, and market strategists. Grounded in verifiable academic cross-validation.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                All Synthesis Agents Operational
              </div>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider font-mono">Research Hub</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/research" className="hover:text-foreground transition-colors flex items-center gap-1">
                  Autonomous Studio <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/report/solid-state-batteries-2026" className="hover:text-foreground transition-colors">
                  Solid-State Battery Dossier
                </Link>
              </li>
              <li>
                <Link href="/report/multi-agent-orchestration-2026" className="hover:text-foreground transition-colors">
                  Multi-Agent Architectures
                </Link>
              </li>
              <li>
                <Link href="/report/glp1-dual-agonists-2026" className="hover:text-foreground transition-colors">
                  GLP-1 Metabolic Agonists
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider font-mono">Engine & Core</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-indigo-400" />
                <span>Recursive Planning Engine</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Deterministic Fact-Checking</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                <span>Dynamic Knowledge Graphs</span>
              </li>
              <li>
                <Link href="/explore" className="hover:text-foreground transition-colors">
                  Citation Verification Index
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider font-mono">Compliance & Specs</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-muted-foreground">SOC2 Type II Certified</span>
              </li>
              <li>
                <span className="text-muted-foreground">BibTeX & DOI Grounded</span>
              </li>
              <li>
                <span className="text-muted-foreground">Zero Retention Option</span>
              </li>
              <li>
                <span className="text-muted-foreground">Air-Gapped Enterprise VPC</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>© {new Date().getFullYear()} ResearchForge AI. All rights reserved.</span>
            <span className="text-border">|</span>
            <span>Next.js 15 App Router</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-foreground cursor-pointer transition-colors">Security</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">API Reference</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
