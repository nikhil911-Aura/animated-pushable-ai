"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Zap, ArrowRight, MessageCircle } from "lucide-react";

function AuroraBackground() {
  const a1 = useRef<HTMLDivElement>(null);
  const a2 = useRef<HTMLDivElement>(null);
  const a3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const drift = (el: HTMLDivElement | null, dur: number, dx: number, dy: number) => {
      if (!el) return;
      gsap.to(el, { x: dx, y: dy, duration: dur, repeat: -1, yoyo: true, ease: "sine.inOut" });
    };

    drift(a1.current, 9,   60, -40);
    drift(a2.current, 11, -50,  55);
    drift(a3.current, 8,   40,  30);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div ref={a1} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-orange-500/8 rounded-full blur-[150px]" />
      <div ref={a2} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-75 bg-amber-500/6 rounded-full blur-[120px]" />
      <div ref={a3} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-400/5 rounded-full blur-[100px]" />
    </div>
  );
}

export default function FinalCTASection() {
  return (
    <section className="py-28 relative overflow-hidden bg-white">
      <div className="section-line absolute top-0 inset-x-0" />

      <AuroraBackground />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* Radial vignette — fades to page bg colour */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_30%,white_100%)] pointer-events-none" />

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
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Ready when you are
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#111111] mb-6 leading-[1.06]">
            Ready to Take Your
            <br />
            <span className="pld-2 gradient-text">Business Forward?</span>
          </h2>

          {/* Sub */}
          <p className="text-gray-500 text-[17px] max-w-xl mx-auto mb-10 leading-relaxed">
            Join 2,000+ businesses already running smarter with Pushable AI. Deploy your first AI assistant today — no technical setup, no contracts, no wasted time. Just results from day one.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.a
              href="#"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-semibold text-[15px] transition-all duration-200 shadow-lg shadow-orange-500/20 overflow-hidden"
            >
              <Zap className="w-4 h-4 fill-white relative z-10" />
              <span className="relative z-10">Activate Your AI Assistant</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
              <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-black/8 text-gray-600 hover:text-gray-900 hover:border-orange-300 hover:bg-orange-50 font-semibold text-[15px] transition-all duration-200"
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
                <span className="w-1 h-1 rounded-full bg-orange-400" />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
