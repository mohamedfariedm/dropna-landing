"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function Services() {
  const t = useTranslations("home.services");

  return (
    <section id="services" className="bg-[#edf6e8] px-5 py-12 md:px-6 md:py-14 xl:px-20 xl:py-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-10 xl:gap-14">
        <div className="flex w-full flex-col items-start gap-2 xl:flex-row xl:items-end xl:justify-between xl:gap-10">
          <h2 className="w-full max-w-[800px] text-start text-4xl leading-[1.25] font-bold tracking-normal text-[#223219] md:text-5xl xl:text-[64px]">
            {t("title")}
          </h2>
          <p className="text-start text-xl leading-[1.6] text-[#373737] xl:max-w-[440px] xl:pb-2 xl:text-end">
            {t("eyebrow")}
          </p>
        </div>

        <div className="grid w-full gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <ServiceCard
              title={t("items.solo.title")}
              desc={t("items.solo.desc")}
              image="/assets/home/service-solo.png"
              className="h-[260px] md:h-[300px] xl:h-[336px]"
            />
            <ServiceCard
              title={t("items.shared.title")}
              desc={t("items.shared.desc")}
              image="/assets/home/service-shared.png"
              className="h-[440px] md:h-[520px] xl:h-[640px]"
            />
          </div>
          <div className="flex flex-col gap-6">
            <ServiceCard
              title={t("items.scheduled.title")}
              desc={t("items.scheduled.desc")}
              image="/assets/home/service-scheduled.png"
              className="h-[440px] md:h-[520px] xl:h-[640px]"
            />
            <ServiceCard
              title={t("items.instant.title")}
              desc={t("items.instant.desc")}
              image="/assets/home/service-instant.png"
              className="h-[260px] md:h-[300px] xl:h-[336px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  title,
  desc,
  image,
  className,
}: {
  title: string;
  desc: string;
  image: string;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <article className={cn("group relative h-full overflow-hidden rounded-[32px]", className)}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-60 bg-gradient-to-b from-transparent to-[rgba(34,50,25,0.85)]" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1 p-6 text-start sm:p-8 xl:p-10">
          <h3 className="text-[28px] leading-[1.25] font-bold tracking-normal text-white md:text-4xl xl:text-[48px]">
            {title}
          </h3>
          <p className="text-lg leading-[1.6] font-medium text-white">{desc}</p>
        </div>
      </article>
    </Reveal>
  );
}
