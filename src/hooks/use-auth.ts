"use client";

import { useState, useEffect } from "react";
import { UserProfile, AuthSession } from "@/types/auth";
import { toast } from "sonner";

const DEFAULT_USER: UserProfile = {
  id: "user-default-1",
  firstName: "Senior",
  lastName: "Researcher",
  email: "researcher@trueforge.ai",
  role: "enterprise_analyst",
  provider: "github",
  createdAt: new Date().toISOString(),
};

export function useAuth() {
  const [session, setSession] = useState<AuthSession>({
    user: DEFAULT_USER,
    isAuthenticated: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("researchforge_auth_session");
      if (stored) {
        setSession(JSON.parse(stored));
      }
    } catch {
      // Fallback
    }
  }, []);

  const loginWithOAuth = async (provider: "google" | "github") => {
    setIsLoading(true);
    setTimeout(() => {
      const user: UserProfile = {
        id: `user-${provider}-${Date.now()}`,
        firstName: provider === "github" ? "GitHub" : "Google",
        lastName: "Scientist",
        email: `analyst@${provider}.auth`,
        role: "enterprise_analyst",
        provider,
        createdAt: new Date().toISOString(),
      };
      const newSession = { user, isAuthenticated: true };
      setSession(newSession);
      localStorage.setItem("researchforge_auth_session", JSON.stringify(newSession));
      setIsLoading(false);
      toast.success(`Signed in successfully with ${provider.toUpperCase()}`);
    }, 800);
  };

  const loginWithEmail = async (email: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const user: UserProfile = {
        id: `user-email-${Date.now()}`,
        firstName: email.split("@")[0],
        lastName: "Researcher",
        email,
        role: "enterprise_analyst",
        provider: "email",
        createdAt: new Date().toISOString(),
      };
      const newSession = { user, isAuthenticated: true };
      setSession(newSession);
      localStorage.setItem("researchforge_auth_session", JSON.stringify(newSession));
      setIsLoading(false);
      toast.success("Welcome back to ResearchForge AI");
    }, 800);
  };

  const signup = async (firstName: string, lastName: string, email: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const user: UserProfile = {
        id: `user-${Date.now()}`,
        firstName,
        lastName,
        email,
        role: "enterprise_analyst",
        provider: "email",
        createdAt: new Date().toISOString(),
      };
      const newSession = { user, isAuthenticated: true };
      setSession(newSession);
      localStorage.setItem("researchforge_auth_session", JSON.stringify(newSession));
      setIsLoading(false);
      toast.success("Enterprise research account created!");
    }, 800);
  };

  const logout = () => {
    const emptySession = { user: null, isAuthenticated: false };
    setSession(emptySession);
    localStorage.removeItem("researchforge_auth_session");
    toast.info("Signed out of research desk");
  };

  return {
    session,
    user: session.user,
    isAuthenticated: session.isAuthenticated,
    isLoading,
    loginWithOAuth,
    loginWithEmail,
    signup,
    logout,
  };
}
