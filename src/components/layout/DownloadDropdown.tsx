"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { publicEnv } from "@/lib/env";
import { cn } from "@/lib/utils";

export function DownloadDropdown() {
  const t = useTranslations("common");
  const stores = useTranslations("common.footer.stores");
  const rtl = useLocale() === "ar";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "focus-ring inline-flex h-14 items-center justify-center gap-2 rounded-full bg-lime px-7 font-[family-name:var(--font-display)] text-base leading-6 font-medium text-[#1f1f1f] transition-colors hover:bg-[#c3e2b1]",
          open && "shadow-[0_0_0_4px_rgba(135,197,93,0.35)]",
        )}
      >
        {rtl ? null : t("nav.download")}
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex size-4 items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6l4 4 4-4"
              stroke="#1F1F1F"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
        {rtl ? t("nav.download") : null}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="menu"
            dir={rtl ? "rtl" : "ltr"}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
            className={cn(
              "absolute top-[calc(100%+12px)] z-50 flex w-[304px] flex-col gap-0.5 rounded-3xl border border-[rgba(34,50,25,0.08)] bg-white p-2 shadow-[0_24px_48px_-12px_rgba(22,35,27,0.28),0_2px_6px_rgba(22,35,27,0.08)]",
              rtl ? "start-0" : "end-0",
            )}
          >
            <p className="px-3 pt-2.5 pb-1 text-start font-[family-name:var(--font-display)] text-[12px] leading-[1.4] font-medium text-[rgba(55,55,55,0.6)]">
              {t("nav.menuCaption")}
            </p>
            <StoreMenuLink
              href={publicEnv.NEXT_PUBLIC_APP_STORE_URL || "#"}
              title={stores("appStoreName")}
              subtitle={stores("appStorePrefix")}
              icon="apple"
            />
            <StoreMenuLink
              href={publicEnv.NEXT_PUBLIC_PLAY_STORE_URL || "#"}
              title={stores("playStoreName")}
              subtitle={stores("playStorePrefix")}
              icon="play"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function StoreMenuLink({
  href,
  title,
  subtitle,
  icon,
}: {
  href: string;
  title: string;
  subtitle: string;
  icon: "apple" | "play";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      role="menuitem"
      className="focus-ring flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-cream"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#1f1f1f]">
        <img
          src={icon === "apple" ? "/assets/home/icons/apple.svg" : "/assets/home/icons/play.svg"}
          alt=""
          className={cn(
            "brightness-0 invert",
            icon === "apple" ? "h-[22px] w-[18px]" : "size-5",
          )}
        />
      </span>
      <span className="flex min-w-0 flex-1 flex-col text-start">
        <span className="font-[family-name:var(--font-display)] text-[12px] leading-[1.4] font-normal text-[rgba(55,55,55,0.7)]">
          {subtitle}
        </span>
        <span className="font-[family-name:var(--font-display)] text-[16px] leading-[1.3] font-semibold text-[#1f1f1f]">
          {title}
        </span>
      </span>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className="shrink-0 opacity-45">
        <path
          d="M6 12L12 6M7 6h5v5"
          stroke="#373737"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
