"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ParticleWaveCanvas } from "@/components/canvas/ParticleWaveCanvas";
import { StarField } from "@/components/canvas/StarField";
import { LeftHeroSection } from "@/components/onboarding/LeftHeroSection";
import { RightDashboard } from "@/components/dashboard/RightDashboard";
import { TrustBadges } from "@/components/trust/TrustBadges";
import { AuthModal } from "@/features/auth/AuthModal";

export default function HomePage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030611] text-foreground relative overflow-x-hidden flex flex-col justify-between selection:bg-purple-500 selection:text-white p-4 sm:p-6 lg:p-8">
      {/* 1. Animated Atmospheric Background & Stars */}
      <StarField />

      {/* 2. Real-time 3D Particle Wave Mesh */}
      <ParticleWaveCanvas />

      {/* 3. Main Dual-Pane Master Layout */}
      <main className="w-full max-w-[1720px] mx-auto space-y-8 flex-1">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Left Column: AI-Powered Research Desk Hero & Create Your Account Card */}
          <section className="xl:col-span-4 xl:sticky xl:top-8 space-y-6">
            <LeftHeroSection onOpenSignIn={() => setIsAuthOpen(true)} />
          </section>

          {/* Right Column: Master Enterprise Research Dashboard */}
          <section className="xl:col-span-8 space-y-6">
            <RightDashboard />
          </section>
        </div>

        {/* 4. Bottom 4 Feature Trust Badges */}
        <section className="pt-4">
          <TrustBadges />
        </section>
      </main>

      {/* 5. Clean Enterprise Footer */}
      <footer className="w-full max-w-[1720px] mx-auto pt-8 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-500 border-t border-[#1e293b]/40 mt-8">
        <div>
          © 2025 ResearchForge AI. All rights reserved.
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-400">
          <Link href="/privacy" className="hover:text-slate-200 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-slate-200 transition-colors">
            Terms of Service
          </Link>
          <Link href="/contact" className="hover:text-slate-200 transition-colors">
            Contact
          </Link>
        </div>
      </footer>

      {/* Enterprise Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
