import { publicEnv } from "@/lib/env";
import type { SiteSettings } from "@/lib/api/types";

export const settingsMock: SiteSettings = {
  supportEmail: publicEnv.NEXT_PUBLIC_SUPPORT_EMAIL,
  socialHandle: publicEnv.NEXT_PUBLIC_SOCIAL_HANDLE,
  transportHotline: publicEnv.NEXT_PUBLIC_TRANSPORT_HOTLINE,
  appStoreUrl: publicEnv.NEXT_PUBLIC_APP_STORE_URL || "https://apps.apple.com",
  playStoreUrl:
    publicEnv.NEXT_PUBLIC_PLAY_STORE_URL || "https://play.google.com/store",
  commercialRegister: "——————",
  taxId: "——————",
};
