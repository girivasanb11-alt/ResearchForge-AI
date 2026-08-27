import { NextResponse } from "next/server";
import { synthesizeRealReport } from "@/services/research-engine";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Fallback synthesized report for deep link validation
  const report = synthesizeRealReport("Enterprise Strategic Intelligence Dossier");
  report.id = id;

  return NextResponse.json({
    success: true,
    data: report,
  });
}
