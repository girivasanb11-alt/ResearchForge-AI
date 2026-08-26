import { HeroSection } from "@/components/home/HeroSection";
import { PipelineVisualizer } from "@/components/home/PipelineVisualizer";
import { InteractiveDemo } from "@/components/home/InteractiveDemo";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { BenchmarkMatrix } from "@/components/home/BenchmarkMatrix";
import { PricingSection } from "@/components/home/PricingSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <PipelineVisualizer />
      <InteractiveDemo />
      <FeatureGrid />
      <BenchmarkMatrix />
      <PricingSection />
    </div>
  );
}
