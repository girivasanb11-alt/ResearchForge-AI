import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [],
    message: "Research sessions endpoint active.",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topic } = body;

    const newSession = {
      id: "sess-" + Date.now(),
      topic: topic || "Untitled Investigation",
      status: "running",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currentStageIndex: 0,
    };

    return NextResponse.json({
      success: true,
      data: newSession,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create session" },
      { status: 500 }
    );
  }
}
