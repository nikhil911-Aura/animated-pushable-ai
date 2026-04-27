"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LayoutGrid, Plug, BarChart3, ArrowRight, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: "01",
    icon: LayoutGrid,
    color: "#E8001D",
    title: "Choose Your Assistant",
    body: "Pick the assistant built for your biggest challenge â€” Finance, HR, Revenue, or Operations. Zero setup, zero technical knowledge required. You'll be running in minutes.",
    items: ["Select from 4 specialists", "Preview before deploying", "No commitment required"],
  },
  {
    n: "02",
    icon: Plug,
    color: "#FF2D42",
    title: "Connect Your Tools",
    body: "Link Slack, Gmail, HubSpot, and 50+ more tools with one click â€” no code, no APIs, no configuration. Your assistant learns your workflow and starts working immediately.",
    items: ["50+ one-click integrations", "No code, no APIs to configure", "Live in under 10 minutes"],
  },
  {
    n: "03",
    icon: BarChart3,
    color: "#E8001D",
    title: "Watch It Handle the Work",
    body: "Track every completed task on a clean live dashboard. Add agents, expand workflows, or connect more tools whenever you're ready. Your AI grows with your business.",
    items: ["Live task dashboard", "Add agents any time", "Weekly performance reports"],
  },
];

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(-1);
  const sectionRef   = useRef<HTMLElement | null>(null);
  const lineTrackRef = useRef<HTMLDivElement | null>(null);
  const lineFillRef  = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section   = sectionRef.current;
    const lineTrack = lineTrackRef.current;
    const lineFill  = lineFillRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setActiveStep(steps.length - 1); return; }

    if (lineTrack && lineFill) {
      gsap.fromTo(lineFill, { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: lineTrack, start: "top 70%", end: "bottom 40%", scrub: 1 },
      });
    }

    const stepEls = section.querySelectorAll<HTMLElement>("[data-step-index]");
    const triggers: ScrollTrigger[] = [];
    stepEls.forEach((el) => {
      const idx = parseInt(el.dataset.stepIndex ?? "0", 10);
      triggers.push(ScrollTrigger.create({
        trigger: el, start: "top 68%", once: true,
        onEnter: () => setActiveStep((prev) => Math.max(prev, idx)),
      }));
    });
    return () => { triggers.forEach((t) => t.kill()); };
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-28 relative bg-transparent">
      <div className="section-line absolute top-0 inset-x-0" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-brand-400/5 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#111111] mb-4 leading-[1.1]" style={{ fontFamily: "var(--font-fraunces)" }}>
            How Your AI Assistant
            <br />
            <span className="text-[#111111]">Gets to Work</span>
          </h2>
          <p className="text-gray-900 text-[16px] max-w-md mx-auto">
            No technical setup needed. If you can send an email, you can run Pushable AI.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector track */}
          <div
            ref={lineTrackRef}
            className="absolute left-6.75 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-black/[0.07]"
          />
          {/* Animated fill */}
          <div
            ref={lineFillRef}
            className="absolute left-6.75 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px origin-top bg-linear-to-b from-brand-500/70 via-brand-400/50 to-transparent"
            style={{ transform: "scaleY(0)" }}
          />

          <div className="space-y-16">
            {steps.map((step, i) => {
              const Icon     = step.icon;
              const isLeft   = i % 2 === 0;
              const isActive = activeStep >= i;

              return (
                <div
                  key={step.n}
                  data-step-index={i}
                  className={`relative flex gap-6 sm:gap-0 ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"} items-start sm:items-center`}
                >
                  {/* Content card */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                    animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.3, x: isLeft ? -8 : 8 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className={`sm:w-[calc(50%-3rem)] ${isLeft ? "sm:pr-8 sm:text-right" : "sm:pl-8 sm:text-left"} pl-14 sm:pl-0`}
                  >
                    <div
                      className="glass-card rounded-2xl p-6 border transition-all duration-500 shadow-sm"
                      style={{
                        borderColor: isActive ? `${step.color}25` : "rgba(0,0,0,0.07)",
                        background:  isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)",
                      }}
                    >
                      <div
                        className={`mono text-xs font-bold mb-3 ${isLeft ? "sm:text-right" : "sm:text-left"}`}
                        style={{ color: `${step.color}80` }}
                      >
                        {step.n}
                      </div>
                      <h3 className="text-lg font-semibold text-[#111111] mb-2">{step.title}</h3>
                      <p className="text-gray-900 text-[13px] leading-relaxed mb-4">{step.body}</p>
                      <ul className={`space-y-1.5 ${isLeft ? "sm:items-end" : ""} flex flex-col`}>
                        {step.items.map((item) => (
                          <li
                            key={item}
                            className={`flex items-center gap-2 text-[12px] text-gray-800 ${isLeft ? "sm:flex-row-reverse sm:self-end" : ""}`}
                          >
                            <div className="w-1 h-1 rounded-full shrink-0" style={{ background: step.color }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Center node */}
                  <div className="absolute left-0 sm:static sm:w-24 flex items-center justify-center shrink-0">
                    <motion.div
                      animate={
                        isActive
                          ? { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }
                          : { scale: 1, opacity: 0.3 }
                      }
                      transition={isActive ? { duration: 3, repeat: Infinity, delay: i * 0.8 } : {}}
                      className="w-14 h-14 rounded-full flex items-center justify-center relative transition-colors duration-500 bg-white shadow-sm"
                      style={{
                        border: `1px solid ${isActive ? step.color + "30" : "rgba(0,0,0,0.08)"}`,
                      }}
                    >
                      <Icon
                        className="w-6 h-6 transition-colors duration-300"
                        style={{ color: isActive ? step.color : "#aaaaaa" }}
                      />
                      {isActive && (
                        <motion.div
                          animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
                          className="absolute inset-0 rounded-full"
                          style={{ border: `1px solid ${step.color}` }}
                        />
                      )}
                    </motion.div>
                  </div>

                  <div className="hidden sm:block sm:w-[calc(50%-3rem)]" />
                </div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-14"
        >
          <p className="text-gray-800 text-sm mb-4">Not sure which agent fits your workflow?</p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/[0.08] text-gray-900 hover:text-gray-900 hover:border-brand-300 hover:bg-brand-50 text-[13px] font-medium transition-all duration-200 group"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Talk to our Expert
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
