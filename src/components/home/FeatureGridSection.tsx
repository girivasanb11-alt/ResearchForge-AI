"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Network, Search, UserCheck, Terminal, 
  Wrench, FileOutput, ShieldCheck, CheckCircle,
  Database, LineChart, Brain, BookOpen
} from "lucide-react";

const features = [
  { icon: Network, title: "Multi-Agent Research Teams", desc: "Deploy entire swarms of specialized AI agents working in parallel." },
  { icon: Wrench, title: "MCP Tool Integrations", desc: "Extensible tool system allowing agents to connect to your internal APIs." },
  { icon: Terminal, title: "Python Sandbox Execution", desc: "Secure isolated environments for agents to execute data analysis scripts." },
  { icon: UserCheck, title: "Human Approval Workflow", desc: "Built-in review gates ensuring you have the final say on all outputs." },
  { icon: CheckCircle, title: "Source Verification", desc: "Automated fact-checking and cross-referencing against primary sources." },
  { icon: BookOpen, title: "Citation Tracking", desc: "Every data point is strictly linked to its origin document or URL." },
  { icon: FileOutput, title: "PDF Report Generation", desc: "Instant formatting of complex data into beautiful, readable documents." },
  { icon: Search, title: "Real-Time Intelligence", desc: "Agents autonomously browse and synthesize live data from the web." },
  { icon: ShieldCheck, title: "Enterprise Security", desc: "SOC2-ready infrastructure with isolated agent runtimes and strict boundaries." },
  { icon: Database, title: "Knowledge Graph Synthesis", desc: "Connects disparate data points into a cohesive understanding of a market." },
  { icon: LineChart, title: "Automated Market Analysis", desc: "Predictive trend analysis and macro-economic research automation." },
  { icon: Brain, title: "Research Memory", desc: "Agents remember past projects, improving context for future synthesis." }
];

// Helper component for 3D Tilt
function TiltCard({ children, delay }: { children: React.ReactNode, delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth the motion values for that premium Apple feel
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  // Map mouse movement to subtle rotations (max 4 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="group relative p-8 rounded-3xl bg-[#0A1024]/40 border border-white/5 hover:border-[#1D7CFF]/30 backdrop-blur-md transition-colors overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

export function FeatureGridSection() {
  return (
    <section className="relative z-20 py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            Enterprise Grade <span className="bg-gradient-to-r from-[#1D7CFF] to-[#A855F7] bg-clip-text text-transparent">Capabilities</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
          {features.map((feat, idx) => (
            <TiltCard key={idx} delay={idx * 0.05}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#1D7CFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: "translateZ(10px)" }} />
              
              <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
                <div className="w-12 h-12 rounded-xl bg-[#1D7CFF]/10 border border-[#1D7CFF]/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(29,124,255,0.4)] transition-all duration-500">
                  <feat.icon className="w-6 h-6 text-[#1D7CFF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
