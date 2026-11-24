import type { LocaleCode } from "@/lib/api/types";

export const queryKeys = {
  settings: (locale: LocaleCode) => ["settings", locale] as const,
  faq: (locale: LocaleCode) => ["faq", locale] as const,
  privacy: (locale: LocaleCode) => ["privacy", locale] as const,
  terms: (locale: LocaleCode) => ["terms", locale] as const,
};
