import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "₹30,000",
    priceSuffix: "– ₹35,000",
    description: "Perfect for small businesses and solo entrepreneurs.",
    features: [
      "Custom UI Layout",
      "Responsive Design",
      "Basic Animations",
      "SEO Setup",
      "Deployment",
    ],
    popular: false,
    cta: "Get Started",
  },
  {
    name: "Professional",
    price: "₹55,000",
    priceSuffix: "– ₹60,000",
    description: "The complete package for growing brands.",
    features: [
      "Premium UI/UX Design",
      "Advanced Animations",
      "Frontend Development",
      "Backend Integration",
      "Database Setup",
      "Mobile Optimization",
      "Deployment",
    ],
    popular: true,
    cta: "Most Popular",
  },
  {
    name: "Premium",
    price: "₹70,000",
    priceSuffix: "+",
    description: "Cinematic, world-class digital experiences.",
    features: [
      "Fully Custom Design System",
      "Cinematic Animations",
      "Interactive Scroll Effects",
      "Performance Optimization",
      "Backend + Database Architecture",
      "SEO Optimization",
      "Priority Support",
    ],
    popular: false,
    cta: "Let's Talk",
  },
];

export default function PricingSection() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="section-label mb-4">Investment</div>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
            Pricing
          </h2>
          <p className="text-white/40 mt-4 text-lg max-w-lg">
            Transparent pricing for every stage of growth. Click any plan to start a conversation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              onClick={scrollToContact}
              className={`glass-card rounded-2xl p-8 cursor-none transition-all duration-300 group ${
                plan.popular ? "pricing-popular relative" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <div className="text-white/40 text-sm mb-2">{plan.name}</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-white text-4xl font-black">{plan.price}</span>
                  <span className="text-white/40 text-lg">{plan.priceSuffix}</span>
                </div>
                <p className="text-white/40 text-sm mt-3 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="h-px bg-white/10 mb-6" />

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check size={14} className="text-white/60 flex-shrink-0" />
                    <span className="text-white/70">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToContact}
                className={`w-full py-3 rounded-full text-sm font-semibold transition-all duration-200 group-hover:scale-105 ${
                  plan.popular
                    ? "bg-white text-black hover:bg-white/90"
                    : "border border-white/20 text-white hover:border-white/50 hover:bg-white/5"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
