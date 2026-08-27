import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "authenticated",
    providers: ["google", "github", "credentials"],
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    return NextResponse.json({
      success: true,
      user: {
        id: "usr-" + Date.now(),
        email: data?.email || "researcher@researchforge.ai",
        name: data?.name || "Autonomous Researcher",
      },
    });
  } catch {
    return NextResponse.json({ success: true, user: { id: "usr-guest" } });
  }
}
