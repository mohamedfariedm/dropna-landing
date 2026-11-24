import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

/**
 * Figma Pair — 404 (22224:11723): cream editorial hero, 4 + wheel + 4, dual CTAs.
 */
export async function NotFoundPage() {
  const t = await getTranslations("common.errors");
  const tNav = await getTranslations("common.nav");
  const locale = await getLocale();
  const isAr = locale === "ar";

  return (
    <div className="bg-cream">
      <section className="mx-auto w-full max-w-[1440px] px-5 pb-14 pt-10 sm:px-10 sm:pb-[112px] sm:pt-[88px] lg:px-20">
        {/* items-start → inline-start (right in RTL) for label, accent, and 404 glyph */}
        <div className="flex w-full flex-col items-start gap-5 sm:gap-9">
          <p className="text-[13px] font-medium leading-none text-[#3f7a22] sm:text-[15px]">
            {isAr ? (
              <>
                <span>خطأ </span>
                <span className="font-[family-name:var(--font-body)] font-normal">
                  404
                </span>
              </>
            ) : (
              <>
                <span className="font-[family-name:var(--font-body)] font-normal">
                  404
                </span>
                <span> Error</span>
              </>
            )}
          </p>

          <span
            className="h-[5px] w-12 rounded-[3px] bg-lime sm:h-1.5 sm:w-16"
            aria-hidden
          />

          <div className="flex items-center gap-2.5 sm:gap-[18px]" aria-hidden>
            <span className="font-[family-name:var(--font-body)] text-[120px] font-semibold leading-none text-forest sm:text-[220px]">
              4
            </span>
            <Image
              src="/assets/404/wheel.svg"
              alt=""
              width={176}
              height={176}
              className="size-[92px] sm:size-[176px]"
              priority
            />
            <span className="font-[family-name:var(--font-body)] text-[120px] font-semibold leading-none text-forest sm:text-[220px]">
              4
            </span>
          </div>

          <div className="h-px w-full bg-[rgba(34,50,25,0.12)]" />

          {/* Text at inline-start; actions at inline-end (left in RTL) */}
          <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div className="max-w-[640px] text-start">
              <h1 className="text-[28px] font-bold leading-[1.3] text-forest sm:text-[44px] sm:leading-[1.2]">
                {t("notFound")}
              </h1>
              <p className="mt-3 text-base leading-[1.6] text-[#373737] sm:text-xl">
                {t("notFoundBody")}
              </p>
            </div>

            <div className="flex w-full flex-col gap-2.5 pt-2 sm:w-auto sm:flex-row sm:gap-3 sm:pt-0">
              {/* Home first → inline-start of this group (right in RTL), closer to copy */}
              <Link
                href="/"
                className="focus-ring inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-forest px-7 text-base font-semibold text-white sm:w-auto"
              >
                <Image
                  src="/assets/icons/arrow.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="size-[18px] brightness-0 invert ltr:-scale-x-100"
                />
                {t("backHome")}
              </Link>
              <Link
                href="/contact"
                className="focus-ring inline-flex h-[52px] w-full items-center justify-center rounded-full border border-[rgba(31,31,31,0.16)] px-7 text-base font-semibold text-[#1f1f1f] sm:w-auto"
              >
                {tNav("contact")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
