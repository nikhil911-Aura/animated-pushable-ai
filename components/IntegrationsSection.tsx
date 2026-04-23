"use client";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const integrations = [
  { name: "Slack",       color: "#E01E5A", abbr: "S"  },
  { name: "Gmail",       color: "#EA4335", abbr: "G"  },
  { name: "HubSpot",     color: "#FF7A59", abbr: "H"  },
  { name: "Notion",      color: "#e2e8f0", abbr: "N"  },
  { name: "Stripe",      color: "#635BFF", abbr: "St" },
  { name: "Zapier",      color: "#FF4A00", abbr: "Z"  },
  { name: "Salesforce",  color: "#00A1E0", abbr: "Sf" },
  { name: "Jira",        color: "#0052CC", abbr: "J"  },
  { name: "Airtable",    color: "#18BFFF", abbr: "A"  },
  { name: "Zoom",        color: "#2D8CFF", abbr: "Zm" },
  { name: "Calendly",    color: "#006BFF", abbr: "C"  },
  { name: "QuickBooks",  color: "#2CA01C", abbr: "Q"  },
];

export default function IntegrationsSection() {
  return (
    <section className="py-28 relative">
      <div className="section-line absolute top-0 inset-x-0" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-indigo-600/4 rounded-full blur-100 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-violet-600/4 rounded-full blur-100 -translate-y-1/2" />
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="badge mx-auto mb-5">
            <Zap className="w-3 h-3" />
            Integrations
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
            Works Across Your
            <br />
            <span className="gradient-text">Entire Stack</span>
          </h2>
          <p className="text-slate-400 text-[16px] max-w-md mx-auto">
            Connect your existing tools in one click. Pushable AI plugs into 50+ platforms your team already uses.
          </p>
        </motion.div>

        {/* Hub + ring visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center mb-12 relative h-20"
        >
          <div className="relative w-14 h-14 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/25 z-10">
            <Zap className="w-7 h-7 text-white fill-white" />
          </div>
          <div className="absolute inset-x-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 rounded-full border border-dashed border-indigo-500/15"
            />
          </div>
          <div className="absolute inset-x-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="w-52 h-52 rounded-full border border-dashed border-violet-500/10"
            />
          </div>
        </motion.div>

        {/* Integration tiles */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {integrations.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              whileHover={{ y: -3, scale: 1.04 }}
              className="group rounded-xl border border-white/6 bg-white/2 hover:border-white/10 p-3 text-center transition-all duration-200 cursor-default"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold mx-auto mb-2"
                style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}20` }}
              >
                {item.abbr}
              </div>
              <div className="text-[11px] text-slate-500 truncate group-hover:text-slate-400 transition-colors">{item.name}</div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-slate-700 text-[12px] mt-6"
        >
          + 40 more integrations available ·{" "}
          <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">Request yours →</a>
        </motion.p>
      </div>
    </section>
  );
}
