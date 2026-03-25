import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";

// Background image sourced from the Cursor-uploaded shared assets folder.
// Vite must be allowed to read this path via `vite.config.ts` -> `server.fs.allow`.
const heroBgUrl = "/assets/hero-bg.png";

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
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const translateX = useSpring(0, springConfig);
  const translateY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    
    // Position for spotlight
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

    // Physical button stickiness
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    translateX.set((e.clientX - centerX) * 0.25);
    translateY.set((e.clientY - centerY) * 0.25);
  };

  const handleMouseEnter = () => setHovering(true);
  
  const handleMouseLeave = () => {
    setHovering(false);
    translateX.set(0);
    translateY.set(0);
  };

  const isPrimary = variant === "primary";

  return (
    <motion.button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden px-8 py-4 w-60 uppercase text-[11px] font-semibold tracking-[0.18em] rounded-lg border ${
        isPrimary
          ? "bg-[#d1d1d1] border-[#d1d1d1] text-[#0a0a0a]"
          : "bg-transparent border-white/20 text-white"
      }`}
      style={{
        cursor: "none",
        x: translateX,
        y: translateY,
      }}
    >
      {/* Background Hover Circle */}
      <motion.div
        className="absolute w-[180px] h-[180px] rounded-full pointer-events-none z-0"
        style={{
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
          opacity: hovering ? 1 : 0,
          background: isPrimary ? "rgba(10, 10, 10, 0.12)" : "rgba(255, 255, 255, 0.08)",
          scale: hovering ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
      <span
        className={`relative z-10 pointer-events-none ${
          isPrimary ? "text-[#0a0a0a]" : "text-white"
        }`}
      >
        {children}
      </span>
    </motion.button>
  );
}

export default function HeroSection() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const dropVariants: Variants = {
    hidden: { opacity: 0, y: -40, rotateX: -15, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      scale: 1, 
      transition: { duration: 1.2, ease: "easeOut" } 
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 pt-28 pb-20 overflow-hidden grid-bg hero-glow" style={{ perspective: "1200px" }}>
      {/* Hero background image */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${heroBgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.55) contrast(1.08) saturate(1.1)",
          transform: "translateZ(0)",
        }}
      />

      {/* Dark overlay for readable typography */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.70) 55%, rgba(0,0,0,0.80) 100%)",
        }}
      />

      <motion.div 
        className="relative z-10 max-w-6xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Label */}
        <motion.div variants={dropVariants} className="section-label mb-10 inline-block">
          Web Design &amp; Development Agency
        </motion.div>

        {/* Headline */}
        <h1 className="font-bold text-white mb-8">
          <motion.span 
            variants={dropVariants} 
            className="block origin-top bg-gradient-to-b from-white via-[#e8e8e8] to-[#9a9a9a] bg-clip-text text-transparent" 
            style={{ fontSize: "clamp(2.6rem, 6vw, 6rem)", lineHeight: 1.06, letterSpacing: "-0.03em" }}
          >
            We Build Websites
          </motion.span>
          <motion.span 
            variants={dropVariants} 
            className="block origin-top bg-gradient-to-b from-white via-[#dedede] to-[#8a8a8a] bg-clip-text text-transparent" 
            style={{ fontSize: "clamp(2.6rem, 6vw, 6rem)", lineHeight: 1.06, letterSpacing: "-0.03em" }}
          >
            That Feel Like
          </motion.span>
          <motion.span 
            variants={dropVariants} 
            className="block origin-top bg-gradient-to-b from-white via-[#d4d4d4] to-[#7a7a7a] bg-clip-text text-transparent" 
            style={{ fontSize: "clamp(2.6rem, 6vw, 6rem)", lineHeight: 1.06, letterSpacing: "-0.03em" }}
          >
            Products.
          </motion.span>
        </h1>

        {/* Subheading */}
        <motion.p variants={dropVariants} className="text-theme-muted text-base md:text-lg max-w-md mb-12 leading-relaxed">
          Layered Studio designs and develops powerful websites for startups and
          businesses that want to stand out online.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={dropVariants} className="flex flex-wrap gap-4">
          <MagnetButton variant="primary" onClick={() => scrollTo("#contact")}>
            Start Your Project
          </MagnetButton>
          <MagnetButton variant="secondary" onClick={() => scrollTo("#work")}>
            View Work
          </MagnetButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-bounce">
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
        <span className="text-white/25 text-[10px] tracking-[0.28em] font-medium">SCROLL</span>
      </div>

      {/* Independent Hardware-Accelerated CSS Keyframes */}
      <style>{`
        @keyframes drift1 {
          0% { transform: translate3d(0px, 0px, 0px); }
          33% { transform: translate3d(-100px, 100px, 0px); }
          66% { transform: translate3d(50px, -50px, 0px); }
          100% { transform: translate3d(0px, 0px, 0px); }
        }
        @keyframes drift2 {
          0% { transform: translate3d(0px, 0px, 0px); }
          33% { transform: translate3d(150px, -100px, 0px); }
          66% { transform: translate3d(-50px, 50px, 0px); }
          100% { transform: translate3d(0px, 0px, 0px); }
        }
        @keyframes drift3 {
          0% { transform: translate3d(0px, 0px, 0px); }
          33% { transform: translate3d(-80px, -120px, 0px); }
          66% { transform: translate3d(100px, 80px, 0px); }
          100% { transform: translate3d(0px, 0px, 0px); }
        }
      `}</style>

      {/* Premium Aurora Mesh - GPU Optimized Architecture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.38] z-[2]" style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}>
        <div
          className="absolute top-[5%] left-[-15%] w-[720px] h-[720px] rounded-full bg-[rgba(120,45,140,0.35)] blur-[80px]"
          style={{ animation: "drift1 25s infinite linear", willChange: "transform" }}
        />
        <div
          className="absolute bottom-[-5%] right-[-10%] w-[780px] h-[780px] rounded-full bg-[rgba(45,75,120,0.32)] blur-[80px]"
          style={{ animation: "drift2 30s infinite linear", willChange: "transform" }}
        />
        <div
          className="absolute top-[35%] left-[25%] w-[480px] h-[480px] rounded-full bg-[rgba(90,40,95,0.2)] blur-[70px]"
          style={{ animation: "drift3 35s infinite linear", willChange: "transform" }}
        />
      </div>
    </section>
  );
}

