"use client";
import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScrollProvider } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function AnimationShell({ children }: { children: ReactNode }) {
  const barRef  = useRef<HTMLDivElement | null>(null);
  const dotRef  = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  /* ── Scroll progress bar ─────────────────────────────────── */
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    ScrollTrigger.create({
      start: 0, end: "max", scrub: 0.3,
      onUpdate: (self) => { bar.style.transform = `scaleX(${self.progress})`; },
    });
  }, []);

  /* ── Global depth-parallax CSS vars ─────────────────────── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const raw    = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    const LERP   = 0.065;
    const MAX    = [0.8, 2, 4, 6, 9] as const;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      raw.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      raw.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const tick = () => {
      smooth.x += (raw.x - smooth.x) * LERP;
      smooth.y += (raw.y - smooth.y) * LERP;
      const r = document.documentElement;
      MAX.forEach((m, i) => {
        r.style.setProperty(`--pld${i}-x`, `${(smooth.x * m).toFixed(2)}px`);
        r.style.setProperty(`--pld${i}-y`, `${(smooth.y * m).toFixed(2)}px`);
      });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  /* ── Dual-layer cursor ───────────────────────────────────── */
  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    dot.style.opacity  = "0";
    ring.style.opacity = "0";
    document.body.style.cursor = "none";

    /* quickTo setters — dot is instant, ring lags */
    const dotX  = gsap.quickTo(dot,  "x", { duration: 0.04, ease: "none" });
    const dotY  = gsap.quickTo(dot,  "y", { duration: 0.04, ease: "none" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let visible = false;

    function show() {
      if (visible) return;
      visible = true;
      gsap.to([dot, ring], { opacity: 1, duration: 0.3, ease: "power2.out" });
    }
    function hide() {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.25, ease: "power2.in" });
    }

    function onMove(e: MouseEvent) {
      dotX(e.clientX); dotY(e.clientY);
      ringX(e.clientX); ringY(e.clientY);
      show();
    }

    /* Hover detection via delegation */
    const SELECTOR = "a, button, [role='button'], input, textarea, select, label";
    function onOver(e: MouseEvent) {
      if ((e.target as HTMLElement).closest(SELECTOR)) {
        gsap.to(dot,  { scale: 0,   duration: 0.2, ease: "power2.out" });
        gsap.to(ring, {
          scale: 1.7,
          borderColor: "#f97316",
          backgroundColor: "rgba(249,115,22,0.08)",
          duration: 0.35,
          ease: "power2.out",
        });
      }
    }
    function onOut(e: MouseEvent) {
      if ((e.target as HTMLElement).closest(SELECTOR)) {
        gsap.to(dot,  { scale: 1, duration: 0.35, ease: "elastic.out(1,0.5)" });
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(249,115,22,0.55)",
          backgroundColor: "transparent",
          duration: 0.35,
          ease: "power2.out",
        });
      }
    }

    /* Click pulse */
    function onDown() {
      gsap.to(ring, { scale: 0.75, duration: 0.12, ease: "power2.in" });
      gsap.to(dot,  { scale: 0.6,  duration: 0.12, ease: "power2.in" });
    }
    function onUp() {
      gsap.to(ring, { scale: 1, duration: 0.5, ease: "elastic.out(1,0.4)" });
      gsap.to(dot,  { scale: 1, duration: 0.4, ease: "elastic.out(1,0.5)" });
    }

    window.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("mouseover",  onOver);
    window.addEventListener("mouseout",   onOut);
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);
    document.documentElement.addEventListener("mouseleave", hide);
    document.documentElement.addEventListener("mouseenter", show);

    return () => {
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseover",  onOver);
      window.removeEventListener("mouseout",   onOut);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.removeEventListener("mouseenter", show);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <SmoothScrollProvider>
      {/* Scroll progress bar */}
      <div
        ref={barRef}
        className="fixed top-0 left-0 right-0 h-[1px] z-[9999] origin-left"
        style={{ background: "#fdba74", transform: "scaleX(0)" }}
        aria-hidden="true"
      />

      {/* Cursor — inner dot (precise) */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-9999 rounded-full"
        style={{
          width: 6, height: 6,
          background: "#f97316",
          left: 0, top: 0,
          transform: "translate(-50%,-50%)",
          willChange: "transform",
          boxShadow: "0 0 6px rgba(249,115,22,0.6)",
        }}
        aria-hidden="true"
      />

      {/* Cursor — outer ring (lagging) */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998] rounded-full"
        style={{
          width: 36, height: 36,
          border: "1.5px solid rgba(249,115,22,0.55)",
          background: "transparent",
          left: 0, top: 0,
          transform: "translate(-50%,-50%)",
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      {children}
    </SmoothScrollProvider>
  );
}
