"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const sections = [
  { id: "home", labelKey: "hero.sectionLabel" },
  { id: "app", labelKey: "app.sectionLabel" },
  { id: "services", labelKey: "services.sectionLabel" },
  { id: "classes", labelKey: "classes.sectionLabel" },
  { id: "features", labelKey: "features.sectionLabel" },
  { id: "payment", labelKey: "features.pay.sectionLabel" },
  { id: "download", labelKey: "download.sectionLabel" },
] as const;

const WHEEL_SPEED = 0.55;
const SMOOTHNESS = 0.07;
const SECTION_OFFSET = 100;
const EASE = [0.22, 1, 0.36, 1] as const;

type SectionId = (typeof sections)[number]["id"];
type LabelKey = (typeof sections)[number]["labelKey"];

type SectionScrubberProps = {
  labels: Record<LabelKey, string>;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function subscribeCompact(onChange: () => void) {
  const query = window.matchMedia("(max-width: 1199.98px)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function compactSnapshot() {
  return window.matchMedia("(max-width: 1199.98px)").matches;
}

export function SectionScrubber({ labels }: SectionScrubberProps) {
  const reduce = useReducedMotion();
  const compact = useSyncExternalStore(subscribeCompact, compactSnapshot, () => false);
  const progress = useMotionValue(0);
  const sprung = useSpring(progress, { stiffness: 34, damping: 20, mass: 1.15 });
  const travel = useTransform(reduce ? progress : sprung, (value) => `${value * 100}%`);
  const stopsRef = useRef<number[]>([]);
  const cancelScrollRef = useRef<(() => void) | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [direction, setDirection] = useState<"down" | "up">("down");

  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-trip-route", "");
    style.textContent =
      "html,body{scrollbar-width:none;-ms-overflow-style:none}html::-webkit-scrollbar,body::-webkit-scrollbar{display:none;width:0;height:0}";
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;
    const count = sections.length;

    const update = () => {
      frame = 0;
      const stops = stopsRef.current;
      if (!stops.length) return;

      const y = window.scrollY;
      let index = 0;
      while (index < count - 2 && y >= stops[index + 1]!) index += 1;

      const span = stops[index + 1]! - stops[index]!;
      const local = span > 0 ? clamp((y - stops[index]!) / span, 0, 1) : 0;
      progress.set(clamp((index + local) / (count - 1), 0, 1));

      const nextActive = y >= stops[count - 1]! - 2 ? count - 1 : index;
      setActiveIndex((current) => (current === nextActive ? current : nextActive));

      if (Math.abs(y - lastY) > 12) {
        const nextDirection = y > lastY ? "down" : "up";
        setDirection((current) => (current === nextDirection ? current : nextDirection));
        lastY = y;
      }
    };

    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const stops = sections.map((section, index) => {
        if (index === 0) return 0;
        if (index === count - 1) return max;
        const el = document.getElementById(section.id);
        return el ? el.getBoundingClientRect().top + window.scrollY - SECTION_OFFSET : 0;
      });
      for (let index = 1; index < count; index += 1) {
        stops[index] = clamp(stops[index]!, stops[index - 1]!, max);
      }
      stopsRef.current = stops;
      update();
    };

    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    const observer = new ResizeObserver(measure);
    observer.observe(document.documentElement);
    const timer = window.setTimeout(measure, 800);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, [progress]);

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let target = window.scrollY;
    let current = target;
    let frame = 0;
    let running = false;
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;

    const stopWheel = () => {
      running = false;
      cancelAnimationFrame(frame);
      html.style.scrollBehavior = previous;
      if (cancelScrollRef.current === stopWheel) cancelScrollRef.current = null;
    };

    const tick = () => {
      const delta = target - current;
      if (Math.abs(delta) < 0.5) {
        current = target;
        window.scrollTo(0, current);
        stopWheel();
        return;
      }
      current += delta * SMOOTHNESS;
      window.scrollTo(0, current);
      frame = requestAnimationFrame(tick);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      event.preventDefault();
      const scale =
        event.deltaMode === 1 ? 32 : event.deltaMode === 2 ? window.innerHeight : 1;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (!running) {
        if (cancelScrollRef.current && cancelScrollRef.current !== stopWheel) {
          cancelScrollRef.current();
        }
        target = window.scrollY;
        current = target;
        html.style.scrollBehavior = "auto";
        cancelScrollRef.current = stopWheel;
      }
      target = clamp(target + event.deltaY * scale * WHEEL_SPEED, 0, max);
      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      stopWheel();
    };
  }, [reduce]);

  function goTo(id: SectionId) {
    const index = sections.findIndex((section) => section.id === id);
    const target = stopsRef.current[index];
    if (target === undefined) return;

    cancelScrollRef.current?.();
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    let controls: { stop: () => void } | null = null;
    let finished = false;
    const stop = () => {
      if (finished) return;
      finished = true;
      controls?.stop();
      html.style.scrollBehavior = previous;
      if (cancelScrollRef.current === stop) cancelScrollRef.current = null;
    };
    cancelScrollRef.current = stop;
    controls = animate(window.scrollY, target, {
      duration: reduce ? 0 : 1.6,
      ease: EASE,
      onUpdate: (value) => window.scrollTo(0, value),
      onComplete: stop,
    });
  }

  const metrics = compact
    ? { right: 10, top: 84, bottom: 24, line: 3, carW: 10, carH: 25, end: 12, reached: 8, future: 6, ring: 3 }
    : { right: 36, top: 128, bottom: 44, line: 4, carW: 16, carH: 40, end: 18, reached: 12, future: 9, ring: 4 };

  const labelIndex = hoverIndex >= 0 ? hoverIndex : activeIndex;
  const labelKey = sections[labelIndex]?.labelKey ?? "hero.sectionLabel";

  return (
    <div className="pointer-events-none fixed top-0 right-0 z-40 h-screen w-[180px]">
      <div
        className="absolute w-0"
        style={{ top: metrics.top, bottom: metrics.bottom, right: metrics.right }}
      >
        <div
          className="absolute inset-y-0 rounded-full bg-[rgba(34,50,25,0.42)] shadow-[0_0_0_1px_rgba(255,255,255,0.45)]"
          style={{ left: -metrics.line / 2, width: metrics.line }}
        />
        <motion.div
          className="absolute top-0 rounded-full bg-[#87c55d] shadow-[0_0_0_1px_rgba(255,255,255,0.85)]"
          style={{
            left: -metrics.line / 2,
            width: metrics.line,
            height: travel,
          }}
        />

        {sections.map((section, index) => {
          const isEnd = index === 0 || index === sections.length - 1;
          const reached = index <= activeIndex;
          const size = isEnd ? metrics.end : reached ? metrics.reached : metrics.future;
          return (
            <motion.button
              key={section.id}
              type="button"
              aria-label={labels[section.labelKey]}
              tabIndex={compact ? -1 : 0}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(-1)}
              onClick={() => goTo(section.id)}
              animate={{ width: size, height: size }}
              transition={{ duration: 0.6, ease: EASE }}
              className="absolute left-0 rounded-full"
              style={{
                top: `${(index / (sections.length - 1)) * 100}%`,
                x: "-50%",
                y: "-50%",
                background: isEnd || !reached ? "#ffffff" : "#87c55d",
                boxShadow: isEnd
                  ? `0 0 0 ${metrics.ring}px #87c55d`
                  : "0 0 0 1px rgba(34,50,25,0.35)",
                cursor: compact ? "default" : "pointer",
                pointerEvents: compact ? "none" : "auto",
              }}
            />
          );
        })}

        <Car travel={travel} width={metrics.carW} height={metrics.carH} direction={direction} reduce={!!reduce} />

        {compact ? null : (
          <motion.div
            className="absolute"
            animate={{ top: `${(labelIndex / (sections.length - 1)) * 100}%` }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ right: 22, y: "-50%" }}
          >
            <div className="rounded-full bg-forest px-3.5 py-1.5 text-sm leading-5 font-semibold whitespace-nowrap text-white shadow-[0_6px_16px_rgba(15,30,10,0.25)]">
              {labels[labelKey]}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function Car({
  travel,
  width,
  height,
  direction,
  reduce,
}: {
  travel: MotionValue<string>;
  width: number;
  height: number;
  direction: "down" | "up";
  reduce: boolean;
}) {
  return (
    <motion.div
      className="absolute left-0 z-10"
      style={{
        top: travel,
        x: "-50%",
        y: "-50%",
        width,
        height,
        filter: "drop-shadow(0 3px 7px rgba(15, 30, 10, 0.45))",
      }}
    >
      <motion.div
        className="h-full w-full"
        animate={{ rotate: direction === "down" ? 180 : 0 }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 60, damping: 16 }}
      >
        <img
          src="/assets/home/scrubber-car.svg"
          alt=""
          width={width}
          height={height}
          className="block h-full w-full"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}
