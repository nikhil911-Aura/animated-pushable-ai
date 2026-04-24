"use client";
import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** px radius of the glow halo */
  glowSize?: number;
}

export default function PulseReveal({
  children,
  className = "",
  delay = 0,
  glowSize = 40,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(el, { opacity: 0, scale: 0.96 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ delay });

        tl.to(el, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        });

        /* glow pulse overlay */
        const glow = document.createElement("div");
        Object.assign(glow.style, {
          position: "absolute",
          inset: `-${glowSize}px`,
          borderRadius: "inherit",
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, rgba(255,128,149,0.25) 0%, transparent 70%)",
          opacity: "0",
        });
        el.style.position = "relative";
        el.appendChild(glow);

        tl.to(glow, { opacity: 1, duration: 0.4, ease: "power2.out" }, "<")
          .to(glow, { opacity: 0, duration: 0.8, ease: "power2.in" }, "+=0.2")
          .call(() => glow.remove());
      },
    });

    return () => { trigger.kill(); };
  }, [delay, glowSize]);

  return (
    <div ref={wrapRef} className={className}>
      {children}
    </div>
  );
}
