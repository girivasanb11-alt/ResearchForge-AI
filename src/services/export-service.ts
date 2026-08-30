import { ResearchReport } from "@/types/research";
import { downloadAsFile } from "@/lib/utils";
import { jsPDF } from "jspdf";

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

/**
 * High-Definition Multi-Page Enterprise PDF Generator
 * Uses jsPDF with automatic pagination, header banners, metadata boxes, and citations tables.
 */
export async function downloadPdfReport(report: ResearchReport, customFileName?: string) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Colors
  const primaryColor = [99, 102, 241]; // Indigo #6366F1
  const darkBg = [15, 23, 42]; // Slate 900 #0F172A
  const textDark = [30, 41, 59]; // Slate 800
  const textMuted = [100, 116, 139]; // Slate 500
  const lightCard = [248, 250, 252]; // Slate 50
  const borderColor = [226, 232, 240]; // Slate 200

  // Helper for page break checks
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin - 10) {
      doc.addPage();
      y = margin;
      drawHeader();
    }
  };

  // Header banner on subsequent pages
  const drawHeader = () => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("RESEARCHFORGE AI  •  AUTONOMOUS DOSSIER", margin, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(`ID: ${report.id}`, pageWidth - margin, y, { align: "right" });
    y += 4;
    doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;
  };

  // --- Page 1: Main Header & Branding ---
  // Top Badge
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.roundedRect(margin, y, 48, 6, 1.5, 1.5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text("TRUEFORGE ENGINE v4.2", margin + 3, y + 4.2);
  y += 10;

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const titleLines = doc.splitTextToSize(report.title, contentWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 7 + 2;

  // Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  const subtitleLines = doc.splitTextToSize(report.subtitle, contentWidth);
  doc.text(subtitleLines, margin, y);
  y += subtitleLines.length * 5 + 6;

  // Metadata Card
  doc.setFillColor(lightCard[0], lightCard[1], lightCard[2]);
  doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
  doc.roundedRect(margin, y, contentWidth, 20, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("CONFIDENCE SCORE", margin + 4, y + 6);
  doc.text("INVESTIGATION DEPTH", margin + 50, y + 6);
  doc.text("VERIFIED SOURCES", margin + 105, y + 6);
  doc.text("EXECUTION DATE", margin + 145, y + 6);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(`${report.confidenceScore}% (Verified)`, margin + 4, y + 14);
  doc.text(report.depth.toUpperCase(), margin + 50, y + 14);
  doc.text(`${report.sources.length} Indexed DOIs`, margin + 105, y + 14);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  const dateStr = new Date(report.createdAt).toLocaleDateString();
  doc.text(dateStr, margin + 145, y + 14);

  y += 28;

  // Section helper
  const addSection = (number: string, title: string, text: string, color: number[]) => {
    checkPageBreak(25);
    // Section header
    doc.setFillColor(color[0], color[1], color[2]);
    doc.circle(margin + 1.5, y - 1, 1.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(`${number}. ${title}`, margin + 5, y);
    y += 6;

    // Content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(60, 70, 85);
    const lines = doc.splitTextToSize(text, contentWidth);
    for (let i = 0; i < lines.length; i++) {
      checkPageBreak(5);
      doc.text(lines[i], margin, y);
      y += 4.8;
    }
    y += 5;
  };

  // 1. Executive Summary
  addSection("1", "Executive Summary", report.executiveSummary, [139, 92, 246]);

  // 2. Market Analysis
  addSection("2", "Market Dynamics & Forecast", report.marketAnalysis, [6, 182, 212]);

  // 3. Competitor Analysis
  addSection("3", "Competitor & Architectural Benchmarking", report.competitorAnalysis, [245, 158, 11]);

  // 4. Key Insights
  if (report.keyInsights && report.keyInsights.length > 0) {
    checkPageBreak(30);
    doc.setFillColor(16, 185, 129);
    doc.circle(margin + 1.5, y - 1, 1.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text("4. Key Empirical Insights", margin + 5, y);
    y += 6;

    report.keyInsights.forEach((insight, idx) => {
      checkPageBreak(16);
      doc.setFillColor(lightCard[0], lightCard[1], lightCard[2]);
      doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
      const insightLines = doc.splitTextToSize(insight, contentWidth - 14);
      const boxHeight = Math.max(12, insightLines.length * 4.5 + 5);

      doc.roundedRect(margin, y, contentWidth, boxHeight, 1.5, 1.5, "FD");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(`[0${idx + 1}]`, margin + 3, y + 4.5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      doc.text(insightLines, margin + 12, y + 4.5);
      y += boxHeight + 3;
    });
    y += 4;
  }

  // 5. Strategic Recommendations
  if (report.recommendations && report.recommendations.length > 0) {
    checkPageBreak(25);
    doc.setFillColor(99, 102, 241);
    doc.circle(margin + 1.5, y - 1, 1.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text("5. Strategic Recommendations", margin + 5, y);
    y += 6;

    report.recommendations.forEach((rec, idx) => {
      checkPageBreak(12);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(`${idx + 1}.`, margin + 2, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(60, 70, 85);
      const recLines = doc.splitTextToSize(rec, contentWidth - 8);
      doc.text(recLines, margin + 8, y);
      y += recLines.length * 4.5 + 3;
    });
    y += 5;
  }

  // 6. Verified Citation Sources
  if (report.sources && report.sources.length > 0) {
    checkPageBreak(35);
    doc.setFillColor(168, 85, 247);
    doc.circle(margin + 1.5, y - 1, 1.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(`6. Verified Citation Sources (${report.sources.length})`, margin + 5, y);
    y += 7;

    report.sources.forEach((src) => {
      checkPageBreak(24);
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
      doc.roundedRect(margin, y, contentWidth, 20, 1.5, 1.5, "FD");

      // Domain & type badge
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(`[${src.type.toUpperCase()}]  ${src.domain}`, margin + 3, y + 4.5);

      if (src.relevanceScore) {
        doc.setTextColor(16, 185, 129);
        doc.text(`${src.relevanceScore}% Match`, pageWidth - margin - 20, y + 4.5);
      }

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      const srcTitle = doc.splitTextToSize(src.title, contentWidth - 6);
      doc.text(srcTitle[0] || src.title, margin + 3, y + 9);

      // Snippet / DOI
      doc.setFont("helvetica", "italic");
      doc.setFontSize(7.5);
      doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
      const snippet = src.doi ? `DOI: ${src.doi}  |  ${src.snippet.slice(0, 100)}...` : `${src.snippet.slice(0, 110)}...`;
      doc.text(snippet, margin + 3, y + 14.5);

      y += 24;
    });
  }

  // --- Add Page Footers across all pages ---
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - margin + 2, pageWidth - margin, pageHeight - margin + 2);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(
      `ResearchForge AI • Autonomous Deep Research Dossier`,
      margin,
      pageHeight - margin + 6
    );
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - margin + 6, {
      align: "right",
    });
  }

  const cleanName =
    customFileName ||
    `Research_${report.title.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 35)}.pdf`;

  doc.save(cleanName);
}
