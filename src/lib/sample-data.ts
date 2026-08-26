import { ResearchReport, CitationSource } from "./types";

export const SAMPLE_SOURCES: CitationSource[] = [
  {
    id: "src-1",
    title: "Sulfide-Based Solid-State Electrolytes for High-Energy All-Solid-State Lithium Batteries: Degradation Mechanisms and Interfaces",
    url: "https://nature.com/articles/s41560-025-01422-x",
    domain: "nature.com",
    authors: ["Dr. Evelyn Vance", "Dr. Kenji Takahashi", "Prof. Marcus Zhang"],
    publishedDate: "2025-11-14",
    relevanceScore: 99,
    domainAuthority: 96,
    citationCount: 142,
    snippet: "Lithium-indium dendrite suppression was observed above 12 mA/cm² critical current density when combining dual-phase atomic layer passivation with halidosulfide Li₆PS₅Cl electrolytes.",
    type: "academic",
    verified: true,
  },
  {
    id: "src-2",
    title: "Global Battery Market Outlook 2026: The Transition from NMC811 to Semi-Solid and All-Solid Architectures",
    url: "https://bloombergnef.com/reports/solid-state-outlook-2026",
    domain: "bloombergnef.com",
    authors: ["BNEF Energy Storage Group"],
    publishedDate: "2026-01-20",
    relevanceScore: 94,
    domainAuthority: 92,
    citationCount: 88,
    snippet: "Projected cost parity of all-solid-state cells with traditional liquid electrolyte cells ($85/kWh) is expected by Q3 2028, driven by roll-to-roll dry electrode processing.",
    type: "industry-report",
    verified: true,
  },
  {
    id: "src-3",
    title: "Oxide vs Sulfide Solid Electrolytes: Thermal Runaway Kinetics and Mechanical Stress Profiling",
    url: "https://sciencedirect.com/science/article/pii/S037877532500892X",
    domain: "sciencedirect.com",
    authors: ["Prof. Sarah Lindqvist", "Dr. H. Chen"],
    publishedDate: "2025-09-02",
    relevanceScore: 91,
    domainAuthority: 94,
    citationCount: 67,
    snippet: "LLZO garnet structures exhibited zero oxygen release up to 740°C, while sulfide-based cells required hermetic encapsulation to eliminate hydrogen sulfide gas outgassing during catastrophic puncture tests.",
    type: "academic",
    verified: true,
  },
  {
    id: "src-4",
    title: "US Patent US11942810B2: Scalable Roll-to-Roll Dry Polymer Matrix Impregnation for Solid State Cathodes",
    url: "https://patents.google.com/patent/US11942810B2/en",
    domain: "patents.google.com",
    authors: ["QuantumScape Advanced IP Portfolio"],
    publishedDate: "2025-06-18",
    relevanceScore: 89,
    domainAuthority: 98,
    citationCount: 31,
    snippet: "Continuous manufacturing method utilizing solvent-free fibrillated PTFE binder matrix providing 450 Wh/kg specific cell-level density at >1000 cycles.",
    type: "patent",
    verified: true,
  },
  {
    id: "src-5",
    title: "Toyota & Idemitsu Kosan Joint Pilot Line Performance Validation Report",
    url: "https://toyota-global.com/innovation/battery-tech/ssb-validation-2025",
    domain: "toyota-global.com",
    authors: ["Advanced Battery Engineering Taskforce"],
    publishedDate: "2025-12-05",
    relevanceScore: 87,
    domainAuthority: 90,
    citationCount: 53,
    snippet: "Demonstrated 10-minute fast charging (10% to 80% SOC) over 1,200 continuous cycle tests with capacity retention exceeding 89.4%.",
    type: "whitepaper",
    verified: true,
  },
];

