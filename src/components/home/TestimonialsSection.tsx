"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "ResearchForge reduced our market analysis cycles from three weeks to 45 minutes. The agent swarms are terrifyingly precise.",
    author: "Dr. Sarah Chen",
    role: "VP of Research, Nexus Capital",
    company: "Nexus Capital"
  },
  {
    quote: "The ability to deploy an autonomous web scraper that cross-references live competitor data and outputs a polished PDF is revolutionary.",
    author: "James Harrington",
    role: "Chief Strategy Officer",
    company: "Apex Tech"
  },
  {
    quote: "SOC2 compliance natively built into the sandbox means we can finally run sensitive proprietary models without compliance bottlenecks.",
    author: "Elena Rodriguez",
    role: "Director of AI",
    company: "Synthetica Labs"
  }
];

export function TestimonialsSection() {
  return (
    <section className="relative z-20 py-32 bg-transparent overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            Trusted by <span className="bg-gradient-to-r from-[#1D7CFF] to-[#A855F7] bg-clip-text text-transparent">Industry Leaders</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative p-8 rounded-3xl bg-[#0A1024]/40 border border-white/5 hover:border-[#8B5CF6]/40 backdrop-blur-md transition-all"
            >
              <Quote className="w-10 h-10 text-[#1D7CFF]/40 mb-6 group-hover:text-[#8B5CF6] transition-colors duration-500" />
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                "{test.quote}"
              </p>
              <div>
                <div className="text-white font-bold">{test.author}</div>
                <div className="text-[#1D7CFF] text-sm font-medium mt-1">{test.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
