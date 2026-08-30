"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  PlusCircle,
  FolderLock,
  Bot,
  FileText,
  Terminal,
  Settings,
  Shield,
  Bell,
  Sun,
  Search,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Clock,
  FileSpreadsheet,
  Cpu,
  Layers,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { IsometricCube } from "@/components/canvas/IsometricCube";
import { useResearch } from "@/lib/store";
import { useRouter } from "next/navigation";

export function RightDashboard() {
  const router = useRouter();
  const { startResearch } = useResearch();
  const [topicInput, setTopicInput] = useState("");

  const handleStartResearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicInput.trim()) return;
    startResearch(topicInput.trim());
    router.push("/dashboard/research");
  };

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, active: true, href: "/dashboard" },
    { label: "New Research", icon: PlusCircle, href: "/dashboard/research" },
    { label: "My Research", icon: FolderLock, href: "/dashboard/sessions" },
    { label: "Agents", icon: Bot, href: "/dashboard/agents" },
    { label: "Reports", icon: FileText, href: "/dashboard/reports" },
    { label: "Sandbox", icon: Terminal, href: "/dashboard/sandbox" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  const recentResearchList = [
    {
      title: "AI In Healthcare Industry Analysis",
      time: "Completed • 2 hours ago",
      status: "Completed",
      statusVariant: "completed",
      icon: Search,
    },
    {
      title: "Tesla Q1 2025 Market Research",
      time: "Completed • 1 day ago",
      status: "Completed",
      statusVariant: "completed",
      icon: FileSpreadsheet,
    },
    {
      title: "Renewable Energy Trends 2025",
      time: "Completed • 2 days ago",
      status: "Completed",
      statusVariant: "completed",
      icon: Layers,
    },
    {
      title: "NVIDIA Business Strategy Deep Dive",
      time: "In Progress • 30%",
      status: "In Progress",
      statusVariant: "in-progress",
      icon: Cpu,
    },
    {
      title: "Global Semiconductor Market Outlook",
      time: "Pending Approval",
      status: "Pending",
      statusVariant: "pending",
      icon: FileText,
    },
  ];

  const activeAgentsList = [
    {
      name: "Web Search Agent",
      statusText: "Searching...",
      statusColor: "text-emerald-400",
      dotColor: "bg-emerald-400",
      icon: Search,
      iconBg: "bg-cyan-500/20 text-cyan-400",
      arcColor: "text-cyan-400",
    },
    {
      name: "Company Research Agent",
      statusText: "Analyzing...",
      statusColor: "text-purple-400",
      dotColor: "bg-purple-400",
      icon: Bot,
      iconBg: "bg-purple-500/20 text-purple-400",
      arcColor: "text-purple-400",
    },
    {
      name: "Competitor Analysis Agent",
      statusText: "Gathering data...",
      statusColor: "text-blue-400",
      dotColor: "bg-blue-400",
      icon: Settings,
      iconBg: "bg-blue-500/20 text-blue-400",
      arcColor: "text-blue-400",
    },
    {
      name: "Market Research Agent",
      statusText: "Processing...",
      statusColor: "text-amber-400",
      dotColor: "bg-amber-400",
      icon: TrendingUp,
      iconBg: "bg-amber-500/20 text-amber-400",
      arcColor: "text-amber-400",
    },
  ];

  return (
    <div className="rounded-3xl border border-[#1e293b] bg-[#070b14]/95 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row text-foreground min-h-[780px]">
      {/* 1. Nested Sidebar */}
      <aside className="w-full md:w-[280px] border-r border-[#1e293b]/80 bg-[#050811]/90 p-6 flex flex-col justify-between shrink-0 space-y-8">
        {/* Brand Header */}
        <div className="space-y-8">
          <div className="pt-2">
            <div className="flex items-center gap-3">
              {/* Premium Logo Icon */}
              <div className="relative flex items-center justify-center h-8 w-8 shrink-0">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                  <circle cx="10" cy="11" r="6" fill="#38BDF8" />
                  <circle cx="22" cy="11" r="6" fill="#6366F1" fillOpacity="0.9" />
                  <circle cx="16" cy="21" r="6" fill="#A855F7" />
                </svg>
              </div>
              {/* Brand Name */}
              <span className="text-[26px] font-[800] text-white tracking-[-0.02em] leading-none font-sans">
                ResearchForge<span className="font-[700]">AI</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    item.active
                      ? "bg-[#6366f1] text-white font-semibold shadow-md shadow-indigo-600/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Area: Upgrade Card & Profile Pill */}
        <div className="space-y-6 pt-6 border-t border-[#1e293b]/60">
          {/* Upgrade Plan Card */}
          <div className="rounded-2xl border border-[#1e293b] bg-[#0c1222]/80 p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white font-sans">
              <Shield className="h-4 w-4 text-purple-400" />
              <span>Upgrade Plan</span>
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Unlock advanced features and higher limits.
            </p>
            <button className="w-full py-2.5 rounded-xl text-sm font-bold font-sans bg-[#6366f1] hover:bg-[#4f46e5] text-white transition-all shadow-sm mt-1">
              Upgrade Now
            </button>
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-800/40 transition-all cursor-pointer">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#A855F7] to-[#6366F1] text-white font-bold text-lg flex items-center justify-center shrink-0">
                G
              </div>
              <div className="min-w-0 flex flex-col justify-center gap-[8px]">
                <p className="text-[16px] font-[700] text-white truncate leading-none tracking-tight">GIRIVASAN B</p>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-500 shrink-0 ml-2" />
          </div>
        </div>
      </aside>

      {/* 2. Main Dashboard Content Area */}
      <main className="flex-1 p-5 sm:p-6 lg:p-7 space-y-6 overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold tracking-tight text-white font-sans">Dashboard</h2>
            <p className="text-xs text-slate-300 font-sans">
              Welcome back, Girivasan! 👋
            </p>
            <p className="text-[11px] text-slate-500 font-sans">
              Here&apos;s what&apos;s happening with your research.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500" />
            </button>
            <button className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors">
              <Sun className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 4 Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Card 1: Total Research */}
          <div className="rounded-2xl border border-[#1e293b]/90 bg-[#090e1a]/80 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-7 w-7 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <Search className="h-3.5 w-3.5" />
              </div>
              <span className="text-[10px] text-slate-500">+</span>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-sans">Total Research</p>
              <h3 className="text-xl font-bold text-white font-sans">12</h3>
            </div>
            <p className="text-[10px] text-emerald-400 font-sans">
              ↗ 20% <span className="text-slate-500">from last week</span>
            </p>
          </div>

          {/* Card 2: Reports Generated */}
          <div className="rounded-2xl border border-[#1e293b]/90 bg-[#090e1a]/80 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-7 w-7 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
                <FileText className="h-3.5 w-3.5" />
              </div>
              <span className="text-[10px] text-slate-500">+</span>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-sans">Reports Generated</p>
              <h3 className="text-xl font-bold text-white font-sans">8</h3>
            </div>
            <p className="text-[10px] text-emerald-400 font-sans">
              ↗ 33% <span className="text-slate-500">from last week</span>
            </p>
          </div>

          {/* Card 3: Agents Executed */}
          <div className="rounded-2xl border border-[#1e293b]/90 bg-[#090e1a]/80 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-7 w-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Bot className="h-3.5 w-3.5" />
              </div>
              <span className="text-[10px] text-slate-500">+</span>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-sans">Agents Executed</p>
              <h3 className="text-xl font-bold text-white font-sans">36</h3>
            </div>
            <p className="text-[10px] text-emerald-400 font-sans">
              ↗ 18% <span className="text-slate-500">from last week</span>
            </p>
          </div>

          {/* Card 4: Hours Saved */}
          <div className="rounded-2xl border border-[#1e293b]/90 bg-[#090e1a]/80 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-7 w-7 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <Clock className="h-3.5 w-3.5" />
              </div>
              <span className="text-[10px] text-slate-500">+</span>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-sans">Hours Saved</p>
              <h3 className="text-xl font-bold text-white font-sans">24h</h3>
            </div>
            <p className="text-[10px] text-emerald-400 font-sans">
              ↗ 40% <span className="text-slate-500">from last week</span>
            </p>
          </div>
        </div>

        {/* Middle Two Columns: Recent Research & Active Agents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Recent Research Card */}
          <div className="lg:col-span-7 rounded-2xl border border-[#1e293b]/90 bg-[#090e1a]/80 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white font-sans">Recent Research</h3>
              <Link href="/dashboard/sessions" className="text-[11px] font-sans text-purple-400 hover:underline">
                View all
              </Link>
            </div>

            <div className="space-y-2">
              {recentResearchList.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl border border-[#1e293b]/60 bg-[#060a14]/60 hover:bg-[#0c1322] transition-colors flex items-center justify-between gap-2.5"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="h-7 w-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0 text-left">
                        <h4 className="text-xs font-semibold text-slate-200 truncate font-sans">{item.title}</h4>
                        <p className="text-[10px] text-slate-500 font-sans truncate">{item.time}</p>
                      </div>
                    </div>

                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-md shrink-0 ${
                        item.statusVariant === "completed"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : item.statusVariant === "in-progress"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Agents Card */}
          <div className="lg:col-span-5 rounded-2xl border border-[#1e293b]/90 bg-[#090e1a]/80 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white font-sans">Active Agents</h3>
              <Link href="/dashboard/agents" className="text-[11px] font-sans text-purple-400 hover:underline">
                View all
              </Link>
            </div>

            <div className="space-y-2">
              {activeAgentsList.map((agent, idx) => {
                const Icon = agent.icon;
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl border border-[#1e293b]/60 bg-[#060a14]/60 hover:bg-[#0c1322] transition-colors flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`h-7 w-7 rounded-lg ${agent.iconBg} flex items-center justify-center shrink-0`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0 text-left">
                        <h4 className="text-xs font-semibold text-slate-200 truncate font-sans">{agent.name}</h4>
                        <div className="flex items-center gap-1.5 text-[10px] font-sans">
                          <span className={`h-1.5 w-1.5 rounded-full ${agent.dotColor} animate-pulse`} />
                          <span className={agent.statusColor}>{agent.statusText}</span>
                        </div>
                      </div>
                    </div>

                    {/* Animated Circular Spinner Arc */}
                    <div className="h-4 w-4 rounded-full border-2 border-slate-700 border-t-purple-400 animate-spin shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Start New Research Card with 3D Isometric Cube */}
        <div className="rounded-2xl border border-[#1e293b] bg-gradient-to-r from-[#090f1d] via-[#0d1428] to-[#0a1122] p-5 relative overflow-hidden shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            {/* Left Prompt Area */}
            <div className="space-y-3 w-full lg:max-w-md text-left">
              <div>
                <h3 className="text-sm font-bold text-white font-sans">Start New Research</h3>
                <p className="text-[11px] text-slate-400 font-sans">
                  Enter your research topic and let our AI agents do the work
                </p>
              </div>

              <form onSubmit={handleStartResearch} className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  placeholder="What would you like to research today?"
                  className="flex-1 h-9 rounded-xl border border-[#1e293b] bg-[#070d19] px-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500 font-sans"
                />
                <button
                  type="submit"
                  className="h-9 px-4 rounded-xl text-xs font-bold font-sans bg-[#6366f1] hover:bg-[#4f46e5] text-white flex items-center gap-1.5 shadow-md shadow-indigo-500/20 shrink-0 transition-all"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Start Research</span>
                </button>
              </form>
            </div>

            {/* Right: 3D Holographic Isometric Cube */}
            <div className="shrink-0 flex items-center justify-center -my-3">
              <IsometricCube />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
