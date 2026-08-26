"use client";

import React, { useState } from "react";
import {
  Send,
  X,
  Bot,
  User,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage, ResearchReport } from "@/lib/types";

interface ReportChatSidebarProps {
  report: ResearchReport;
  isOpen: boolean;
  onClose: () => void;
}

export function ReportChatSidebar({ report, isOpen, onClose }: ReportChatSidebarProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      role: "assistant",
      content: `Hello! I am your ResearchForge Copilot for this dossier on **"${report.title}"**. I have indexed all ${report.stats.sourcesCited} primary citations and empirical models. How can I assist your deep dive?`,
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    "What are the main patent risks for sulfide electrolytes?",
    "Explain the 40% capex reduction from dry electrode processing.",
    "Which automotive OEMs have committed to 2027 roadmaps?",
    "Compare room-temp conductivity of Li6PS5Cl vs LLZO.",
  ];

  const handleSend = (userText?: string) => {
    const queryText = userText || input;
    if (!queryText.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: "user-" + Date.now(),
      role: "user",
      content: queryText,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI grounded response
    setTimeout(() => {
      let botResponse = "";
      let sourceCitations: string[] = ["src-1", "src-2"];

      if (queryText.toLowerCase().includes("patent") || queryText.toLowerCase().includes("risk")) {
        botResponse = `Based on US Patent **US11942810B2** (QuantumScape IP portfolio) and Nature Materials disclosures, the core IP risks center around solvent-free fibrillated PTFE binder processing and atomic-layer interface passivation. Toyota and QuantumScape hold the highest density of fundamental patent claims covering roll-to-roll separator pressing.`;
        sourceCitations = ["src-4", "src-5"];
      } else if (queryText.toLowerCase().includes("capex") || queryText.toLowerCase().includes("dry")) {
        botResponse = `The 40% Capex reduction is achieved by eliminating 70-meter NMP solvent slurry drying ovens and condensation recovery scrubbers. This shrinks gigafactory footprint by 45% and reduces energy consumption by ~3.2 kWh per produced cell.`;
        sourceCitations = ["src-2", "src-4"];
      } else if (queryText.toLowerCase().includes("oem") || queryText.toLowerCase().includes("2027") || queryText.toLowerCase().includes("timeline")) {
        botResponse = `Toyota (with Idemitsu Kosan), BMW, and Mercedes-Benz (partnered with Factorial) have scheduled volume pilot vehicle integration tests starting in late 2026, leading to 2027–2028 commercial market availability for premium vehicle platforms.`;
        sourceCitations = ["src-2", "src-5"];
      } else {
        botResponse = `Empirical evaluation across the 48 cited publications shows that sulfide-based solid electrolytes (Li₆PS₅Cl) achieve higher room-temperature ionic conductivity (>12 mS/cm) than oxide LLZO (~6.8 mS/cm), making sulfides the leading candidate for high-rate automotive applications under 5 MPa stack pressure.`;
        sourceCitations = ["src-1", "src-3"];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: "bot-" + Date.now(),
          role: "assistant",
          content: botResponse,
          timestamp: "Just now",
          sources: sourceCitations,
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-card/95 border-l border-border shadow-2xl backdrop-blur-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Drawer Header */}
      <div className="p-4 border-b border-border/80 flex items-center justify-between bg-secondary/40">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-foreground">AI Dossier Copilot</h3>
            <div className="text-[10px] font-mono text-emerald-400">● Grounded in 48 verified citations</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="h-7 w-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 leading-relaxed ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white font-medium"
                  : "bg-secondary/60 border border-border/80 text-foreground/90 font-sans"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>

              {msg.sources && msg.sources.length > 0 && (
                <div className="pt-2 border-t border-border/40 flex items-center gap-1.5 font-mono text-[10px] text-indigo-300">
                  <BookOpen className="h-3 w-3" />
                  <span>Sources:</span>
                  {msg.sources.map((s) => (
                    <span key={s} className="px-1 py-0.5 bg-indigo-500/20 rounded">
                      [{s.replace("src-", "")}]
                    </span>
                  ))}
                </div>
              )}
            </div>

            {msg.role === "user" && (
              <div className="h-7 w-7 rounded-lg bg-zinc-700 text-zinc-200 flex items-center justify-center shrink-0 mt-0.5">
                <User className="h-3.5 w-3.5" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-muted-foreground font-mono text-[11px] p-2">
            <span className="h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
            <span>Copilot cross-referencing citations...</span>
          </div>
        )}
      </div>

      {/* Suggested prompts pills */}
      <div className="p-3 border-t border-border/50 bg-secondary/20 space-y-1.5">
        <div className="text-[10px] font-mono text-muted-foreground uppercase">Suggested Follow-ups:</div>
        <div className="flex flex-wrap gap-1">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[10px] px-2 py-1 rounded-md bg-secondary/70 hover:bg-indigo-500/20 text-muted-foreground hover:text-indigo-300 border border-border/50 transition-colors text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div className="p-3 border-t border-border bg-card">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about this dossier..."
            className="flex-1 rounded-xl border border-border bg-secondary/40 px-3.5 py-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500 text-foreground"
          />
          <Button type="submit" variant="glow" size="sm" className="h-8 px-3 font-semibold">
            <Send className="h-3.5 w-3.5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
