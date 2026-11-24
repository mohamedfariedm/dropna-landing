"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { EditorialHero } from "@/components/layout/EditorialHero";
import { ContactForm } from "@/features/contact/ContactForm";
import { Link } from "@/i18n/navigation";
import type { LocaleCode } from "@/lib/api/types";
import { publicEnv } from "@/lib/env";
import { useSettingsQuery } from "@/lib/query/queries/settings";
import { cn } from "@/lib/utils";

export function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale() as LocaleCode;
  const { data: settings } = useSettingsQuery(locale); // locale kept for settings query key

  const email = settings?.supportEmail ?? publicEnv.NEXT_PUBLIC_SUPPORT_EMAIL;
  const social = settings?.socialHandle ?? publicEnv.NEXT_PUBLIC_SOCIAL_HANDLE;
  const hotline =
    settings?.transportHotline ?? publicEnv.NEXT_PUBLIC_TRANSPORT_HOTLINE;

  const teaserChips = t.raw("faqTeaser.chips") as string[];

  return (
    <div className="bg-cream">
      <EditorialHero
        pageIndex={t("pageIndex")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        breadcrumbHomeLabel={t("breadcrumb.home")}
        breadcrumbCurrent={t("breadcrumb.current")}
        meta={
          <>
            <a href={`mailto:${email}`} className="hover:text-white">
              {email}
            </a>
            <p>{social}</p>
          </>
        }
      />

      <div className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-10 sm:py-24 lg:px-20">
        {/* Form first → mobile top + RTL desktop inline-start (right) */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-8">
          <div className="min-w-0 flex-1 rounded-[32px] bg-white p-6 sm:p-12 lg:max-w-[808px]">
            <h2 className="text-[28px] font-bold leading-[1.3] text-[#1f1f1f] sm:text-[32px]">
              {t("form.title")}
            </h2>
            <p className="mt-2 text-[15px] leading-[1.6] text-[#373737] sm:text-[17px]">
              {t("form.subtitle")}
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="w-full shrink-0 space-y-4 lg:w-[440px]">
            <h2 className="text-lg font-semibold text-[#1f1f1f]">
              {t("direct.title")}
            </h2>
            <ChannelCard
              title={t("direct.emailLabel")}
              body={email}
              hint={t("direct.emailHint")}
              href={`mailto:${email}`}
              icon="/assets/icons/mail.svg"
            />
            <ChannelCard
              title={t("direct.socialLabel")}
              body={social}
              hint={t("direct.socialHint")}
              icon="/assets/icons/at.svg"
            />
            <ChannelCard
              title={t("direct.appTitle")}
              body={t("direct.appCta")}
              hint={t("direct.appHint")}
              icon="/assets/icons/car.svg"
            />
            <ChannelCard
              title={t("direct.hotlineTitle")}
              body={hotline}
              hint={t("direct.hotlineHint")}
              href={`tel:${hotline}`}
              icon="/assets/icons/phone.svg"
              dark
            />
          </div>
        </div>

        <div className="mt-8 rounded-[28px] bg-white px-6 py-8 sm:px-10 sm:py-9">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="lg:max-w-[220px] lg:text-end">
              <h2 className="text-2xl font-bold text-[#1f1f1f] sm:text-[28px] sm:leading-[34px]">
                {t("faqTeaser.title")}
              </h2>
              <p className="mt-2 text-[15px] text-[#373737]">
                {t("faqTeaser.subtitle")}
              </p>
            </div>

            <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {teaserChips.map((label) => (
                <li key={label}>
                  <Link
                    href="/faq"
                    className="block rounded-full bg-cream px-4 py-2.5 text-sm text-[#1f1f1f] transition hover:bg-forest/5"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/faq"
              className="focus-ring inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-lime px-7 text-base font-semibold text-[#1f1f1f]"
            >
              <Image
                src="/assets/icons/arrow.svg"
                alt=""
                width={18}
                height={18}
                className="size-[18px] ltr:-scale-x-100"
              />
              {t("faqTeaser.all")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChannelCard({
  title,
  body,
  hint,
  href,
  icon,
  dark,
}: {
  title: string;
  body: string;
  hint: string;
  href?: string;
  icon: string;
  dark?: boolean;
}) {
  const inner = (
    <>
      <div className="min-w-0 flex-1 space-y-1 text-start">
        <p
          className={cn(
            "text-[15px] font-medium leading-[1.6]",
            dark ? "text-white" : "text-[#373737]",
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            "font-semibold leading-[1.5]",
            dark
              ? "font-[family-name:var(--font-body)] text-[44px] leading-[1.2] text-lime"
              : "text-xl text-[#1f1f1f]",
          )}
        >
          {body}
        </p>
        <p
          className={cn(
            "text-[15px] leading-[1.6]",
            dark ? "text-white" : "text-[#373737]",
          )}
        >
          {hint}
        </p>
      </div>
      <div
        className={cn(
          "flex size-[44px] shrink-0 items-center justify-center rounded-2xl sm:size-[52px]",
          dark ? "bg-white/8" : "bg-cream",
        )}
      >
        <Image
          src={icon}
          alt=""
          width={24}
          height={24}
          className={cn("size-[22px] sm:size-6", dark && "brightness-0 invert")}
        />
      </div>
    </>
  );

  const className = cn(
    "focus-ring flex items-start gap-4 rounded-[28px] p-5 transition sm:gap-4 sm:p-7",
    dark ? "bg-forest text-cream" : "bg-white hover:-translate-y-0.5",
  );

  if (href) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
}
