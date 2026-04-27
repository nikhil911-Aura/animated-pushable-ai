"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight, BarChart3, Users, TrendingUp, Settings,
  Activity, CheckCircle2, Zap,
} from "lucide-react";

/* ── Design tokens ─────────────────────────────────────── */
const T = {
  bg:       "#ffffff",
  fg:       "hsl(210,14%,17%)",
  soft:     "hsl(0,0%,98%)",
  muted:    "hsl(0,0%,96%)",
  mutedFg:  "hsl(184,5%,55%)",
  accent:   "hsl(239,84%,67%)",
  red:      "#E8001D",           // brand red from landing page
  border:   "hsl(0,0%,90%)",
  shadow:   "0 25px 80px -12px rgba(0,0,0,0.08),0 0 0 1px rgba(0,0,0,0.06)",
};

const VIDEO   = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4";
const DISPLAY = "var(--font-fraunces), Georgia, serif";
const BODY    = "var(--font-geist-sans), system-ui, sans-serif";

/* ─────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────── */
/* ─────────────────────────────────────────────────────────
   DASHBOARD PREVIEW
───────────────────────────────────────────────────────── */
const dashAgents = [
  { icon: BarChart3,  label: "Finance", stat: "$2.4K saved", pct: 78, color: T.red            },
  { icon: Users,      label: "HR",      stat: "18 hired",    pct: 92, color: "#10b981"        },
  { icon: TrendingUp, label: "Sales",   stat: "$24K rev.",   pct: 65, color: "#f59e0b"        },
  { icon: Settings,   label: "Ops",     stat: "220 tasks",   pct: 85, color: T.accent         },
];

const activityFeed = [
  { msg: "Invoice #1042 processed and sent to Acme Corp",           time: "2s ago",  color: T.red     },
  { msg: "3 candidates screened and ranked for Design Lead role",   time: "14s ago", color: "#10b981" },
  { msg: "Follow-up email sent to 12 pipeline leads automatically", time: "1m ago",  color: "#f59e0b" },
];

function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-8 w-full max-w-3xl mx-auto"
      style={{ fontFamily: BODY }}
    >
      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.97)", border: `1px solid ${T.border}`, boxShadow: T.shadow }}>
        <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${T.border}` }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[11px] font-semibold" style={{ color: T.fg }}>Pushable AI — Live Operations</span>
          </div>
          <div className="flex items-center gap-1.5">
            {["Finance", "HR", "Sales", "Ops"].map((a) => (
              <span key={a} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${T.red}12`, color: T.red }}>{a}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 px-4 pt-4">
          {dashAgents.map(({ icon: Icon, label, stat, pct, color }) => (
            <div key={label} className="rounded-xl p-3" style={{ background: `${color}08`, border: `1px solid ${color}20` }}>
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: `${color}18` }}>
                  <Icon className="w-3 h-3" style={{ color }} />
                </div>
                <Activity className="w-3 h-3 text-green-500" />
              </div>
              <div className="text-[10px] font-semibold mb-0.5" style={{ color: T.fg }}>{label} Agent</div>
              <div className="text-[9px] mb-2" style={{ color: T.mutedFg }}>{stat}</div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: `${color}20` }}>
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: pct / 100 }} transition={{ delay: 0.9, duration: 1.1, ease: "easeOut" }} className="h-1 rounded-full origin-left" style={{ background: color }} />
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-3">
          <div className="text-[10px] font-semibold mb-2" style={{ color: T.mutedFg }}>Recent Activity</div>
          <div className="space-y-2">
            {activityFeed.map((a, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: a.color }} />
                <span className="text-[10px] flex-1 leading-snug" style={{ color: T.fg }}>{a.msg}</span>
                <span className="text-[9px] shrink-0" style={{ color: T.mutedFg }}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <div className="flex-1 relative flex flex-col justify-center items-center overflow-hidden px-6 text-center">
      <video src={VIDEO} autoPlay muted playsInline loop className="absolute inset-0 w-full h-full object-cover z-0" aria-hidden="true" />
      <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,1) 100%)" }} />
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm mb-6" style={{ borderColor: T.border, background: T.bg, color: T.mutedFg, fontFamily: BODY }}>
          👉 AI Agents for Every Business Function ✨
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.75, ease: [0.16, 1, 0.3, 1] }} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.06] mb-5" style={{ color: T.fg, fontFamily: DISPLAY }}>
          Your <span style={{ color: T.red }}>AI Agents</span>,<br />Built for Every Role
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.65 }} className="text-[16px] leading-relaxed max-w-xl mx-auto mb-8" style={{ color: T.mutedFg, fontFamily: BODY }}>
          Automate finance, HR, sales, and operations with intelligent agents that work in the background—reducing manual effort, eliminating errors, and letting your team focus on strategic growth.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.6 }} className="flex items-center gap-3 mb-8" style={{ fontFamily: BODY }}>
          <button className="px-6 py-3 rounded-full text-[14px] font-semibold transition-all duration-200 hover:opacity-90 active:scale-95 flex items-center gap-2" style={{ background: T.red, color: "#fff" }}>
            Book a demo <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
        <DashboardPreview />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   AGENTS GRID
