"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Logo } from "@/components/brand/Logo";
import { DownloadDropdown } from "@/components/layout/DownloadDropdown";
import { MobileNav } from "@/components/layout/MobileNav";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

function subscribeScroll(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}

const navItems = [
  { href: "/#home", key: "home" as const, id: "home" },
  { href: "/#app", key: "app" as const, id: "app" },
  { href: "/#services", key: "services" as const, id: "services" },
  { href: "/#classes", key: "classes" as const, id: "classes" },
  { href: "/#features", key: "features" as const, id: "features" },
  { href: "/contact", key: "contact" as const, id: null },
];

export function Header() {
  const t = useTranslations("common.nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const isScrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 48,
    () => false,
  );

  useEffect(() => {
    if (pathname !== "/") return;
    const ids = ["home", "app", "services", "classes", "features", "download"];
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-35% 0px -50% 0px", threshold: 0.01 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-[padding] duration-300",
          isScrolled ? "py-3" : "pt-3",
        )}
      >
        <div
          className={cn(
            "mx-auto w-full",
            // Figma: bar is 1280. Scrolled frame adds 80px inset inside 1440.
            isScrolled
              ? "max-w-[1440px] px-4 sm:px-6 lg:px-20"
              : "max-w-[1280px] px-4 lg:px-0",
          )}
        >
          {/* Figma: Logo | Auto | Links (gap 40) | Auto | Actions (gap 24), pad 24 */}
          <div
            className={cn(
              "grid h-20 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center rounded-[20px] px-6 transition-all duration-300",
              isScrolled
                ? "bg-white shadow-[0_12px_32px_rgba(15,30,10,0.14),0_2px_6px_rgba(15,30,10,0.08)]"
                : "bg-transparent shadow-none",
            )}
          >
            <Link
              href="/"
              className={cn(
                "focus-ring shrink-0 justify-self-start rounded-full",
                !isScrolled && "px-4 py-2.5",
              )}
            >
              <Logo
                variant={isScrolled ? "color" : "white"}
                className="h-7 w-[150px]"
              />
            </Link>

            <nav className="hidden min-w-0 items-center justify-center gap-10 justify-self-stretch lg:flex">
              {navItems.map((item) => {
                const active =
                  item.id != null
                    ? pathname === "/" && activeId === item.id
                    : pathname.startsWith("/contact");
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={cn(
                      "focus-ring whitespace-nowrap text-base leading-[1.5] transition-[color,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-65",
                      isScrolled
                        ? active
                          ? "font-bold text-app"
                          : "font-medium text-[#1f1f1f]"
                        : active
                          ? "font-bold text-lime"
                          : "font-medium text-white",
                    )}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center justify-self-end gap-6">
              <Link
                href={pathname}
                locale={locale === "ar" ? "en" : "ar"}
                className={cn(
                  "focus-ring hidden whitespace-nowrap text-base font-medium leading-[1.5] transition-[color,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-65 lg:inline-flex",
                  isScrolled ? "text-[#1f1f1f]" : "text-white",
                )}
              >
                {t("language")}
              </Link>
              <div className="hidden lg:block">
                <DownloadDropdown />
              </div>
              <button
                type="button"
                className="focus-ring flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
                aria-label={t("menu")}
                aria-expanded={open}
                onClick={() => setOpen(true)}
              >
                <span className="flex w-5 flex-col gap-1.5">
                  <span
                    className={cn(
                      "h-[2px] w-full rounded-full",
                      isScrolled ? "bg-ink" : "bg-white",
                    )}
                  />
                  <span
                    className={cn(
                      "h-[2px] w-3.5 self-end rounded-full",
                      isScrolled ? "bg-ink" : "bg-white",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileNav open={open} onClose={() => setOpen(false)} />
    </>
  );
}
