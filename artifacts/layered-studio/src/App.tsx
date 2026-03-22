import { useEffect, useState, useCallback } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ProcessSection from "@/components/ProcessSection";
import WorkSection from "@/components/WorkSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

import Lenis from "@studio-freight/lenis";

/** Wrapper that staggers each child section's entrance after loading */
function StaggeredSection({
  show,
  delay,
  children,
}: {
  show: boolean;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transition: "opacity 1s ease",
        transitionDelay: show ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis for buttery smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const show = !loading;

  // Reveal on scroll for sections
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  return (
    <>
      <CustomCursor />
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div className="min-h-screen bg-[#080808]">
        <StaggeredSection show={show} delay={100}>
          <Navbar />
        </StaggeredSection>
        <main>
          <StaggeredSection show={show} delay={200}>
            <HeroSection />
          </StaggeredSection>
          <StaggeredSection show={show} delay={400}>
            <CapabilitiesSection />
          </StaggeredSection>
          <StaggeredSection show={show} delay={520}>
            <ProcessSection />
          </StaggeredSection>
          <StaggeredSection show={show} delay={640}>
            <WorkSection />
          </StaggeredSection>
          <StaggeredSection show={show} delay={760}>
            <PricingSection />
          </StaggeredSection>
          <StaggeredSection show={show} delay={880}>
            <TestimonialsSection />
          </StaggeredSection>
          <StaggeredSection show={show} delay={1000}>
            <ContactSection />
          </StaggeredSection>
        </main>
        <StaggeredSection show={show} delay={1120}>
          <Footer />
        </StaggeredSection>
      </div>
    </>
  );
}

export default App;

