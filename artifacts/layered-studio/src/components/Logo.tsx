interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 32, showText = true, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* SVG Mark — 3 stacked offset rectangles (layers) */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Layered Studio mark"
      >
        {/* Bottom layer — dimmest */}
        <rect
          x="2"
          y="14"
          width="22"
          height="10"
          rx="3"
          fill="rgba(255,255,255,0.18)"
        />
        {/* Middle layer */}
        <rect
          x="5"
          y="9"
          width="22"
          height="10"
          rx="3"
          fill="rgba(255,255,255,0.5)"
        />
        {/* Top layer — brightest */}
        <rect
          x="8"
          y="4"
          width="22"
          height="10"
          rx="3"
          fill="white"
        />
      </svg>

      {showText && (
        <span
          style={{
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 800,
            fontSize: "18px",
            letterSpacing: "-0.04em",
            color: "white",
            lineHeight: 1,
            textTransform: "lowercase",
            textShadow: "0 4px 20px rgba(255,255,255,0.4)",
          }}
        >
          layered studio
        </span>
      )}
    </div>
  );
}
