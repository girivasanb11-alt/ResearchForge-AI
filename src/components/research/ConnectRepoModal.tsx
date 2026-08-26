"use client";

import React, { useState } from "react";
import {
  Github,
  GitBranch,
  Check,
  ShieldCheck,
  FolderGit2,
  Link2,
} from "lucide-react";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ConnectRepoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectRepoModal({ isOpen, onClose }: ConnectRepoModalProps) {
  const [repoUrl, setRepoUrl] = useState("https://github.com/organization/researchforge-ai");
  const [branch, setBranch] = useState("main");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const sampleRepos = [
    { name: "researchforge-ai", owner: "org", stars: "1.2k", language: "TypeScript" },
    { name: "solid-state-battery-models", owner: "lab", stars: "450", language: "Python" },
    { name: "multi-agent-orchestrator", owner: "research", stars: "890", language: "Rust" },
  ];

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      toast.success(`Repository "researchforge-ai" linked successfully!`);
      setTimeout(() => {
        onClose();
      }, 1000);
    }, 1200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <FolderGit2 className="h-5 w-5 text-indigo-400" />
          <span>Connect Code & Knowledge Repository</span>
        </DialogTitle>
        <DialogDescription>
          Link GitHub or GitLab repositories for automated codebase crawling, RFC parsing, and code-grounded deep research.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-2">
        {/* Repo Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-foreground">
            Repository URL / Identifier:
          </label>
          <div className="relative">
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/owner/researchforge-ai"
              className="w-full rounded-xl border border-border bg-secondary/40 px-3.5 pl-9 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
            />
            <Github className="h-4 w-4 text-muted-foreground absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Branch Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-foreground">
            Target Tracking Branch:
          </label>
          <div className="relative">
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="main"
              className="w-full rounded-xl border border-border bg-secondary/40 px-3.5 pl-9 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
            />
            <GitBranch className="h-4 w-4 text-muted-foreground absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Detected Repos Selection */}
        <div className="space-y-2 pt-2 border-t border-border/50">
          <label className="text-[11px] font-mono text-muted-foreground uppercase">
            Quick Link Workspace Repositories:
          </label>
          <div className="space-y-1.5">
            {sampleRepos.map((repo, i) => (
              <button
                key={i}
                onClick={() => setRepoUrl(`https://github.com/${repo.owner}/${repo.name}`)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-border/70 bg-secondary/20 hover:bg-secondary/50 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <Github className="h-3.5 w-3.5 text-indigo-400" />
                  <span className="text-xs font-mono font-bold text-foreground">{repo.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-[10px] font-mono">
                    {repo.language}
                  </Badge>
                  <span className="text-[10px] font-mono text-muted-foreground">★ {repo.stars}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Security guarantee */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>Read-only AST indexing with zero code retention guarantee.</span>
        </div>
      </div>

      <DialogFooter>
        <Button
          variant="glow"
          size="sm"
          onClick={handleConnect}
          disabled={isConnecting || !repoUrl}
          className="w-full sm:w-auto font-semibold flex items-center gap-2"
        >
          {isConnecting ? (
            <>
              <span className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              <span>Indexing AST & Vector Store...</span>
            </>
          ) : isConnected ? (
            <>
              <Check className="h-4 w-4" />
              <span>Connected</span>
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4" />
              <span>Connect & Index Repository</span>
            </>
          )}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
