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
          className="text-[17px] font-semibold tracking-tight lowercase text-white/95"
          style={{
            fontFamily: "var(--app-font-sans), 'Inter', sans-serif",
            lineHeight: 1,
            textShadow: "0 2px 28px rgba(255,255,255,0.12)",
          }}
        >
          layered studio
        </span>
      )}
    </div>
  );
}
