import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";
import { routing } from "@/i18n/routing";

const paths = ["", "/contact", "/faq", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicEnv.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  const now = new Date();

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${base}/${l}${path}`]),
        ),
      },
    })),
  );
}
