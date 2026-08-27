"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Terminal, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/hooks/use-auth";

interface NavbarProps {
  onOpenAuth?: () => void;
}

export function Navbar({ onOpenAuth }: NavbarProps) {
  const { isAuthenticated, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-[#030712]/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30 group-hover:scale-105 transition-all">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-base font-bold tracking-tight text-white font-sans">
              ResearchForge<span className="text-purple-400 font-mono">AI</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/dashboard"
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-secondary/40 rounded-xl transition-all"
            >
              Dashboard
            </Link>
            <Link
              href="/research"
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-secondary/40 rounded-xl transition-all"
            >
              New Research
            </Link>
            <Link
              href="/sessions"
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-secondary/40 rounded-xl transition-all"
            >
              Sessions
            </Link>
            <Link
              href="/reports"
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-secondary/40 rounded-xl transition-all"
            >
              Reports
            </Link>
            <Link
              href="/sandbox"
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-secondary/40 rounded-xl transition-all"
            >
              Sandbox
            </Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isAuthenticated && user ? (
            <Link href="/dashboard">
              <Button
                variant="glow"
                size="sm"
                className="h-9 px-4 rounded-xl text-xs font-mono font-bold flex items-center gap-2"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>Open Desk</span>
              </Button>
            </Link>
          ) : (
            <Button
              variant="glow"
              size="sm"
              onClick={onOpenAuth}
              className="h-9 px-4 rounded-xl text-xs font-mono font-bold flex items-center gap-2"
            >
              <User className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </Button>
          )}

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-secondary/60"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-[#030712] p-4 space-y-2">
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-secondary"
          >
            Dashboard
          </Link>
          <Link
            href="/research"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-secondary"
          >
            New Research
          </Link>
          <Link
            href="/reports"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-secondary"
          >
            Reports
          </Link>
          <Link
            href="/sandbox"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-secondary"
          >
            Sandbox
          </Link>
        </div>
      )}
    </header>
  );
}
