import { useLocale, useTranslations } from "next-intl";
import { publicEnv } from "@/lib/env";
import { cn } from "@/lib/utils";

type StoreButtonsProps = {
  className?: string;
  variant?: "dark" | "light" | "footer";
  order?: "apple-first" | "play-first";
};

function ExternalArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className="shrink-0">
      <path
        d="M6 12L12 6M7 6h5v5"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StoreButtons({
  className,
  variant = "dark",
  order = "apple-first",
}: StoreButtonsProps) {
  const t = useTranslations(variant === "footer" ? "common.footer.stores" : "common.stores");
  const rtl = useLocale() === "ar";
  const isDark = variant === "dark";
  const isFooter = variant === "footer";

  const base = cn(
    "focus-ring group inline-flex items-center transition duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px]",
    isDark
      ? "min-w-[11rem] gap-3 rounded-2xl bg-[#2f3e27] px-4 py-3 text-cream hover:bg-[#3a4d31]"
      : "h-14 w-[170px] justify-center gap-2.5 rounded-[14px] bg-white px-[18px] text-[#1f1f1f]",
  );

  const apple = (
    <a
      href={publicEnv.NEXT_PUBLIC_APP_STORE_URL || "#"}
      className={base}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={cn("leading-none", isDark ? "leading-[1.2]" : "text-end")}>
        <span
          className={cn(
            "block",
            isDark
              ? "text-[0.7rem] opacity-70"
              : "font-[family-name:var(--font-display)] text-[11px] leading-[1.2] font-normal",
          )}
        >
          {t("appStorePrefix")}
        </span>
        <span
          className={cn(
            "block",
            isDark
              ? "text-sm font-semibold"
              : "font-[family-name:var(--font-body)] text-[18px] leading-[1.2] font-bold",
          )}
        >
          {t("appStoreName")}
        </span>
      </span>
      <img
        src="/assets/home/icons/apple.svg"
        alt=""
        className={cn(
          "shrink-0",
          isDark ? "h-[22px] w-[18px] brightness-0 invert" : "size-7 object-contain",
        )}
      />
    </a>
  );

  const play = (
    <a
      href={publicEnv.NEXT_PUBLIC_PLAY_STORE_URL || "#"}
      className={base}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={cn("leading-none", isDark ? "leading-[1.2]" : "text-end")}>
        <span
          className={cn(
            "block",
            isDark
              ? "text-[0.7rem] opacity-70"
              : "font-[family-name:var(--font-display)] text-[11px] leading-[1.2] font-normal",
          )}
        >
          {t("playStorePrefix")}
        </span>
        <span
          className={cn(
            "block",
            isDark
              ? "text-sm font-semibold"
              : "font-[family-name:var(--font-body)] text-[18px] leading-[1.2] font-bold",
          )}
        >
          {t("playStoreName")}
        </span>
      </span>
      <img
        src="/assets/home/icons/play.svg"
        alt=""
        className={cn(
          "shrink-0",
          isDark ? "size-[22px] brightness-0 invert" : "size-7 object-contain",
        )}
      />
    </a>
  );

  if (isFooter) {
    const footerBadge = (kind: "apple" | "play") => {
      const isApple = kind === "apple";
      return (
        <a
          key={kind}
          href={(isApple ? publicEnv.NEXT_PUBLIC_APP_STORE_URL : publicEnv.NEXT_PUBLIC_PLAY_STORE_URL) || "#"}
          dir={rtl ? "rtl" : "ltr"}
          className="focus-ring inline-flex h-16 w-[240px] items-center gap-3 rounded-2xl bg-[#2f3e27] px-3 py-2.5 text-white transition duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#3a4c30]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <img
              src={isApple ? "/assets/home/icons/apple.svg" : "/assets/home/icons/play.svg"}
              alt=""
              className={cn("brightness-0 invert", isApple ? "h-[22px] w-[18px]" : "size-5")}
            />
          </span>
          <span className="flex min-w-0 flex-1 flex-col items-start text-start">
            <span className="font-[family-name:var(--font-display)] text-[12px] leading-[16.8px] font-normal text-[rgba(195,226,177,0.85)]">
              {t(isApple ? "appStorePrefix" : "playStorePrefix")}
            </span>
            <span className="font-[family-name:var(--font-display)] text-[16px] leading-[20.8px] font-semibold">
              {t(isApple ? "appStoreName" : "playStoreName")}
            </span>
          </span>
          <span className="opacity-60">
            <ExternalArrow />
          </span>
        </a>
      );
    };

    const footerApple = footerBadge("apple");
    const footerPlay = footerBadge("play");

    return (
      <div className={cn("flex flex-col gap-3", className)}>
        {order === "play-first" ? (
          <>
            {footerPlay}
            {footerApple}
          </>
        ) : (
          <>
            {footerApple}
            {footerPlay}
          </>
        )}
      </div>
    );
  }

  return (
    <div
      dir={isDark ? undefined : "ltr"}
      className={cn("flex flex-wrap gap-4", className)}
    >
      {order === "play-first" ? (
        <>
          {play}
          {apple}
        </>
      ) : (
        <>
          {apple}
          {play}
        </>
      )}
    </div>
  );
}
