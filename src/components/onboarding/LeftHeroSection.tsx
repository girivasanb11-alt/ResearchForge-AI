"use client";

import React, { useState } from "react";
import {
  Users2,
  Sparkles,
  Cpu,
  Github,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { IridescentBubble } from "@/components/canvas/IridescentBubble";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export function LeftHeroSection({ onOpenSignIn }: { onOpenSignIn?: () => void }) {
  const { signup, loginWithOAuth, isLoading } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) {
      toast.error("Please fill in your first name and email");
      return;
    }
    signup(firstName, lastName, email);
  };

  return (
    <div className="flex flex-col justify-between space-y-8 relative z-10">
      {/* Top Brand Logo & Floating 3D Bubble */}
      <div className="flex items-start justify-between">
        <Logo textClassName="text-lg font-bold text-white tracking-tight" />
        <div className="-mt-6 -mr-4">
          <IridescentBubble />
        </div>
      </div>

      {/* Main Headline & Subtitle */}
      <div className="space-y-3 -mt-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] font-sans">
          <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
            AI-Powered
          </span>
          <br />
          <span className="text-white">Research Desk</span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed max-w-md">
          Your autonomous research assistant that searches, analyzes, and delivers insights with multi-agent intelligence.
        </p>
      </div>

      {/* 3 Core Value Items */}
      <div className="space-y-4 pt-2">
        {/* Item 1: Multi-Agent Intelligence */}
        <div className="flex items-start gap-3.5 group">
          <div className="h-9 w-9 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0 shadow-md shadow-purple-500/10">
            <Users2 className="h-4 w-4" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-white font-sans">Multi-Agent Intelligence</h4>
            <p className="text-[11px] text-slate-400 font-sans leading-normal">
              Specialized agents work together to cover every angle of your research.
            </p>
          </div>
        </div>

        {/* Item 2: Real-time Web Research */}
        <div className="flex items-start gap-3.5 group">
          <div className="h-9 w-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/10">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-white font-sans">Real-time Web Research</h4>
            <p className="text-[11px] text-slate-400 font-sans leading-normal">
              Access live information from across the web via powerful MCP tools.
            </p>
          </div>
        </div>

        {/* Item 3: Code Execution & Analysis */}
        <div className="flex items-start gap-3.5 group">
          <div className="h-9 w-9 rounded-xl bg-blue-500/15 border border-blue-500/30 text-cyan-400 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/10">
            <Cpu className="h-4 w-4" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-white font-sans">Code Execution & Analysis</h4>
            <p className="text-[11px] text-slate-400 font-sans leading-normal">
              Run code in a secure sandbox to analyze data and generate insights.
            </p>
          </div>
        </div>
      </div>

      {/* "Create Your Account" Glassmorphic Card */}
      <div className="rounded-2xl border border-[#1e293b]/90 bg-[#0b1120]/80 p-5 sm:p-6 backdrop-blur-xl shadow-2xl space-y-4 max-w-md">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-white font-sans">Create Your Account</h3>
          <p className="text-[11px] text-slate-400 font-sans">Start your research journey today</p>
        </div>

        <form onSubmit={handleCreateAccount} className="space-y-3">
          {/* First Name */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-300 font-sans">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              required
              className="w-full h-9 rounded-xl border border-[#1e293b] bg-[#070d19]/90 px-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500 font-sans transition-all"
            />
          </div>

          {/* Last Name */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-300 font-sans">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className="w-full h-9 rounded-xl border border-[#1e293b] bg-[#070d19]/90 px-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500 font-sans transition-all"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-300 font-sans">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full h-9 rounded-xl border border-[#1e293b] bg-[#070d19]/90 px-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500 font-sans transition-all"
            />
          </div>

          {/* Create Account Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-9 rounded-xl font-bold font-sans text-xs bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-600/25 transition-all mt-1"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1e293b]" />
            </div>
            <span className="relative bg-[#0b1120] px-2 text-[10px] text-slate-500 font-sans">
              or continue with
            </span>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-2">
            {/* Google */}
            <button
              type="button"
              onClick={() => loginWithOAuth("google")}
              disabled={isLoading}
              className="w-full h-9 rounded-xl border border-[#1e293b] bg-[#070d19]/80 hover:bg-[#0f172a] hover:border-slate-700 text-xs font-semibold text-slate-300 flex items-center justify-center gap-2 font-sans transition-all"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2c0 2.8.7 5.5 1.9 7.8l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={() => loginWithOAuth("github")}
              disabled={isLoading}
              className="w-full h-9 rounded-xl border border-[#1e293b] bg-[#070d19]/80 hover:bg-[#0f172a] hover:border-slate-700 text-xs font-semibold text-slate-300 flex items-center justify-center gap-2 font-sans transition-all"
            >
              <Github className="h-3.5 w-3.5" />
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Already have an account footer */}
          <div className="text-center text-[11px] text-slate-400 font-sans pt-1">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onOpenSignIn}
              className="text-purple-400 hover:text-purple-300 font-bold transition-colors ml-0.5"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
