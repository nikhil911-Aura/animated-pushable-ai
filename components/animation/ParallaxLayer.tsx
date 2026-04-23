"use client";
import { useEffect, useRef, ReactNode, CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: ReactNode;
  /** 0.1 = very slow drift, 0.5 = noticeable, 1 = 1:1 with scroll */
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  style?: CSSProperties;
}

/**
 * Wraps any content in a scroll-driven parallax layer.
 *
 * Examples:
 *   <ParallaxLayer speed={0.25}><img src="bg.jpg" /></ParallaxLayer>
 *   <ParallaxLayer speed={0.4} direction="down">…decorative blob…</ParallaxLayer>
 */
export default function ParallaxLayer({
  children,
  speed = 0.25,
  direction = "up",
  className = "",
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dist = speed * 120; // max px offset
    const axis = direction === "left" || direction === "right" ? "x" : "y";
    const sign = direction === "down" || direction === "right" ? 1 : -1;

    const tween = gsap.fromTo(
      el,
      { [axis]: dist * sign * -0.5 },
      {
        [axis]: dist * sign * 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed, direction]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`} style={style}>
      {children}
    </div>
  );
}
