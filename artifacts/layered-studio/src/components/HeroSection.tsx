import { useEffect, useRef } from "react";

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden grid-bg hero-glow">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-3xl">
          <div className="section-label mb-8 reveal visible" style={{ transitionDelay: "0.1s" }}>
            Web Design & Development Agency
          </div>

          <h1
            ref={headingRef}
            className="text-[clamp(2.8rem,6.5vw,6.5rem)] font-extrabold leading-[0.95] text-white mb-8"
            style={{ opacity: 0, transform: "translateY(40px)", transition: "opacity 0.9s ease, transform 0.9s ease" }}
          >
            We Build
            <br />
            Websites
            <br />
            That Feel Like
            <br />
            Products.
          </h1>

          <p
            className="text-white/50 text-lg max-w-xl mb-12 reveal visible"
            style={{ transitionDelay: "0.4s" }}
          >
            Layered Studio designs and develops powerful websites for startups
            and businesses that want to stand out online.
          </p>

          <div className="flex flex-wrap gap-4 reveal visible" style={{ transitionDelay: "0.6s" }}>
            <button
              onClick={() => scrollTo("#contact")}
              className="btn-primary px-8 py-4 rounded-full font-semibold text-sm"
            >
              Start Your Project
            </button>
            <button
              onClick={() => scrollTo("#work")}
              className="btn-outline px-8 py-4 rounded-full font-semibold text-sm"
            >
              View Work
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        <span className="text-white/20 text-xs tracking-widest">SCROLL</span>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-white/[0.01] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-white/[0.02] blur-3xl pointer-events-none" />
    </section>
  );
}
