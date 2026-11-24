"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";

const logos = [
  {
    src: "/assets/home/pay-tamara.png",
    alt: "تمارا",
    className: "h-20 w-20 mix-blend-multiply object-contain",
  },
  {
    src: "/assets/home/pay-tabby.png",
    alt: "تابي",
    className: "h-20 w-20 mix-blend-multiply object-contain",
  },
  {
    src: "/assets/home/pay-apple.png",
    alt: "Apple Pay",
    className: "h-12 w-[120px] object-contain",
  },
] as const;

export function PaymentMethods() {
  const t = useTranslations("home.features.items.pay");

  return (
    <section id="payment" className="bg-white px-5 py-12 md:px-6 md:py-14 xl:px-20 xl:py-20">
      <div
        dir="ltr"
        className="mx-auto flex w-full max-w-[1280px] flex-col-reverse items-end gap-6 xl:flex-row xl:items-center xl:justify-between"
      >
        <div className="grid w-full max-w-[792px] grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center xl:flex-1 xl:justify-start xl:gap-6">
          {logos.map((logo) => (
            <Reveal key={logo.alt} className="min-w-0 flex-1">
              <div className="flex h-[136px] items-center justify-center rounded-3xl bg-[#edf6e8] px-4">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={80}
                  className={logo.className}
                />
              </div>
            </Reveal>
          ))}
          <Reveal className="min-w-0 flex-1">
            <div className="flex h-[136px] items-center justify-center rounded-3xl bg-[#edf6e8] px-4">
              <p className="text-center text-xl leading-[1.6] font-bold tracking-[-0.02em] text-[#223219]">
                {t("badge")}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="flex w-full max-w-[400px] flex-col items-end gap-4 xl:ps-10">
          <h3 className="w-full text-end text-[28px] leading-[1.25] font-bold tracking-normal text-[#223219] md:text-4xl xl:text-5xl">
            {t("title")}
          </h3>
          <p className="w-full text-end text-xl leading-[1.6] text-[#373737]">
            {t("desc")}
          </p>
        </div>
      </div>
    </section>
  );
}
