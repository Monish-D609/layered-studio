import { Check, Minus } from "lucide-react";

interface Feature {
  label: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: string;
  priceSuffix: string;
  subtext?: string;
  features: Feature[];
  popular: boolean;
  cta: string;
}

const plans: Plan[] = [
  {
    name: "Starter Website",
    price: "₹4,000",
    priceSuffix: "– ₹5,000",
    features: [
      { label: "Custom UI Layout", included: true },
      { label: "Responsive Design", included: true },
      { label: "Basic Animations", included: true },
      { label: "SEO Setup", included: true },
      { label: "Deployment", included: true },
      { label: "Backend Integration", included: false },
      { label: "Database Setup", included: false },
      { label: "Advanced Animations", included: false },
    ],
    popular: false,
    cta: "START PROJECT",
  },
  {
    name: "Professional Website",
    price: "₹6,000",
    priceSuffix: "– ₹12,000",
    features: [
      { label: "Premium UI/UX Design", included: true },
      { label: "Advanced Animations", included: true },
      { label: "Frontend Development", included: true },
      { label: "Backend Integration", included: true },
      { label: "Database Setup", included: true },
      { label: "Mobile Optimization", included: true },
      { label: "Deployment", included: true },
      { label: "Cinematic Animations", included: false },
      { label: "Interactive Scroll Effects", included: false },
    ],
    popular: true,
    cta: "START PROJECT",
  },
  {
    name: "Premium Experience",
    price: "₹15,000",
    priceSuffix: "+",
    subtext: "Based on requirements",
    features: [
      { label: "Fully Custom Design System", included: true },
      { label: "Cinematic Animations", included: true },
      { label: "Interactive Scroll Effects", included: true },
      { label: "Advanced Performance Optimization", included: true },
      { label: "Backend + Database Architecture", included: true },
      { label: "SEO Optimization", included: true },
      { label: "Priority Support", included: true },
    ],
    popular: false,
    cta: "START PROJECT",
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
        </div>

        {/* Cards: popular card sits higher / is taller */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-5 items-start justify-center">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col w-full md:w-[340px] rounded-2xl border transition-all duration-300
                ${plan.popular
                  ? "bg-[#111] border-white/20 md:-mt-6 md:mb-0 shadow-[0_0_60px_rgba(255,255,255,0.04)] z-10"
                  : "bg-[#0d0d0d] border-white/08"
                }`}
              style={{
                borderColor: plan.popular ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)",
              }}
            >
              {/* Most popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-[#111] border border-white/20 rounded-full px-5 py-1.5 text-white text-xs font-bold tracking-widest whitespace-nowrap">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">
                {/* Plan name + dot for popular */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`text-base font-bold ${plan.popular ? "text-white" : "text-white/80"}`}
                  >
                    {plan.name}
                  </span>
                  {plan.popular && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                  )}
                </div>

                {/* Price */}
                <div className="mb-1">
                  <div className="flex items-baseline gap-1 whitespace-nowrap">
                    <span className="text-2xl font-black tracking-tight leading-none text-white">
                      {plan.price}
                    </span>
                    <span className="text-2xl font-black tracking-tight leading-none text-white/70">
                      {plan.priceSuffix}
                    </span>
                  </div>
                  {plan.subtext && (
                    <p className="text-white/30 text-xs mt-1.5">{plan.subtext}</p>
                  )}
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 my-6" />

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.label} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {f.included ? (
                          <Check
                            size={13}
                            strokeWidth={2.5}
                            className="text-white flex-shrink-0"
                          />
                        ) : (
                          <Minus
                            size={13}
                            strokeWidth={2}
                            className="text-white/20 flex-shrink-0"
                          />
                        )}
                        <span
                          className={`text-sm ${f.included ? "text-white/80" : "text-white/25"}`}
                        >
                          {f.label}
                        </span>
                      </div>
                      {!f.included && (
                        <span className="text-[10px] font-semibold tracking-wider text-white/25 uppercase flex-shrink-0">
                          Next Tier
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

                {/* CTA button */}
                <button
                  onClick={scrollToContact}
                  className={`mt-8 w-full py-3.5 rounded-xl text-sm font-bold tracking-widest transition-all duration-200 hover:scale-[1.02]
                    ${plan.popular
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-transparent border border-white/15 text-white hover:border-white/35 hover:bg-white/4"
                    }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
