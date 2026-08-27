"use client";

import React, { useState } from "react";
import { User, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SignUpFormProps {
  onSubmit: (firstName: string, lastName: string, email: string, pass: string) => void;
  isLoading?: boolean;
}

export function SignUpForm({ onSubmit, isLoading }: SignUpFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    onSubmit(firstName, lastName, email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5 w-full">
      {/* First Name & Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-semibold text-foreground font-sans">First Name</label>
          <div className="relative">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Alicia"
              required
              className="w-full h-10 rounded-xl border border-border/80 bg-secondary/30 px-3.5 pl-9 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-purple-500 font-sans"
            />
            <User className="h-4 w-4 text-muted-foreground absolute left-3 top-3" />
          </div>
        </div>

        <div className="space-y-1.5 text-left">
          <label className="text-xs font-semibold text-foreground font-sans">Last Name</label>
          <div className="relative">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Vance"
              required
              className="w-full h-10 rounded-xl border border-border/80 bg-secondary/30 px-3.5 pl-9 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-purple-500 font-sans"
            />
            <User className="h-4 w-4 text-muted-foreground absolute left-3 top-3" />
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1.5 text-left">
        <label className="text-xs font-semibold text-foreground font-sans">Work Email</label>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="scientist@lab.mit.edu"
            required
            className="w-full h-10 rounded-xl border border-border/80 bg-secondary/30 px-3.5 pl-9 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono"
          />
          <Mail className="h-4 w-4 text-muted-foreground absolute left-3 top-3" />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1.5 text-left">
        <label className="text-xs font-semibold text-foreground font-sans">Set Master Password</label>
        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
            className="w-full h-10 rounded-xl border border-border/80 bg-secondary/30 px-3.5 pl-9 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono"
          />
          <Lock className="h-4 w-4 text-muted-foreground absolute left-3 top-3" />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading || !email || !firstName}
        variant="glow"
        className="w-full h-11 rounded-xl font-bold flex items-center justify-center gap-2 mt-2 text-xs font-mono"
      >
        {isLoading ? (
          <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
        ) : (
          <>
            <span>Create Research Desk Account</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </>
        )}
      </Button>

      <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] font-mono text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
        <span>Includes access to TrueForge MCP Swarms</span>
      </div>
    </form>
  );
}
