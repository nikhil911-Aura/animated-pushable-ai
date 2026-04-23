"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Zap, CheckCircle2, TrendingUp, Clock, Bot, Activity } from "lucide-react";

/* ─── Animated typing headline ─────────────────────────── */
function TypedWord({ words }: { words: string[] }) {
  const [idx, setIdx]   = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % words.length);
        setShow(true);
      }, 400);
    }, 2800);
    return () => clearInterval(timer);
  }, [words]);

  return (
    <AnimateWord show={show} key={idx}>
      {words[idx]}
    </AnimateWord>
  );
}

function AnimateWord({ children, show }: { children: string; show: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="gradient-text inline-block"
    >
      {children}
    </motion.span>
  );
}

/* ─── Product dashboard mockup ──────────────────────────── */
function ProductMockup() {
  const agents = [
    { name: "Sara",  role: "Finance AI",    pct: 87, color: "#6366f1", task: "Processing 14 invoices" },
    { name: "Layla", role: "HR Manager AI", pct: 64, color: "#8b5cf6", task: "Onboarding 3 candidates" },
    { name: "Marco", role: "Revenue AI",    pct: 93, color: "#a78bfa", task: "Following up 8 leads" },
    { name: "Priya", role: "Ops AI",        pct: 71, color: "#60a5fa", task: "Scheduling 22 tasks" },
  ];

  const events = [
    { icon: CheckCircle2, text: "Invoice #1034 sent", time: "2s",  color: "#22c55e" },
    { icon: TrendingUp,   text: "+$12,400 recovered", time: "18s", color: "#6366f1" },
    { icon: Clock,        text: "Report auto-generated", time: "1m", color: "#a78bfa" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-4xl mx-auto"
    >
      {/* Glow behind */}
      <div className="absolute -inset-4 bg-indigo-500/8 rounded-3xl blur-3xl pointer-events-none" />
      <div className="absolute -inset-1 bg-gradient-to-b from-indigo-500/10 to-violet-500/5 rounded-2xl blur-xl pointer-events-none" />

      {/* Outer frame */}
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-[#080c1a] shadow-2xl shadow-black/60">

        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05] bg-[#060910]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 mx-4">
            <div className="max-w-64 mx-auto h-6 rounded-md bg-white/[0.04] border border-white/[0.05] flex items-center justify-center gap-2 px-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
              <span className="text-[10px] text-slate-500 mono">app.pushable.ai/dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-green-400 mono">All agents live</span>
          </div>
        </div>

        {/* Dashboard body */}
        <div className="grid grid-cols-3 divide-x divide-white/[0.04]">

          {/* Left — agent list */}
          <div className="col-span-2 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-white tracking-wider uppercase opacity-60">Active Agents</h3>
              <div className="badge text-[10px]">
                <Activity className="w-3 h-3" />
                Live
              </div>
            </div>
            <div className="space-y-3">
              {agents.map((a, i) => (
                <motion.div
                  key={a.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors cursor-default"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: `${a.color}18`, border: `1px solid ${a.color}30`, color: a.color }}
                  >
                    {a.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[12px] font-medium text-white">{a.name}</span>
                      <span className="text-[10px] mono" style={{ color: a.color }}>{a.pct}%</span>
                    </div>
                    <div className="w-full bg-white/[0.05] rounded-full h-1">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${a.pct}%` }}
                        transition={{ delay: 1.3 + i * 0.12, duration: 1.2, ease: "easeOut" }}
                        className="h-1 rounded-full"
                        style={{ background: `linear-gradient(90deg, ${a.color}, ${a.color}70)` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-600 mt-0.5 block">{a.task}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-white/[0.04]">
              {[
                { v: "1,247",  l: "Tasks done" },
                { v: "94 hrs", l: "Time saved" },
                { v: "99.8%",  l: "Accuracy" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="text-sm font-bold gradient-text">{s.v}</div>
                  <div className="text-[10px] text-slate-600 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — live event feed */}
          <div className="p-4">
            <h3 className="text-xs font-semibold text-white tracking-wider uppercase opacity-60 mb-4">Live Feed</h3>
            <div className="space-y-2">
              {events.map((e, i) => {
                const Icon = e.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + i * 0.15 }}
                    className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.04]"
                  >
                    <div className="flex items-start gap-2">
                      <Icon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: e.color }} />
                      <div>
                        <div className="text-[11px] text-slate-300 leading-snug">{e.text}</div>
                        <div className="text-[10px] text-slate-600 mt-0.5 mono">{e.time} ago</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Scanning line effect */}
              <div className="relative mt-3 h-20 rounded-xl overflow-hidden bg-indigo-500/[0.04] border border-indigo-500/10">
                <div className="absolute inset-0 dot-grid opacity-30" />
                <motion.div
                  animate={{ y: ["0%", "320%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
                  className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-indigo-500/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating metric badges */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-5 top-12 glass-dark rounded-xl px-3 py-2.5 border border-white/[0.07] shadow-xl hidden lg:block"
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
          <span className="text-xs text-slate-300">Task completed</span>
        </div>
        <div className="text-[10px] text-slate-600 mono mt-0.5">Invoice #1034 → sent</div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -right-5 bottom-16 glass-dark rounded-xl px-3 py-2.5 border border-white/[0.07] shadow-xl hidden lg:block"
      >
        <div className="text-[10px] text-slate-500 mono mb-0.5">revenue recovered</div>
        <div className="text-base font-bold gradient-text">+$24,800</div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Hero ─────────────────────────────────────────── */
export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y   = useTransform(scrollYProgress, [0, 0.4], ["0%", "25%"]);
  const opc = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 bg-[#04060f]">
        {/* Radial glow orbs */}
        <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-indigo-600/[0.07] rounded-full blur-[140px] animate-pulse-glow" />
          <div className="absolute top-2/3 left-1/4 w-[500px] h-[400px] bg-violet-600/[0.05] rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-blue-600/[0.04] rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "4s" }} />
        </motion.div>

        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-40" />

        {/* Vignette edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,#04060f_100%)] pointer-events-none" />
      </div>

      {/* ── Content ── */}
      <motion.div style={{ opacity: opc }} className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-7"
        >
          <a href="#" className="badge group hover:border-indigo-400/40 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Introducing Pushable AI — Try free today
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-bold leading-[1.06] tracking-[-0.03em] text-white mb-6"
        >
          AI Assistants That{" "}
          <br className="hidden sm:block" />
          <TypedWord words={["Automate", "Streamline", "Accelerate", "Transform"]} />
          <br className="hidden sm:block" />
          {" "}Your Workflows
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="text-[17px] text-slate-400 leading-relaxed max-w-xl mx-auto mb-9"
        >
          Your AI team silently handles repetitive operations in the background — so you focus exclusively on decisions that move the business forward.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5"
        >
          <a
            href="#"
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white font-medium text-[14px] transition-all duration-200 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:-translate-y-px overflow-hidden"
          >
            <Zap className="w-4 h-4 fill-white relative z-10" />
            <span className="relative z-10">Start for Free</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </a>

          <a
            href="#demo"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.1] text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/[0.04] text-[14px] font-medium transition-all duration-200"
          >
            <div className="w-5 h-5 rounded-full bg-white/[0.08] group-hover:bg-indigo-500/20 flex items-center justify-center transition-colors">
              <Play className="w-2.5 h-2.5 ml-px" />
            </div>
            Watch Demo
          </a>
        </motion.div>

        {/* Social proof row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-5 text-[12px] text-slate-600"
        >
          {["No credit card", "Setup in 10 min", "Cancel anytime", "2,000+ businesses"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-indigo-500/60" />
              {t}
            </span>
          ))}
        </motion.div>

        {/* Product mockup */}
        <div className="mt-16 px-0 sm:px-4">
          <ProductMockup />
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-6 rounded-full border border-white/10 flex items-start justify-center pt-1"
        >
          <div className="w-0.5 h-1.5 rounded-full bg-indigo-400/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
