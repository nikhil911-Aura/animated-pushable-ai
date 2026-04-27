"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DollarSign, Users, TrendingUp, Settings, ArrowRight, Activity } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const agents = [
  {
    name: "Finance",
    title: "Invoice & Payment Workflow",
    icon: DollarSign,
    color: "#E8001D",
    bgFrom: "from-brand-500/8",
    bgTo: "to-brand-600/0",
    border: "border-brand-200",
    description: "Build a workflow that auto-generates invoices, chases payments, flags anomalies, and compiles reports — fully configured around your billing cycle and tools.",
    tasks: ["Auto-generate & send invoices", "Track expenses in real-time", "Compile monthly P&L reports", "Flag payment anomalies"],
    stat: { label: "Avg. hours saved/mo", value: "94 hrs" },
    mockup: [
      { label: "Invoice #1034",  status: "Sent",       pct: 100 },
      { label: "Invoice #1035",  status: "Processing", pct: 67  },
      { label: "Expense Report", status: "Drafting",   pct: 40  },
      { label: "Q2 P&L Report",  status: "Queued",     pct: 15  },
      { label: "Tax Summary",    status: "Pending",    pct: 5   },
    ],
    metrics: [{ label: "Tasks automated", value: "340+" }, { label: "Errors caught", value: "12" }, { label: "Hours saved", value: "94" }],
  },
  {
    name: "HR & Hiring",
    title: "Recruitment & Onboarding Workflow",
    icon: Users,
    color: "#FF2D42",
    bgFrom: "from-brand-400/8",
    bgTo: "to-brand-500/0",
    border: "border-brand-200",
    description: "Design a hiring pipeline that screens applicants, schedules interviews, and delivers onboarding packs automatically — shaped entirely by your process.",
    tasks: ["Screen & rank applicants", "Automate onboarding docs", "Schedule interviews", "Track team milestones"],
    stat: { label: "Saved per hire", value: "18 hrs" },
    mockup: [
      { label: "Applicant Screen",     status: "Done",      pct: 100 },
      { label: "Interview Scheduled",  status: "Confirmed", pct: 100 },
      { label: "Offer Letter",         status: "Drafting",  pct: 60  },
      { label: "Onboarding Pack",      status: "Queued",    pct: 20  },
      { label: "Background Check",     status: "Pending",   pct: 5   },
    ],
    metrics: [{ label: "Candidates processed", value: "84" }, { label: "Interviews booked", value: "21" }, { label: "Hrs saved/hire", value: "18" }],
  },
  {
    name: "Sales",
    title: "Revenue & Pipeline Workflow",
    icon: TrendingUp,
    color: "#E8001D",
    bgFrom: "from-brand-500/8",
    bgTo: "to-brand-600/0",
    border: "border-brand-200",
    description: "Set up a revenue workflow that follows up on leads, generates proposals, monitors deals, and recovers at-risk accounts — built around your sales motion.",
    tasks: ["Follow up cold leads", "Generate proposals", "Monitor deal pipeline", "Recover at-risk accounts"],
    stat: { label: "Revenue recovered", value: "$24.8K" },
    mockup: [
      { label: "Lead: Acme Corp",   status: "Followed up", pct: 100 },
      { label: "Proposal #44",      status: "Sent",        pct: 100 },
      { label: "Deal: Nova Inc",    status: "Negotiating", pct: 70  },
      { label: "At-risk: TechFlow", status: "Flagged",     pct: 45  },
      { label: "Renewal: BrightCo", status: "Queued",      pct: 20  },
    ],
    metrics: [{ label: "Revenue recovered", value: "$24.8K" }, { label: "Deals tracked", value: "38" }, { label: "Follow-ups sent", value: "120" }],
  },
  {
    name: "Operations",
    title: "Team & Process Workflow",
    icon: Settings,
    color: "#FF2D42",
    bgFrom: "from-brand-400/8",
    bgTo: "to-brand-500/0",
    border: "border-brand-200",
    description: "Create an operations workflow that coordinates team syncs, maintains SOPs, escalates blockers, and tracks milestones — tailored to how your team actually works.",
    tasks: ["Schedule & coordinate team syncs", "Maintain SOPs automatically", "Escalate blockers in real-time", "Track project milestones"],
    stat: { label: "Tasks automated/wk", value: "220+" },
    mockup: [
      { label: "Sprint Planning",   status: "Scheduled", pct: 100 },
      { label: "SOP Update v3",     status: "Published", pct: 100 },
      { label: "Blocker: API down", status: "Escalated", pct: 100 },
      { label: "Team Sync — Thu",   status: "Booked",    pct: 100 },
      { label: "Milestone Report",  status: "Drafting",  pct: 55  },
    ],
    metrics: [{ label: "Tasks automated/wk", value: "220+" }, { label: "SOPs maintained", value: "14" }, { label: "Blockers resolved", value: "31" }],
  },
];

