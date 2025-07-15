import { config } from "@/config/env";
import type { FormSubmissionResult, TimestampResponse } from "@/types/api";

export async function submitForm(
	formData: Record<string, string>,
	recaptchaToken?: string,
): Promise<FormSubmissionResult> {
	if (import.meta.env.DEV) {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const resultDone = { result: "done" };
		const resultError = { result: "error", error: "Dummy error message." };
		const result = Math.random() < 0.5 ? resultDone : resultError;
		console.log("Development mode: Using dummy response");
		console.log("Form data:", formData);
		console.log("Dummy response:", result);
		return result as FormSubmissionResult;
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
		console.error("Submission error:", error);
		return {
			result: "error",
			error:
				error instanceof Error ? error.message : "Unexpected error occurred",
		};
	}
}

export async function getTimestamp(): Promise<TimestampResponse> {
	if (import.meta.env.DEV) {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const dummyResponse = { result: "done", timestamp: Date.now() };
		console.log("Development mode: Using dummy timestamp");
		console.log("Dummy timestamp response:", dummyResponse);
		return dummyResponse as TimestampResponse;
	}

	try {
		const response = await fetch(config.googleAppsScript.timestampUrl);

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}

		return (await response.json()) as TimestampResponse;
	} catch (error) {
		console.error("Timestamp error:", error);
		return {
			result: "error",
			error:
				error instanceof Error ? error.message : "Unexpected error occurred",
		};
	}
}
