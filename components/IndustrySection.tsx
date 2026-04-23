"use client";
import { motion } from "framer-motion";
import { Code2, Megaphone, DollarSign, Settings, Briefcase } from "lucide-react";

const industries = [
  {
    icon: Code2,
    name: "SaaS",
    color: "#6366f1",
    useCase: "Automate user onboarding sequences, track churn signals, and follow up on failed renewals — without lifting a finger.",
  },
  {
    icon: Megaphone,
    name: "Marketing Agencies",
    color: "#8b5cf6",
    useCase: "Deliver client reports automatically, schedule campaigns, and track performance across accounts in real time.",
  },
  {
    icon: DollarSign,
    name: "Finance",
    color: "#a78bfa",
    useCase: "Reconcile accounts, generate invoices on schedule, and flag payment anomalies before they become problems.",
  },
  {
    icon: Settings,
    name: "Operations",
    color: "#60a5fa",
    useCase: "Coordinate multi-team workflows, maintain SOPs automatically, and escalate blockers before they delay delivery.",
  },
  {
    icon: Briefcase,
    name: "Agencies",
    color: "#38bdf8",
    useCase: "Manage client onboarding, automate billing, and keep project timelines on track without manual follow-ups.",
  },
];

export default function IndustrySection() {
  return (
    <section id="industries" className="py-28 relative">
      <div className="section-line absolute top-0 inset-x-0" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/4 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="badge mx-auto mb-5">
            <Briefcase className="w-3 h-3" />
            Industries
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
            The Right Push for
            <br />
            <span className="gradient-text-soft">Every Industry</span>
          </h2>
          <p className="text-slate-400 text-[16px] max-w-md mx-auto">
            Whatever your business does, Pushable AI finds the workflows worth automating.
          </p>
        </motion.div>

        {/* Industry grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl border border-white/6 bg-white/2 hover:border-white/10 p-6 transition-all duration-300 overflow-hidden cursor-default"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 20% 50%, ${industry.color}08 0%, transparent 70%)` }}
                />

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${industry.color}15`, border: `1px solid ${industry.color}25` }}
                >
                  <Icon className="w-5 h-5" style={{ color: industry.color }} />
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-2">{industry.name}</h3>
                <p className="text-slate-500 text-[13px] leading-relaxed">{industry.useCase}</p>
              </motion.div>
            );
          })}

          {/* "Your industry" CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-2xl border border-dashed border-indigo-500/20 bg-indigo-500/3 p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-[15px] font-semibold text-white mb-2">Your Industry</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed mb-4">
                Don&apos;t see yours listed? Pushable AI adapts to any workflow across any sector.
              </p>
            </div>
            <a href="#" className="text-[13px] text-indigo-400 hover:text-indigo-300 font-medium transition-colors group flex items-center gap-1">
              Talk to us
              <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