function AgentPanel({ agent, isActive }: { agent: typeof agents[0]; isActive: boolean }) {
  const Icon = agent.icon;
  return (
    <div className="w-screen shrink-0 flex items-center justify-center px-6 sm:px-14 lg:px-20">
      <div className="w-full max-w-5xl rounded-2xl border border-white/40 bg-white/30 backdrop-blur-lg shadow-2xl overflow-hidden flex" style={{ height: "460px" }}>

        {/* Left — text */}
        <div className="flex flex-col justify-center px-10 py-10" style={{ width: "42%", flexShrink: 0 }}>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-medium mb-5 self-start"
            style={{ background: `${agent.color}14`, color: agent.color, border: `1px solid ${agent.color}28` }}
          >
            <Icon className="w-3.5 h-3.5" />
            {agent.title}
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-3 tracking-tight leading-[1.1]" style={{ fontFamily: "var(--font-fraunces)" }}>
            Build a {agent.name} Workflow
          </h3>
          <p className="text-[#222] text-[14px] leading-relaxed mb-5">{agent.description}</p>
          <ul className="space-y-2 mb-7">
            {agent.tasks.map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-[13px] text-[#111]">
                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: `${agent.color}18` }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: agent.color }} />
                </div>
                {t}
              </li>
            ))}
          </ul>
          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-[13px] text-white transition-all duration-200 group/btn shadow-sm self-start"
            style={{ background: agent.color }}
          >
            Start Building
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Right — dark browser mockup */}
        <div className="flex-1 flex items-stretch p-5 pl-0">
          <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl flex flex-col" style={{ background: "#0f1117" }}>
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 shrink-0" style={{ background: "#1a1d27", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 mx-3">
                <div className="rounded-md px-3 py-1 text-[10px] text-white/35 text-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                  pushable.ai / workflow-builder
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] text-green-400 font-semibold">LIVE</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-5 flex flex-col gap-3 overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${agent.color}22`, border: `1px solid ${agent.color}40` }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: agent.color }} />
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold text-white">{agent.name}</div>
                    <div className="text-[10px] text-white/40">{agent.title}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-green-400" />
                  <span className="text-[10px] text-green-400 mono">live</span>
                </div>
              </div>

              <div className="space-y-2.5 flex-1">
                {agent.mockup.map((m) => (
                  <div key={m.label} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-white/70">{m.label}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded mono"
                        style={{ background: m.pct === 100 ? `${agent.color}25` : "rgba(255,255,255,0.06)", color: m.pct === 100 ? agent.color : "rgba(255,255,255,0.35)" }}>
                        {m.status}
                      </span>
                    </div>
                    <div className="w-full rounded-full h-1" style={{ background: "rgba(255,255,255,0.08)" }}>
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

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/[0.07]">
                {agent.metrics.map((m: { label: string; value: string }) => (
                  <div key={m.label} className="text-center">
                    <div className="text-[14px] font-bold" style={{ color: agent.color }}>{m.value}</div>
                    <div className="text-[9px] text-white/40 leading-tight">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
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
          : "border-black/[0.07] hover:border-brand-200 hover:shadow-sm"
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
        <p className="text-[13px] text-gray-900 leading-relaxed mb-4">{agent.description}</p>
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-medium"
          style={{ background: `${agent.color}10`, color: agent.color, border: `1px solid ${agent.color}22` }}
        >
          <span className="font-bold text-sm">{agent.stat.value}</span>
          <span className="text-gray-800">{agent.stat.label}</span>
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
                    <div className="flex-1 text-gray-900 truncate">{m.label}</div>
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
                  <li key={t} className="flex items-center gap-2 text-[12px] text-gray-800">
                    <div className="w-1 h-1 rounded-full shrink-0" style={{ background: agent.color }} />
                    {t}
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 flex items-center gap-1.5 text-[12px] font-medium transition-colors group/btn"
                style={{ color: agent.color }}
              >
                Start Building
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

  if (isMobile) {
    return (
      <section id="agents" className="pt-2 pb-28 relative bg-transparent">
        <div className="section-line absolute top-0 inset-x-0" />
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
    <section id="agents" className="relative bg-transparent">
      <div className="section-line absolute top-0 inset-x-0" />

      <div ref={outerRef} className="relative overflow-hidden" style={{ height: "100vh" }}>
        {/* Section heading */}
        <div className="absolute top-0 inset-x-0 z-10 flex flex-col items-center pt-10 pointer-events-none">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-3 text-brand-500">Fully Dynamic</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] leading-[1.1] tracking-tight text-center" style={{ fontFamily: "var(--font-fraunces)" }}>
            Build Any Workflow.<br />No Code. Infinite Possibilities.
          </h2>
        </div>

        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-125 rounded-full blur-[120px] transition-colors duration-700"
            style={{ background: `${agents[activePanel]?.color ?? "#E8001D"}06` }}
          />
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
