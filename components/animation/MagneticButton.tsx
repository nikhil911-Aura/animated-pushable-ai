"use client";
import { useRef, ReactNode, MouseEvent } from "react";
import { gsap } from "gsap";

interface Props {
  children: ReactNode;
  className?: string;
  /** Max translate distance in px */
  maxDistance?: number;
  /** GSAP ease on enter */
  ease?: string;
}

export default function MagneticButton({
  children,
  className = "",
  maxDistance = 20,
  ease = "power2.out",
}: Props) {
  const ref     = useRef<HTMLDivElement | null>(null);
  const xTo     = useRef<gsap.QuickToFunc | null>(null);
  const yTo     = useRef<gsap.QuickToFunc | null>(null);

  function initQuickTo() {
    if (!ref.current || xTo.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    xTo.current = gsap.quickTo(ref.current, "x", { duration: 0.4, ease });
    yTo.current = gsap.quickTo(ref.current, "y", { duration: 0.4, ease });
  }

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    initQuickTo();
    if (!ref.current || !xTo.current || !yTo.current) return;

    const rect = ref.current.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = e.clientX - cx;
    const dy   = e.clientY - cy;

    /* Scale displacement so it never exceeds maxDistance */
    const dist  = Math.sqrt(dx * dx + dy * dy);
    const scale = Math.min(1, maxDistance / Math.max(dist, 1));

    xTo.current(dx * scale);
    yTo.current(dy * scale);
  }

  function handleMouseLeave() {
    if (!ref.current || !xTo.current || !yTo.current) return;
    xTo.current(0);
    yTo.current(0);
  }

  return (
    <div
      ref={ref}
      className={`inline-block will-change-transform ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
