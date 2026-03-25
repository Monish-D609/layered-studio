import { useEffect, useRef, useState, type CSSProperties } from "react";

type ScrollRevealSectionProps = {
  children: React.ReactNode;
  className?: string;
  /** Gate reveals until the loading screen has finished (or any parent condition). */
  enabled: boolean;
  /** Reveal as soon as `enabled` becomes true (navbar, hero). */
  immediate?: boolean;
  /** Applied as transition-delay when the section becomes visible. */
  delayMs?: number;
};

/**
 * Fade + slide-in when the section enters the viewport (or immediately for above-the-fold blocks).
 */
export default function ScrollRevealSection({
  children,
  className = "",
  enabled,
  immediate = false,
  delayMs = 0,
}: ScrollRevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    if (immediate) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [enabled, immediate]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${visible ? "scroll-reveal--visible" : ""} ${className}`}
      style={{ "--scroll-reveal-delay": `${delayMs}ms` } as CSSProperties & { "--scroll-reveal-delay": string }}
    >
      {children}
    </div>
  );
}
