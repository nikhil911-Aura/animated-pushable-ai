"use client";
import { motion } from "framer-motion";

const logos = [
  { name: "Google",     abbr: "G",   color: "#4285F4" },
  { name: "Slack",      abbr: "S",   color: "#E01E5A" },
  { name: "Shopify",    abbr: "Sh",  color: "#96BF48" },
  { name: "Stripe",     abbr: "St",  color: "#635BFF" },
  { name: "HubSpot",    abbr: "H",   color: "#FF7A59" },
  { name: "Notion",     abbr: "N",   color: "#e2e8f0" },
  { name: "Salesforce", abbr: "Sf",  color: "#00A1E0" },
  { name: "Zoom",       abbr: "Z",   color: "#2D8CFF" },
  { name: "Figma",      abbr: "F",   color: "#F24E1E" },
  { name: "Linear",     abbr: "L",   color: "#5E6AD2" },
  { name: "Vercel",     abbr: "V",   color: "#e2e8f0" },
  { name: "Airtable",   abbr: "A",   color: "#18BFFF" },
];

const allLogos = [...logos, ...logos];

function LogoChip({ name, abbr, color }: { name: string; abbr: string; color: string }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2 mx-2 rounded-lg border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300 cursor-default">
      <div
        className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0"
        style={{ background: `${color}18`, color }}
      >
        {abbr}
      </div>
      <span className="text-[12px] text-slate-500 whitespace-nowrap font-medium">{name}</span>
    </div>
  );
}

export default function TrustSection() {
  return (
    <section className="py-20 overflow-hidden relative">
      <div className="section-line absolute top-0 inset-x-0" />

      {/* Fade masks */}
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#04060f] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#04060f] to-transparent z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 mb-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-[12px] font-medium text-slate-600 uppercase tracking-[0.15em]"
        >
          Works with the tools your team already uses
        </motion.p>
      </div>

      {/* Marquee row */}
      <div className="overflow-hidden mb-3">
        <div className="flex animate-marquee" style={{ width: "max-content" }}>
          {allLogos.map((l, i) => <LogoChip key={`a${i}`} {...l} />)}
        </div>
      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-3xl mx-auto mt-14 px-5 sm:px-8"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.05]">
          {[
            { v: "2,000+",  l: "Businesses" },
            { v: "94 hrs",  l: "Saved / month" },
            { v: "99.8%",   l: "Accuracy" },
            { v: "$3.2M+",  l: "Revenue recovered" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="bg-[#04060f] px-6 py-5 text-center"
            >
              <div className="text-xl font-bold gradient-text mb-1">{s.v}</div>
              <div className="text-[11px] text-slate-600">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
