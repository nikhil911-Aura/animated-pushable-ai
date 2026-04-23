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
    color: "#f97316",
    useCase: "Automate user onboarding sequences, track churn signals, and follow up on failed renewals — without lifting a finger.",
  },
  {
    icon: Megaphone,
    name: "Marketing Agencies",
    color: "#fb923c",
    useCase: "Deliver client reports automatically, schedule campaigns, and track performance across accounts in real time.",
  },
  {
    icon: DollarSign,
    name: "Finance",
    color: "#f97316",
    useCase: "Reconcile accounts, generate invoices on schedule, and flag payment anomalies before they become problems.",
  },
  {
    icon: Settings,
    name: "Operations",
    color: "#fb923c",
    useCase: "Coordinate multi-team workflows, maintain SOPs automatically, and escalate blockers before they delay delivery.",
  },
  {
    icon: Briefcase,
    name: "Agencies",
    color: "#f97316",
    useCase: "Manage client onboarding, automate billing, and keep project timelines on track without manual follow-ups.",
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
    <section id="industries" className="py-28 relative bg-[#f3f0eb]">
      <div className="section-line absolute top-0 inset-x-0" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-orange-400/5 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="pld-3 badge mx-auto mb-5">
            <Briefcase className="w-3 h-3" />
            Industries
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#111111] mb-4 leading-[1.1]">
            The Right Push for
            <br />
            <span className="gradient-text-soft">Every Industry</span>
          </h2>
          <p className="text-gray-500 text-[16px] max-w-md mx-auto">
            Whatever your business does, Pushable AI finds the workflows worth automating.
          </p>
        </motion.div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.name}
                className="group relative rounded-2xl border border-black/7 bg-white hover:border-orange-200 hover:shadow-sm hover:-translate-y-1 p-6 transition-all duration-300 overflow-hidden cursor-default"
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
                <p className="text-gray-400 text-[13px] leading-relaxed">{industry.useCase}</p>
              </div>
            );
          })}

          {/* "Your industry" CTA card */}
          <div className="rounded-2xl border border-dashed border-orange-300 bg-orange-50/50 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-[15px] font-semibold text-[#111111] mb-2">Your Industry</h3>
              <p className="text-gray-400 text-[13px] leading-relaxed mb-4">
                Don&apos;t see yours listed? Pushable AI adapts to any workflow across any sector.
              </p>
            </div>
            <a href="#" className="text-[13px] text-orange-500 hover:text-orange-600 font-medium transition-colors group flex items-center gap-1">
              Talk to us
              <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
