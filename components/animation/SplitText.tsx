"use client";
import { useEffect, useRef, ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  text: string;
  as?: ElementType;
  className?: string;
  stagger?: number;
  ease?: string;
  /** If true, triggers on mount. If false/undefined, triggers on scroll. */
  onMount?: boolean;
  delay?: number;
}

export default function SplitText({
  text,
  as: Tag = "span",
  className = "",
  stagger = 0.025,
  ease = "power3.out",
  onMount = false,
  delay = 0,
}: Props) {
  const containerRef = useRef<HTMLElement | null>(null);
  const animated     = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || animated.current) return;

    /* Respect prefers-reduced-motion */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* Build char spans */
    const chars = text.split("").map((ch) => {
      const span = document.createElement("span");
      span.style.display      = "inline-block";
      span.style.overflow      = "hidden";
      span.style.paddingBottom  = "0.1em";
      span.textContent = ch === " " ? " " : ch;
      return span;
    });

    el.innerHTML = "";
    chars.forEach((s) => el.appendChild(s));

    const tl = gsap.fromTo(
      chars,
      { y: 36, opacity: 0, rotateX: -70 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger,
        ease,
        duration: 0.7,
        delay,
      }
    );

    if (!onMount) {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        animation: tl,
        once: true,
      });
    }

    animated.current = true;

    return () => {
      tl.kill();
    };
  }, [text, stagger, ease, onMount, delay]);

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const AnyTag = Tag as any;
  return (
    <AnyTag
      ref={containerRef}
      className={className}
      style={{ perspective: "600px" }}
    >
      {text}
    </AnyTag>
  );
}
