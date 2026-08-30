"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { UserProfile, AuthSession } from "@/types/auth";
import { toast } from "sonner";

export function useAuth() {
  const { data: session, status } = useSession();
  
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  // Map NextAuth user to our application's UserProfile
  const user: UserProfile | null = session?.user ? {
    id: (session.user as { id?: string }).id || "unknown",
    firstName: session.user.name?.split(" ")[0] || "Researcher",
    lastName: session.user.name?.split(" ").slice(1).join(" ") || "",
    email: session.user.email || "",
    role: ((session.user as { role?: string }).role as UserProfile["role"]) || "enterprise_analyst",
    provider: "google",
    createdAt: new Date().toISOString(),
  } : null;

  const authSession: AuthSession = {
    user,
    isAuthenticated,
  };

  const loginWithOAuth = async (provider: "google" | "github") => {
    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch {
      toast.error(`Failed to sign in with ${provider}`);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loginWithEmail = async (_email: string) => {
    toast.info("Email login is disabled. Please use Google OAuth.");
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const signup = async (_firstName: string, _lastName: string, _email: string) => {
    toast.info("Signups are restricted to Google OAuth currently.");
  };

  const logout = async () => {
    await signOut({ callbackUrl: "/" });
    toast.info("Signed out of research desk");
  };

  return {
    session: authSession,
    user,
    isAuthenticated,
    isLoading,
    loginWithOAuth,
    loginWithEmail,
    signup,
    logout,
  };
}
