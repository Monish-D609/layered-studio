import { useState, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

const projects = [
  {
    number: "01",
    type: "TECH STARTUP WEBSITE",
    name: "Vertex Labs",
    desc: "Premium landing experience for a deep-tech startup building next-generation tools.",
  },
  {
    number: "02",
    type: "SAAS DASHBOARD",
    name: "Orbit",
    desc: "Interactive analytics dashboard with immersive data visualization and real-time updates.",
  },
  {
    number: "03",
    type: "AI PLATFORM",
    name: "NeuralFlow",
    desc: "Cinematic website for an AI research company with scroll-driven storytelling.",
  },
  {
    number: "04",
    type: "DESIGNER PORTFOLIO",
    name: "Orbit Portfolio",
    desc: "Interactive portfolio website with immersive scroll storytelling.",
  },
  {
    number: "05",
    type: "E-COMMERCE PLATFORM",
    name: "Zenith Commerce",
    desc: "Elegant storefront design with smooth browsing and modern UI interactions.",
  },
  {
    number: "06",
    type: "FINTECH APP",
    name: "Meridian",
    desc: "Clean, trustworthy financial platform with crisp data hierarchy and micro-animations.",
  },
];

export default function WorkSection() {
  const [currentIndex, setCurrentIndex] = useState(4); // Start at 05 as in screenshot
  const dragStartRef = useRef(currentIndex);

  // Real-time Scrub Gesture Handlers
  const handlePanStart = () => {
    // Record the active index precisely when the user grabs the carousel
    dragStartRef.current = currentIndex;
  };

  const handlePan = (event: any, info: PanInfo) => {
    // 120px physical drag threshold = 1 index jump
    // Negative offset means user dragged left, which means we want to advance index (+)
    const swipeDelta = Math.round(-info.offset.x / 120);
    
    // Add delta to the starting index
    const nextIndex = dragStartRef.current + swipeDelta;
    const clampedIndex = Math.max(0, Math.min(nextIndex, projects.length - 1));
    
    // If the drag crosses the threshold into the next mathematical cell, immediately update it!
    // This allows the cards to dynamically spin in/out of center LIVE as the cursor is moving.
    if (clampedIndex !== currentIndex) {
      setCurrentIndex(clampedIndex);
    }
  };

  return (
    <section id="work" className="py-24 overflow-hidden bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#6E8898] mb-4">
          PORTFOLIO
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
          Selected Work
        </h2>
      </div>

      {/* 
        Interactive 3D Perspective Drag Container
        Now uses onPan to dynamically swap indices mid-drag without physically distorting the outer container!
      */}
      <motion.div 
        className="relative h-[380px] md:h-[480px] w-full mx-auto flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ perspective: "1500px", touchAction: "none" }} // touchAction required to trap panning perfectly
        onPanStart={handlePanStart}
        onPan={handlePan}
      >
        <AnimatePresence initial={false}>
          {projects.map((proj, index) => {
            const offset = index - currentIndex;
            const absOffset = Math.abs(offset);
            const isCenter = offset === 0;

            // Lotus Architecture (Looking inward):
            const rotateY = isCenter ? 0 : offset > 0 ? -25 : 25;
            
            // Scaled Geometry: Shrink the actual cards heavily to balance frame ratio
            const baseSpread = typeof window !== 'undefined' && window.innerWidth < 768 ? 160 : 250;
            const xOffset = offset * baseSpread;
            
            // Progressive Scaling & Depth (Cards are visually smaller around the center)
            const scale = isCenter ? 1 : Math.max(0.6, 0.9 - absOffset * 0.15);
            const zIndex = 50 - absOffset;
            
            // Eliminate the fade entirely to keep the outer cards extremely bold and prominent
            let opacity = 1;
            if (absOffset >= 3) opacity = 0; // Still hide anything mathematically way off-track

            return (
              <motion.div
                key={proj.number}
                /* Dimensions massively reduced for premium frame ratio sizing */
                className={`absolute w-[260px] md:w-[360px] h-[340px] md:h-[440px] rounded-2xl bg-[#0f0f0f] border border-white/[0.04] overflow-hidden flex flex-col justify-end p-8 ${
                  !isCenter ? "" : ""
                }`}
                style={{ 
                  zIndex,
                  boxShadow: isCenter ? "0 30px 60px rgba(0,0,0,0.6)" : "0 10px 30px rgba(0,0,0,0.9)",
                }}
                // We add an extra spacing bump for adjacent cards mathematically
                initial={{ opacity: 0, x: xOffset + Math.sign(offset) * 60, scale: 0.8, rotateY }}
                animate={{
                  opacity,
                  x: xOffset,
                  scale,
                  rotateY,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.32, 0.72, 0, 1], // Buttery smooth customized cubic bezier
                }}
                onClick={() => {
                  if (!isCenter) setCurrentIndex(index);
                }}
                data-cursor-hover
              >
                {/* Giant faint background number */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white/[0.04] text-[100px] md:text-[140px] font-black tracking-tighter">
                    {proj.number}
                  </span>
                </div>

                {/* Content */}
                <motion.div 
                  className="relative z-10"
                  animate={{ opacity: isCenter ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-white/40 text-[10px] font-mono font-semibold tracking-widest mb-2 uppercase">
                    {proj.type}
                  </div>
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-2 tracking-tight">
                    {proj.name}
                  </h3>
                  <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-[280px]">
                    {proj.desc}
                  </p>
                </motion.div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Pagination Controls */}
      <div className="mt-8 flex flex-col items-center gap-5">
        <div className="flex items-center gap-3">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === idx
                  ? "w-10 h-1.5 bg-white"
                  : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to project ${idx + 1}`}
            />
          ))}
        </div>
        
        <div className="text-white/30 text-[11px] font-medium tracking-widest uppercase">
          Drag or click cards to navigate
        </div>
      </div>
    </section>
  );
}
