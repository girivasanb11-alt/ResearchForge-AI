"use client";

import React, { useState } from "react";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SignInFormProps {
  onSubmit: (email: string, pass: string) => void;
  onForgotPassword: () => void;
  isLoading?: boolean;
}

export function SignInForm({ onSubmit, onForgotPassword, isLoading }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className="space-y-1.5 text-left">
        <label className="text-xs font-semibold text-foreground font-sans">Enterprise Email</label>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="analyst@enterprise.com"
            required
            className="w-full h-10 rounded-xl border border-border/80 bg-secondary/30 px-3.5 pl-9 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono transition-all"
          />
          <Mail className="h-4 w-4 text-muted-foreground absolute left-3 top-3" />
        </div>
      </div>

      <div className="space-y-1.5 text-left">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-foreground font-sans">Password</label>
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-[11px] font-mono text-purple-400 hover:text-purple-300 transition-colors"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
            className="w-full h-10 rounded-xl border border-border/80 bg-secondary/30 px-3.5 pl-9 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono transition-all"
          />
          <Lock className="h-4 w-4 text-muted-foreground absolute left-3 top-3" />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading || !email}
        variant="glow"
        className="w-full h-11 rounded-xl font-bold flex items-center justify-center gap-2 mt-2 text-xs font-mono"
      >
        {isLoading ? (
          <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
        ) : (
          <>
            <span>Authenticate Research Desk</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </>
        )}
      </Button>

      <div className="flex items-center justify-center gap-1.5 pt-2 text-[11px] font-mono text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
        <span>Air-gapped confidential token storage</span>
      </div>
    </form>
  );
}
