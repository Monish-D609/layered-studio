import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

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
      className={`relative overflow-hidden px-8 py-4 w-60 uppercase text-[12px] font-medium tracking-[0.15em] border ${
        isPrimary
          ? "bg-white border-white"
          : "bg-transparent border-[#222]"
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
          background: isPrimary ? "#161616" : "#e5e5e5",
          scale: hovering ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
      {/* Text with Difference Blending */}
      <span className="relative z-10 mix-blend-difference text-white pointer-events-none">
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

  const dropVariants = {
    hidden: { opacity: 0, y: -40, rotateX: -15, scale: 0.95, filter: "blur(8px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { duration: 1.2 } 
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 pt-28 pb-20 overflow-hidden grid-bg hero-glow" style={{ perspective: "1200px" }}>
      <motion.div 
        className="max-w-6xl mx-auto w-full"
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
            className="block origin-top bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent" 
            style={{ fontSize: "clamp(2.6rem, 6vw, 6rem)", lineHeight: 1.08, letterSpacing: "-0.025em", textShadow: "0 0 30px rgba(255,255,255,0.1)" }}
          >
            We Build Websites
          </motion.span>
          <motion.span 
            variants={dropVariants} 
            className="block origin-top bg-gradient-to-b from-white via-white/80 to-white/30 bg-clip-text text-transparent" 
            style={{ fontSize: "clamp(2.6rem, 6vw, 6rem)", lineHeight: 1.08, letterSpacing: "-0.025em", textShadow: "0 0 40px rgba(255,255,255,0.05)" }}
          >
            That Feel Like
          </motion.span>
          <motion.span 
            variants={dropVariants} 
            className="block origin-top bg-gradient-to-b from-white via-white/70 to-white/20 bg-clip-text text-transparent" 
            style={{ fontSize: "clamp(2.6rem, 6vw, 6rem)", lineHeight: 1.08, letterSpacing: "-0.025em", textShadow: "0 0 50px rgba(255,255,255,0.05)" }}
          >
            Products.
          </motion.span>
        </h1>

        {/* Subheading */}
        <motion.p variants={dropVariants} className="text-white/45 text-base md:text-lg max-w-md mb-12 leading-relaxed">
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
        <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
        <span className="text-white/20 text-[10px] tracking-[0.25em]">SCROLL</span>
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
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 z-0" style={{ transform: "translateZ(0)" }}>
        <div
          className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full bg-[#1b253b] blur-[80px]"
          style={{ animation: "drift1 20s infinite linear", willChange: "transform" }}
        />
        <div
          className="absolute bottom-[-10%] left-[5%] w-[600px] h-[600px] rounded-full bg-[#3c2a38] blur-[80px]"
          style={{ animation: "drift2 25s infinite linear", willChange: "transform" }}
        />
        <div
          className="absolute top-[40%] left-[30%] w-[500px] h-[500px] rounded-full bg-[#142621] blur-[80px]"
          style={{ animation: "drift3 30s infinite linear", willChange: "transform" }}
        />
      </div>
    </section>
  );
}

