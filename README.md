# ResearchForge AI ⚡🔬

> **Autonomous Multi-Agent Deep Research Platform**  
> Synthesizes hundreds of peer-reviewed journals, patents, and market reports with deterministic citation grounding, contradiction detection, and interactive knowledge graphs.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **ESLint**, **Prettier**, and a curated **Linear + Notion + Vercel** aesthetic.

---

## ✨ Key Features

- 🤖 **Autonomous Multi-Agent Consensus Loop**: Decomposes complex scientific inquiries into parallel search vectors, traverses academic databases, and reconciles conflicting laboratory claims.
- 🎯 **Deterministic Citation Grounding**: Zero-hallucination paragraph-level DOI and patent anchors.
- ⚖️ **Scientific Contradiction Engine**: Identifies experimental condition variances and extracts opposing claims into consensus matrices.
- 🕸️ **Dynamic Knowledge Graph**: Interactive 2D ontology visualizer mapping concepts, methodologies, metrics, and institutions.
- 🎙️ **Dual-Voice Audio Executive Briefings**: Converts 30-page complex dossiers into calibrated 4-minute podcast summaries with waveform controls.
- 📄 **Universal Publishing Exports**: One-click print-ready PDF, clean Markdown, BibTeX reference files (`.bib`), and full JSON datasets.
- 💬 **AI Dossier Copilot Drawer**: Grounded conversational sidebar to query, summarize, and cross-reference specific report sections.
- ⚡ **Global Command Palette (`⌘K` / `Ctrl+K`)**: Rapid navigation and instant agent launcher.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with obsidian dark theme and custom tokens
- **Animations & Micro-interactions**: [Framer Motion](https://www.framer.com/motion/)
- **Charts & Graphs**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) (Dark/Light/System)
- **Code Quality**: ESLint 9 & Prettier

---

## 📁 Project Structure

```
researchforge-ai/
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with ThemeProvider, ResearchProvider, Toaster
│   │   ├── page.tsx               # Home landing page
│   │   ├── globals.css            # Obsidian dark theme, glassmorphism, glowing borders
│   │   ├── research/
│   │   │   └── page.tsx           # Research Studio & Live Agent Orchestrator
│   │   ├── report/
│   │   │   ├── page.tsx           # Reports Gallery Vault
│   │   │   └── [id]/
│   │   │       └── page.tsx       # Deep Research Dossier Viewer
│   │   └── explore/
│   │       └── page.tsx           # Citation Verification Index
│   ├── components/
│   │   ├── layout/                # Navbar, Footer, CommandMenu, ThemeToggle
│   │   ├── home/                  # HeroSection, PipelineVisualizer, InteractiveDemo, FeatureGrid, Pricing
│   │   ├── research/              # QueryStudio, AgentExecutionStream, SourceInspector, HypothesisBoard
│   │   ├── report/                # ReportHeader, ReportBodyViewer, KnowledgeGraph, ContradictionMatrix, ChatSidebar
│   │   └── ui/                    # Button, Badge, Card, Tabs, Dialog, Progress, Switch, Tooltip
│   └── lib/
│       ├── types.ts               # Complete TypeScript data models
│       ├── sample-data.ts         # High-fidelity empirical research reports & simulation steps
│       ├── store.tsx              # React Context for global state & agent runner
│       └── utils.ts               # Class merging, date helpers, file exporter
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
└── .prettierrc
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/researchforge-ai.git
cd researchforge-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 📄 License
MIT License. Built for empirical rigor by the ResearchForge AI team.
