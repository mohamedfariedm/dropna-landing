"use client";

import Image from "next/image";
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
    const rawPhone = String(form.get("phone") || "").trim();
    const raw = {
      fullName: String(form.get("fullName") || ""),
      phone: rawPhone
        ? rawPhone.startsWith("+")
          ? rawPhone
          : `+966${rawPhone.replace(/\s/g, "")}`
        : undefined,
      email: String(form.get("email") || ""),
      inquiryType: String(form.get("inquiryType") || ""),
      tripId: undefined,
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
    "focus-ring h-14 w-full rounded-2xl border border-[#dce4d6] bg-[#F6F8F5] px-[18px] text-base text-[#1f1f1f] outline-none transition placeholder:text-[#8A9484] focus:ring-2 focus:ring-forest/20";

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-6">
        <Field label={t("fullName")} error={errors.fullName}>
          <input
            name="fullName"
            required
            placeholder={t("fullNamePlaceholder")}
            className={fieldClass}
          />
        </Field>
        <Field label={t("phone")} error={errors.phone}>
          <div className="flex h-14 items-center gap-2.5 rounded-2xl border border-[#dce4d6] bg-[#F6F8F5] px-[18px]">
            <span className="font-[family-name:var(--font-body)] text-base font-semibold text-[#1f1f1f]">
              +966
            </span>
            <span className="h-6 w-px bg-[#dce4d6]" aria-hidden />
            <input
              name="phone"
              inputMode="tel"
              placeholder={t("phonePlaceholder")}
              className="focus-ring min-w-0 flex-1 border-0 bg-transparent text-base text-[#1f1f1f] outline-none placeholder:text-[#8A9484]"
            />
          </div>
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
          <select
            name="inquiryType"
            required
            className={cn(fieldClass, "appearance-none")}
            defaultValue=""
          >
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

      <Field label={t("message")} error={errors.message}>
        <textarea
          name="message"
          required
          rows={5}
          placeholder={t("messagePlaceholder")}
          className={cn(fieldClass, "h-[148px] resize-y py-4")}
        />
      </Field>

      <label className="flex items-start gap-3 text-[15px] leading-[1.6] text-[#373737]">
        <input
          type="checkbox"
          name="privacyAccepted"
          required
          className="mt-0.5 h-[22px] w-[22px] shrink-0 rounded-[7px] border-[1.5px] border-[#b9c6b1]"
        />
        <span>
          {locale === "ar" ? (
            <>
              قرأت{" "}
              <Link
                href="/privacy"
                className="font-medium text-[#3f7a22] underline underline-offset-2"
              >
                سياسة الخصوصية
              </Link>
              ، وأوافق على استخدام بياناتي للرد على رسالتي.
            </>
          ) : (
            <>
              I have read the{" "}
              <Link
                href="/privacy"
                className="font-medium text-[#3f7a22] underline underline-offset-2"
              >
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

      <div className="h-px w-full bg-[rgba(34,50,25,0.08)]" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-sm text-[#373737]">
          <Image
            src="/assets/icons/lock.svg"
            alt=""
            width={18}
            height={18}
            className="size-[18px]"
          />
          {t("privacyNote")}
        </p>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="focus-ring inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-lime px-7 text-base font-semibold text-[#1f1f1f] transition hover:brightness-95 disabled:opacity-60"
        >
          <Image
            src="/assets/icons/arrow.svg"
            alt=""
            width={18}
            height={18}
            className="size-[18px] ltr:-scale-x-100"
          />
          {mutation.isPending ? t("submitting") : t("submit")}
        </button>
      </div>

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
      <span className="text-sm font-medium text-[#1f1f1f]">{label}</span>
      {children}
      {error ? <span className="block text-xs text-red-700">{error}</span> : null}
    </label>
  );
}
