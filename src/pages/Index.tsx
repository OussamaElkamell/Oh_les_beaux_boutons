import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { SwipeDemoSection } from "@/components/SwipeDemoSection";
import { PillarsSection } from "@/components/PillarsSection";
import { ResultsSection } from "@/components/ResultsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <SwipeDemoSection />
        <PillarsSection />
        <ResultsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
