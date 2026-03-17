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
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "15px",
            letterSpacing: "-0.02em",
            color: "white",
            lineHeight: 1,
          }}
        >
          Layered Studio
        </span>
      )}
    </div>
  );
}
