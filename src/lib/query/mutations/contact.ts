"use client";

import { useMutation } from "@tanstack/react-query";
import type { ContactPayload, ContactResponse } from "@/lib/api/types";

async function postContact(payload: ContactPayload): Promise<ContactResponse> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as ContactResponse & { message?: string };
  if (!res.ok || !data.ok) {
    throw new Error(data.message || "Failed to send message");
  }
  return data;
}

export function useContactMutation() {
  return useMutation({
    mutationFn: postContact,
  });
}
