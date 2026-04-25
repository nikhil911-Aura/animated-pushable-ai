"use client";

import { Anton, Condiment } from "next/font/google";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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

/* ── Fonts ──────────────────────────────────────────────────── */
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-orbis-anton" });
const condiment = Condiment({ weight: "400", subsets: ["latin"], variable: "--font-orbis-condiment" });

/* ── Design tokens ──────────────────────────────────────────── */
const CREAM = "#EFF4FF";
const NEON  = "#E8001D";
const RED   = "#E8001D";

/* ── Video URL ──────────────────────────────────────────────── */
const V = {
  cinHero: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4",
};

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

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    video.style.transition = "opacity 0.5s linear";

    const onTimeUpdate = () => {
      if (isNaN(video.duration)) return;
      const t = video.currentTime, d = video.duration;
      const o = t < 0.6 ? t / 0.5 : t > d - 0.6 ? (d - t) / 0.5 : 1;
      video.style.opacity = String(Math.max(0, Math.min(1, o)));
    };

    const onEnded = () => {
      video.style.transition = "none";
      video.style.opacity = "0";
      setTimeout(() => {
        video.style.transition = "opacity 0.5s linear";
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 80);
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <div className={`${anton.variable} ${condiment.variable} overflow-x-hidden`}>

      <Navbar />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden" style={{ background: "#ffffff" }}>

        {/* Landscape video — fades up from the bottom half */}
        <div className="absolute inset-0">
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
          {/* White gradient so video fades in from bottom */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "linear-gradient(to bottom, #ffffff 0%, #ffffff 35%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0) 100%)"
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-start text-center px-4"
          style={{ minHeight: "100vh", paddingTop: "clamp(100px,12vh,140px)", paddingBottom: 60 }}>

          {/* Live badge */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: "rgba(232,0,29,0.06)", border: "1px solid rgba(232,0,29,0.2)", fontSize: 13, color: "#E8001D" }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8001D", display: "inline-block", flexShrink: 0 }} />
            Now live — automating workflows for 2,000+ businesses
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(44px,7vw,96px)",
              lineHeight: 1.06,
              color: "#111111",
              maxWidth: 860,
              marginBottom: "1.5rem",
              letterSpacing: "-1px",
            }}
          >
            AI Assistant That{" "}
            <em style={{ color: NEON, fontStyle: "italic" }}>Automates</em>{" "}
            Your{" "}
            <em style={{ color: NEON, fontStyle: "italic" }}>Routine<br />Workflows</em>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: "#666", fontSize: "clamp(15px,1.5vw,17px)", lineHeight: 1.75, maxWidth: 520, marginBottom: "2.5rem" }}
          >
            Your AI assistant quietly handles emails, follow-ups, reports, and repetitive tasks in the background — so your team can focus on work that actually grows your business.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex items-center gap-4 mb-16"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.32, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              className="rounded-full font-semibold transition-transform hover:scale-105 active:scale-95"
              style={{ background: NEON, color: "#fff", padding: "14px 34px", fontSize: 15, border: "none", cursor: "pointer" }}
            >
              Watch Demo
            </button>
            <button
              className="rounded-full font-semibold transition-transform hover:scale-105 active:scale-95"
              style={{ background: "transparent", color: "#111", padding: "13px 34px", fontSize: 15, border: "1.5px solid #111", cursor: "pointer" }}
            >
              Try Now
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex items-center gap-10 sm:gap-16"
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.42, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {[
              { value: "200+", label: "Clients Worldwide" },
              { value: "99%",  label: "Uptime Guaranteed" },
              { value: "4.9★", label: "Average Rating" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-10 sm:gap-16">
                {i > 0 && <div style={{ width: 1, height: 36, background: "#e5e5e5" }} />}
                <div className="text-center">
                  <div style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 700, color: "#111" }}>{s.value}</div>
                  <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", marginTop: 3 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#aaa" }}
          >
            SCROLL
          </motion.div>

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
