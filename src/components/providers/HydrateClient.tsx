"use client";

import { type DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import type { ReactNode } from "react";

export function HydrateClient({
  children,
  state,
}: {
  children: ReactNode;
  state?: DehydratedState;
}) {
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
