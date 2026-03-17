import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    desc: "Deep dive into your goals, audience, and competitive landscape to uncover what makes your project unique.",
    side: "right",
  },
  {
    number: "02",
    title: "Strategy",
    desc: "Define the architecture, user flows, and technical approach that will power your digital presence.",
    side: "left",
  },
  {
    number: "03",
    title: "Design",
    desc: "Craft pixel-perfect interfaces with motion and personality — every detail intentional, every screen immersive.",
    side: "right",
  },
  {
    number: "04",
    title: "Development",
    desc: "Build with modern frameworks, clean code, and performance-first engineering that scales with your ambitions.",
    side: "left",
  },
  {
    number: "05",
    title: "Launch",
    desc: "Deploy with zero-downtime pipelines, comprehensive testing, and SEO-optimised rollout.",
    side: "right",
  },
  {
    number: "06",
    title: "Support",
    desc: "Ongoing maintenance, performance monitoring, and iterative improvements to keep you ahead.",
    side: "left",
  },
];

// Each step row is 180px tall; 6 steps → 1080px total SVG height
const STEP_H = 180;
const TOTAL_H = STEP_H * steps.length;

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef    = useRef<SVGPathElement>(null);
  const [activeStep, setActiveStep] = useState(-1);

  // Build the SVG snake path: nodes sit at center of each step row
  // Alternates: right (cx=80) → left (cx=20) in a 100-wide viewbox
  const nodeY = (i: number) => STEP_H * i + STEP_H / 2;

  const buildPath = () => {
    const cx = (i: number) => steps[i].side === "right" ? 80 : 20;
    let d = `M ${cx(0)} ${nodeY(0)}`;
    for (let i = 1; i < steps.length; i++) {
      const x0 = cx(i - 1);
      const y0 = nodeY(i - 1);
      const x1 = cx(i);
      const y1 = nodeY(i);
      const midY = (y0 + y1) / 2;
      d += ` C ${x0} ${midY}, ${x1} ${midY}, ${x1} ${y1}`;
    }
    return d;
  };

  const svgPath = buildPath();

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
      const start   = windowH * 0.75;
      const end     = -rect.height + windowH * 0.65;
      const raw     = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));

      path.style.strokeDashoffset = `${total * (1 - Math.min(1, raw * 1.15))}`;
      setActiveStep(Math.ceil(Math.min(1, raw * 1.25) * steps.length) - 1);
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
      <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <div className="mb-20 text-center reveal">
          <div className="section-label mb-4">How We Work</div>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
            Process
          </h2>
          <p className="text-white/40 mt-4 text-lg max-w-md mx-auto">
            A structured approach that delivers exceptional results, every time.
          </p>
        </div>

        {/* 3-column grid: left steps | SVG spine | right steps */}
        <div className="relative grid" style={{ gridTemplateColumns: "1fr 80px 1fr" }}>

          {/* Left column — even-indexed steps (02, 04, 06) */}
          <div className="flex flex-col">
            {steps.map((step, i) =>
              step.side === "left" ? (
                <div
                  key={i}
                  className="flex flex-col items-end text-right pr-6 transition-all duration-500"
                  style={{ height: STEP_H, justifyContent: "center" }}
                >
                  <span
                    className="text-[11px] font-mono mb-1"
                    style={{ color: i <= activeStep ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)" }}
                  >
                    {step.number}
                  </span>
                  <h3
                    className="text-xl font-bold mb-1 leading-tight transition-colors duration-500"
                    style={{ color: i <= activeStep ? "#ffffff" : "rgba(255,255,255,0.2)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed transition-colors duration-500 max-w-[200px]"
                    style={{ color: i <= activeStep ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.12)" }}
                  >
                    {step.desc}
                  </p>
                </div>
              ) : (
                <div key={i} style={{ height: STEP_H }} />
              )
            )}
          </div>

          {/* Centre SVG spine */}
          <div className="relative">
            <svg
              viewBox={`0 0 100 ${TOTAL_H}`}
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
              style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.1))" }}
            >
              {/* Dim base */}
              <path
                d={svgPath}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Lit animated path */}
              <path
                ref={pathRef}
                d={svgPath}
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 5px rgba(255,255,255,0.9))" }}
              />
              {/* Nodes */}
              {steps.map((step, i) => {
                const cx   = step.side === "right" ? 80 : 20;
                const cy   = nodeY(i);
                const lit  = i <= activeStep;
                return (
                  <g key={i}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r="8"
                      fill={lit ? "white" : "rgba(255,255,255,0.08)"}
                      stroke={lit ? "white" : "rgba(255,255,255,0.15)"}
                      strokeWidth="1.5"
                      style={{
                        transition: "fill 0.4s ease",
                        filter: lit ? "drop-shadow(0 0 8px rgba(255,255,255,0.9))" : "none",
                      }}
                    />
                    {lit && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r="14"
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1"
                        style={{ animation: "ping 1.5s ease-out infinite" }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Right column — odd-indexed steps (01, 03, 05) */}
          <div className="flex flex-col">
            {steps.map((step, i) =>
              step.side === "right" ? (
                <div
                  key={i}
                  className="flex flex-col items-start text-left pl-6 transition-all duration-500"
                  style={{ height: STEP_H, justifyContent: "center" }}
                >
                  <span
                    className="text-[11px] font-mono mb-1"
                    style={{ color: i <= activeStep ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)" }}
                  >
                    {step.number}
                  </span>
                  <h3
                    className="text-xl font-bold mb-1 leading-tight transition-colors duration-500"
                    style={{ color: i <= activeStep ? "#ffffff" : "rgba(255,255,255,0.2)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed transition-colors duration-500 max-w-[200px]"
                    style={{ color: i <= activeStep ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.12)" }}
                  >
                    {step.desc}
                  </p>
                </div>
              ) : (
                <div key={i} style={{ height: STEP_H }} />
              )
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ping {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0;   }
        }
      `}</style>
    </section>
  );
}
