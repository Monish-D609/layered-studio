import { useEffect, useRef } from "react";

const capabilities = [
  {
    number: "01",
    title: "Custom Websites",
    description:
      "High-performance responsive websites built from scratch with modern frameworks and pixel-perfect design.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    number: "02",
    title: "Full Stack Development",
    description:
      "Complete frontend, backend, and database solutions engineered for scale, reliability, and seamless performance.",
    tags: ["Node.js", "PostgreSQL", "APIs"],
  },
  {
    number: "03",
    title: "Business Websites",
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
        <div className="mb-16 reveal">
          <div className="section-label mb-4">What We Do</div>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
            Capabilities
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.number}
              className="glass-card rounded-2xl p-8 reveal"
            >
              <div className="text-white/20 text-xs font-mono mb-6">
                {cap.number}
              </div>
              <h3 className="text-white text-2xl font-bold mb-4">
                {cap.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                {cap.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-white/40 border border-white/10 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
