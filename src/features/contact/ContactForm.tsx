"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { z } from "zod";
import { Link } from "@/i18n/navigation";
import type { LocaleCode } from "@/lib/api/types";
import { useContactMutation } from "@/lib/query/mutations/contact";
import { cn } from "@/lib/utils";

const inquiryTypes = [
  "previous_trip",
  "billing",
  "account",
  "suggestion",
  "other",
] as const;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale() as LocaleCode;
  const mutation = useContactMutation();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const schema = z.object({
    fullName: z.string().min(2),
    phone: z.string().optional(),
    email: z.string().email(),
    inquiryType: z.enum(inquiryTypes),
    tripId: z.string().optional(),
    message: z.string().min(10),
    privacyAccepted: z.literal(true),
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const form = new FormData(e.currentTarget);
    const raw = {
      fullName: String(form.get("fullName") || ""),
      phone: String(form.get("phone") || "") || undefined,
      email: String(form.get("email") || ""),
      inquiryType: String(form.get("inquiryType") || ""),
      tripId: String(form.get("tripId") || "") || undefined,
      message: String(form.get("message") || ""),
      privacyAccepted: form.get("privacyAccepted") === "on",
    };

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = String(issue.path[0] || "form");
        next[key] = issue.message;
      });
      setErrors(next);
      return;
    }

    try {
      await mutation.mutateAsync({
        ...parsed.data,
        locale,
      });
      e.currentTarget.reset();
    } catch {
      // surfaced via mutation.error
    }
  }

  const fieldClass =
    "focus-ring h-14 w-full rounded-2xl border-0 bg-[#F6F8F5] px-[18px] text-base text-[#1f1f1f] outline-none transition placeholder:text-[#8A9484] focus:ring-2 focus:ring-forest/20";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("fullName")} error={errors.fullName}>
          <input
            name="fullName"
            required
            placeholder={t("fullNamePlaceholder")}
            className={fieldClass}
          />
        </Field>
        <Field label={t("phone")} error={errors.phone}>
          <input
            name="phone"
            inputMode="tel"
            placeholder={t("phonePlaceholder")}
            className={fieldClass}
          />
        </Field>
        <Field label={t("email")} error={errors.email}>
          <input
            name="email"
            type="email"
            required
            placeholder={t("emailPlaceholder")}
            className={fieldClass}
          />
        </Field>
        <Field label={t("inquiryType")} error={errors.inquiryType}>
          <select name="inquiryType" required className={fieldClass} defaultValue="">
            <option value="" disabled>
              {t("inquiryPlaceholder")}
            </option>
            {inquiryTypes.map((type) => (
              <option key={type} value={type}>
                {t(`inquiryOptions.${type}`)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={t("tripId")} error={errors.tripId}>
        <input
          name="tripId"
          placeholder={t("tripIdPlaceholder")}
          className={fieldClass}
        />
      </Field>

      <Field label={t("message")} error={errors.message}>
        <textarea
          name="message"
          required
          rows={5}
          placeholder={t("messagePlaceholder")}
          className={cn(fieldClass, "h-[148px] resize-y py-4")}
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-ink/80">
        <input
          type="checkbox"
          name="privacyAccepted"
          required
          className="mt-1 h-[22px] w-[22px] rounded-[7px] border-black/20"
        />
        <span>
          {locale === "ar" ? (
            <>
              قرأت{" "}
              <Link href="/privacy" className="underline underline-offset-2">
                سياسة الخصوصية
              </Link>
              ، وأوافق على استخدام بياناتي للرد على رسالتي.
            </>
          ) : (
            <>
              I have read the{" "}
              <Link href="/privacy" className="underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              and agree to the use of my data to reply to this message.
            </>
          )}
        </span>
      </label>
      {errors.privacyAccepted ? (
        <p className="text-sm text-red-700">{errors.privacyAccepted}</p>
      ) : null}
      <p className="text-sm text-muted">{t("privacyNote")}</p>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="focus-ring inline-flex rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition hover:bg-forest-mid disabled:opacity-60"
      >
        {mutation.isPending ? t("submitting") : t("submit")}
      </button>

      {mutation.isSuccess ? (
        <p className="rounded-xl bg-lime/20 px-4 py-3 text-sm text-forest">
          {t("success")}
        </p>
      ) : null}
      {mutation.isError ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {t("error")}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-ink/80">{label}</span>
      {children}
      {error ? <span className="block text-xs text-red-700">{error}</span> : null}
    </label>
  );
}
