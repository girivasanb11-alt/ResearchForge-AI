"use client";

import React from "react";
import Link from "next/link";
import { Clock, PlusCircle } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SessionsList } from "@/features/sessions/SessionsList";
import { SessionEmptyState } from "@/features/sessions/SessionEmptyState";
import { useResearch } from "@/lib/store";
import { Button } from "@/components/ui/button";

export default function SessionsPage() {
  const { sessions, deleteSession } = useResearch();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold uppercase tracking-wider mb-1">
              <Clock className="h-3.5 w-3.5" />
              <span>Workspace History</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
              Research Sessions ({sessions.length})
            </h1>
            <p className="text-xs text-muted-foreground font-sans mt-0.5">
              Chronological log of multi-agent investigations and compiled artifacts.
            </p>
          </div>

          <Link href="/research">
            <Button variant="glow" size="sm" className="h-9 px-4 rounded-xl text-xs font-mono font-bold flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>New Session</span>
            </Button>
          </Link>
        </div>

        {/* Sessions List or Empty State */}
        {sessions.length === 0 ? (
          <SessionEmptyState />
        ) : (
          <SessionsList sessions={sessions} onDeleteSession={deleteSession} />
        )}
      </div>
    </DashboardLayout>
  );
}
