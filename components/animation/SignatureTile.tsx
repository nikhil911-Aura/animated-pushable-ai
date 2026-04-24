"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHARS = ["Â·", ":", "+", "Ã—", "â—¦", "â–¸", "â–«", "â—‹", "âˆ™", "/", "â€”", "~", "â–ª"];
const COLS  = 52;
const ROWS  = 22;
const TOTAL = COLS * ROWS;

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Words: [text, isOrange, isItalic] */
const LINE1 = [
  ["Automate",  true,  true ],
  ["the",       false, false],
  ["routine.",  true,  true ],
] as const;
const LINE2 = [
  ["Accelerate", false, false],
  ["what",       false, false],
  ["matters.",   true,  true ],
] as const;

const STATS = [
  { value: "2,000+", label: "Businesses" },
  { value: "94 hrs", label: "Saved / Month" },
  { value: "99.8%",  label: "Accuracy" },
];

export default function SignatureTile() {
  const sectionRef  = useRef<HTMLElement | null>(null);
  const gridRef     = useRef<HTMLDivElement | null>(null);
  const overlineRef = useRef<HTMLParagraphElement | null>(null);
  const line1Ref    = useRef<HTMLDivElement | null>(null);
  const line2Ref    = useRef<HTMLDivElement | null>(null);
  const rulerRef    = useRef<HTMLDivElement | null>(null);
  const statsRef    = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section  = sectionRef.current;
    const grid     = gridRef.current;
    const overline = overlineRef.current;
    const line1    = line1Ref.current;
    const line2    = line2Ref.current;
    const ruler    = rulerRef.current;
    const stats    = statsRef.current;
    if (!section || !grid) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* â”€â”€ Build full-viewport character grid â”€â”€ */
    const rand      = mulberry32(42);
    const cells: HTMLElement[] = [];
    const gridInner = document.createElement("div");
    const cX = COLS / 2;
    const cY = ROWS / 2;
    const maxD = Math.sqrt(cX * cX + cY * cY);

    Object.assign(gridInner.style, {
      display:             "grid",
      gridTemplateColumns: `repeat(${COLS}, 1fr)`,
      gridTemplateRows:    `repeat(${ROWS}, 1fr)`,
      width:  "100%",
      height: "100%",
    });

    const dists: number[] = [];

    for (let i = 0; i < TOTAL; i++) {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const r   = rand();
      const ch  = CHARS[Math.floor(rand() * CHARS.length)];
      const span = document.createElement("span");

      const dist  = Math.sqrt((col - cX) ** 2 + (row - cY) ** 2) / maxD;
      const isOrange = r < (0.07 - dist * 0.05);
      const isAccent = !isOrange && r < 0.18;

      span.textContent = ch;
      Object.assign(span.style, {
        fontFamily:     "monospace",
        fontSize:       "11px",
        lineHeight:     "1",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        opacity:        prefersReduced ? "0.35" : "0",
        userSelect:     "none",
        pointerEvents:  "none",
        color: isOrange
          ? "rgba(232,0,29,0.9)"
          : isAccent
            ? "rgba(0,0,0,0.22)"
            : "rgba(0,0,0,0.09)",
      });

      dists.push(dist);
      cells.push(span);
      gridInner.appendChild(span);
    }
    grid.appendChild(gridInner);

    /* â”€â”€ Set initial CSS states for content â”€â”€ */
    const allWords = [
      ...(line1 ? Array.from(line1.querySelectorAll<HTMLElement>("[data-w]")) : []),
      ...(line2 ? Array.from(line2.querySelectorAll<HTMLElement>("[data-w]")) : []),
    ];

    if (overline)  { overline.style.opacity = "0"; overline.style.transform = "translateY(10px)"; }
    allWords.forEach(w => { w.style.opacity = "0"; w.style.transform = "translateY(18px)"; w.style.filter = "blur(5px)"; });
    if (ruler)  ruler.style.width  = "0px";
    if (stats) {
      Array.from(stats.querySelectorAll<HTMLElement>("[data-s]")).forEach(s => {
        s.style.opacity   = "0";
        s.style.transform = "translateY(14px)";
      });
    }

    if (prefersReduced) {
      /* Show everything statically */
      if (overline)  { overline.style.opacity = "1"; overline.style.transform = "none"; }
      allWords.forEach(w => { w.style.opacity = "1"; w.style.transform = "none"; w.style.filter = "none"; });
      if (ruler)  ruler.style.width = "160px";
      if (stats) Array.from(stats.querySelectorAll<HTMLElement>("[data-s]")).forEach(s => { s.style.opacity = "1"; s.style.transform = "none"; });
      return () => { if (grid.contains(gridInner)) grid.removeChild(gridInner); };
    }

    /* â”€â”€ Threshold per cell: ripple from center â”€â”€ */
    const thresholds = dists.map(d => ({
      start: 0.06 + d * 0.24,
      end:   0.06 + d * 0.24 + 0.05,
    }));

    /* â”€â”€ One-shot triggered tweens â”€â”€ */
    let firedOverline = false;
    let firedWords    = false;
    let firedRuler    = false;
    let firedStats    = false;

    function fireOverline(p: number) {
      if (firedOverline || p < 0.28 || !overline) return;
      firedOverline = true;
      gsap.to(overline, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" });
    }
    function fireWords(p: number) {
      if (firedWords || p < 0.32) return;
      firedWords = true;
      gsap.to(allWords, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power2.out", stagger: 0.1, delay: 0.08 });
    }
    function fireRuler(p: number) {
      if (firedRuler || p < 0.56 || !ruler) return;
      firedRuler = true;
      gsap.to(ruler, { width: "160px", duration: 0.9, ease: "power3.out" });
    }
    function fireStats(p: number) {
      if (firedStats || p < 0.64 || !stats) return;
      firedStats = true;
      const items = stats.querySelectorAll<HTMLElement>("[data-s]");
      gsap.to(items, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", stagger: 0.13 });
    }

    /* â”€â”€ ScrollTrigger â”€â”€ */
    const trigger = ScrollTrigger.create({
      trigger:       section,
      start:         "top top",
      end:           "+=150%",
      pin:           true,
      pinSpacing:    true,
      scrub:         0.6,
      anticipatePin: 1,

      onEnter()     { section.style.willChange = "transform"; },
      onLeave()     { section.style.willChange = "auto"; },
      onLeaveBack() { section.style.willChange = "auto"; },

      onUpdate(self) {
        const p = self.progress;

        for (let i = 0; i < cells.length; i++) {
          const th = thresholds[i];
          if      (p < th.start) cells[i].style.opacity = "0";
          else if (p < th.end)   cells[i].style.opacity = ((p - th.start) / (th.end - th.start)).toFixed(3);
          else                   cells[i].style.opacity = "1";
        }

        fireOverline(p);
        fireWords(p);
        fireRuler(p);
        fireStats(p);
      },
    });

    return () => {
      trigger.kill();
      if (grid.contains(gridInner)) grid.removeChild(gridInner);
    };
  }, []);

  const serif = "var(--font-instrument-serif)";
  const sans  = "var(--font-inter)";

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center"
      style={{ height: "100vh", background: "#f3f0eb", overflow: "hidden", isolation: "isolate" }}
      aria-label="Pushable AI â€” brand statement"
    >
      {/* Full-viewport character grid */}
      <div ref={gridRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Radial centre glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-160 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,0,29,0.09) 0%, transparent 65%)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 select-none">

        {/* Overline */}
        <p
          ref={overlineRef}
          className="text-[11px] font-semibold tracking-[0.28em] uppercase text-brand-400 mb-7"
          style={{ fontFamily: sans }}
        >
          One Platform Â· All Your Workflows
        </p>

        {/* Headline line 1 */}
        <div ref={line1Ref} className="leading-none mb-1">
          {LINE1.map(([text, orange, italic], i) => (
            <span
              key={i}
              data-w
              className="inline-block"
              style={{
                fontFamily:  serif,
                fontSize:    "clamp(44px, 7vw, 88px)",
                fontWeight:  700,
                letterSpacing: "-2.5px",
                color:       orange ? "#E8001D" : "#111111",
                fontStyle:   italic ? "italic" : "normal",
                marginRight: "0.22em",
              }}
            >
              {text}
            </span>
          ))}
        </div>

        {/* Headline line 2 */}
        <div ref={line2Ref} className="leading-none">
          {LINE2.map(([text, orange, italic], i) => (
            <span
              key={i}
              data-w
              className="inline-block"
              style={{
                fontFamily:  serif,
                fontSize:    "clamp(44px, 7vw, 88px)",
                fontWeight:  700,
                letterSpacing: "-2.5px",
                color:       orange ? "#E8001D" : "#111111",
                fontStyle:   italic ? "italic" : "normal",
                marginRight: "0.22em",
              }}
            >
              {text}
            </span>
          ))}
        </div>

        {/* Orange ruler */}
        <div
          ref={rulerRef}
          className="h-px rounded-full mt-9 mb-8"
          style={{ background: "linear-gradient(to right, transparent, #E8001D, #FF2D42, transparent)", width: 0 }}
        />

        {/* Stats */}
        <div ref={statsRef} className="flex items-center gap-10 sm:gap-16">
          {STATS.map((s, i) => (
            <div key={i} data-s className="text-center">
              <div
                className="text-2xl sm:text-3xl font-bold text-[#111111]"
                style={{ fontFamily: serif }}
              >
                {s.value}
              </div>
              <div
                className="text-[10px] uppercase tracking-widest text-gray-400 mt-1"
                style={{ fontFamily: sans }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
