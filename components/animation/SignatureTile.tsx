"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Character set — "data / flow / network" vocabulary */
const CHARS = ["·", ":", "+", "×", "◦", "▪", "▫", "○", "∙", "/"];
const COLS  = 32;
const ROWS  = 32;
const TOTAL = COLS * ROWS; // 1024

/* Deterministic PRNG — avoids hydration mismatch */
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function SignatureTile() {
  const sectionRef  = useRef<HTMLElement | null>(null);
  const tileRef     = useRef<HTMLDivElement | null>(null);
  const gridRef     = useRef<HTMLDivElement | null>(null);
  const logoWrapRef = useRef<HTMLDivElement | null>(null);
  const taglineRef  = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section  = sectionRef.current;
    const tile     = tileRef.current;
    const grid     = gridRef.current;
    const logoWrap = logoWrapRef.current;
    const tagline  = taglineRef.current;
    if (!section || !tile || !grid || !logoWrap || !tagline) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ── Reduced-motion static fallback ── */
    if (prefersReduced) {
      section.style.minHeight = "60vh";
      tile.style.opacity    = "1";
      tile.style.transform  = "scale(1)";
      tagline.style.opacity = "1";
      const p = tagline.children[1] as HTMLElement;
      if (p) p.textContent = "Every agent. Every workflow.";
      return;
    }

    const isMobile = window.innerWidth < 768;

    /* ── 1. Build character grid (imperative — no hydration risk) ── */
    const rand = mulberry32(42);
    const cells: HTMLElement[] = [];

    const gridInner = document.createElement("div");
    Object.assign(gridInner.style, {
      display: "grid",
      gridTemplateColumns: `repeat(${COLS}, 1fr)`,
      gridTemplateRows: `repeat(${ROWS}, 1fr)`,
      width:  "100%",
      height: "100%",
    });

    for (let i = 0; i < TOTAL; i++) {
      const col    = i % COLS;
      const r      = rand();
      const ch     = CHARS[Math.floor(rand() * CHARS.length)];
      const span   = document.createElement("span");
      const isEdge = col < 6 || col > 25;

      span.textContent = ch;
      Object.assign(span.style, {
        fontFamily:    "monospace",
        fontSize:      "11px",
        lineHeight:    "1",
        display:       "flex",
        alignItems:    "center",
        justifyContent:"center",
        opacity:       "0",
        userSelect:    "none",
        pointerEvents: "none",
        /* Colours assigned once at mount */
        color: isEdge
          ? "rgba(0,0,0,0.08)"
          : r < 0.04
            ? "rgba(249,115,22,0.9)"   /* BRAND_PRIMARY ~4% */
            : r < 0.12
              ? "rgba(253,186,116,0.9)" /* BRAND_ACCENT  ~8% */
              : "rgba(0,0,0,0.22)",
      });

      cells.push(span);
      gridInner.appendChild(span);
    }
    grid.appendChild(gridInner);

    /* ── 2. Build tagline chars (imperative) ── */
    const tagline1 = tagline.children[0] as HTMLElement;
    const tagline2 = tagline.children[1] as HTMLElement;
    const LINE2    = "Every agent. Every workflow.";
    const charEls: HTMLElement[] = [];

    tagline2.innerHTML = "";
    LINE2.split("").forEach(ch => {
      const s = document.createElement("span");
      Object.assign(s.style, {
        display:   "inline-block",
        opacity:   "0",
        transform: "translateY(8px)",
      });
      s.textContent = ch === " " ? " " : ch;
      charEls.push(s);
      tagline2.appendChild(s);
    });

    /* ── 3. Pre-compute per-cell thresholds ── */
    interface Threshold {
      fadeInStart:  number;
      fadeInEnd:    number;
      fadeOutStart: number;
      fadeOutEnd:   number;
    }
    const thresholds: Threshold[] = cells.map((_, i) => {
      const col    = (i % COLS) / (COLS - 1); // 0..1
      const isEdge = (i % COLS) < 6 || (i % COLS) > 25;
      return {
        fadeInStart:  0.15 + col * 0.30,
        fadeInEnd:    0.15 + col * 0.30 + 0.025,
        fadeOutStart: 0.55 + col * 0.30,
        fadeOutEnd:   0.55 + col * 0.30 + (isEdge ? 0.015 : 0.025),
      };
    });

    /* ── 4. Identify accent-pulse cells (never colour-animate, only scale) ── */
    const accentCells = isMobile ? [] : cells.filter((_, i) => ((i * 13 + 7) % 97) / 97 < 0.08);

    /* ── 5. Initial CSS states ── */
    tile.style.opacity   = "0";
    tile.style.transform = "scale(0.85)";
    tagline.style.opacity = "0";
    tagline1.style.opacity  = "0";
    tagline1.style.transform = "translateY(12px)";

    /* ── 6. ScrollTrigger ── */
    let accentTween: gsap.core.Tween | null = null;

    const trigger = ScrollTrigger.create({
      trigger:      section,
      start:        "top top",
      end:          "+=150%",
      pin:          true,
      pinSpacing:   true,
      scrub:        0.5,
      anticipatePin: 1,

      onEnter()     { tile.style.willChange = "transform, opacity"; grid.style.willChange = "opacity"; },
      onEnterBack() { tile.style.willChange = "transform, opacity"; grid.style.willChange = "opacity"; },
      onLeave()     { tile.style.willChange = "auto"; grid.style.willChange = "auto"; killAccent(); },
      onLeaveBack() { tile.style.willChange = "auto"; grid.style.willChange = "auto"; killAccent(); },

      onUpdate(self) {
        const p = self.progress;

        /* ── Tile entrance 0 → 0.15 ── */
        if (p < 0.15) {
          const t = p / 0.15;
          tile.style.transform = `scale(${(0.85 + t * 0.15).toFixed(4)})`;
          tile.style.opacity   = t.toFixed(4);
          // Keep everything else hidden
          for (let i = 0; i < cells.length; i++) cells[i].style.opacity = "0";
          tagline.style.opacity = "0";
          return;
        }

        tile.style.transform = "scale(1)";
        tile.style.opacity   = "1";

        /* ── Logo mask ── */
        let mr: number;
        if      (p < 0.45) mr = 1 - ((p - 0.15) / 0.30) * 0.80; // 1.0 → 0.20
        else if (p < 0.55) mr = 0.20;
        else if (p < 0.85) mr = 0.20 + ((p - 0.55) / 0.30) * 0.80; // 0.20 → 1.0
        else               mr = 1;

        const pct  = (mr * 100).toFixed(1) + "%";
        const mask = `linear-gradient(to right, black ${pct}, transparent ${pct})`;
        logoWrap.style.setProperty("mask-image", mask);
        logoWrap.style.setProperty("-webkit-mask-image", mask);

        /* ── Cell opacities ── */
        for (let i = 0; i < cells.length; i++) {
          const th = thresholds[i];
          let op: number;
          if      (p < th.fadeInStart)   op = 0;
          else if (p < th.fadeInEnd)     op = (p - th.fadeInStart)  / (th.fadeInEnd  - th.fadeInStart);
          else if (p < th.fadeOutStart)  op = 1;
          else if (p < th.fadeOutEnd)    op = 1 - (p - th.fadeOutStart) / (th.fadeOutEnd - th.fadeOutStart);
          else                           op = 0;
          cells[i].style.opacity = op.toFixed(3);
        }

        /* ── Accent pulse 0.44 → 0.56 ── */
        if (p >= 0.44 && p <= 0.56) {
          if (!accentTween && accentCells.length) {
            accentTween = gsap.to(accentCells, {
              scale:    1.3,
              duration: 0.2,
              repeat:   -1,
              yoyo:     true,
              stagger:  { each: 0.06, from: "random" },
            });
          }
        } else {
          killAccent();
        }

        /* ── Tagline 0.85 → 1.0 ── */
        if (p >= 0.85) {
          const t2 = Math.min(1, (p - 0.85) / 0.15);
          tagline.style.opacity    = "1";
          tagline1.style.opacity   = t2.toFixed(3);
          tagline1.style.transform = `translateY(${(12 * (1 - t2)).toFixed(2)}px)`;

          charEls.forEach((el, i) => {
            /* Each char unlocks after the previous one, staggered by 0.5 / charCount */
            const charT = Math.max(0, Math.min(1, (t2 - (i / charEls.length) * 0.55) / 0.15));
            el.style.opacity   = charT.toFixed(3);
            el.style.transform = `translateY(${((1 - charT) * 8).toFixed(2)}px)`;
          });
        } else {
          tagline.style.opacity = "0";
          charEls.forEach(el => { el.style.opacity = "0"; el.style.transform = "translateY(8px)"; });
        }
      },
    });

    function killAccent() {
      if (accentTween) {
        accentTween.kill();
        accentTween = null;
        gsap.set(accentCells, { scale: 1 });
      }
    }

    return () => {
      trigger.kill();
      killAccent();
      if (grid.contains(gridInner)) grid.removeChild(gridInner);
    };
  }, []);

  return (
    /*
     * height: 100vh (not min-h-screen) so GSAP pin gets an exact viewport-height
     * anchor. overflow-x: clip instead of hidden so box-shadows and the 150% grid
     * trail aren't cut off vertically, only horizontally.
     * isolation: isolate creates a new stacking context so the pinned section
     * composites correctly against the sections that scroll over it.
     */
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center"
      style={{
        height:     "100vh",
        background: "#f3f0eb",
        overflowX:  "clip",
        isolation:  "isolate",
      }}
      aria-label="Pushable AI — brand signature"
    >
      {/* Subtle radial bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-[80px]" />
      </div>

      {/* Tile wrapper — grid overlay + card share this positioning context */}
      <div ref={tileRef} className="relative" style={{ opacity: 0 }}>

        {/* Character grid: 150% wide, centered, sits above the card (z-10).
            overflow: visible so the trail extends past the tile edges. */}
        <div
          ref={gridRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-10"
          style={{ width: "150%", height: "100%", overflow: "visible" }}
          aria-hidden="true"
        />

        {/* Tile card */}
        <div
          className="relative z-0 rounded-[32px] bg-white border border-black/10 flex items-center justify-center"
          style={{
            width:     "clamp(220px, 20vw, 280px)",
            height:    "clamp(220px, 20vw, 280px)",
            boxShadow: "0 24px 60px -12px rgba(249,115,22,0.25)",
          }}
        >
          {/* Logo mark — mask-image drives the dissolution reveal */}
          <div
            ref={logoWrapRef}
            style={{ width: "60%", height: "60%" }}
            aria-label="Pushable AI mark"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo-mark.svg"
              alt=""
              className="w-full h-full"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Tagline — revealed at scroll progress 0.85+ */}
      <div
        ref={taglineRef}
        className="mt-16 text-center select-none"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <p className="text-gray-400 uppercase tracking-[0.2em] text-xs mb-2">
          ONE PLATFORM
        </p>
        {/* Characters injected imperatively in useEffect */}
        <h3 className="text-[#111111] text-xl font-bold tracking-tight" />
      </div>
    </section>
  );
}
