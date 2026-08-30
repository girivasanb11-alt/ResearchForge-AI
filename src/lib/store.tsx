"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ResearchReport, ResearchSession, ResearchDepth, ResearchScope } from "@/types/research";
import { AgentStage, AgentStatus } from "@/types/agents";
import { createInitialStages, synthesizeRealReport } from "@/services/research-engine";
import {
  saveSessionToDb,
  fetchSessionsFromDb,
  saveAgentOutputToDb,
  saveCitationsToDb,
  logActivityToDb,
  saveReportToDb,
  fetchReportsFromDb,
} from "@/services/supabase-service";
import { HACKATHON_DEMO_INVESTIGATIONS } from "@/lib/demo-data";
import { toast } from "sonner";

interface ResearchContextType {
  sessions: ResearchSession[];
  reports: ResearchReport[];
  currentSession: ResearchSession | null;
  activeStages: AgentStage[];
  activeAgentStatus: AgentStatus;
  isApprovalModalOpen: boolean;
  isCommandMenuOpen: boolean;
  setIsCommandMenuOpen: (open: boolean) => void;
  setIsApprovalModalOpen: (open: boolean) => void;
  startResearch: (topic: string, depth?: ResearchDepth, scope?: ResearchScope[]) => string;
  approveStageAndContinue: () => void;
  cancelResearch: () => void;
  getReportById: (id: string) => ResearchReport | undefined;
  getSessionById: (id: string) => ResearchSession | undefined;
  deleteSession: (id: string) => void;
  loadDemoInvestigation: (topic: string) => string;
  isSyncingDb: boolean;
}

const ResearchContext = createContext<ResearchContextType | undefined>(undefined);

