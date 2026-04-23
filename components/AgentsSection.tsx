"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Users, TrendingUp, Settings, ArrowRight, Sparkles, Activity } from "lucide-react";

const agents = [
  {
    name: "Sara",
    title: "Finance AI",
    icon: DollarSign,
    color: "#6366f1",
    bgFrom: "from-indigo-500/10",
    bgTo: "to-indigo-600/0",
    border: "border-indigo-500/20",
    description: "Handles invoicing, expense tracking, and reporting automatically so finances stay clear, updated, and decision-ready without manual effort.",
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
    title: "HR Manager AI",
    icon: Users,
    color: "#8b5cf6",
    bgFrom: "from-violet-500/10",
    bgTo: "to-violet-600/0",
    border: "border-violet-500/20",
    description: "Manages hiring workflows, onboarding, and employee coordination so teams grow smoothly without delays or repetitive follow-ups.",
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
    title: "Revenue AI",
    icon: TrendingUp,
    color: "#a78bfa",
    bgFrom: "from-purple-500/10",
    bgTo: "to-purple-600/0",
    border: "border-purple-500/20",
    description: "Handles leads, proposals, and follow-ups to ensure no opportunity is missed and revenue keeps moving without manual tracking.",
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
    title: "Operations AI",
    icon: Settings,
    color: "#60a5fa",
    bgFrom: "from-blue-500/10",
    bgTo: "to-blue-600/0",
    border: "border-blue-500/20",
    description: "Manages day-to-day tasks, coordination, and execution so you can focus on strategy instead of managing operations.",
    tasks: ["Schedule & coordinate team syncs", "Maintain SOPs automatically", "Escalate blockers in real-time", "Track project milestones"],
    stat: { label: "Tasks automated/wk", value: "220+" },
    mockup: [
      { label: "Sprint Planning",   status: "Scheduled", pct: 100 },
      { label: "SOP Update v3",     status: "Published", pct: 100 },
      { label: "Blocker: API down", status: "Escalated", pct: 100 },
    ],
  },
];

function AgentCard({ agent, active, onClick }: { agent: typeof agents[0]; active: boolean; onClick: () => void }) {
  const Icon = agent.icon;
  return (
    <motion.div
      layout
      onClick={onClick}
      whileHover={{ y: active ? 0 : -3 }}
      className={`group relative rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden ${
        active
          ? `${agent.border} bg-gradient-to-br ${agent.bgFrom} ${agent.bgTo} shadow-xl`
          : "border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03]"
      }`}
    >
      {/* Glow behind when active */}
      {active && (
        <div
          className="absolute -inset-2 rounded-2xl blur-2xl opacity-20 pointer-events-none"
          style={{ background: agent.color }}
        />
      )}

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: `${agent.color}18`,
              border: `1px solid ${agent.color}30`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color: agent.color }} />
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-green-400" />
            <span className="text-[10px] text-green-400 mono">live</span>
          </div>
        </div>

        <h3 className="text-[15px] font-semibold text-white mb-0.5">{agent.name}</h3>
        <p className="text-[12px] text-slate-500 mb-4" style={{ color: active ? agent.color : undefined }}>
          {agent.title}
        </p>

        <p className="text-[13px] text-slate-400 leading-relaxed mb-4">{agent.description}</p>

        {/* Stat */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-medium"
          style={{ background: `${agent.color}12`, color: agent.color, border: `1px solid ${agent.color}20` }}
        >
          <span className="font-bold text-sm">{agent.stat.value}</span>
          <span className="text-slate-500">{agent.stat.label}</span>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              {/* Task mini-mockup */}
              <div className="mt-4 rounded-xl bg-black/30 border border-white/[0.05] p-3 space-y-2">
                {agent.mockup.map((m) => (
                  <div key={m.label} className="flex items-center gap-2 text-[11px]">
                    <div className="flex-1 text-slate-400 truncate">{m.label}</div>
                    <div
                      className="text-[10px] px-1.5 py-0.5 rounded mono"
                      style={{
                        background: m.pct === 100 ? `${agent.color}15` : "rgba(255,255,255,0.04)",
                        color: m.pct === 100 ? agent.color : "#64748b",
                      }}
                    >
                      {m.status}
                    </div>
                    <div className="w-12 bg-white/5 rounded-full h-1 shrink-0">
                      <div
                        className="h-1 rounded-full transition-all duration-700"
                        style={{ width: `${m.pct}%`, background: agent.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Capabilities */}
              <ul className="mt-3 space-y-1.5">
                {agent.tasks.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-[12px] text-slate-500">
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

  return (
    <section id="agents" className="py-28 relative">
      <div className="section-line absolute top-0 inset-x-0" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-600/[0.04] rounded-full blur-[120px]" />
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
            <Sparkles className="w-3 h-3" />
            AI Agents
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
            Your AI Agents, Each Built
            <br />
            <span className="gradient-text">for a Specific Role</span>
          </h2>
          <p className="text-slate-400 text-[16px] max-w-xl mx-auto leading-relaxed">
            Four specialists running in parallel. Finance, HR, Revenue, and Operations — all autonomous, always on.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/30 text-[13px] font-medium text-indigo-300 hover:text-indigo-200 transition-all duration-200 group"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Deploy your agent today
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
