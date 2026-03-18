import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    desc: "Deep dive into your goals, audience, and competitive landscape to uncover what makes your project unique.",
    side: "right" as const,
  },
  {
    number: "02",
    title: "Strategy",
    desc: "Define the architecture, user flows, and technical approach that will power your digital presence.",
    side: "left" as const,
  },
  {
    number: "03",
    title: "Design",
    desc: "Craft pixel-perfect interfaces with motion and personality — every detail intentional, every screen immersive.",
    side: "right" as const,
  },
  {
    number: "04",
    title: "Development",
    desc: "Build with modern frameworks, clean code, and performance-first engineering that scales with your ambitions.",
    side: "left" as const,
  },
  {
    number: "05",
    title: "Launch",
    desc: "Deploy with zero-downtime pipelines, comprehensive testing, and SEO-optimised rollout.",
    side: "right" as const,
  },
  {
    number: "06",
    title: "Support",
    desc: "Ongoing maintenance, performance monitoring, and iterative improvements to keep you ahead.",
    side: "left" as const,
  },
];

const STEP_H    = 210;
const TOTAL_H   = STEP_H * steps.length;

// SVG viewBox is 0 0 1000 TOTAL_H
// Nodes swing wide: right=72%, left=28%
const NODE_R = 720;
const NODE_L = 280;

const nodeCX = (side: "left" | "right") => side === "right" ? NODE_R : NODE_L;
const nodeY  = (i: number) => STEP_H * i + STEP_H / 2;

function buildPath() {
  // Start from top-centre, sweep down
  let d = `M 500 30`;
  // Curve to first node
  const y0 = nodeY(0);
  d += ` C 500 ${y0 * 0.4}, ${nodeCX(steps[0].side)} ${y0 * 0.7}, ${nodeCX(steps[0].side)} ${y0}`;
  // Remaining segments — wide S-curves
  for (let i = 1; i < steps.length; i++) {
    const x0 = nodeCX(steps[i - 1].side);
    const yp = nodeY(i - 1);
    const x1 = nodeCX(steps[i].side);
    const y1 = nodeY(i);
    const t  = STEP_H * 0.52; // tension drives how far each arm sweeps
    d += ` C ${x0} ${yp + t}, ${x1} ${y1 - t}, ${x1} ${y1}`;
  }
  return d;
}

const svgPath = buildPath();

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef    = useRef<SVGPathElement>(null);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const section = sectionRef.current;
    const path    = pathRef.current;
    if (!section || !path) return;

    const total = path.getTotalLength();
    path.style.strokeDasharray  = `${total}`;
    path.style.strokeDashoffset = `${total}`;

    const onScroll = () => {
      const rect    = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start   = windowH * 0.8;
      const end     = -rect.height + windowH * 0.6;
      const raw     = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      path.style.strokeDashoffset = `${total * (1 - Math.min(1, raw * 1.12))}`;
      setActiveStep(Math.ceil(Math.min(1, raw * 1.2) * steps.length) - 1);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-32 px-6 relative overflow-hidden"
      style={{ minHeight: "200vh" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="mb-16 text-center">
          <div className="section-label mb-4">How We Work</div>
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Process
          </h2>
          <p className="text-white/40 mt-4 text-lg max-w-md mx-auto leading-relaxed">
            A structured approach that delivers exceptional results, every time.
          </p>
        </div>

        {/* Canvas: full-width SVG + absolutely positioned labels */}
        <div className="relative" style={{ height: TOTAL_H }}>

          {/* SVG spans the full container, stretches to fill */}
          <svg
            viewBox={`0 0 1000 ${TOTAL_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            {/* Ghost path */}
            <path
              d={svgPath}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Glowing animated path */}
            <path
              ref={pathRef}
              d={svgPath}
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="1.6"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 5px rgba(255,255,255,0.7))" }}
            />
            {/* Nodes */}
            {steps.map((step, i) => {
              const cx  = nodeCX(step.side);
              const cy  = nodeY(i);
              const lit = i <= activeStep;
              return (
                <g key={i}>
                  <circle
                    cx={cx} cy={cy} r="7"
                    fill={lit ? "white" : "rgba(255,255,255,0.07)"}
                    stroke={lit ? "white" : "rgba(255,255,255,0.25)"}
                    strokeWidth="1.5"
                    style={{
                      transition: "fill 0.35s ease",
                      filter: lit ? "drop-shadow(0 0 10px rgba(255,255,255,0.9))" : "none",
                    }}
                  />
                  {lit && (
                    <circle
                      cx={cx} cy={cy} r="14"
                      fill="none"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="1"
                      style={{ animation: "ping 1.6s ease-out infinite" }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Text labels — percentage-positioned to match SVG nodes */}
          {steps.map((step, i) => {
            const isRight  = step.side === "right";
            const isActive = i <= activeStep;
            // Top aligns to the node's vertical centre in the percentage space
            const topPct   = `${((nodeY(i) - 48) / TOTAL_H) * 100}%`;

            return (
              <div
                key={i}
                className="absolute"
                style={{
                  top:        topPct,
                  // Right labels start just past the node (NODE_R/1000 ≈ 72%)
                  // Left labels end just before the node (NODE_L/1000 ≈ 28%)
                  left:       isRight ? `${(NODE_R / 1000) * 100 + 3}%` : "auto",
                  right:      isRight ? "auto" : `${100 - (NODE_L / 1000) * 100 + 3}%`,
                  maxWidth:   "22%",
                  opacity:    isActive ? 1 : 0,
                  transform:  isActive
                    ? "translateX(0)"
                    : isRight ? "translateX(28px)" : "translateX(-28px)",
                  transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
                  transitionDelay: isActive ? "0.05s" : "0s",
                }}
              >
                <div className="text-white/30 text-[11px] font-mono mb-0.5 leading-none">{step.number}</div>
                <h3 className="text-base font-bold text-white mb-1 leading-snug">{step.title}</h3>
                <p className="text-[11px] text-white/45 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes ping {
          0%   { transform: scale(1);   opacity: 0.5; }
          100% { transform: scale(2.2); opacity: 0;   }
        }
      `}</style>
    </section>
  );
}
