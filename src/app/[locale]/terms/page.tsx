import { setRequestLocale, getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/legal/LegalPage";
import { HydrateClient } from "@/components/providers/HydrateClient";
import { getTerms } from "@/lib/api/services";
import { routing, type AppLocale } from "@/i18n/routing";
import { prefetchTerms } from "@/lib/query/prefetch";
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
  const t = await getTranslations({ locale, namespace: "terms" });
  return buildMetadata({
    locale: locale as AppLocale,
    title: t("meta.title"),
    description: t("meta.description"),
    path: "/terms",
  });
}

export default async function Terms({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as AppLocale;
  const [state, doc] = await Promise.all([
    prefetchTerms(typedLocale),
    getTerms(typedLocale),
  ]);

  return (
    <HydrateClient state={state}>
      <LegalPage doc={doc} namespace="terms" />
    </HydrateClient>
  );
}
