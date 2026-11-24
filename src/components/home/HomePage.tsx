"use client";

import { useTranslations } from "next-intl";
import { AppFeatures } from "@/components/home/AppFeatures";
import { DownloadCta } from "@/components/home/DownloadCta";
import { Hero } from "@/components/home/Hero";
import { PaymentMethods } from "@/components/home/PaymentMethods";
import { RideClasses } from "@/components/home/RideClasses";
import { SafetyFeatures } from "@/components/home/SafetyFeatures";
import { SectionScrubber } from "@/components/home/SectionScrubber";
import { Services } from "@/components/home/Services";

export function HomePage() {
  const t = useTranslations("home");

  const labels = {
    "hero.sectionLabel": t("hero.sectionLabel"),
    "app.sectionLabel": t("app.sectionLabel"),
    "services.sectionLabel": t("services.sectionLabel"),
    "classes.sectionLabel": t("classes.sectionLabel"),
    "features.sectionLabel": t("features.sectionLabel"),
    "features.pay.sectionLabel": t("features.items.pay.sectionLabel"),
    "download.sectionLabel": t("download.sectionLabel"),
  } as const;

  return (
    <>
      <SectionScrubber labels={labels} />
      <Hero />
      <AppFeatures />
      <Services />
      <RideClasses />
      <SafetyFeatures />
      <PaymentMethods />
      <DownloadCta />
    </>
  );
}
