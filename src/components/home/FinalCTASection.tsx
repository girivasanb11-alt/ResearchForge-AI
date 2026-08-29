"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTASection() {
  return (
    <section className="relative z-20 py-32 bg-[#050816] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8A5BFF] opacity-[0.07] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-extrabold text-white mb-8 tracking-tighter"
        >
          Start Your <span className="bg-gradient-to-r from-[#00D8FF] via-[#00BFFF] to-[#8A5BFF] bg-clip-text text-transparent">Autonomous</span> Journey
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Deploy AI agents that research, analyze, validate, and generate professional reports in minutes.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/auth/signup">
            <Button
              size="lg"
              className="relative group h-14 px-8 rounded-2xl font-bold text-base border border-white/10 bg-white/10 hover:bg-white/20 hover:border-white/20 backdrop-blur-xl text-white shadow-2xl transition-all overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#5A3BFF] to-[#00D8FF] opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-2">
                Start Research
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
          
          <Link href="/dashboard">
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 rounded-2xl font-semibold text-base border-[#8A5BFF]/30 bg-[#0A1024] hover:bg-[#8A5BFF]/10 text-white transition-colors"
            >
              Launch Agent Desk
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
