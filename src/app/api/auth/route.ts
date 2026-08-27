import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, action, firstName, lastName, provider } = body;

    // OAuth Simulation Handler
    if (provider) {
      return NextResponse.json({
        success: true,
        user: {
          id: "usr-" + Date.now(),
          name: provider === "github" ? "GitHub Developer" : "Google Researcher",
          email: `${provider.toLowerCase()}@researchforge.ai`,
          provider,
        },
        token: `jwt_${provider}_${Date.now()}`,
      });
    }

    if (action === "signup") {
      return NextResponse.json({
        success: true,
        user: {
          id: "usr-" + Date.now(),
          name: `${firstName || "Researcher"} ${lastName || ""}`.trim(),
          email,
          createdAt: new Date().toISOString(),
        },
        token: `jwt_session_${Date.now()}`,
      });
    }

    // Default Signin
    return NextResponse.json({
      success: true,
      user: {
        id: "usr-default",
        name: "Girivasan B",
        email: email || "girivasan@email.com",
      },
      token: `jwt_session_${Date.now()}`,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid authentication request payload" },
      { status: 400 }
    );
  }
}
