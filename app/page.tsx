"use client";

import { Anton, Condiment } from "next/font/google";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Navbar              from "@/components/Navbar";
import AgentsSection       from "@/components/AgentsSection";
import HowItWorksSection   from "@/components/HowItWorksSection";
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
const NEON  = "#E8001D";

/* ── Trust logos ─────────────────────────────────────────────── */
const LOGOS = [
  { name: "Google",    slug: "google"    },
  { name: "Shopify",   slug: "shopify"   },
  { name: "Stripe",    slug: "stripe"    },
  { name: "HubSpot",   slug: "hubspot"   },
  { name: "Notion",    slug: "notion"    },
  { name: "Zoom",      slug: "zoom"      },
  { name: "Figma",     slug: "figma"     },
  { name: "Linear",    slug: "linear"    },
  { name: "Vercel",    slug: "vercel"    },
  { name: "Airtable",  slug: "airtable"  },
];
const R1 = [...LOGOS, ...LOGOS, ...LOGOS];
const R2 = [...LOGOS.slice(5), ...LOGOS.slice(0, 5), ...LOGOS.slice(5), ...LOGOS.slice(0, 5), ...LOGOS.slice(5), ...LOGOS.slice(0, 5)];

/* ── Video URL ──────────────────────────────────────────────── */
const V = {
  cinHero: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4",
};

/* ══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    video.style.opacity = "1";
  }, []);

  return (
    <div className={`${anton.variable} ${condiment.variable} overflow-x-hidden bg-[#f3f0eb]`}>

      <Navbar />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden" style={{ background: "#f3f0eb" }}>

        {/* Landscape video — fades up from the bottom half */}
        <div className="absolute inset-0">
          <video
            ref={heroVideoRef}
            src={V.cinHero}
            autoPlay
            muted
            playsInline
            loop
            className="w-full h-full object-cover"
            style={{ opacity: 1 }}
            aria-hidden="true"
          />
          {/* Cloud/mist effect — dense at top half, clears toward bottom */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 10%, rgba(255,255,255,0.88) 25%, rgba(255,255,255,0.65) 40%, rgba(255,255,255,0.25) 55%, rgba(255,255,255,0.05) 70%, rgba(255,255,255,0) 100%)"
          }} />
          {/* Extra soft cloud bloom at very top */}
          <div className="absolute inset-x-0 top-0 h-[45%] pointer-events-none" style={{
            background: "radial-gradient(ellipse 120% 60% at 50% 0%, rgba(255,255,255,0.6) 0%, transparent 100%)"
          }} />
        </div>

        {/* Trust carousel — pinned to bottom of hero */}
        <div className="absolute bottom-10 inset-x-0 z-20 overflow-hidden pb-6 pt-4">
          <p className="text-center text-[11px] font-semibold text-white/70 uppercase tracking-[0.22em] mb-4">Trusted by AI Leaders</p>
          <div className="overflow-hidden mb-3">
            <div className="flex animate-marquee" style={{ width: "max-content" }}>
              {R1.map((l, i) => (
                <div key={`r1-${i}`} className="shrink-0 flex items-center gap-2.5 px-5 py-2 mx-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://cdn.simpleicons.org/${l.slug}/ffffff`} alt={l.name} width={28} height={28} className="w-7 h-7 shrink-0 object-contain opacity-90" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  <span className="text-[14px] text-white/90 whitespace-nowrap font-semibold">{l.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex animate-marquee-rev" style={{ width: "max-content" }}>
              {R2.map((l, i) => (
                <div key={`r2-${i}`} className="shrink-0 flex items-center gap-2.5 px-5 py-2 mx-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://cdn.simpleicons.org/${l.slug}/ffffff`} alt={l.name} width={28} height={28} className="w-7 h-7 shrink-0 object-contain opacity-90" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  <span className="text-[14px] text-white/90 whitespace-nowrap font-semibold">{l.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4"
          style={{ minHeight: "100vh" }}>

          {/* Heading */}
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

          {/* CTA buttons */}
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
          ORIGINAL SECTIONS
      ════════════════════════════════════════ */}
      <div style={{ background: "#010828" }}>
        <AgentsSection />
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
  );
}
