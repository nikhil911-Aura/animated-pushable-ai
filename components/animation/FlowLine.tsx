"use client";
import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  from: RefObject<HTMLElement | null>;
  to: RefObject<HTMLElement | null>;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

export default function FlowLine({
  from,
  to,
  color = "rgba(253,186,116,0.35)",
  strokeWidth = 1.5,
  className = "",
}: Props) {
  const svgRef  = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const svg  = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path || !from.current || !to.current) return;

    function update() {
      const a = from.current!.getBoundingClientRect();
      const b = to.current!.getBoundingClientRect();
      const svgRect = svg!.getBoundingClientRect();

      const x1 = a.left + a.width  / 2 - svgRect.left;
      const y1 = a.top  + a.height / 2 - svgRect.top;
      const x2 = b.left + b.width  / 2 - svgRect.left;
      const y2 = b.top  + b.height / 2 - svgRect.top;

      const midY = (y1 + y2) / 2;
      const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
      path!.setAttribute("d", d);

      const len = path!.getTotalLength();
      gsap.set(path!, { strokeDasharray: len, strokeDashoffset: len });
    }

    update();
    window.addEventListener("resize", update);

    const trigger = ScrollTrigger.create({
      trigger: from.current,
      start: "top 80%",
      onEnter: () => {
        const len = path.getTotalLength();
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.inOut",
        });
        void len;
      },
      once: true,
    });

    return () => {
      window.removeEventListener("resize", update);
      trigger.kill();
    };
  }, [from, to]);

  return (
    <svg
      ref={svgRef}
      className={`pointer-events-none absolute inset-0 w-full h-full overflow-visible ${className}`}
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
