import { NextResponse } from "next/server";

export async function GET() {
  const agents = [
    {
      id: "web-search-mcp",
      name: "Web Ingestion MCP Agent",
      stage: 1,
      status: "online",
      capabilities: ["arXiv search", "Crossref DOI", "Semantic ranking"],
    },
    {
      id: "company-agent",
      name: "Company Architecture Agent",
      stage: 2,
      status: "online",
      capabilities: ["Patent claims parser", "SEC 10-K extractor", "Yield mapping"],
    },
    {
      id: "competitor-agent",
      name: "Competitor Benchmark Agent",
      stage: 3,
      status: "online",
      capabilities: ["Adversarial triangulation", "Benchmarking", "Contradiction matrix"],
    },
    {
      id: "market-agent",
      name: "Market Dynamics Agent",
      stage: 4,
      status: "online",
      capabilities: ["TAM curve projector", "Capex modeling", "Supply chain audit"],
    },
    {
      id: "sandbox-agent",
      name: "Sandbox Execution Agent",
      stage: 5,
      status: "online",
      capabilities: ["Python 3.12 WASM container", "Monte Carlo engine", "AST linter"],
    },
    {
      id: "human-approval-gate",
      name: "Human Consensus Sentinel",
      stage: 6,
      status: "online",
      capabilities: ["Signoff gatekeeper", "Fact integrity audit", "DOI verification"],
    },
  ];

  return NextResponse.json({
    success: true,
    data: agents,
    timestamp: new Date().toISOString(),
  });
}
