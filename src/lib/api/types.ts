export type LocaleCode = "ar" | "en";

export type FaqCategory = "booking" | "payment" | "safety" | "account";

export interface LocalizedString {
  ar: string;
  en: string;
}

export interface SiteSettings {
  supportEmail: string;
  socialHandle: string;
  transportHotline: string;
  appStoreUrl: string;
  playStoreUrl: string;
  commercialRegister: string;
  taxId: string;
}

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: LocalizedString;
  answer: LocalizedString;
}

export interface FaqResponse {
  items: FaqItem[];
  categories: FaqCategory[];
}

export interface LegalSummaryItem {
  id: string;
  text: LocalizedString;
}

export interface LegalSection {
  id: string;
  number: string;
  title: LocalizedString;
  body: LocalizedString;
  bullets?: LocalizedString[];
  /** Soft cream callout around bullets (Figma “Highlight”). */
  highlighted?: boolean;
}

export interface LegalDocument {
  slug: "privacy" | "terms";
  updatedAt: string;
  readTimeMinutes: number;
  summary: LegalSummaryItem[];
  sections: LegalSection[];
}

export interface ContactPayload {
  fullName: string;
  phone?: string;
  email: string;
  inquiryType: string;
  tripId?: string;
  message: string;
  locale: LocaleCode;
  privacyAccepted: boolean;
}

export interface ContactResponse {
  ok: boolean;
  id?: string;
  message?: string;
}
