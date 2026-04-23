"use client";
import { motion } from "framer-motion";
import { Clock, Brain, Repeat, Zap, MessageCircle, ArrowRight } from "lucide-react";

const reasons = [
  {
    icon: Clock,
    color: "#6366f1",
    title: "Reduced Manual Work",
    desc: "Reclaim 94+ hours per month. Pushable AI takes over repetitive low-value tasks so your team focuses exclusively on work that drives growth.",
  },
  {
    icon: Brain,
    color: "#8b5cf6",
    title: "Smart Decision Making",
    desc: "Agents surface insights, flag anomalies, and recommend actions — giving your team the right information at the right moment, every time.",
  },
  {
    icon: Repeat,
    color: "#a78bfa",
    title: "Consistency Without Glitches",
    desc: "Every process runs exactly as defined, every single time. No human errors, no missed steps, no inconsistency across team members.",
  },
  {
    icon: Zap,
    color: "#60a5fa",
    title: "No Task Delays",
    desc: "Agents run 24/7. Whether it's midnight or a bank holiday, your workflows keep moving — no waiting on a team member to log back in.",
  },
];

export default function WhyTrustSection() {
  return (
    <section className="py-28 relative">
      <div className="section-line absolute top-0 inset-x-0" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-indigo-950/15 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="badge mb-5">
              <Zap className="w-3 h-3" />
              Why teams trust us
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-[1.1]">
              Built for Teams That
              <br />
              <span className="gradient-text">Refuse to Slow Down</span>
            </h2>
            <p className="text-slate-400 text-[15px] leading-relaxed mb-8">
              Pushable AI isn&apos;t another tool that adds complexity — it removes it. Four core benefits that make every team we work with say the same thing: &quot;I can&apos;t go back.&quot;
            </p>
            <a
              href="#"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/8 text-slate-400 hover:text-white hover:border-indigo-500/30 hover:bg-indigo-500/5 text-[13px] font-medium transition-all duration-200"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Talk to Our Expert
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Right — 2×2 reasons */}
          <div className="grid grid-cols-2 gap-4">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.09 }}
                  whileHover={{ y: -3 }}
                  className="group rounded-2xl border border-white/6 bg-white/2 hover:border-white/10 p-5 transition-all duration-300"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${r.color}12`, border: `1px solid ${r.color}20` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: r.color }} />
                  </div>
                  <h3 className="text-[13px] font-semibold text-white mb-2 leading-snug">{r.title}</h3>
                  <p className="text-slate-600 text-[12px] leading-relaxed">{r.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
