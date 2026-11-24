"use client";

import { AnimatePresence, motion } from "motion/react";
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

export function FaqPage() {
  const t = useTranslations("faq");
  const tNav = useTranslations("common.nav");
  const locale = useLocale() as LocaleCode;
  const { data } = useFaqQuery(locale);
  const [filter, setFilter] = useState<FaqCategory | "all">("all");
  const [openId, setOpenId] = useState<string | null>("book-ride");

  const questionCount = data?.items.length ?? 0;
  const sectionCount = data?.categories.length ?? 0;

  const groups = useMemo(() => {
    const items = data?.items ?? [];
    return categoryOrder
      .map((category) => ({
        category,
        items: items.filter((item) => item.category === category),
      }))
      .filter((group) => group.items.length > 0)
      .filter((group) => filter === "all" || group.category === filter);
  }, [data?.items, filter]);

  const chips: Array<FaqCategory | "all"> = [
    "account",
    "safety",
    "payment",
    "booking",
    "all",
  ];

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
        breadcrumbCurrent={locale === "ar" ? "الأسئلة الشائعة" : "FAQ"}
        meta={
          <>
            <p>{t("stats.questions", { count: questionCount })}</p>
            <p>{t("stats.sections", { count: sectionCount })}</p>
          </>
        }
      />

      <div className="container-wide px-4 py-10 sm:px-8 sm:py-14 lg:px-10">
        <div className="mb-10 flex flex-wrap gap-2">
          {chips.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={cn(
                "focus-ring rounded-full px-4 py-2 text-sm font-semibold transition",
                filter === key
                  ? "bg-forest text-cream"
                  : "bg-white text-forest ring-1 ring-black/5 hover:bg-forest/5",
              )}
            >
              {t(`filters.${key}`)}
            </button>
          ))}
        </div>

        {/* RTL: first column sits on the right (accordion); aside on the left — matches Framer */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
          <div className="space-y-12">
            {groups.length === 0 ? (
              <p className="text-muted">{t("empty")}</p>
            ) : (
              groups.map((group) => (
                <section key={group.category} id={group.category}>
                  <div className="mb-5 flex items-baseline justify-between gap-3">
                    <h3 className="text-xl font-semibold text-forest sm:text-2xl">
                      {t(`filters.${group.category}`)}
                    </h3>
                    <span className="text-sm text-muted">
                      {group.items.length}
                    </span>
                  </div>
                  <div className="space-y-0">
                    {group.items.map((item) => {
                      const open = openId === item.id;
                      return (
                        <div
                          key={item.id}
                          className={cn(
                            "border-t border-forest/10",
                            open && "rounded-3xl border-t-0 bg-[#e7f3df]",
                          )}
                        >
                          <button
                            type="button"
                            className="focus-ring flex w-full items-start gap-4 px-4 py-5 text-start sm:px-5"
                            aria-expanded={open}
                            onClick={() =>
                              setOpenId(open ? null : item.id)
                            }
                          >
                            <span
                              className={cn(
                                "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg font-light",
                                open
                                  ? "bg-forest text-cream"
                                  : "bg-transparent text-forest ring-1 ring-forest/25",
                              )}
                            >
                              {open ? "−" : "+"}
                            </span>
                            <span className="flex-1 pt-1 text-lg font-semibold text-forest sm:text-xl">
                              {item.question[locale]}
                            </span>
                          </button>
                          <AnimatePresence initial={false}>
                            {open ? (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                              >
                                <p className="px-4 pb-6 ps-[4.25rem] pe-5 text-forest/70 leading-relaxed sm:px-5">
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

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[1.75rem] bg-forest p-7 text-cream">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-lime/40 text-lime">
                <ChatIcon />
              </div>
              <h2 className="text-2xl font-semibold sm:text-[1.65rem]">
                {t("cta.title")}
              </h2>
              <p className="mt-3 text-cream/70">{t("cta.subtitle")}</p>
              <Link
                href="/contact"
                className="focus-ring mt-7 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-forest"
              >
                {t("cta.contact")}
                <span aria-hidden>←</span>
              </Link>
            </div>
            <Link
              href="/privacy"
              className="focus-ring flex items-center justify-between rounded-2xl bg-white px-5 py-4 text-forest shadow-sm ring-1 ring-black/5"
            >
              <span className="font-medium">
                {locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
              </span>
              <span aria-hidden className="text-lime">
                ←
              </span>
            </Link>
            <Link
              href="/terms"
              className="focus-ring flex items-center justify-between rounded-2xl bg-white px-5 py-4 text-forest shadow-sm ring-1 ring-black/5"
            >
              <span className="font-medium">
                {locale === "ar" ? "شروط الاستخدام" : "Terms of Use"}
              </span>
              <span aria-hidden className="text-lime">
                ←
              </span>
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 5.5A2.5 2.5 0 0 1 7.5 3h9A2.5 2.5 0 0 1 19 5.5v7A2.5 2.5 0 0 1 16.5 15H11l-4 4v-4H7.5A2.5 2.5 0 0 1 5 12.5v-7z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
