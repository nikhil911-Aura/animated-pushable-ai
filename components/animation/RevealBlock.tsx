"use client";
import { useEffect, useRef, ReactNode, CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type RevealVariant =
  | "fade"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "clip-up"
  | "clip-left";

interface Props {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  ease?: string;
  /** Stagger direct children instead of animating the wrapper */
  staggerChildren?: number;
  className?: string;
  style?: CSSProperties;
  /** Re-animate on scroll back */
  once?: boolean;
  start?: string;
}

const FROM: Record<RevealVariant, gsap.TweenVars> = {
  "fade":        { opacity: 0 },
  "slide-up":    { opacity: 0, y: 40 },
  "slide-down":  { opacity: 0, y: -40 },
  "slide-left":  { opacity: 0, x: -40 },
  "slide-right": { opacity: 0, x:  40 },
  "scale":       { opacity: 0, scale: 0.88 },
  "clip-up":     { clipPath: "inset(100% 0 0 0)" },
  "clip-left":   { clipPath: "inset(0 100% 0 0)" },
};

const TO: Record<RevealVariant, gsap.TweenVars> = {
  "fade":        { opacity: 1 },
  "slide-up":    { opacity: 1, y: 0 },
  "slide-down":  { opacity: 1, y: 0 },
  "slide-left":  { opacity: 1, x: 0 },
  "slide-right": { opacity: 1, x: 0 },
  "scale":       { opacity: 1, scale: 1 },
  "clip-up":     { clipPath: "inset(0% 0 0 0)" },
  "clip-left":   { clipPath: "inset(0 0% 0 0)" },
};

/**
 * Drop-in scroll-triggered reveal wrapper. Works on any page.
 *
 * Examples:
 *   <RevealBlock variant="slide-up">…</RevealBlock>
 *   <RevealBlock variant="clip-left" delay={0.2}>…</RevealBlock>
 *   <RevealBlock variant="slide-up" staggerChildren={0.1}><Card/><Card/><Card/></RevealBlock>
 */
export default function RevealBlock({
  children,
  variant = "slide-up",
  delay = 0,
  duration = 0.7,
  ease = "power3.out",
  staggerChildren,
  className = "",
  style,
  once = true,
  start = "top 88%",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = staggerChildren && staggerChildren > 0
      ? (Array.from(el.children) as HTMLElement[])
      : [el];

    gsap.set(targets, FROM[variant]);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once,
      onEnter: () => {
        gsap.to(targets, {
          ...TO[variant],
          duration,
          delay,
          ease,
          stagger: staggerChildren ?? 0,
        });
      },
    });

    return () => { trigger.kill(); };
  }, [variant, delay, duration, ease, staggerChildren, once, start]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
