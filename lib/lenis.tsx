"use client";
import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafRef = useRef<(time: number) => void>(() => {});

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      duration:        1.8,
      easing:          (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel:     true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.8,
    });

    function raf(time: number) {
      instance.raf(time * 1000);
    }
    rafRef.current = raf;

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    instance.on("scroll", ScrollTrigger.update);

    setLenis(instance);

    return () => {
      gsap.ticker.remove(rafRef.current);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
