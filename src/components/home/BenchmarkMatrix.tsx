import React from "react";
import { Check, X, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BenchmarkMatrix() {
  const criteria = [
    {
      name: "Autonomous Multi-Agent Adversarial Loop",
      desc: "Decomposes inquiries and cross-verifies claims across independent agents",
      researchForge: true,
      chatgptDeep: "Partial (Single Chain)",
      perplexity: false,
      googleScholar: false,
    },
    {
      name: "Scientific Contradiction Engine",
      desc: "Isolates experimental disagreements and calculates scientific consensus ratios",
      researchForge: true,
      chatgptDeep: false,
      perplexity: false,
      googleScholar: false,
    },
    {
      name: "Deterministic DOI & BibTeX Anchoring",
      desc: "Direct paragraph-level citations with zero hallucinated author DOIs",
      researchForge: true,
      chatgptDeep: "Partial",
      perplexity: "Partial (Web URLs only)",
      googleScholar: true,
    },
    {
      name: "Interactive Dynamic Knowledge Graph",
      desc: "Interactive visual node-link clustering of interconnected concepts & entities",
      researchForge: true,
      chatgptDeep: false,
      perplexity: false,
      googleScholar: false,
    },
    {
      name: "Executive Audio Podcast Briefing",
      desc: "Converts multi-page dossiers into conversational multi-speaker audio summaries",
      researchForge: true,
      chatgptDeep: "External TTS only",
      perplexity: false,
      googleScholar: false,
    },
    {
      name: "Publication-Grade PDF & LaTeX Export",
      desc: "One-click styled academic briefing exports with integrated data charts",
      researchForge: true,
      chatgptDeep: "Plain text / Markdown",
      perplexity: "Markdown only",
      googleScholar: "BibTeX only",
    },
  ];

  return (
    <section className="py-20 border-t border-border/60 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="warning" className="font-mono text-xs">
            Empirical Comparison
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Benchmarked Against the Industry
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            How ResearchForge AI compares against traditional search engines and conversational LLMs.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-2xl border border-border/80 bg-card/60 overflow-hidden shadow-xl backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border/80 bg-secondary/50 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="p-4 sm:p-5 w-2/5">Capability & Protocol</th>
                  <th className="p-4 sm:p-5 text-indigo-400 font-bold bg-indigo-500/10 border-x border-indigo-500/20">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4" />
                      <span>ResearchForge AI</span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 text-muted-foreground">OpenAI Deep Research</th>
                  <th className="p-4 sm:p-5 text-muted-foreground">Perplexity Pro</th>
                  <th className="p-4 sm:p-5 text-muted-foreground">Google Scholar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {criteria.map((item, idx) => (
                  <tr key={idx} className="hover:bg-secondary/30 transition-colors">
                    <td className="p-4 sm:p-5">
                      <div className="font-semibold text-foreground">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
                    </td>

                    {/* ResearchForge AI Col */}
                    <td className="p-4 sm:p-5 bg-indigo-500/5 border-x border-indigo-500/20 font-semibold text-indigo-300">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </div>
                        <span className="text-xs font-mono text-emerald-400">Native Engine</span>
                      </div>
                    </td>

                    {/* OpenAI Deep Research */}
                    <td className="p-4 sm:p-5 text-muted-foreground">
                      {typeof item.chatgptDeep === "boolean" ? (
                        item.chatgptDeep ? (
                          <Check className="h-4 w-4 text-zinc-400" />
                        ) : (
                          <X className="h-4 w-4 text-zinc-600" />
                        )
                      ) : (
                        <span className="text-xs text-zinc-400 font-mono">{item.chatgptDeep}</span>
                      )}
                    </td>

                    {/* Perplexity Pro */}
                    <td className="p-4 sm:p-5 text-muted-foreground">
                      {typeof item.perplexity === "boolean" ? (
                        item.perplexity ? (
                          <Check className="h-4 w-4 text-zinc-400" />
                        ) : (
                          <X className="h-4 w-4 text-zinc-600" />
                        )
                      ) : (
                        <span className="text-xs text-zinc-400 font-mono">{item.perplexity}</span>
                      )}
                    </td>

                    {/* Google Scholar */}
                    <td className="p-4 sm:p-5 text-muted-foreground">
                      {typeof item.googleScholar === "boolean" ? (
                        item.googleScholar ? (
                          <Check className="h-4 w-4 text-zinc-400" />
                        ) : (
                          <X className="h-4 w-4 text-zinc-600" />
                        )
                      ) : (
                        <span className="text-xs text-zinc-400 font-mono">{item.googleScholar}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
