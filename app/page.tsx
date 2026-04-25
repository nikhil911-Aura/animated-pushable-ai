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
          <div className="flex-1 flex flex-col items-center justify-center pb-16 lg:pb-24 pt-10">
            <div className="relative text-center">

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
                  right: "-10%",
                  top: "-12%",
                  mixBlendMode: "exclusion",
                  lineHeight: 1.1,
                  display: "inline-block",
                  cursor: "default",
                }}
              >
                AI automation
              </motion.span>

              {/* Main heading */}
              <h1
                className="uppercase"
                style={{ fontFamily: AF, fontSize: "clamp(40px,7vw,90px)", color: CREAM, lineHeight: 1.0, textAlign: "center", whiteSpace: "nowrap" }}
              >
                {["AI Assistant That Automates", "Your Routine Workflows"].map((line, i) => (
                  <motion.div
                    key={i}
                    style={{ overflow: "hidden", lineHeight: 1.05 }}
                  >
                    <motion.div
                      initial={{ y: "105%", skewY: 4, opacity: 0 }}
                      animate={ready ? { y: "0%", skewY: 0, opacity: 1 } : { y: "105%", skewY: 4, opacity: 0 }}
                      transition={{ delay: i * 0.14, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {line}
                    </motion.div>
                  </motion.div>
                ))}
              </h1>
            </div>
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
