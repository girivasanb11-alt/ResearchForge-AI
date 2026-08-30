"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Globe2, Bot, Clock, FileCheck } from "lucide-react";

// Simple counter component
function AnimatedCounter({ end, duration = 2, suffix = "" }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60); // Assuming 60fps
      
      const updateCounter = () => {
        start += increment;
        if (start < end) {
          setCount(Math.ceil(start));
          requestAnimationFrame(updateCounter);
        } else {
          setCount(end);
        }
      };
      
      updateCounter();
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="text-4xl font-extrabold text-white">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function TrustSection() {
  const stats = [
    {
      id: "verified-sources",
      icon: Globe2,
      value: 120,
      suffix: "M+",
      label: "Verified Sources",
      desc: "Live datasets synthesized in real-time."
    },
    {
      id: "agent-tasks",
      icon: Bot,
      value: 4.5,
      suffix: "M+",
      label: "Agent Tasks",
      desc: "Complex workflows autonomously completed."
    },
    {
      id: "hours-saved",
      icon: Clock,
      value: 850,
      suffix: "k+",
      label: "Hours Saved",
      desc: "Human research hours automated this year."
    },
    {
      id: "accuracy",
      icon: FileCheck,
      value: 99.9,
      suffix: "%",
      label: "Citation Accuracy",
      desc: "Hallucination-free report generation."
    }
  ];

  return (
    <section className="relative z-20 py-24 bg-transparent border-t border-b border-white/5">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1D7CFF]/5 via-transparent to-[#A855F7]/5" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group relative p-8 rounded-3xl bg-[#0A1024]/40 border border-white/5 backdrop-blur-md flex flex-col items-center text-center overflow-hidden hover:border-[#1D7CFF]/30 transition-colors"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[#1D7CFF]/10 group-hover:border-[#1D7CFF]/30 group-hover:scale-110 transition-all duration-300">
                <stat.icon className="w-6 h-6 text-slate-300 group-hover:text-[#1D7CFF] transition-colors" />
              </div>
              
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              
              <h4 className="text-lg font-semibold text-slate-200 mt-2 mb-1">{stat.label}</h4>
              <p className="text-sm text-slate-400">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
