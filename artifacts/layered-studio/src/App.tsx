import { useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
import ScrollRevealSection from "@/components/ScrollRevealSection";
import Lenis from "@studio-freight/lenis";
import useDeviceCapabilities from "@/hooks/use-device-capabilities";

const easeOut = [0.16, 1, 0.3, 1] as const;

function App() {
  const [loadingScreenMounted, setLoadingScreenMounted] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const reduceMotion = useReducedMotion();
  const { finePointer, lowPower } = useDeviceCapabilities();

  const handleLoadingComplete = useCallback(() => {
    setLoadingScreenMounted(false);
  }, []);

  const handleReveal = useCallback(() => {
    setContentReady(true);
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (reduceMotion || !finePointer || lowPower) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    let rafId = 0;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [finePointer, lowPower, reduceMotion]);

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
      {finePointer && !reduceMotion && !lowPower && <CustomCursor />}
      {loadingScreenMounted && (
        <LoadingScreen 
          onComplete={handleLoadingComplete} 
          onReveal={handleReveal} 
        />
      )}
      <motion.div
        className="min-h-screen bg-transparent overflow-x-hidden"
        initial={false}
        animate={
          contentReady
            ? { opacity: 1, y: 0, scale: 1 }
            : reduceMotion
              ? { opacity: 0, y: 0, scale: 1 }
              : { opacity: 0, y: 20, scale: 0.988 }
        }
        transition={
          reduceMotion ? { duration: 0 } : { duration: 1.05, ease: easeOut }
        }
      >
        <motion.div
          initial={false}
          animate={
            contentReady
              ? { opacity: 1, y: 0 }
              : reduceMotion
                ? { opacity: 0, y: 0 }
                : { opacity: 0, y: -18 }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.78, delay: 0.12, ease: easeOut }
          }
        >
          <Navbar />
        </motion.div>
        <main>
          <motion.div
            initial={false}
            animate={
              contentReady
                ? { opacity: 1, y: 0 }
                : reduceMotion
                  ? { opacity: 0, y: 0 }
                  : { opacity: 0, y: 40 }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.92, delay: 0.22, ease: easeOut }
            }
          >
            <HeroSection />
          </motion.div>
          <ScrollRevealSection enabled={contentReady}>
            <CapabilitiesSection />
          </ScrollRevealSection>
          <ScrollRevealSection enabled={contentReady}>
            <ProcessSection />
          </ScrollRevealSection>
          <ScrollRevealSection enabled={contentReady}>
            <WorkSection />
          </ScrollRevealSection>
          <ScrollRevealSection enabled={contentReady}>
            <PricingSection />
          </ScrollRevealSection>
          <ScrollRevealSection enabled={contentReady}>
            <TestimonialsSection />
          </ScrollRevealSection>
          <ScrollRevealSection enabled={contentReady}>
            <ContactSection />
          </ScrollRevealSection>
        </main>
        <ScrollRevealSection enabled={contentReady}>
          <Footer />
        </ScrollRevealSection>
      </motion.div>
    </>
  );
}

export default App;
