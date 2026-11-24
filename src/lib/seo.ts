import type { Metadata } from "next";
import { publicEnv } from "@/lib/env";
import type { AppLocale } from "@/i18n/routing";

type BuildMetadataInput = {
  locale: AppLocale;
  title: string;
  description: string;
  path?: string;
};

export function buildMetadata({
  locale,
  title,
  description,
  path = "",
}: BuildMetadataInput): Metadata {
  const base = publicEnv.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  const localizedPath = `/${locale}${path}`;
  const url = `${base}${localizedPath}`;
  const otherLocale = locale === "ar" ? "en" : "ar";

  return {
    title,
    description,
    metadataBase: new URL(base),
    alternates: {
      canonical: url,
      languages: {
        ar: `${base}/ar${path}`,
        en: `${base}/en${path}`,
        "x-default": `${base}/ar${path}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: [otherLocale === "ar" ? "ar_SA" : "en_US"],
      url,
      siteName: locale === "ar" ? "دروبنا" : "Droobna",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
