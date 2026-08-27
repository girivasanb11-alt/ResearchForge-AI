"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Search,
  BookOpen,
  Menu,
  X,
  Compass,
  Terminal,
  FolderGit2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
    { href: "/", label: "Home" },
    { href: "/research", label: "Dashboard", icon: Terminal },
    { href: "/report", label: "Reports", icon: BookOpen },
    { href: "/explore", label: "Vault", icon: Compass },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl transition-all">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Minimal Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold tracking-tight text-foreground font-sans">
                ResearchForge<span className="text-indigo-500 font-mono">AI</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium rounded-lg transition-all",
                      isActive
                        ? "bg-secondary text-foreground font-semibold border border-border"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Quick Search */}
            <button
              onClick={() => setIsCommandMenuOpen(true)}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1 text-xs font-mono text-muted-foreground bg-secondary/50 border border-border rounded-lg hover:text-foreground hover:border-border/80 transition-all"
            >
              <Search className="h-3 w-3" />
              <span>Search...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px]">⌘K</kbd>
            </button>

            {/* Connect Repo Modal Trigger */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsConnectRepoOpen(true)}
              className="text-xs font-mono h-8 flex items-center gap-1.5"
            >
              <FolderGit2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Connect Repo</span>
            </Button>

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-background p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-xs font-medium text-foreground hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Connect Repository Modal */}
      <ConnectRepoModal
        isOpen={isConnectRepoOpen}
        onClose={() => setIsConnectRepoOpen(false)}
      />
    </>
  );
}
