"use client";

import { useQuery } from "@tanstack/react-query";
import { getPrivacy, getTerms } from "@/lib/api/services";
import type { LocaleCode } from "@/lib/api/types";
import { queryKeys } from "@/lib/query/keys";

export function usePrivacyQuery(locale: LocaleCode) {
  return useQuery({
    queryKey: queryKeys.privacy(locale),
    queryFn: () => getPrivacy(locale),
  });
}

export function useTermsQuery(locale: LocaleCode) {
  return useQuery({
    queryKey: queryKeys.terms(locale),
    queryFn: () => getTerms(locale),
  });
}
