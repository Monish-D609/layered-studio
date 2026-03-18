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

const STEP_H = 160;
const TOTAL_H = STEP_H * steps.length;

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef    = useRef<SVGPathElement>(null);
  const [activeStep, setActiveStep] = useState(-1);

  const nodeY  = (i: number) => STEP_H * i + STEP_H / 2;
  const nodeCX = (side: "left" | "right") => side === "right" ? 75 : 25;

  // Smooth S-curve snake path using cubic beziers with natural tension
  const buildPath = () => {
    let d = `M ${nodeCX(steps[0].side)} ${nodeY(0)}`;
    for (let i = 1; i < steps.length; i++) {
      const x0      = nodeCX(steps[i - 1].side);
      const y0      = nodeY(i - 1);
      const x1      = nodeCX(steps[i].side);
      const y1      = nodeY(i);
      const tension = (y1 - y0) * 0.48;
      // Control points along the vertical pull — creates a flowing S
      d += ` C ${x0} ${y0 + tension}, ${x1} ${y1 - tension}, ${x1} ${y1}`;
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
      <div className="max-w-4xl mx-auto">

        {/* Section heading — always visible, no reveal class */}
        <div className="mb-20 text-center">
          <div className="section-label mb-4">How We Work</div>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
            Process
          </h2>
          <p className="text-white/40 mt-4 text-lg max-w-md mx-auto leading-relaxed">
            A structured approach that delivers exceptional results, every time.
          </p>
        </div>

        {/* 3-column: left steps | SVG spine | right steps */}
        <div
          className="relative grid"
          style={{ gridTemplateColumns: "1fr 60px 1fr" }}
        >
          {/* ── Left column ── */}
          <div className="flex flex-col">
            {steps.map((step, i) =>
              step.side === "left" ? (
                <div
                  key={i}
                  className="flex flex-col items-end text-right pr-5"
                  style={{
                    height: STEP_H,
                    justifyContent: "center",
                    // Slide-in from left
                    opacity:    i <= activeStep ? 1 : 0,
                    transform:  i <= activeStep ? "translateX(0)" : "translateX(-60px)",
                    transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                    transitionDelay: i <= activeStep ? "0.05s" : "0s",
                  }}
                >
                  <span className="text-[11px] font-mono text-white/30 mb-1">{step.number}</span>
                  <h3 className="text-xl font-bold text-white mb-1 leading-tight">{step.title}</h3>
                  <p className="text-xs text-white/45 leading-relaxed max-w-[190px]">{step.desc}</p>
                </div>
              ) : (
                <div key={i} style={{ height: STEP_H }} />
              )
            )}
          </div>

          {/* ── Centre SVG spine ── */}
          <div className="relative" style={{ overflow: "visible" }}>
            <svg
              viewBox={`0 0 100 ${TOTAL_H}`}
              className="w-full"
              style={{ height: TOTAL_H, filter: "drop-shadow(0 0 6px rgba(255,255,255,0.12))", overflow: "visible" }}
              preserveAspectRatio="xMidYMin meet"
            >
              {/* Dim ghost path */}
              <path
                d={svgPath}
                fill="none"
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Glowing animated path */}
              <path
                ref={pathRef}
                d={svgPath}
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 5px rgba(255,255,255,0.85))" }}
              />
              {/* Step nodes */}
              {steps.map((step, i) => {
                const cx  = nodeCX(step.side);
                const cy  = nodeY(i);
                const lit = i <= activeStep;
                return (
                  <g key={i}>
                    <circle
                      cx={cx} cy={cy} r="7"
                      fill={lit ? "white" : "rgba(255,255,255,0.07)"}
                      stroke={lit ? "white" : "rgba(255,255,255,0.15)"}
                      strokeWidth="1.5"
                      style={{
                        transition: "fill 0.4s ease",
                        filter: lit ? "drop-shadow(0 0 8px rgba(255,255,255,0.9))" : "none",
                      }}
                    />
                    {lit && (
                      <circle
                        cx={cx} cy={cy} r="13"
                        fill="none"
                        stroke="rgba(255,255,255,0.18)"
                        strokeWidth="1"
                        style={{ animation: "ping 1.5s ease-out infinite" }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ── Right column ── */}
          <div className="flex flex-col">
            {steps.map((step, i) =>
              step.side === "right" ? (
                <div
                  key={i}
                  className="flex flex-col items-start text-left pl-5"
                  style={{
                    height: STEP_H,
                    justifyContent: "center",
                    // Slide-in from right
                    opacity:    i <= activeStep ? 1 : 0,
                    transform:  i <= activeStep ? "translateX(0)" : "translateX(60px)",
                    transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                    transitionDelay: i <= activeStep ? "0.05s" : "0s",
                  }}
                >
                  <span className="text-[11px] font-mono text-white/30 mb-1">{step.number}</span>
                  <h3 className="text-xl font-bold text-white mb-1 leading-tight">{step.title}</h3>
                  <p className="text-xs text-white/45 leading-relaxed max-w-[190px]">{step.desc}</p>
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
          0%   { transform: scale(1);   opacity: 0.55; }
          100% { transform: scale(1.9); opacity: 0;    }
        }
      `}</style>
    </section>
  );
}
