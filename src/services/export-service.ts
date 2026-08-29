import { ResearchReport } from "@/types/research";
import { downloadAsFile } from "@/lib/utils";

export function exportReportToMarkdown(report: ResearchReport): string {
  let md = `# ${report.title}\n\n`;
  md += `> **Subtitle:** ${report.subtitle}\n`;
  md += `> **Confidence Score:** ${report.confidenceScore}% | **Scope:** ${report.scope.join(", ")} | **Generated:** ${report.createdAt}\n\n`;

  md += `## 1. Executive Summary\n\n${report.executiveSummary}\n\n`;
  md += `## 2. Market Analysis\n\n${report.marketAnalysis}\n\n`;
  md += `## 3. Competitor Analysis\n\n${report.competitorAnalysis}\n\n`;

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
  downloadAsFile(`${report.id}.md`, md, "text/markdown");
}

export function printPdfReport() {
  window.print();
}
