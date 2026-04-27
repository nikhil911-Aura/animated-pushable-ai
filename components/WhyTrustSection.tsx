"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Brain, Repeat, Zap, MessageCircle, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: Clock,
    color: "#E8001D",
    title: "Reduced Manual Work",
    desc: "Your AI handles repetitive, time-consuming tasks automatically â€” giving your team back 94+ hours a month to focus on actual growth work.",
  },
  {
    icon: Brain,
    color: "#FF2D42",
    title: "Smart Decision Making",
    desc: "Agents surface insights, flag anomalies, and recommend actions at the right moment â€” so your team always stays one step ahead.",
  },
  {
    icon: Repeat,
    color: "#E8001D",
    title: "Consistency Without Glitches",
    desc: "Every process runs exactly as defined, every time. No human errors, no missed steps, no inconsistency across your entire team.",
  },
  {
    icon: Zap,
    color: "#FF2D42",
    title: "No Task Delays",
    desc: "Agents run 24/7 through weekends and holidays â€” your workflows never pause waiting for someone to log back in.",
  },
];

export default function WhyTrustSection() {
  const reasonsGridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const grid = reasonsGridRef.current;
    if (!grid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = grid.querySelectorAll<HTMLElement>(":scope > *");
    gsap.fromTo(cards, { y: 32, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.55, ease: "power3.out",
      stagger: { grid: [2, 2], from: "start", amount: 0.5 },
      scrollTrigger: { trigger: grid, start: "top 80%", once: true },
    });
  }, []);

  return (
    <section className="py-28 relative bg-transparent">
      <div className="section-line absolute top-0 inset-x-0" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#111111] mb-5 leading-[1.1]" style={{ fontFamily: "var(--font-fraunces)" }}>
              Why Businesses Trust
              <br />
              <span className="text-[#111111]">Pushable AI?</span>
            </h2>
            <p className="text-gray-900 text-[15px] leading-relaxed mb-8">
              Pushable AI isn&apos;t another tool that adds complexity â€” it removes it. Businesses trust us because we deliver real time back, real reliability, and results they can actually see on their bottom line.
            </p>
            <a
              href="#"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/8 text-gray-900 hover:text-gray-900 hover:border-brand-300 hover:bg-brand-50 text-[13px] font-medium transition-all duration-200"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Talk to our Expert
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Right â€” 2Ã—2 reasons */}
          <div ref={reasonsGridRef} className="grid grid-cols-2 gap-4">
            {reasons.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.title}
                  className="group rounded-2xl border border-black/[0.07] bg-white hover:border-brand-200 hover:shadow-sm hover:-translate-y-0.5 p-5 transition-all duration-300"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${r.color}10`, border: `1px solid ${r.color}20` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: r.color }} />
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#111111] mb-2 leading-snug">{r.title}</h3>
                  <p className="text-gray-800 text-[12px] leading-relaxed">{r.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
