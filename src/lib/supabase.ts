import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://phnwmqkiugriibzdbvau.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBobndtcWtpdWdyaWliZHpidmF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxMDIyNTUsImV4cCI6MjEwMzY3ODI1NX0.vaoifP8r5-1cB6fKcb4pzyyA9KhxRSSQIBd16ASQOHk";

let supabaseClient: SupabaseClient;

try {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
} catch (error) {
  console.warn("[Supabase] Failed to initialize Supabase client, using fallback:", error);
  supabaseClient = createClient("https://placeholder.supabase.co", "placeholder-key");
}

export const supabase = supabaseClient;

/**
 * SQL Schema for ResearchForge AI Supabase Database
 *
 * Tables:
 * 1. research_sessions
 * 2. agent_outputs
 * 3. citations
 * 4. activity_logs
 * 5. research_reports
 */
export const SUPABASE_SQL_SCHEMA = `
-- 1. Research Sessions Table
CREATE TABLE IF NOT EXISTS research_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  query TEXT NOT NULL,
  depth TEXT DEFAULT 'standard',
  scope JSONB DEFAULT '["academic", "market", "technical"]'::jsonb,
  status TEXT DEFAULT 'running',
  current_stage_index INT DEFAULT 0,
  report_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Agent Stage Outputs Table
CREATE TABLE IF NOT EXISTS agent_outputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  agent_name TEXT NOT NULL,
  agent_role TEXT,
  stage_id TEXT NOT NULL,
  output TEXT,
  status TEXT DEFAULT 'completed',
  progress INT DEFAULT 100,
  logs JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Citations & Verified Sources Table
CREATE TABLE IF NOT EXISTS citations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT,
  domain TEXT,
  source_type TEXT DEFAULT 'academic',
  authors JSONB DEFAULT '[]'::jsonb,
  published_date TEXT,
  relevance_score INT DEFAULT 95,
  snippet TEXT,
  doi TEXT,
  verified BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Realtime Activity Logs Table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  stage_id TEXT,
  message TEXT NOT NULL,
  level TEXT DEFAULT 'info',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Research Reports Dossiers Table
CREATE TABLE IF NOT EXISTS research_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id TEXT UNIQUE NOT NULL,
  session_id TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  query TEXT NOT NULL,
  executive_summary TEXT,
  market_analysis TEXT,
  competitor_analysis TEXT,
  key_insights JSONB DEFAULT '[]'::jsonb,
  recommendations JSONB DEFAULT '[]'::jsonb,
  sections JSONB DEFAULT '[]'::jsonb,
  sources JSONB DEFAULT '[]'::jsonb,
  confidence_score INT DEFAULT 95,
  read_time_minutes INT DEFAULT 5,
  depth TEXT DEFAULT 'standard',
  scope JSONB DEFAULT '["academic", "market", "technical"]'::jsonb,
  stats JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);
`;
