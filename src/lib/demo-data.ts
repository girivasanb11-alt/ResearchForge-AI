import { ResearchReport, ResearchSession } from "@/types/research";

export interface DemoInvestigation {
  session: ResearchSession;
  report: ResearchReport;
}

export const HACKATHON_DEMO_INVESTIGATIONS: DemoInvestigation[] = [
  // 1. NVIDIA AI Strategy
  {
    session: {
      id: "sess-nvidia-blackwell-2026",
      topic: "NVIDIA AI Strategy: Blackwell B200 Architecture & Enterprise Inference Monopolization",
      depth: "exhaustive",
      scope: ["academic", "market", "technical"],
      status: "completed",
      currentStageIndex: 6,
      reportId: "report-nvidia-blackwell-2026",
      createdAt: "2026-02-28T08:30:00.000Z",
      updatedAt: "2026-02-28T08:31:14.000Z",
    },
    report: {
      id: "report-nvidia-blackwell-2026",
      sessionId: "sess-nvidia-blackwell-2026",
      query: "NVIDIA AI Strategy: Blackwell B200 Architecture & Enterprise Inference Monopolization",
      title: "NVIDIA AI Strategy: Blackwell B200 Architecture & Enterprise Inference Monopolization",
      subtitle: "Autonomous Multi-Agent Investigation into Silicon CoWoS Scaling, CUDA Moats, and Data Center Capex",
      executiveSummary:
        "NVIDIA's strategic trajectory centers on transitioning from an accelerator vendor into a full-stack data center orchestration ecosystem. The Blackwell B200 dual-reticle architecture achieves 20 petaflops of FP4 inference throughput via high-bandwidth NVLink 5 interconnects (1.8 TB/s bidirectional per GPU). Autonomous agent synthesis of SEC 10-K filings, ArXiv preprint benchmarks, and TSMC CoWoS packaging capacity indicates that hyperscaler capex commitment remains sustained across a $380B addressable TAM through 2028.",
      marketAnalysis:
        "Hyperscaler capex expenditure into NVIDIA GPU clusters reached $160B in FY2025/2026, with Microsoft, Meta, Alphabet, and Amazon accounting for 43% of total revenue. Market trajectory modeling forecasts a 34.2% CAGR for AI hardware accelerators through 2030, driven by the shift from pre-training compute to inference compute at scale. The primary supply bottleneck remains TSMC CoWoS-L packaging allocation rather than raw silicon wafer yield.",
      competitorAnalysis:
        "Adversarial synthesis evaluated custom ASIC alternatives (Google TPU v6, AWS Trainium 2, Meta MTIA v2) and merchant merchant silicon (AMD Instinct MI325X/MI350). While custom ASICs achieve 18-24% lower TCO on fixed internal workloads, NVIDIA retains an 82% enterprise share due to CUDA-X software ecosystem lock-in, Triton inference server adoption, and rapid developer iteration cycles.",
      keyInsights: [
        "Inference Dominance: FP4 quantization on the Blackwell 2nd-generation Transformer Engine yields a 4x reduction in inference cost-per-token compared to H100 SXM5.",
        "NVLink Switch Network Moat: NVLink 5 enables 576-GPU coherent memory clusters acting as a single unified memory space of 13.8 TB HBM3e at 800 TB/s aggregate bandwidth.",
        "Supply Chain Sovereignty: Decoupling of substrate manufacturing across ASE Group and Amkor mitigates pure-play TSMC OSAT vulnerability for 2026 ramp schedules.",
        "Software Ecosystem Lock: 87% of surveyed Fortune 500 AI deployments rely on CUDA-native runtime extensions, rendering hardware-level switching costs prohibitive.",
      ],
      recommendations: [
        "Deploy hybrid multi-cloud orchestrators with dynamic fallback to AMD ROCm/vLLM backends to hedge against single-vendor GPU pricing pressure.",
        "Transition model serving architectures to 4-bit microscopic scaling (FP4/INT4) to maximize Blackwell tensor core compute density.",
        "Establish continuous patent claim monitoring on advanced liquid-cooling manifold disclosures and high-density power delivery topologies.",
      ],
      sections: [
        {
          id: "sec-1",
          slug: "executive-summary",
          title: "1. Executive Summary",
          category: "executive",
          content: "Comprehensive multi-agent investigation into NVIDIA's Blackwell architectural transition and hyperscaler enterprise locking mechanisms.",
        },
        {
          id: "sec-2",
          slug: "market-analysis",
          title: "2. Market Analysis",
          category: "market",
          content: "Detailed TAM projections, hyperscaler capex allocation curves, and supply chain packaging yields through 2028.",
        },
        {
          id: "sec-3",
          slug: "competitor-analysis",
          title: "3. Competitor Analysis",
          category: "competitor",
          content: "Empirical benchmarking of AMD MI325X, Google TPU v6e, and AWS Trainium2 against Blackwell GB200 NVL72 rack topologies.",
        },
      ],
      sources: [
        {
          id: "src-nv-1",
          title: "Blackwell Architecture Deep Dive & FP4 Tensor Core Microbenchmarks",
          url: "https://arxiv.org/abs/2601.08921",
          domain: "arxiv.org",
          authors: ["Dr. H. Chen", "Prof. M. LeCun", "V. Narayanan"],
          publishedDate: "2026-01-18",
          relevanceScore: 99,
          snippet: "Empirical latency measurements of NVLink 5 interconnects under 576-GPU all-gather collectives show 94.8% linear scaling efficiency.",
          type: "academic",
          verified: true,
          doi: "10.1145/3690124.8912",
        },
        {
          id: "src-nv-2",
          title: "US Patent 11,948,201: Multi-Die High Density Interconnect Package for Vector Accelerators",
          url: "https://patents.google.com/patent/US11948201B2",
          domain: "uspto.gov",
          authors: ["NVIDIA Corporation"],
          publishedDate: "2025-11-12",
          relevanceScore: 96,
          snippet: "Patent claims high-bandwidth bridge die configurations with integrated micro-bump arrays for 10 TB/s cross-die communication.",
          type: "patent",
          verified: true,
        },
        {
          id: "src-nv-3",
          title: "SEC Form 10-K Annual Filing: Data Center Revenue Breakdown & Substrate Commitments",
          url: "https://sec.gov/edgar/data/1045810/nvidia-10k-2026",
          domain: "sec.gov",
          publishedDate: "2026-02-15",
          relevanceScore: 95,
          snippet: "Data Center segment revenue grew 112% YoY, with non-cancelable purchase commitments for advanced packaging expanding to $19.4B.",
          type: "sec-filing",
          verified: true,
        },
      ],
      confidenceScore: 98,
      createdAt: "2026-02-28T08:31:14.000Z",
      readTimeMinutes: 7,
      depth: "exhaustive",
      scope: ["academic", "market", "technical"],
      stats: {
        sourcesScanned: 1840,
        sourcesCited: 4,
        factsCrossChecked: 142,
        contradictionsIdentified: 1,
        executionTimeSeconds: 12,
      },
    },
  },

  // 2. OpenAI Revenue Model
  {
    session: {
      id: "sess-openai-revenue-2026",
      topic: "OpenAI Revenue Model: Enterprise API Unit Economics & Frontier Inference Capex",
      depth: "exhaustive",
      scope: ["market", "technical"],
      status: "completed",
      currentStageIndex: 6,
      reportId: "report-openai-revenue-2026",
      createdAt: "2026-02-27T14:15:00.000Z",
      updatedAt: "2026-02-27T14:16:10.000Z",
    },
    report: {
      id: "report-openai-revenue-2026",
      sessionId: "sess-openai-revenue-2026",
      query: "OpenAI Revenue Model: Enterprise API Unit Economics & Frontier Inference Capex",
      title: "OpenAI Revenue Model: Enterprise API Unit Economics & Frontier Inference Capex",
      subtitle: "Autonomous Multi-Agent Synthesis of Subscription ARPU, Token Gross Margins, and Stargate Compute Infrastructure",
      executiveSummary:
        "OpenAI's annualized revenue run-rate has reached $11.6B, propelled by enterprise subscription adoption (ChatGPT Enterprise/Team at $60+/seat) and high-volume API token consumption. However, frontier model training runs (GPT-5/Orion class) and continuous multi-agent chain-of-thought inference demand an estimated $7.2B annual compute budget, compressing structural gross margins to 48-52% before custom silicon amortization.",
      marketAnalysis:
        "Enterprise LLM market expenditure demonstrates bifurcation: commoditized high-throughput tasks migrate to low-cost distilled models, while mission-critical enterprise workflows tolerate premium token pricing ($5-$15 per million tokens) for verified reasoning models. Subscription revenue represents 58% of total top-line, providing stable recurring cash flow against fluctuating API consumption volumes.",
      competitorAnalysis:
        "Competitive pressure from Anthropic (Claude 3.7 Sonnet hybrid reasoning) and open-weights distillation (DeepSeek-R1 / Llama 3.3) has compressed pure text-generation token pricing by 68% year-over-year. OpenAI's defensive strategy relies on proprietary agent orchestration tooling (Operator / Canvas) and deep enterprise workflow embeddings.",
      keyInsights: [
        "Inference Margin Dynamics: Reasoning model compute costs scale linearly with test-time compute tokens, necessitating dynamic pricing tiers based on verification depth.",
        "Enterprise Retention: Fortune 500 retention exceeds 92%, driven by zero-data-retention agreements and SOC 2 Type II compliance guarantees.",
        "Stargate Infrastructure: Projected $100B supercomputing cluster initiative with Microsoft aims to reduce per-FLOP training costs by 3.2x through nuclear power integration.",
      ],
      recommendations: [
        "Implement speculative decoding and prefix caching architectures across internal API gateways to reduce inference server utilization by 35%.",
        "Diversify enterprise integrations to support multi-model fallback routines, avoiding vendor lock-in during peak platform latency spikes.",
      ],
      sections: [
        {
          id: "sec-op-1",
          slug: "executive-summary",
          title: "1. Executive Summary",
          category: "executive",
          content: "Financial and computational breakdown of OpenAI's enterprise revenue scale and inference cost structure.",
        },
        {
          id: "sec-op-2",
          slug: "market-analysis",
          title: "2. Unit Economics & Pricing",
          category: "market",
          content: "Analysis of token gross margins, ChatGPT Plus/Enterprise ARPU, and customer acquisition costs.",
        },
      ],
      sources: [
        {
          id: "src-op-1",
          title: "Test-Time Compute Scaling Laws in Large Reasoning Models",
          url: "https://arxiv.org/abs/2601.12900",
          domain: "arxiv.org",
          authors: ["Dr. S. Karpathy", "I. Sutskever Research Group"],
          publishedDate: "2026-01-24",
          relevanceScore: 97,
          snippet: "Analysis shows token generation expenditure on verification loops outpaces initial pre-training capex within 180 days of production deployment.",
          type: "academic",
          verified: true,
          doi: "10.1145/3691200.4410",
        },
        {
          id: "src-op-2",
          title: "SEC S-1 Prospectus Analogs & Tech Private Equity Intelligence Disclosures",
          url: "https://sec.gov/edgar",
          domain: "sec.gov",
          publishedDate: "2026-02-04",
          relevanceScore: 93,
          snippet: "Cloud hosting commitments with Microsoft Azure represent 76% of total operational expenditure obligations.",
          type: "sec-filing",
          verified: true,
        },
      ],
      confidenceScore: 96,
      createdAt: "2026-02-27T14:16:10.000Z",
      readTimeMinutes: 6,
      depth: "exhaustive",
      scope: ["market", "technical"],
      stats: {
        sourcesScanned: 1220,
        sourcesCited: 2,
        factsCrossChecked: 96,
        contradictionsIdentified: 0,
        executionTimeSeconds: 10,
      },
    },
  },

  // 3. Anthropic vs OpenAI
  {
    session: {
      id: "sess-anthropic-vs-openai",
      topic: "Anthropic vs OpenAI: Constitutional AI, Hybrid Reasoning & Enterprise Market Share",
      depth: "standard",
      scope: ["academic", "market", "technical"],
      status: "completed",
      currentStageIndex: 6,
      reportId: "report-anthropic-vs-openai",
      createdAt: "2026-02-26T11:00:00.000Z",
      updatedAt: "2026-02-26T11:01:05.000Z",
    },
    report: {
      id: "report-anthropic-vs-openai",
      sessionId: "sess-anthropic-vs-openai",
      query: "Anthropic vs OpenAI: Constitutional AI, Hybrid Reasoning & Enterprise Market Share",
      title: "Anthropic vs OpenAI: Constitutional AI, Hybrid Reasoning & Enterprise Market Share",
      subtitle: "Comparative Multi-Agent Architectural Audit: Claude 3.7 Sonnet vs GPT-4.5/o1",
      executiveSummary:
        "The frontier AI landscape is characterized by intense architectural rivalry between Anthropic and OpenAI. Anthropic's introduction of hybrid thinking modes (combining instant response and dynamic reasoning budgets in Claude 3.7 Sonnet) establishes a distinct developer advantage in autonomous coding and complex financial synthesis. In contrast, OpenAI leverages mass-market brand awareness and deep Microsoft enterprise channel integration.",
      marketAnalysis:
        "Anthropic has captured 34% of enterprise software development market share, driven by superior coding benchmark scores (SWE-bench Verified) and 200k+ token context window coherence. AWS Bedrock and Google Cloud multi-cloud distribution channels provide Anthropic with direct enterprise access without exclusivity constraints.",
      competitorAnalysis:
        "Head-to-head empirical evaluation across 500 coding and mathematical tasks demonstrates Claude 3.7 Sonnet achieving 70.3% on SWE-bench compared to OpenAI o1's 68.1%. However, OpenAI maintains an advantage in multi-modal vision synthesis and consumer ecosystem reach.",
      keyInsights: [
        "Dynamic Reasoning Budget: Anthropic's hybrid model allows developers to configure exact thinking token limits, optimizing latency versus accuracy for production systems.",
        "Safety Compliance: Constitutional AI training methodology demonstrates a 3.4x lower vulnerability rate to jailbreak vectors across automated red-teaming harnesses.",
        "Cloud Independence: Dual backing by Amazon ($8B total investment) and Google ensures compute diversification across AWS Trainium and Google TPU hardware.",
      ],
      recommendations: [
        "Deploy a dual-model routing gateway that routes code generation to Claude 3.7 Sonnet and multi-modal consumer workflows to OpenAI.",
      ],
      sections: [
        {
          id: "sec-comp-1",
          slug: "executive-summary",
          title: "1. Executive Summary",
          category: "executive",
          content: "Comparative analysis of safety paradigms, architectural benchmarks, and enterprise adoption vectors.",
        },
      ],
      sources: [
        {
          id: "src-ant-1",
          title: "Constitutional AI with Scaled Hybrid Reasoning Architectures",
          url: "https://arxiv.org/abs/2602.01948",
          domain: "arxiv.org",
          authors: ["D. Amodei", "C. Olah", "Anthropic Research"],
          publishedDate: "2026-02-10",
          relevanceScore: 98,
          snippet: "Empirical proof demonstrating self-supervised RL from AI feedback achieves higher alignment stability during extended reasoning chains.",
          type: "academic",
          verified: true,
          doi: "10.1145/3694000.1209",
        },
      ],
      confidenceScore: 97,
      createdAt: "2026-02-26T11:01:05.000Z",
      readTimeMinutes: 5,
      depth: "standard",
      scope: ["academic", "market", "technical"],
      stats: {
        sourcesScanned: 950,
        sourcesCited: 1,
        factsCrossChecked: 82,
        contradictionsIdentified: 0,
        executionTimeSeconds: 8,
      },
    },
  },

  // 4. Tesla FSD Architecture
  {
    session: {
      id: "sess-tesla-fsd-v13",
      topic: "Tesla FSD v13: End-to-End Neural Networks & Hardware 4 Vision Transformers",
      depth: "standard",
      scope: ["academic", "technical"],
      status: "completed",
      currentStageIndex: 6,
      reportId: "report-tesla-fsd-v13",
      createdAt: "2026-02-25T09:00:00.000Z",
      updatedAt: "2026-02-25T09:01:10.000Z",
    },
    report: {
      id: "report-tesla-fsd-v13",
      sessionId: "sess-tesla-fsd-v13",
      query: "Tesla FSD v13: End-to-End Neural Networks & Hardware 4 Vision Transformers",
      title: "Tesla FSD v13: End-to-End Neural Networks & Hardware 4 Vision Transformers",
      subtitle: "Autonomous Reverse-Engineering of Multi-Camera Occupancy Networks and Cortex Cluster Compute",
      executiveSummary:
        "Tesla FSD v13 eliminates traditional C++ heuristic planner code in favor of a monolithic Vision-Language-Action (VLA) neural network running end-to-end at 36 Hz on HW4 (AI4) silicon. The system processes uncompressed raw photon streams across 8 cameras (5MP resolution), mapping directly to steering, acceleration, and braking vectors with a 3.8x reduction in disengagement rates over v12.",
      marketAnalysis:
        "Commercialization of Robotaxi fleet networks depends on achieving sub-0.01 interventions per 1,000 miles. Hardware 4 compute clusters powered by Dojo v2 and 100,000 NVIDIA H100/H200 equivalents at the Cortex Supercluster in Texas provide 100+ Exaflops of video training capacity.",
      competitorAnalysis:
        "Compared to Waymo's multi-sensor LiDAR/radar suite ($40k+ sensor BOM), Tesla's vision-only BOM ($1,200) offers massive unit cost scalability, though regulatory verification requirements remain the gating threshold for driverless operational approval.",
      keyInsights: [
        "World Model Prediction: FSD v13 generates generative temporal world rollouts 5 seconds into the future to evaluate path trajectories.",
        "HW4 NPU Utilization: Dual Samsung 4nm custom NPUs execute FP8 quantized spatial transformer models with sub-18ms latency.",
      ],
      recommendations: [
        "Incorporate thermal sensor telemetry to mitigate optical occlusion edge cases during adverse weather conditions.",
      ],
      sections: [
        {
          id: "sec-ts-1",
          slug: "executive-summary",
          title: "1. Executive Summary",
          category: "executive",
          content: "Neural architecture breakdown of Tesla's vision-only autonomous driving pipeline.",
        },
      ],
      sources: [
        {
          id: "src-ts-1",
          title: "US Patent 12,044,912: End-to-End Neural Motion Planning from Spatial Occupancy Grids",
          url: "https://patents.google.com/patent/US12044912B1",
          domain: "uspto.gov",
          authors: ["Tesla Inc. Autopilot Team"],
          publishedDate: "2025-10-30",
          relevanceScore: 96,
          snippet: "Patent claims monolithic neural architecture translating continuous camera frame embeddings into actuator torque commands.",
          type: "patent",
          verified: true,
        },
      ],
      confidenceScore: 95,
      createdAt: "2026-02-25T09:01:10.000Z",
      readTimeMinutes: 5,
      depth: "standard",
      scope: ["academic", "technical"],
      stats: {
        sourcesScanned: 880,
        sourcesCited: 1,
        factsCrossChecked: 64,
        contradictionsIdentified: 0,
        executionTimeSeconds: 9,
      },
    },
  },

  // 5. Semiconductor Supply Chain
  {
    session: {
      id: "sess-semiconductor-cowos",
      topic: "Global Semiconductor Supply Chain: TSMC CoWoS Capacity & High-NA EUV Deployment",
      depth: "exhaustive",
      scope: ["academic", "market", "technical"],
      status: "completed",
      currentStageIndex: 6,
      reportId: "report-semiconductor-cowos",
      createdAt: "2026-02-24T16:00:00.000Z",
      updatedAt: "2026-02-24T16:01:25.000Z",
    },
    report: {
      id: "report-semiconductor-cowos",
      sessionId: "sess-semiconductor-cowos",
      query: "Global Semiconductor Supply Chain: TSMC CoWoS Capacity & High-NA EUV Deployment",
      title: "Global Semiconductor Supply Chain: TSMC CoWoS Capacity & High-NA EUV Deployment",
      subtitle: "Autonomous Multi-Corpus Investigation into Advanced 2nm Sub-Nodes and OSAT Capacity Constraints",
      executiveSummary:
        "The primary bottleneck constraining global AI compute expansion is advanced packaging throughput (TSMC CoWoS-S/L/R) and ASML High-NA EUV (0.55 NA) scanner deployment timelines. While TSMC 2nm (N2) Gate-All-Around (GAA) silicon wafers enter risk production in 2025/2026, interposer substrate supply and HBM4 16-high memory stack yields dictate total accelerator delivery volumes.",
      marketAnalysis:
        "Global advanced packaging market size is projected to reach $65B by 2028, with TSMC expanding monthly CoWoS wafer capacity from 35k to 75k wafers. Geopolitical risk concentration in Hsinchu and Tainan drives fab construction across Dresden, Kumamoto, and Arizona.",
      competitorAnalysis:
        "Intel Foundry Services (IFS 18A / EMIB packaging) and Samsung Foundry (I-Cube / GAA 3nm) seek to capture hyperscaler spillover demand, but yield parity with TSMC N3E/N2 remains 18-24 months behind.",
      keyInsights: [
        "HBM4 Hybrid Bonding: Transition to direct copper-to-copper hybrid bonding at 16-high stacks increases memory thermal dissipation efficiency by 40%.",
        "High-NA EUV Anamorphic Optics: 0.55 NA scanners reduce mask exposure counts from 3 to 1, lowering defect density by 22% on sub-2nm metal pitches.",
      ],
      recommendations: [
        "Secure long-term substrate capacity commitments with secondary packaging partners (ASE/SPIL) to buffer against primary fab allocation crunches.",
      ],
      sections: [
        {
          id: "sec-semi-1",
          slug: "executive-summary",
          title: "1. Executive Summary",
          category: "executive",
          content: "Comprehensive analysis of advanced packaging yield limits and High-NA lithography roadmap.",
        },
      ],
      sources: [
        {
          id: "src-semi-1",
          title: "Advanced 2.5D/3D Chiplet Packaging: Thermal and Yield Optimization in CoWoS Topologies",
          url: "https://arxiv.org/abs/2601.04210",
          domain: "arxiv.org",
          authors: ["IEEE Packaging Society", "TSMC R&D Lab"],
          publishedDate: "2026-01-14",
          relevanceScore: 98,
          snippet: "Experimental study on interposer warpage and micro-bump thermal stress during 1200W sustained accelerator execution.",
          type: "academic",
          verified: true,
          doi: "10.1109/TCAPT.2026.04210",
        },
      ],
      confidenceScore: 97,
      createdAt: "2026-02-24T16:01:25.000Z",
      readTimeMinutes: 7,
      depth: "exhaustive",
      scope: ["academic", "market", "technical"],
      stats: {
        sourcesScanned: 1650,
        sourcesCited: 1,
        factsCrossChecked: 114,
        contradictionsIdentified: 1,
        executionTimeSeconds: 14,
      },
    },
  },
];
