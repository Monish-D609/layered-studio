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
  const [loadingScreenMounted, setLoadingScreenMounted] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setLoadingScreenMounted(false);
  }, []);

  const handleReveal = useCallback(() => {
    setContentReady(true);
  }, []);

  // Reveal on scroll for inner elements that manually trigger .reveal class
  useEffect(() => {
    if (!contentReady) return;
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
  }, [contentReady]);

  return (
    <>
      <CustomCursor />
      {loadingScreenMounted && (
        <LoadingScreen 
          onComplete={handleLoadingComplete} 
          onReveal={handleReveal} 
        />
      )}
      <div className="min-h-screen bg-[#080808]">
        <StaggeredSection show={contentReady} delay={0}>
          <Navbar />
        </StaggeredSection>
        <main>
          <StaggeredSection show={contentReady} delay={100}>
            <HeroSection />
          </StaggeredSection>
          <StaggeredSection show={contentReady} delay={200}>
            <CapabilitiesSection />
          </StaggeredSection>
          <StaggeredSection show={contentReady} delay={300}>
            <ProcessSection />
          </StaggeredSection>
          <StaggeredSection show={contentReady} delay={400}>
            <WorkSection />
          </StaggeredSection>
          <StaggeredSection show={contentReady} delay={500}>
            <PricingSection />
          </StaggeredSection>
          <StaggeredSection show={contentReady} delay={600}>
            <TestimonialsSection />
          </StaggeredSection>
          <StaggeredSection show={contentReady} delay={700}>
            <ContactSection />
          </StaggeredSection>
        </main>
        <StaggeredSection show={contentReady} delay={800}>
          <Footer />
        </StaggeredSection>
      </div>
    </>
  );
}

export default App;

