"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowLeft } from "lucide-react";
import { OAuthButtons } from "@/features/auth/OAuthButtons";
import { SignUpForm } from "@/features/auth/SignUpForm";
import { useAuth } from "@/hooks/use-auth";
import { StarField } from "@/components/canvas/StarField";

export default function SignUpPage() {
  const router = useRouter();
  const { loginWithOAuth, signup, isLoading } = useAuth();

  const handleOAuth = async (provider: "google" | "github") => {
    await loginWithOAuth(provider);
    router.push("/dashboard");
  };

  const handleSignUp = async (first: string, last: string, email: string) => {
    await signup(first, last, email);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col justify-between relative overflow-hidden px-4 py-8">
      <StarField />

      {/* Top Header */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600 text-white font-bold">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold text-white font-sans">ResearchForge AI</span>
        </Link>

        <Link
          href="/"
          className="text-xs font-mono text-muted-foreground hover:text-white flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Home</span>
        </Link>
      </div>

      {/* Main Glassmorphic Card */}
      <div className="max-w-md w-full mx-auto my-auto rounded-3xl border border-border/80 bg-card/60 p-8 backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <h1 className="text-2xl font-extrabold tracking-tight text-white font-sans">
            Create Research Desk Account
          </h1>
          <p className="text-xs text-muted-foreground font-sans">
            Join quantitative analysts and scientific research teams using TrueForge.
          </p>
        </div>

        <div className="space-y-4">
          <OAuthButtons onSelectProvider={handleOAuth} isLoading={isLoading} />

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/80" />
            </div>
            <span className="relative bg-card px-3 text-[10px] uppercase font-mono text-muted-foreground">
              Or register with email
            </span>
          </div>

          <SignUpForm onSubmit={handleSignUp} isLoading={isLoading} />

          <div className="text-center text-xs font-mono text-muted-foreground pt-2">
            Already have an enterprise desk?{" "}
            <Link href="/auth/signin" className="text-purple-400 font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[11px] font-mono text-muted-foreground">
        © {new Date().getFullYear()} ResearchForge AI • TrueForge Enterprise Engine
      </div>
    </div>
  );
}
