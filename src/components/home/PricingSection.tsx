"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight, Zap, ShieldCheck, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Researcher",
      badge: "Individual",
      priceMonthly: 39,
      priceAnnual: 29,
      desc: "For PhD researchers, analysts, and independent scientists needing rigorous grounded synthesis.",
      features: [
        "100 Deep Multi-Agent Runs / month",
        "arXiv, PubMed, Nature, and USPTO crawlers",
        "Deterministic DOI citation grounding",
        "Interactive Knowledge Graph explorer",
        "Standard PDF & Markdown exports",
        "Community Discord support",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Pro Lab & Quant",
      badge: "Most Popular",
      priceMonthly: 99,
      priceAnnual: 79,
      desc: "For high-velocity R&D teams, hedge fund quants, biotech labs, and intellectual property attorneys.",
      features: [
        "Unlimited Deep Multi-Agent Runs",
        "Contradiction & Consensus Engine",
        "Executive AI Audio Briefings & Podcasts",
        "Custom domain knowledge base upload",
        "BibTeX, LaTeX & publication-ready formats",
        "High-priority cluster concurrency (0.2s latency)",
        "Dedicated API key access",
      ],
      cta: "Deploy Pro Cluster",
      popular: true,
    },
    {
      name: "Enterprise VPC",
      badge: "Institutional",
      priceMonthly: 499,
      priceAnnual: 399,
      desc: "For Fortune 500 R&D divisions, defense labs, and pharmaceutical enterprises requiring air-gapped security.",
      features: [
        "Confidential Air-Gapped VPC deployment",
        "Zero Prompt & Dossier Data Retention SLA",
        "Custom fine-tuned agent heuristics",
        "Unlimited private internal document indexing",
        "SOC2 Type II, HIPAA & GDPR compliance",
        "Dedicated 24/7 Solutions Engineer & SLA",
      ],
      cta: "Contact Solutions Team",
      popular: false,
    },
  ];

  return (
    <section className="py-20 border-t border-border/60 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="cyan" className="font-mono text-xs">
            Predictable Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Invest in Empirical Speed
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Transparent plans for independent scholars, venture labs, and enterprise R&D groups.
          </p>

          {/* Billing Switch */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={cn("text-xs font-medium", !isAnnual ? "text-foreground font-semibold" : "text-muted-foreground")}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-zinc-700 transition-colors duration-200 ease-in-out focus:outline-none"
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out",
                  isAnnual ? "translate-x-5 bg-indigo-400" : "translate-x-0"
                )}
              />
            </button>
            <span className={cn("text-xs font-medium flex items-center gap-1.5", isAnnual ? "text-foreground font-semibold" : "text-muted-foreground")}>
              <span>Annual</span>
              <Badge variant="success" className="text-[10px] px-1.5 py-0">
                Save 25%
              </Badge>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={cn(
                "rounded-3xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative backdrop-blur-md",
                plan.popular
                  ? "bg-card border-indigo-500 shadow-2xl shadow-indigo-500/10 ring-1 ring-indigo-500/50 -translate-y-2"
                  : "bg-card/60 border-border hover:border-border/80 hover:bg-card"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="glow" className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-mono text-[10px] uppercase tracking-wider font-bold py-0.5 px-3 shadow-md">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                  <Badge variant="secondary" className="text-[10px] font-mono">
                    {plan.badge}
                  </Badge>
                </div>

                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-4xl font-extrabold font-mono text-foreground">
                    ${isAnnual ? plan.priceAnnual : plan.priceMonthly}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">/ user / mo</span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  {plan.desc}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-border/50 text-xs">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5">
                      <div className="h-4 w-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <span className="text-muted-foreground">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link href="/research">
                  <Button
                    variant={plan.popular ? "glow" : "outline"}
                    className="w-full justify-center font-semibold"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
