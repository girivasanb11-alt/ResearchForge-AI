import { supabase } from "@/lib/supabase";
import { ResearchSession, ResearchReport, CitationSource } from "@/types/research";
import { AgentStage } from "@/types/agents";

export interface ActivityLogEntry {
  id?: string;
  sessionId: string;
  stageId?: string;
  message: string;
  level?: "info" | "success" | "warn" | "error";
  createdAt?: string;
}

/**
 * Saves or updates a research session in Supabase.
 */
export async function saveSessionToDb(session: ResearchSession): Promise<boolean> {
  try {
    const { error } = await supabase.from("research_sessions").upsert(
      {
        session_id: session.id,
        title: session.topic,
        query: session.topic,
        depth: session.depth || "standard",
        scope: session.scope || ["academic", "market", "technical"],
        status: session.status,
        current_stage_index: session.currentStageIndex ?? 0,
        report_id: session.reportId || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "session_id" }
    );

    if (error) {
      console.warn("[Supabase] Failed to upsert session, local state active:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[Supabase] Network or schema error when saving session:", err);
    return false;
  }
}

/**
 * Fetches all sessions from Supabase.
 */
export async function fetchSessionsFromDb(): Promise<ResearchSession[]> {
  try {
    const { data, error } = await supabase
      .from("research_sessions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      return [];
    }

    return data.map((row) => ({
      id: row.session_id || row.id,
      topic: row.title || row.query,
      depth: row.depth || "standard",
      scope: row.scope || ["academic", "market", "technical"],
      status: row.status || "completed",
      currentStageIndex: row.current_stage_index || 0,
      reportId: row.report_id || undefined,
      createdAt: row.created_at,
      updatedAt: row.updated_at || row.created_at,
    }));
  } catch (err) {
    console.warn("[Supabase] Failed to fetch sessions:", err);
    return [];
  }
}

/**
 * Saves an agent stage output and logs to Supabase.
 */
export async function saveAgentOutputToDb(
  sessionId: string,
  stage: AgentStage
): Promise<boolean> {
  try {
    const { error } = await supabase.from("agent_outputs").insert({
      session_id: sessionId,
      agent_name: stage.name,
      agent_role: stage.agentRole,
      stage_id: stage.id,
      output: stage.outputSummary || "",
      status: stage.status,
      progress: stage.progress,
      logs: stage.logs || [],
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.warn("[Supabase] Could not insert agent output:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[Supabase] Agent output save error:", err);
    return false;
  }
}

/**
 * Saves citations and verified sources into Supabase.
 */
export async function saveCitationsToDb(
  sessionId: string,
  sources: CitationSource[]
): Promise<boolean> {
  if (!sources || sources.length === 0) return true;

  try {
    const rows = sources.map((src) => ({
      session_id: sessionId,
      title: src.title,
      url: src.url,
      domain: src.domain,
      source_type: src.type,
      authors: src.authors || [],
      published_date: src.publishedDate || null,
      relevance_score: src.relevanceScore || 95,
      snippet: src.snippet || "",
      doi: src.doi || null,
      verified: src.verified ?? true,
      created_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("citations").insert(rows);
    if (error) {
      console.warn("[Supabase] Could not insert citations:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[Supabase] Citations save error:", err);
    return false;
  }
}

/**
 * Logs a live agent activity event to Supabase.
 */
export async function logActivityToDb(
  sessionId: string,
  message: string,
  stageId?: string,
  level: "info" | "success" | "warn" | "error" = "info"
): Promise<boolean> {
  try {
    const { error } = await supabase.from("activity_logs").insert({
      session_id: sessionId,
      stage_id: stageId || null,
      message,
      level,
      created_at: new Date().toISOString(),
    });

    if (error) {
      // Quiet fail if table not created
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Saves a synthesized Research Report to Supabase.
 */
export async function saveReportToDb(report: ResearchReport): Promise<boolean> {
  try {
    const { error } = await supabase.from("research_reports").upsert(
      {
        report_id: report.id,
        session_id: report.sessionId,
        title: report.title,
        subtitle: report.subtitle,
        query: report.query,
        executive_summary: report.executiveSummary,
        market_analysis: report.marketAnalysis,
        competitor_analysis: report.competitorAnalysis,
        key_insights: report.keyInsights || [],
        recommendations: report.recommendations || [],
        sections: report.sections || [],
        sources: report.sources || [],
        confidence_score: report.confidenceScore || 95,
        read_time_minutes: report.readTimeMinutes || 5,
        depth: report.depth || "standard",
        scope: report.scope || ["academic", "market", "technical"],
        stats: report.stats || {},
        created_at: report.createdAt || new Date().toISOString(),
      },
      { onConflict: "report_id" }
    );

    if (error) {
      console.warn("[Supabase] Could not upsert research report:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[Supabase] Report save error:", err);
    return false;
  }
}

/**
 * Fetches all reports from Supabase.
 */
export async function fetchReportsFromDb(): Promise<ResearchReport[]> {
  try {
    const { data, error } = await supabase
      .from("research_reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      return [];
    }

    return data.map((row) => ({
      id: row.report_id || row.id,
      sessionId: row.session_id,
      title: row.title,
      subtitle: row.subtitle,
      query: row.query,
      executiveSummary: row.executive_summary,
      marketAnalysis: row.market_analysis,
      competitorAnalysis: row.competitor_analysis,
      keyInsights: row.key_insights || [],
      recommendations: row.recommendations || [],
      sections: row.sections || [],
      sources: row.sources || [],
      confidenceScore: row.confidence_score || 95,
      readTimeMinutes: row.read_time_minutes || 5,
      depth: row.depth || "standard",
      scope: row.scope || ["academic", "market", "technical"],
      stats: row.stats || {},
      createdAt: row.created_at,
    }));
  } catch (err) {
    console.warn("[Supabase] Failed to fetch reports:", err);
    return [];
  }
}

/**
 * Subscribes to real-time activity logs for an active research session.
 */
export function subscribeToSessionLogs(
  sessionId: string,
  onNewLog: (log: ActivityLogEntry) => void
) {
  try {
    return supabase
      .channel(`session_logs_${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "activity_logs",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          if (payload.new) {
            onNewLog({
              id: payload.new.id,
              sessionId: payload.new.session_id,
              stageId: payload.new.stage_id,
              message: payload.new.message,
              level: payload.new.level,
              createdAt: payload.new.created_at,
            });
          }
        }
      )
      .subscribe();
  } catch {
    return null;
  }
}
