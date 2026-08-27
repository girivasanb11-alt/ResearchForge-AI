"use client";

import React, { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { Dialog, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { OAuthButtons } from "./OAuthButtons";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { useAuth } from "@/hooks/use-auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "signin" | "signup";
}

export function AuthModal({ isOpen, onClose, defaultMode = "signin" }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">(defaultMode);
  const { loginWithOAuth, loginWithEmail, signup, isLoading } = useAuth();

  const handleOAuth = async (provider: "google" | "github") => {
    await loginWithOAuth(provider);
    onClose();
  };

  const handleSignIn = async (email: string) => {
    await loginWithEmail(email);
    onClose();
  };

  const handleSignUp = async (first: string, last: string, email: string) => {
    await signup(first, last, email);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <DialogHeader>
          <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-purple-400">
              Enterprise Access Gate
            </span>
          </div>

          <DialogTitle className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-sans">
            {mode === "signin" && "Welcome to ResearchForge AI"}
            {mode === "signup" && "Create Research Desk Account"}
            {mode === "forgot" && "Recover Account Access"}
          </DialogTitle>

          <DialogDescription className="text-xs text-muted-foreground font-sans">
            {mode === "signin" && "Sign in with your enterprise credentials or single sign-on."}
            {mode === "signup" && "Join leading quantitative and scientific research labs."}
            {mode === "forgot" && "Enter your registered email to reset your master credentials."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {mode !== "forgot" && (
            <>
              {/* OAuth Providers */}
              <OAuthButtons onSelectProvider={handleOAuth} isLoading={isLoading} />

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/80" />
                </div>
                <span className="relative bg-card px-3 text-[10px] uppercase font-mono text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </>
          )}

          {/* Forms */}
          {mode === "signin" && (
            <SignInForm
              onSubmit={handleSignIn}
              onForgotPassword={() => setMode("forgot")}
              isLoading={isLoading}
            />
          )}

          {mode === "signup" && (
            <SignUpForm onSubmit={handleSignUp} isLoading={isLoading} />
          )}

          {mode === "forgot" && (
            <ForgotPasswordForm onBackToSignIn={() => setMode("signin")} />
          )}

          {/* Switcher Footer */}
          {mode !== "forgot" && (
            <div className="pt-2 text-center text-xs font-mono text-muted-foreground">
              {mode === "signin" ? (
                <>
                  Don't have an enterprise account?{" "}
                  <button
                    onClick={() => setMode("signup")}
                    className="text-purple-400 hover:text-purple-300 font-bold underline-offset-2 hover:underline ml-1"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already registered?{" "}
                  <button
                    onClick={() => setMode("signin")}
                    className="text-purple-400 hover:text-purple-300 font-bold underline-offset-2 hover:underline ml-1"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}
