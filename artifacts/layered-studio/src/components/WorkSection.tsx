import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <section id="work" className="py-32 overflow-hidden bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#6E8898] mb-4">
          PORTFOLIO
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
          Selected Work
        </h2>
      </div>

      {/* Lotus 3D Coverflow Carousel - Perspective is key for rotateY */}
      <div 
        className="relative h-[450px] md:h-[550px] w-full mx-auto flex items-center justify-center overflow-hidden"
        style={{ perspective: "1500px" }}
      >
        <AnimatePresence initial={false}>
          {projects.map((proj, index) => {
            const offset = index - currentIndex;
            const absOffset = Math.abs(offset);
            const isCenter = offset === 0;

            // Lotus Architecture (Looking inward):
            const rotateY = isCenter ? 0 : offset > 0 ? -25 : 25;
            
            // Progressive Spacing: Ensure at least 2 cards fit clearly on each side before clipping.
            // On desktop: center(0) -> side(320) -> far-side(640) 
            const xOffset = offset * (typeof window !== 'undefined' && window.innerWidth < 768 ? 220 : 340);
            
            // Progressive Scaling & Depth
            const scale = isCenter ? 1 : Math.max(0.6, 0.9 - absOffset * 0.15);
            const zIndex = 50 - absOffset;
            
            // Progressive Fading/Dilution: Keep appealing but slightly receded
            let opacity = 1;
            if (absOffset === 1) opacity = 0.95;
            if (absOffset === 2) opacity = 0.7;
            if (absOffset >= 3) opacity = 0; // Hide anything further than 2 cards away

            return (
              <motion.div
                key={proj.number}
                className={`absolute w-[340px] md:w-[460px] h-[400px] md:h-[500px] rounded-2xl bg-[#0f0f0f] border border-white/[0.04] overflow-hidden flex flex-col justify-end p-8 md:p-10 ${
                  !isCenter ? "cursor-pointer" : ""
                }`}
                style={{ 
                  zIndex,
                  // We simulate lighting by making the edge darker based on rotation
                  boxShadow: isCenter ? "0 30px 60px rgba(0,0,0,0.6)" : "0 10px 30px rgba(0,0,0,0.9)",
                }}
                initial={{ opacity: 0, x: xOffset + Math.sign(offset) * 100, scale: 0.8, rotateY }}
                animate={{
                  opacity,
                  x: xOffset,
                  scale,
                  rotateY,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.32, 0.72, 0, 1], // Buttery smooth customized cubic bezier
                }}
                onClick={() => {
                  if (!isCenter) setCurrentIndex(index);
                }}
                data-cursor-hover
              >
                {/* Giant faint background number */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white/[0.04] text-[120px] md:text-[180px] font-black tracking-tighter">
                    {proj.number}
                  </span>
                </div>

                {/* Content */}
                <motion.div 
                  className="relative z-10"
                  animate={{ opacity: isCenter ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-white/40 text-[10px] md:text-[11px] font-mono font-semibold tracking-widest mb-3 uppercase">
                    {proj.type}
                  </div>
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-3">
                    {proj.name}
                  </h3>
                  <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-[300px]">
                    {proj.desc}
                  </p>
                </motion.div>

                {/* Less aggressive darken overlay for side cards so they stay vibrant */}
                {!isCenter && (
                  <div 
                    className="absolute inset-0 pointer-events-none" 
                    style={{ background: `rgba(0,0,0, ${0.2 + absOffset * 0.1})` }}
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Pagination Controls */}
      <div className="mt-12 flex flex-col items-center gap-5">
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
          Click cards to navigate
        </div>
      </div>
    </section>
  );
}
