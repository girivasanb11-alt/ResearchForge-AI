import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#030611] text-foreground p-6 sm:p-12 max-w-4xl mx-auto space-y-6">
      <Link href="/">
        <Button variant="outline" size="sm" className="text-xs font-mono mb-4">
          <ArrowLeft className="h-3.5 w-3.5 mr-1" />
          <span>Back to Home</span>
        </Button>
      </Link>
      <div className="flex items-center gap-2 text-purple-400">
        <Mail className="h-6 w-6" />
        <h1 className="text-2xl font-bold text-white">Contact & Enterprise Support</h1>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed">
        For enterprise integrations, custom Model Context Protocol deployments, or dedicated cluster allocations, reach our team at <a href="mailto:enterprise@trueforge.ai" className="text-purple-400 font-semibold underline">enterprise@trueforge.ai</a>.
      </p>
    </div>
  );
}
