import { setRequestLocale, getTranslations } from "next-intl/server";
import { FaqPage } from "@/components/faq/FaqPage";
import { HydrateClient } from "@/components/providers/HydrateClient";
import { routing, type AppLocale } from "@/i18n/routing";
import { prefetchFaq } from "@/lib/query/prefetch";
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
  const t = await getTranslations({ locale, namespace: "faq" });
  return buildMetadata({
    locale: locale as AppLocale,
    title: t("meta.title"),
    description: t("meta.description"),
    path: "/faq",
  });
}

export default async function Faq({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const state = await prefetchFaq(locale as AppLocale);

  return (
    <HydrateClient state={state}>
      <FaqPage />
    </HydrateClient>
  );
}