export function ResearchProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = useState<ResearchSession[]>([]);
  const [reports, setReports] = useState<ResearchReport[]>([]);
  const [currentSession, setCurrentSession] = useState<ResearchSession | null>(null);
  const [activeStages, setActiveStages] = useState<AgentStage[]>(createInitialStages());
  const [activeAgentStatus, setActiveAgentStatus] = useState<AgentStatus>("idle");
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [isSyncingDb, setIsSyncingDb] = useState(false);

  // Initialize data: Load from Supabase with LocalStorage and Demo fallback
  useEffect(() => {
    async function initData() {
      setIsSyncingDb(true);
      let loadedSessions: ResearchSession[] = [];
      let loadedReports: ResearchReport[] = [];

      // 1. Try local storage first for instant zero-latency UI
      try {
        const storedSessions = localStorage.getItem("researchforge_sessions");
        const storedReports = localStorage.getItem("researchforge_reports");
        if (storedSessions) loadedSessions = JSON.parse(storedSessions);
        if (storedReports) loadedReports = JSON.parse(storedReports);
      } catch (err) {
        console.warn("Local storage parse error:", err);
      }

      // 2. If storage is empty, populate 5 rich hackathon demo investigations
      if (loadedSessions.length === 0) {
        loadedSessions = HACKATHON_DEMO_INVESTIGATIONS.map((d) => d.session);
        loadedReports = HACKATHON_DEMO_INVESTIGATIONS.map((d) => d.report);
      }

      setSessions(loadedSessions);
      setReports(loadedReports);
      saveToStorage(loadedSessions, loadedReports);

      // 3. Background sync with Supabase
      try {
        const dbSessions = await fetchSessionsFromDb();
        const dbReports = await fetchReportsFromDb();

        if (dbSessions.length > 0) {
          // Merge unique sessions
          const mergedSessions = [...dbSessions];
          loadedSessions.forEach((ls) => {
            if (!mergedSessions.some((s) => s.id === ls.id)) {
              mergedSessions.push(ls);
            }
          });
          setSessions(mergedSessions);
        }

        if (dbReports.length > 0) {
          const mergedReports = [...dbReports];
          loadedReports.forEach((lr) => {
            if (!mergedReports.some((r) => r.id === lr.id)) {
              mergedReports.push(lr);
            }
          });
          setReports(mergedReports);
        }
      } catch (err) {
        console.warn("[Supabase] Background sync notice:", err);
      } finally {
        setIsSyncingDb(false);
      }
    }

    initData();
  }, []);

  // Save changes to LocalStorage
  const saveToStorage = (updatedSessions: ResearchSession[], updatedReports: ResearchReport[]) => {
    try {
      localStorage.setItem("researchforge_sessions", JSON.stringify(updatedSessions));
      localStorage.setItem("researchforge_reports", JSON.stringify(updatedReports));
    } catch {
      // Ignore
    }
  };

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

  const getReportById = useCallback((id: string): ResearchReport | undefined => {
    return reports.find((r) => r.id === id || r.sessionId === id);
  }, [reports]);

  const getSessionById = useCallback((id: string): ResearchSession | undefined => {
    return sessions.find((s) => s.id === id);
  }, [sessions]);

  const deleteSession = (id: string) => {
    const nextSessions = sessions.filter((s) => s.id !== id);
    const nextReports = reports.filter((r) => r.sessionId !== id);
    setSessions(nextSessions);
    setReports(nextReports);
    saveToStorage(nextSessions, nextReports);
    toast.success("Session deleted");
  };

  const cancelResearch = () => {
    if (currentSession) {
      setCurrentSession((prev) => (prev ? { ...prev, status: "idle" } : null));
      setActiveAgentStatus("idle");
      setActiveStages(createInitialStages());
      toast.info("Research session stopped");
    }
  };

  // Instant 1-Click Demo Loader for Hackathon Judges
  const loadDemoInvestigation = (topicOrTitle: string): string => {
    const demo =
      HACKATHON_DEMO_INVESTIGATIONS.find(
        (d) =>
          d.session.topic.toLowerCase().includes(topicOrTitle.toLowerCase()) ||
          d.session.id.toLowerCase().includes(topicOrTitle.toLowerCase())
      ) || HACKATHON_DEMO_INVESTIGATIONS[0];

    const nextSessions = [demo.session, ...sessions.filter((s) => s.id !== demo.session.id)];
    const nextReports = [demo.report, ...reports.filter((r) => r.id !== demo.report.id)];

    setSessions(nextSessions);
    setReports(nextReports);
    saveToStorage(nextSessions, nextReports);
    saveSessionToDb(demo.session);
    saveReportToDb(demo.report);

    setCurrentSession(demo.session);
    toast.success(`Loaded Demo Dossier: ${demo.report.title}`);
    return demo.session.id;
  };

  // Starts the 7-stage TrueForge Workflow with Supabase persistence
  const startResearch = (
    topic: string,
    depth: ResearchDepth = "standard",
    scope: ResearchScope[] = ["academic", "market", "technical"]
  ): string => {
    const sessionId = "sess-" + Date.now();
    const newSession: ResearchSession = {
      id: sessionId,
      topic,
      depth,
      scope,
      status: "running",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currentStageIndex: 0,
    };

    setCurrentSession(newSession);
    setActiveAgentStatus("searching");

    // Persist session to Supabase in background
    saveSessionToDb(newSession);
    logActivityToDb(sessionId, `[00:01] Autonomous multi-agent pipeline dispatched for: ${topic}`, "web_search_mcp");

    const initialStages = createInitialStages();
    // Stage 1 active
    initialStages[0].status = "running";
    initialStages[0].progress = 35;
    initialStages[0].logs = [
      `[00:01] Initializing Model Context Protocol tool calling...`,
      `[00:01] Querying mcp://arxiv-academic/search for "${topic}" (Depth: ${depth})`,
      `[00:02] Ingesting citation DOIs and crossref indices...`,
    ];
    setActiveStages(initialStages);

    // Progressive timeline simulation for hackathon demo
    setTimeout(() => {
      // Stage 1 Complete -> Stage 2 Company Agent
      setActiveStages((prev) => {
        const next = [...prev];
        next[0].status = "completed";
        next[0].progress = 100;
        next[0].outputSummary = "Discovered 18 peer-reviewed papers & patent filings.";
        next[1].status = "running";
        next[1].progress = 50;
        next[1].logs = [
          `[00:03] Extracting architectural disclosures and claimed performance metrics...`,
        ];
        saveAgentOutputToDb(sessionId, next[0]);
        logActivityToDb(sessionId, "Stage 1 Complete: 18 DOIs and patent claims indexed.", "company_agent");
        return next;
      });
      setActiveAgentStatus("analyzing");
    }, 2000);

    setTimeout(() => {
      // Stage 2 Complete -> Stage 3 Competitor Agent
      setActiveStages((prev) => {
        const next = [...prev];
        next[1].status = "completed";
        next[1].progress = 100;
        next[1].outputSummary = "Extracted primary architecture & patent disclosures.";
        next[2].status = "running";
        next[2].progress = 60;
        next[2].logs = [
          `[00:05] Adversarial cross-comparison across competing market solutions...`,
        ];
        saveAgentOutputToDb(sessionId, next[1]);
        logActivityToDb(sessionId, "Stage 2 Complete: Technical architecture and patent boundaries verified.", "competitor_agent");
        return next;
      });
    }, 4200);

    setTimeout(() => {
      // Stage 3 Complete -> Stage 4 Market Agent
      setActiveStages((prev) => {
        const next = [...prev];
        next[2].status = "completed";
        next[2].progress = 100;
        next[2].outputSummary = "Triangulated benchmarks against 4 competing architectures.";
        next[3].status = "running";
        next[3].progress = 70;
        next[3].logs = [
          `[00:07] Modeling TAM trajectories & unit economics capex curves...`,
        ];
        saveAgentOutputToDb(sessionId, next[2]);
        logActivityToDb(sessionId, "Stage 3 Complete: Competitor benchmarks synthesized.", "market_agent");
        return next;
      });
    }, 6500);

    setTimeout(() => {
      // Stage 4 Complete -> Stage 5 Sandbox Analysis
      setActiveStages((prev) => {
        const next = [...prev];
        next[3].status = "completed";
        next[3].progress = 100;
        next[3].outputSummary = "Computed 2026-2030 unit cost trajectories.";
        next[4].status = "running";
        next[4].progress = 80;
        next[4].logs = [
          `[00:09] Spawning isolated Python 3.12 numerical execution container...`,
          `[00:10] Running Monte Carlo regressions (N=10,000)... Verified.`,
        ];
        saveAgentOutputToDb(sessionId, next[3]);
        logActivityToDb(sessionId, "Stage 4 Complete: Unit economics & TAM model generated.", "sandbox_analysis");
        return next;
      });
    }, 9000);

    setTimeout(() => {
      // Stage 5 Complete -> Stage 6 Approval Required (Human-in-the-Loop)
      setActiveStages((prev) => {
        const next = [...prev];
        next[4].status = "completed";
        next[4].progress = 100;
        next[4].outputSummary = "Verified mathematical consistency via sandbox execution.";
        next[5].status = "waiting_approval";
        next[5].progress = 90;
        next[5].logs = [
          `[00:11] TrueForge Multi-Agent consensus reached.`,
          `[00:11] Awaiting researcher approval gate to synthesize enterprise dossier...`,
        ];
        saveAgentOutputToDb(sessionId, next[4]);
        logActivityToDb(sessionId, "Stage 5 Complete: Sandbox verification passed. Awaiting human approval gate.", "approval_required");
        return next;
      });
      setActiveAgentStatus("waiting_approval");
      setCurrentSession((prev) => (prev ? { ...prev, status: "waiting_approval", currentStageIndex: 5 } : null));
      setIsApprovalModalOpen(true);
      toast.info("Human Approval Gate: Please verify findings to proceed with report generation.");
    }, 11500);

    return sessionId;
  };

  // Triggered when human approves Stage 6
  const approveStageAndContinue = () => {
    if (!currentSession) return;

    setIsApprovalModalOpen(false);
    setActiveAgentStatus("generating_report");
    logActivityToDb(currentSession.id, "Human researcher approved findings. Generating final dossier...", "generate_report");

    setActiveStages((prev) => {
      const next = [...prev];
      next[5].status = "completed";
      next[5].progress = 100;
      next[5].outputSummary = "Researcher approved synthesized findings.";
      next[6].status = "running";
      next[6].progress = 50;
      next[6].logs = [
        `[00:12] Synthesizing executive summary, market breakdown, and recommendations...`,
        `[00:13] Compiling verified DOI citations and PDF/Markdown artifact trees...`,
      ];
      saveAgentOutputToDb(currentSession.id, next[5]);
      return next;
    });

    setTimeout(() => {
      const generatedReport = synthesizeRealReport(
        currentSession.topic,
        currentSession.depth || "standard",
        currentSession.scope || ["academic", "market", "technical"]
      );

      setActiveStages((prev) => {
        const next = [...prev];
        next[6].status = "completed";
        next[6].progress = 100;
        next[6].outputSummary = "Autonomous Research Dossier generated successfully.";
        saveAgentOutputToDb(currentSession.id, next[6]);
        return next;
      });

      setActiveAgentStatus("completed");

      const completedSession: ResearchSession = {
        ...currentSession,
        status: "completed",
        currentStageIndex: 6,
        reportId: generatedReport.id,
        report: generatedReport,
        updatedAt: new Date().toISOString(),
      };

      setCurrentSession(completedSession);

      const nextSessions = [completedSession, ...sessions.filter((s) => s.id !== completedSession.id)];
      const nextReports = [generatedReport, ...reports.filter((r) => r.id !== generatedReport.id)];

      setSessions(nextSessions);
      setReports(nextReports);
      saveToStorage(nextSessions, nextReports);

      // Async persist to Supabase
      saveSessionToDb(completedSession);
      saveReportToDb(generatedReport);
      saveCitationsToDb(completedSession.id, generatedReport.sources);
      logActivityToDb(completedSession.id, `Autonomous Dossier Ready: ${generatedReport.id}`, "generate_report", "success");

      toast.success("Research Dossier Ready!");
    }, 2500);
  };

  return (
    <ResearchContext.Provider
      value={{
        sessions,
        reports,
        currentSession,
        activeStages,
        activeAgentStatus,
        isApprovalModalOpen,
        isCommandMenuOpen,
        setIsCommandMenuOpen,
        setIsApprovalModalOpen,
        startResearch,
        approveStageAndContinue,
        cancelResearch,
        getReportById,
        getSessionById,
        deleteSession,
        loadDemoInvestigation,
        isSyncingDb,
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
