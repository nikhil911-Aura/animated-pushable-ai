"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LayoutGrid, Plug, BarChart3, ArrowRight, MessageCircle } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: LayoutGrid,
    color: "#6366f1",
    title: "Choose Your Assistant",
    body: "Browse four specialist AI agents — Finance, HR, Revenue, or Operations. Pick the one that hits your biggest bottleneck and activate in minutes. No technical setup required.",
    items: ["Select from 4 specialists", "Preview before deploying", "No commitment required"],
  },
  {
    n: "02",
    icon: Plug,
    color: "#8b5cf6",
    title: "Configure & Connect",
    body: "Link your existing tools with one click. Slack, Gmail, HubSpot — all connected instantly. Your agent learns your workflows and starts running alongside your team immediately.",
    items: ["50+ one-click integrations", "No code, no APIs to configure", "Live in under 10 minutes"],
  },
  {
    n: "03",
    icon: BarChart3,
    color: "#a78bfa",
    title: "Monitor & Scale",
    body: "Watch every task complete on a live dashboard. Add more agents, more workflows, and more connections as your business scales — the system grows with you automatically.",
    items: ["Live task dashboard", "Add agents any time", "Weekly performance reports"],
  },
];

export default function HowItWorksSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="how-it-works" className="py-28 relative">
      <div className="section-line absolute top-0 inset-x-0" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/4 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="badge mx-auto mb-5">
            <BarChart3 className="w-3 h-3" />
            How it works
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
            Up and Running in
            <br />
            <span className="gradient-text">Three Simple Steps</span>
          </h2>
          <p className="text-slate-400 text-[16px] max-w-md mx-auto">
            If you can use Slack, you can deploy a Pushable AI agent. No technical knowledge needed.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[27px] sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-white/5" />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.8, delay: 0.3, ease: "easeInOut" }}
            style={{ originY: 0 }}
            className="absolute left-[27px] sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-linear-to-b from-indigo-500/60 via-violet-500/40 to-transparent"
          />

          <div className="space-y-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex gap-6 sm:gap-0 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  } items-start sm:items-center`}
                >
                  {/* Content card */}
                  <div className={`sm:w-[calc(50%-3rem)] ${isLeft ? "sm:pr-8 sm:text-right" : "sm:pl-8 sm:text-left"} pl-14 sm:pl-0`}>
                    <div className={`glass-card rounded-2xl p-6 border border-white/6 hover:border-white/10 transition-colors duration-300`}>
                      {/* Step number */}
                      <div
                        className={`mono text-xs font-bold mb-3 ${isLeft ? "sm:text-right" : "sm:text-left"}`}
                        style={{ color: `${step.color}70` }}
                      >
                        {step.n}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-slate-400 text-[13px] leading-relaxed mb-4">{step.body}</p>
                      <ul className={`space-y-1.5 ${isLeft ? "sm:items-end" : ""} flex flex-col`}>
                        {step.items.map((item) => (
                          <li
                            key={item}
                            className={`flex items-center gap-2 text-[12px] text-slate-500 ${
                              isLeft ? "sm:flex-row-reverse sm:self-end" : ""
                            }`}
                          >
                            <div className="w-1 h-1 rounded-full shrink-0" style={{ background: step.color }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="absolute left-0 sm:static sm:w-24 flex items-center justify-center shrink-0">
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
                      className="w-14 h-14 rounded-full flex items-center justify-center relative"
                      style={{ background: `${step.color}12`, border: `1px solid ${step.color}30` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: step.color }} />
                      <motion.div
                        animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
                        className="absolute inset-0 rounded-full"
                        style={{ border: `1px solid ${step.color}` }}
                      />
                    </motion.div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden sm:block sm:w-[calc(50%-3rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-14"
        >
          <p className="text-slate-600 text-sm mb-4">Not sure which agent fits your workflow?</p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/8 text-slate-400 hover:text-white hover:border-indigo-500/30 hover:bg-indigo-500/5 text-[13px] font-medium transition-all duration-200 group"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Talk to Our Expert
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
