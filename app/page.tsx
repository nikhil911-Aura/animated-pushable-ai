"use client";

import { Anton, Condiment } from "next/font/google";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar              from "@/components/Navbar";
import AgentsSection          from "@/components/AgentsSection";
import StickyShowcaseSection  from "@/components/StickyShowcaseSection";
import HowItWorksSection      from "@/components/HowItWorksSection";
import DemoSection         from "@/components/DemoSection";
import IndustrySection     from "@/components/IndustrySection";
import PricingSection      from "@/components/PricingSection";
import WhyTrustSection     from "@/components/WhyTrustSection";
import FinalCTASection     from "@/components/FinalCTASection";
import FAQSection          from "@/components/FAQSection";
import Footer              from "@/components/Footer";

/* ── Fonts ──────────────────────────────────────────────────── */
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-orbis-anton" });
const condiment = Condiment({ weight: "400", subsets: ["latin"], variable: "--font-orbis-condiment" });

/* ── Design tokens ──────────────────────────────────────────── */
const NEON = "#E8001D";

/* ── Trust logos ─────────────────────────────────────────────── */
const LOGOS = [
  { name: "Google",   slug: "google"   },
  { name: "Shopify",  slug: "shopify"  },
  { name: "Stripe",   slug: "stripe"   },
  { name: "HubSpot",  slug: "hubspot"  },
  { name: "Notion",   slug: "notion"   },
  { name: "Zoom",     slug: "zoom"     },
  { name: "Figma",    slug: "figma"    },
  { name: "Linear",   slug: "linear"   },
  { name: "Vercel",   slug: "vercel"   },
  { name: "Airtable", slug: "airtable" },
];
const R1 = [...LOGOS, ...LOGOS, ...LOGOS];
const R2 = [...LOGOS.slice(5), ...LOGOS.slice(0, 5), ...LOGOS.slice(5), ...LOGOS.slice(0, 5), ...LOGOS.slice(5), ...LOGOS.slice(0, 5)];

/* ── Video URL ──────────────────────────────────────────────── */
const VIDEO_SRC = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";

/* ══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`${anton.variable} ${condiment.variable}`}>

      <Navbar />

      {/* ── Fixed video background ── stays in place while content scrolls over */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <video
          src={VIDEO_SRC}
          autoPlay
          muted
          playsInline
          loop
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── Scrollable content — sits above fixed video ── */}
      <div className="relative z-10">

        {/* ════════════════════════════════════════
            HERO  (transparent — video shows through)
        ════════════════════════════════════════ */}
        <section className="relative min-h-screen overflow-hidden">
          {/* Cloud/mist overlays — hero only */}
          <div className="absolute inset-0 pointer-events-none z-0" style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 10%, rgba(255,255,255,0.88) 25%, rgba(255,255,255,0.65) 40%, rgba(255,255,255,0.25) 55%, rgba(255,255,255,0.05) 70%, rgba(255,255,255,0) 100%)"
          }} />
          <div className="absolute inset-x-0 top-0 h-[45%] pointer-events-none z-0" style={{
            background: "radial-gradient(ellipse 120% 60% at 50% 0%, rgba(255,255,255,0.6) 0%, transparent 100%)"
          }} />

          {/* Trust carousel — pinned to bottom of hero */}
          <div className="absolute bottom-20 inset-x-0 z-20 overflow-hidden pb-6 pt-4">
            <p className="text-center text-[11px] font-semibold text-black uppercase tracking-[0.22em] mb-4">Trusted by AI Leaders</p>
            <div className="overflow-hidden mb-3">
              <div className="flex animate-marquee" style={{ width: "max-content" }}>
                {R1.map((l, i) => (
                  <div key={`r1-${i}`} className="shrink-0 flex items-center gap-2.5 px-5 py-2 mx-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://cdn.simpleicons.org/${l.slug}/ffffff`} alt={l.name} width={28} height={28} className="w-7 h-7 shrink-0 object-contain opacity-100" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                    <span className="text-[14px] text-white whitespace-nowrap font-semibold">{l.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="flex animate-marquee-rev" style={{ width: "max-content" }}>
                {R2.map((l, i) => (
                  <div key={`r2-${i}`} className="shrink-0 flex items-center gap-2.5 px-5 py-2 mx-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://cdn.simpleicons.org/${l.slug}/ffffff`} alt={l.name} width={28} height={28} className="w-7 h-7 shrink-0 object-contain opacity-100" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                    <span className="text-[14px] text-white whitespace-nowrap font-semibold">{l.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4" style={{ minHeight: "100vh", paddingBottom: "36vh" }}>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-fraunces)",
                fontWeight: 800,
                fontSize: "clamp(32px,4.5vw,64px)",
                lineHeight: 1.06,
                color: "#111111",
                maxWidth: 860,
                marginBottom: "1.5rem",
                letterSpacing: "-1px",
              }}
            >
              AI Assistant That <em>Automates</em>
              <br />
              Your <em>Routine Workflows</em>
            </motion.h1>

            <motion.div
              className="flex items-center gap-4"
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

          </div>
        </section>

        {/* ════════════════════════════════════════
            SECTIONS — scroll over the fixed video
        ════════════════════════════════════════ */}
        <div>
          <AgentsSection />
          <StickyShowcaseSection />
          <HowItWorksSection />
          <DemoSection />
          <IndustrySection />
          <PricingSection />
          <WhyTrustSection />
          <FAQSection />
          <FinalCTASection />
          <Footer />
        </div>

      </div>
    </div>
  );
}
