import { useEffect, useRef, useState } from "react";

function MagnetButton({
  children,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const baseRect = useRef<DOMRect | null>(null);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = () => {
    setHovering(true);
    if (btnRef.current) {
      baseRect.current = btnRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!baseRect.current) return;
    
    // Calculate off the static un-transformed dimensions captured at mouse enter
    // This prevents the button from "jittering" as its own movement changes the bounding rect
    const rect = baseRect.current;
    
    // Position inside the original un-shifted bounding box for the spotlight
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    // Physical button stickiness - calculates delta from the exact center of the button
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    setTranslate({
      x: (e.clientX - centerX) * 0.25, // 0.25 stickiness factor
      y: (e.clientY - centerY) * 0.25,
    });
  };

  const handleMouseLeave = () => {
    setHovering(false);
    setTranslate({ x: 0, y: 0 }); // snap back to pure center
    baseRect.current = null;
  };

  const isPrimary = variant === "primary";

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden px-8 py-4 w-60 uppercase text-[12px] font-bold tracking-[0.15em] border ${
        isPrimary
          ? "bg-white border-white"
          : "bg-transparent border-[#222]"
      }`}
      style={{
        cursor: "none",
        transform: `translate(${translate.x}px, ${translate.y}px)`,
        // Instant/linear tracking while hovering, smoothly snapping spring while exiting
        transition: hovering 
          ? "transform 0.1s linear, background-color 0.3s, border-color 0.3s"
          : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.3s, border-color 0.3s"
      }}
    >
      {/* Background Hover Circle */}
      <div
        className="absolute w-[180px] h-[180px] rounded-full pointer-events-none transition-opacity duration-300 z-0"
        style={{
          left: pos.x - 90,
          top: pos.y - 90,
          opacity: hovering ? 1 : 0,
          background: isPrimary ? "#161616" : "#e5e5e5",
          transform: `scale(${hovering ? 1 : 0})`,
          transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s",
        }}
      />
      {/* Text with Difference Blending to auto-invert against the background */}
      <span className="relative z-10 mix-blend-difference text-white pointer-events-none">
        {children}
      </span>
    </button>
  );
}

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
          className="font-bold text-white mb-8"
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
          <MagnetButton variant="primary" onClick={() => scrollTo("#contact")}>
            Start Your Project
          </MagnetButton>
          <MagnetButton variant="secondary" onClick={() => scrollTo("#work")}>
            View Work
          </MagnetButton>
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

