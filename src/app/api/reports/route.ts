import { NextResponse } from "next/server";
import { synthesizeRealReport } from "@/services/research-engine";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [],
    message: "Report store active.",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topic, depth = "standard", scope = ["academic", "market", "technical"] } = body;

    if (!topic) {
      return NextResponse.json(
        { success: false, error: "Topic is required to generate report" },
        { status: 400 }
      );
    }

    const report = synthesizeRealReport(topic, depth, scope);
    return NextResponse.json({
      success: true,
      data: report,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to generate report" },
      { status: 500 }
    );
  }
}
