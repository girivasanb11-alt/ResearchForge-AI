"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in-0 duration-200"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className)}>{children}</div>;
}

export function DialogTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)}>{children}</h2>;
}

export function DialogDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn("text-sm text-muted-foreground mt-1", className)}>{children}</p>;
}

export function DialogFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6", className)}>{children}</div>;
}
