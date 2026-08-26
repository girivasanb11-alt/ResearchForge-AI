"use client";

import React, { useState } from "react";
import {
  Info,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  BarChart2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ReportSection, CitationSource } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ReportBodyViewerProps {
  sections: ReportSection[];
  sources?: CitationSource[];
  activeCitationId?: string | null;
  onSelectCitation?: (id: string) => void;
}

export function ReportBodyViewer({
  sections,
}: ReportBodyViewerProps) {
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id || "");

  const getCalloutIcon = (type: string) => {
    switch (type) {
      case "insight":
        return Sparkles;
      case "warning":
        return AlertTriangle;
      case "success":
        return CheckCircle2;
      default:
        return Info;
    }
  };

  const getCalloutColors = (type: string) => {
    switch (type) {
      case "insight":
        return "bg-indigo-500/10 border-indigo-500/30 text-indigo-300";
      case "warning":
        return "bg-amber-500/10 border-amber-500/30 text-amber-300";
      case "success":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-300";
      default:
        return "bg-cyan-500/10 border-cyan-500/30 text-cyan-300";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
      {/* Sticky Table of Contents (Linear / Notion Style) */}
      <div className="lg:col-span-3 sticky top-24 space-y-4">
        <div className="p-4 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md space-y-3">
          <div className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
            Table of Contents
          </div>
          <nav className="space-y-1">
            {sections.map((section, idx) => (
              <a
                key={section.id}
                href={`#${section.slug}`}
                onClick={() => setActiveSectionId(section.id)}
                className={cn(
                  "flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors",
                  activeSectionId === section.id
                    ? "bg-secondary text-indigo-400 font-semibold border border-border/60"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                )}
              >
                <span className="font-mono text-[10px] text-muted-foreground">0{idx + 1}</span>
                <span className="truncate">{section.title.replace(/^\d+\.\s*/, "")}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Document Body */}
      <div className="lg:col-span-9 space-y-12">
        {sections.map((section) => {
          return (
            <section
              key={section.id}
              id={section.slug}
              className="scroll-mt-24 p-6 sm:p-8 rounded-3xl border border-border/80 bg-card/80 shadow-sm space-y-6"
            >
              {/* Section Header */}
              <div className="border-b border-border/60 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  {section.title}
                </h2>
              </div>

              {/* Callout if present */}
              {section.callout && (
                <div
                  className={cn(
                    "p-4 rounded-2xl border flex items-start gap-3 text-xs leading-relaxed",
                    getCalloutColors(section.callout.type)
                  )}
                >
                  {React.createElement(getCalloutIcon(section.callout.type), {
                    className: "h-5 w-5 shrink-0 mt-0.5",
                  })}
                  <div className="space-y-1">
                    <div className="font-bold uppercase tracking-wider text-[11px] font-mono">
                      {section.callout.title}
                    </div>
                    <p className="text-foreground/90 font-sans">{section.callout.text}</p>
                  </div>
                </div>
              )}

              {/* Markdown Content (Formatted as clean styled typography & tables) */}
              <div className="prose prose-invert prose-indigo max-w-none text-xs sm:text-sm leading-relaxed text-muted-foreground space-y-4">
                {section.content
                  .split("\n\n")
                  .map((paragraph, pIdx) => {
                    const trimmed = paragraph.trim();
                    if (!trimmed) return null;

                    // Table renderer
                    if (trimmed.startsWith("|")) {
                      const rows = trimmed.split("\n").map((r) =>
                        r
                          .split("|")
                          .slice(1, -1)
                          .map((c) => c.trim())
                      );
                      const header = rows[0];
                      const body = rows.slice(2); // Skip separator row

                      return (
                        <div key={pIdx} className="my-6 overflow-x-auto rounded-xl border border-border/80 bg-secondary/20">
                          <table className="w-full text-left text-xs font-sans">
                            <thead className="bg-secondary/60 border-b border-border/80 font-mono text-muted-foreground uppercase text-[11px]">
                              <tr>
                                {header.map((col, cIdx) => (
                                  <th key={cIdx} className="p-3 font-semibold text-foreground">
                                    {col}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                              {body.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-secondary/40 transition-colors">
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="p-3 text-foreground/90 font-sans">
                                      {cell.includes("**") ? (
                                        <strong className="text-indigo-400 font-semibold">
                                          {cell.replace(/\*\*/g, "")}
                                        </strong>
                                      ) : (
                                        cell
                                      )}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    }

                    // Heading 3
                    if (trimmed.startsWith("### ")) {
                      return (
                        <h3 key={pIdx} className="text-base sm:text-lg font-bold text-foreground pt-3">
                          {trimmed.replace("### ", "")}
                        </h3>
                      );
                    }

                    // Bullet lists
                    if (trimmed.startsWith("- ") || trimmed.startsWith("1. ")) {
                      const items = trimmed.split("\n");
                      return (
                        <ul key={pIdx} className="list-disc pl-5 space-y-1 text-foreground/90">
                          {items.map((item, iIdx) => (
                            <li key={iIdx} className="leading-relaxed">
                              {item.replace(/^[-*]\s+|\d+\.\s+/, "")}
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    // Blockquotes
                    if (trimmed.startsWith("> ")) {
                      return (
                        <blockquote
                          key={pIdx}
                          className="border-l-2 border-indigo-500 pl-4 italic text-foreground/90 my-3 font-sans"
                        >
                          {trimmed.replace(/^>\s+/, "")}
                        </blockquote>
                      );
                    }

                    return (
                      <p key={pIdx} className="text-foreground/90 font-sans leading-relaxed">
                        {trimmed}
                      </p>
                    );
                  })}
              </div>

              {/* Recharts Data Chart if present */}
              {section.chartData && (
                <div className="mt-8 p-5 rounded-2xl border border-border/80 bg-zinc-950/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono font-bold text-foreground flex items-center gap-2">
                      <BarChart2 className="h-4 w-4 text-indigo-400" />
                      <span>{section.chartData.title}</span>
                    </h4>
                    <Badge variant="secondary" className="text-[10px] font-mono">
                      Data Visualization
                    </Badge>
                  </div>

                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      {section.chartData.type === "line" ? (
                        <LineChart data={section.chartData.data}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                          <XAxis dataKey={section.chartData.xAxisKey || "name"} stroke="#71717a" fontSize={11} />
                          <YAxis stroke="#71717a" fontSize={11} />
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: "#09090b",
                              borderColor: "#27272a",
                              borderRadius: "0.5rem",
                              fontSize: "12px",
                            }}
                          />
                          <Legend wrapperStyle={{ fontSize: "11px" }} />
                          {section.chartData.dataKeys.map((key, kIdx) => (
                            <Line
                              key={key}
                              type="monotone"
                              dataKey={key}
                              stroke={kIdx === 0 ? "#6366f1" : kIdx === 1 ? "#06b6d4" : "#10b981"}
                              strokeWidth={2}
                              dot={{ r: 4 }}
                            />
                          ))}
                        </LineChart>
                      ) : (
                        <BarChart data={section.chartData.data}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                          <XAxis dataKey={section.chartData.xAxisKey || "name"} stroke="#71717a" fontSize={11} />
                          <YAxis stroke="#71717a" fontSize={11} />
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: "#09090b",
                              borderColor: "#27272a",
                              borderRadius: "0.5rem",
                              fontSize: "12px",
                            }}
                          />
                          <Legend wrapperStyle={{ fontSize: "11px" }} />
                          {section.chartData.dataKeys.map((key, kIdx) => (
                            <Bar
                              key={key}
                              dataKey={key}
                              fill={kIdx === 0 ? "#6366f1" : kIdx === 1 ? "#06b6d4" : "#10b981"}
                              radius={[4, 4, 0, 0]}
                            />
                          ))}
                        </BarChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
