const links = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          <div>
            <div className="text-white font-semibold text-lg mb-2">
              Layered Studio
            </div>
            <p className="text-white/30 text-sm max-w-xs">
              Premium web design & development for brands that demand excellence.
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="footer-link"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-white/5 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-sm">
            © 2026 Layered Studio. All rights reserved.
          </p>
          <p className="text-white/20 text-sm">
            Crafted with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
