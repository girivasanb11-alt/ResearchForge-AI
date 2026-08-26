"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ResearchReport, CitationSource, ResearchJob, ResearchDepth, ResearchScope } from "./types";
import { SAMPLE_REPORTS, SAMPLE_SOURCES, MOCK_EXECUTION_STEPS } from "./sample-data";

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
  const [bookmarkedReportIds, setBookmarkedReportIds] = useState<string[]>(["solid-state-batteries-2026"]);
  const [recentQueries, setRecentQueries] = useState<string[]>([
    "Solid-State Battery Commercialization Roadmaps 2026",
    "Multi-Agent Autonomous Orchestration Frameworks",
    "GLP-1 / GIP Dual Agonist Clinical Efficacy",
    "Quantum Error Correction Code Thresholds",
    "High-Temperature Superconductivity Hydrides",
  ]);
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
          description: `Formulating academic and domain-specific search vectors for "${query}"`,
          status: "running",
          timestamp: "00:01",
          progressPercent: 25,
          findingsCount: 3,
          sourcesDiscovered: 8,
          logs: [
            `[00:01] Parsing input objective: "${query}"`,
            `[00:01] Identified key semantic entities and domain taxonomy`,
            `[00:02] Formulating targeted hypothesis sets and validation constraints...`,
          ],
        },
        {
          id: "step-2",
          agentName: "Autonomous Deep Web & ArXiv Crawler",
          title: "2. Multi-Source Crawling & Citation Graph Traversal",
          description: "Scanning indexed academic repositories, patent databases, and whitepapers",
          status: "pending",
          timestamp: "--:--",
          progressPercent: 0,
          findingsCount: 0,
          sourcesDiscovered: 0,
          logs: [],
        },
        {
          id: "step-3",
          agentName: "Fact Verification & Contradiction Checker",
          title: "3. Cross-Source Validation & Contradiction Engine",
          description: "Triangulating claims across conflicting literature and verifying claims",
          status: "pending",
          timestamp: "--:--",
          progressPercent: 0,
          findingsCount: 0,
          sourcesDiscovered: 0,
          logs: [],
        },
        {
          id: "step-4",
          agentName: "Executive Synthesis & Report Compiler",
          title: "4. Knowledge Graph Construction & Dossier Synthesis",
          description: "Compiling structured dossier, executive briefing, charts, and citations",
          status: "pending",
          timestamp: "--:--",
          progressPercent: 0,
          findingsCount: 0,
          sourcesDiscovered: 0,
          logs: [],
        },
      ],
      discoveredSources: SAMPLE_SOURCES.slice(0, 2),
      hypotheses: [
        {
          id: "hyp-1",
          statement: `Key breakthrough efficiency in "${query}" correlates with recently published 2025/2026 benchmarks.`,
          status: "investigating",
          confidence: 88,
        },
        {
          id: "hyp-2",
          statement: "Commercial scalability remains constrained by current yield rates and capital expenditure requirements.",
          status: "investigating",
          confidence: 74,
        },
      ],
      reportId: newReportId,
    };

    setCurrentJob(initialJob);
    setRecentQueries((prev) => [query, ...prev.filter((q) => q !== query)].slice(0, 10));

    // Create a new report draft in background
    const generatedReport: ResearchReport = {
      id: newReportId,
      query,
      title: `${query.charAt(0).toUpperCase() + query.slice(1)}: Comprehensive Deep Research Dossier`,
      subtitle: `Autonomous multi-agent investigation synthesized from verified academic publications and market intelligence`,
      summary: `This exhaustive investigation evaluates state-of-the-art developments in "${query}". Triangulating insights across multi-source literature, patent registries, and empirical benchmarks, this report outlines foundational breakthroughs, economic trajectories, and unresolved scientific debates.`,
      createdAt: new Date().toISOString(),
      readTimeMinutes: depth === "exhaustive" ? 14 : depth === "standard" ? 8 : 4,
      confidenceScore: 98.2,
      scope,
      depth,
      status: "completed",
      stats: {
        sourcesScanned: depth === "exhaustive" ? 480 : 190,
        sourcesCited: depth === "exhaustive" ? 42 : 18,
        factsCrossChecked: depth === "exhaustive" ? 280 : 110,
        contradictionsIdentified: 3,
        synthesisTokens: 16500,
        executionTimeSeconds: 32.4,
      },
      keyFindings: [
        {
          id: `kf-dyn-1`,
          title: `Empirical Breakthrough Accelerates Target Commercial Timeline`,
          description: `Analysis across 40+ primary sources indicates a 2.4x acceleration in deployment efficiency over traditional baseline paradigms.`,
          impactLevel: "critical",
          category: "Technology & Performance",
          citations: ["src-1", "src-2"],
          confidenceScore: 98,
        },
        {
          id: `kf-dyn-2`,
          title: `Capital Expenditure Footprint Reduced by 35% via Process Innovation`,
          description: `Novel process engineering eliminating legacy solvent steps significantly lowers unit cost scaling curves toward commercial viability.`,
          impactLevel: "high",
          category: "Economic Feasibility",
          citations: ["src-3", "src-4"],
          confidenceScore: 95,
        },
      ],
      sections: [
        {
          id: "sec-dyn-1",
          slug: "executive-brief",
          title: "1. Executive Strategic Briefing",
          content: `
### Key Inquiries & Empirical Answers

Our multi-agent autonomous system decomposed the primary inquiry (**"${query}"**) into 12 targeted sub-questions across academic repositories, patent databases, and industrial validation trials.

- **Primary Driver:** Convergence of accelerated material formulation and automated validation protocols.
- **Economic Viability:** Estimated 32% unit-cost reduction achievable within a 24-month horizon.
- **Critical Risk Vector:** Supply-chain concentration and proprietary IP barriers.
          `,
          callout: {
            type: "insight",
            title: "Synthesis Verdict",
            text: `Empirical consensus indicates strong commercial and academic momentum for "${query}", with key industrial pilots scheduled for 2026-2027.`,
          },
        },
        {
          id: "sec-dyn-2",
          slug: "comparative-analysis",
          title: "2. Technical & Performance Comparative Breakdown",
          content: `
Detailed comparison of leading methodologies and experimental architectures:

| Approach / Model | Efficiency Multiplier | Scalability Index | Maturity (TRL) |
| :--- | :--- | :--- | :--- |
| **Next-Gen Baseline** | 1.0x (Reference) | 65 / 100 | TRL 9 (Commercial) |
| **Hybrid Continuous Protocol** | **2.2x (+120%)** | **88 / 100** | **TRL 7 (Pilot)** |
| **Direct Synthesis Route** | **2.8x (+180%)** | **78 / 100** | **TRL 5 (Lab Validation)** |
          `,
          chartData: {
            title: "Performance & Efficiency Metrics by Implementation Strategy",
            type: "bar",
            xAxisKey: "name",
            dataKeys: ["efficiency", "scalability", "confidence"],
            data: [
              { name: "Legacy Method", efficiency: 45, scalability: 70, confidence: 99 },
              { name: "Hybrid Route", efficiency: 82, scalability: 88, confidence: 94 },
              { name: "Direct Synthesis", efficiency: 95, scalability: 76, confidence: 91 },
            ],
          },
        },
      ],
      sources: SAMPLE_SOURCES,
      contradictions: [
        {
          topic: "Optimal Scaling Architecture",
          consensusScore: 68,
          viewA: {
            claim: "Decentralized modular deployment offers superior fault isolation and unit economics.",
            advocates: ["MIT Review", "Stanford R&D"],
            sources: ["src-1"],
            evidenceWeight: "Strong",
          },
          viewB: {
            claim: "Monolithic centralized integration yields higher thermodynamic efficiency at scale.",
            advocates: ["Industry Consortium", "Fraunhofer Institute"],
            sources: ["src-2"],
            evidenceWeight: "Strong",
          },
          synthesis: "Hybrid hierarchical architectures resolve both requirements, maintaining local modularity with global coordination.",
        },
      ],
      graphNodes: [
        { id: "core", label: query.slice(0, 24), type: "core_concept", size: 28, connections: ["n1", "n2", "n3"] },
        { id: "n1", label: "Breakthrough Protocol", type: "methodology", size: 22, connections: ["core"] },
        { id: "n2", label: "Cost Parity Horizon", type: "metric", size: 20, connections: ["core"] },
        { id: "n3", label: "Academic Cross-Validation", type: "institution", size: 20, connections: ["core"] },
      ],
      audioBriefing: {
        duration: "3:45",
        title: `Executive Brief: ${query.slice(0, 35)}`,
        transcript: [
          { timestamp: "0:00", speaker: "Dr. Alicia Vance (AI Host)", text: `Welcome to this ResearchForge AI brief on "${query}".` },
          { timestamp: "0:35", speaker: "Dr. Alicia Vance (AI Host)", text: "Our multi-agent synthesis evaluated all indexed primary sources and cross-checked key data points." },
          { timestamp: "1:20", speaker: "Dr. Marcus Reed (AI Analyst)", text: "The primary breakthrough revolves around continuous scaling efficiency, showing a 35% reduction in production capex." },
        ],
      },
    };

    // Simulate multi-agent steps progression
    setTimeout(() => {
      setCurrentJob((prev) => {
        if (!prev || prev.id !== jobId) return prev;
        const newSteps = [...prev.steps];
        newSteps[0].status = "completed";
        newSteps[0].progressPercent = 100;
        newSteps[1].status = "running";
        newSteps[1].progressPercent = 40;
        newSteps[1].timestamp = "00:08";
        newSteps[1].sourcesDiscovered = 84;
        newSteps[1].logs = [
          `[00:03] Crawling Semantic Scholar, arXiv, and CrossRef endpoints...`,
          `[00:05] Parsed 68 peer-reviewed PDF preprints...`,
          `[00:07] Extracted 19 structured data tables...`,
        ];
        return {
          ...prev,
          currentStepIndex: 1,
          steps: newSteps,
          discoveredSources: SAMPLE_SOURCES.slice(0, 4),
        };
      });
    }, 2000);

    setTimeout(() => {
      setCurrentJob((prev) => {
        if (!prev || prev.id !== jobId) return prev;
        const newSteps = [...prev.steps];
        newSteps[1].status = "completed";
        newSteps[1].progressPercent = 100;
        newSteps[2].status = "running";
        newSteps[2].progressPercent = 60;
        newSteps[2].timestamp = "00:18";
        newSteps[2].findingsCount = 12;
        newSteps[2].sourcesDiscovered = 240;
        newSteps[2].logs = [
          `[00:12] Triangulating quantitative figures across 42 publications...`,
          `[00:15] Validated 28 critical claims with 99% empirical consensus`,
          `[00:17] Isolated 1 active debate point regarding manufacturing friction`,
        ];
        return {
          ...prev,
          currentStepIndex: 2,
          steps: newSteps,
        };
      });
    }, 4500);

    setTimeout(() => {
      setCurrentJob((prev) => {
        if (!prev || prev.id !== jobId) return prev;
        const newSteps = [...prev.steps];
        newSteps[2].status = "completed";
        newSteps[2].progressPercent = 100;
        newSteps[3].status = "running";
        newSteps[3].progressPercent = 80;
        newSteps[3].timestamp = "00:28";
        newSteps[3].logs = [
          `[00:22] Assembling executive dossier & interactive visualizations...`,
          `[00:25] Compiling citation graph and BibTeX records...`,
          `[00:27] Finalizing confidence score calibration (98.2%)...`,
        ];
        return {
          ...prev,
          currentStepIndex: 3,
          steps: newSteps,
        };
      });
    }, 7000);

    setTimeout(() => {
      setCurrentJob((prev) => {
        if (!prev || prev.id !== jobId) return prev;
        const newSteps = [...prev.steps];
        newSteps[3].status = "completed";
        newSteps[3].progressPercent = 100;
        newSteps[3].timestamp = "00:34";
        newSteps[3].logs.push(`[00:34] Research dossier completed successfully.`);
        return {
          ...prev,
          currentStepIndex: 3,
          status: "completed",
          steps: newSteps,
        };
      });
      // Add report to list
      setReports((prev) => [generatedReport, ...prev]);
    }, 9500);

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
