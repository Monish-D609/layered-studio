const testimonials = [
  {
    quote:
      "Layered Studio transformed our product website into something that finally matched the quality of our technology. The design immediately elevated how investors and customers perceive our brand.",
    name: "Aman Verma",
    role: "Founder, Orbit Labs",
  },
  {
    quote:
      "The attention to interaction design and motion details was incredible. Our website now feels like a premium product experience rather than just a marketing page.",
    name: "Riya Kapoor",
    role: "Marketing Lead, NovaAI",
  },
  {
    quote:
      "Within weeks of launching the new site we noticed a clear improvement in engagement and user trust. The entire experience feels polished and intentional.",
    name: "Karan Mehta",
    role: "CEO, Zenith Commerce",
  },
  {
    quote:
      "Layered Studio understood our brand vision instantly and translated it into a website that feels elegant, modern, and distinctive.",
    name: "Sneha Patel",
    role: "Co-Founder, Lumina Studio",
  },
  {
    quote:
      "The scroll interactions and visual storytelling make the platform feel far more advanced than a typical SaaS website. Clients constantly compliment the design.",
    name: "Arjun Nair",
    role: "Product Lead, Astra Cloud",
  },
];

const allTestimonials = [...testimonials, ...testimonials];

export default function TestimonialsSection() {
  return (
    <section id="about" className="py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="section-label mb-4">Testimonials</div>
        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
          What Clients Say
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div
          style={{
            display: "flex",
            gap: "24px",
            width: "max-content",
            animation: "marquee 40s linear infinite",
          }}
        >
          {allTestimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div>
                <div className="text-white font-semibold text-sm">{t.name}</div>
                <div className="text-white/30 text-xs mt-0.5">{t.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
