"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Search,
  User,
  LogOut,
  Sparkles,
  Layers,
  Bot,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/hooks/use-auth";
import { useResearch } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { AuthModal } from "@/features/auth/AuthModal";

export function TopNav() {
  const { user, isAuthenticated, logout } = useAuth();
  const { activeAgentStatus, setIsCommandMenuOpen } = useResearch();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const getStatusBadge = () => {
    switch (activeAgentStatus) {
      case "searching":
        return (
          <Badge variant="cyan" className="text-[10px] font-mono flex items-center gap-1.5 animate-pulse">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>Searching MCP Corpora</span>
          </Badge>
        );
      case "analyzing":
        return (
          <Badge variant="purple" className="text-[10px] font-mono flex items-center gap-1.5 animate-pulse">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
            <span>Multi-Agent Analyzing</span>
          </Badge>
        );
      case "waiting_approval":
        return (
          <Badge variant="warning" className="text-[10px] font-mono flex items-center gap-1.5 bg-amber-500/10 text-amber-300 border-amber-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>Waiting Approval</span>
          </Badge>
        );
      case "generating_report":
        return (
          <Badge variant="cyan" className="text-[10px] font-mono flex items-center gap-1.5 animate-pulse">
            <Sparkles className="h-3 w-3 text-cyan-400" />
            <span>Compiling Report</span>
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="success" className="text-[10px] font-mono flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Agents Idle</span>
          </Badge>
        );
      default:
        return (
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-400/80 inline-block" />
            <span>Desk Ready</span>
          </div>
        );
    }
  };

  return (
    <>
      <header className="h-14 border-b border-border/70 bg-background/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30">
        {/* Left: Quick Search */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCommandMenuOpen(true)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-border/80 bg-secondary/40 hover:bg-secondary text-xs font-mono text-muted-foreground hover:text-foreground transition-all"
          >
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Search research topics or citations...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px]">⌘K</kbd>
          </button>
        </div>

        {/* Center: Live Agent Activity Status Indicator */}
        <div className="hidden md:flex items-center gap-2">
          {getStatusBadge()}
        </div>

        {/* Right Actions: Notifications, Theme, Profile */}
        <div className="flex items-center gap-3">
          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors relative"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-purple-400" />
            </button>

            {/* Notifications Popover */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur-xl space-y-3 z-50">
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <span className="text-xs font-bold text-foreground font-sans">Desk Activity</span>
                  <span className="text-[10px] font-mono text-muted-foreground">TrueForge v4.2</span>
                </div>
                <div className="space-y-2 text-xs font-mono text-muted-foreground">
                  <div className="p-2 rounded-lg bg-secondary/40 border border-border/60">
                    <p className="text-foreground font-semibold text-[11px]">MCP ArXiv Crawler Connected</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Ready for deep literature searches.</p>
                  </div>
                  <div className="p-2 rounded-lg bg-secondary/40 border border-border/60">
                    <p className="text-foreground font-semibold text-[11px]">Sandbox Python 3.12 Warm</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Isolated container online.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <ThemeToggle />

          {/* User Profile / Auth State */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-secondary transition-all"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold text-xs">
                  {user.firstName ? user.firstName[0].toUpperCase() : "R"}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-semibold text-foreground leading-none">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="text-[9px] font-mono text-purple-400 uppercase leading-none mt-0.5">
                    {user.role}
                  </span>
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-card/95 p-3 shadow-2xl backdrop-blur-xl space-y-2 z-50">
                  <div className="p-2 border-b border-border/60">
                    <p className="text-xs font-bold text-foreground">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-[10px] font-mono text-muted-foreground truncate">{user.email}</p>
                  </div>

                  <Link
                    href="/settings"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2 p-2 rounded-lg text-xs hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>Workspace Settings</span>
                  </Link>

                  <Link
                    href="/agents"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2 p-2 rounded-lg text-xs hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Bot className="h-3.5 w-3.5" />
                    <span>Agent Configuration</span>
                  </Link>

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-lg text-xs hover:bg-rose-500/10 text-rose-400 transition-colors"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition-all shadow-md shadow-purple-600/20"
            >
              <User className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
