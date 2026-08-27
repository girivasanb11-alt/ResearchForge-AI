"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Settings, Globe, Cpu, CheckCircle2, Save } from "lucide-react";
import { CONNECTED_MCP_SERVERS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DashboardSettingsPage() {
  const [apiKey, setApiKey] = useState("tf_live_99482948204810");
  const [sandboxMemory, setSandboxMemory] = useState("512MB");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings and MCP configurations updated");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="pb-4 border-b border-border/80">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold uppercase tracking-wider mb-1">
            <Settings className="h-3.5 w-3.5" />
            <span>Desk Configuration</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
            Workspace & MCP Tool Settings
          </h1>
          <p className="text-xs text-muted-foreground font-sans mt-0.5">
            Manage Model Context Protocol connections, sandbox compute limits, and repository sync.
          </p>
        </div>

        {/* Form Settings */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: TrueForge Engine API */}
          <div className="p-6 rounded-3xl border border-border/80 bg-card/60 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-foreground font-sans">TrueForge Engine Key</h3>
                <p className="text-xs text-muted-foreground font-sans">Master key for multi-agent swarm dispatch.</p>
              </div>
              <Badge variant="success" className="text-[10px] font-mono">
                Active Key
              </Badge>
            </div>

            <div className="relative">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full h-10 rounded-xl border border-border/80 bg-secondary/30 px-3.5 text-xs text-foreground font-mono"
              />
            </div>
          </div>

          {/* Section 2: Connected MCP Endpoints */}
          <div className="p-6 rounded-3xl border border-border/80 bg-card/60 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-foreground font-sans">Model Context Protocol Servers</h3>
                <p className="text-xs text-muted-foreground font-sans">Active tool calling endpoints exposed to Stage 1–5 agents.</p>
              </div>
              <Badge variant="cyan" className="text-[10px] font-mono">
                {CONNECTED_MCP_SERVERS.length} Connected
              </Badge>
            </div>

            <div className="space-y-3">
              {CONNECTED_MCP_SERVERS.map((server) => (
                <div
                  key={server.name}
                  className="p-3.5 rounded-2xl border border-border/70 bg-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Globe className="h-3.5 w-3.5 text-purple-400" />
                      <span className="text-xs font-mono font-bold text-foreground">{server.name}</span>
                      <span className="text-[10px] font-mono text-muted-foreground">{server.uri}</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-sans">{server.description}</p>
                  </div>

                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Connected</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Sandbox Memory Limits */}
          <div className="p-6 rounded-3xl border border-border/80 bg-card/60 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-foreground font-sans">Python 3.12 Sandbox Limit</h3>
                <p className="text-xs text-muted-foreground font-sans">RAM allocation per isolated simulation run.</p>
              </div>
              <Cpu className="h-4 w-4 text-purple-400" />
            </div>

            <div className="flex items-center gap-2">
              {["256MB", "512MB", "1024MB", "2048MB"].map((mem) => (
                <button
                  key={mem}
                  type="button"
                  onClick={() => setSandboxMemory(mem)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                    sandboxMemory === mem
                      ? "bg-purple-600 text-white font-bold border-purple-500"
                      : "bg-secondary/40 text-muted-foreground border-border/60 hover:text-foreground"
                  }`}
                >
                  {mem}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            variant="glow"
            className="h-10 px-6 rounded-xl font-mono text-xs font-bold flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Preferences</span>
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}
