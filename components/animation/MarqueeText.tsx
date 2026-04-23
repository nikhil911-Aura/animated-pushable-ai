"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  items: string[];
  /** Seconds per full cycle — lower = faster */
  speed?: number;
  /** Reverse direction */
  reverse?: boolean;
  separator?: string;
  className?: string;
  itemClassName?: string;
  /** Pause on hover */
  pauseOnHover?: boolean;
}

/**
 * Infinite horizontal ticker — duplicates items for seamless looping.
 *
 * Examples:
 *   <MarqueeText items={["Slack", "HubSpot", "Notion"]} speed={18} />
 *   <MarqueeText items={logos} reverse speed={22} separator="·" />
 */
export default function MarqueeText({
  items,
  speed = 20,
  reverse = false,
  separator = "·",
  className = "",
  itemClassName = "",
  pauseOnHover = true,
}: Props) {
  const trackRef   = useRef<HTMLDivElement>(null);
  const tweenRef   = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    tweenRef.current = gsap.to(track, {
      xPercent: reverse ? 50 : -50,
      duration: speed,
      repeat: -1,
      ease: "none",
    });

    return () => { tweenRef.current?.kill(); };
  }, [speed, reverse]);

  function pause() { tweenRef.current?.pause(); }
  function resume() { tweenRef.current?.resume(); }

  /* Duplicate items so half-way loop point is invisible */
  const doubled = [...items, ...items];

  return (
    <div
      className={`overflow-hidden whitespace-nowrap select-none ${className}`}
      onMouseEnter={pauseOnHover ? pause  : undefined}
      onMouseLeave={pauseOnHover ? resume : undefined}
    >
      <div ref={trackRef} className="inline-flex">
        {doubled.map((item, i) => (
          <span key={i} className={`inline-flex items-center ${itemClassName}`}>
            <span>{item}</span>
            <span className="mx-4 opacity-30 text-xs">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
