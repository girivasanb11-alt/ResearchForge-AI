"use client";

import React from "react";
import { ShieldCheck, Cpu, UserCheck, Share2 } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      title: "Secure & Private",
      description: "Your data is encrypted and never shared.",
      icon: ShieldCheck,
    },
    {
      title: "Powered by TrueForge",
      description: "Built on enterprise-grade AI infrastructure.",
      icon: Cpu,
    },
    {
      title: "Human-in-the-Loop",
      description: "You stay in control with approval workflows.",
      icon: UserCheck,
    },
    {
      title: "Export & Share",
      description: "Export reports in multiple formats.",
      icon: Share2,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {badges.map((badge, idx) => {
        const Icon = badge.icon;
        return (
          <div
            key={idx}
            className="flex items-center gap-3.5 p-3 rounded-2xl border border-[#1e293b]/60 bg-[#070d19]/60 backdrop-blur-md"
          >
            <div className="h-9 w-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-cyan-400 flex items-center justify-center shrink-0 shadow-sm">
              <Icon className="h-4 w-4" />
            </div>
            <div className="space-y-0.5 text-left">
              <h4 className="text-xs font-bold text-white font-sans">{badge.title}</h4>
              <p className="text-[10px] text-slate-400 font-sans leading-tight">
                {badge.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
