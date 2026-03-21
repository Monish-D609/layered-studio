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

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

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
      <div
        className={`min-h-screen bg-[#080808] transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <CustomCursor />
        <Navbar />
        <main>
          <HeroSection />
          <CapabilitiesSection />
          <ProcessSection />
          <WorkSection />
          <PricingSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;

