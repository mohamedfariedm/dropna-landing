"use client";

import { useQuery } from "@tanstack/react-query";
import { getSettings } from "@/lib/api/services";
import type { LocaleCode } from "@/lib/api/types";
import { queryKeys } from "@/lib/query/keys";

export function useSettingsQuery(locale: LocaleCode) {
  return useQuery({
    queryKey: queryKeys.settings(locale),
    queryFn: () => getSettings(locale),
  });
}
