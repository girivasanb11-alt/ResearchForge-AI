"use client";

import React, { useState } from "react";
import {
  Download,
  FileText,
  FileCode2,
  Copy,
  Check,
  Printer,
  Sparkles,
} from "lucide-react";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResearchReport } from "@/lib/types";
import { downloadAsFile } from "@/lib/utils";
import { toast } from "sonner";

interface ExportShareModalProps {
  report: ResearchReport;
  isOpen: boolean;
  onClose: () => void;
}

export function ExportShareModal({ report, isOpen, onClose }: ExportShareModalProps) {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const generateMarkdown = () => {
    let md = `# ${report.title}\n\n`;
    md += `> **Confidence Score:** ${report.confidenceScore}% | **Scope:** ${report.scope.join(", ")} | **Date:** ${report.createdAt}\n\n`;
    md += `## Executive Summary\n\n${report.summary}\n\n`;
    md += `## Key Findings\n\n`;
    report.keyFindings.forEach((kf, i) => {
      md += `### ${i + 1}. ${kf.title} (${kf.impactLevel.toUpperCase()})\n${kf.description}\n*Citations:* ${kf.citations.join(", ")}\n\n`;
    });
    md += `## Core Report Sections\n\n`;
    report.sections.forEach((sec) => {
      md += `### ${sec.title}\n\n${sec.content}\n\n`;
    });
    md += `## Verified Citation Sources\n\n`;
    report.sources.forEach((src, i) => {
      md += `${i + 1}. [${src.title}](${src.url}) - ${src.authors?.join(", ") || src.domain} (${src.publishedDate || "2025"})\n`;
    });
    return md;
  };

  const generateBibTeX = () => {
    let bib = `% ResearchForge AI Citation Dataset\n% Query: ${report.query}\n\n`;
    report.sources.forEach((src, i) => {
      const citeKey = `researchforge_${report.id}_src${i + 1}`;
      bib += `@article{${citeKey},\n`;
      bib += `  title = {${src.title}},\n`;
      bib += `  author = {${src.authors?.join(" and ") || "ResearchForge Verification Engine"}},\n`;
      bib += `  journal = {${src.domain}},\n`;
      bib += `  year = {${src.publishedDate ? src.publishedDate.slice(0, 4) : "2026"}},\n`;
      bib += `  url = {${src.url}}\n`;
      bib += `}\n\n`;
    });
    return bib;
  };

  const handleExportMarkdown = () => {
    downloadAsFile(`${report.id}-deep-research.md`, generateMarkdown(), "text/markdown");
    toast.success("Markdown file downloaded successfully!");
  };

  const handleExportBibTeX = () => {
    downloadAsFile(`${report.id}-citations.bib`, generateBibTeX(), "text/plain");
    toast.success("BibTeX reference file downloaded!");
  };

  const handleExportJSON = () => {
    downloadAsFile(`${report.id}-dossier.json`, JSON.stringify(report, null, 2), "application/json");
    toast.success("Full JSON dataset downloaded!");
  };

  const handlePrintPDF = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopiedFormat("md");
    toast.success("Markdown copied to clipboard!");
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Download className="h-5 w-5 text-indigo-400" />
          <span>Export Research Dossier</span>
        </DialogTitle>
        <DialogDescription>
          Download publication-grade formats, academic BibTeX records, or print-styled PDF briefs.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-3 py-2">
        {/* PDF Print Option */}
        <button
          onClick={handlePrintPDF}
          className="w-full flex items-center justify-between p-3.5 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/60 hover:border-indigo-500/40 transition-all text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Printer className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">Print / Save as PDF</div>
              <div className="text-[11px] text-muted-foreground">Formatted publication stylesheet</div>
            </div>
          </div>
          <Badge variant="cyan" className="text-[10px] font-mono">
            Print Ready
          </Badge>
        </button>

        {/* Markdown Download */}
        <button
          onClick={handleExportMarkdown}
          className="w-full flex items-center justify-between p-3.5 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/60 hover:border-indigo-500/40 transition-all text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">Markdown (.md)</div>
              <div className="text-[11px] text-muted-foreground">Clean formatting for Obsidian, Notion & GitHub</div>
            </div>
          </div>
          <Badge variant="secondary" className="text-[10px] font-mono">
            Download
          </Badge>
        </button>

        {/* BibTeX Reference File */}
        <button
          onClick={handleExportBibTeX}
          className="w-full flex items-center justify-between p-3.5 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/60 hover:border-indigo-500/40 transition-all text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
              <FileCode2 className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">BibTeX (.bib) Citations</div>
              <div className="text-[11px] text-muted-foreground">Grounded DOI records for LaTeX / Overleaf</div>
            </div>
          </div>
          <Badge variant="purple" className="text-[10px] font-mono">
            BibTeX
          </Badge>
        </button>

        {/* JSON Dataset */}
        <button
          onClick={handleExportJSON}
          className="w-full flex items-center justify-between p-3.5 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/60 hover:border-indigo-500/40 transition-all text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">Full JSON Dossier (.json)</div>
              <div className="text-[11px] text-muted-foreground">Structured graph nodes, findings, and metrics</div>
            </div>
          </div>
          <Badge variant="success" className="text-[10px] font-mono">
            Raw Data
          </Badge>
        </button>
      </div>

      <DialogFooter>
        <Button variant="secondary" size="sm" onClick={handleCopyMarkdown} className="w-full sm:w-auto text-xs">
          {copiedFormat === "md" ? <Check className="h-3.5 w-3.5 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
          <span>Copy Full Markdown</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
