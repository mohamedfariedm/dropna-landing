"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { EditorialHero } from "@/components/layout/EditorialHero";
import { Link } from "@/i18n/navigation";
import type { FaqCategory, LocaleCode } from "@/lib/api/types";
import { useFaqQuery } from "@/lib/query/queries/faq";
import { cn } from "@/lib/utils";

const categoryOrder: FaqCategory[] = [
  "booking",
  "payment",
  "safety",
  "account",
];

/** Visual L→R chip order from Figma; RTL flex places `all` at inline-start. */
const chips: Array<FaqCategory | "all"> = [
  "all",
  "booking",
  "payment",
  "safety",
  "account",
];

export function FaqPage() {
  const t = useTranslations("faq");
  const tNav = useTranslations("common.nav");
  const locale = useLocale() as LocaleCode;
  const { data } = useFaqQuery(locale);
  const [filter, setFilter] = useState<FaqCategory | "all">("all");
  const [openId, setOpenId] = useState<string | null>("book-ride");
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const groups = useMemo(() => {
    const items = (data?.items ?? []).filter((item) => {
      if (!normalizedQuery) return true;
      const hay = `${item.question[locale]} ${item.answer[locale]}`.toLowerCase();
      return hay.includes(normalizedQuery);
    });
    return categoryOrder
      .map((category) => ({
        category,
        items: items.filter((item) => item.category === category),
      }))
      .filter((group) => group.items.length > 0)
      .filter((group) => filter === "all" || group.category === filter);
  }, [data?.items, filter, locale, normalizedQuery]);

  const jsonLd =
    data?.items.map((item) => ({
      "@type": "Question",
      name: item.question[locale],
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer[locale],
      },
    })) ?? [];

  return (
    <div className="bg-[#f7faf5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: jsonLd,
          }),
        }}
      />

      <EditorialHero
        pageIndex={t("pageIndex")}
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbHomeLabel={tNav("home")}
        breadcrumbCurrent={tNav("faq")}
        bottomEnd={
          <label className="flex h-[52px] w-full items-center gap-3 rounded-2xl bg-white px-4 sm:h-16 sm:px-3">
            <span className="hidden rounded-full bg-forest px-5 py-3 text-sm font-semibold text-cream sm:inline-flex">
              {t("searchButton")}
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholderDesktop")}
              className="min-w-0 flex-1 bg-transparent text-base text-[#1f1f1f] outline-none placeholder:text-[#8A9484]"
              aria-label={t("searchPlaceholder")}
            />
            <SearchIcon />
          </label>
        }
      />

      <div className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-10 sm:py-24 lg:px-20">
        <div className="mb-8 flex justify-start overflow-x-auto pb-1 sm:mb-10">
          <div className="flex gap-2">
            {chips.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={cn(
                  "focus-ring shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition sm:px-[22px] sm:py-3",
                  filter === key
                    ? "bg-forest text-cream"
                    : "bg-white text-[#1f1f1f] ring-1 ring-black/5 hover:bg-forest/5",
                )}
              >
                {t(`filters.${key}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion first → RTL right; aside second → RTL left */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <div className="min-w-0 flex-1 space-y-12 lg:max-w-[836px]">
            {groups.length === 0 ? (
              <p className="text-muted">{t("empty")}</p>
            ) : (
              groups.map((group) => (
                <section key={group.category} id={group.category}>
                  <div className="mb-5 flex items-center justify-end gap-2.5">
                    <span className="flex h-[22px] min-w-[29px] items-center justify-center rounded-full bg-white px-2 text-[13px] font-semibold text-[#373737] ring-1 ring-black/5">
                      {group.items.length}
                    </span>
                    <h3 className="text-xl font-semibold text-[#1f1f1f] sm:text-[22px] sm:leading-[34px]">
                      {t(`filters.${group.category}`)}
                    </h3>
                  </div>
                  <div className="overflow-hidden rounded-[24px] bg-white">
                    {group.items.map((item, index) => {
                      const open = openId === item.id;
                      return (
                        <div
                          key={item.id}
                          className={cn(
                            index > 0 && "border-t border-[rgba(34,50,25,0.08)]",
                            open && "bg-[#e7f3df]",
                          )}
                        >
                          <button
                            type="button"
                            className="focus-ring flex w-full items-center gap-3 px-4 py-5 text-start sm:gap-4 sm:px-7 sm:py-[22px]"
                            aria-expanded={open}
                            onClick={() => setOpenId(open ? null : item.id)}
                          >
                            {/* Text first → inline-start (right in RTL); toggle at inline-end (left) — matches Figma */}
                            <span className="flex-1 text-base font-semibold text-[#1f1f1f] sm:text-lg">
                              {item.question[locale]}
                            </span>
                            <span
                              className={cn(
                                "flex size-[30px] shrink-0 items-center justify-center rounded-full sm:size-9",
                                open
                                  ? "bg-forest text-cream"
                                  : "bg-transparent text-forest ring-1 ring-forest/25",
                              )}
                              aria-hidden
                            >
                              {open ? <MinusIcon /> : <PlusIcon />}
                            </span>
                          </button>
                          <AnimatePresence initial={false}>
                            {open ? (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.28,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="overflow-hidden"
                              >
                                <p className="px-4 pb-5 pe-[3.75rem] ps-4 text-[15px] leading-[1.65] text-[#373737] sm:px-7 sm:pb-6 sm:pe-[5.25rem] sm:text-base">
                                  {item.answer[locale]}
                                </p>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))
            )}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:w-[380px] lg:shrink-0 lg:self-start">
            <div className="rounded-[28px] bg-forest p-6 text-cream sm:p-9">
              <div className="mb-5 flex size-11 items-center justify-center rounded-2xl bg-white/8 sm:size-[52px]">
                <ChatIcon />
              </div>
              <h2 className="text-2xl font-semibold sm:text-[28px] sm:leading-[34px]">
                {t("cta.title")}
              </h2>
              <p className="mt-3 text-base text-cream/70">{t("cta.subtitle")}</p>
              <Link
                href="/contact"
                className="focus-ring mt-6 inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-lime px-7 text-base font-semibold text-[#1f1f1f]"
              >
                <Image
                  src="/assets/icons/arrow.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="size-[18px] ltr:-scale-x-100"
                />
                {t("cta.contact")}
              </Link>
            </div>
            <div className="overflow-hidden rounded-[24px] bg-white">
              <Link
                href="/privacy"
                className="focus-ring flex items-center gap-2 border-b border-[rgba(34,50,25,0.08)] px-6 py-4 text-[#1f1f1f]"
              >
                <Image
                  src="/assets/icons/arrow.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="size-[18px] opacity-60 ltr:-scale-x-100"
                />
                <span className="flex-1 font-medium">{tNav("privacy")}</span>
              </Link>
              <Link
                href="/terms"
                className="focus-ring flex items-center gap-2 px-6 py-4 text-[#1f1f1f]"
              >
                <Image
                  src="/assets/icons/arrow.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="size-[18px] opacity-60 ltr:-scale-x-100"
                />
                <span className="flex-1 font-medium">{tNav("terms")}</span>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-[#1f1f1f]">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3.5 8h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="text-lime">
      <path
        d="M5 5.5A2.5 2.5 0 0 1 7.5 3h9A2.5 2.5 0 0 1 19 5.5v7A2.5 2.5 0 0 1 16.5 15H11l-4 4v-4H7.5A2.5 2.5 0 0 1 5 12.5v-7z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
