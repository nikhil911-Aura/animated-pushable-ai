"use client";
import { useEffect, useRef, DependencyList } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * A lightweight GSAP hook that creates a scoped context and cleans up
 * all tweens / ScrollTriggers on unmount.
 */
export function useGSAP(
  callback: (gsapContext: gsap.Context) => void,
  deps: DependencyList = []
) {
  const scopeRef = useRef<HTMLElement | null>(null);
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      callback(ctx);
    }, scopeRef.current ?? document.body);

    contextRef.current = ctx;

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}

/** Returns true when prefers-reduced-motion is active */
export function usePrefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
