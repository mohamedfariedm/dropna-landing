"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Logo } from "@/components/brand/Logo";
import { Link, usePathname } from "@/i18n/navigation";

const links = [
  { href: "/", key: "home" as const },
  { href: "/#app", key: "app" as const },
  { href: "/#services", key: "services" as const },
  { href: "/#classes", key: "classes" as const },
  { href: "/#features", key: "features" as const },
  { href: "/contact", key: "contact" as const },
  { href: "/faq", key: "faq" as const },
];

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  const t = useTranslations("common.nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 bg-forest text-cream"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="container-wide flex h-[var(--header-h)] items-center justify-between px-5 sm:px-8">
            <button
              type="button"
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-2xl"
              aria-label={t("close")}
              onClick={onClose}
            >
              ×
            </button>
            <Logo variant="white" />
            <Link
              href={pathname}
              locale={locale === "ar" ? "en" : "ar"}
              className="focus-ring rounded-full px-3 py-2 text-sm"
              onClick={onClose}
            >
              {t("language")}
            </Link>
          </div>

          <nav className="container-wide flex flex-col gap-2 px-5 pb-10 pt-6 sm:px-8">
            {links.map((link, index) => (
              <motion.div
                key={link.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.35 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="focus-ring block rounded-2xl px-2 py-3 text-3xl font-semibold tracking-tight sm:text-4xl"
                >
                  {t(link.key)}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.35 }}
              className="pt-6"
            >
              <Link
                href="/#download"
                onClick={onClose}
                className="focus-ring inline-flex rounded-full bg-lime px-6 py-3 text-base font-semibold text-forest"
              >
                {t("download")}
              </Link>
            </motion.div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
