"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Network, Search, Bot, Building2, TrendingUp, 
  Target, Zap, FileText, UserCheck, Terminal, 
  Wrench, FileOutput
} from "lucide-react";

const features = [
  { icon: Network, title: "Multi-Agent Research Engine", desc: "Deploy entire swarms of specialized AI agents working in parallel." },
  { icon: Search, title: "Real-Time Web Research", desc: "Agents autonomously browse and synthesize live data from the web." },
  { icon: Bot, title: "Autonomous Agents", desc: "Self-correcting AI that plans, executes, and validates its own research." },
  { icon: Building2, title: "Company Intelligence", desc: "Deep-dive analysis of organizational structures and financials." },
  { icon: TrendingUp, title: "Market Analysis", desc: "Predictive trend analysis and macro-economic research." },
  { icon: Target, title: "Competitor Tracking", desc: "Automated monitoring of competitor movements and product updates." },
  { icon: Zap, title: "Research Automation", desc: "Convert days of manual research into minutes of automated workflows." },
  { icon: FileText, title: "AI Report Generation", desc: "Export publication-ready Markdown and PDF research reports." },
  { icon: UserCheck, title: "Human Approval", desc: "Built-in review gates ensuring you have the final say on all outputs." },
  { icon: Terminal, title: "Python Sandbox", desc: "Secure isolated environments for agents to execute data analysis scripts." },
  { icon: Wrench, title: "MCP Tool Integration", desc: "Extensible tool system allowing agents to connect to your internal APIs." },
  { icon: FileOutput, title: "PDF Export System", desc: "Instant formatting of complex data into beautiful, readable documents." }
];

export function FeatureGridSection() {
  return (
    <section className="relative z-20 py-32 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            Enterprise Grade <span className="bg-gradient-to-r from-[#8A5BFF] to-[#00D8FF] bg-clip-text text-transparent">Capabilities</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            A comprehensive suite of autonomous tools designed for rigorous, verifiable, and lightning-fast deep research.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className="group relative p-8 rounded-3xl bg-[#0A1024]/60 border border-white/5 hover:border-[#8A5BFF]/30 backdrop-blur-sm transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#8A5BFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#8A5BFF]/10 border border-[#8A5BFF]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <feat.icon className="w-6 h-6 text-[#00D8FF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
