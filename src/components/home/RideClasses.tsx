"use client";

import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";

const classKeys = ["lite", "standard", "comfort", "plus"] as const;
type ClassKey = (typeof classKeys)[number];

const CARDS: {
  key: ClassKey;
  color: string;
  nameColor: string;
  descColor: string;
  image: string;
}[] = [
  {
    key: "lite",
    color: "#223219",
    nameColor: "#ffffff",
    descColor: "#c3e2b1",
    image: "/assets/home/class-lite.png",
  },
  {
    key: "standard",
    color: "#364f28",
    nameColor: "#ffffff",
    descColor: "#c3e2b1",
    image: "/assets/home/class-standard.png",
  },
  {
    key: "comfort",
    color: "#4b6d37",
    nameColor: "#ffffff",
    descColor: "#edf6e8",
    image: "/assets/home/class-comfort.png",
  },
  {
    key: "plus",
    color: "#ffffff",
    nameColor: "#223219",
    descColor: "#373737",
    image: "/assets/home/class-plus.png",
  },
];

type Mode = "desktop" | "tablet" | "phone";

type Layout = {
  H: number;
  step: number;
  insets: [number, number, number];
  apex: number;
  perspective: number;
  stacked: boolean;
  compact: { name: number; desc: number };
  expanded: { name: number; desc: number; top: number; right: number; left: number; gap: number };
  car: { w: number; h: number; left: number; top: number };
};

const LAYOUT: Record<Mode, Layout> = {
  desktop: {
    H: 344,
    step: 92,
    insets: [72, 48, 24],
    apex: -28,
    perspective: 1500,
    stacked: false,
    compact: { name: 36, desc: 18 },
    expanded: { name: 96, desc: 24, top: 56, right: 32, left: 448, gap: 12 },
    car: { w: 640, h: 427, left: -52, top: 24 },
  },
  tablet: {
    H: 340,
    step: 78,
    insets: [18, 12, 6],
    apex: -20,
    perspective: 1800,
    stacked: true,
    compact: { name: 28, desc: 15 },
    expanded: { name: 64, desc: 20, top: 24, right: 20, left: 20, gap: 8 },
    car: { w: 460, h: 307, left: -44, top: 103 },
  },
  phone: {
    H: 340,
    step: 78,
    insets: [18, 12, 6],
    apex: -20,
    perspective: 1400,
    stacked: true,
    compact: { name: 24, desc: 15 },
    expanded: { name: 44, desc: 18, top: 24, right: 20, left: 20, gap: 8 },
    car: { w: 380, h: 253, left: -28, top: 140 },
  },
};

const RADIUS = 32;
const DURATION = 950;
const CARD_FONT = '"IBM Plex Sans Arabic", sans-serif';

type Pose = {
  yc: number;
  s: number;
  theta: number;
  z: number;
  exp: number;
  bc: number;
  sh: number;
};

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

function range(value: number, start: number, end: number) {
  return clamp((value - start) / (end - start));
}

