import { getLocale, getTranslations } from "next-intl/server";
import { Logo } from "@/components/brand/Logo";
import { StoreButtons } from "@/components/ui/StoreButtons";
import { Link } from "@/i18n/navigation";
import { publicEnv } from "@/lib/env";

const footerLink =
  "focus-ring text-base leading-[1.6] font-normal text-white transition-colors duration-200 ease-[cubic-bezier(0.44,0,0.56,1)] hover:text-lime";

const columnTitle = "text-sm leading-[1.6] font-normal text-white/50";

export async function Footer() {
  const t = await getTranslations("common");
  const locale = await getLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="rounded-t-[40px] bg-[#1f1f1f] px-5 pt-16 pb-10 text-white min-[1200px]:px-20 min-[1200px]:pt-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10">
        <div className="flex flex-col gap-10 min-[1200px]:flex-row min-[1200px]:items-start min-[1200px]:justify-between">
          <div className="flex flex-col items-start gap-4 text-start">
            <Logo variant="white" className="h-7 w-[145px]" />
            <p className="text-base leading-[1.6] text-[#c3e2b1]">{t("tagline")}</p>
            <div dir="ltr" className="flex items-center gap-4 text-sm leading-[1.6] whitespace-nowrap text-white/70">
              <a
                href={`mailto:${publicEnv.NEXT_PUBLIC_SUPPORT_EMAIL}`}
                className="focus-ring text-sm leading-[1.6] font-normal text-white/70 transition-colors duration-200 ease-[cubic-bezier(0.44,0,0.56,1)] hover:text-lime"
              >
                {publicEnv.NEXT_PUBLIC_SUPPORT_EMAIL}
              </a>
              <p>{publicEnv.NEXT_PUBLIC_SOCIAL_HANDLE}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 min-[1200px]:contents">
            <div className="flex flex-col items-start gap-3.5 text-start">
              <h3 className={columnTitle}>{t("footer.brandNav")}</h3>
              <ul className="flex flex-col gap-3.5">
                <li>
                  <Link href="/#home" className={footerLink}>
                    {t("nav.home")}
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className={footerLink}>
                    {t("nav.services")}
                  </Link>
                </li>
                <li>
                  <Link href="/#classes" className={footerLink}>
                    {t("nav.classes")}
                  </Link>
                </li>
                <li>
                  <Link href="/#features" className={footerLink}>
                    {t("nav.features")}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-start gap-3.5 text-start">
              <h3 className={columnTitle}>{t("footer.help")}</h3>
              <ul className="flex flex-col gap-3.5">
                <li>
                  <Link href="/contact" className={footerLink}>
                    {t("nav.contact")}
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className={footerLink}>
                    {t("nav.faq")}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-start gap-3.5 text-start">
              <h3 className={columnTitle}>{t("footer.legal")}</h3>
              <ul className="flex flex-col gap-3.5">
                <li>
                  <Link href="/privacy" className={footerLink}>
                    {t("nav.privacy")}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className={footerLink}>
                    {t("nav.terms")}
                  </Link>
                </li>
                {locale === "en" ? (
                  <li>
                    <Link href="/privacy" className={footerLink}>
                      {t("nav.cookies")}
                    </Link>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 text-start">
            <h3 className={columnTitle}>{t("footer.download")}</h3>
            <StoreButtons variant="footer" />
          </div>
        </div>

        <div className="h-px w-full bg-white/10" />

        <div className="flex flex-col gap-3 text-sm leading-[1.6] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/60">{t("footer.rights", { year })}</p>
          <p className="text-white/50">{t("footer.cr")}</p>
        </div>
      </div>
    </footer>
  );
}
