"use client";

import React, { useState } from "react";
import { Share2, Sparkles } from "lucide-react";
import { KnowledgeGraphNode } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface KnowledgeGraphProps {
  nodes: KnowledgeGraphNode[];
}

export function KnowledgeGraph({ nodes }: KnowledgeGraphProps) {
  const [selectedNode, setSelectedNode] = useState<KnowledgeGraphNode | null>(nodes[0] || null);
  const [filterType, setFilterType] = useState<string>("all");

  const getNodeColor = (type: KnowledgeGraphNode["type"]) => {
    switch (type) {
      case "core_concept":
        return "bg-indigo-500/20 text-indigo-300 border-indigo-500/60 shadow-indigo-500/30";
      case "methodology":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-cyan-500/30";
      case "metric":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-emerald-500/30";
      case "institution":
        return "bg-purple-500/20 text-purple-300 border-purple-500/60 shadow-purple-500/30";
      default:
        return "bg-zinc-800 text-zinc-300 border-zinc-700";
    }
  };

  const filteredNodes = nodes.filter(
    (n) => filterType === "all" || n.type === filterType
  );

  return (
    <div className="rounded-3xl border border-border bg-card/90 shadow-2xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div>
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Share2 className="h-5 w-5 text-indigo-400" />
            <span>Interactive Ontology & Knowledge Graph</span>
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Interconnected concepts, methodologies, metrics, and institutional entities.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-1.5 bg-secondary/50 p-1 rounded-xl border border-border/60">
          {["all", "core_concept", "methodology", "metric", "institution"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[10px] font-mono capitalize transition-all",
                filterType === type
                  ? "bg-card text-foreground font-bold shadow-xs border border-border/80"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {type.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Graph Visual Canvas / Nodes Cluster */}
      <div className="relative min-h-[360px] rounded-2xl border border-border/80 bg-zinc-950/70 p-6 flex flex-wrap items-center justify-center gap-4 overflow-hidden bg-dot-grid">
        <div className="absolute top-3 left-3 text-[10px] font-mono text-zinc-500">
          Interactive Node Network (Click node to inspect dependencies)
        </div>

        {filteredNodes.map((node) => {
          const isSelected = selectedNode?.id === node.id;
          const isConnected = selectedNode?.connections.includes(node.id);

          return (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={cn(
                "relative rounded-2xl border px-4 py-2.5 text-xs font-semibold font-mono transition-all duration-200 shadow-md",
                getNodeColor(node.type),
                isSelected
                  ? "scale-110 ring-2 ring-indigo-400 z-20 shadow-lg"
                  : isConnected
                  ? "ring-1 ring-cyan-400/80 opacity-100 z-10"
                  : "opacity-80 hover:opacity-100 hover:scale-105"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
                <span>{node.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="cyan" className="text-[10px] font-mono capitalize">
                {selectedNode.type.replace("_", " ")}
              </Badge>
              <span className="text-xs font-bold text-foreground">{selectedNode.label}</span>
            </div>
            <p className="text-[11px] text-muted-foreground font-mono">
              Connected to {selectedNode.connections.length} relational entities ({selectedNode.connections.join(", ")})
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
            <Sparkles className="h-4 w-4" />
            <span>Cross-referenced in 48 citations</span>
          </div>
        </div>
      )}
    </div>
  );
}
