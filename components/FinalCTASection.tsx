"use client";
import { motion } from "framer-motion";
import { Zap, ArrowRight, MessageCircle } from "lucide-react";

export default function FinalCTASection() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="section-line absolute top-0 inset-x-0" />

      {/* BG glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-indigo-600/6 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-75 bg-violet-600/5 rounded-full blur-[120px]" />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_30%,#04060f_100%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-5 sm:px-8 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Live badge */}
          <div className="flex justify-center mb-7">
            <div className="badge">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Ready when you are
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.06]">
            Ready to Take Your
            <br />
            <span className="gradient-text">Business Forward?</span>
          </h2>

          {/* Sub */}
          <p className="text-slate-400 text-[17px] max-w-xl mx-auto mb-10 leading-relaxed">
            Join 2,000+ businesses already running smarter with Pushable AI. Deploy your first agent today — no technical setup, no complex contracts, no wasted time.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.a
              href="#"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-[15px] transition-all duration-200 shadow-xl shadow-indigo-500/25 overflow-hidden"
            >
              <Zap className="w-4 h-4 fill-white relative z-10" />
              <span className="relative z-10">Activate Your AI Assistant</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
              <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/4 font-semibold text-[15px] transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              Talk to the Team
            </motion.a>
          </div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-9 text-[12px] text-slate-700"
          >
            {["14-day free trial", "No credit card required", "Cancel anytime", "Setup in < 10 min"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-indigo-500/50" />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
