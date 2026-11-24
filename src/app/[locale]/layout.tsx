import { IBM_Plex_Sans_Arabic, Sora } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AppProviders } from "@/components/providers/AppProviders";
import { routing, type AppLocale } from "@/i18n/routing";
import "../globals.css";

/** Matches Framer reference: IBM Plex Sans Arabic for UI/headings */
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

/** Matches Framer reference: Sora for Latin UI (English, store badges) */
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${plexArabic.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-forest font-sans text-ink">
        <NextIntlClientProvider messages={messages}>
          <AppProviders>
            <CustomCursor />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export type { AppLocale };
