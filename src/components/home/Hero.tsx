"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const t = useTranslations("home.hero");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 48]);

  return (
    <section
      id="home"
      ref={ref}
      className="bg-[#223219] px-3 pb-3 md:px-4 md:pb-4 xl:px-8 xl:pb-0"
    >
      {/* Figma: studio frame 1376×960, photo from y=186 h=774, headline from y=56 */}
      <div className="relative mx-auto w-full max-w-[1376px] overflow-clip rounded-[28px] bg-[#16231b] md:rounded-[32px] xl:h-[960px] xl:rounded-[40px]">
        <div className="relative z-10 flex w-full flex-col items-center px-4 pt-8 text-center md:px-6 md:pt-10 xl:absolute xl:inset-x-0 xl:top-14 xl:z-20 xl:px-10 xl:pt-0">
          <h1 className="w-full max-w-[1100px] text-[48px] leading-[1.18] font-bold tracking-normal text-white md:text-[72px] xl:text-[104px]">
            <span className="block">{t("line1")}</span>
            <span className="block">{t("line2")}</span>
          </h1>
          <motion.p
            initial={{ opacity: 0.001, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.9, ease: EASE }}
            className="mt-3.5 max-w-[800px] text-balance text-xl leading-[1.6] font-normal text-[#c3e2b1] xl:mt-[14px]"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <motion.div
          className="relative aspect-[1.7778] w-full md:aspect-[2] xl:absolute xl:inset-x-0 xl:top-[186px] xl:aspect-auto xl:h-[774px]"
          style={{ y: imageY }}
          initial={{ opacity: 0.001, y: 60, scale: 1.06 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15, duration: 1.5, ease: EASE }}
        >
          <Image
            src="/assets/home/hero.png"
            alt={t("title")}
            fill
            priority
            sizes="(max-width: 1376px) 100vw, 1376px"
            className="object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#16231b] to-transparent md:h-52 xl:h-60" />
        </motion.div>
      </div>
    </section>
  );
}
