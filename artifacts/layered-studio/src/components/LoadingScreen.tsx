import { useState, useEffect } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);
  // phase 0 = fade in + grid lines appear
  // phase 1 = logo scales in
  // phase 2 = brand name writes on
  // phase 3 = subtitle fades in
  // phase 4 = glow pulse
  // phase 5 = fade out

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 2600),
      setTimeout(() => setPhase(4), 3200),
      setTimeout(() => setPhase(5), 4200),
      setTimeout(() => onComplete(), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-700 ${
        phase >= 5 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ cursor: "default" }}
    >
      {/* Subtle grid lines */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          phase >= 1 ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Horizontal guide lines */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none">
        {[-60, 0, 60].map((offset) => (
          <div
            key={offset}
            className={`h-px mx-auto transition-all duration-1000 ease-out ${
              phase >= 1 ? "w-[300px] opacity-100" : "w-0 opacity-0"
            }`}
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
              transform: `translateY(${offset}px)`,
              transitionDelay: `${Math.abs(offset) * 3}ms`,
            }}
          />
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div
          className={`mb-8 transition-all duration-700 ease-out ${
            phase >= 1
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-75 translate-y-4"
          }`}
        >
          <img
            src="/favicon.png"
            alt="Layered Studio"
            className="w-14 h-14 object-contain"
            style={{
              filter:
                phase >= 4
                  ? "drop-shadow(0 0 20px rgba(255,255,255,0.3))"
                  : "none",
              transition: "filter 0.8s ease",
            }}
          />
        </div>

        {/* Brand name with handwritten reveal */}
        <div className="relative overflow-hidden">
          <h1
            className="text-[2.8rem] md:text-[3.8rem] font-light tracking-[0.02em] text-white"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontStyle: "normal",
              fontWeight: 300,
              filter:
                phase >= 4
                  ? "drop-shadow(0 0 30px rgba(255,255,255,0.25))"
                  : "none",
              transition: "filter 0.8s ease",
            }}
          >
            {/* Each letter animates in sequence */}
            {"Layered Studio".split("").map((char, i) => (
              <span
                key={i}
                className="inline-block transition-all ease-out"
                style={{
                  opacity: phase >= 2 ? 1 : 0,
                  transform:
                    phase >= 2
                      ? "translateY(0) scaleY(1)"
                      : "translateY(20px) scaleY(0.8)",
                  transitionDuration: "500ms",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          {/* Pen cursor / writing indicator */}
          <div
            className="absolute top-1/2 h-[60%] w-[2px] -translate-y-1/2 rounded-full"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(255,255,255,0.8), transparent)",
              boxShadow: "0 0 12px rgba(255,255,255,0.4)",
              opacity: phase === 2 ? 1 : 0,
              transition: "left 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease",
              left: phase >= 2 ? "100%" : "0%",
            }}
          />
        </div>

        {/* Thin decorative line under title */}
        <div
          className={`mt-4 h-px transition-all duration-700 ease-out ${
            phase >= 3 ? "w-24 opacity-100" : "w-0 opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          }}
        />

        {/* Subtitle */}
        <p
          className={`mt-5 text-[11px] tracking-[0.35em] uppercase text-white/40 transition-all duration-700 ease-out ${
            phase >= 3
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          }`}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
          }}
        >
          Digital Studio
        </p>
      </div>

      {/* Subtle radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.6))",
        }}
      />

      {/* Bottom loading progress bar */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-32 h-px bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/30 rounded-full transition-all ease-out"
            style={{
              width:
                phase === 0
                  ? "0%"
                  : phase === 1
                  ? "15%"
                  : phase === 2
                  ? "50%"
                  : phase === 3
                  ? "75%"
                  : phase === 4
                  ? "100%"
                  : "100%",
              transitionDuration: phase === 2 ? "1600ms" : "600ms",
            }}
          />
        </div>
      </div>
    </div>
  );
}
