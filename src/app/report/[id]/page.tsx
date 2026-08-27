"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReportView } from "@/features/reports/ReportView";
import { ReportEmptyState } from "@/features/reports/ReportEmptyState";
import { useResearch } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ReportDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { getReportById } = useResearch();

  const report = getReportById(id);

  return (
    <DashboardLayout>
      {report ? (
        <ReportView report={report} />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Link href="/reports">
              <Button variant="outline" size="sm" className="text-xs font-mono">
                <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                <span>Back to Reports</span>
              </Button>
            </Link>
          </div>
          <ReportEmptyState />
        </div>
      )}
    </DashboardLayout>
  );
}
