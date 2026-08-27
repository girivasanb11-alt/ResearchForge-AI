export type ResearchDepth = "rapid" | "standard" | "exhaustive";

export type ResearchScope = "academic" | "patents" | "market" | "technical" | "codebases";

export interface CitationSource {
  id: string;
  title: string;
  url: string;
  domain: string;
  authors?: string[];
  publishedDate?: string;
  relevanceScore: number;
  snippet: string;
  type: "academic" | "patent" | "industry-report" | "whitepaper" | "sec-filing";
  verified: boolean;
  doi?: string;
}

export interface KeyFinding {
  id: string;
  title: string;
  description: string;
  impactLevel: "critical" | "high" | "moderate";
  category: string;
  citations: string[];
  confidenceScore: number;
}

export interface ReportSection {
  id: string;
  slug: string;
  title: string;
  content: string;
  category?: "executive" | "market" | "competitor" | "insights" | "recommendations";
  callout?: {
    type: "insight" | "warning" | "success" | "neutral";
    title: string;
    text: string;
  };
}

export interface ResearchReport {
  id: string;
  sessionId: string;
  query: string;
  title: string;
  subtitle: string;
  executiveSummary: string;
  marketAnalysis: string;
  competitorAnalysis: string;
  keyInsights: string[];
  recommendations: string[];
  sections: ReportSection[];
  sources: CitationSource[];
  confidenceScore: number;
  createdAt: string;
  readTimeMinutes: number;
  depth: ResearchDepth;
  scope: ResearchScope[];
  stats: {
    sourcesScanned: number;
    sourcesCited: number;
    factsCrossChecked: number;
    contradictionsIdentified: number;
    executionTimeSeconds: number;
  };
}

export interface ResearchSession {
  id: string;
  topic: string;
  status: "idle" | "running" | "waiting_approval" | "completed" | "failed";
  createdAt: string;
  updatedAt: string;
  currentStageIndex: number;
  depth?: ResearchDepth;
  scope?: ResearchScope[];
  reportId?: string;
  report?: ResearchReport;
}
