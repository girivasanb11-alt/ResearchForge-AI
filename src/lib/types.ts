export type ResearchScope = "academic" | "web" | "patents" | "market" | "technical" | "codebases";

export type ResearchDepth = "rapid" | "standard" | "exhaustive";

export type AgentStepStatus = "pending" | "running" | "completed" | "failed";

export interface AgentStep {
  id: string;
  agentName: string;
  title: string;
  description: string;
  status: AgentStepStatus;
  timestamp: string;
  logs: string[];
  findingsCount?: number;
  sourcesDiscovered?: number;
  progressPercent: number;
}

export interface CitationSource {
  id: string;
  title: string;
  url: string;
  domain: string;
  authors?: string[];
  publishedDate?: string;
  relevanceScore: number; // 0 to 100
  domainAuthority?: number; // 0 to 100
  citationCount?: number;
  snippet: string;
  type: "academic" | "web" | "patent" | "industry-report" | "whitepaper";
  verified: boolean;
}

export interface KeyFinding {
  id: string;
  title: string;
  description: string;
  impactLevel: "critical" | "high" | "moderate";
  category: string;
  citations: string[]; // Source IDs
  confidenceScore: number; // e.g. 98%
}

export interface ContradictionPoint {
  topic: string;
  consensusScore: number; // e.g. 65% consensus
  viewA: {
    claim: string;
    advocates: string[];
    sources: string[];
    evidenceWeight: "Strong" | "Moderate" | "Theoretical";
  };
  viewB: {
    claim: string;
    advocates: string[];
    sources: string[];
    evidenceWeight: "Strong" | "Moderate" | "Theoretical";
  };
  synthesis: string;
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: "core_concept" | "entity" | "methodology" | "metric" | "institution";
  size: number;
  connections: string[]; // Node IDs
}

export interface ReportSection {
  id: string;
  slug: string;
  title: string;
  icon?: string;
  content: string; // Markdown / rich text
  subsections?: {
    id: string;
    title: string;
    content: string;
  }[];
  chartData?: {
    title: string;
    type: "bar" | "line" | "radar" | "pie";
    data: Array<Record<string, string | number>>;
    dataKeys: string[];
    xAxisKey?: string;
  };
  callout?: {
    type: "info" | "warning" | "success" | "insight";
    title: string;
    text: string;
  };
}

export interface ResearchReport {
  id: string;
  query: string;
  title: string;
  subtitle: string;
  summary: string;
  createdAt: string;
  readTimeMinutes: number;
  confidenceScore: number; // e.g. 98.4
  scope: ResearchScope[];
  depth: ResearchDepth;
  status: "draft" | "completed";
  stats: {
    sourcesScanned: number;
    sourcesCited: number;
    factsCrossChecked: number;
    contradictionsIdentified: number;
    synthesisTokens: number;
    executionTimeSeconds: number;
  };
  keyFindings: KeyFinding[];
  sections: ReportSection[];
  sources: CitationSource[];
  contradictions: ContradictionPoint[];
  graphNodes: KnowledgeGraphNode[];
  audioBriefing?: {
    duration: string;
    title: string;
    audioUrl?: string;
    transcript: { timestamp: string; speaker: string; text: string }[];
  };
}

export interface ResearchJob {
  id: string;
  query: string;
  objective?: string;
  depth: ResearchDepth;
  scope: ResearchScope[];
  createdAt: string;
  status: "idle" | "running" | "completed" | "error";
  currentStepIndex: number;
  steps: AgentStep[];
  discoveredSources: CitationSource[];
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
