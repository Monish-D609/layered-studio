import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";

const navLinks = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Process",      href: "#process"      },
  { label: "Work",         href: "#work"          },
  { label: "Pricing",      href: "#pricing"       },
  { label: "About",        href: "#about"         },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [pillStyle,  setPillStyle]  = useState({ width: 0, left: 0, opacity: 0 });

  const btnRefs   = useRef<(HTMLButtonElement | null)[]>([]);
  const navRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Move the sliding pill to the hovered nav item
  useEffect(() => {
    if (hoveredIdx === null) {
      setPillStyle(s => ({ ...s, opacity: 0 }));
      return;
    }
    const btn = btnRefs.current[hoveredIdx];
    const nav = navRef.current;
    if (!btn || !nav) return;
    const bRect = btn.getBoundingClientRect();
    const nRect = nav.getBoundingClientRect();
    setPillStyle({
      width:   bRect.width,
      left:    bRect.left - nRect.left,
      opacity: 1,
    });
  }, [hoveredIdx]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[999] flex justify-center pt-4 px-4 pointer-events-none">

      {/* ── Main bar ── */}
      <nav
        className={`
          pointer-events-auto w-full max-w-4xl
          flex items-center justify-between
          px-4 h-14 rounded-2xl
          transition-all duration-500 ease-out
          border border-white/[0.15] shadow-[0_0_30px_rgba(255,255,255,0.08)]
          ${scrolled
            ? "bg-[#080808]/40 backdrop-blur-2xl"
            : "bg-white/[0.03] backdrop-blur-xl"
          }
        `}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="opacity-80 hover:opacity-100 transition-opacity duration-200"
        >
          <Logo size={26} />
        </button>

        {/* Centre nav links with sliding pill indicator */}
        <div
          ref={navRef}
          className="hidden md:flex items-center relative gap-0.5"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {/* Sliding hover pill */}
          <div
            className="absolute top-0 h-full rounded-lg bg-white/[0.07] transition-all duration-200 ease-out pointer-events-none"
            style={{
              width:   pillStyle.width,
              left:    pillStyle.left,
              opacity: pillStyle.opacity,
            }}
          />

          {navLinks.map((link, i) => (
            <button
              key={link.label}
              ref={el => { btnRefs.current[i] = el; }}
              onClick={() => scrollTo(link.href)}
              onMouseEnter={() => setHoveredIdx(i)}
              className="relative z-10 text-[13px] text-white/50 hover:text-white/90 transition-colors duration-150 px-4 py-2 rounded-lg font-medium"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => scrollTo("#contact")}
            className="relative text-[13px] font-semibold px-5 py-2 rounded-xl overflow-hidden group"
            style={{
              background: "white",
              color: "#080808",
            }}
          >
            {/* Shimmer */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(0,0,0,0.06) 50%, transparent 60%)",
              }}
            />
            <span className="relative">Contact →</span>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 group"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className={`block w-[18px] h-[1.5px] bg-white/70 rounded-full transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`}
          />
          <span
            className={`block w-[18px] h-[1.5px] bg-white/70 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
          />
          <span
            className={`block w-[18px] h-[1.5px] bg-white/70 rounded-full transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}
          />
        </button>
      </nav>

      {/* ── Mobile dropdown ── */}
      {menuOpen && (
        <div
          className="pointer-events-auto absolute top-[72px] left-4 right-4 rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/95 backdrop-blur-xl px-4 py-5 flex flex-col gap-1 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
        >
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-left text-white/55 hover:text-white text-sm py-2 px-3 rounded-lg hover:bg-white/[0.05] transition-all duration-150"
            >
              {link.label}
            </button>
          ))}
          <div className="h-px bg-white/[0.06] my-1" />
          <button
            onClick={() => scrollTo("#contact")}
            className="text-left text-sm font-semibold py-2.5 px-3 rounded-xl bg-white text-[#080808]"
          >
            Contact →
          </button>
        </div>
      )}
    </header>
  );
}
