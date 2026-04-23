"use client";
import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: ReactNode;
  className?: string;
  /** Pin the section while scrolling through it */
  pin?: boolean;
  /** Scrub animations to scroll position */
  scrub?: boolean | number;
  /** Extra scroll distance. CSS value ("200%") or px number. */
  length?: string | number;
  start?: string;
  end?: string;
  markers?: boolean;
  onProgress?: (progress: number) => void;
}

export default function ScrollSection({
  children,
  className = "",
  pin = false,
  scrub = false,
  length,
  start = "top top",
  end,
  markers = false,
  onProgress,
}: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const resolvedEnd =
      end ??
      (length != null
        ? `+=${typeof length === "number" ? length : length}`
        : pin
        ? `+=${window.innerHeight}`
        : "bottom bottom");

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      end: resolvedEnd,
      pin,
      scrub: scrub === true ? 1 : scrub === false ? false : scrub,
      markers,
      onUpdate: onProgress ? (self) => onProgress(self.progress) : undefined,
    });

    return () => { trigger.kill(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin, scrub, length, start, end, markers]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}
