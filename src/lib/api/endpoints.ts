export const endpoints = {
  settings: "/settings",
  faq: "/faq",
  privacy: "/legal/privacy",
  terms: "/legal/terms",
  contact: "/contact",
} as const;

export type EndpointKey = keyof typeof endpoints;
