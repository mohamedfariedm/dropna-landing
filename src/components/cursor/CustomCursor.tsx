"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

function subscribePointer(cb: () => void) {
  const fine = window.matchMedia("(pointer: fine)");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  fine.addEventListener("change", cb);
  reduce.addEventListener("change", cb);
  return () => {
    fine.removeEventListener("change", cb);
    reduce.removeEventListener("change", cb);
  };
}

function getPointerSnapshot() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Lime arrow cursor matching Framer reference:
 * 48×48 SVG arrow (#87C55D fill, white stroke, soft shadow).
 * Framer CSS only exposes a Default 48px variant (no morph rules found).
 */
export function CustomCursor() {
  const enabled = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    () => false,
  );
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 1200, damping: 55, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 1200, damping: 55, mass: 0.2 });
  const visible = useMotionValue(0);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("has-custom-cursor");
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    function onMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      visible.set(1);
    }
    function onLeave() {
      visible.set(0);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y, visible]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100]"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: visible,
      }}
    >
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <defs>
          <filter
            id="droobna-cursor-shadow"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feDropShadow
              dx="0"
              dy="1.5"
              stdDeviation="1.6"
              floodColor="#000000"
              floodOpacity="0.32"
            />
          </filter>
        </defs>
        <g filter="url(#droobna-cursor-shadow)">
          <g transform="translate(24 24) rotate(-45) translate(0 13)">
            <path
              d="M0 -13L9.5 10.5L0 5.5L-9.5 10.5Z"
              fill="#87C55D"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
    </motion.div>
  );
}
