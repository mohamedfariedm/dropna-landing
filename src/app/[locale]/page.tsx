import { setRequestLocale, getTranslations } from "next-intl/server";
import { HomePage } from "@/components/home/HomePage";
import { HydrateClient } from "@/components/providers/HydrateClient";
import { routing, type AppLocale } from "@/i18n/routing";
import { publicEnv } from "@/lib/env";
import { prefetchHome } from "@/lib/query/prefetch";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return buildMetadata({
    locale: locale as AppLocale,
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const state = await prefetchHome(locale as AppLocale);
  const t = await getTranslations({ locale, namespace: "common" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: t("brand"),
    url: `${publicEnv.NEXT_PUBLIC_APP_URL}/${locale}`,
    email: publicEnv.NEXT_PUBLIC_SUPPORT_EMAIL,
  };

  return (
    <HydrateClient state={state}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage />
    </HydrateClient>
  );
}
