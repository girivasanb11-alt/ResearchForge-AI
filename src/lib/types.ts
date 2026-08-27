export * from "@/types";

// Backward compatibility types
export interface ResearchJob {
  id: string;
  query: string;
  objective?: string;
  depth: import("@/types").ResearchDepth;
  scope: import("@/types").ResearchScope[];
  createdAt: string;
  status: "idle" | "running" | "waiting_approval" | "completed" | "failed";
  currentStepIndex: number;
  steps: {
    id: string;
    agentName: string;
    title: string;
    description: string;
    status: "pending" | "running" | "waiting_approval" | "completed" | "failed";
    timestamp: string;
    progressPercent: number;
    findingsCount: number;
    sourcesDiscovered: number;
    logs: string[];
  }[];
  discoveredSources: import("@/types").CitationSource[];
  hypotheses: {
    id: string;
    statement: string;
    status: "investigating" | "validated" | "refuted" | "inconclusive";
    confidence: number;
  }[];
  reportId?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  sources?: string[];
}
