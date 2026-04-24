"use client";

import { Anton, Condiment } from "next/font/google";
import { ChevronRight, Zap, Search, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useCallback, useState } from "react";
import Navbar              from "@/components/Navbar";
import TrustSection        from "@/components/TrustSection";
import AgentsSection       from "@/components/AgentsSection";
import HowItWorksSection   from "@/components/HowItWorksSection";
import DemoSection         from "@/components/DemoSection";
import IndustrySection     from "@/components/IndustrySection";
import PricingSection      from "@/components/PricingSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import WhyTrustSection     from "@/components/WhyTrustSection";
import FinalCTASection     from "@/components/FinalCTASection";
import FAQSection          from "@/components/FAQSection";
import Footer              from "@/components/Footer";
import { SignatureTile }   from "@/components/animation";

/* ── Fonts ──────────────────────────────────────────────────── */
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-orbis-anton" });
const condiment = Condiment({ weight: "400", subsets: ["latin"], variable: "--font-orbis-condiment" });

/* ── Design tokens ──────────────────────────────────────────── */
const CREAM = "#EFF4FF";
const NEON  = "#E8001D";
const RED   = "#E8001D";

/* ── Video URLs ─────────────────────────────────────────────── */
const V = {
  cinHero: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4",
  c1: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4",
  c2: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4",
  c3: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4",
};

const CARDS = [
  { src: V.c1, score: "8.7/10", name: "NOVA",  role: "Workflow Agent" },
  { src: V.c2, score: "9/10",   name: "ORION", role: "Research Agent" },
  { src: V.c3, score: "8.2/10", name: "LYRA",  role: "Outreach Agent" },
];

const BOT_DETAILS = [
  {
    badge: "Workflow Automation",
    icon: <Zap size={11} />,
    description: "NOVA handles your workflow automation end-to-end — routing tasks, syncing tools, and managing deadlines so operations run on autopilot.",
    stat: "2.4k+", statLabel: "Tasks/mo",
    features: ["Automate multi-step workflows", "Route tasks between tools", "Track deadlines in real-time"],
    live: [
      { label: "CRM Sync",        status: "Running", accent: false },
      { label: "Report Pipeline", status: "Done",    accent: true  },
      { label: "Data Export",     status: "Queued",  accent: false },
    ],
  },
  {
    badge: "Research Intelligence",
    icon: <Search size={11} />,
    description: "ORION dives into data and documents — surfacing insights, summarizing research, and delivering briefings on demand.",
    stat: "500+", statLabel: "Reports/mo",
    features: ["Deep market research", "Document summarization", "Competitive analysis"],
    live: [
      { label: "Market Analysis",  status: "Running", accent: false },
      { label: "Competitor Brief", status: "Sent",    accent: true  },
      { label: "Industry Scan",    status: "Drafting",accent: false },
    ],
  },
  {
    badge: "Outreach & Comms",
    icon: <Mail size={11} />,
    description: "LYRA manages your outreach pipeline — personalizing messages, scheduling follow-ups, and tracking responses at scale.",
    stat: "1.2k+", statLabel: "Emails/mo",
    features: ["Personalize outreach at scale", "Schedule follow-up sequences", "Track open & reply rates"],
    live: [
      { label: "Campaign #42",    status: "Sent",    accent: true  },
      { label: "Follow-up Seq.", status: "Running", accent: false },
      { label: "Lead Digest",    status: "Drafting",accent: false },
    ],
  },
];

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*!?";

