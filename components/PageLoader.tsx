"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const COLS = 16;
const ROWS = 9;
const TOTAL = COLS * ROWS;
const HOLD_MS = 2200;

export default function PageLoader() {
  const wrapRef  = useRef<HTMLDivElement | null>(null);
  const textRef  = useRef<HTMLDivElement | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return;

    /* Prevent page scroll while loader is active */
    document.body.style.overflow = "hidden";

    /* â”€â”€ Text entrance â”€â”€ */
    gsap.fromTo(
      text,
      { opacity: 0, y: 18, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out", delay: 0.25 }
    );

    /* â”€â”€ Tile exit after hold â”€â”€ */
    const timer = setTimeout(() => {
      /* Text fades out just before tiles dissolve */
      gsap.to(text, { opacity: 0, y: -10, filter: "blur(6px)", duration: 0.4, ease: "power2.in" });

      gsap.to(wrap.querySelectorAll<HTMLElement>(".l-tile"), {
        opacity: 0,
        duration: 0.35,
        stagger: { amount: 0.55, from: "random" },
        ease: "power1.in",
        onComplete: () => {
          document.body.style.overflow = "";
          setDone(true);
        },
      });
    }, HOLD_MS);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      style={{ background: "#111111" }}
    >
      {/* â”€â”€ Tile grid â”€â”€ */}
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
            style={{ background: "#111111", borderRight: "1px solid rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.03)" }}
          />
        ))}
      </div>

      {/* â”€â”€ Center brand â”€â”€ */}
      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center text-center select-none"
        style={{ opacity: 0 }}
      >
        {/* Logo */}
        <div className="mb-6">
          <Image src="/brand/logo.png" alt="Pushable AI" width={180} height={42} className="h-10 w-auto" priority />
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily:    "var(--font-inter)",
            fontSize:      "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color:         "rgba(255,255,255,0.35)",
            marginTop:     "4px",
          }}
        >
          Automate the routine
        </p>

        {/* Thin progress line */}
        <div
          className="mt-8 h-px rounded-full overflow-hidden"
          style={{ width: "120px", background: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(to right, #E8001D, #FF2D42)",
              animation:  `loader-bar ${HOLD_MS}ms linear forwards`,
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loader-bar {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </div>
  );
}