───────────────────────────────────────────────────────── */
const agents = [
  { icon: BarChart3,  title: "Finance Agent",    headline: "Automate Your Finance Operations",       desc: "Handle transactions, balances, and reporting automatically. Reduce errors and gain real-time financial visibility.",    color: T.red,    features: ["Invoice generation & dispatch", "Real-time expense tracking", "Automated P&L reports", "Anomaly detection"] },
  { icon: Users,      title: "HR Agent",         headline: "Agent That Simplifies Your HR Workflow", desc: "Automate recruitment, onboarding, and employee management end-to-end.",                                                color: "#10b981", features: ["Candidate screening & ranking", "Onboarding automation", "Interview scheduling", "Milestone tracking"] },
  { icon: TrendingUp, title: "Sales Agent",      headline: "Automate Your Sales Pipeline with AI",   desc: "Capture, nurture, and convert leads automatically while improving conversion rates.",                                 color: "#f59e0b", features: ["Lead follow-up sequences", "Proposal generation", "Pipeline monitoring", "At-risk account recovery"] },
  { icon: Settings,   title: "Operations Agent", headline: "Automate Your Daily Business Workflows", desc: "Acts as your operations backbone—managing workflows so you can focus on growth.",                                    color: T.accent,  features: ["Team sync coordination", "SOP maintenance", "Real-time escalation", "Project milestone tracking"] },
];

function AgentsGrid() {
  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-20" style={{ background: T.bg, fontFamily: BODY }}>
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }} className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-semibold mb-5" style={{ background: `${T.red}10`, color: T.red, border: `1px solid ${T.red}25` }}>
            <Zap className="w-3 h-3" /> AI Agents
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-4" style={{ color: T.fg, fontFamily: DISPLAY }}>
            Your <span style={{ color: T.red }}>AI Agents</span>, Each Built<br />for a Specific Role
          </h2>
          <p className="text-[16px] max-w-xl mx-auto" style={{ color: T.mutedFg }}>
            From finance to operations, every part of your business runs on specialized AI agents that automate workflows, reduce manual effort, and drive better outcomes.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {agents.map((agent, i) => {
            const Icon = agent.icon;
            return (
              <motion.div
                key={agent.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-2xl border p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={{ borderColor: T.border, background: T.bg }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = agent.color; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${agent.color}18`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = T.border; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${agent.color}12`, border: `1px solid ${agent.color}25` }}>
                  <Icon className="w-5 h-5" style={{ color: agent.color }} />
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: agent.color }}>{agent.title}</div>
                <h3 className="text-[18px] font-bold mb-2 leading-snug" style={{ color: T.fg, fontFamily: DISPLAY }}>{agent.headline}</h3>
                <p className="text-[13px] leading-relaxed mb-5" style={{ color: T.mutedFg }}>{agent.desc}</p>
                <ul className="space-y-2">
                  {agent.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[13px]" style={{ color: T.fg }}>
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: agent.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-14">
          <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[14px] font-semibold transition-all duration-200 hover:opacity-85 active:scale-95" style={{ background: T.red, color: "#fff" }}>
            Explore All Agents <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="w-full py-28 px-6 md:px-12 lg:px-20 relative overflow-hidden" style={{ background: T.fg, fontFamily: BODY }}>
      {/* Red glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full pointer-events-none" style={{ background: `radial-gradient(ellipse, ${T.red}22 0%, transparent 70%)` }} />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-semibold mb-6" style={{ background: `${T.red}25`, color: T.red, border: `1px solid ${T.red}40` }}>
            <Zap className="w-3 h-3 fill-current" /> Start Today
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.06] mb-6" style={{ color: "#ffffff", fontFamily: DISPLAY }}>
            Ready to Take Your<br /><span style={{ color: T.red }}>Business Forward?</span>
          </h2>

          <p className="text-[17px] leading-relaxed max-w-xl mx-auto mb-10" style={{ color: "rgba(255,255,255,0.55)" }}>
            Join 2,000+ businesses already running smarter with Pushable AI. Deploy your first agent today — no technical setup, no contracts, no wasted time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-[15px] font-semibold transition-all duration-200 hover:opacity-90 active:scale-95" style={{ background: T.red, color: "#fff" }}>
              Activate Your AI Agent <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[15px] font-semibold transition-all duration-200" style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}>
              Talk to the Team
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }}>
            {["14-day free trial", "No credit card required", "Cancel anytime", "Setup in < 10 min"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full" style={{ background: T.red, display: "inline-block" }} />
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────── */
export default function ProductPage() {
  return (
    <div style={{ background: T.bg }}>
      {/* 100vh locked hero */}
      <Navbar />
      <div className="flex flex-col overflow-hidden" style={{ height: "100vh", background: T.bg }}>
        <HeroSection />
      </div>

      {/* Extended sections */}
      <AgentsGrid />
      <FinalCTA />
      <Footer />
    </div>
  );
}
