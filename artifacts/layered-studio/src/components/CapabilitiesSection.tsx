import { useEffect, useRef } from "react";
import { Globe, Layers, Building } from "lucide-react";

const capabilities = [
  {
    number: "01",
    title: "Custom Websites",
    icon: Globe,
    description:
      "High-performance responsive websites built from scratch with modern frameworks and pixel-perfect design.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    number: "02",
    title: "Full Stack Development",
    icon: Layers,
    description:
      "Complete frontend, backend, and database solutions engineered for scale, reliability, and seamless performance.",
    tags: ["Node.js", "PostgreSQL", "APIs"],
  },
  {
    number: "03",
    title: "Business Websites",
    icon: Building,
    description:
      "Professional websites designed to attract customers, build trust, and drive meaningful conversions.",
    tags: ["SEO", "Analytics", "CMS"],
  },
];

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="capabilities" ref={sectionRef} className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 reveal text-center">
          <div className="section-label mb-4">What We Do</div>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
            Capabilities
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.number}
                className="glass-card rounded-2xl p-8 reveal transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/5 group border border-transparent hover:border-white/10 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-center justify-between mb-8">
                  <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/5 group-hover:bg-white/[0.08] group-hover:border-white/20 transition-all duration-500">
                    <Icon className="w-6 h-6 text-white/50 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  <div className="relative z-10 text-white/20 group-hover:text-white/40 transition-colors duration-300 text-xs font-mono">
                    {cap.number}
                  </div>
                </div>

                <h3 className="relative z-10 text-white text-2xl font-bold mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                {cap.title}
              </h3>
              <p className="relative z-10 text-white/50 text-sm leading-relaxed mb-8 group-hover:text-white/70 transition-colors duration-300">
                {cap.description}
              </p>
              <div className="relative z-10 flex flex-wrap gap-2">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-white/40 border border-white/10 rounded-full px-3 py-1 transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white/70 group-hover:border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
