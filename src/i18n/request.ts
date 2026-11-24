import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

const namespaces = [
  "common",
  "home",
  "contact",
  "faq",
  "privacy",
  "terms",
] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const entries = await Promise.all(
    namespaces.map(async (ns) => {
      const messages = (await import(`../../messages/${locale}/${ns}.json`))
        .default;
      return [ns, messages] as const;
    }),
  );

  return {
    locale,
    messages: Object.fromEntries(entries),
  };
});
