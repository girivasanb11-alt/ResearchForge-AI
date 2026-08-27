import { NextResponse } from "next/server";
import { CONNECTED_MCP_SERVERS } from "@/lib/constants";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      apiKey: "tf_live_99482948204810",
      connectedMcpServers: CONNECTED_MCP_SERVERS,
      sandboxMemoryLimit: "512MB",
      engineVersion: "TrueForge v4.2 PRO",
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: "Workspace and MCP tool settings updated.",
      data: body,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update settings" },
      { status: 400 }
    );
  }
}
