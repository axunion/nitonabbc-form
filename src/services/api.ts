import { config } from "@/config/env";
import { getApiMode, tryMockResponse } from "@/services/mock-api";
import type {
  ExpirationStatusResponse,
  FetchDataResponse,
  FormSubmissionResult,
} from "@/types/api";

const toApiError = (e: unknown) => ({
  result: "error" as const,
  error: e instanceof Error ? e.message : "Unexpected error occurred",
});

export async function checkExpiration(
  type: string,
): Promise<ExpirationStatusResponse> {
  const mock = await tryMockResponse<ExpirationStatusResponse>(
    getApiMode(),
    { result: "done", expired: false },
    { result: "error", error: "Dummy error message." },
    500,
  );
  if (mock) return mock;

  try {
    const url = new URL(config.googleAppsScript.postToSheetUrl);
    url.searchParams.set("type", type);
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    if (typeof json?.result !== "string") {
      throw new Error("Malformed server response.");
    }
    return json as ExpirationStatusResponse;
  } catch (error) {
    return toApiError(error);
  }
}

export async function submitForm(
  formData: Record<string, string>,
  recaptchaToken?: string,
): Promise<FormSubmissionResult> {
  const mock = await tryMockResponse<FormSubmissionResult>(
    getApiMode(),
    { result: "done" },
    { result: "error", error: "Dummy error message." },
    1000,
    { "Form data": formData },
  );
  if (mock) return mock;

  try {
    const response = await fetch(config.googleAppsScript.postToSheetUrl, {
      method: "POST",
      body: JSON.stringify({ ...formData, recaptchaToken }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return (await response.json()) as FormSubmissionResult;
  } catch (error) {
    return toApiError(error);
  }
}

export async function fetchData<T>(
  params?: Record<string, string | number | boolean>,
): Promise<FetchDataResponse<T>> {
  const mock = await tryMockResponse<FetchDataResponse<T>>(
    getApiMode(),
    { result: "done", data: [] as unknown as T },
    { result: "error", error: "Dummy error message." },
    500,
  );
  if (mock) return mock;

  try {
    const url = new URL(config.googleAppsScript.fetchFromSheetUrl);

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.append(key, `${value}`);
      }
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    if (typeof json?.result !== "string") {
      throw new Error("Malformed server response.");
    }
    if (json.result === "done" && !Object.hasOwn(json, "data")) {
      throw new Error("Server response missing data field.");
    }
    return json as FetchDataResponse<T>;
  } catch (error) {
    return toApiError(error);
  }
}
