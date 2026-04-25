"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, CheckCircle2, ArrowRight, Zap, Terminal, Bot } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const feed = [
  { done: true,  text: "Invoice #1034 generated and dispatched",    time: "2s ago",   color: "#22c55e" },
  { done: true,  text: "Lead follow-up email scheduled for 9am",    time: "14s ago",  color: "#E8001D" },
  { done: true,  text: "Onboarding document sent to candidate",     time: "1m ago",   color: "#FF2D42" },
  { done: true,  text: "Weekly P&L report compiled",                time: "3m ago",   color: "#E8001D" },
  { done: false, text: "Summarising team standup notesâ€¦",           time: "running",  color: "#FF2D42" },
];

const logs = [
  { t: "09:41:03", msg: "Agent Sara â†’ invoice_generate(#1034)",  ok: true  },
  { t: "09:41:05", msg: "âœ“ Sent to client@acmecorp.com",         ok: true  },
  { t: "09:41:18", msg: "Agent Marco â†’ lead_followup(8 leads)",  ok: true  },
  { t: "09:42:01", msg: "Agent Layla â†’ onboarding_send(J.Doe)",  ok: true  },
  { t: "09:44:52", msg: "Agent Priya â†’ summarise_standup()",     ok: null  },
];

export default function DemoSection() {
  const [playing, setPlaying] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(el,
      { scale: 0.92, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      }
    );
  }, []);

  return (
    <section id="demo" className="py-28 relative bg-white">
      <div className="section-line absolute top-0 inset-x-0" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-400/6 rounded-full blur-[110px] -translate-y-1/2" />
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#111111] mb-4 leading-[1.1]" style={{ fontFamily: "var(--font-fraunces)" }}>
            See How Your AI Assistant Handles
            <br />
            <span className="text-[#111111]">Work Behind The Scenes</span>
          </h2>
          <p className="text-gray-500 text-[16px] max-w-lg mx-auto">
            Your AI assistant runs real tasks in the background â€” generating invoices, following up on leads, onboarding candidates, and compiling reports â€” without you lifting a finger. Watch exactly what it handles, when it happened, and what&apos;s running right now.
          </p>
        </motion.div>

        <div ref={gridRef} className="grid lg:grid-cols-2 gap-6 items-start" style={{ willChange: "transform" }}>
          {/* Left â€” live feed + logs */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            {/* Task feed */}
            <div className="rounded-2xl border border-black/[0.07] bg-white shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-black/[0.06]">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[11px] text-green-600 mono font-medium">Live task feed</span>
                <div className="ml-auto badge text-[10px]">
                  <Bot className="w-3 h-3" />
                  4 agents active
                </div>
              </div>
              <div className="p-3 space-y-1.5">
                {feed.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50 hover:bg-brand-50 transition-colors"
                  >
                    {f.done ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: f.color }} />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-brand-400 border-t-transparent shrink-0 animate-spin" />
                    )}
                    <span className={`text-[12px] flex-1 ${f.done ? "text-gray-600" : "text-brand-600"}`}>{f.text}</span>
                    <span className="text-[10px] text-gray-400 mono shrink-0">{f.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Terminal log â€” stays dark for authenticity */}
            <div className="rounded-2xl border border-gray-200 bg-gray-900 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.07] bg-black/20">
                <Terminal className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-[11px] text-gray-500 mono">pushable-ai agent.log</span>
              </div>
              <div className="p-3 space-y-1">
                {logs.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-baseline gap-3 text-[11px] mono"
                  >
                    <span className="text-gray-600 shrink-0">{l.t}</span>
                    <span className={
                      l.ok === true  ? "text-gray-400" :
                      l.ok === false ? "text-brand-400 animate-pulse" :
                                       "text-gray-500"
                    }>{l.msg}</span>
                  </motion.div>
                ))}
                <div className="flex items-baseline gap-3 text-[11px] mono">
                  <span className="text-gray-600">09:44:52</span>
                  <span className="text-gray-600">â–Œ<span className="animate-blink">_</span></span>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right â€” screen mockup */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div
              className="relative rounded-2xl overflow-hidden border border-black/[0.07] shadow-sm cursor-pointer group"
              onClick={() => setPlaying(!playing)}
            >
              {/* Screen â€” stays dark as it represents a real UI screen */}
              <div className="aspect-[4/3] bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 dot-grid opacity-10" />

                <div className="absolute inset-0 p-5 flex flex-col gap-3">
                  {/* Top bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-brand-500/30 flex items-center justify-center">
                        <Zap className="w-3 h-3 text-brand-400" />
                      </div>
                      <span className="text-[11px] text-gray-400 mono">Pushable AI â€” Live Operations</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10px] text-green-400">Live</span>
                    </div>
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-2.5 flex-1">
                    {[
                      { label: "Invoice Processing", w: "78%", c: "#E8001D" },
                      { label: "Lead Follow-ups",    w: "92%", c: "#FF2D42" },
                      { label: "HR Onboarding",      w: "61%", c: "#E8001D" },
                      { label: "Task Scheduling",    w: "85%", c: "#FF2D42" },
                      { label: "Report Generation",  w: "44%", c: "#E8001D" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <span className="text-[10px] text-gray-500 w-32 shrink-0">{row.label}</span>
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            animate={{ width: [row.w, `${parseInt(row.w) - 4}%`, row.w] }}
                            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                            className="h-1.5 rounded-full"
                            style={{ background: `linear-gradient(90deg, ${row.c}, ${row.c}60)` }}
                          />
                        </div>
                        <span className="text-[10px] mono w-8 text-right shrink-0" style={{ color: row.c }}>{row.w}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 via-transparent to-transparent" />

                {/* Play overlay */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playing ? "opacity-0" : "opacity-100"}`}>
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 rounded-full bg-white/90 border border-white/20 flex items-center justify-center shadow-2xl backdrop-blur-xl"
                  >
                    <Play className="w-5 h-5 text-gray-900 fill-gray-900 ml-0.5" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Bottom glow */}
            <div className="absolute -bottom-4 inset-x-8 h-8 bg-brand-500/10 blur-xl rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
