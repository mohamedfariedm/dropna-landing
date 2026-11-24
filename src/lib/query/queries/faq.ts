"use client";

import { useQuery } from "@tanstack/react-query";
import { getFaq } from "@/lib/api/services";
import type { LocaleCode } from "@/lib/api/types";
import { queryKeys } from "@/lib/query/keys";

export function useFaqQuery(locale: LocaleCode) {
  return useQuery({
    queryKey: queryKeys.faq(locale),
    queryFn: () => getFaq(locale),
  });
}
