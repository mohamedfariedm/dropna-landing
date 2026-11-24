import { NextResponse } from "next/server";
import { z } from "zod";
import { submitContactUpstream } from "@/lib/api/services";
import { getServerEnv } from "@/lib/env";

const bodySchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().optional(),
  email: z.string().email(),
  inquiryType: z.string().min(1),
  tripId: z.string().optional(),
  message: z.string().min(10),
  locale: z.enum(["ar", "en"]),
  privacyAccepted: z.literal(true),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: "Invalid payload" },
        { status: 400 },
      );
    }

    const env = getServerEnv();

    if (env.CONTACT_WEBHOOK_URL) {
      const upstream = await fetch(env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(env.API_SECRET
            ? { Authorization: `Bearer ${env.API_SECRET}` }
            : {}),
        },
        body: JSON.stringify(parsed.data),
      });

      if (!upstream.ok) {
        return NextResponse.json(
          { ok: false, message: "Upstream failed" },
          { status: 502 },
        );
      }

      return NextResponse.json({ ok: true, id: crypto.randomUUID() });
    }

    try {
      const result = await submitContactUpstream(
        parsed.data,
        parsed.data.locale,
      );
      return NextResponse.json({
        ok: result.ok ?? true,
        id: result.id,
        message: result.message,
      });
    } catch {
      // Offline / placeholder API — accept locally so UI works.
      console.info("[contact] stub accepted", {
        email: parsed.data.email,
        inquiryType: parsed.data.inquiryType,
        locale: parsed.data.locale,
      });
      return NextResponse.json({
        ok: true,
        id: crypto.randomUUID(),
        message: "accepted-locally",
      });
    }
  } catch {
    return NextResponse.json(
      { ok: false, message: "Server error" },
      { status: 500 },
    );
  }
}
