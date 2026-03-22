import { Mail, Twitter, Linkedin, Instagram, Phone } from "lucide-react";
import Logo from "@/components/Logo";

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
            <Logo size={28} className="mb-3" />
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

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/20 text-sm">
            © 2026 Layered Studio. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a 
              href="mailto:layeredstudio.in@gmail.com" 
              className="text-white/30 hover:text-[#10b981] transition-colors" 
              aria-label="Email"
            >
              <Mail className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a 
              href="https://x.com/Not_human_609" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/30 hover:text-[#10b981] transition-colors" 
              aria-label="X (Twitter)"
            >
              <Twitter className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/monish-d07" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/30 hover:text-[#10b981] transition-colors" 
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a 
              href="https://www.instagram.com/monish_8107" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/30 hover:text-[#10b981] transition-colors" 
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a 
              href="tel:+917676607637" 
              className="text-white/30 hover:text-[#10b981] transition-colors" 
              aria-label="Phone"
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
