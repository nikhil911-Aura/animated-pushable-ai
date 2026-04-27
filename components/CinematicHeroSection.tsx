"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { MagneticButton, CountUp } from "@/components/animation";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";

const FADE_DUR = 0.5;

/* Headline broken into individually-styled word tokens */
const HEADLINE = [
  { text: "AI",         color: "#000000", italic: false },
  { text: "Assistant",  color: "#000000", italic: false },
  { text: "That",       color: "#000000", italic: false },
  { text: "Automates",  color: "#E8001D", italic: true  },
  { text: "Your",       color: "#000000", italic: false },
  { text: "Routine",    color: "#E8001D", italic: true  },
  { text: "Workflows",  color: "#E8001D", italic: true  },
];

const STATS = [
  { to: 200, suffix: "+", label: "Clients worldwide"  },
  { to: 99,  suffix: "%", label: "Uptime guaranteed"  },
  { to: 4.9, suffix: "â˜…", label: "Average rating", decimals: 1 },
];

/* â”€â”€ Video with RAF fade-in/out loop â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafId    = useRef<number>(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    function tick() {
      if (!v) return;
      if (v.duration) {
        const { currentTime, duration } = v;
        let op = 1;
        if (currentTime < FADE_DUR) op = currentTime / FADE_DUR;
        else if (currentTime > duration - FADE_DUR) op = (duration - currentTime) / FADE_DUR;
        v.style.opacity = String(Math.max(0, Math.min(1, op)));
      }
      rafId.current = requestAnimationFrame(tick);
    }

    function onEnded() {
      if (!v) return;
      v.style.opacity = "0";
      setTimeout(() => { if (!v) return; v.currentTime = 0; v.play(); }, 100);
    }

    v.addEventListener("ended", onEnded);
    rafId.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafId.current); v?.removeEventListener("ended", onEnded); };
  }, []);

  return (
    <video
      ref={videoRef}
      src={VIDEO_URL}
      autoPlay muted playsInline
      className="absolute right-0 bottom-0 left-0 w-full h-full object-cover"
      style={{ top: "300px", opacity: 0 }}
    />
  );
}

/* â”€â”€ Ambient floating blobs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function AmbientBlobs() {
  const b1 = useRef<HTMLDivElement>(null);
  const b2 = useRef<HTMLDivElement>(null);
  const b3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(b1.current, { x: 40, y: -30, duration: 7,  repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(b2.current, { x: -30, y: 40, duration: 9,  repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(b3.current, { x: 20, y: 25,  duration: 6,  repeat: -1, yoyo: true, ease: "sine.inOut" });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div ref={b1} className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-[90px]"
        style={{ background: "rgba(232,0,29,0.07)" }} />
      <div ref={b2} className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-[110px]"
        style={{ background: "rgba(255,45,66,0.06)" }} />
      <div ref={b3} className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full blur-[80px]"
        style={{ background: "rgba(255,128,149,0.05)" }} />
    </div>
  );
}

/* â”€â”€ Scroll indicator â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      aria-hidden="true"
    >
      <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400"
        style={{ fontFamily: "var(--font-inter)" }}>
        Scroll
      </span>
      <motion.div
        className="w-px h-10 bg-gradient-to-b from-brand-400 to-transparent origin-top"
        animate={{ scaleY: [0, 1, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }}
      />
    </motion.div>
  );
}

/* â”€â”€ Main export â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function CinematicHeroSection() {
  const serif = "var(--font-instrument-serif)";
  const sans  = "var(--font-inter)";

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ background: "#FFFFFF" }}
    >
      {/* â”€â”€ Layers: video â†’ blobs â†’ gradient â”€â”€ */}
      <div className="absolute inset-0 z-0">
        <VideoBackground />
        <AmbientBlobs />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, #ffffff 0%, transparent 35%, transparent 65%, #ffffff 100%)" }}
        />
      </div>

      {/* â”€â”€ Hero content â”€â”€ */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full max-w-5xl mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0,   filter: "blur(0px)" }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
          style={{
            fontFamily: sans,
            fontSize: 12,
            letterSpacing: "0.04em",
            borderColor: "rgba(232,0,29,0.25)",
            background: "rgba(232,0,29,0.06)",
            color: "#CC001A",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          Now live — automating workflows for 2,000+ businesses
        </motion.div>

        {/* Headline — word-by-word stagger with blur slide-in */}
        <h1
          className="font-normal mb-0 text-5xl sm:text-7xl md:text-8xl max-w-4xl"
          style={{ fontFamily: serif, lineHeight: 0.95, letterSpacing: "-2.46px" }}
        >
          {HEADLINE.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
              transition={{ delay: 0.25 + i * 0.09, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display:    "inline-block",
                color:      word.color,
                fontStyle:  word.italic ? "italic" : "normal",
                marginRight: "0.25em",
              }}
            >
              {word.text}
            </motion.span>
          ))}
        </h1>

        {/* Description */}
        <motion.p
          className="text-base sm:text-lg max-w-2xl mt-8 leading-relaxed"
          style={{ fontFamily: sans, color: "#6F6F6F" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Your AI assistant quietly handles emails, follow-ups, reports, and
          repetitive tasks in the background — so your team can focus on
          work that actually grows your business.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3 mt-10"
        >
          <MagneticButton maxDistance={14}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="text-base rounded-full px-10 py-4 cursor-pointer"
              style={{ fontFamily: sans, background: "#E8001D", color: "#FFFFFF" }}
            >
              Watch Demo
            </motion.button>
          </MagneticButton>
          <MagneticButton maxDistance={14}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="text-base rounded-full px-10 py-4 cursor-pointer border"
              style={{ fontFamily: sans, borderColor: "rgba(0,0,0,0.14)", color: "#111111", background: "transparent" }}
            >
              Try Now
            </motion.button>
          </MagneticButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-10 mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35, duration: 0.7 }}
        >
          {STATS.map(({ to, suffix, label, decimals = 0 }, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="text-3xl font-bold" style={{ fontFamily: serif, color: "#000000" }}>
                <CountUp to={to} suffix={suffix} decimals={decimals} />
              </div>
              <div className="text-xs tracking-widest uppercase" style={{ fontFamily: sans, color: "#9CA3AF" }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* â”€â”€ Scroll indicator â”€â”€ */}
      <ScrollIndicator />
    </section>
  );
}
