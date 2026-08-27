"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { ConnectRepoModal } from "@/components/research/ConnectRepoModal";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isConnectRepoOpen, setIsConnectRepoOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Fixed Left Sidebar */}
      <Sidebar onOpenConnectRepo={() => setIsConnectRepoOpen(true)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8 animate-in fade-in duration-150">
          {children}
        </main>
      </div>

      {/* Connect Repo Modal */}
      <ConnectRepoModal
        isOpen={isConnectRepoOpen}
        onClose={() => setIsConnectRepoOpen(false)}
      />
    </div>
  );
}
