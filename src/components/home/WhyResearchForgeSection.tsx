"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "10x", label: "Faster Research", suffix: "+" },
  { value: "50k", label: "Reports Generated", suffix: "+" },
  { value: "99%", label: "Accuracy Rate", suffix: "%" },
  { value: "2M", label: "Hours Saved", suffix: "+" }
];

export function WhyResearchForgeSection() {
  return (
    <section className="relative z-20 py-32 bg-transparent border-y border-white/5">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Value Prop */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight"
            >
              Why <span className="bg-gradient-to-r from-[#00D8FF] to-[#8A5BFF] bg-clip-text text-transparent">ResearchForge</span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-400 mb-8 leading-relaxed"
            >
              We don't just provide an LLM chat interface. We provide a full autonomous workforce.
              Our specialized agent swarms communicate, plan, and verify each other's work before it ever reaches your desk.
            </motion.p>
            
            <motion.ul 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {["Enterprise Security & Data Isolation", "Multi-Agent Verifiable Fact Checking", "Extensible MCP Integration", "Publication-Ready Outputs"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white font-medium">
                  <div className="w-6 h-6 rounded-full bg-[#8A5BFF]/20 flex items-center justify-center text-[#38BDF8]">✓</div>
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right: Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#0A1024] border border-white/10 p-8 rounded-3xl text-center shadow-[0_0_30px_rgba(138,91,255,0.05)]"
              >
                <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-[#38BDF8] uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
