"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ResearchReport, ResearchJob, ResearchDepth, ResearchScope } from "./types";
import { SAMPLE_REPORTS, SAMPLE_SOURCES } from "./sample-data";

interface ResearchContextType {
  reports: ResearchReport[];
  currentJob: ResearchJob | null;
  bookmarkedReportIds: string[];
  recentQueries: string[];
  isCommandMenuOpen: boolean;
  setIsCommandMenuOpen: (open: boolean) => void;
  startNewResearch: (params: { query: string; objective?: string; depth: ResearchDepth; scope: ResearchScope[] }) => string;
  cancelResearch: () => void;
  toggleBookmark: (reportId: string) => void;
  getReportById: (id: string) => ResearchReport | undefined;
  addReport: (report: ResearchReport) => void;
}

const ResearchContext = createContext<ResearchContextType | undefined>(undefined);

export function ResearchProvider({ children }: { children: React.ReactNode }) {
  const [reports, setReports] = useState<ResearchReport[]>(SAMPLE_REPORTS);
  const [bookmarkedReportIds, setBookmarkedReportIds] = useState<string[]>([]);
  const [recentQueries, setRecentQueries] = useState<string[]>([]);
  const [currentJob, setCurrentJob] = useState<ResearchJob | null>(null);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandMenuOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleBookmark = (reportId: string) => {
    setBookmarkedReportIds((prev) =>
      prev.includes(reportId) ? prev.filter((id) => id !== reportId) : [...prev, reportId]
    );
  };

  const getReportById = (id: string): ResearchReport | undefined => {
    return reports.find((r) => r.id === id);
  };

  const addReport = (report: ResearchReport) => {
    setReports((prev) => [report, ...prev]);
  };

  const cancelResearch = () => {
    if (currentJob) {
      setCurrentJob((prev) => (prev ? { ...prev, status: "idle" } : null));
    }
  };

  const startNewResearch = ({
    query,
    objective,
    depth,
    scope,
  }: {
    query: string;
    objective?: string;
    depth: ResearchDepth;
    scope: ResearchScope[];
  }): string => {
    const jobId = "job-" + Date.now();
    const newReportId = query
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .slice(0, 40) + "-" + Math.floor(Math.random() * 1000);

    const initialJob: ResearchJob = {
      id: jobId,
      query,
      objective,
      depth,
      scope,
      createdAt: new Date().toISOString(),
      status: "running",
      currentStepIndex: 0,
      steps: [
        {
          id: "step-1",
          agentName: "Query Decomposer & Protocol Planner",
          title: "1. Query Decomposition & Hypothesis Formulation",
          description: `Formulating search vectors for "${query}"`,
          status: "running",
          timestamp: "00:01",
          progressPercent: 25,
          findingsCount: 0,
          sourcesDiscovered: 0,
          logs: [
            `[00:01] Parsing input objective: "${query}"`,
            `[00:01] Formulating targeted hypothesis sets...`,
          ],
        },
        {
          id: "step-2",
          agentName: "Autonomous Crawler",
          title: "2. Multi-Source Ingestion",
          description: "Scanning indexed repositories and whitepapers",
          status: "pending",
          timestamp: "--:--",
          progressPercent: 0,
          findingsCount: 0,
          sourcesDiscovered: 0,
          logs: [],
        },
        {
          id: "step-3",
          agentName: "Contradiction Checker",
          title: "3. Cross-Source Validation",
          description: "Triangulating claims across literature",
          status: "pending",
          timestamp: "--:--",
          progressPercent: 0,
          findingsCount: 0,
          sourcesDiscovered: 0,
          logs: [],
        },
        {
          id: "step-4",
          agentName: "Executive Synthesis Compiler",
          title: "4. Dossier Synthesis",
          description: "Compiling structured dossier and citations",
          status: "pending",
          timestamp: "--:--",
          progressPercent: 0,
          findingsCount: 0,
          sourcesDiscovered: 0,
          logs: [],
        },
      ],
      discoveredSources: SAMPLE_SOURCES,
      hypotheses: [
        {
          id: "hyp-1",
          statement: `Investigation initiated for "${query}".`,
          status: "investigating",
          confidence: 50,
        },
      ],
      reportId: newReportId,
    };

    setCurrentJob(initialJob);
    setRecentQueries((prev) => [query, ...prev.filter((q) => q !== query)].slice(0, 10));

    // Dynamic report generation
    const generatedReport: ResearchReport = {
      id: newReportId,
      query,
      title: `${query.charAt(0).toUpperCase() + query.slice(1)}: Research Dossier`,
      subtitle: `Autonomous multi-agent investigation`,
      summary: `Research dossier generated for "${query}".`,
      createdAt: new Date().toISOString(),
      readTimeMinutes: depth === "exhaustive" ? 10 : 5,
      confidenceScore: 98,
      scope,
      depth,
      status: "completed",
      stats: {
        sourcesScanned: 0,
        sourcesCited: 0,
        factsCrossChecked: 0,
        contradictionsIdentified: 0,
        synthesisTokens: 0,
        executionTimeSeconds: 0,
      },
      keyFindings: [],
      sections: [
        {
          id: "sec-1",
          slug: "summary",
          title: "1. Executive Summary",
          content: `Initial synthesis for "${query}". Waiting for live data ingestion.`,
        },
      ],
      sources: [],
      contradictions: [],
      graphNodes: [
        { id: "core", label: query.slice(0, 20), type: "core_concept", size: 24, connections: [] },
      ],
    };

    // Progression simulation
    setTimeout(() => {
      setCurrentJob((prev) => {
        if (!prev || prev.id !== jobId) return prev;
        return {
          ...prev,
          status: "completed",
          currentStepIndex: 3,
        };
      });
      setReports((prev) => [generatedReport, ...prev]);
    }, 4000);

    return newReportId;
  };

  return (
    <ResearchContext.Provider
      value={{
        reports,
        currentJob,
        bookmarkedReportIds,
        recentQueries,
        isCommandMenuOpen,
        setIsCommandMenuOpen,
        startNewResearch,
        cancelResearch,
        toggleBookmark,
        getReportById,
        addReport,
      }}
    >
      {children}
    </ResearchContext.Provider>
  );
}

export function useResearch() {
  const context = useContext(ResearchContext);
  if (!context) {
    throw new Error("useResearch must be used within a ResearchProvider");
  }
  return context;
}
