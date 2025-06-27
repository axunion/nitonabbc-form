import type { FormSubmissionResult, TimestampResponse } from "@/types/api";

export async function submitForm(
	formData: Record<string, string | string[]>,
	recaptchaToken?: string,
): Promise<FormSubmissionResult> {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	if (import.meta.env.DEV) {
		const result =
			Math.random() < 0.5
				? {
						result: "done",
						error: "",
					}
				: {
						result: "error",
						error: "This is a dummy error message for testing purposes.",
					};
		console.log("Development mode: Using dummy response");
		console.log("Form data:", formData);
		console.log(
			"reCAPTCHA token:",
			recaptchaToken ? "present" : "not provided",
		);
		console.log("Dummy response:", result);
		return result as FormSubmissionResult;
	}

	return await submitToGoogleAppsScript(formData, recaptchaToken);
}

async function submitToGoogleAppsScript(
	formData: Record<string, string | string[]>,
	recaptchaToken?: string,
): Promise<FormSubmissionResult> {
	const { config } = await import("@/config/env");

	if (!config.googleAppsScript.url) {
		throw new Error("Google Apps Script URL が設定されていません");
	}

	try {
		const payload = {
			...formData,
			recaptchaToken,
		};

		const response = await fetch(config.googleAppsScript.url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}

		const result = await response.json();

		return {
			result: result.result || "error",
			error: result.error || "",
		};
	} catch (error) {
		console.error("Google Apps Script submission error:", error);
		return {
			result: "error",
			error:
				error instanceof Error ? error.message : "送信中にエラーが発生しました",
		};
	}
}

export async function getTimestamp(): Promise<TimestampResponse> {
	if (import.meta.env.DEV) {
		const dummyResponse = {
			result: "done" as const,
			timestamp: Date.now(),
			error: "",
		};
		console.log("Development mode: Using dummy timestamp");
		console.log("Dummy timestamp response:", dummyResponse);
		return dummyResponse;
	}

	return await getTimestampFromGoogleAppsScript();
}

async function getTimestampFromGoogleAppsScript(): Promise<TimestampResponse> {
	const { config } = await import("@/config/env");

	if (!config.googleAppsScript.url) {
		throw new Error("Google Apps Script URL が設定されていません");
	}

	try {
		const response = await fetch(config.googleAppsScript.url, {
			method: "GET",
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}

		const result = await response.json();

		return {
			result: result.result || "error",
			timestamp: result.timestamp || Date.now(),
			error: result.error || "",
		};
	} catch (error) {
		console.error("Google Apps Script timestamp error:", error);
		return {
			result: "error",
			timestamp: 0,
			error:
				error instanceof Error
					? error.message
					: "タイムスタンプ取得中にエラーが発生しました",
		};
	}
}
