"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, ArrowRight, Zap } from "lucide-react";
import { MagneticButton } from "@/components/animation";
import HeroAtmosphere from "@/components/hero/HeroAtmosphere";

gsap.registerPlugin(ScrollTrigger);

const HeroOrb = dynamic(() => import("@/components/hero/HeroOrb"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.14) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  ),
});

function HeadlineLine({ text, delay }: { text: string; delay: number }) {
  const words = text.split(" ");
  return (
    <span className="block" aria-hidden="true">
      {words.map((word, wi) => (
        <span key={wi}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((ch, ci) => (
              <span key={ci} className="hc inline-block" data-delay={delay}>
                {ch}
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const sectionRef     = useRef<HTMLElement>(null);
  const textBlockRef   = useRef<HTMLDivElement>(null);
  const canvasBlockRef = useRef<HTMLDivElement>(null);
  const headlineRef    = useRef<HTMLHeadingElement>(null);
  const scrollProgress = useRef(0);

  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReduced) {
      gsap.set(".hc, .hero-sub, .hero-cta, .hero-eye", { opacity: 1, y: 0 });
      if (canvasBlockRef.current) gsap.set(canvasBlockRef.current, { opacity: 1 });
      return;
    }

    const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
    const tl = gsap.timeline({ defaults: { ease: EASE } });

    if (canvasBlockRef.current) {
      gsap.set(canvasBlockRef.current, { opacity: 0, y: 16 });
      tl.to(canvasBlockRef.current, { opacity: 1, y: 0, duration: 1.1 }, 0.1);
    }

    tl.fromTo(".hero-eye",
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.5 },
      0.25
    );

    const lines = section.querySelectorAll<HTMLElement>("h1 .block");
    tl.fromTo(lines,
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.12 },
      0.38
    );

    gsap.set(section.querySelectorAll<HTMLElement>(".hc"), { opacity: 1, y: 0 });

    tl.fromTo(".hero-sub",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.55 },
      0.75
    );

    tl.fromTo(".hero-cta",
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
      0.95
    );

    return () => { tl.kill(); };
  }, [prefersReduced]);

  useEffect(() => {
    const section    = sectionRef.current;
    const textBlock  = textBlockRef.current;
    const canvasBlock = canvasBlockRef.current;
    if (!section || !textBlock || !canvasBlock) return;
    if (prefersReduced) return;

    const tweenText = gsap.fromTo(textBlock,
      { y: 0, opacity: 1 },
      {
        y: -40,
        opacity: 0.0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "center top",
          scrub: 1.2,
        },
      }
    );

    const tweenCanvas = gsap.fromTo(canvasBlock,
      { y: 0, opacity: 1 },
      {
        y: -28,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "center top",
          scrub: 1.6,
        },
      }
    );

    return () => {
      tweenText.scrollTrigger?.kill();
      tweenCanvas.scrollTrigger?.kill();
      tweenText.kill();
      tweenCanvas.kill();
    };
  }, [prefersReduced]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      scrollProgress.current = Math.max(0, Math.min(1, -rect.top / window.innerHeight));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh flex items-center overflow-hidden bg-white"
    >
      <HeroAtmosphere prefersReduced={prefersReduced} />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.5] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT: text block */}
          <div
            ref={textBlockRef}
            className="lg:col-span-6 flex flex-col items-start"
            style={{ transformOrigin: "50% 40%" }}
          >
            {/* Eyebrow */}
            <p className="pld-1 hero-eye mb-7 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500 opacity-0">
              Everyday workflows, quietly done
            </p>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="pld-1 font-display font-light text-[#111111] leading-[1.03] tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(48px, 5.5vw, 88px)" }}
              aria-label="AI Assistant That Automates Your Routine Workflows"
            >
              <HeadlineLine text="AI Assistant That" delay={0} />
              <HeadlineLine text="Automates Your"    delay={0} />
              <HeadlineLine text="Routine Workflows" delay={0} />
            </h1>

            {/* Supporting line */}
            <p className="hero-sub opacity-0 text-[16px] text-gray-500 leading-relaxed max-w-md mb-10">
              Your finance, HR, revenue, and operations run in the background
              while you focus on what only you can decide.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <MagneticButton>
                <button className="hero-cta opacity-0 group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-semibold text-[14px] transition-all duration-200 shadow-lg shadow-orange-500/20 overflow-hidden">
                  <Play className="w-3.5 h-3.5 fill-white relative z-10" />
                  <span className="relative z-10">Watch Demo</span>
                  <div className="absolute inset-0 bg-linear-to-r from-orange-500 via-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-size-[200%_100%] group-hover:bg-right" />
                </button>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="#agents"
                  className="hero-cta opacity-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-black/[0.12] hover:border-orange-300 hover:bg-orange-50 text-[#111111] font-semibold text-[14px] transition-all duration-200"
                >
                  Try Now
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </MagneticButton>
            </div>

            {/* Trust micro-copy */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1, duration: 0.6 }}
              className="flex flex-wrap items-center gap-5 mt-8 text-[11px] text-gray-400"
            >
              {["No credit card", "Setup in 10 min", "2,000+ businesses"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <Zap className="w-2.5 h-2.5 text-orange-400" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: 3D orb canvas */}
          <div
            ref={canvasBlockRef}
            className="pld-2 lg:col-span-6 relative"
          >
            {/* Orb glow halo */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(249,115,22,0.10) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            <div
              className="relative w-full mx-auto"
              style={{ height: "clamp(360px, 52vw, 680px)", maxWidth: 680 }}
            >
              <HeroOrb prefersReduced={prefersReduced} scrollProgress={scrollProgress} />
            </div>

            {/* Floating chips */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="pld-4 absolute top-[12%] -left-4 lg:-left-10 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 backdrop-blur-xl border border-orange-100 shadow-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
              <span className="text-[11px] text-gray-700 font-medium">All agents live</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="pld-3 absolute bottom-[18%] -right-2 lg:-right-8 hidden sm:block px-3.5 py-2.5 rounded-xl bg-white/90 backdrop-blur-xl border border-orange-100 shadow-md"
            >
              <div className="text-[9px] text-gray-400 mono mb-0.5">tasks automated today</div>
              <div className="text-[15px] font-bold gradient-text">+1,247</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="pld-4 absolute bottom-[38%] -left-2 lg:-left-8 hidden lg:block px-3 py-2 rounded-xl bg-white/90 backdrop-blur-xl border border-orange-100 shadow-md"
            >
              <div className="text-[9px] text-gray-400 mono mb-0.5">time saved / month</div>
              <div className="text-[13px] font-bold text-[#111111]">94 hrs</div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 rounded-full overflow-hidden bg-black/10"
        >
          <div className="w-full h-1/2 bg-linear-to-b from-orange-400/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