function ScrambleLine({
  text, style, animateIn, delay = 0, index = 0,
}: {
  text: string;
  style?: React.CSSProperties;
  animateIn: boolean;
  delay?: number;
  index?: number;
}) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scramble = useCallback(() => {
    let iter = 0;
    const total = text.replace(/ /g, "").length * 4;
    function tick() {
      setDisplay(
        text.split("").map((ch, i) => {
          if (ch === " ") return " ";
          if (i < Math.floor(iter / 4)) return ch;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }).join("")
      );
      iter++;
      if (iter <= total) rafRef.current = setTimeout(tick, 28);
      else setDisplay(text);
    }
    if (rafRef.current) clearTimeout(rafRef.current);
    tick();
  }, [text]);

  return (
    <div style={{ overflow: "hidden", lineHeight: 1.05 }}>
      <motion.div
        style={{ ...style, cursor: "default", display: "block" }}
        initial={{ y: "105%", skewY: 4, opacity: 0 }}
        animate={animateIn ? { y: "0%", skewY: 0, opacity: 1 } : { y: "105%", skewY: 4, opacity: 0 }}
        whileHover={{ x: 14, color: NEON, transition: { type: "spring", stiffness: 300, damping: 18 } }}
        transition={{ delay: index * 0.14, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => scramble()}
        onMouseLeave={() => { if (rafRef.current) clearTimeout(rafRef.current); setDisplay(text); }}
      >
        {display}
      </motion.div>
    </div>
  );
}

