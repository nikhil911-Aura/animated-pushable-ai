"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const COLS    = 16;
const ROWS    = 9;
const TOTAL   = COLS * ROWS;
const HOLD_MS = 2400;

export default function PageLoader() {
  const wrapRef     = useRef<HTMLDivElement | null>(null);
  const logoRef     = useRef<HTMLDivElement | null>(null);
  const taglineRef  = useRef<HTMLParagraphElement | null>(null);
  const scanlineRef = useRef<HTMLDivElement | null>(null);
  const barInnerRef = useRef<HTMLDivElement | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const wrap     = wrapRef.current;
    const logo     = logoRef.current;
    const tagline  = taglineRef.current;
    const scanline = scanlineRef.current;
    const barInner = barInnerRef.current;
    if (!wrap || !logo || !tagline || !scanline || !barInner) return;

    document.body.style.overflow = "hidden";

    /* ── CRT flicker → glitch → settle timeline ──────────────── */
    const tl = gsap.timeline();

    /* 1. Flicker: rapid on/off like a CRT powering up */
    tl.set([logo, tagline, scanline], { opacity: 0 })
      .to(logo, { opacity: 0.9, duration: 0.04, delay: 0.28 })
      .to(logo, { opacity: 0,   duration: 0.04 })
      .to(logo, { opacity: 0.8, duration: 0.06 })
      .to(logo, { opacity: 0,   duration: 0.03 })
      .to(logo, { opacity: 1,   duration: 0.05 })
      .to(logo, { opacity: 0,   duration: 0.04 })
      .to(logo, { opacity: 0.95,duration: 0.07 })
      .to(logo, { opacity: 0,   duration: 0.03 })
      .to(logo, { opacity: 1,   duration: 0.04 });

    /* 2. Glitch: brief lateral jitter + brightness spike */
    tl.to(logo, { x: -5, filter: "brightness(1.6)", duration: 0.04, ease: "none" })
      .to(logo, { x:  4, filter: "brightness(0.7)", duration: 0.04, ease: "none" })
      .to(logo, { x: -2, filter: "brightness(1.3)", duration: 0.03, ease: "none" })
      .to(logo, { x:  0, filter: "brightness(1)",   duration: 0.08, ease: "power2.out" });

    /* 3. Scanline sweeps over logo */
    tl.to(scanline, {
      opacity:  0.45,
      duration: 0.06,
    })
    .to(scanline, {
      top:      "58%",
      opacity:  0,
      duration: 0.38,
      ease:     "power1.in",
    }, "+=0");

    /* 4. Tagline + progress bar slide in */
    tl.fromTo(
      tagline,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
      "-=0.2"
    );

    /* 5. Progress bar fills over HOLD_MS */
    gsap.fromTo(
      barInner,
      { width: "0%" },
      { width: "100%", duration: HOLD_MS / 1000, ease: "none" }
    );

    /* ── Exit: text out → tiles dissolve ─────────────────────── */
    const timer = setTimeout(() => {
      gsap.to([logo, tagline], {
        opacity: 0,
        y: -10,
        filter: "blur(5px)",
        duration: 0.38,
        ease: "power2.in",
      });

      gsap.to(wrap.querySelectorAll<HTMLElement>(".l-tile"), {
        opacity:  0,
        duration: 0.4,
        stagger:  { amount: 0.6, from: "random" },
        ease:     "power1.in",
        delay:    0.15,
        onComplete: () => {
          document.body.style.overflow = "";
          setDone(true);
        },
      });
    }, HOLD_MS);

    return () => {
      clearTimeout(timer);
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-99999 overflow-hidden"
      style={{ background: "#0e0e0e" }}
    >
      {/* ── Tile grid ── */}
      <div
        className="absolute inset-0 grid pointer-events-none"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows:    `repeat(${ROWS}, 1fr)`,
        }}
        aria-hidden="true"
      >
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div
            key={i}
            className="l-tile"
            style={{
              background:   "#0e0e0e",
              borderRight:  "1px solid rgba(255,255,255,0.045)",
              borderBottom: "1px solid rgba(255,255,255,0.045)",
            }}
          />
        ))}
      </div>

      {/* ── Scanline (starts at top of logo area) ── */}
      <div
        ref={scanlineRef}
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top:       "42%",
          height:    "1px",
          background:"linear-gradient(to right, transparent 5%, rgba(255,255,255,0.7) 35%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.7) 65%, transparent 95%)",
          opacity:   0,
        }}
        aria-hidden="true"
      />

      {/* ── Subtle center glow ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width:      560,
          height:     300,
          background: "radial-gradient(ellipse at center, rgba(232,0,29,0.07) 0%, transparent 65%)",
          borderRadius: "50%",
        }}
        aria-hidden="true"
      />

      {/* ── Center brand content ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Logo — flickered in by GSAP */}
        <div
          ref={logoRef}
          className="select-none"
          style={{ opacity: 0 }}
        >
          <Image
            src="/brand/logo.png"
            alt="Pushable AI"
            width={200}
            height={48}
            className="h-11 w-auto"
            priority
          />
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="mt-5 select-none"
          style={{
            fontFamily:    "var(--font-inter)",
            fontSize:      "10px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color:         "rgba(255,255,255,0.32)",
            opacity:       0,
          }}
        >
          Automate the routine
        </p>

        {/* Progress bar */}
        <div
          className="mt-7 rounded-full overflow-hidden"
          style={{ width: 110, height: "1px", background: "rgba(255,255,255,0.08)" }}
        >
          <div
            ref={barInnerRef}
            className="h-full rounded-full"
            style={{
              width:      "0%",
              background: "linear-gradient(to right, #E8001D, #FF2D42)",
            }}
          />
        </div>
      </div>

      {/* Inline keyframe for bar (fallback) */}
      <style>{`
        @keyframes loader-bar { from { width: 0% } to { width: 100% } }
      `}</style>
    </div>
  );
}
