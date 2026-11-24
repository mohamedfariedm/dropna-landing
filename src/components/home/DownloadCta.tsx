"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { StoreButtons } from "@/components/ui/StoreButtons";

const EASE = [0.22, 1, 0.36, 1] as const;

export function DownloadCta() {
  const t = useTranslations("home.download");

  return (
    <section
      id="download"
      className="relative h-[560px] overflow-hidden bg-forest min-[810px]:h-[700px] min-[1200px]:h-[810px]"
    >
      <Image
        src="/assets/home/download-night.png"
        alt={t("title")}
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[440px] bg-gradient-to-b from-[#223219f2] to-transparent" />

      <RoadLight
        className="top-[468px] w-[280px] min-[810px]:top-[590px] min-[1200px]:top-[683px]"
        duration={3.6}
      />
      <RoadLight
        className="top-[502px] w-[360px] min-[810px]:top-[630px] min-[1200px]:top-[727px]"
        duration={5.2}
        delay={1.2}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1000px] flex-col items-center gap-[18px] px-5 pt-12 text-center min-[810px]:pt-14 min-[1200px]:pt-[72px]">
        <motion.h2
          className="text-[44px] leading-[1.18] font-bold tracking-normal text-white min-[810px]:text-[64px] min-[1200px]:text-[96px]"
          initial={{ opacity: 0.001, y: 34, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, delay: 0.07, ease: EASE }}
        >
          <span className="block">{t("line1")}</span>
          <span className="block">{t("line2")}</span>
        </motion.h2>
        <motion.p
          className="text-xl leading-[1.6] text-[#c3e2b1]"
          initial={{ opacity: 0.001, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
        >
          {t("subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0.001, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
        >
          <StoreButtons variant="light" order="play-first" />
        </motion.div>
      </div>
    </section>
  );
}

function RoadLight({
  className,
  duration,
  delay = 0,
}: {
  className: string;
  duration: number;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute left-[-360px] h-0.5 bg-gradient-to-r from-transparent via-white/70 to-transparent ${className}`}
      initial={{ x: 0 }}
      animate={{ x: 2200 }}
      transition={{
        duration,
        delay,
        ease: [0, 0, 1, 1],
        repeat: Infinity,
        repeatType: "loop",
      }}
    />
  );
}
