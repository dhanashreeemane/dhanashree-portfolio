"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A soft radial glow that follows the pointer. Purely decorative ambience —
 * skipped on touch devices (no pointer to follow) and when reduced motion
 * is requested.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setEnabled(!isTouch && !reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    const handleMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${event.clientX - 220}px, ${event.clientY - 220}px, 0)`;
        }
      });
    };

    window.addEventListener("pointermove", handleMove);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[440px] w-[440px] rounded-full opacity-[0.15] will-change-transform"
      style={{
        background:
          "radial-gradient(circle, rgba(34,211,238,0.5) 0%, rgba(59,130,246,0.25) 35%, transparent 70%)",
        filter: "blur(10px)",
      }}
    />
  );
}
