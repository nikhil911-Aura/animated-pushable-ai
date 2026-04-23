"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DollarSign, Users, TrendingUp, Settings, ArrowRight, Sparkles, Activity } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const agents = [
  {
    name: "Sara",
    title: "Finance Workflow Agent",
    icon: DollarSign,
    color: "#f97316",
    bgFrom: "from-orange-500/8",
    bgTo: "to-orange-600/0",
    border: "border-orange-200",
    description: "Sara handles your financial workflows end-to-end — generating invoices, tracking expenses, and compiling reports — so your numbers stay accurate and your team stays focused on growth.",
    tasks: ["Auto-generate & send invoices", "Track expenses in real-time", "Compile monthly P&L reports", "Flag payment anomalies"],
    stat: { label: "Invoices/mo", value: "340+" },
    mockup: [
      { label: "Invoice #1034",  status: "Sent",       pct: 100 },
      { label: "Invoice #1035",  status: "Processing", pct: 67  },
      { label: "Expense Report", status: "Drafting",   pct: 40  },
    ],
  },
  {
    name: "Layla",
    title: "HR Workflow Manager",
    icon: Users,
    color: "#fb923c",
    bgFrom: "from-orange-400/8",
    bgTo: "to-orange-500/0",
    border: "border-orange-200",
    description: "Layla takes over your entire hiring and onboarding process — screening candidates, scheduling interviews, and sending welcome documents — so your HR team focuses on people, not admin.",
    tasks: ["Screen & rank applicants", "Automate onboarding docs", "Schedule interviews", "Track team milestones"],
    stat: { label: "Hours saved/hire", value: "18 hrs" },
    mockup: [
      { label: "John D. — Interview",  status: "Scheduled", pct: 100 },
      { label: "Onboarding Pack",      status: "Sent",      pct: 100 },
      { label: "Background Check",     status: "Running",   pct: 55  },
    ],
  },
  {
    name: "Marco",
    title: "Revenue AI Assistant",
    icon: TrendingUp,
    color: "#f97316",
    bgFrom: "from-orange-500/8",
    bgTo: "to-orange-600/0",
    border: "border-orange-200",
    description: "Marco keeps your revenue pipeline moving — following up on leads, creating proposals, tracking deals, and flagging at-risk accounts — so every opportunity gets the attention it deserves.",
    tasks: ["Follow up cold leads", "Generate proposals", "Monitor deal pipeline", "Recover at-risk accounts"],
    stat: { label: "Revenue recovered", value: "$24.8K" },
    mockup: [
      { label: "Lead: Acme Corp",   status: "Followed up", pct: 100 },
      { label: "Proposal #44",      status: "Sent",        pct: 100 },
      { label: "Deal: Nova Inc",    status: "Negotiating", pct: 70  },
    ],
  },
  {
    name: "Priya",
    title: "Operations Backbone",
    icon: Settings,
    color: "#fb923c",
    bgFrom: "from-orange-400/8",
    bgTo: "to-orange-500/0",
    border: "border-orange-200",
    description: "Priya handles day-to-day coordination, task scheduling, and team communication so nothing falls through the cracks — giving you the headspace to focus entirely on strategy and growth.",
    tasks: ["Schedule & coordinate team syncs", "Maintain SOPs automatically", "Escalate blockers in real-time", "Track project milestones"],
    stat: { label: "Tasks automated/wk", value: "220+" },
    mockup: [
      { label: "Sprint Planning",   status: "Scheduled", pct: 100 },
      { label: "SOP Update v3",     status: "Published", pct: 100 },
      { label: "Blocker: API down", status: "Escalated", pct: 100 },
    ],
  },
];

