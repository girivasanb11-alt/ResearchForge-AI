"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { useResearch } from "@/lib/store";
import { Button } from "@/components/ui/button";

export default function ReportDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { getReportById } = useResearch();

  const report = getReportById(id);

  if (!report) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center space-y-4">
        <div className="mx-auto h-12 w-12 rounded-2xl bg-secondary/60 flex items-center justify-center text-muted-foreground">
          <BookOpen className="h-6 w-6 text-muted-foreground/60" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-foreground">No reports generated</h2>
          <p className="text-xs font-mono text-muted-foreground">
            Waiting for real data. Report "{id}" is not available.
          </p>
        </div>
        <div className="pt-2">
          <Link href="/research">
            <Button variant="outline" size="sm">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="pb-4 border-b border-border/80">
        <h1 className="text-2xl font-bold text-foreground">{report.title}</h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">{report.summary}</p>
      </div>
      <div className="rounded-2xl border border-dashed border-border p-8 text-center text-xs font-mono text-muted-foreground">
        Report body under construction
      </div>
    </div>
  );
}
