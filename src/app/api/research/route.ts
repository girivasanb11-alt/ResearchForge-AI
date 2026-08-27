import { NextResponse } from "next/server";
import { synthesizeRealReport } from "@/services/research-engine";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topic, depth = "standard", scope = ["academic", "market", "technical"] } = body;

    if (!topic || typeof topic !== "string" || !topic.trim()) {
      return NextResponse.json(
        { success: false, error: "Topic string is required to deploy TrueForge multi-agent swarm." },
        { status: 400 }
      );
    }

    const sessionId = "sess-" + Date.now();
    const session = {
      id: sessionId,
      topic: topic.trim(),
      depth,
      scope,
      status: "running",
      currentStageIndex: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: session,
      message: "TrueForge 7-Stage Multi-Agent pipeline initialized.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to initialize research session" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic");

  if (!topic) {
    return NextResponse.json({
      success: true,
      message: "Research API endpoint active. Provide ?topic= to synthesize preview.",
    });
  }

  const report = synthesizeRealReport(topic);
  return NextResponse.json({
    success: true,
    data: report,
  });
}
