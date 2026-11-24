import { IBM_Plex_Sans_Arabic, Sora } from "next/font/google";
import { NotFoundPage } from "@/components/not-found/NotFoundPage";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export default async function RootNotFound() {
  const locale = await getLocale();
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
            <Header />
            <main className="flex-1">
              <NotFoundPage />
            </main>
            <Footer />
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
