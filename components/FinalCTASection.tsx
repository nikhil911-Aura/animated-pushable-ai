"use client";
import { motion } from "framer-motion";
import { Zap, ArrowRight, MessageCircle } from "lucide-react";

export default function FinalCTASection() {
  return (
    <section className="py-28 relative overflow-hidden bg-[#f3f0eb]">
      <div className="section-line absolute top-0 inset-x-0" />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* Radial vignette â€” fades to page bg colour */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_30%,white_100%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-5 sm:px-8 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >

          {/* Headline */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#111111] mb-6 leading-[1.06]" style={{ fontFamily: "var(--font-fraunces)" }}>
            Ready to Take Your
            <br />
            <span className="pld-2 text-[#111111]">Business Forward?</span>
          </h2>

          {/* Sub */}
          <p className="text-gray-500 text-[17px] max-w-xl mx-auto mb-10 leading-relaxed">
            Join 2,000+ businesses already running smarter with Pushable AI. Deploy your first AI assistant today â€” no technical setup, no contracts, no wasted time. Just results from day one.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.a
              href="#"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-500 hover:bg-brand-400 text-white font-semibold text-[15px] transition-all duration-200 shadow-lg shadow-brand-500/20 overflow-hidden"
            >
              <Zap className="w-4 h-4 fill-white relative z-10" />
              <span className="relative z-10">Activate Your AI Assistant</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
              <div className="absolute inset-0 bg-linear-to-r from-brand-500 to-brand-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-black/8 text-gray-600 hover:text-gray-900 hover:border-brand-300 hover:bg-brand-50 font-semibold text-[15px] transition-all duration-200"
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
            className="flex flex-wrap items-center justify-center gap-6 mt-9 text-[12px] text-gray-400"
          >
            {["14-day free trial", "No credit card required", "Cancel anytime", "Setup in < 10 min"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-brand-400" />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
