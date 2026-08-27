export type AgentStageId =
  | "web_search_mcp"
  | "company_agent"
  | "competitor_agent"
  | "market_agent"
  | "sandbox_analysis"
  | "approval_required"
  | "generate_report";

export type AgentStatus = "idle" | "searching" | "analyzing" | "waiting_approval" | "generating_report" | "completed" | "error";

export interface AgentStage {
  id: AgentStageId;
  stageNumber: number;
  name: string;
  shortName: string;
  agentRole: string;
  description: string;
  status: "pending" | "running" | "waiting_approval" | "completed" | "failed";
  progress: number;
  outputSummary?: string;
  logs: string[];
  executionTimeMs?: number;
  mcpCallsCount?: number;
}

export interface ActiveAgent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  currentTask: string;
  cpuUsage: number;
  memoryUsageMb: number;
  tokensProcessed: number;
  lastActive: string;
}
