"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Megaphone, DollarSign, Settings, Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    icon: Code2,
    name: "SaaS",
    color: "#E8001D",
    useCase: "Your AI assistant handles onboarding sequences, churn follow-ups, and renewal reminders automatically — so your team focuses on building, not chasing.",
  },
  {
    icon: Megaphone,
    name: "Marketing Agencies",
    color: "#FF2D42",
    useCase: "Automate client reports, campaign scheduling, and performance tracking across all accounts — so your team delivers more value without adding headcount.",
  },
  {
    icon: DollarSign,
    name: "Finance",
    color: "#E8001D",
    useCase: "Generate invoices on schedule, reconcile accounts, and flag payment anomalies automatically — so nothing slips through the cracks at month-end.",
  },
  {
    icon: Settings,
    name: "Operations",
    color: "#FF2D42",
    useCase: "Coordinate cross-team workflows, maintain SOPs, and escalate blockers before they delay delivery — so your operations run like clockwork every day.",
  },
  {
    icon: Briefcase,
    name: "Agencies",
    color: "#E8001D",
    useCase: "Handle client onboarding, automate billing, and keep project timelines on track — so your team spends time on client work, not admin.",
  },
];

export default function IndustrySection() {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = grid.querySelectorAll<HTMLElement>(":scope > *");
    gsap.fromTo(items, { y: 36, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
      stagger: { grid: [2, 3], from: "start", axis: "y", amount: 0.6 },
      scrollTrigger: { trigger: grid, start: "top 80%", once: true },
    });
  }, []);

  return (
    <section id="industries" className="py-28 relative bg-transparent">
      <div className="section-line absolute top-0 inset-x-0" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-brand-400/5 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#111111] mb-4 leading-[1.1]" style={{ fontFamily: "var(--font-fraunces)" }}>
            The Right Push for Every Industry,
            <br />
            <span className="text-[#111111]">Built with Pushable</span>
          </h2>
          <p className="text-gray-900 text-[16px] max-w-md mx-auto">
            Whatever your business does, Pushable AI finds the routine tasks worth automating and handles them for you.
          </p>
        </motion.div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.name}
                className="group relative rounded-2xl border border-black/7 bg-white hover:border-brand-200 hover:shadow-sm hover:-translate-y-1 p-6 transition-all duration-300 overflow-hidden cursor-default"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 20% 50%, ${industry.color}06 0%, transparent 70%)` }}
                />
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${industry.color}12`, border: `1px solid ${industry.color}22` }}
                >
                  <Icon className="w-5 h-5" style={{ color: industry.color }} />
                </div>
                <h3 className="text-[15px] font-semibold text-[#111111] mb-2">{industry.name}</h3>
                <p className="text-gray-800 text-[13px] leading-relaxed">{industry.useCase}</p>
              </div>
            );
          })}

          {/* "Your industry" CTA card */}
          <div className="rounded-2xl border border-dashed border-brand-300 bg-brand-50/50 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-[15px] font-semibold text-[#111111] mb-2">Your Industry</h3>
              <p className="text-gray-800 text-[13px] leading-relaxed mb-4">
                Don&apos;t see yours listed? Pushable AI adapts to any workflow across any sector.
              </p>
            </div>
            <a href="#" className="text-[13px] text-brand-500 hover:text-brand-600 font-medium transition-colors group flex items-center gap-1">
              Talk to us
              <span className="group-hover:translate-x-0.5 transition-transform inline-block">â†’</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
