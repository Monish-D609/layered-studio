import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    desc: "Deep dive into your goals, audience, and competitive landscape to uncover what makes your project unique.",
  },
  {
    number: "02",
    title: "Strategy",
    desc: "Define the architecture, user flows, and technical approach that will power your digital presence.",
  },
  {
    number: "03",
    title: "Design",
    desc: "Craft pixel-perfect interfaces with motion and personality — every detail intentional, every screen immersive.",
  },
  {
    number: "04",
    title: "Development",
    desc: "Build with modern frameworks, clean code, and performance-first engineering that scales with your ambitions.",
  },
  {
    number: "05",
    title: "Launch",
    desc: "Deploy with zero-downtime pipelines, comprehensive testing, and SEO-optimized rollout.",
  },
  {
    number: "06",
    title: "Support",
    desc: "Ongoing maintenance, performance monitoring, and iterative improvements to keep you ahead.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [pathProgress, setPathProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;

    const totalLength = path.getTotalLength();
    path.style.strokeDasharray = `${totalLength}`;
    path.style.strokeDashoffset = `${totalLength}`;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Complete the animation when section bottom is still 65% of viewport in view
      // so the last step is fully visible before user scrolls past
      const start = windowH * 0.75;
      const end = -rect.height + windowH * 0.65;
      const scrollInSection = start - rect.top;
      const totalScrollable = start - end;
      const rawProgress = Math.min(1, Math.max(0, scrollInSection / totalScrollable));

      // Draw the path 18% ahead of scroll so the line always leads
      const drawProgress = Math.min(1, rawProgress * 1.18);

      setPathProgress(drawProgress);
      const offset = totalLength * (1 - drawProgress);
      path.style.strokeDashoffset = `${offset}`;

      // Activate steps slightly ahead of path — step lights up before line finishes reaching it
      const stepProgress = Math.min(1, rawProgress * 1.25);
      const stepIndex = Math.ceil(stepProgress * steps.length) - 1;
      setActiveStep(stepIndex);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // SVG path: zigzag snake that winds left-right between steps
  // Viewbox: 800 wide, 1100 tall for 6 steps
  const svgPath = `
    M 400 60
    C 400 100, 200 130, 200 180
    C 200 230, 400 250, 400 300
    C 400 350, 600 370, 600 420
    C 600 470, 400 490, 400 540
    C 400 590, 200 610, 200 660
    C 200 710, 400 730, 400 780
    C 400 830, 600 850, 600 900
    C 600 950, 400 970, 400 1020
  `;

  // Step positions along the path
  const stepPositions = [
    { x: 390, y: 60, align: "right" },
    { x: 190, y: 300, align: "left" },
    { x: 610, y: 420, align: "right" },
    { x: 190, y: 540, align: "left" },
    { x: 190, y: 660, align: "left" },
    { x: 610, y: 900, align: "right" },
  ];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-32 px-6 relative overflow-hidden"
      style={{ minHeight: "200vh" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 reveal text-center">
          <div className="section-label mb-4">How We Work</div>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
            Process
          </h2>
          <p className="text-white/40 mt-4 text-lg max-w-md mx-auto">
            A structured approach that delivers exceptional results, every time.
          </p>
        </div>

        {/* Sticky process container */}
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-3xl">
            <svg
              viewBox="0 0 800 1100"
              className="w-full"
              style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.15))" }}
            >
              {/* Glow trail */}
              <path
                d={svgPath}
                fill="none"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Base dim path */}
              <path
                d={svgPath}
                fill="none"
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Animated progress path */}
              <path
                ref={pathRef}
                d={svgPath}
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  filter: "drop-shadow(0 0 6px rgba(255,255,255,0.8))",
                }}
              />

              {/* Step dots */}
              {stepPositions.map((pos, i) => (
                <g key={i}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="12"
                    fill={i <= activeStep ? "white" : "rgba(255,255,255,0.1)"}
                    stroke={i <= activeStep ? "white" : "rgba(255,255,255,0.15)"}
                    strokeWidth="2"
                    style={{
                      transition: "fill 0.4s ease, stroke 0.4s ease",
                      filter: i <= activeStep ? "drop-shadow(0 0 12px rgba(255,255,255,0.9))" : "none",
                    }}
                  />
                  {i <= activeStep && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="20"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="1"
                      style={{ animation: "ping 1.5s ease-out infinite" }}
                    />
                  )}
                </g>
              ))}
            </svg>

            {/* Step labels overlaid */}
            <div className="absolute inset-0 pointer-events-none">
              {steps.map((step, i) => {
                const pos = stepPositions[i];
                const isActive = i <= activeStep;
                const isRight = pos.align === "right";

                return (
                  <div
                    key={i}
                    className={`absolute process-step ${isActive ? "active" : ""}`}
                    style={{
                      top: `${(pos.y / 1100) * 100}%`,
                      left: isRight ? `${(pos.x / 800) * 100 + 4}%` : "auto",
                      right: isRight ? "auto" : `${100 - (pos.x / 800) * 100 + 4}%`,
                      transform: "translateY(-50%)",
                      maxWidth: "220px",
                    }}
                  >
                    <div className="text-white/30 text-xs font-mono mb-1">
                      {step.number}
                    </div>
                    <div
                      className={`text-xl font-bold mb-1 transition-colors duration-500 ${
                        isActive ? "text-white" : "text-white/30"
                      }`}
                    >
                      {step.title}
                    </div>
                    <div
                      className={`text-sm leading-relaxed transition-colors duration-500 ${
                        isActive ? "text-white/60" : "text-white/20"
                      }`}
                    >
                      {step.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
