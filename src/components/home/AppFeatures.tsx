"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;
const FLOAT_EASE = [0.44, 0, 0.56, 1] as const;

const phones = [
  {
    key: "track" as const,
    image: "/assets/home/phone-track.png",
    captionOrder: "order-3 md:order-none",
    captionDelay: 0.3,
    phoneDelay: 0.28,
    className: "absolute top-[11.85%] left-[10.28%] hidden h-[101.4%] w-[22.5%] md:block",
    screen: "top-[2%] left-[4%] h-[96%] w-[92%] rounded-[38px]",
    radius: "rounded-[48px]",
  },
  {
    key: "choose" as const,
    image: "/assets/home/phone-choose.png",
    captionOrder: "order-2 md:order-none",
    captionDelay: 0,
    phoneDelay: 0,
    className: "absolute top-[6%] left-[37.36%] z-10 hidden h-[114%] w-[25.35%] md:block",
    screen: "top-[2%] left-[4.1%] h-[96%] w-[91.5%] rounded-[47px]",
    radius: "rounded-[60px]",
  },
  {
    key: "book" as const,
    image: "/assets/home/phone-destination.png",
    captionOrder: "order-1 md:order-none",
    captionDelay: 0.15,
    phoneDelay: 0.14,
    className: "absolute top-[11.85%] left-[67.22%] hidden h-[101.4%] w-[22.5%] md:block",
    screen: "top-[2%] left-[4%] h-[96%] w-[92%] rounded-[38px]",
    radius: "rounded-[48px]",
  },
] as const;

const rise = { opacity: 0, y: 160, scale: 0.96 };

export function AppFeatures() {
  const t = useTranslations("home.app");
  const reduce = useReducedMotion();

  return (
    <section id="app" className="relative overflow-hidden bg-[#4b6d37] text-white">
      <div className="pointer-events-none absolute top-40 left-1/2 h-[800px] w-[min(1100px,100%)] -translate-x-1/2">
        <motion.div
          className="h-full w-full origin-center bg-[radial-gradient(circle,#87c55d52_0%,#87c55d00_70%)]"
          animate={reduce ? undefined : { scale: 1.08 }}
          transition={{ duration: 7, ease: FLOAT_EASE, repeat: Infinity, repeatType: "mirror" }}
        />
      </div>
      <div className="relative px-5 pt-10 md:px-6 md:pt-10 xl:px-20 xl:pt-12">
        <motion.h2
          className="mx-auto max-w-[1000px] text-center text-4xl leading-[1.25] font-bold tracking-normal text-white md:text-5xl xl:text-[64px]"
          initial={reduce ? false : { opacity: 0.001, y: 34, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85, delay: 0.07, ease: EASE }}
        >
          {t("title")}
        </motion.h2>

        <div
          dir="ltr"
          className="relative z-10 mx-auto mt-0 flex w-full max-w-[1200px] flex-col items-center gap-5 px-0 pt-7 pb-3 md:flex-row md:items-start md:gap-[30px] md:pt-10 md:pb-1"
        >
          {phones.map((phone) => (
            <motion.div
              key={phone.key}
              className={`flex w-full flex-col items-center gap-0 text-center md:flex-1 ${phone.captionOrder}`}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: phone.captionDelay, duration: 0.9, ease: EASE }}
            >
              <h3 className="text-2xl leading-[1.6] font-bold">{t(`items.${phone.key}.title`)}</h3>
              <p className="text-base leading-[1.6] text-[#edf6e8]">
                {t(`items.${phone.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 mx-auto mt-2 h-[520px] w-[280px] md:hidden">
          <PhoneRise delay={0} reduce={!!reduce} float>
            <PhoneFrame
              image={phones[1].image}
              alt={t("items.choose.title")}
              radius="rounded-[60px]"
              screen="top-[2%] left-[4.1%] h-[96%] w-[91.5%] rounded-[47px]"
              className="absolute inset-0"
            />
          </PhoneRise>
        </div>

        <div
          dir="ltr"
          className="relative z-10 mx-auto hidden aspect-[1440/658] w-full max-w-[1440px] md:block"
        >
          {phones.map((phone) => (
            <PhoneRise
              key={phone.key}
              className={phone.className}
              delay={phone.phoneDelay}
              reduce={!!reduce}
              float={phone.key === "choose"}
            >
              <PhoneFrame
                image={phone.image}
                alt={t(`items.${phone.key}.title`)}
                radius={phone.radius}
                screen={phone.screen}
                className="absolute inset-0"
              />
            </PhoneRise>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhoneRise({
  children,
  className = "absolute inset-0",
  delay,
  reduce,
  float,
}: {
  children: ReactNode;
  className?: string;
  delay: number;
  reduce: boolean;
  float?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={reduce ? false : rise}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ type: "spring", bounce: 0.18, duration: 1.3, delay }}
    >
      {float && !reduce ? (
        <motion.div
          className="absolute inset-0"
          animate={{ y: -10 }}
          transition={{ delay: 1.4, duration: 4.5, ease: FLOAT_EASE, repeat: Infinity, repeatType: "mirror" }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
}

function PhoneFrame({
  image,
  alt,
  className,
  radius,
  screen,
}: {
  image: string;
  alt: string;
  className: string;
  radius: string;
  screen: string;
}) {
  return (
    <div className={className}>
      <div
        className={`absolute inset-0 border-[3px] border-white/15 bg-[#121315] shadow-[0_40px_81px_rgba(0,0,0,0.25)] ${radius}`}
      />
      <div className={`absolute overflow-hidden bg-black ${screen}`}>
        <Image src={image} alt={alt} fill sizes="365px" className="object-cover object-top" />
      </div>
    </div>
  );
}
