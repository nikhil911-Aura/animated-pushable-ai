"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Play, CheckCircle2, ArrowRight, Zap, Terminal, Bot } from "lucide-react";

const feed = [
  { done: true,  text: "Invoice #1034 generated and dispatched",    time: "2s ago",   color: "#22c55e" },
  { done: true,  text: "Lead follow-up email scheduled for 9am",    time: "14s ago",  color: "#6366f1" },
  { done: true,  text: "Onboarding document sent to candidate",     time: "1m ago",   color: "#8b5cf6" },
  { done: true,  text: "Weekly P&L report compiled",                time: "3m ago",   color: "#a78bfa" },
  { done: false, text: "Summarising team standup notes…",           time: "running",  color: "#60a5fa" },
];

const logs = [
  { t: "09:41:03", msg: "Agent Sara → invoice_generate(#1034)",  ok: true  },
  { t: "09:41:05", msg: "✓ Sent to client@acmecorp.com",         ok: true  },
  { t: "09:41:18", msg: "Agent Marco → lead_followup(8 leads)",  ok: true  },
  { t: "09:42:01", msg: "Agent Layla → onboarding_send(J.Doe)",  ok: true  },
  { t: "09:44:52", msg: "Agent Priya → summarise_standup()",     ok: null  },
];

export default function DemoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="demo" className="py-28 relative">
      <div className="section-line absolute top-0 inset-x-0" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-indigo-950/10 to-transparent" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-600/4 rounded-full blur-[110px] -translate-y-1/2" />
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="badge mx-auto mb-5">
            <Play className="w-3 h-3 fill-indigo-400 text-indigo-400" />
            Live Demo
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
            Watch Real Workflows
            <br />
            <span className="gradient-text">Run Themselves</span>
          </h2>
          <p className="text-slate-400 text-[16px] max-w-lg mx-auto">
            Every task below is running live across Pushable AI users right now — invoices sent, leads followed up, candidates onboarded. No manual clicks. Ever.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Left — live feed + logs */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            {/* Task feed */}
            <div className="rounded-2xl border border-white/6 bg-white/2 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[11px] text-green-400 mono font-medium">Live task feed</span>
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
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/2 hover:bg-white/3 transition-colors"
                  >
                    {f.done ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: f.color }} />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-indigo-400 border-t-transparent shrink-0 animate-spin" />
                    )}
                    <span className={`text-[12px] flex-1 ${f.done ? "text-slate-300" : "text-indigo-300"}`}>{f.text}</span>
                    <span className="text-[10px] text-slate-600 mono shrink-0">{f.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Terminal log */}
            <div className="rounded-2xl border border-white/6 bg-[#080c18] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-black/20">
                <Terminal className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-[11px] text-slate-600 mono">pushable-ai agent.log</span>
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
                    <span className="text-slate-700 shrink-0">{l.t}</span>
                    <span className={
                      l.ok === true ? "text-slate-400" :
                      l.ok === false ? "text-indigo-400 animate-pulse" :
                      "text-slate-500"
                    }>{l.msg}</span>
                  </motion.div>
                ))}
                <div className="flex items-baseline gap-3 text-[11px] mono">
                  <span className="text-slate-700">09:44:52</span>
                  <span className="text-slate-700">▌<span className="animate-blink">_</span></span>
                </div>
              </div>
            </div>

            <a
              href="#"
              className="group w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-medium text-[13px] transition-all duration-200 shadow-lg shadow-indigo-500/20"
            >
              <Zap className="w-4 h-4 fill-white" />
              Request a Live Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Right — video/screen mockup */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div
              className="relative rounded-2xl overflow-hidden border border-white/6 cursor-pointer group"
              onClick={() => setPlaying(!playing)}
            >
              {/* Screen content */}
              <div className="aspect-[4/3] bg-[#080c1a] relative overflow-hidden">
                {/* Grid bg */}
                <div className="absolute inset-0 dot-grid opacity-20" />

                {/* Fake UI */}
                <div className="absolute inset-0 p-5 flex flex-col gap-3">
                  {/* Top bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-indigo-500/30 flex items-center justify-center">
                        <Zap className="w-3 h-3 text-indigo-400" />
                      </div>
                      <span className="text-[11px] text-slate-400 mono">Pushable AI — Live Operations</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10px] text-green-400">Live</span>
                    </div>
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-2.5 flex-1">
                    {[
                      { label: "Invoice Processing", w: "78%", c: "#6366f1" },
                      { label: "Lead Follow-ups",    w: "92%", c: "#8b5cf6" },
                      { label: "HR Onboarding",      w: "61%", c: "#a78bfa" },
                      { label: "Task Scheduling",    w: "85%", c: "#60a5fa" },
                      { label: "Report Generation",  w: "44%", c: "#38bdf8" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <span className="text-[10px] text-slate-600 w-32 shrink-0">{row.label}</span>
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

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-[#080c1a]/60 via-transparent to-transparent" />

                {/* Play overlay */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playing ? "opacity-0" : "opacity-100"}`}>
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 rounded-full glass-dark border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-xl"
                  >
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Bottom glow */}
            <div className="absolute -bottom-4 inset-x-8 h-8 bg-indigo-500/15 blur-xl rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
