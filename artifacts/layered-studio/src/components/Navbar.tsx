import { useEffect, useState } from "react";

const navLinks = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "navbar-blur bg-black/60 border-b border-white/5" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-white font-semibold text-lg tracking-tight">Layered Studio</span>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-sm text-white/50 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTo("#contact")}
          className="hidden md:block text-sm px-5 py-2 rounded-full border border-white/20 text-white hover:border-white/50 hover:bg-white/5 transition-all duration-200"
        >
          Contact
        </button>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-5 flex flex-col gap-1">
            <span className={`h-px bg-white transition-all ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
            <span className={`h-px bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
          </div>
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/5 px-6 py-6 flex flex-col gap-4">
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-left text-white/60 hover:text-white text-sm"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            className="text-left text-white text-sm"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
}
