import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "cyan" | "purple";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
    secondary: "bg-secondary text-secondary-foreground border-border/50",
    outline: "border-border/80 text-muted-foreground",
    success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    cyan: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    purple: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors font-mono tracking-tight",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
