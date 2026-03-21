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
        transform: show ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: show ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

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
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div className="min-h-screen bg-[#080808]">
        <StaggeredSection show={show} delay={100}>
          <CustomCursor />
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

