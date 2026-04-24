"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroAtmosphere({ prefersReduced }: { prefersReduced: boolean }) {
  const b1 = useRef<HTMLDivElement>(null);
  const b2 = useRef<HTMLDivElement>(null);
  const b3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced) return;

    const drift = (
      el: HTMLDivElement,
      dxRange: [number, number],
      dyRange: [number, number],
      dur: number
    ) => {
      gsap.to(el, {
        x: dxRange[0],
        y: dyRange[0],
        scale: 1.08,
        duration: dur,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    };

    if (b1.current) drift(b1.current, [-28, 18],  [-14, 16],  22);
    if (b2.current) drift(b2.current, [20,  -24],  [16, -10],  28);
    if (b3.current) drift(b3.current, [-14, 22],   [10, -18],  18);
  }, [prefersReduced]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">

      {/* Noise grain */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <filter id="hero-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>

      {/* Blob 1 â€” primary orange, large, left-centre */}
      <div
        ref={b1}
        className="absolute rounded-full"
        style={{
          width: "70vw",
          height: "60vw",
          maxWidth: 900,
          maxHeight: 720,
          top: "5%",
          left: "-15%",
          background: "radial-gradient(ellipse at center, rgba(232,0,29,0.18) 0%, transparent 68%)",
          filter: "blur(120px)",
          willChange: "transform",
        }}
      />

      {/* Blob 2 â€” amber accent, medium, right-centre */}
      <div
        ref={b2}
        className="absolute rounded-full"
        style={{
          width: "55vw",
          height: "50vw",
          maxWidth: 720,
          maxHeight: 640,
          top: "20%",
          right: "-10%",
          background: "radial-gradient(ellipse at center, rgba(255,45,66,0.13) 0%, transparent 68%)",
          filter: "blur(130px)",
          willChange: "transform",
        }}
      />

      {/* Blob 3 â€” warm cream, small, bottom-centre */}
      <div
        ref={b3}
        className="absolute rounded-full"
        style={{
          width: "40vw",
          height: "35vw",
          maxWidth: 560,
          maxHeight: 480,
          bottom: "0%",
          left: "30%",
          background: "radial-gradient(ellipse at center, rgba(232,0,29,0.09) 0%, transparent 70%)",
          filter: "blur(100px)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
