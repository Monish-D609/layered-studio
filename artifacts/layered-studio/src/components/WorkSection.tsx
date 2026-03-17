import { useRef } from "react";

const projects = [
  {
    number: "01",
    type: "TECH STARTUP WEBSITE",
    name: "Vertex Labs",
    desc: "Premium landing experience for a deep-tech startup building next-generation tools.",
    color: "from-blue-900/30",
  },
  {
    number: "02",
    type: "SAAS DASHBOARD",
    name: "Orbit",
    desc: "Interactive analytics dashboard with immersive data visualization and real-time updates.",
    color: "from-purple-900/30",
  },
  {
    number: "03",
    type: "AI PLATFORM",
    name: "NeuralFlow",
    desc: "Cinematic website for an AI research company with scroll-driven storytelling.",
    color: "from-emerald-900/30",
  },
  {
    number: "04",
    type: "DESIGNER PORTFOLIO",
    name: "Orbit Portfolio",
    desc: "Interactive portfolio website with immersive scroll storytelling.",
    color: "from-orange-900/30",
  },
  {
    number: "05",
    type: "E-COMMERCE PLATFORM",
    name: "Zenith Commerce",
    desc: "Elegant storefront design with smooth browsing and modern UI interactions.",
    color: "from-rose-900/30",
  },
  {
    number: "06",
    type: "FINTECH APP",
    name: "Meridian",
    desc: "Clean, trustworthy financial platform with crisp data hierarchy and micro-animations.",
    color: "from-cyan-900/30",
  },
];

// Duplicate for seamless loop
const allProjects = [...projects, ...projects];

export default function WorkSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section id="work" className="py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="section-label mb-4">Portfolio</div>
        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
          Selected Work
        </h2>
        <p className="text-white/40 mt-4 text-base">
          A glimpse into what we've built.
        </p>
      </div>

      {/* Auto-scrolling carousel — independent of cursor */}
      <div className="relative overflow-hidden">
        <div ref={trackRef} className="marquee-track">
          {allProjects.map((proj, i) => (
            <div
              key={`${proj.number}-${i}`}
              className="work-card"
              data-cursor-hover
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${proj.color} to-transparent`}
              />

              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div>
                  <div className="text-white/25 text-xs font-mono mb-1">
                    {proj.type}
                  </div>
                  <div className="text-white/10 text-7xl font-black absolute top-6 right-8">
                    {proj.number}
                  </div>
                </div>

                <div>
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {proj.name}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                    {proj.desc}
                  </p>

                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-white/[0.02] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
