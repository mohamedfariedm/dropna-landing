import {
  getFaq,
  getPrivacy,
  getSettings,
  getTerms,
} from "@/lib/api/services";
import type { LocaleCode } from "@/lib/api/types";
import { getQueryClient } from "@/lib/query/get-query-client";
import { queryKeys } from "@/lib/query/keys";
import { dehydrate, type DehydratedState } from "@tanstack/react-query";

export async function prefetchHome(locale: LocaleCode): Promise<DehydratedState> {
  const client = getQueryClient();
  await client.prefetchQuery({
    queryKey: queryKeys.settings(locale),
    queryFn: () => getSettings(locale),
  });
  return dehydrate(client);
}

export async function prefetchFaq(locale: LocaleCode): Promise<DehydratedState> {
  const client = getQueryClient();
  await Promise.all([
    client.prefetchQuery({
      queryKey: queryKeys.faq(locale),
      queryFn: () => getFaq(locale),
    }),
    client.prefetchQuery({
      queryKey: queryKeys.settings(locale),
      queryFn: () => getSettings(locale),
    }),
  ]);
  return dehydrate(client);
}

export async function prefetchPrivacy(
  locale: LocaleCode,
): Promise<DehydratedState> {
  const client = getQueryClient();
  await client.prefetchQuery({
    queryKey: queryKeys.privacy(locale),
    queryFn: () => getPrivacy(locale),
  });
  return dehydrate(client);
}

export async function prefetchTerms(
  locale: LocaleCode,
): Promise<DehydratedState> {
  const client = getQueryClient();
  await client.prefetchQuery({
    queryKey: queryKeys.terms(locale),
    queryFn: () => getTerms(locale),
  });
  return dehydrate(client);
}

export async function prefetchContact(
  locale: LocaleCode,
): Promise<DehydratedState> {
  const client = getQueryClient();
  await Promise.all([
    client.prefetchQuery({
      queryKey: queryKeys.settings(locale),
      queryFn: () => getSettings(locale),
    }),
    client.prefetchQuery({
      queryKey: queryKeys.faq(locale),
      queryFn: () => getFaq(locale),
    }),
  ]);
  return dehydrate(client);
}
