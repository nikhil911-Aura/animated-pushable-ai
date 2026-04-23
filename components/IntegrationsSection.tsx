"use client";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const integrations = [
  { name: "Slack",       color: "#E01E5A", abbr: "S"  },
  { name: "Gmail",       color: "#EA4335", abbr: "G"  },
  { name: "HubSpot",     color: "#FF7A59", abbr: "H"  },
  { name: "Notion",      color: "#333333", abbr: "N"  },
  { name: "Stripe",      color: "#635BFF", abbr: "St" },
  { name: "Zapier",      color: "#FF4A00", abbr: "Z"  },
  { name: "Salesforce",  color: "#00A1E0", abbr: "Sf" },
  { name: "Jira",        color: "#0052CC", abbr: "J"  },
  { name: "Airtable",    color: "#18BFFF", abbr: "A"  },
  { name: "Zoom",        color: "#2D8CFF", abbr: "Zm" },
  { name: "Calendly",    color: "#006BFF", abbr: "C"  },
  { name: "QuickBooks",  color: "#2CA01C", abbr: "Q"  },
];

const rings = [
  { radius: 88,  logos: integrations.slice(0, 4),  duration: 22, dir: 1  as 1 | -1 },
  { radius: 148, logos: integrations.slice(4, 8),  duration: 30, dir: -1 as 1 | -1 },
  { radius: 210, logos: integrations.slice(8, 12), duration: 38, dir: 1  as 1 | -1 },
];

function OrbitalVisual() {
  return (
    <div className="relative flex items-center justify-center" style={{ height: 460 }}>
      {/* Hub */}
      <div className="absolute z-20 w-16 h-16 rounded-2xl bg-linear-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
        <Zap className="w-8 h-8 text-white fill-white" />
      </div>

      {rings.map((ring, ri) => (
        <motion.div
          key={ri}
          className="absolute rounded-full border border-dashed"
          style={{
            width:  ring.radius * 2,
            height: ring.radius * 2,
            borderColor: ri === 0
              ? "rgba(249,115,22,0.25)"
              : ri === 1
              ? "rgba(251,146,60,0.18)"
              : "rgba(251,146,60,0.12)",
          }}
          animate={{ rotate: ring.dir * 360 }}
          transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
        >
          {ring.logos.map((logo, li) => {
            const angle = (li / ring.logos.length) * 360;
            return (
              <motion.div
                key={logo.name}
                className="absolute"
                style={{
                  top:  "50%",
                  left: "50%",
                  transform: `rotate(${angle}deg) translate(${ring.radius}px) rotate(-${angle}deg) translate(-50%, -50%)`,
                }}
                animate={{ rotate: [-angle + ring.dir * -360, -angle] }}
                transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-bold shadow-sm"
                  style={{
                    background: `${logo.color}14`,
                    border:     `1px solid ${logo.color}25`,
                    color:      logo.color,
                    backdropFilter: "blur(8px)",
                  }}
                  title={logo.name}
                >
                  {logo.abbr}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ))}

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 460 460"
        aria-hidden="true"
      >
        {[30, 140, 250].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const r   = 210;
          const cx  = 230, cy = 230;
          return (
            <line
              key={angle}
              x1={cx} y1={cy}
              x2={cx + Math.cos(rad) * r}
              y2={cy + Math.sin(rad) * r}
              stroke="rgba(249,115,22,0.12)"
              strokeWidth="0.8"
              strokeDasharray="4 6"
            />
          );
        })}
      </svg>
    </div>
  );
}

export default function IntegrationsSection() {
  return (
    <section className="py-28 relative bg-white">
      <div className="section-line absolute top-0 inset-x-0" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-orange-400/5 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-orange-400/5 rounded-full blur-[100px] -translate-y-1/2" />
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <div className="badge mx-auto mb-5">
            <Zap className="w-3 h-3" />
            Integrations
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#111111] mb-4 leading-[1.1]">
            Your AI Assistant Works Across
            <br />
            <span className="gradient-text">Your Entire Stack</span>
          </h2>
          <p className="text-gray-500 text-[16px] max-w-md mx-auto">
            Connect your existing tools in one click. Pushable AI plugs into 50+ platforms your team already uses — no reconfiguration needed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <OrbitalVisual />
        </motion.div>

        {/* Integration tiles */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4">
          {integrations.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              whileHover={{ y: -3, scale: 1.04 }}
              className="group rounded-xl border border-black/7 bg-white hover:border-orange-200 hover:shadow-sm p-3 text-center transition-all duration-200 cursor-default"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold mx-auto mb-2"
                style={{ background: `${item.color}12`, color: item.color, border: `1px solid ${item.color}20` }}
              >
                {item.abbr}
              </div>
              <div className="text-[11px] text-gray-400 truncate group-hover:text-gray-600 transition-colors">{item.name}</div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-400 text-[12px] mt-6"
        >
          + 40 more integrations available ·{" "}
          <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors">Request yours →</a>
        </motion.p>
      </div>
    </section>
  );
}
