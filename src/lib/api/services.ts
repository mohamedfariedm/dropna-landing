import { apiGet, apiPost } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { faqMock } from "@/lib/api/mocks/faq";
import { privacyMock } from "@/lib/api/mocks/privacy";
import { settingsMock } from "@/lib/api/mocks/settings";
import { termsMock } from "@/lib/api/mocks/terms";
import type {
  ContactPayload,
  ContactResponse,
  FaqResponse,
  LegalDocument,
  LocaleCode,
  SiteSettings,
} from "@/lib/api/types";

async function withMockFallback<T>(
  request: () => Promise<T>,
  mock: T,
): Promise<T> {
  try {
    return await request();
  } catch {
    return mock;
  }
}

export function getSettings(locale: LocaleCode = "ar") {
  return withMockFallback(
    () => apiGet<SiteSettings>(endpoints.settings, locale),
    settingsMock,
  );
}

export function getFaq(locale: LocaleCode = "ar") {
  return withMockFallback(
    () => apiGet<FaqResponse>(endpoints.faq, locale),
    faqMock,
  );
}

export function getPrivacy(locale: LocaleCode = "ar") {
  return withMockFallback(
    () => apiGet<LegalDocument>(endpoints.privacy, locale),
    privacyMock,
  );
}

export function getTerms(locale: LocaleCode = "ar") {
  return withMockFallback(
    () => apiGet<LegalDocument>(endpoints.terms, locale),
    termsMock,
  );
}

export function submitContactUpstream(
  payload: ContactPayload,
  locale: LocaleCode = "ar",
) {
  return apiPost<ContactResponse, ContactPayload>(
    endpoints.contact,
    payload,
    locale,
  );
}
