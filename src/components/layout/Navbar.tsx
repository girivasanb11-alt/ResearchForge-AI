"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Search,
  BookOpen,
  Flame,
  Menu,
  X,
  Compass,
  ArrowRight,
  Terminal,
  FolderGit2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import { useResearch } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ConnectRepoModal } from "@/components/research/ConnectRepoModal";

export function Navbar() {
  const pathname = usePathname();
  const { setIsCommandMenuOpen } = useResearch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isConnectRepoOpen, setIsConnectRepoOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Overview", icon: Flame },
    { href: "/research", label: "Research Studio", icon: Terminal, badge: "Live Agent" },
    { href: "/report/solid-state-batteries-2026", label: "Reports Dossier", icon: BookOpen },
    { href: "/explore", label: "Knowledge Vault", icon: Compass },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl transition-all">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 shadow-md shadow-indigo-500/20 group-hover:scale-105 group-hover:shadow-indigo-500/40 transition-all duration-300">
                <Sparkles className="h-5 w-5 text-white animate-pulse" />
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent group-hover:from-indigo-400 group-hover:to-cyan-400 transition-all">
                  ResearchForge<span className="text-indigo-500 font-mono ml-0.5 font-black">AI</span>
                </span>
                <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase -mt-0.5">
                  Autonomous Deep Research
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1 ml-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (link.href.startsWith("/report") && pathname.startsWith("/report"));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all",
                      isActive
                        ? "bg-secondary text-foreground font-semibold shadow-sm border border-border/70"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    <Icon className={cn("h-3.5 w-3.5", isActive ? "text-indigo-400" : "text-muted-foreground")} />
                    <span>{link.label}</span>
                    {link.badge && (
                      <Badge variant="cyan" className="text-[9px] px-1.5 py-0 h-4 ml-1">
                        {link.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* Quick Command Trigger (Linear style) */}
            <button
              onClick={() => setIsCommandMenuOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground bg-secondary/60 hover:bg-secondary/90 hover:text-foreground border border-border/80 rounded-lg transition-all group cursor-pointer shadow-inner"
            >
              <Search className="h-3.5 w-3.5 text-muted-foreground group-hover:text-indigo-400 transition-colors" />
              <span>Search topics & papers...</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] font-mono bg-background/80 px-1.5 py-0.5 rounded border border-border text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>

            {/* Connect Repository Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsConnectRepoOpen(true)}
              className="hidden md:flex items-center gap-1.5 text-xs font-mono"
            >
              <FolderGit2 className="h-3.5 w-3.5 text-indigo-400" />
              <span>Connect Repo</span>
            </Button>

            <ThemeToggle />

            <Link href="/research">
              <Button size="sm" variant="glow" className="hidden sm:flex items-center gap-1.5 shadow-sm font-medium">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Launch Agent</span>
                <ArrowRight className="h-3 w-3 opacity-70" />
              </Button>
            </Link>

            {/* Mobile menu trigger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 text-muted-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-background/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-secondary text-indigo-400 font-semibold"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <Badge variant="cyan" className="text-[10px]">
                        {link.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsConnectRepoOpen(true);
                }}
                className="w-full justify-center text-xs font-mono flex items-center gap-2"
              >
                <FolderGit2 className="h-4 w-4 text-indigo-400" />
                <span>Connect Repository (researchforge-ai)</span>
              </Button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCommandMenuOpen(true);
                }}
                className="flex w-full items-center justify-between px-3 py-2 text-xs text-muted-foreground bg-secondary/50 border border-border rounded-lg"
              >
                <span className="flex items-center gap-2">
                  <Search className="h-3.5 w-3.5" />
                  Search anything...
                </span>
                <kbd className="font-mono text-[10px] bg-background px-1.5 py-0.5 rounded border border-border">⌘K</kbd>
              </button>
              <Link href="/research" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="glow" className="w-full justify-center">
                  Launch Deep Research Agent
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Connect Repo Modal */}
      <ConnectRepoModal
        isOpen={isConnectRepoOpen}
        onClose={() => setIsConnectRepoOpen(false)}
      />
    </>
  );
}