/* ── 3D Tilt + Flip card ────────────────────────────────────── */
function BotCard({
  card,
  detail,
  index,
}: {
  card: { src: string; score: string; name: string; role: string };
  detail: typeof BOT_DETAILS[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt]       = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const [hovered, setHovered] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || flipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (0.5 - y) * 18, ry: (x - 0.5) * 18, gx: x * 100, gy: y * 100 });
  }, [flipped]);

  const entrances = [
    { x: -60, y: 30, rotate: -6 },
    { x: 0,   y: 80, rotate: 0  },
    { x: 60,  y: 30, rotate: 6  },
  ];
  const ent = entrances[index] ?? { x: 0, y: 50, rotate: 0 };

  return (
    <motion.div
      initial={{ opacity: 0, x: ent.x, y: ent.y, rotate: ent.rotate }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.16, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: "900px" }}
    >
      <motion.div
        ref={cardRef}
        className="rounded-[32px] cursor-pointer"
        style={{
          padding: 18,
          background: "rgba(0,0,0,0.04)",
          border: "1px solid rgba(0,0,0,0.08)",
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: flipped ? 0 : tilt.rx,
          rotateY: flipped ? 180 : tilt.ry,
          scale: !flipped && hovered ? 1.03 : 1,
          boxShadow: !flipped && hovered
            ? "0 32px 64px rgba(0,0,0,0.18), 0 0 40px rgba(232,0,29,0.14)"
            : "0 2px 12px rgba(0,0,0,0.06)",
        }}
        transition={
          flipped
            ? { rotateY: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }, rotateX: { duration: 0.3 }, scale: { duration: 0.3 } }
            : { type: "spring", stiffness: 280, damping: 24, mass: 0.5 }
        }
        onClick={() => { setFlipped(f => !f); setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 }); }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => !flipped && setHovered(true)}
        onMouseLeave={() => { setHovered(false); setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 }); }}
      >
        {/* Aspect-ratio container */}
        <div style={{ position: "relative", paddingBottom: "100%", transformStyle: "preserve-3d" }}>

          {/* ══ FRONT FACE ══ */}
          <div
            className="absolute inset-0 rounded-[24px] overflow-hidden"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            <motion.div
              className="absolute inset-[-4%]"
              animate={{ x: -tilt.ry * 1.2, y: tilt.rx * 1.2, scale: hovered ? 1.06 : 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.4 }}
            >
              <video src={card.src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            </motion.div>

            {/* Cursor glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ borderRadius: "24px" }}
              animate={{
                opacity: hovered ? 1 : 0,
                background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(232,0,29,0.28) 0%, transparent 55%)`,
              }}
              transition={{ duration: 0.08 }}
            />
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-[24px]"
              animate={{ boxShadow: hovered ? "inset 0 0 0 1.5px rgba(232,0,29,0.4)" : "inset 0 0 0 0px rgba(232,0,29,0)" }}
              transition={{ duration: 0.2 }}
            />

            {/* Name badge */}
            <div className="absolute left-3 top-3 liquid-glass rounded-[14px] px-4 py-2" style={{ zIndex: 10 }}>
              <div style={{ fontSize: 15, color: CREAM, fontFamily: "var(--font-orbis-anton)", letterSpacing: "0.06em" }}>{card.name}</div>
              <div style={{ fontSize: 10, color: "rgba(239,244,255,0.6)", fontFamily: "monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 1 }}>{card.role}</div>
            </div>

            {/* Tap hint */}
            <div className="absolute right-4 top-4 pointer-events-none" style={{ zIndex: 10 }}>
              <div style={{ fontSize: 8, color: "rgba(239,244,255,0.45)", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center", lineHeight: 1.4 }}>
                tap<br/>reveal
              </div>
            </div>

            {/* Score bar */}
            <div className="absolute left-3 right-3 bottom-3 liquid-glass rounded-[20px] flex items-center justify-between px-5 py-4" style={{ zIndex: 10 }}>
              <div>
                <div className="uppercase" style={{ fontSize: 11, color: "rgba(239,244,255,0.7)", fontFamily: "monospace", letterSpacing: "0.04em" }}>RARITY SCORE:</div>
                <div style={{ fontSize: 16, color: CREAM, fontFamily: "var(--font-orbis-anton)", marginTop: 2 }}>{card.score}</div>
              </div>
              <button
                className="rounded-full flex items-center justify-center flex-shrink-0"
                style={{ width: 48, height: 48, background: "linear-gradient(135deg, #b724ff 0%, #7c3aed 100%)", boxShadow: "0 8px 24px rgba(167,139,250,0.5)" }}
              >
                <ChevronRight size={20} color="white" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* ══ BACK FACE ══ */}
          <div
            className="absolute inset-0 rounded-[24px] overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "#ffffff",
              padding: "20px",
            }}
          >
            <div className="h-full flex flex-col gap-2.5">

              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1" style={{ background: "rgba(232,0,29,0.07)", border: "1px solid rgba(232,0,29,0.18)" }}>
                <span style={{ color: "#E8001D" }}>{detail.icon}</span>
                <span style={{ fontSize: 9, color: "#E8001D", fontFamily: "var(--font-inter)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{detail.badge}</span>
              </div>

              {/* Meet name */}
              <div style={{ lineHeight: 1 }}>
                <div style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "#999", marginBottom: 2 }}>Meet</div>
                <div style={{ fontFamily: "var(--font-orbis-anton)", fontSize: "clamp(26px,3.5vw,36px)", color: "#E8001D", lineHeight: 1, letterSpacing: "0.01em" }}>{card.name}</div>
              </div>

              {/* Description */}
              <p style={{ fontFamily: "var(--font-inter)", fontSize: 10, color: "#555", lineHeight: 1.55 }}>{detail.description}</p>

              {/* Stat */}
              <div className="inline-flex items-baseline gap-1.5 self-start rounded-full px-3 py-1" style={{ background: "rgba(232,0,29,0.06)", border: "1px solid rgba(232,0,29,0.13)" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "#E8001D", fontWeight: 700 }}>{detail.stat}</span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: 9, color: "#E8001D" }}>{detail.statLabel}</span>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-1">
                {detail.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#E8001D", flexShrink: 0, display: "inline-block" }} />
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: 10, color: "#333" }}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Live status mini-card */}
              <div className="flex-1 rounded-[12px] overflow-hidden" style={{ background: "#f7f7f7", border: "1px solid rgba(0,0,0,0.06)", padding: "10px 12px", minHeight: 0 }}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div style={{ fontFamily: "var(--font-inter)", fontSize: 10, fontWeight: 600, color: "#111" }}>{card.name}</div>
                    <div style={{ fontFamily: "var(--font-inter)", fontSize: 9, color: "#999" }}>{card.role}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: 9, color: "#22c55e", fontStyle: "italic" }}>live</span>
                  </div>
                </div>
                {detail.live.map((item, i) => (
                  <div key={i} className="mb-1.5">
                    <div className="flex items-center justify-between">
                      <span style={{ fontFamily: "var(--font-inter)", fontSize: 9, color: "#444" }}>{item.label}</span>
                      <span style={{ fontFamily: "var(--font-inter)", fontSize: 9, fontWeight: item.accent ? 600 : 400, color: item.accent ? "#E8001D" : "#888" }}>{item.status}</span>
                    </div>
                    <div style={{ height: 2, background: "#e5e5e5", borderRadius: 1, marginTop: 3 }}>
                      <div style={{ height: "100%", width: item.accent ? "88%" : "52%", background: "#E8001D", borderRadius: 1 }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Deploy button */}
              <button
                className="rounded-full w-full flex items-center justify-center gap-1.5"
                style={{ background: "#E8001D", color: "#fff", border: "none", padding: "10px", fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                Deploy {card.name} <ChevronRight size={13} />
              </button>
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
export default function Home() {
  const AF = "var(--font-orbis-anton)";
  const CF = "var(--font-orbis-condiment)";

  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroRafRef   = useRef<number>(0);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    const FADE = 0.5;

    function tick() {
      if (!video || isNaN(video.duration)) {
        heroRafRef.current = requestAnimationFrame(tick);
        return;
      }
      const t = video.currentTime;
      const d = video.duration;
      const o = t < FADE ? t / FADE : t > d - FADE ? (d - t) / FADE : 1;
      video.style.opacity = String(Math.max(0, Math.min(1, o)));
      heroRafRef.current = requestAnimationFrame(tick);
    }

    const onEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => { video.currentTime = 0; video.play().catch(() => {}); }, 100);
    };

    video.addEventListener("ended", onEnded);
    heroRafRef.current = requestAnimationFrame(tick);
    return () => {
      video.removeEventListener("ended", onEnded);
      cancelAnimationFrame(heroRafRef.current);
    };
  }, []);

  return (
    <div className={`${anton.variable} ${condiment.variable} overflow-x-hidden`}>

      <Navbar />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden rounded-b-[32px]">

        {/* Full-screen cinematic video with fade-in/out loop */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={heroVideoRef}
            src={V.cinHero}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ opacity: 0 }}
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(1,8,40,0.45)" }} />

        <div
          className="relative z-10 max-w-[1831px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col"
          style={{ minHeight: "100vh" }}
        >
          <div className="flex-1 flex flex-col justify-end pb-16 lg:pb-24 pt-10">
            <div className="relative max-w-[780px] lg:ml-32">

              {/* Cursive accent */}
              <motion.span
                className="select-none absolute"
                initial={{ opacity: 0, rotate: -20, scale: 0.5, x: 40, y: -20 }}
                animate={ready ? { opacity: 1, rotate: -3, scale: 1, x: 0, y: 0 } : { opacity: 0, rotate: -20, scale: 0.5, x: 40, y: -20 }}
                whileHover={{ scale: 1.12, rotate: 2, y: -6, transition: { type: "spring", stiffness: 200, damping: 12 } }}
                transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 120, damping: 14 }}
                style={{
                  fontFamily: CF,
                  color: NEON,
                  fontSize: "clamp(24px,3.5vw,48px)",
                  right: 0,
                  top: "18%",
                  mixBlendMode: "exclusion",
                  lineHeight: 1.1,
                  display: "inline-block",
                  cursor: "default",
                }}
              >
                AI automation
              </motion.span>

              {/* Main heading with scramble on hover */}
              <h1
                className="uppercase"
                style={{ fontFamily: AF, fontSize: "clamp(40px,7vw,90px)", color: CREAM, lineHeight: 1.0 }}
              >
                {["AI Assistant", "That Automates", "Your Routine", "Workflows"].map((line, i) => (
                  <ScrambleLine
                    key={i}
                    text={line}
                    index={i}
                    animateIn={ready}
                    style={{ fontFamily: AF, fontSize: "clamp(40px,7vw,90px)", color: CREAM }}
                  />
                ))}
              </h1>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          AGENTS GRID
      ════════════════════════════════════════ */}
      <section style={{ background: "#ffffff" }} className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1831px] mx-auto px-4 sm:px-8 lg:px-12">

          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-10 mb-12">
            <div>
              <div style={{ overflow: "hidden" }}>
                <motion.div
                  className="uppercase leading-none"
                  style={{ fontFamily: AF, fontSize: "clamp(32px,5.5vw,60px)", color: "#111111", cursor: "default" }}
                  initial={{ y: "105%", skewY: 4, opacity: 0 }}
                  whileInView={{ y: "0%", skewY: 0, opacity: 1 }}
                  whileHover={{ x: 12, color: NEON, transition: { type: "spring", stiffness: 300, damping: 18 } }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                  Collection of
                </motion.div>
              </div>
              <div className="flex items-baseline gap-1 leading-none mt-1 ml-12 md:ml-24 lg:ml-32">
                <motion.span
                  style={{ fontFamily: CF, fontSize: "clamp(36px,6vw,70px)", color: NEON, lineHeight: 1, display: "inline-block", cursor: "default" }}
                  initial={{ opacity: 0, rotate: -10, scale: 0.82 }}
                  whileInView={{ opacity: 1, rotate: -1, scale: 1 }}
                  whileHover={{ scale: 1.1, rotate: 3, y: -4, transition: { type: "spring", stiffness: 220, damping: 12 } }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                >
                  Intelligent{" "}
                </motion.span>
                <div style={{ overflow: "hidden", display: "inline-block" }}>
                  <motion.span
                    className="uppercase"
                    style={{ fontFamily: AF, fontSize: "clamp(32px,5.5vw,60px)", color: "#111111", lineHeight: 1, display: "inline-block", cursor: "default" }}
                    initial={{ y: "105%", skewY: 4, opacity: 0 }}
                    whileInView={{ y: "0%", skewY: 0, opacity: 1 }}
                    whileHover={{ x: 10, color: NEON, transition: { type: "spring", stiffness: 300, damping: 18 } }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Agents
                  </motion.span>
                </div>
              </div>
            </div>

            <motion.div
              className="cursor-pointer select-none flex-shrink-0 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ x: -10, transition: { type: "spring", stiffness: 260, damping: 18 } }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-baseline gap-3">
                <motion.span
                  className="uppercase"
                  style={{ fontFamily: AF, fontSize: "clamp(32px,5.5vw,60px)", color: "#111111", display: "inline-block" }}
                  whileHover={{ color: NEON, scale: 1.04, transition: { type: "spring", stiffness: 300, damping: 16 } }}
                >
                  DEPLOY
                </motion.span>
                <div className="flex flex-col uppercase" style={{ fontFamily: AF, fontSize: "clamp(20px,3vw,36px)", color: "#111111", lineHeight: 1.05 }}>
                  <motion.span whileHover={{ color: NEON, x: 4, transition: { type: "spring", stiffness: 300, damping: 16 } }}>YOUR</motion.span>
                  <motion.span whileHover={{ color: NEON, x: 4, transition: { type: "spring", stiffness: 300, damping: 16 } }}>AGENT</motion.span>
                </div>
              </div>
              <motion.div
                className="mt-2 w-full"
                style={{ background: RED, height: "clamp(6px,0.7vw,10px)", borderRadius: 3 }}
                whileHover={{ scaleX: 1.06, originX: 1, transition: { type: "spring", stiffness: 300, damping: 18 } }}
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CARDS.map((card, i) => (
              <BotCard key={i} card={card} detail={BOT_DETAILS[i]} index={i} />
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          ORIGINAL SECTIONS
      ════════════════════════════════════════ */}
      <div style={{ background: "#010828" }}>
        <TrustSection />
        <AgentsSection />
        <HowItWorksSection />
        <DemoSection />
        <IndustrySection />
        <SignatureTile />
        <PricingSection />
        <IntegrationsSection />
        <WhyTrustSection />
        <FinalCTASection />
        <FAQSection />
        <Footer />
      </div>

    </div>
  );
}
