"use client";

import { useLocale, useTranslations } from "next-intl";
import { EditorialHero } from "@/components/layout/EditorialHero";
import { Link } from "@/i18n/navigation";
import type { LegalDocument, LocaleCode } from "@/lib/api/types";
import { publicEnv } from "@/lib/env";

type LegalPageProps = {
  doc: LegalDocument;
  namespace: "privacy" | "terms";
};

export function LegalPage({ doc, namespace }: LegalPageProps) {
  const t = useTranslations(namespace);
  const locale = useLocale() as LocaleCode;

  const updated = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(doc.updatedAt));

  return (
    <div className="bg-white">
      <EditorialHero
        pageIndex={t("pageIndex")}
        title={t("title")}
        subtitle={t("intro")}
        breadcrumbHomeLabel={locale === "ar" ? "الرئيسية" : "Home"}
        breadcrumbCurrent={t("title")}
        meta={
          <>
            <p>
              {t("updatedLabel")}: {updated}
            </p>
            <p>
              {t("readTimeLabel")}: {doc.readTimeMinutes}{" "}
              {locale === "ar" ? "دقائق" : "min"}
            </p>
          </>
        }
      />

      <div className="mx-auto w-full max-w-[1280px] px-4 py-10 sm:px-10 sm:py-24 lg:px-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">
          {/* Article first in DOM → RTL places it on the right (Framer) */}
          <div className="min-w-0 flex-1 space-y-12 lg:max-w-[864px]">
            <div className="rounded-[32px] bg-forest px-6 py-8 text-cream sm:px-10 sm:py-10">
              <h2 className="text-2xl font-bold">{t("summaryTitle")}</h2>
              <p className="mt-2 text-sm text-white/60">{t("summarySubtitle")}</p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-4">
                {doc.summary.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <span className="mt-0.5 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-lime text-sm font-bold text-forest">
                      ✓
                    </span>
                    <span className="text-lg font-medium leading-relaxed text-white/92">
                      {item.text[locale]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-12">
              {doc.sections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-32 border-b border-forest/10 pb-12 last:border-0"
                >
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-[10px] bg-cream px-2.5 py-1 font-[family-name:var(--font-body)] text-sm font-semibold text-[#3F7A22]">
                      {section.number}
                    </span>
                    <h2 className="text-2xl font-bold text-[#1f1f1f]">
                      {section.title[locale]}
                    </h2>
                  </div>
                  <p className="whitespace-pre-line text-lg leading-[1.6] text-[#373737]">
                    {section.body[locale]}
                  </p>
                  {section.bullets?.length ? (
                    <ul className="mt-4 space-y-3">
                      {section.bullets.map((bullet, idx) => (
                        <li
                          key={idx}
                          className="flex gap-3 text-lg leading-relaxed text-[#373737]"
                        >
                          <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-lime" />
                          <span>{bullet[locale]}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>

            <div className="flex flex-col items-start justify-between gap-6 rounded-[28px] bg-cream px-8 py-8 sm:flex-row sm:items-center">
              <div>
                <Link
                  href="/contact"
                  className="text-sm font-bold text-forest underline-offset-4 hover:underline"
                >
                  {t("cta.contact")}
                </Link>
                <h2 className="mt-2 text-2xl font-bold text-[#1f1f1f]">
                  {t("cta.title")}
                </h2>
                <p className="mt-2 text-[#373737]">
                  <a
                    href={`mailto:${publicEnv.NEXT_PUBLIC_SUPPORT_EMAIL}`}
                    className="underline decoration-lime/50 underline-offset-4"
                  >
                    {publicEnv.NEXT_PUBLIC_SUPPORT_EMAIL}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <aside className="hidden w-full shrink-0 lg:sticky lg:top-32 lg:block lg:w-[320px] lg:self-start">
            <div className="rounded-3xl bg-cream p-3">
              <p className="px-3.5 pb-2 pt-2.5 text-sm text-[#373737]">
                {t("tocTitle")}
              </p>
              <nav className="flex flex-col gap-0.5">
                {doc.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="focus-ring flex h-11 items-center justify-between gap-3 rounded-xl px-3.5 text-[#373737] transition hover:bg-white"
                  >
                    <span className="text-base">{section.title[locale]}</span>
                    <span className="font-[family-name:var(--font-body)] text-[13px] text-[#373737]/50">
                      {section.number}
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
