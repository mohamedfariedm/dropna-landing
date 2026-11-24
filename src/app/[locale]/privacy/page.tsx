import { setRequestLocale, getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/legal/LegalPage";
import { HydrateClient } from "@/components/providers/HydrateClient";
import { getPrivacy } from "@/lib/api/services";
import { routing, type AppLocale } from "@/i18n/routing";
import { prefetchPrivacy } from "@/lib/query/prefetch";
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
  const t = await getTranslations({ locale, namespace: "privacy" });
  return buildMetadata({
    locale: locale as AppLocale,
    title: t("meta.title"),
    description: t("meta.description"),
    path: "/privacy",
  });
}

export default async function Privacy({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as AppLocale;
  const [state, doc] = await Promise.all([
    prefetchPrivacy(typedLocale),
    getPrivacy(typedLocale),
  ]);

  return (
    <HydrateClient state={state}>
      <LegalPage doc={doc} namespace="privacy" />
    </HydrateClient>
  );
}
