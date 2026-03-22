import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track vertical scroll progress strictly within this 400vh section
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map vertical scroll (0 to 1) to horizontal translation (0% to -75%)
  // -75% ensures the last card of the 6 stops beautifully within the viewport
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section 
      id="work" 
      ref={targetRef} 
      className="relative h-[400vh] bg-[#080808]"
    >
      {/* Sticky container that locks to the viewport during the 400vh scroll */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Absolute Title Layer */}
        <div className="absolute top-[15%] md:top-[20%] left-0 w-full px-8 md:px-16 pointer-events-none z-10">
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#6E8898] mb-4">
            PORTFOLIO
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tight drop-shadow-2xl">
            Selected Work
          </h2>
        </div>

        {/* The horizontally moving track */}
        <motion.div style={{ x }} className="flex gap-8 px-8 md:px-16 mt-20 items-end">
          {projects.map((proj, idx) => {
            // Slight vertical stagger for aesthetic rhythm
            const isOdd = idx % 2 === 1;
            
            return (
              <div
                key={proj.number}
                className={`group relative flex-shrink-0 w-[85vw] md:w-[460px] h-[500px] rounded-3xl bg-[#0f0f0f] border border-white/[0.04] overflow-hidden flex flex-col justify-end p-10 transition-colors hover:border-white/[0.12] ${isOdd ? 'md:-translate-y-12' : ''}`}
                data-cursor-hover
              >
                {/* Giant faint background number */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-700 group-hover:scale-110">
                  <span className="text-white/[0.02] group-hover:text-white/[0.04] transition-colors duration-500 text-[180px] md:text-[240px] font-black tracking-tighter">
                    {proj.number}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                  <div className="text-white/40 text-[11px] font-mono font-semibold tracking-widest mb-3 uppercase">
                    {proj.type}
                  </div>
                  <h3 className="text-white text-3xl font-bold mb-3">
                    {proj.name}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-[320px]">
                    {proj.desc}
                  </p>
                </div>

                {/* Hover overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            );
          })}
        </motion.div>
        
        {/* Scroll Progress Indicator Bar */}
        <div className="absolute bottom-10 left-8 md:left-16 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-white rounded-full origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
        
      </div>
    </section>
  );
}