function easeIO(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function smoother(t: number) {
  return t * t * t * (t * (6 * t - 15) + 10);
}

function peekSlot(layout: Layout, width: number, index: number) {
  return {
    top: layout.step * index,
    s: (width - 2 * layout.insets[index]) / width,
  };
}

function frontSlot(layout: Layout) {
  return { top: layout.step * 3, s: 1 };
}

function centerY(layout: Layout, slot: { top: number; s: number }) {
  return slot.top + (layout.H * slot.s) / 2;
}

function restPoses(layout: Layout, width: number, order: number[]): Pose[] {
  const poses: Pose[] = [];
  order.forEach((id, pos) => {
    const last = pos === order.length - 1;
    const slot = last ? frontSlot(layout) : peekSlot(layout, width, pos);
    poses[id] = {
      yc: centerY(layout, slot),
      s: slot.s,
      theta: last ? -180 : 0,
      z: pos + 1,
      exp: 1,
      bc: 0,
      sh: 0,
    };
  });
  return poses;
}

function flyingPoses(
  layout: Layout,
  width: number,
  order: number[],
  clicked: number,
  progress: number,
): Pose[] {
  const poses: Pose[] = [];
  const fromPos = order.indexOf(clicked);
  const swing = easeIO(progress);

  order.forEach((id, pos) => {
    if (id === clicked) {
      const start = peekSlot(layout, width, fromPos);
      const end = frontSlot(layout);
      const yc =
        progress < 0.5
          ? lerp(centerY(layout, start), layout.apex, easeIO(progress / 0.5))
          : lerp(layout.apex, centerY(layout, end), smoother((progress - 0.5) / 0.5));
      poses[id] = {
        yc,
        s: lerp(start.s, 1, swing),
        theta: -180 * swing,
        z: progress < 0.5 ? pos + 1 : 20,
        exp: 1,
        bc: 0,
        sh: easeIO(range(progress, 0.5, 0.7)) * (1 - easeIO(range(progress, 0.8, 1))),
      };
      return;
    }

    if (pos === order.length - 1) {
      const start = frontSlot(layout);
      const end = peekSlot(layout, width, order.length - 2);
      const t = smoother(range(progress, 0.5, 1));
      poses[id] = {
        yc: lerp(centerY(layout, start), centerY(layout, end), t),
        s: lerp(start.s, end.s, t),
        theta: -180,
        z: pos + 1,
        exp: 1 - range(progress, 0.6, 0.86),
        bc: range(progress, 0.68, 0.92),
        sh: 0,
      };
      return;
    }

    if (pos > fromPos) {
      const start = peekSlot(layout, width, pos);
      const end = peekSlot(layout, width, pos - 1);
      const t = smoother(range(progress, 0.1, 0.6));
      poses[id] = {
        yc: lerp(centerY(layout, start), centerY(layout, end), t),
        s: lerp(start.s, end.s, t),
        theta: 0,
        z: pos + 1,
        exp: 1,
        bc: 0,
        sh: 0,
      };
      return;
    }

    const stay = peekSlot(layout, width, pos);
    poses[id] = {
      yc: centerY(layout, stay),
      s: stay.s,
      theta: 0,
      z: pos + 1,
      exp: 1,
      bc: 0,
      sh: 0,
    };
  });

  return poses;
}

function CompactCopy({
  layout,
  scale,
  rtl,
  name,
  desc,
  nameColor,
  descColor,
}: {
  layout: Layout;
  scale: number;
  rtl: boolean;
  name: string;
  desc: string;
  nameColor: string;
  descColor: string;
}) {
  const counter = `scale(${1 / scale})`;
  const direction = rtl ? "rtl" : "ltr";
  const align = rtl ? "right" : "left";
  const nameStyle: CSSProperties = {
    fontFamily: CARD_FONT,
    fontWeight: 700,
    fontSize: layout.compact.name,
    lineHeight: 1.25,
    letterSpacing: rtl ? 0 : "-0.01em",
    color: nameColor,
    direction,
    textAlign: align,
    whiteSpace: "nowrap",
  };
  const descStyle: CSSProperties = {
    fontFamily: CARD_FONT,
    fontWeight: 400,
    fontSize: layout.compact.desc,
    lineHeight: 1.6,
    color: descColor,
    direction,
    textAlign: align,
  };

  if (layout.stacked) {
    return (
      <div
        className="absolute inset-0"
        style={{ transform: counter, transformOrigin: rtl ? "100% 0%" : "0% 0%" }}
      >
        <div
          className="absolute top-3 right-5 left-5 flex flex-col"
          style={{ direction: "ltr", alignItems: rtl ? "flex-end" : "flex-start" }}
        >
          <p style={nameStyle}>{name}</p>
          <p style={descStyle}>{desc}</p>
        </div>
      </div>
    );
  }

  const nameSide = rtl ? { right: 32 } : { left: 32 };
  const descSide = rtl ? { left: 32 } : { right: 32 };

  return (
    <>
      <div
        className="absolute inset-0"
        style={{ transform: counter, transformOrigin: rtl ? "100% 0%" : "0% 0%" }}
      >
        <p className="absolute top-6" style={{ ...nameStyle, ...nameSide }}>
          {name}
        </p>
      </div>
      <div
        className="absolute inset-0"
        style={{ transform: counter, transformOrigin: rtl ? "0% 0%" : "100% 0%" }}
      >
        <p className="absolute top-[30px] w-[520px]" style={{ ...descStyle, ...descSide }}>
          {desc}
        </p>
      </div>
    </>
  );
}

function ExpandedCopy({
  layout,
  width,
  rtl,
  name,
  desc,
  nameColor,
  descColor,
  image,
}: {
  layout: Layout;
  width: number;
  rtl: boolean;
  name: string;
  desc: string;
  nameColor: string;
  descColor: string;
  image: string;
}) {
  const available = layout.stacked ? width - layout.car.left - 8 : layout.car.w;
  const fit = Math.min(1, available / layout.car.w);
  const carW = layout.car.w * fit;
  const carH = layout.car.h * fit;
  const direction = rtl ? "rtl" : "ltr";
  const align = rtl ? "right" : "left";

  return (
    <>
      <img
        src={image}
        alt=""
        draggable={false}
        className="pointer-events-none absolute object-contain select-none"
        style={{
          ...(rtl ? { left: layout.car.left } : { right: layout.car.left }),
          top: layout.car.top + (layout.car.h - carH),
          width: carW,
          height: carH,
        }}
      />
      <div
        className="absolute flex flex-col"
        style={{
          top: layout.expanded.top,
          ...(rtl
            ? { right: layout.expanded.right, left: layout.expanded.left }
            : { left: layout.expanded.right, right: layout.expanded.left }),
          direction: "ltr",
          alignItems: rtl ? "flex-end" : "flex-start",
          gap: layout.expanded.gap,
        }}
      >
        <p
          style={{
            fontFamily: CARD_FONT,
            fontWeight: 700,
            fontSize: layout.expanded.name,
            lineHeight: rtl ? 1.25 : 1.04,
            letterSpacing: rtl ? 0 : "-0.02em",
            color: nameColor,
            direction,
            textAlign: align,
            whiteSpace: rtl ? "nowrap" : "normal",
            textWrap: "balance",
          }}
        >
          {name}
        </p>
        <p
          style={{
            fontFamily: CARD_FONT,
            fontWeight: 400,
            fontSize: layout.expanded.desc,
            lineHeight: 1.6,
            color: descColor,
            direction,
            textAlign: align,
          }}
        >
          {desc}
        </p>
      </div>
    </>
  );
}

export function RideClasses() {
  const t = useTranslations("home.classes");
  const rtl = useLocale() === "ar";
  const deckRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("desktop");
  const [width, setWidth] = useState(1040);
  const [order, setOrder] = useState<number[]>([0, 1, 2, 3]);
  const [hover, setHover] = useState(-1);
  const layout = LAYOUT[mode];
  const [poses, setPoses] = useState<Pose[]>(() => restPoses(LAYOUT.desktop, 1040, [0, 1, 2, 3]));
  const [shown, setShown] = useState(false);

  const orderRef = useRef(order);
  const widthRef = useRef(width);
  const layoutRef = useRef(layout);
  const busy = useRef(false);
  const queued = useRef<number | null>(null);
  const frame = useRef(0);

  useEffect(() => {
    orderRef.current = order;
  }, [order]);
  useEffect(() => {
    widthRef.current = width;
    layoutRef.current = layout;
    if (!busy.current) setPoses(restPoses(layout, width, orderRef.current));
  }, [layout, width]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1200px)");
    const tablet = window.matchMedia("(min-width: 810px)");
    const update = () => {
      setMode(desktop.matches ? "desktop" : tablet.matches ? "tablet" : "phone");
    };
    update();
    desktop.addEventListener("change", update);
    tablet.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const node = deckRef.current;
    if (!node) return;
    const measure = () => {
      if (node.offsetWidth > 0) setWidth(node.offsetWidth);
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(node);
    const reveal = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShown(true);
        reveal.disconnect();
      },
      { threshold: 0.1 },
    );
    reveal.observe(node);
    return () => {
      resize.disconnect();
      reveal.disconnect();
    };
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const select = useCallback((id: number) => {
    const current = orderRef.current;
    if (current[current.length - 1] === id) return;
    if (busy.current) {
      queued.current = id;
      return;
    }

    const next = current.filter((item) => item !== id).concat(id);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      orderRef.current = next;
      setOrder(next);
      setPoses(restPoses(layoutRef.current, widthRef.current, next));
      return;
    }

    busy.current = true;
    setHover(-1);
    const started = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / DURATION);
      setPoses(flyingPoses(layoutRef.current, widthRef.current, current, id, progress));
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
        return;
      }
      orderRef.current = next;
      setOrder(next);
      setPoses(restPoses(layoutRef.current, widthRef.current, next));
      busy.current = false;
      const follow = queued.current;
      queued.current = null;
      if (follow != null) select(follow);
    };
    frame.current = requestAnimationFrame(tick);
  }, []);

  const front = order[order.length - 1];

  return (
    <section id="classes" className="bg-[linear-gradient(#edf6e8_50%,#364f28_50%)]">
      <div className="bg-[#87c55d] px-5 py-10 md:px-6 md:py-12 xl:px-20 xl:pt-16 xl:pb-[60px]">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 xl:gap-14">
          <Reveal className="flex w-full flex-col items-start gap-2 xl:flex-row xl:items-end xl:justify-between xl:gap-10">
            <h2 className="w-full max-w-[800px] text-start text-4xl leading-[1.25] font-bold tracking-normal text-[#223219] md:text-5xl xl:text-[64px]">
              {t("title")}
            </h2>
            <p className="text-start text-xl leading-[1.6] text-[#223219] xl:max-w-[620px] xl:pb-2 xl:text-end">
              {t("eyebrow")}
            </p>
          </Reveal>

          <div
            ref={deckRef}
            className="relative w-full"
            style={{
              height: layout.step * 3 + layout.H,
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0px)" : "translateY(90px)",
              transition:
                "opacity 1.1s cubic-bezier(0.22, 1, 0.36, 1), transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {CARDS.map((card, index) => {
              const pose = poses[index];
              if (!pose) return null;
              const active = front === index;
              const name = t(`items.${card.key}.name`);
              const desc = t(`items.${card.key}.desc`);
              const faceRadius = RADIUS / pose.s;
              const lifted = hover === index && !active;

              return (
                <div
                  key={card.key}
                  role="button"
                  tabIndex={active ? -1 : 0}
                  aria-pressed={active}
                  aria-label={name}
                  onClick={() => select(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      select(index);
                    }
                  }}
                  onMouseEnter={() => {
                    if (!active && !busy.current) setHover(index);
                  }}
                  onMouseLeave={() => {
                    if (!busy.current) setHover(-1);
                  }}
                  className="absolute top-0 left-0 h-[var(--card-h)] w-full outline-none focus-visible:ring-2 focus-visible:ring-[#223219]"
                  style={{
                    ["--card-h" as string]: `${layout.H}px`,
                    height: layout.H,
                    zIndex: pose.z,
                    cursor: active ? "default" : "pointer",
                    transform: `translate3d(0px, ${pose.yc - layout.H / 2}px, 0px) scale(${pose.s})`,
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: lifted ? "translateY(-8px)" : "translateY(0px)",
                      transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        perspective: layout.perspective,
                        perspectiveOrigin: `50% ${layout.apex - (pose.yc - layout.H / 2)}px`,
                      }}
                    >
                    <div
                      className="absolute inset-0"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: `rotateX(${pose.theta}deg)`,
                      }}
                    >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        borderRadius: RADIUS,
                        boxShadow: "0px -28px 64px 0px rgba(15, 30, 10, 0.34)",
                        opacity: pose.sh,
                      }}
                    />
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{
                        borderRadius: faceRadius,
                        background: card.color,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "translateZ(1px)",
                      }}
                    >
                      <CompactCopy
                        layout={layout}
                        scale={pose.s}
                        rtl={rtl}
                        name={name}
                        desc={desc}
                        nameColor={card.nameColor}
                        descColor={card.descColor}
                      />
                    </div>
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{
                        borderRadius: faceRadius,
                        background: card.color,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateX(180deg) translateZ(1px)",
                      }}
                    >
                      <div className="absolute inset-0" style={{ opacity: pose.exp }}>
                        <ExpandedCopy
                          layout={layout}
                          width={width}
                          rtl={rtl}
                          name={name}
                          desc={desc}
                          nameColor={card.nameColor}
                          descColor={card.descColor}
                          image={card.image}
                        />
                      </div>
                      <div className="absolute inset-0" style={{ opacity: pose.bc }}>
                        <CompactCopy
                          layout={layout}
                          scale={pose.s}
                          rtl={rtl}
                          name={name}
                          desc={desc}
                          nameColor={card.nameColor}
                          descColor={card.descColor}
                        />
                      </div>
                    </div>
                    </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
