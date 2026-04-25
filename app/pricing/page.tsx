"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import { CreditCard, ArrowRight } from "lucide-react";

const NEON = "#E8001D";

const comparisons = [
  { label: "Hiring a part-time VA",   cost: "~$1,200/mo",  highlight: false },
  { label: "Traditional SaaS tools",  cost: "~$800/mo",    highlight: false },
  { label: "Pushable AI Growth plan", cost: "$149/mo",     highlight: true  },
];

export default function PricingPage() {
  return (
    <div className="overflow-x-hidden bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 bg-white text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-500/5 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-[12px] font-medium"
            style={{ background: `${NEON}10`, color: NEON, border: `1px solid ${NEON}25` }}
          >
            <CreditCard className="w-3 h-3" />
            Simple, Transparent Pricing
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl font-bold tracking-tight text-[#111111] mb-5 leading-[1.06]"
            style={{ fontFamily: "var(--font-fraunces)", fontStyle: "italic" }}
          >
            Pay Only for{" "}
            <em style={{ color: NEON }}>Work Done</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-500 text-[17px] leading-relaxed max-w-xl mx-auto mb-10"
          >
            No seat fees, no idle charges. One credit equals one completed task — an invoice sent, a lead followed up, a report filed. You only pay for results.
          </motion.p>

          {/* Cost comparison */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-sm mx-auto space-y-2 mb-8"
          >
            {comparisons.map((c) => (
              <div
                key={c.label}
                className="flex items-center justify-between px-5 py-3 rounded-xl text-[13px]"
                style={{
                  background: c.highlight ? `${NEON}08` : "rgba(0,0,0,0.03)",
                  border: c.highlight ? `1px solid ${NEON}25` : "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <span className={c.highlight ? "font-semibold text-[#111]" : "text-gray-500"}>{c.label}</span>
                <span className="font-bold" style={{ color: c.highlight ? NEON : "#999" }}>{c.cost}</span>
              </div>
            ))}
          </motion.div>

          <motion.a
            href="#pricing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-[14px] transition-all hover:scale-105"
            style={{ background: NEON }}
          >
            See All Plans
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </section>

      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
