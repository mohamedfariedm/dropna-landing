"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { EditorialHero } from "@/components/layout/EditorialHero";
import { Link } from "@/i18n/navigation";
import type { LegalDocument, LocaleCode } from "@/lib/api/types";
import { publicEnv } from "@/lib/env";
import { cn } from "@/lib/utils";

type LegalPageProps = {
  doc: LegalDocument;
  namespace: "privacy" | "terms";
};

export function LegalPage({ doc, namespace }: LegalPageProps) {
  const t = useTranslations(namespace);
  const tNav = useTranslations("common.nav");
  const locale = useLocale() as LocaleCode;
  const [tocOpen, setTocOpen] = useState(false);
  const [activeId, setActiveId] = useState(doc.sections[0]?.id ?? "");

  const updated = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(doc.updatedAt));

  const email = publicEnv.NEXT_PUBLIC_SUPPORT_EMAIL;

  useEffect(() => {
    const sections = doc.sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop,
          );
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [doc.sections]);

  return (
    <div className="bg-white">
      <EditorialHero
        pageIndex={t("pageIndex")}
        title={t("title")}
        subtitle={t("intro")}
        breadcrumbHomeLabel={tNav("home")}
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

      <div className="mx-auto w-full max-w-[1440px] px-5 pb-16 pt-8 sm:px-10 sm:pb-[144px] sm:pt-24 lg:px-20">
        {/* Mobile TOC */}
        <div className="mb-6 lg:hidden">
          <button
            type="button"
            onClick={() => setTocOpen((v) => !v)}
            className="focus-ring flex w-full items-center gap-3 rounded-[20px] bg-cream px-4 py-3.5 text-start"
            aria-expanded={tocOpen}
          >
            <ChevronDown open={tocOpen} />
            <span className="min-w-0 flex-1">
              <span className="block text-sm text-[#373737]">
                {t("tocTitle")} · {doc.sections.length}{" "}
                {locale === "ar" ? "أقسام" : "sections"}
              </span>
              <span className="block truncate text-base font-medium text-[#1f1f1f]">
                {doc.sections.find((s) => s.id === activeId)?.title[locale] ??
                  doc.sections[0]?.title[locale]}
              </span>
            </span>
          </button>
          {tocOpen ? (
            <nav className="mt-2 rounded-[20px] bg-cream p-3">
              {doc.sections.map((section) => (
                <TocLink
                  key={section.id}
                  href={`#${section.id}`}
                  number={section.number}
                  title={section.title[locale]}
                  active={activeId === section.id}
                  onClick={() => setTocOpen(false)}
                />
              ))}
            </nav>
          ) : null}
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-24 rtl:lg:flex-row-reverse">
          <div className="min-w-0 flex-1 space-y-14 lg:max-w-[864px]">
            <div className="flex flex-col gap-6 rounded-[32px] bg-forest p-6 text-white sm:gap-6 sm:p-10">
              <div className="text-start">
                <h2 className="text-2xl font-bold leading-[1.4] sm:text-[28px]">
                  {t("summaryTitle")}
                </h2>
                <p className="mt-1 text-base leading-[1.5] text-white/90">
                  {t("summarySubtitle")}
                </p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-[18px]">
                {doc.summary.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <span className="mt-0.5 flex size-[26px] shrink-0 items-center justify-center rounded-full bg-lime">
                      <Image
                        src="/assets/icons/check.svg"
                        alt=""
                        width={14}
                        height={14}
                        className="size-3.5"
                      />
                    </span>
                    <span className="text-[17px] font-medium leading-[1.65] text-white">
                      {item.text[locale]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-14">
              {doc.sections.map((section, index) => (
                <div key={section.id} className="contents">
                  {index > 0 ? (
                    <div
                      className="h-px w-full bg-[rgba(34,50,25,0.08)]"
                      aria-hidden
                    />
                  ) : null}
                  <article id={section.id} className="scroll-mt-32 space-y-4">
                    <div className="flex flex-wrap items-center gap-3.5">
                      <span className="rounded-[10px] bg-cream px-2.5 py-1 font-[family-name:var(--font-body)] text-sm font-semibold leading-[1.4] text-[#3F7A22]">
                        {section.number}
                      </span>
                      <h2 className="text-2xl font-bold leading-[1.4] text-[#1f1f1f] sm:text-[28px]">
                        {section.title[locale]}
                      </h2>
                    </div>

                    {section.body[locale] ? (
                      <p className="whitespace-pre-line text-[17px] leading-[1.85] text-[#373737]">
                        {section.body[locale]}
                      </p>
                    ) : null}

                    {section.bullets?.length ? (
                      <ul
                        className={cn(
                          "space-y-2.5",
                          section.highlighted &&
                            "rounded-[20px] bg-cream px-7 py-6",
                        )}
                      >
                        {section.bullets.map((bullet, idx) => (
                          <li
                            key={idx}
                            className="flex gap-3.5 text-[17px] leading-[1.8] text-[#373737]"
                          >
                            <span className="mt-[11px] size-2 shrink-0 rounded-full bg-lime" />
                            <span>{bullet[locale]}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                </div>
              ))}
            </div>

            <div className="flex flex-col-reverse items-stretch justify-between gap-6 rounded-[28px] bg-cream px-8 py-8 sm:flex-row sm:items-center sm:px-9 sm:py-8">
            <div className="text-start sm:text-start">
                <h2 className="text-[22px] font-bold leading-[1.4] text-[#1f1f1f]">
                  {t("cta.title")}
                </h2>
                <p className="mt-1 text-base leading-[1.5] text-[#373737]">
                  {t("cta.emailPrefix")}{" "}
                  <a
                    href={`mailto:${email}`}
                    className="underline decoration-lime/50 underline-offset-4"
                  >
                    {email}
                  </a>
                </p>
              </div>
              <Link
                href="/contact"
                className="focus-ring inline-flex h-[52px] shrink-0 items-center justify-center gap-2.5 rounded-full bg-forest px-7 text-base font-semibold text-white transition hover:bg-forest-mid"
              >
                
                <span>{t("cta.contact")}</span>
                <Image
                  src="/assets/icons/arrow.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="size-[18px] brightness-0 invert ltr:rotate-180"
                />
              </Link>
              
            </div>
          </div>

          <aside className="hidden w-full shrink-0 lg:sticky lg:top-32 lg:block lg:w-[320px] lg:self-start">
            <div className="rounded-3xl bg-cream p-3">
              <p className="px-3.5 pb-2 pt-2.5 text-sm font-semibold leading-[1.4] text-[#373737]">
                {t("tocTitle")}
              </p>
              <nav className="flex flex-col gap-0.5">
                {doc.sections.map((section) => (
                  <TocLink
                    key={section.id}
                    href={`#${section.id}`}
                    number={section.number}
                    title={section.title[locale]}
                    active={activeId === section.id}
                  />
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function TocLink({
  href,
  number,
  title,
  active,
  onClick,
}: {
  href: string;
  number: string;
  title: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "focus-ring relative flex items-center gap-3 rounded-xl px-3.5 py-[9px] transition",
        active
          ? "bg-white text-[#1f1f1f]"
          : "text-[#373737] hover:bg-white/70",
      )}
    >
      {active ? (
        <span
          className="absolute start-2 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-[2px] bg-lime"
          aria-hidden
        />
      ) : null}
      <span
        className={cn(
          "shrink-0 font-[family-name:var(--font-body)] text-[13px] leading-[1.5]",
          active ? "text-[#3F7A22]" : "text-[#373737]/50",
        )}
      >
        {number}
      </span>
      <span
        className={cn(
          "min-w-0 flex-1 text-start text-[15px] leading-[1.5]",
          active ? "font-semibold" : "font-normal",
        )}
      >
        {title}
      </span>
    </a>
  );
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={cn(
        "shrink-0 text-[#1f1f1f] transition",
        open && "rotate-180",
      )}
    >
      <path
        d="M5 7.5 10 12.5 15 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
