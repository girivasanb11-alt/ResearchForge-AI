"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function DashboardVisualizerSection() {
  return (
    <section className="relative z-20 py-20 bg-[#020617] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            Built for <span className="text-[#8A5BFF]">Scale</span>
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 100, rotateX: 20 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, type: "spring", bounce: 0.2 }}
          style={{ perspective: "1000px" }}
          className="relative mx-auto rounded-xl border border-white/10 shadow-[0_0_100px_rgba(138,91,255,0.15)] bg-[#0A1024] p-2"
        >
          {/* Mac window header dots */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          
          <div className="relative w-full aspect-[16/10] bg-[#020617] rounded-b-lg overflow-hidden">
             {/* Note: In a real environment we'd use layout="fill", but here we'll use a direct img for simplicity or next/image */}
             <Image 
               src="/images/mockups/dashboard.jpg" 
               alt="ResearchForge AI Dashboard" 
               fill 
               className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-700" 
             />
          </div>

          {/* Ambient Glow behind image */}
          <div className="absolute -inset-10 bg-gradient-to-r from-[#8A5BFF]/20 to-[#00D8FF]/20 blur-3xl -z-10 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
