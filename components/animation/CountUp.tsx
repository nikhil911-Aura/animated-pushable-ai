"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Trigger immediately on mount instead of on scroll */
  onMount?: boolean;
}

/**
 * Animates a number from `from` to `to` when it enters the viewport.
 * Usage: <CountUp to={200} suffix="+" className="text-4xl font-bold" />
 */
export default function CountUp({
  to,
  from = 0,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
  onMount = false,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = `${prefix}${to.toFixed(decimals)}${suffix}`;
      return;
    }

    const obj = { val: from };
    const tween = gsap.to(obj, {
      val: to,
      duration,
      ease: "power2.out",
      paused: !onMount,
      onUpdate: () => {
        el.textContent = `${prefix}${obj.val.toFixed(decimals)}${suffix}`;
      },
    });

    if (!onMount) {
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => tween.play(),
      });
    }

    return () => { tween.kill(); };
  }, [to, from, duration, decimals, prefix, suffix, onMount]);

  return (
    <span ref={ref} className={className}>
      {prefix}{from.toFixed(decimals)}{suffix}
    </span>
  );
}
