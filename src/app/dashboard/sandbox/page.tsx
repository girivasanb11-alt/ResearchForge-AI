"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SandboxView } from "@/features/sandbox/SandboxView";

export default function DashboardSandboxPage() {
  return (
    <DashboardLayout>
      <SandboxView />
    </DashboardLayout>
  );
}
