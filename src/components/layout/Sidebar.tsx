"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  Clock,
  Bot,
  FileText,
  Terminal,
  Settings,
  Sparkles,
  ShieldCheck,
  FolderGit2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useResearch } from "@/lib/store";

interface SidebarProps {
  onOpenConnectRepo?: () => void;
}

export function Sidebar({ onOpenConnectRepo }: SidebarProps) {
  const pathname = usePathname();
  const { activeAgentStatus, sessions, reports } = useResearch();

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "New Research",
      href: "/research",
      icon: PlusCircle,
      highlight: true,
    },
    {
      label: "Research Sessions",
      href: "/sessions",
      icon: Clock,
      badge: sessions.length > 0 ? sessions.length.toString() : undefined,
    },
    {
      label: "Agents",
      href: "/agents",
      icon: Bot,
      statusPulse: activeAgentStatus !== "idle",
    },
    {
      label: "Reports",
      href: "/reports",
      icon: FileText,
      badge: reports.length > 0 ? reports.length.toString() : undefined,
    },
    {
      label: "Sandbox",
      href: "/sandbox",
      icon: Terminal,
      tag: "Python 3.12",
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 border-r border-border/70 bg-card/40 backdrop-blur-xl flex flex-col justify-between shrink-0 h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-border/60">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 shadow-md shadow-purple-500/20 group-hover:scale-105 transition-all duration-300">
            <Sparkles className="h-4 w-4 text-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-foreground font-sans">
              ResearchForge<span className="text-purple-400 font-mono">AI</span>
            </span>
            <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
              TrueForge Agent Desk
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        <div className="px-3 py-1 text-[10px] font-mono text-muted-foreground uppercase tracking-wider font-semibold">
          Platform
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href === "/reports" && pathname.startsWith("/report"));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group",
                isActive
                  ? "bg-purple-500/15 text-purple-300 border border-purple-500/30 font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                item.highlight && !isActive && "text-foreground font-semibold"
              )}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-colors",
                    isActive ? "text-purple-400" : "text-muted-foreground group-hover:text-foreground",
                    item.highlight && !isActive && "text-purple-400"
                  )}
                />
                <span className="truncate">{item.label}</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {item.statusPulse && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                  </span>
                )}

                {item.badge && (
                  <Badge variant="secondary" className="text-[10px] font-mono px-1.5 py-0 h-4">
                    {item.badge}
                  </Badge>
                )}

                {item.tag && (
                  <span className="text-[9px] font-mono text-muted-foreground bg-secondary px-1.5 py-0.5 rounded border border-border/60">
                    {item.tag}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Workspace Status & Connect Repo */}
      <div className="p-4 border-t border-border/60 space-y-3">
        {onOpenConnectRepo && (
          <button
            onClick={onOpenConnectRepo}
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-border/80 bg-secondary/30 hover:bg-secondary text-xs font-mono text-muted-foreground hover:text-foreground transition-all"
          >
            <div className="flex items-center gap-2">
              <FolderGit2 className="h-3.5 w-3.5 text-purple-400" />
              <span>researchforge-ai</span>
            </div>
            <span className="text-[10px] text-emerald-400">Synced</span>
          </button>
        )}

        <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground px-1">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-emerald-400" />
            <span>TrueForge Engine</span>
          </span>
          <span className="text-purple-400">v4.2 PRO</span>
        </div>
      </div>
    </aside>
  );
}
