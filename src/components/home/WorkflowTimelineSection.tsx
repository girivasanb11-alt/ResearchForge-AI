"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, BrainCircuit, Globe, Users, Code, CheckCircle, FileText } from "lucide-react";

const steps = [
  { icon: Search, title: "User Query", desc: "Define your research objective." },
  { icon: BrainCircuit, title: "AI Research Agent", desc: "Agent plans the extraction strategy." },
  { icon: Globe, title: "Web Search MCP", desc: "Execution of targeted web scraping." },
  { icon: Users, title: "Multi-Agent Analysis", desc: "Swarm synthesizes the raw data." },
  { icon: Code, title: "Sandbox Processing", desc: "Python analysis on datasets." },
  { icon: CheckCircle, title: "Human Approval", desc: "You verify and approve the findings." },
  { icon: FileText, title: "Final Report", desc: "Publication-ready Markdown/PDF." }
];

export function WorkflowTimelineSection() {
  return (
    <section className="relative z-20 py-32 bg-[#050816]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            The Autonomous <span className="text-[#38BDF8]">Workflow</span>
          </motion.h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute top-0 bottom-0 left-[27px] md:left-1/2 w-0.5 bg-gradient-to-b from-[#8A5BFF] via-[#06B6D4] to-[#7C3AED] opacity-30 md:-translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex items-center ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Center Node */}
                <div className="absolute left-0 md:left-1/2 w-14 h-14 bg-[#0A1024] border-2 border-[#38BDF8] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.3)] md:-translate-x-1/2 z-10">
                  <step.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content Card */}
                <div className="ml-20 md:ml-0 w-full md:w-1/2 p-6 md:px-12">
                  <div className={`bg-[#0A1024]/80 backdrop-blur-xl border border-white/5 p-8 rounded-3xl hover:border-[#8A5BFF]/40 transition-colors ${idx % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                    <div className="text-[#38BDF8] text-sm font-bold mb-2 tracking-widest uppercase">Phase 0{idx + 1}</div>
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-slate-400">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