function AgentPanel({ agent, isActive }: { agent: typeof agents[0]; isActive: boolean }) {
  const Icon = agent.icon;
  return (
    <div className="w-screen shrink-0 flex items-center justify-center px-5 sm:px-16 lg:px-24">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-10 items-center">

        {/* Left — text */}
        <div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-medium mb-5"
            style={{ background: `${agent.color}12`, color: agent.color, border: `1px solid ${agent.color}25` }}
          >
            <Icon className="w-3.5 h-3.5" />
            {agent.title}
          </div>
          <h3 className="text-4xl sm:text-5xl font-bold text-[#111111] mb-4 tracking-tight">
            Meet <span style={{ color: agent.color }}>{agent.name}</span>
          </h3>
          <p className="text-gray-500 text-[16px] leading-relaxed mb-6">{agent.description}</p>

          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-medium mb-6"
            style={{ background: `${agent.color}10`, color: agent.color, border: `1px solid ${agent.color}22` }}
          >
            <span className="font-bold text-base">{agent.stat.value}</span>
            <span className="text-gray-400">{agent.stat.label}</span>
          </div>

          <ul className="space-y-2.5 mb-8">
            {agent.tasks.map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-[13px] text-gray-500">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: agent.color }} />
                {t}
              </li>
            ))}
          </ul>

          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-[13px] text-white transition-all duration-200 group/btn shadow-sm"
            style={{ background: agent.color }}
          >
            Deploy {agent.name}
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Right — mockup */}
        <div
          className="rounded-2xl p-5 border bg-white shadow-sm"
          style={{ borderColor: `${agent.color}25` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${agent.color}14`, border: `1px solid ${agent.color}25` }}
              >
                <Icon className="w-4 h-4" style={{ color: agent.color }} />
              </div>
              <div>
                <div className="text-[12px] font-semibold text-[#111111]">{agent.name}</div>
                <div className="text-[10px] text-gray-400">{agent.title}</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-green-500" />
              <span className="text-[10px] text-green-600 mono">live</span>
            </div>
          </div>

          <div className="space-y-3">
            {agent.mockup.map((m) => (
              <div key={m.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-gray-500">{m.label}</span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded mono"
                    style={{
                      background: m.pct === 100 ? `${agent.color}12` : "rgba(0,0,0,0.04)",
                      color: m.pct === 100 ? agent.color : "#888888",
                    }}
                  >
                    {m.status}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isActive ? { width: `${m.pct}%` } : { width: 0 }}
                    transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
                    className="h-1 rounded-full"
                    style={{ background: agent.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentCard({ agent, active, onClick }: { agent: typeof agents[0]; active: boolean; onClick: () => void }) {
  const Icon = agent.icon;
  return (
    <motion.div
      layout
      onClick={onClick}
      whileHover={{ y: active ? 0 : -3 }}
      className={`group relative rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden bg-white ${
        active
          ? `${agent.border} shadow-md`
          : "border-black/[0.07] hover:border-orange-200 hover:shadow-sm"
      }`}
    >
      {active && (
        <div
          className="absolute -inset-2 rounded-2xl blur-2xl opacity-10 pointer-events-none"
          style={{ background: agent.color }}
        />
      )}
      <div className="relative p-5">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${agent.color}12`, border: `1px solid ${agent.color}22` }}
          >
            <Icon className="w-5 h-5" style={{ color: agent.color }} />
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-green-500" />
            <span className="text-[10px] text-green-600 mono">live</span>
          </div>
        </div>
        <h3 className="text-[15px] font-semibold text-[#111111] mb-0.5">{agent.name}</h3>
        <p className="text-[12px] mb-4" style={{ color: active ? agent.color : "#888888" }}>
          {agent.title}
        </p>
        <p className="text-[13px] text-gray-500 leading-relaxed mb-4">{agent.description}</p>
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-medium"
          style={{ background: `${agent.color}10`, color: agent.color, border: `1px solid ${agent.color}22` }}
        >
          <span className="font-bold text-sm">{agent.stat.value}</span>
          <span className="text-gray-400">{agent.stat.label}</span>
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 rounded-xl bg-gray-50 border border-black/5 p-3 space-y-2">
                {agent.mockup.map((m) => (
                  <div key={m.label} className="flex items-center gap-2 text-[11px]">
                    <div className="flex-1 text-gray-500 truncate">{m.label}</div>
                    <div
                      className="text-[10px] px-1.5 py-0.5 rounded mono"
                      style={{
                        background: m.pct === 100 ? `${agent.color}12` : "rgba(0,0,0,0.04)",
                        color: m.pct === 100 ? agent.color : "#888888",
                      }}
                    >
                      {m.status}
                    </div>
                    <div className="w-12 bg-gray-100 rounded-full h-1 shrink-0">
                      <div
                        className="h-1 rounded-full transition-all duration-700"
                        style={{ width: `${m.pct}%`, background: agent.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <ul className="mt-3 space-y-1.5">
                {agent.tasks.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-[12px] text-gray-400">
                    <div className="w-1 h-1 rounded-full shrink-0" style={{ background: agent.color }} />
                    {t}
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 flex items-center gap-1.5 text-[12px] font-medium transition-colors group/btn"
                style={{ color: agent.color }}
              >
                Deploy {agent.name}
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function AgentsSection() {
  const [active, setActive] = useState(0);
  const [activePanel, setActivePanel] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const outerRef  = useRef<HTMLDivElement | null>(null);
  const trackRef  = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const panels = agents.length;
    const scrollLen = window.innerHeight * 3.5;

    const trigger = ScrollTrigger.create({
      trigger: outer,
      start: "top top",
      end: `+=${scrollLen}`,
      pin: true,
      scrub: 1,
      snap: {
        snapTo: 1 / (panels - 1),
        duration: { min: 0.2, max: 0.5 },
        ease: "power1.inOut",
      },
      onUpdate: (self) => {
        const idx = Math.round(self.progress * (panels - 1));
        setActivePanel(idx);
        gsap.to(track, {
          x: -(self.progress * (panels - 1) * window.innerWidth),
          ease: "none",
          overwrite: "auto",
          duration: 0,
        });
      },
    });

    return () => { trigger.kill(); };
  }, [isMobile]);

  const Header = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="text-center mb-14 max-w-5xl mx-auto px-5 sm:px-8"
    >
      <div className="pld-3 badge mx-auto mb-5">
        <Sparkles className="w-3 h-3" />
        AI Agents
      </div>
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#111111] mb-4 leading-[1.1]">
        Your AI Agents, Each Built
        <br />
        <span className="gradient-text">for a Specific Role</span>
      </h2>
      <p className="text-gray-500 text-[16px] max-w-xl mx-auto leading-relaxed">
        Four AI agents, each purpose-built for a different part of your business. Pick the one that fits your biggest bottleneck and let it handle the work end-to-end.
      </p>
    </motion.div>
  );

  if (isMobile) {
    return (
      <section id="agents" className="py-28 relative bg-white">
        <div className="section-line absolute top-0 inset-x-0" />
        {Header}
        <div className="max-w-5xl mx-auto px-5 grid sm:grid-cols-2 gap-4">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <AgentCard
                agent={agent}
                active={active === i}
                onClick={() => setActive(active === i ? -1 : i)}
              />
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="agents" className="relative bg-white">
      <div className="section-line absolute top-0 inset-x-0" />

      <div ref={outerRef} className="relative overflow-hidden" style={{ height: "100vh" }}>
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-125 rounded-full blur-[120px] transition-colors duration-700"
            style={{ background: `${agents[activePanel]?.color ?? "#f97316"}06` }}
          />
        </div>

        {/* Progress dots */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {agents.map((a, i) => (
            <div
              key={a.name}
              className="transition-all duration-300 rounded-full"
              style={{
                width:   i === activePanel ? "24px" : "6px",
                height:  "6px",
                background: i === activePanel ? agents[activePanel].color : "rgba(0,0,0,0.15)",
              }}
            />
          ))}
        </div>

        {/* Section label */}
        <div className="absolute top-8 right-8 z-20 flex items-center gap-2">
          <div className="badge">
            <Sparkles className="w-3 h-3" />
            AI Agents
          </div>
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{ width: `${agents.length * 100}vw` }}
        >
          {agents.map((agent, i) => (
            <AgentPanel key={agent.name} agent={agent} isActive={i === activePanel} />
          ))}
        </div>
      </div>
    </section>
  );
}
