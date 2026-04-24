"use client";

import { Anton, Condiment } from "next/font/google";
import { Mail, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
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
const anton = Anton({
  weight:   "400",
  subsets:  ["latin"],
  variable: "--font-orbis-anton",
});
const condiment = Condiment({
  weight:   "400",
  subsets:  ["latin"],
  variable: "--font-orbis-condiment",
});

/* ── Design tokens ──────────────────────────────────────────── */
const CREAM = "#EFF4FF";
const NEON  = "#E8001D";
const BG    = "#010828";
const RED   = "#E8001D";

/* ── Video URLs ─────────────────────────────────────────────── */
const V = {
  hero:  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4",
  about: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4",
  c1:    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4",
  c2:    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4",
  c3:    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4",
  cta:   "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4",
};

const CARDS = [
  { src: V.c1, score: "8.7/10" },
  { src: V.c2, score: "9/10"   },
  { src: V.c3, score: "8.2/10" },
];

/* ── Custom SVG icons ───────────────────────────────────────── */
function XIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.734l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const SOCIAL_ICONS = [
  <Mail       key="m" size={20} />,
  <XIcon      key="x" size={20} />,
  <GithubIcon key="g" size={20} />,
];

const DECORATIVE_TEXT =
  "An AI assistant that works beyond time and routine. Built to handle everyday workflows, reduce manual effort, and keep your operations moving smoothly without constant supervision.";

/* ── Scramble text on hover ─────────────────────────────────── */
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
  const [hovered, setHovered] = useState(false);
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
        onMouseEnter={() => { setHovered(true); scramble(); }}
        onMouseLeave={() => {
          setHovered(false);
          if (rafRef.current) clearTimeout(rafRef.current);
          setDisplay(text);
        }}
      >
        {display}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
export default function Home() {
  const AF = "var(--font-orbis-anton)";
  const CF = "var(--font-orbis-condiment)";

  // Delay hero animations until after the PageLoader exits (HOLD_MS 2400 + dissolve ~800ms)
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`${anton.variable} ${condiment.variable} overflow-x-hidden`}
      style={{ background: BG }}
    >
      <Navbar />

      {/* ════════════════════════════════════════
          SECTION 1 · HERO
      ════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden rounded-b-[32px]">

        <video
          src={V.hero}
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(1,8,40,0.45)" }} />

        <div
          className="relative z-10 max-w-[1831px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col"
          style={{ minHeight: "100vh" }}
        >
          {/* Hero content */}
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
                  fontFamily:   CF,
                  color:        NEON,
                  fontSize:     "clamp(24px,3.5vw,48px)",
                  right:        0,
                  top:          "18%",
                  mixBlendMode: "exclusion",
                  lineHeight:   1.1,
                  display:      "inline-block",
                  cursor:       "default",
                }}
              >
                AI automation
              </motion.span>

              {/* Main heading — masked line reveal + scramble on hover */}
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
          SECTION 2 · ABOUT
      ════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden">

        <video
          src={V.about}
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(1,8,40,0.35)" }} />

        <div
          className="relative z-10 max-w-[1831px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-between"
          style={{
            minHeight:     "100vh",
            paddingTop:    "clamp(64px,8vw,96px)",
            paddingBottom: "clamp(64px,8vw,96px)",
          }}
        >
          {/* Top row */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12">

            {/* Left heading */}
            <div className="relative">
              <h2
                className="uppercase"
                style={{
                  fontFamily: AF,
                  fontSize:   "clamp(32px,5.5vw,60px)",
                  color:      CREAM,
                  lineHeight: 1,
                }}
              >
                {["Hello!", "I’m Pushable AI"].map((line, i) => (
                  <div key={i} style={{ overflow: "hidden" }}>
                    <motion.span
                      className="block"
                      initial={{ y: "105%", skewY: 4, opacity: 0 }}
                      whileInView={{ y: "0%", skewY: 0, opacity: 1 }}
                      whileHover={{ x: 10, color: NEON, transition: { type: "spring", stiffness: 300, damping: 18 } }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.14, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      style={{ display: "block", cursor: "default" }}
                    >
                      {line}
                    </motion.span>
                  </div>
                ))}
              </h2>
              {/* Cursive overlay */}
              <motion.span
                className="pointer-events-none select-none absolute"
                initial={{ opacity: 0, rotate: -10, scale: 0.82 }}
                whileInView={{ opacity: 1, rotate: -1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily:   CF,
                  color:        NEON,
                  fontSize:     "clamp(36px,5.5vw,68px)",
                  mixBlendMode: "exclusion",
                  bottom:       -8,
                  right:        -20,
                  lineHeight:   1,
                }}
                aria-hidden="true"
              >
                Pushable AI
              </motion.span>
            </div>

            {/* Right description */}
            <motion.p
              className="uppercase max-w-[266px]"
              style={{ fontFamily: "monospace", fontSize: "clamp(14px,1.4vw,16px)", color: CREAM, lineHeight: 1.65, cursor: "default" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ color: NEON, letterSpacing: "0.06em", x: 6, transition: { type: "spring", stiffness: 200, damping: 18 } }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {DECORATIVE_TEXT}
            </motion.p>
          </div>

          {/* Bottom row — decorative */}
          <div className="flex flex-row justify-between gap-8 mt-auto pt-16">

            <div className="flex flex-col gap-5" style={{ opacity: 0.1 }}>
              {[0, 1].map(i => (
                <p
                  key={i}
                  className="uppercase text-[#010828] lg:text-[#EFF4FF]"
                  style={{ fontFamily: "monospace", fontSize: "clamp(11px,1.1vw,13px)", lineHeight: 1.55, maxWidth: 266 }}
                >
                  {DECORATIVE_TEXT}
                </p>
              ))}
            </div>

            <div className="hidden lg:flex flex-col gap-5" style={{ opacity: 0.1 }}>
              {[0, 1].map(i => (
                <p
                  key={i}
                  className="uppercase"
                  style={{ fontFamily: "monospace", fontSize: "clamp(11px,1.1vw,13px)", color: CREAM, lineHeight: 1.55, maxWidth: 266 }}
                >
                  {DECORATIVE_TEXT}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          SECTION 3 · INTELLIGENT AGENTS GRID
      ════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1831px] mx-auto px-4 sm:px-8 lg:px-12">

          {/* Header row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-10 mb-12">

            <div>
              <div style={{ overflow: "hidden" }}>
                <motion.div
                  className="uppercase leading-none"
                  style={{ fontFamily: AF, fontSize: "clamp(32px,5.5vw,60px)", color: CREAM, cursor: "default" }}
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
                    style={{ fontFamily: AF, fontSize: "clamp(32px,5.5vw,60px)", color: CREAM, lineHeight: 1, display: "inline-block", cursor: "default" }}
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

            {/* DEPLOY YOUR AGENT */}
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
                  style={{ fontFamily: AF, fontSize: "clamp(32px,5.5vw,60px)", color: CREAM, display: "inline-block" }}
                  whileHover={{ color: NEON, scale: 1.04, transition: { type: "spring", stiffness: 300, damping: 16 } }}
                >
                  DEPLOY
                </motion.span>
                <div
                  className="flex flex-col uppercase"
                  style={{ fontFamily: AF, fontSize: "clamp(20px,3vw,36px)", color: CREAM, lineHeight: 1.05 }}
                >
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

          {/* Card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CARDS.map((card, i) => (
              <div
                key={i}
                className="liquid-glass rounded-[32px] hover:bg-white/10 transition-colors duration-200"
                style={{ padding: 18 }}
              >
                <div className="relative rounded-[24px] overflow-hidden" style={{ paddingBottom: "100%" }}>
                  <video
                    src={card.src}
                    autoPlay loop muted playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute left-3 right-3 bottom-3 liquid-glass rounded-[20px] flex items-center justify-between px-5 py-4">
                    <div>
                      <div
                        className="uppercase"
                        style={{ fontSize: 11, color: "rgba(239,244,255,0.7)", fontFamily: "monospace", letterSpacing: "0.04em" }}
                      >
                        RARITY SCORE:
                      </div>
                      <div style={{ fontSize: 16, color: CREAM, fontFamily: AF, marginTop: 2 }}>
                        {card.score}
                      </div>
                    </div>
                    <button
                      className="rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 flex-shrink-0"
                      style={{
                        width:      48,
                        height:     48,
                        background: "linear-gradient(135deg, #b724ff 0%, #7c3aed 100%)",
                        boxShadow:  "0 8px 24px rgba(167,139,250,0.5)",
                      }}
                    >
                      <ChevronRight size={20} color="white" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          SECTION 4 · CTA / FINAL
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden">

        <video
          src={V.cta}
          autoPlay loop muted playsInline
          className="w-full h-auto block"
          aria-hidden="true"
        />

        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-[1831px] mx-auto px-4 sm:px-8 lg:px-12 flex justify-end">
            <div
              className="relative text-right py-8"
              style={{ paddingRight: "clamp(0px,20%,360px)", paddingLeft: "clamp(0px,15%,270px)" }}
            >
              <motion.span
                className="pointer-events-none select-none absolute"
                initial={{ opacity: 0, rotate: -14, scale: 0.8 }}
                whileInView={{ opacity: 1, rotate: -1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily:   CF,
                  color:        NEON,
                  fontSize:     "clamp(17px,5vw,68px)",
                  mixBlendMode: "exclusion",
                  top:          "clamp(-24px,-3vw,-8px)",
                  left:         "clamp(-24px,-3vw,-8px)",
                  lineHeight:   1.1,
                }}
                aria-hidden="true"
              >
                Go beyond
              </motion.span>

              <h2
                className="uppercase text-right"
                style={{ fontFamily: AF, fontSize: "clamp(16px,4.5vw,60px)", color: CREAM, lineHeight: 1.1 }}
              >
                {[
                  { text: "JOIN US.", mb: "clamp(16px,3vw,48px)" },
                  { text: "REVEAL WHAT'S HIDDEN.", mb: 0 },
                  { text: "DEFINE WHAT'S NEXT.", mb: 0 },
                  { text: "FOLLOW THE SIGNAL.", mb: 0 },
                ].map(({ text, mb }, i) => (
                  <div key={i} style={{ overflow: "hidden", marginBottom: mb || undefined }}>
                    <motion.div
                      initial={{ y: "105%", skewY: 3, opacity: 0 }}
                      whileInView={{ y: "0%", skewY: 0, opacity: 1 }}
                      whileHover={{ x: -12, color: NEON, transition: { type: "spring", stiffness: 280, damping: 18 } }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                      style={{ cursor: "default" }}
                    >
                      {text}
                    </motion.div>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        </div>

        {/* Social icons — bottom left */}
        <div className="absolute z-20" style={{ left: "8%", bottom: "clamp(8%,14%,20%)" }}>
          <div
            className="liquid-glass flex flex-col overflow-hidden"
            style={{ borderRadius: "clamp(8px,1.25vw,20px)" }}
          >
            {SOCIAL_ICONS.map((icon, i) => (
              <button
                key={i}
                className={`flex items-center justify-center hover:bg-white/10 transition-colors duration-200${
                  i < SOCIAL_ICONS.length - 1 ? " border-b border-white/10" : ""
                }`}
                style={{
                  color:  CREAM,
                  width:  "clamp(44px,14vw,268px)",
                  height: "clamp(36px,10vw,80px)",
                }}
              >
                {icon}
              </button>
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
