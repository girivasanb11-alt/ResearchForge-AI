"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FloatingFeatureBadgeProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  badgeColor?: string;
  delay?: number;
  className?: string;
}

export function FloatingFeatureBadge({
  icon: Icon,
  title,
  subtitle,
  badgeColor = "text-purple-400 bg-purple-500/15 border-purple-500/30",
  delay = 0,
  className = "",
}: FloatingFeatureBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={`p-3 rounded-2xl border border-white/10 bg-[#080e1e]/85 backdrop-blur-xl shadow-xl flex items-center gap-3 select-none ${className}`}
    >
      <div className={`h-8 w-8 rounded-xl border flex items-center justify-center shrink-0 ${badgeColor}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="space-y-0.5 text-left">
        <div className="text-xs font-bold text-white font-sans truncate">{title}</div>
        <div className="text-[10px] font-mono text-slate-400 truncate">{subtitle}</div>
      </div>
    </motion.div>
  );
}
