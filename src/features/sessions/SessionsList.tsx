"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { ResearchSession } from "@/types/research";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface SessionsListProps {
  sessions: ResearchSession[];
  onDeleteSession: (id: string) => void;
}

export function SessionsList({ sessions, onDeleteSession }: SessionsListProps) {
  return (
    <div className="space-y-4">
      {sessions.map((session) => {
        const isCompleted = session.status === "completed";
        const isWaiting = session.status === "waiting_approval";

        return (
          <div
            key={session.id}
            className="p-5 rounded-2xl border border-border/80 bg-card/60 hover:bg-card hover:border-purple-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
          >
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <Badge
                  variant={isCompleted ? "success" : isWaiting ? "warning" : "purple"}
                  className="text-[10px] font-mono capitalize"
                >
                  {isCompleted && <CheckCircle2 className="h-3 w-3 mr-1 inline" />}
                  {isWaiting && <AlertCircle className="h-3 w-3 mr-1 inline" />}
                  {session.status.replace("_", " ")}
                </Badge>
                <span className="text-xs font-mono text-muted-foreground">
                  {formatDate(session.createdAt)}
                </span>
              </div>

              <h4 className="text-base font-bold text-foreground font-sans truncate">
                {session.topic}
              </h4>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {session.reportId && (
                <Link
                  href={`/dashboard/reports/${session.reportId}`}
                  className="flex items-center gap-1 text-xs font-mono text-purple-400 font-bold hover:text-purple-300 transition-colors group-hover:translate-x-0.5"
                >
                  <span>View Dossier</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}

              <button
                onClick={() => onDeleteSession(session.id)}
                title="Delete Session"
                className="p-2 rounded-lg text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
