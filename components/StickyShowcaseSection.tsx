"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Zap, MessageSquare, Plug, Activity, BarChart3 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ── Slide data ─────────────────────────────────────────────── */
const slides = [
  {
    step: "01", tag: "Describe", color: "#E8001D",
    title: "Start with a conversation,\nnot a spec.",
    description: "Tell Pushable AI what you want to automate in plain English. No flowcharts, no forms, no developers needed. Your AI agent is configured and ready to deploy in minutes.",
    bullets: ["Natural language setup", "No technical knowledge required", "Live in under 10 minutes"],
    image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=900&auto=format&fit=crop&q=80",
    badge: { icon: MessageSquare, label: "Agent Builder", sub: "Describing workflow…" },
    stat: { value: "< 10 min", label: "to go live" },
  },
  {
    step: "02", tag: "Connect", color: "#10b981",
    title: "Connect your tools\nin one click.",
    description: "Link Gmail, Slack, HubSpot, Stripe and 50+ more tools instantly. Your agent learns your existing workflow automatically — no APIs, no code, no configuration.",
    bullets: ["50+ one-click integrations", "Auto-detects your workflow", "Zero API setup"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&auto=format&fit=crop&q=80",
    badge: { icon: Plug, label: "Integrations", sub: "3 tools connected" },
    stat: { value: "50+", label: "integrations" },
  },
  {
    step: "03", tag: "Execute", color: "#f59e0b",
    title: "Watch every task run\nin real time.",
    description: "Your AI agents work around the clock — processing invoices, screening candidates, following up on leads — all tracked live on a clean dashboard you can share with your team.",
    bullets: ["24/7 autonomous execution", "Full audit trail of every action", "Live task feed"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&auto=format&fit=crop&q=80",
    badge: { icon: Activity, label: "Live Dashboard", sub: "340 tasks completed" },
    stat: { value: "340+", label: "tasks today" },
  },
  {
    step: "04", tag: "Scale", color: "#8b5cf6",
    title: "Scale across every\npart of your business.",
    description: "Add more agents, expand workflows, or connect new teams — all from one dashboard. Your AI infrastructure grows exactly as fast as your business needs it to.",
    bullets: ["Multi-agent coordination", "Cross-team workflows", "Performance analytics"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80",
    badge: { icon: BarChart3, label: "Analytics", sub: "$24.8K saved this month" },
    stat: { value: "$24.8K", label: "revenue saved" },
  },
];

/* ── Image mockup card ───────────────────────────────────────── */
function MockupCard({ slide }: { slide: typeof slides[0] }) {
  const Icon = slide.badge.icon;
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "1.5rem", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4)" }}>
      {/* Unsplash image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slide.image}
        alt={slide.tag}
        className="w-full h-full object-cover"
      />

      {/* Dark gradient overlay at bottom */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.55) 100%)" }} />

      {/* Top bar — macOS-style chrome */}
      <div className="absolute top-0 inset-x-0 flex items-center gap-2 px-4 py-3" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/90" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/90" />
          <div className="w-3 h-3 rounded-full bg-green-400/90" />
        </div>
        <span className="text-[11px] text-white/80 font-medium mx-auto">Pushable AI — {slide.badge.label}</span>
      </div>

      {/* Live badge — top right */}
      <div className="absolute top-12 right-4 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}>
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="text-[10px] text-white font-semibold">LIVE</span>
      </div>

      {/* Bottom overlay — stat + badge */}
      <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between">
        {/* Left — feature badge */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.45)" }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: slide.color }}>
            <Icon className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-white">{slide.badge.label}</div>
            <div className="text-[10px] text-white/65">{slide.badge.sub}</div>
          </div>
        </div>

        {/* Right — key stat */}
        <div className="text-right px-3.5 py-2.5 rounded-2xl" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.15)" }}>
          <div className="text-[22px] font-bold text-white leading-none" style={{ fontFamily: "var(--font-fraunces)" }}>{slide.stat.value}</div>
          <div className="text-[10px] text-white/60 mt-0.5">{slide.stat.label}</div>
        </div>
      </div>
    </div>
  );
}

/* ── Main section ────────────────────────────────────────────── */
export default function StickyShowcaseSection() {
  const [active, setActive] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollingRef = useRef(false);
  const scrollResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-advance every 4s when not scrolling
  useEffect(() => {
    const advance = () => {
      if (!scrollingRef.current) {
        setActive((prev) => (prev + 1) % slides.length);
      }
      autoTimerRef.current = setTimeout(advance, 4000);
    };
    autoTimerRef.current = setTimeout(advance, 4000);
    return () => { if (autoTimerRef.current) clearTimeout(autoTimerRef.current); };
  }, []);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scrollLen = window.innerHeight * (slides.length - 1) * 1.2;

    const trigger = ScrollTrigger.create({
      trigger: outer,
      start: "top top",
      end: `+=${scrollLen}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        scrollingRef.current = true;
        if (scrollResetRef.current) clearTimeout(scrollResetRef.current);
        scrollResetRef.current = setTimeout(() => { scrollingRef.current = false; }, 800);
        const idx = Math.min(slides.length - 1, Math.floor(self.progress * slides.length));
        setActive(idx);
      },
    });

    return () => { trigger.kill(); };
  }, []);

  const slide = slides[active];

  const PANEL_H = "48vh";

  return (
    <section ref={outerRef} className="relative bg-transparent">
      {/* Section heading — pinned at top */}
      <div className="absolute top-0 inset-x-0 z-10 flex flex-col items-center pt-10 pointer-events-none">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: slides[active]?.color ?? "#E8001D" }}>How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] leading-[1.1] tracking-tight" style={{ fontFamily: "var(--font-fraunces)" }}>
            From Idea to Automation,<br />in Four Simple Steps
          </h2>
        </div>
      </div>
      <div style={{ display: "flex", height: "100vh", width: "100%", padding: "26vh 3rem", gap: "1.5rem", boxSizing: "border-box", justifyContent: "center" }}>

        {/* Left — frosted text panel */}
        <div style={{ width: "44%", height: PANEL_H, flexShrink: 0 }}>
          <div style={{ height: "100%", background: "rgba(255,255,255,0.55)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.45)", boxShadow: "0 8px 40px rgba(0,0,0,0.12)", borderRadius: "1.5rem", padding: "1.75rem", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Step tag */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-[12px] font-bold mono" style={{ color: slide.color }}>{slide.step}</span>
                  <div className="h-px w-10" style={{ background: slide.color }} />
                  <span className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: slide.color }}>{slide.tag}</span>
                </div>

                {/* Heading */}
                <h2 className="text-4xl sm:text-5xl font-bold text-[#111111] mb-4 leading-[1.1]" style={{ fontFamily: "var(--font-fraunces)", whiteSpace: "pre-line" }}>
                  {slide.title}
                </h2>

                {/* Description */}
                <p className="text-gray-800 text-[14px] leading-relaxed mb-5">
                  {slide.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-3 mb-7">
                  {slide.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-[13px] text-gray-900 font-medium">
                      <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: slide.color }} />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Progress dots */}
                <div className="flex items-center gap-2">
                  {slides.map((_, i) => (
                    <div key={i} className="h-1.5 rounded-full transition-all duration-500"
                      style={{ width: i === active ? 36 : 9, background: i === active ? slide.color : "rgba(0,0,0,0.18)" }} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right — image mockup */}
        <div style={{ width: "44%", flexShrink: 0, height: PANEL_H }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              style={{ width: "100%", height: "100%" }}
              initial={{ opacity: 0, x: 30, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <MockupCard slide={slide} />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
