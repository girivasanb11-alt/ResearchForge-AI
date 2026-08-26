import React from "react";
import {
  ShieldCheck,
  GitCompare,
  Share2,
  FileCode2,
  Radio,
  Lock,
  ArrowUpRight,
  Database,
  Sparkles,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function FeatureGrid() {
  const features = [
    {
      icon: ShieldCheck,
      badge: "Zero Hallucination",
      title: "Deterministic Citation Grounding",
      description:
        "Every generated statement is mapped to specific paragraph-level DOI anchors, peer-reviewed tables, and verified patent claims.",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      icon: GitCompare,
      badge: "Cross-Checking",
      title: "Scientific Contradiction Engine",
      description:
        "Automatically identifies where top laboratories diverge, isolating experimental condition variances (e.g. pressure, temperature, sample size).",
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      icon: Share2,
      badge: "Interactive Graph",
      title: "Dynamic Knowledge Graphs",
      description:
        "Visualizes complex multi-dimensional concept clusters, entity relationships, and author citation networks with interactive node physics.",
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      icon: Radio,
      badge: "Audio AI",
      title: "Executive Audio Briefings",
      description:
        "Converts 30-page complex technical reports into calibrated 4-minute conversational podcast briefings for on-the-go leadership review.",
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      icon: FileCode2,
      badge: "Universal Export",
      title: "Publication & LaTeX Exports",
      description:
        "One-click export to print-styled PDF dossiers, clean Markdown, BibTeX reference files, Notion synchronization, and raw JSON.",
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      icon: Lock,
      badge: "Enterprise Security",
      title: "Air-Gapped VPC & Zero Retention",
      description:
        "Custom deployment on private Azure/AWS instances with confidential computing enclaves and zero prompt caching guarantees.",
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
  ];

  return (
    <section className="py-20 border-t border-border/60 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="purple" className="font-mono text-xs">
            Engine Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Engineered for Empirical Rigor
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Built specifically to solve the shallow search, citation hallucination, and lack of structured synthesis in mainstream AI.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group relative rounded-2xl border border-border/80 bg-card/60 hover:bg-card hover:border-border transition-all duration-300 p-6 flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl border ${feature.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary" className="text-[10px] font-mono">
                      {feature.badge}
                    </Badge>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-indigo-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                  <span>Explore Protocol</span>
                  <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
