"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, ArrowRight, CreditCard } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$49",
    credits: "500 credits / mo",
    desc: "For solo operators testing one workflow.",
    color: "#6366f1",
    features: ["1 AI Agent", "500 task credits/mo", "3 integrations", "Email support", "Basic dashboard"],
    cta: "Start for Free",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$149",
    credits: "2,000 credits / mo",
    desc: "The sweet spot for growing teams.",
    color: "#8b5cf6",
    features: ["3 AI Agents", "2,000 task credits/mo", "All integrations", "Priority support", "Advanced dashboard", "Custom workflows"],
    cta: "Get Started",
    highlight: true,
  },
  {
    name: "Scale",
    price: "$399",
    credits: "Unlimited",
    desc: "For businesses running on automation.",
    color: "#a78bfa",
    features: ["All 4 AI Agents", "Unlimited credits", "All integrations", "Dedicated support", "White-label option", "API access"],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-28 relative">
      <div className="section-line absolute top-0 inset-x-0" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-100 bg-violet-600/4 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <div className="badge mx-auto mb-5">
            <CreditCard className="w-3 h-3" />
            Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
            You Don&apos;t Pay for Access.
            <br />
            <span className="gradient-text">You Pay for Output.</span>
          </h2>
          <p className="text-slate-400 text-[16px] max-w-lg mx-auto">
            Credit-based pricing means you only pay for tasks that actually run. No wasted seat licences, no idle subscriptions.
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
          <div className="grid grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/6">
            {[
              { icon: Zap,          label: "Pay Per Task",    desc: "Credits used only when a task completes" },
              { icon: CreditCard,   label: "No Hidden Fees",  desc: "No seat licences, no idle charges" },
              { icon: CheckCircle2, label: "Credits Rollover", desc: "Unused credits carry to next month" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-[#04060f] px-4 py-5 text-center">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <div className="text-[12px] font-semibold text-white mb-1">{label}</div>
                <div className="text-[11px] text-slate-600 leading-snug">{desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-2xl border p-6 flex flex-col transition-all duration-300 ${
                plan.highlight
                  ? "border-violet-500/30 bg-linear-to-b from-violet-500/8 to-indigo-500/4 shadow-xl shadow-violet-500/10"
                  : "border-white/6 bg-white/2 hover:border-white/10"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="px-3 py-1 rounded-full bg-linear-to-r from-indigo-500 to-violet-500 text-[11px] font-medium text-white shadow-lg shadow-indigo-500/25">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan name */}
              <div
                className="text-[11px] font-bold mono mb-4 px-2 py-1 rounded-md inline-block"
                style={{ background: `${plan.color}12`, color: plan.color }}
              >
                {plan.name.toUpperCase()}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-4xl font-bold text-white tracking-tight">{plan.price}</span>
                <span className="text-slate-600 text-sm">/mo</span>
              </div>
              <div className="text-[12px] font-medium mb-1" style={{ color: plan.color }}>{plan.credits}</div>
              <p className="text-[12px] text-slate-600 mb-5 leading-snug">{plan.desc}</p>

              {/* Features */}
              <ul className="space-y-2 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[13px] text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: plan.color }} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#"
                className={`group flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                  plan.highlight
                    ? "bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20"
                    : "border border-white/8 text-slate-400 hover:text-white hover:border-white/15 hover:bg-white/3"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-slate-700 text-[12px] mt-6"
        >
          All plans include a 14-day free trial · No credit card required to start
        </motion.p>
      </div>
    </section>
  );
}
