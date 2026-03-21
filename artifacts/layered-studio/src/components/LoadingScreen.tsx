import { useState, useEffect } from "react";

/**
 * The Layered Studio logo is 4 stacked rounded rectangles,
 * cascading from dark-gray (bottom) to white (top).
 * Each card is offset slightly up-right, creating the "layered" effect.
 */

const layers = [
  { color: "rgba(255,255,255,0.15)", x: 0, y: 0, delay: 400 },
  { color: "rgba(255,255,255,0.30)", x: 4, y: -8, delay: 600 },
  { color: "rgba(255,255,255,0.55)", x: 8, y: -16, delay: 800 },
  { color: "rgba(255,255,255,0.95)", x: 12, y: -24, delay: 1000 },
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);
  // 0 = black screen
  // 1 = grid appears + layers start stacking
  // 2 = layers fully stacked, glow pulse
  // 3 = brand name writes letter-by-letter
  // 4 = subtitle fades in
  // 5 = everything glows
  // 6 = fade out

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => setPhase(4), 3800),
      setTimeout(() => setPhase(5), 4400),
      setTimeout(() => setPhase(6), 5200),
      setTimeout(() => onComplete(), 6000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#050505]"
      style={{
        cursor: "none",
        transform: phase >= 6 ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      {/* Subtle background grid & Detailing */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          phase >= 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Full-width horizontal split lines */}
        <div className="absolute inset-0 flex flex-col justify-evenly pointer-events-none">
          {[1, 2, 3, 4].map((line, i) => (
            <div
              key={line}
              className="w-full h-px scanner-line-wrapper"
              style={{
                transform: phase >= 1 ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "center",
                transition: "transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: `${300 + i * 150}ms`,
              }}
            >
              <div 
                className="scanner-line-glow" 
                style={{ 
                  animationDelay: `${i * 0.5}s`,
                  opacity: phase >= 2 ? 1 : 0,
                  transition: "opacity 1s ease 1s"
                }} 
              />
            </div>
          ))}
        </div>

        {/* Top-Left Crop Mark */}
        <div 
          className="absolute top-8 left-8 md:top-12 md:left-12 w-16 h-16 md:w-24 md:h-24 pointer-events-none"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.2)",
            borderLeft: "1px solid rgba(255,255,255,0.2)",
            transform: phase >= 1 ? "translate(0, 0)" : "translate(-20px, -20px)",
            opacity: phase >= 1 ? 1 : 0,
            transition: "all 1.2s cubic-bezier(0.22, 1, 0.36, 1) 400ms"
          }}
        />

        {/* Bottom-Right Crop Mark */}
        <div 
          className="absolute bottom-8 right-8 md:bottom-12 md:right-12 w-16 h-16 md:w-24 md:h-24 pointer-events-none"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            borderRight: "1px solid rgba(255,255,255,0.2)",
            transform: phase >= 1 ? "translate(0, 0)" : "translate(20px, 20px)",
            opacity: phase >= 1 ? 1 : 0,
            transition: "all 1.2s cubic-bezier(0.22, 1, 0.36, 1) 400ms"
          }}
        />

        {/* Top-Right Faint Dot */}
        <div 
          className="absolute top-10 right-10 md:top-16 md:right-16 w-1.5 h-1.5 rounded-full bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.5)] pointer-events-none"
          style={{
            transform: phase >= 1 ? "scale(1)" : "scale(0)",
            opacity: phase >= 1 ? 1 : 0,
            transition: "all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 800ms"
          }}
        />
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* ===== ANIMATED LOGO: 4 stacked rounded rectangles ===== */}
        <div
          className="relative mb-14"
          style={{
            width: "140px",
            height: "140px",
            filter: phase >= 5
              ? "drop-shadow(0 0 25px rgba(255,255,255,0.3))"
              : "none",
            transition: "filter 1s ease",
          }}
        >
          {layers.map((layer, i) => (
            <div
              key={i}
              className="absolute transition-all ease-out"
              style={{
                width: "84px",
                height: "56px",
                borderRadius: "14px",
                backgroundColor: layer.color,
                bottom: `${24 + i * 4}px`,
                left: `${12 + layer.x * 2}px`,
                transform: phase >= 1
                  ? `translateY(${layer.y * 2}px) scale(1)`
                  : `translateY(80px) scale(0.7)`,
                opacity: phase >= 1 ? 1 : 0,
                transitionDuration: "700ms",
                transitionDelay: `${layer.delay}ms`,
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                boxShadow: phase >= 5 && i === 3
                  ? "0 0 20px rgba(255,255,255,0.15)"
                  : "none",
              }}
            />
          ))}
        </div>

        {/* ===== BRAND NAME: letter-by-letter reveal ===== */}
        <div className="relative overflow-hidden">
          <h1
            className="text-[4rem] md:text-[6.5rem] lg:text-[7.5rem] text-white"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              filter: phase >= 5
                ? "drop-shadow(0 0 30px rgba(255,255,255,0.2))"
                : "none",
              transition: "filter 0.8s ease",
            }}
          >
            {"Layered Studio".split("").map((char, i) => (
              <span
                key={i}
                className="inline-block"
                style={{
                  opacity: phase >= 3 ? 1 : 0,
                  transform: phase >= 3
                    ? "translateY(0) rotateX(0deg)"
                    : "translateY(25px) rotateX(-40deg)",
                  transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  transitionDelay: `${i * 70}ms`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          {/* Glowing pen cursor that sweeps across */}
          <div
            className="absolute top-1/2 h-[55%] w-[2px] -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.9), transparent)",
              boxShadow: "0 0 14px rgba(255,255,255,0.5), 0 0 4px rgba(255,255,255,0.8)",
              opacity: phase === 3 ? 1 : 0,
              left: phase >= 3 ? "102%" : "-2%",
              transition: "left 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease",
            }}
          />
        </div>

        {/* Thin decorative divider */}
        <div
          className={`mt-5 h-px transition-all ease-out ${
            phase >= 4 ? "w-20 opacity-100" : "w-0 opacity-0"
          }`}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            transitionDuration: "700ms",
          }}
        />

        {/* DIGITAL STUDIO subtitle */}
        <p
          className="mt-8 text-[12px] md:text-[14px] tracking-[0.5em] uppercase text-white/35"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.7s ease",
            transitionDelay: "200ms",
          }}
        >
          Digital Studio
        </p>
      </div>

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 55% at 50% 50%, transparent 30%, rgba(0,0,0,0.7))",
        }}
      />

      {/* Bottom progress bar */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-28 h-px bg-white/8 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/25 rounded-full"
            style={{
              width:
                phase <= 0 ? "0%" :
                phase === 1 ? "20%" :
                phase === 2 ? "35%" :
                phase === 3 ? "60%" :
                phase === 4 ? "80%" :
                "100%",
              transition: `width ${phase === 3 ? "1800ms" : "600ms"} ease-out`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
