import { Link } from "@/i18n/navigation";

type EditorialHeroProps = {
  pageIndex: string;
  title: string;
  subtitle?: string;
  breadcrumbCurrent: string;
  breadcrumbHomeLabel: string;
  meta?: React.ReactNode;
};

/**
 * Framer “Hero — Editorial” shell shared by FAQ / Contact / Privacy / Terms.
 * Desktop: bg #16231B, pad 88/80/72, h1 ~104px, divider, bottom meta+subtitle.
 */
export function EditorialHero({
  pageIndex,
  title,
  subtitle,
  breadcrumbCurrent,
  breadcrumbHomeLabel,
  meta,
}: EditorialHeroProps) {
  return (
    <section className="bg-studio text-cream">
      <div className="mx-auto w-full max-w-[1280px] px-5 pb-12 pt-10 sm:px-10 sm:pb-[72px] sm:pt-[88px] lg:px-20">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <p className="font-[family-name:var(--font-body)] text-[15px] font-normal text-white/40">
            {pageIndex}
          </p>
          <nav className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-white/60 transition hover:text-white"
              >
                {breadcrumbHomeLabel}
              </Link>
              <span className="text-[#c3e2b1]">{breadcrumbCurrent}</span>
            </div>
            <span className="h-1.5 w-16 rounded-[3px] bg-lime" aria-hidden />
          </nav>
        </div>

        <h1 className="max-w-5xl text-[2rem] font-bold leading-[1.18] text-white sm:text-6xl lg:text-[104px] lg:leading-[1.18]">
          {title}
        </h1>

        <div className="mt-8 h-px w-full bg-white/14" />

        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* First in DOM → start side (right in RTL) — Framer puts subtitle at start */}
          {subtitle ? (
            <p className="max-w-[600px] text-base leading-8 text-white/80 sm:text-xl sm:leading-8">
              {subtitle}
            </p>
          ) : (
            <div />
          )}
          {meta ? (
            <div className="space-y-1.5 text-sm leading-relaxed text-white/55 sm:text-end">
              {meta}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
