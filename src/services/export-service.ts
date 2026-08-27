import { ResearchReport } from "@/types/research";

export function exportReportToMarkdown(report: ResearchReport): string {
  let md = `# ${report.title}\n\n`;
  md += `**Date**: ${report.createdAt} | **Investigation Depth**: ${report.depth.toUpperCase()} | **Empirical Confidence**: ${report.confidenceScore}%\n\n`;
  md += `---\n\n`;
  md += `## 1. Executive Summary\n\n${report.executiveSummary}\n\n`;
  md += `## 2. Market Dynamics & Capex Modeling\n\n${report.marketAnalysis}\n\n`;
  md += `## 3. Architecture & Competitor Benchmarking\n\n${report.competitorAnalysis}\n\n`;

  if (report.keyInsights && report.keyInsights.length > 0) {
    md += `## 4. Key Insights\n\n`;
    report.keyInsights.forEach((insight, idx) => {
      md += `${idx + 1}. ${insight}\n`;
    });
    md += `\n`;
  }

  if (report.recommendations && report.recommendations.length > 0) {
    md += `## 5. Recommendations\n\n`;
    report.recommendations.forEach((rec) => {
      md += `- ${rec}\n`;
    });
    md += `\n`;
  }

  if (report.sources && report.sources.length > 0) {
    md += `## Verified Citation Sources\n\n`;
    report.sources.forEach((src, idx) => {
      md += `${idx + 1}. [${src.title}](${src.url}) - ${src.domain} (${src.publishedDate || "2026"})\n`;
    });
  }

  return md;
}

export function downloadMarkdownReport(report: ResearchReport) {
  const md = exportReportToMarkdown(report);
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${report.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}-dossier.md`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function printPdfReport() {
  if (typeof window !== "undefined") {
    window.print();
  }
}
