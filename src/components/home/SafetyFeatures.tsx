"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";

const cards = [
  {
    key: "share" as const,
    icon: "/assets/home/icons/share.svg",
    className: "order-1 xl:col-start-1 xl:row-start-1",
  },
  {
    key: "driver" as const,
    icon: "/assets/home/icons/driver.svg",
    className: "order-2 xl:col-start-3 xl:row-start-1",
  },
  {
    key: "places" as const,
    icon: "/assets/home/icons/places.svg",
    className: "order-4 xl:col-start-1 xl:row-start-2",
  },
  {
    key: "promo" as const,
    icon: "/assets/home/icons/promo.svg",
    className: "order-5 xl:col-start-3 xl:row-start-2",
  },
];

export function SafetyFeatures() {
  const t = useTranslations("home.features");

  return (
    <section
      id="features"
      className="bg-[#364f28] px-5 pt-10 pb-12 text-white md:px-6 md:pb-14 xl:px-20 xl:pt-10 xl:pb-[56px]"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 xl:gap-14">
        <h2 className="text-start text-4xl leading-[1.25] font-bold tracking-normal md:text-5xl xl:text-[64px]">
          {t("title")}
        </h2>

        <div
          dir="ltr"
          className="grid grid-cols-1 gap-3.5 xl:grid-cols-3 xl:grid-rows-[240px_240px] xl:gap-x-[25px] xl:gap-y-6"
        >
          {cards.map((card) => (
            <Reveal key={card.key} className={card.className}>
              <article className="flex h-full min-h-[220px] flex-col items-end justify-end rounded-[32px] bg-[#223219] p-6 text-end transition-colors duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#4b6d37] xl:min-h-0 xl:p-8">
                <span className="mb-8 flex size-8 shrink-0 items-center justify-center overflow-hidden">
                  <img
                    src={card.icon}
                    alt=""
                    width={32}
                    height={32}
                    className="block size-full object-contain"
                  />
                </span>
                <h3 className="text-2xl leading-[1.6] font-bold">
                  {t(`items.${card.key}.title`)}
                </h3>
                <p className="mt-2 text-base leading-[1.6] text-[#c3e2b1]">
                  {t(`items.${card.key}.desc`)}
                </p>
              </article>
            </Reveal>
          ))}

          <Reveal className="relative order-3 h-[300px] overflow-hidden rounded-[32px] xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:h-auto">
            <Image
              src="/assets/home/feature-seat.png"
              alt={t("title")}
              fill
              sizes="(max-width: 1280px) 100vw, 410px"
              className="object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
