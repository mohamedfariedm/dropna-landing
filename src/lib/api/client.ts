import axios, { type AxiosInstance } from "axios";
import { publicEnv } from "@/lib/env";
import type { LocaleCode } from "./types";

export function createApiClient(locale: LocaleCode = "ar"): AxiosInstance {
  const baseURL = `${publicEnv.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "")}${publicEnv.NEXT_PUBLIC_API_PREFIX}`;

  const client = axios.create({
    baseURL,
    timeout: 12000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": locale,
    },
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Request failed";
      return Promise.reject(new Error(message));
    },
  );

  return client;
}

export async function apiGet<T>(
  path: string,
  locale: LocaleCode = "ar",
): Promise<T> {
  const client = createApiClient(locale);
  const { data } = await client.get<T>(path);
  return data;
}

export async function apiPost<TResponse, TBody>(
  path: string,
  body: TBody,
  locale: LocaleCode = "ar",
): Promise<TResponse> {
  const client = createApiClient(locale);
  const { data } = await client.post<TResponse>(path, body);
  return data;
}
