"use client";

import { useLocale, useTranslations } from "next-intl";
import { EditorialHero } from "@/components/layout/EditorialHero";
import { ContactForm } from "@/features/contact/ContactForm";
import { Link } from "@/i18n/navigation";
import type { LocaleCode } from "@/lib/api/types";
import { publicEnv } from "@/lib/env";
import { useFaqQuery } from "@/lib/query/queries/faq";
import { useSettingsQuery } from "@/lib/query/queries/settings";
import { cn } from "@/lib/utils";

export function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale() as LocaleCode;
  const { data: settings } = useSettingsQuery(locale);
  const { data: faq } = useFaqQuery(locale);

  const email = settings?.supportEmail ?? publicEnv.NEXT_PUBLIC_SUPPORT_EMAIL;
  const social = settings?.socialHandle ?? publicEnv.NEXT_PUBLIC_SOCIAL_HANDLE;
  const hotline =
    settings?.transportHotline ?? publicEnv.NEXT_PUBLIC_TRANSPORT_HOTLINE;

  const teasers = (faq?.items ?? []).slice(0, 3);

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

      <div className="mx-auto w-full max-w-[1280px] px-4 py-10 sm:px-10 sm:py-24 lg:px-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-8">
          {/* Channels 440 — in RTL appears on the right when first */}
          <div className="order-2 w-full shrink-0 space-y-4 lg:order-1 lg:w-[440px]">
            <h2 className="text-lg font-medium text-[#1f1f1f]">
              {t("direct.title")}
            </h2>
            <ChannelCard
              title={t("direct.emailLabel")}
              body={email}
              hint={t("direct.emailHint")}
              href={`mailto:${email}`}
            />
            <ChannelCard
              title={t("direct.socialLabel")}
              body={social}
              hint={t("direct.socialHint")}
            />
            <ChannelCard
              title={t("direct.appTitle")}
              body={t("direct.appCta")}
              hint={t("direct.appHint")}
            />
            <ChannelCard
              title={t("direct.hotlineTitle")}
              body={hotline}
              hint={t("direct.hotlineHint")}
              href={`tel:${hotline}`}
              dark
            />
          </div>

          <div className="order-1 min-w-0 flex-1 rounded-[32px] bg-white p-6 sm:p-12 lg:order-2 lg:max-w-[808px]">
            <h2 className="text-3xl font-bold text-[#1f1f1f] sm:text-[36px] sm:leading-[45px]">
              {t("form.title")}
            </h2>
            <p className="mt-2 text-base text-[#373737]">{t("form.subtitle")}</p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[28px] bg-white px-6 py-8 sm:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#1f1f1f] sm:text-3xl">
                {t("faqTeaser.title")}
              </h2>
              <p className="mt-2 text-[#373737]">{t("faqTeaser.subtitle")}</p>
            </div>
            <Link
              href="/faq"
              className="focus-ring rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-forest"
            >
              {t("faqTeaser.all")}
            </Link>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {teasers.map((item) => (
              <li key={item.id}>
                <Link
                  href="/faq"
                  className="block rounded-2xl bg-cream px-4 py-3 text-sm text-forest transition hover:bg-forest/5"
                >
                  {item.question[locale]}
                </Link>
              </li>
            ))}
          </ul>
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
  dark,
}: {
  title: string;
  body: string;
  hint: string;
  href?: string;
  dark?: boolean;
}) {
  const inner = (
    <>
      <p
        className={cn(
          "text-sm",
          dark ? "text-white/60" : "text-[#373737]",
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          "mt-1 font-semibold",
          dark
            ? "text-[44px] font-semibold leading-none text-lime"
            : "text-xl text-[#1f1f1f]",
        )}
      >
        {body}
      </p>
      <p
        className={cn(
          "mt-2 text-sm",
          dark ? "text-white/72" : "text-[#373737]",
        )}
      >
        {hint}
      </p>
    </>
  );

  const className = cn(
    "focus-ring block rounded-[28px] p-7 transition",
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
