import { Link } from "@/i18n/navigation";

type EditorialHeroProps = {
  pageIndex: string;
  title: string;
  subtitle?: string;
  breadcrumbCurrent: string;
  breadcrumbHomeLabel: string;
  meta?: React.ReactNode;
  /** Slot at inline-end (left in RTL), e.g. FAQ search. */
  bottomEnd?: React.ReactNode;
};

/**
 * Figma “Page hero — Editorial” shared by FAQ / Contact / Privacy / Terms.
 * Desktop: bg #16231B, pad 88/80, H1 136px, lime accent under breadcrumb, divider.
 */
export function EditorialHero({
  pageIndex,
  title,
  subtitle,
  breadcrumbCurrent,
  breadcrumbHomeLabel,
  meta,
  bottomEnd,
}: EditorialHeroProps) {
  const endSlot = bottomEnd ?? meta;

  return (
    <section className="bg-studio text-cream">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 pb-10 pt-10 sm:gap-9 sm:px-10 sm:pb-[72px] sm:pt-[88px] lg:px-20">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav
            className="order-1 flex items-center gap-2 text-[13px] sm:text-[15px] ltr:order-2"
            aria-label="Breadcrumb"
          >
            <span className="order-1 font-medium text-[#c3e2b1] ltr:order-3">
              {breadcrumbCurrent}
            </span>
            <ChevronIcon />
            <Link
              href="/"
              className="order-3 text-white transition hover:text-white/80 ltr:order-1"
            >
              {breadcrumbHomeLabel}
            </Link>
          </nav>
          <p className="order-2 font-[family-name:var(--font-body)] text-[13px] font-normal text-white sm:text-[15px] ltr:order-1">
            {pageIndex}
          </p>
        </div>

        <span
          className="ml-auto h-1.5 w-12 shrink-0 rounded-[3px] bg-lime sm:h-[6px] sm:w-16"
          aria-hidden
        />

        <h1 className="w-full text-[2rem] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl lg:text-[136px] lg:leading-[1.05] lg:tracking-[-2.72px]">
          {title}
        </h1>

        <div className="h-px w-full bg-white/14" />

        {(subtitle || endSlot) && (
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            {subtitle ? (
              <p className="max-w-[620px] text-base leading-[1.6] text-white sm:text-[22px] sm:leading-[1.6]">
                {subtitle}
              </p>
            ) : (
              <div />
            )}
            {endSlot ? (
              <div
                className={
                  bottomEnd
                    ? "w-full sm:max-w-[600px]"
                    : "space-y-1.5 font-[family-name:var(--font-display)] text-[13px] leading-[1.5] text-white sm:text-[15px] sm:text-start"
                }
              >
                {endSlot}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="order-2 shrink-0 text-white/50 ltr:rotate-180"
    >
      <path
        d="M10 3.5 5.5 8 10 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
