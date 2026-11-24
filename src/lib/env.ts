import { z } from "zod";

const publicSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_API_BASE_URL: z.string().url().default("https://api.example.com"),
  NEXT_PUBLIC_API_PREFIX: z.string().default("/v1"),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.enum(["ar", "en"]).default("ar"),
  NEXT_PUBLIC_SUPPORTED_LOCALES: z.string().default("ar,en"),
  NEXT_PUBLIC_APP_STORE_URL: z
    .string()
    .optional()
    .default("https://apps.apple.com/sa/"),
  NEXT_PUBLIC_PLAY_STORE_URL: z
    .string()
    .optional()
    .default("https://play.google.com/store/apps/details?id=com.droob.customer"),
  NEXT_PUBLIC_SUPPORT_EMAIL: z
    .string()
    .email()
    .default("admin@droobnasa.com"),
  NEXT_PUBLIC_SOCIAL_HANDLE: z.string().default("@droobna"),
  NEXT_PUBLIC_TRANSPORT_HOTLINE: z.string().default("19929"),
});

const serverSchema = publicSchema.extend({
  API_SECRET: z.string().optional().default(""),
  CONTACT_WEBHOOK_URL: z.string().optional().default(""),
});

function readPublicEnv() {
  return publicSchema.parse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_API_PREFIX: process.env.NEXT_PUBLIC_API_PREFIX,
    NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
    NEXT_PUBLIC_SUPPORTED_LOCALES: process.env.NEXT_PUBLIC_SUPPORTED_LOCALES,
    NEXT_PUBLIC_APP_STORE_URL: process.env.NEXT_PUBLIC_APP_STORE_URL,
    NEXT_PUBLIC_PLAY_STORE_URL: process.env.NEXT_PUBLIC_PLAY_STORE_URL,
    NEXT_PUBLIC_SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
    NEXT_PUBLIC_SOCIAL_HANDLE: process.env.NEXT_PUBLIC_SOCIAL_HANDLE,
    NEXT_PUBLIC_TRANSPORT_HOTLINE: process.env.NEXT_PUBLIC_TRANSPORT_HOTLINE,
  });
}

export const publicEnv = readPublicEnv();

export function getServerEnv() {
  return serverSchema.parse({
    ...readPublicEnv(),
    API_SECRET: process.env.API_SECRET,
    CONTACT_WEBHOOK_URL: process.env.CONTACT_WEBHOOK_URL,
  });
}

export function getSupportedLocales() {
  return publicEnv.NEXT_PUBLIC_SUPPORTED_LOCALES.split(",").map((l) =>
    l.trim(),
  ) as Array<"ar" | "en">;
}
