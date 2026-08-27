"use client";

import React, { useState } from "react";
import { Mail, ArrowLeft, KeyRound, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ForgotPasswordFormProps {
  onBackToSignIn: () => void;
}

export function ForgotPasswordForm({ onBackToSignIn }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    toast.success("Password reset instructions dispatched to your email");
  };

  return (
    <div className="space-y-4 w-full">
      {submitted ? (
        <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-3">
          <div className="mx-auto h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-foreground font-sans">Check Your Inbox</h4>
            <p className="text-xs text-muted-foreground font-mono">
              Reset token sent to <span className="text-emerald-400">{email}</span>.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={onBackToSignIn} className="text-xs font-mono">
            Return to Sign In
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground font-sans">Registered Email</label>
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

          <Button
            type="submit"
            disabled={!email}
            variant="glow"
            className="w-full h-11 rounded-xl font-bold flex items-center justify-center gap-2 text-xs font-mono"
          >
            <KeyRound className="h-3.5 w-3.5" />
            <span>Send Recovery Key</span>
          </Button>

          <button
            type="button"
            onClick={onBackToSignIn}
            className="w-full text-center text-xs font-mono text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 pt-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Sign In</span>
          </button>
        </form>
      )}
    </div>
  );
}
