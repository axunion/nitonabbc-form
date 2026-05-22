import { config } from "@/config/env";
import { getApiMode } from "@/services/mock-api";
import type {
  ExpirationStatusResponse,
  FetchDataResponse,
  FormSubmissionResult,
} from "@/types/api";

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const toApiError = (e: unknown) => ({
  result: "error" as const,
  error: e instanceof Error ? e.message : "Unexpected error occurred",
});

export async function checkExpiration(
  type: string,
): Promise<ExpirationStatusResponse> {
  if (import.meta.env.DEV) {
    const mode = getApiMode();
    if (mode !== "real") {
      await sleep(500);
      const result =
        mode === "mock-err"
          ? { result: "error", error: "Dummy error message." }
          : { result: "done", expired: false };
      console.log("Mock response:", result);
      return result as ExpirationStatusResponse;
    }
  }

  try {
    const response = await fetch(
      `${config.googleAppsScript.postToSheetUrl}?type=${encodeURIComponent(type)}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return (await response.json()) as ExpirationStatusResponse;
  } catch (error) {
    return toApiError(error);
  }
}

export async function submitForm(
  formData: Record<string, string>,
  recaptchaToken?: string,
): Promise<FormSubmissionResult> {
  if (import.meta.env.DEV) {
    const mode = getApiMode();
    if (mode !== "real") {
      await sleep(1000);
      const result =
        mode === "mock-err"
          ? { result: "error", error: "Dummy error message." }
          : { result: "done" };
      console.log("Mock response:", result);
      console.log("Form data:", formData);
      return result as FormSubmissionResult;
    }
  }

  try {
    const response = await fetch(config.googleAppsScript.postToSheetUrl, {
      method: "POST",
      body: JSON.stringify({ recaptchaToken, ...formData }),
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
  if (import.meta.env.DEV) {
    const mode = getApiMode();
    if (mode !== "real") {
      await sleep(500);
      const result =
        mode === "mock-err"
          ? { result: "error", error: "Dummy error message." }
          : { result: "done", data: [] };
      console.log("Mock response:", result);
      return result as FetchDataResponse<T>;
    }
  }

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

    return (await response.json()) as FetchDataResponse<T>;
  } catch (error) {
    return toApiError(error);
  }
}
