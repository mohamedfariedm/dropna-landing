import { setRequestLocale, getTranslations } from "next-intl/server";
import { ContactPage } from "@/features/contact/ContactPage";
import { HydrateClient } from "@/components/providers/HydrateClient";
import { routing, type AppLocale } from "@/i18n/routing";
import { prefetchContact } from "@/lib/query/prefetch";
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
  const t = await getTranslations({ locale, namespace: "contact" });
  return buildMetadata({
    locale: locale as AppLocale,
    title: t("meta.title"),
    description: t("meta.description"),
    path: "/contact",
  });
}

export default async function Contact({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const state = await prefetchContact(locale as AppLocale);

  return (
    <HydrateClient state={state}>
      <ContactPage />
    </HydrateClient>
  );
}
