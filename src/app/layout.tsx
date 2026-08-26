import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ResearchProvider } from "@/lib/store";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommandMenu } from "@/components/layout/CommandMenu";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ResearchForge AI — Autonomous Multi-Agent Deep Research Platform",
  description:
    "Production-ready deep research platform. Synthesize hundreds of peer-reviewed papers, patents, and market reports with verified citations, contradiction detection, and interactive knowledge graphs.",
  keywords: [
    "deep research",
    "autonomous agents",
    "academic research",
    "patent analysis",
    "knowledge graphs",
    "AI synthesis",
    "fact checking",
  ],
  authors: [{ name: "ResearchForge AI Core" }],
  openGraph: {
    title: "ResearchForge AI — Autonomous Deep Research Platform",
    description:
      "Synthesize literature, resolve contradictions, and compile deep research dossiers in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("dark", "font-sans", geist.variable)}>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen flex flex-col bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ResearchProvider>
            <div className="relative flex min-h-screen flex-col bg-mesh bg-dot-grid">
              <Navbar />
              <main className="flex-1 w-full">{children}</main>
              <Footer />
              <CommandMenu />
              <Toaster position="bottom-right" richColors theme="dark" />
            </div>
          </ResearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
