"use client";

import React from "react";
import { motion } from "framer-motion";
import { LineChart, Rocket, Crosshair, FileSignature, GraduationCap, Cpu, ArrowRight, ShieldAlert, PackageSearch } from "lucide-react";
import Link from "next/link";

const templates = [
  {
    id: "market-research",
    icon: LineChart,
    title: "Market Intelligence Report",
    desc: "Autonomous synthesis of TAM, SAM, SOM, and emerging market trends via live data pipelines.",
    color: "from-[#1D7CFF] to-[#8B5CF6]"
  },
  {
    id: "startup-analysis",
    icon: Rocket,
    title: "Startup Due Diligence",
    desc: "Deep-dive intelligence on funding rounds, tech stacks, and growth trajectories.",
    color: "from-[#8B5CF6] to-[#A855F7]"
  },
  {
    id: "competitive-intel",
    icon: Crosshair,
    title: "Competitor Analysis",
    desc: "Real-time threat modeling and feature parity tracking across industry competitors.",
    color: "from-[#A855F7] to-[#00A6FF]"
  },
  {
    id: "ai-industry",
    icon: Cpu,
    title: "AI Industry Research",
    desc: "Specialized workflows for LLM advancements, benchmark tracking, and hardware ecosystems.",
    color: "from-[#00A6FF] to-[#1D7CFF]"
  },
  {
    id: "patent-research",
    icon: FileSignature,
    title: "Patent Discovery",
    desc: "Semantic search across global patent databases to identify IP whitespace.",
    color: "from-[#1D7CFF] to-[#00D8FF]"
  },
  {
    id: "academic-research",
    icon: GraduationCap,
    title: "Scientific Literature Review",
    desc: "Peer-reviewed paper aggregation, citation tracing, and methodology synthesis.",
    color: "from-[#00D8FF] to-[#8B5CF6]"
  },
  {
    id: "financial-risk",
    icon: ShieldAlert,
    title: "Financial Risk Assessment",
    desc: "Automated analysis of SEC filings, market volatility, and macro-economic factors.",
    color: "from-[#8B5CF6] to-[#1D7CFF]"
  },
  {
    id: "product-research",
    icon: PackageSearch,
    title: "Product Research",
    desc: "Synthesize user reviews, product teardowns, and supply chain logistics instantly.",
    color: "from-[#A855F7] to-[#00D8FF]"
  }
];

export function TemplatesShowcaseSection() {
  return (
    <section className="relative z-20 py-32 bg-transparent overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#8A5BFF]/5 blur-[120px] pointer-events-none rounded-[100%]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#00D8FF] text-sm font-bold tracking-widest uppercase mb-3 flex items-center gap-2"
            >
              <div className="w-8 h-px bg-[#00D8FF]" />
              Accelerated Starting Points
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-white leading-tight"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                Premium
              </span>{" "}
              Templates
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              href="/dashboard"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-[#8A5BFF]/50 transition-all"
            >
              View All Workflows
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, idx) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <Link href={`/dashboard/sandbox?template=${template.id}`} className="block h-full">
                <div className="group relative h-full bg-[#0A1024]/60 backdrop-blur-md border border-white/5 rounded-3xl p-8 overflow-hidden hover:border-[#8A5BFF]/40 transition-colors duration-500">
                  
                  {/* Subtle hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${template.color} p-[1px] mb-6 shadow-xl`}>
                    <div className="w-full h-full bg-[#0A1024] rounded-2xl flex items-center justify-center">
                      <template.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00D8FF] transition-colors">
                    {template.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {template.desc}
                  </p>
                  
                  {/* Hover indicator */}
                  <div className="absolute bottom-8 right-8 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
