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
  const [currentIndex, setCurrentIndex] = useState(3); // Start at 04 as in screenshot

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

      {/* 3D Coverflow Carousel */}
      <div className="relative h-[450px] w-full max-w-[1400px] mx-auto flex items-center justify-center">
        <AnimatePresence initial={false}>
          {projects.map((proj, index) => {
            const offset = index - currentIndex;
            const isCenter = offset === 0;

            // Calculate styles based on offset
            const xOffset = offset * 260; // Spread cards horizontally
            const scale = isCenter ? 1 : 0.85 - Math.abs(offset) * 0.05;
            const zIndex = 50 - Math.abs(offset);
            const opacity = isCenter ? 1 : Math.max(0, 0.4 - Math.abs(offset) * 0.1);

            return (
              <motion.div
                key={proj.number}
                className={`absolute w-[360px] md:w-[420px] h-[320px] md:h-[380px] rounded-2xl bg-[#0f0f0f] border border-white/[0.04] overflow-hidden flex flex-col justify-end p-8 ${
                  !isCenter ? "cursor-pointer" : ""
                }`}
                style={{ zIndex }}
                initial={{ opacity: 0, x: xOffset + Math.sign(offset) * 50, scale: 0.8 }}
                animate={{
                  opacity,
                  x: xOffset,
                  scale,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.32, 0.72, 0, 1],
                }}
                onClick={() => {
                  if (!isCenter) setCurrentIndex(index);
                }}
                data-cursor-hover
              >
                {/* Giant faint background number */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white/[0.04] text-7xl md:text-8xl font-black tracking-tighter">
                    {proj.number}
                  </span>
                </div>

                {/* Content */}
                <motion.div 
                  className="relative z-10"
                  animate={{ opacity: isCenter ? 1 : 0.3 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-white/40 text-[10px] md:text-xs font-mono font-semibold tracking-widest mb-2 uppercase">
                    {proj.type}
                  </div>
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                    {proj.name}
                  </h3>
                  <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-[280px]">
                    {proj.desc}
                  </p>
                </motion.div>

                {/* Subtle gradient overlay when not centered to simulate shadow */}
                {!isCenter && (
                  <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Pagination & Instructions */}
      <div className="mt-12 flex flex-col items-center gap-4">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === idx
                  ? "w-8 h-1.5 bg-white"
                  : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to project ${idx + 1}`}
            />
          ))}
        </div>
        
        {/* Helper Text */}
        <div className="text-white/40 text-[11px] md:text-xs font-medium tracking-wide">
          Drag or click to explore projects
        </div>
      </div>
    </section>
  );
}
