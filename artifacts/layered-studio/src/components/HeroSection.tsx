import { useEffect, useRef } from "react";

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const delays = [
      { el: headingRef.current, delay: 100 },
      { el: subRef.current, delay: 400 },
      { el: ctaRef.current, delay: 650 },
    ];
    const timers = delays.map(({ el, delay }) =>
      setTimeout(() => {
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const fadeUp = {
    opacity: 0,
    transform: "translateY(32px)",
    transition: "opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1)",
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 pt-28 pb-20 overflow-hidden grid-bg hero-glow">
      <div className="max-w-6xl mx-auto w-full">

        {/* Label */}
        <div
          className="section-label mb-10"
          style={{ ...fadeUp, opacity: 1, transform: "translateY(0)", transition: "none" }}
        >
          Web Design &amp; Development Agency
        </div>

        {/* Headline */}
        <h1
          ref={headingRef}
          style={fadeUp}
          className="font-extrabold text-white mb-8"
        >
          <span
            className="block"
            style={{ fontSize: "clamp(2.6rem, 6vw, 6rem)", lineHeight: 1.08, letterSpacing: "-0.025em" }}
          >
            We Build Websites
          </span>
          <span
            className="block"
            style={{ fontSize: "clamp(2.6rem, 6vw, 6rem)", lineHeight: 1.08, letterSpacing: "-0.025em" }}
          >
            That Feel Like
          </span>
          <span
            className="block"
            style={{ fontSize: "clamp(2.6rem, 6vw, 6rem)", lineHeight: 1.08, letterSpacing: "-0.025em" }}
          >
            Products.
          </span>
        </h1>

        {/* Subheading */}
        <p
          ref={subRef}
          style={fadeUp}
          className="text-white/45 text-base md:text-lg max-w-md mb-12 leading-relaxed"
        >
          Layered Studio designs and develops powerful websites for startups and
          businesses that want to stand out online.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} style={fadeUp} className="flex flex-wrap gap-4">
          <button
            onClick={() => scrollTo("#contact")}
            className="btn-primary px-8 py-3.5 rounded-full font-semibold text-sm"
          >
            Start Your Project
          </button>
          <button
            onClick={() => scrollTo("#work")}
            className="btn-outline px-8 py-3.5 rounded-full font-semibold text-sm"
          >
            View Work
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-bounce">
        <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
        <span className="text-white/20 text-[10px] tracking-[0.25em]">SCROLL</span>
      </div>

      {/* Ambient glows */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-white/[0.015] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-white/[0.02] blur-3xl pointer-events-none" />
    </section>
  );
}