export const SAMPLE_REPORTS: ResearchReport[] = [
  {
    id: "solid-state-batteries-2026",
    query: "Solid-State Battery Commercialization: Electrolyte Architectures, Cost Parity, and Manufacturing Scaling (2025–2030)",
    title: "Solid-State Battery Commercialization Frontier",
    subtitle: "A Systematic Synthesis of Electrolyte Architectures, Roll-to-Roll Scalability, and Global Deployment Roadmaps",
    summary:
      "This comprehensive research dossier analyzes the transition of solid-state lithium battery chemistry from benchtop breakthroughs to pilot-scale gigawatt manufacturing. Evaluating over 380 academic publications, 45 patent families, and commercial teardowns, we map the divergence between sulfide and oxide routes, quantify real-world energy density gains (420–480 Wh/kg), and assess the trajectory toward $82/kWh pack-level cost parity by 2028.",
    createdAt: "2026-02-18T10:30:00Z",
    readTimeMinutes: 12,
    confidenceScore: 98.4,
    scope: ["academic", "patents", "market", "technical"],
    depth: "exhaustive",
    status: "completed",
    stats: {
      sourcesScanned: 542,
      sourcesCited: 48,
      factsCrossChecked: 314,
      contradictionsIdentified: 6,
      synthesisTokens: 18450,
      executionTimeSeconds: 42.8,
    },
    keyFindings: [
      {
        id: "kf-1",
        title: "Dry-Electrode Roll-to-Roll Manufacturing Eliminates 40% Capex",
        description:
          "Transition to solvent-free PTFE binder fibrillation reduces drying oven footprints by 65% and reduces cell manufacturing cost from $128/kWh to an estimated $84/kWh at 20 GWh scale.",
        impactLevel: "critical",
        category: "Manufacturing & Economics",
        citations: ["src-2", "src-4"],
        confidenceScore: 96,
      },
      {
        id: "kf-2",
        title: "Dual-Layer Halidosulfide Electrolytes Mitigate Dendrite Growth",
        description:
          "Atomic layer passivation combined with Li₆PS₅Cl allows stable lithium cycling up to 12.5 mA/cm² without short circuits at 25°C, resolving the critical high-rate charging limitation.",
        impactLevel: "critical",
        category: "Materials Science",
        citations: ["src-1", "src-5"],
        confidenceScore: 99,
      },
      {
        id: "kf-3",
        title: "Commercial Parity Timeline Converges at 2027-2028 for Luxury EVs",
        description:
          "Automotive OEMs (Toyota, BMW, Mercedes-Factorial) have shifted from 2030 projections to late-2027 initial production series, with initial price premiums absorbed in hypercars and flagship premium EVs.",
        impactLevel: "high",
        category: "Market Adoption",
        citations: ["src-2", "src-5"],
        confidenceScore: 92,
      },
      {
        id: "kf-4",
        title: "Oxide Garnet Cells Lead Stationary Storage Safety Standards",
        description:
          "LLZO ceramics demonstrate absolute thermal runaway immunity under nail penetration tests up to 740°C, establishing dominant position for data center backup and grid energy storage.",
        impactLevel: "moderate",
        category: "Safety & Reliability",
        citations: ["src-3"],
        confidenceScore: 95,
      },
    ],
    sections: [
      {
        id: "sec-exec",
        slug: "executive-summary",
        title: "1. Executive Strategic Synthesis",
        content: `
The global energy storage landscape stands at an inflection point. Traditional liquid-electrolyte Lithium-ion chemistry is asymptotically approaching its theoretical volumetric density boundary (~750 Wh/L). Solid-State Lithium Batteries (SSBs) replace flammable volatile liquid solvents with solid ceramic, sulfide, or polymer ion-conducting matrices.

### Core Comparative Metrics

| Attribute | Conventional Liquid Li-ion (NMC811) | Semi-Solid (Gel/Hybrid) | All-Solid-State (Sulfide/LLZO) |
| :--- | :--- | :--- | :--- |
| **Cell Energy Density (Gravimetric)** | 270 - 300 Wh/kg | 340 - 380 Wh/kg | **440 - 500 Wh/kg** |
| **Volumetric Density** | 720 Wh/L | 850 Wh/L | **1,050 - 1,180 Wh/L** |
| **10-80% Fast Charge Duration** | 22 - 35 mins | 16 - 22 mins | **8 - 12 mins** |
| **Thermal Runaway Threshold** | 150°C - 210°C | 260°C - 310°C | **> 650°C (Non-flammable)** |
| **Estimated Pack Cost (2028)** | $76 / kWh | $88 / kWh | **$82 / kWh** |

> **Key Takeaway:** The debate over whether solid-state batteries are manufacturable has shifted to *which chemistry scales fastest*. Sulfide chemistries hold the automotive fast-charge lead, while oxide LLZO holds the stationary industrial safety benchmark.
`,
        callout: {
          type: "insight",
          title: "Technological Inflection Point",
          text: "Critical current density thresholds required for 10-minute automotive fast charging have now been experimentally surpassed in 12-layer pouch cell configurations under 5 MPa stack pressure.",
        },
      },
      {
        id: "sec-materials",
        slug: "electrolyte-architectures",
        title: "2. Electrolyte Architecture Breakdown: Sulfide vs Oxide vs Polymer",
        content: `
### Sulfide-Based Electrolytes ($Li_6PS_5Cl$ / $Li_{10}GeP_2S_{12}$)
Sulfide electrolytes offer exceptionally high room-temperature ionic conductivity ($\sigma_{Li^+} > 1.2 \times 10^{-2} \text{ S/cm}$), rivaling or exceeding liquid electrolytes. Their soft mechanical modulus allows cold-pressing into dense separators without ultra-high temperature sintering.

- **Advantage:** Unmatched room-temperature power density and ease of calendar rolling.
- **Hurdle:** High reactivity with atmospheric moisture releasing toxic $H_2S$ gas; requires inert dry rooms ($<-50^\circ\text{C}$ dewpoint).

### Oxide Garnet-Type Electrolytes ($Li_7La_3Zr_2O_{12}$ - LLZO)
Oxides exhibit extreme electrochemical stability windows (0 to 5.5V vs $Li/Li^+$) and superior resistance against mechanical lithium dendrite piercing.

- **Advantage:** Unsurpassed thermal and atmospheric stability. Zero $H_2S$ hazard.
- **Hurdle:** High ceramic brittleness requires 1,050°C sintering or novel ultra-thin (<15 $\mu$m) tape-casting techniques to avoid high separator internal resistance.

### Polymer & Composite Matrixes (PEO / PVDF-HFP with Garnet Nanofillers)
Polymer composites provide flexible manufacturing compatibility with existing gigafactory slot-die coaters, acting as the primary commercial bridge for semi-solid designs deployed in 2025–2026 EV models.
`,
        chartData: {
          title: "Ionic Conductivity vs Electrochemical Stability Window",
          type: "bar",
          xAxisKey: "name",
          dataKeys: ["conductivity", "stabilityWindow", "manufacturability"],
          data: [
            { name: "Liquid Electrolyte", conductivity: 10, stabilityWindow: 4.2, manufacturability: 98 },
            { name: "Polymer-Gel (PEO)", conductivity: 3.5, stabilityWindow: 4.5, manufacturability: 85 },
            { name: "Sulfide (Li6PS5Cl)", conductivity: 12.5, stabilityWindow: 3.8, manufacturability: 72 },
            { name: "Oxide Garnet (LLZO)", conductivity: 6.8, stabilityWindow: 5.2, manufacturability: 60 },
            { name: "Halide Composite", conductivity: 8.4, stabilityWindow: 4.9, manufacturability: 68 },
          ],
        },
      },
      {
        id: "sec-manufacturing",
        slug: "manufacturing-scaling",
        title: "3. Manufacturing Scalability & Dry Electrode Processing",
        content: `
The dominant bottleneck in solid-state economics has historically been the high energy consumption of wet-solvent slurry drying ovens and solvent recovery units (N-Methyl-2-pyrrolidone / NMP).

Recent breakthroughs in **Dry Battery Electrode (DBE)** processing leverage electrostatic spraying of fibrillated PTFE and active cathode materials directly onto aluminum current collectors:

1. **Footprint Reduction:** Eliminates 70-meter drying ovens, shrinking gigafactory floor footprint by 45%.
2. **Thickness Expansion:** Enables ultra-thick cathode coatings (up to 4.5 mAh/cm²) without cracking, elevating gravimetric energy density.
3. **Solvent-Free Safety:** Removes toxic VOCs and drying emissions entirely.
`,
        chartData: {
          title: "Cost Trajectory per kWh (Cell Level 2023–2030 Projections)",
          type: "line",
          xAxisKey: "year",
          dataKeys: ["liquidLiIon", "semiSolid", "allSolidState"],
          data: [
            { year: "2023", liquidLiIon: 135, semiSolid: 220, allSolidState: 390 },
            { year: "2024", liquidLiIon: 115, semiSolid: 175, allSolidState: 295 },
            { year: "2025", liquidLiIon: 98, semiSolid: 135, allSolidState: 195 },
            { year: "2026", liquidLiIon: 88, semiSolid: 110, allSolidState: 145 },
            { year: "2027", liquidLiIon: 80, semiSolid: 95, allSolidState: 105 },
            { year: "2028", liquidLiIon: 75, semiSolid: 84, allSolidState: 82 },
            { year: "2030", liquidLiIon: 68, semiSolid: 72, allSolidState: 65 },
          ],
        },
      },
      {
        id: "sec-roadmap",
        slug: "commercial-roadmaps",
        title: "4. Global Commercialization Roadmaps & Strategic Timelines",
        content: `
### Key Player Positioning Matrix

- **Toyota / Idemitsu:** Target 2027–2028 commercial rollout in high-end BEVs; 10-minute fast charging verified on 100Ah pilot cells.
- **QuantumScape / PowerCo (VW Group):** Scaled Cobra separator production; targeting B-sample delivery in late 2025 with QSE-5 platform.
- **Factorial Energy (Mercedes-Benz, Stellantis):** Solstice 450 Wh/kg sulfide cells entering vehicle integration fleet trials in Q4 2025.
- **CATL:** Released "Shenxing Plus" (semi-solid 1,000 km range) while targeting all-solid pilot production by 2027.
- **WeLion / NIO:** 150 kWh semi-solid pack already in operational fleet rotation across Chinese highways.
`,
        callout: {
          type: "success",
          title: "Consensus Timeline",
          text: "Cross-validation of 14 Tier-1 automotive and cell supplier roadmaps indicates 2027 as the pivotal volume transition year, with 120 GWh of global SSB dedicated capacity operational by 2030.",
        },
      },
    ],
    sources: SAMPLE_SOURCES,
    contradictions: [
      {
        topic: "Cathode Interface Degradation Mechanism",
        consensusScore: 62,
        viewA: {
          claim: "Interface resistance is primarily driven by space-charge layer growth and chemical interdiffusion.",
          advocates: ["MIT Energy Initiative", "Toyota R&D Group"],
          sources: ["src-1", "src-5"],
          evidenceWeight: "Strong",
        },
        viewB: {
          claim: "Microcracking induced by anisotropic volume expansion during 4.4V charging is the root cause of capacity fade.",
          advocates: ["Fraunhofer Battery Alliance", "Stanford Materials Lab"],
          sources: ["src-3"],
          evidenceWeight: "Strong",
        },
        synthesis:
          "Both mechanisms operate concurrently: mechanical microcracking exposes fresh electrolyte surfaces, accelerating space-charge degradation. Dual-coating cathode architectures (LiNbO₃ + ALD alumina) resolve both vectors.",
      },
      {
        topic: "Stack Pressure Requirements in Automotive Packs",
        consensusScore: 54,
        viewA: {
          claim: "Commercial packs will require active mechanical springs maintaining >3 MPa pressure to prevent void formation.",
          advocates: ["QuantumScape Academic Advisory", "Max Planck Institute"],
          sources: ["src-4"],
          evidenceWeight: "Moderate",
        },
        viewB: {
          claim: "Novel 3D porous lithium hosts and zero-pressure composite interlayers eliminate the need for heavy external clamping hardware.",
          advocates: ["Solid Power", "CATL Advanced Research"],
          sources: ["src-2"],
          evidenceWeight: "Moderate",
        },
        synthesis:
          "First-generation 2027 vehicles will utilize 1–2 MPa integrated pack clamping; second-generation (2029+) will transition to zero-external-pressure 3D hosts.",
      },
    ],
    graphNodes: [
      { id: "ssb", label: "Solid-State Batteries", type: "core_concept", size: 30, connections: ["sulfide", "oxide", "dry_proc", "fast_chg", "cost"] },
      { id: "sulfide", label: "Sulfide Electrolytes (Li6PS5Cl)", type: "methodology", size: 24, connections: ["ssb", "fast_chg", "dendrite"] },
      { id: "oxide", label: "Oxide Garnet (LLZO)", type: "methodology", size: 22, connections: ["ssb", "thermal_safety"] },
      { id: "dry_proc", label: "Dry Electrode Processing (DBE)", type: "methodology", size: 26, connections: ["ssb", "cost", "gigafactory"] },
      { id: "fast_chg", label: "10-Min Fast Charge", type: "metric", size: 20, connections: ["ssb", "sulfide"] },
      { id: "cost", label: "$82/kWh Cost Parity", type: "metric", size: 24, connections: ["ssb", "dry_proc"] },
      { id: "thermal_safety", label: ">650°C Thermal Safety", type: "metric", size: 18, connections: ["oxide"] },
      { id: "dendrite", label: "Dendrite Suppression Passivation", type: "core_concept", size: 20, connections: ["sulfide"] },
      { id: "gigafactory", label: "Tier-1 OEM Scaling (Toyota/VW/CATL)", type: "institution", size: 22, connections: ["dry_proc", "cost"] },
    ],
    audioBriefing: {
      duration: "4:32",
      title: "Executive Audio Brief: Solid-State Battery Commercial Readiness",
      transcript: [
        { timestamp: "0:00", speaker: "Dr. Alicia Vance (AI Host)", text: "Welcome to this ResearchForge AI executive briefing on Solid-State Battery commercialization roadmaps." },
        { timestamp: "0:30", speaker: "Dr. Alicia Vance (AI Host)", text: "Our multi-agent synthesis evaluated 380 peer-reviewed papers and 45 patent portfolios. The primary headline: the cost parity threshold with traditional liquid lithium-ion is converging on 2028." },
        { timestamp: "1:45", speaker: "Dr. Marcus Reed (AI Analyst)", text: "The real catalyst here is dry-electrode processing. By removing NMP slurry ovens, capital expenditure per gigawatt-hour drops by nearly 40%." },
        { timestamp: "3:10", speaker: "Dr. Alicia Vance (AI Host)", text: "Regarding chemistry divergence: sulfide electrolytes have taken the automotive lead due to cold-pressability, while oxide LLZO dominates stationary grid applications." },
      ],
    },
  },
  {
    id: "multi-agent-orchestration-2026",
    query: "Multi-Agent Autonomous Orchestration Frameworks: Self-Correction, Reasoning Over Knowledge Graphs, and Benchmark Evaluations",
    title: "Autonomous Multi-Agent Orchestration Architectures",
    subtitle: "A Systematic Synthesis of Recursive Planning, Dynamic Topology Routing, and Knowledge-Graph-Grounded Reasoning",
    summary:
      "An in-depth analysis of modern autonomous agent systems spanning decentralized swarms, hierarchical supervisor-worker topologies, consensus protocols, and self-correcting verification loops. Evaluates MMLU-Pro, SWE-bench Verified, and GAIA benchmark performances across leading frameworks.",
    createdAt: "2026-02-17T14:15:00Z",
    readTimeMinutes: 10,
    confidenceScore: 97.8,
    scope: ["academic", "technical", "codebases"],
    depth: "exhaustive",
    status: "completed",
    stats: {
      sourcesScanned: 412,
      sourcesCited: 36,
      factsCrossChecked: 245,
      contradictionsIdentified: 4,
      synthesisTokens: 15200,
      executionTimeSeconds: 36.4,
    },
    keyFindings: [
      {
        id: "ma-1",
        title: "Dynamic Graph Routing Outperforms Static Sequential Chains by 38%",
        description:
          "Agents operating with dynamic directed acyclic graph (DAG) routing tailored to input complexity exhibit 38% higher task success rates on multi-step reasoning benchmarks compared to static workflows.",
        impactLevel: "critical",
        category: "System Architecture",
        citations: ["src-1"],
        confidenceScore: 98,
      },
      {
        id: "ma-2",
        title: "Deterministic Verification Nodes Suppress Hallucinations Below 1.2%",
        description:
          "Embedding formal linter, AST, and schema-checking agents as blocking verification gates reduces agent hallucination propagation across multi-turn context windows by over 85%.",
        impactLevel: "critical",
        category: "Reliability & Safety",
        citations: ["src-2"],
        confidenceScore: 97,
      },
    ],
    sections: [
      {
        id: "ma-sec-1",
        slug: "framework-topologies",
        title: "1. Orchestration Topologies: Hierarchical vs Swarm vs Event-Driven",
        content: `
Autonomous agent architectures have evolved past single-prompt ReAct loops into distributed collaborative topologies:

1. **Hierarchical Supervisor-Worker:** A central planner decomposes the objective, delegates isolated sub-tasks to specialized domain agents, and aggregates outputs.
2. **Decentralized Swarm (Peer-to-Peer):** Autonomous nodes negotiate tasks via message brokers and shared blackboard state.
3. **Event-Driven Reactive Graphs:** Execution branches dynamically based on environmental feedback and intermediate confidence scores.
`,
        chartData: {
          title: "SWE-bench Verified Success Rate vs Token Efficiency",
          type: "bar",
          xAxisKey: "framework",
          dataKeys: ["successRate", "tokenEfficiency"],
          data: [
            { framework: "Single Agent ReAct", successRate: 24, tokenEfficiency: 92 },
            { framework: "Sequential Multi-Agent", successRate: 38, tokenEfficiency: 70 },
            { framework: "Hierarchical Supervisor", successRate: 52, tokenEfficiency: 64 },
            { framework: "Dynamic Graph + Verifier", successRate: 68, tokenEfficiency: 58 },
          ],
        },
      },
    ],
    sources: SAMPLE_SOURCES.slice(0, 3),
    contradictions: [],
    graphNodes: [
      { id: "agent_sys", label: "Multi-Agent Systems", type: "core_concept", size: 28, connections: ["hierarchical", "swarm", "verifier"] },
      { id: "hierarchical", label: "Supervisor Routing", type: "methodology", size: 22, connections: ["agent_sys"] },
      { id: "verifier", label: "Deterministic Verifiers", type: "methodology", size: 24, connections: ["agent_sys"] },
      { id: "swarm", label: "P2P Swarm Protocols", type: "methodology", size: 20, connections: ["agent_sys"] },
    ],
  },
  {
    id: "glp1-dual-agonists-2026",
    query: "Next-Wave GLP-1/GIP and Triple Agonists: Clinical Efficacy, Lean Muscle Retention, and Market Dynamics",
    title: "Next-Generation Metabolic Agonists: GLP-1, GIP & Glucagon Triple Agonists",
    subtitle: "Clinical Efficacy Horizons, Lean Muscle Mass Preservation Strategies, and Oral Delivery Breakthroughs",
    summary:
      "A rigorous synthesis of 18 Phase II/III clinical trials for dual GLP-1/GIP and GLP-1/GIP/Glucagon triple agonists (Retatrutide, CagriSema, Oral Amycretin). Evaluates total body weight reduction efficacy up to 26.8%, muscle-to-fat loss ratio preservation, and oral peptide bioavailability formulations.",
    createdAt: "2026-02-16T09:00:00Z",
    readTimeMinutes: 11,
    confidenceScore: 99.1,
    scope: ["academic", "market", "technical"],
    depth: "exhaustive",
    status: "completed",
    stats: {
      sourcesScanned: 620,
      sourcesCited: 54,
      factsCrossChecked: 380,
      contradictionsIdentified: 5,
      synthesisTokens: 21000,
      executionTimeSeconds: 48.2,
    },
    keyFindings: [
      {
        id: "glp-1",
        title: "Triple Agonists Achieve Up to 26.8% Mean Weight Loss at 48 Weeks",
        description:
          "Phase III trial data for Retatrutide confirms unprecedented efficacy with significant hepatic steatosis resolution (>80% liver fat reduction) via glucagon receptor activation.",
        impactLevel: "critical",
        category: "Clinical Efficacy",
        citations: ["src-1"],
        confidenceScore: 99,
      },
    ],
    sections: [
      {
        id: "glp-sec-1",
        slug: "clinical-landscape",
        title: "1. Clinical Trial Comparative Matrix",
        content: `
The metabolic pharmaceutical landscape has advanced from mono-receptor GLP-1 agonists (Semaglutide) to dual (Tirzepatide) and triple agonists (Retatrutide):

| Molecule | Mechanism | Phase | Mean Weight Loss (48–72 Wks) | Key Advantage |
| :--- | :--- | :--- | :--- | :--- |
| **Semaglutide 2.4mg** | GLP-1R | Approved | ~14.9% | Extensive long-term safety profile |
| **Tirzepatide 15mg** | GLP-1R / GIPR | Approved | ~20.9% | Enhanced insulin sensitivity |
| **Retatrutide 12mg** | GLP-1R / GIPR / GCGR | Phase III | **~26.8%** | Energy expenditure & liver fat clearance |
| **CagriSema** | Semaglutide + Cagrilintide | Phase III | ~25.0% | Synergistic amylin receptor agonist |
| **Amycretin (Oral)** | Oral GLP-1R + Amylin | Phase I/II | ~13.1% (12 Wks) | High patient compliance oral tablet |
`,
      },
    ],
    sources: SAMPLE_SOURCES.slice(0, 4),
    contradictions: [],
    graphNodes: [
      { id: "metabolic", label: "Metabolic Therapeutics", type: "core_concept", size: 28, connections: ["glp1", "gip", "gcgr", "oral"] },
      { id: "glp1", label: "GLP-1 Receptor", type: "methodology", size: 22, connections: ["metabolic"] },
      { id: "gip", label: "GIP Agonism", type: "methodology", size: 20, connections: ["metabolic"] },
      { id: "gcgr", label: "Glucagon Agonism", type: "methodology", size: 20, connections: ["metabolic"] },
      { id: "oral", label: "Oral SNAC Delivery", type: "metric", size: 22, connections: ["metabolic"] },
    ],
  },
];
