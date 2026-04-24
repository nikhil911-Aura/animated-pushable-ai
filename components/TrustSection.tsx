"use client";
import { motion } from "framer-motion";
import { CountUp, RevealBlock } from "@/components/animation";

const LOGOS = [
  { name: "Google",     abbr: "G",   color: "#4285F4" },
  { name: "Slack",      abbr: "S",   color: "#E01E5A" },
  { name: "Shopify",    abbr: "Sh",  color: "#96BF48" },
  { name: "Stripe",     abbr: "St",  color: "#635BFF" },
  { name: "HubSpot",    abbr: "H",   color: "#FF7A59" },
  { name: "Notion",     abbr: "N",   color: "#333333" },
  { name: "Salesforce", abbr: "Sf",  color: "#00A1E0" },
  { name: "Zoom",       abbr: "Z",   color: "#2D8CFF" },
  { name: "Figma",      abbr: "F",   color: "#F24E1E" },
  { name: "Linear",     abbr: "L",   color: "#5E6AD2" },
  { name: "Vercel",     abbr: "V",   color: "#111111" },
  { name: "Airtable",   abbr: "A",   color: "#18BFFF" },
];

/* Row 2 is shifted so both rows show different logo ordering */
const ROW2 = [...LOGOS.slice(6), ...LOGOS.slice(0, 6)];

/* Triple-duplicate for seamless CSS loop */
const R1 = [...LOGOS, ...LOGOS, ...LOGOS];
const R2 = [...ROW2,  ...ROW2,  ...ROW2];

const STATS = [
  { to: 2000,  suffix: "+",   prefix: "",  decimals: 0, label: "Businesses",        sublabel: "trust Pushable AI" },
  { to: 94,    suffix: " hrs",prefix: "",  decimals: 0, label: "Saved / month",      sublabel: "per team on average" },
  { to: 99.8,  suffix: "%",   prefix: "",  decimals: 1, label: "Accuracy",           sublabel: "across all agents" },
  { to: 3.2,   suffix: "M+",  prefix: "$", decimals: 1, label: "Revenue recovered",  sublabel: "by our clients" },
];

function LogoChip({ name, abbr, color }: { name: string; abbr: string; color: string }) {
  return (
    <div
      className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 mx-2 rounded-xl border border-black/[0.07] bg-white hover:border-brand-200 hover:shadow-md transition-all duration-300 cursor-default group"
    >
      <div
        className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${color}16`, color, border: `1px solid ${color}22` }}
      >
        {abbr}
      </div>
      <span className="text-[12px] text-gray-400 whitespace-nowrap font-medium group-hover:text-gray-700 transition-colors duration-200">
        {name}
      </span>
    </div>
  );
}

export default function TrustSection() {
  return (
    <section className="py-16 overflow-hidden relative bg-[#f3f0eb]">
      <div className="section-line absolute top-0 inset-x-0" />

      {/* Wider fade masks for smoother edge bleed */}
      <div className="absolute left-0 inset-y-0 w-32 bg-gradient-to-r from-[#f3f0eb] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-32 bg-gradient-to-l from-[#f3f0eb] to-transparent z-10 pointer-events-none" />

      {/* â”€â”€ Header â”€â”€ */}
      <RevealBlock variant="fade" className="max-w-5xl mx-auto px-5 sm:px-8 mb-8 text-center">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.2em]">
          Works with the tools your team already uses
        </p>
      </RevealBlock>

      {/* â”€â”€ Row 1 â€” scrolls left â”€â”€ */}
      <div className="overflow-hidden mb-2.5">
        <div className="flex animate-marquee" style={{ width: "max-content" }}>
          {R1.map((l, i) => <LogoChip key={`r1-${i}`} {...l} />)}
        </div>
      </div>

      {/* â”€â”€ Row 2 â€” scrolls right â”€â”€ */}
      <div className="overflow-hidden">
        <div className="flex animate-marquee-rev" style={{ width: "max-content" }}>
          {R2.map((l, i) => <LogoChip key={`r2-${i}`} {...l} />)}
        </div>
      </div>

      {/* â”€â”€ Stats â”€â”€ */}
      <div className="max-w-3xl mx-auto mt-10 px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl border border-black/[0.07] bg-white shadow-sm overflow-hidden"
        >
          {/* Subtle top-edge orange glow */}
          <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-brand-400/40 to-transparent" />

          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-black/5">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="group relative px-5 py-6 text-center overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-linear-to-b from-brand-50/0 to-orange-50/0 group-hover:from-brand-50/60 group-hover:to-brand-50/20 transition-all duration-400 pointer-events-none" />

                <div className="relative">
                  <div className="text-2xl sm:text-3xl font-bold gradient-text mb-0.5 tabular-nums">
                    <CountUp
                      to={s.to}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      decimals={s.decimals}
                    />
                  </div>
                  <div className="text-[12px] font-semibold text-gray-700 leading-tight">{s.label}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5 leading-tight">{s.sublabel}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-[11px] text-gray-400 mt-4"
        >
          Trusted by 2,000+ businesses across 40+ countries Â·{" "}
          <a href="#" className="text-brand-500 hover:text-brand-600 transition-colors">See case studies â†’</a>
        </motion.p>
      </div>
    </section>
  );
}
