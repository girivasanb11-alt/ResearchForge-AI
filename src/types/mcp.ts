export interface McpToolCall {
  id: string;
  serverName: string;
  toolName: string;
  endpoint: string;
  parameters: Record<string, unknown>;
  responseStatus: number;
  durationMs: number;
  timestamp: string;
}

export interface McpServerDescriptor {
  name: string;
  uri: string;
  status: "connected" | "disconnected" | "error";
  description: string;
  toolsExposed: string[];
}
