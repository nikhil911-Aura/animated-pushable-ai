"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Zap, ArrowRight, CreditCard } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Starter",
    price: "$49",
    credits: "500 credits / mo",
    desc: "For solo operators testing one workflow.",
    color: "#E8001D",
    features: ["1 AI Agent", "500 task credits/mo", "3 integrations", "Email support", "Basic dashboard"],
    cta: "Start for Free",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$149",
    credits: "2,000 credits / mo",
    desc: "The sweet spot for growing teams.",
    color: "#E8001D",
    features: ["3 AI Agents", "2,000 task credits/mo", "All integrations", "Priority support", "Advanced dashboard", "Custom workflows"],
    cta: "Get Started",
    highlight: true,
  },
  {
    name: "Scale",
    price: "$399",
    credits: "Unlimited",
    desc: "For businesses running on automation.",
    color: "#FF2D42",
    features: ["All 4 AI Agents", "Unlimited credits", "All integrations", "Dedicated support", "White-label option", "API access"],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function PricingSection() {
  const featuredRef  = useRef<HTMLDivElement | null>(null);
  const cardsGridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const featured  = featuredRef.current;
    const cardsGrid = cardsGridRef.current;
    if (!featured || !cardsGrid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pulse = gsap.to(featured, {
      boxShadow: "0 0 0 2px rgba(232,0,29,0.45), 0 8px 32px 4px rgba(232,0,29,0.12)",
      duration: 1.4, repeat: -1, yoyo: true, ease: "power1.inOut", paused: true,
    });

    ScrollTrigger.create({
      trigger: featured, start: "top 85%", once: true,
      onEnter: () => pulse.play(),
    });

    const cols = cardsGrid.querySelectorAll<HTMLElement>(":scope > *");
    gsap.fromTo(cols, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.65, ease: "power3.out", stagger: 0.12,
      scrollTrigger: { trigger: cardsGrid, start: "top 82%", once: true },
    });

    return () => { pulse.kill(); };
  }, []);

  return (
    <section id="pricing" className="py-28 relative bg-[#f3f0eb]">
      <div className="section-line absolute top-0 inset-x-0" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-100 bg-brand-400/6 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <div className="pld-3 badge mx-auto mb-5">
            <CreditCard className="w-3 h-3" />
            Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#111111] mb-4 leading-[1.1]">
            You Don&apos;t Pay for Access.
            <br />
            <span className="text-[#111111]">You Pay for Output.</span>
          </h2>
          <p className="text-gray-500 text-[16px] max-w-lg mx-auto">
            Think of credits like task tokens â€” one credit equals one completed action. An invoice sent, a lead followed up, a report filed. You only pay for work that actually gets done.
          </p>
        </motion.div>

        {/* Credit explainer strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="grid grid-cols-3 gap-px bg-black/[0.07] rounded-2xl overflow-hidden border border-black/[0.07]">
            {[
              { icon: Zap,          label: "1 Credit = 1 Task",     desc: "Each completed action uses exactly one credit â€” nothing more" },
              { icon: CreditCard,   label: "Only Pay for Results",   desc: "Credits deduct only when your AI finishes a real task" },
              { icon: CheckCircle2, label: "Credits Never Expire",   desc: "Unused credits roll over every month â€” nothing is wasted" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-white px-4 py-5 text-center">
                <div className="w-7 h-7 rounded-lg bg-brand-500/10 flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-3.5 h-3.5 text-brand-500" />
                </div>
                <div className="text-[12px] font-semibold text-[#111111] mb-1">{label}</div>
                <div className="text-[11px] text-gray-400 leading-snug">{desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Plan cards */}
        <div ref={cardsGridRef} className="grid md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              ref={plan.highlight ? featuredRef : undefined}
              className={`relative rounded-2xl border p-6 flex flex-col transition-all duration-300 ${
                plan.highlight
                  ? "border-brand-300 bg-white shadow-lg"
                  : "border-black/[0.07] bg-white shadow-sm hover:border-brand-200 hover:shadow-md"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="px-3 py-1 rounded-full bg-linear-to-r from-brand-500 to-brand-400 text-[11px] font-medium text-white shadow-sm shadow-brand-500/20">
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className="text-[11px] font-bold mono mb-4 px-2 py-1 rounded-md inline-block"
                style={{ background: `${plan.color}10`, color: plan.color }}
              >
                {plan.name.toUpperCase()}
              </div>

              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-4xl font-bold text-[#111111] tracking-tight">{plan.price}</span>
                <span className="text-gray-400 text-sm">/mo</span>
              </div>
              <div className="text-[12px] font-medium mb-1" style={{ color: plan.color }}>{plan.credits}</div>
              <p className="text-[12px] text-gray-400 mb-5 leading-snug">{plan.desc}</p>

              <ul className="space-y-2 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[13px] text-gray-600">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: plan.color }} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`group flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                  plan.highlight
                    ? "bg-brand-500 hover:bg-brand-400 text-white shadow-sm shadow-brand-500/20"
                    : "border border-black/[0.08] text-gray-500 hover:text-gray-900 hover:border-brand-300 hover:bg-brand-50"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-400 text-[12px] mt-6"
        >
          All plans include a 14-day free trial Â· No credit card required to start
        </motion.p>
      </div>
    </section>
  );
}
