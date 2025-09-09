import { config } from "@/config/env";
import type {
	ExpirationStatusResponse,
	FetchDataResponse,
	FormSubmissionResult,
} from "@/types/api";

export async function checkExpiration(
	type: string,
): Promise<ExpirationStatusResponse> {
	// if (import.meta.env.DEV) {
	// 	await new Promise((resolve) => setTimeout(resolve, 500));
	// 	const resultDone = { result: "done", expired: false };
	// 	const resultError = { result: "error", error: "Dummy error message." };
	// 	const result = Math.random() < 0.5 ? resultDone : resultError;
	// 	console.log("Dummy response:", result);
	// 	return result as ExpirationStatusResponse;
	// }

	try {
		const response = await fetch(
			`${config.googleAppsScript.postToSheetUrl}?type=${encodeURIComponent(type)}`,
		);

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}

		return (await response.json()) as ExpirationStatusResponse;
	} catch (error) {
		return {
			result: "error",
			error:
				error instanceof Error ? error.message : "Unexpected error occurred",
		};
	}
}

export async function submitForm(
	formData: Record<string, string>,
	recaptchaToken?: string,
): Promise<FormSubmissionResult> {
	// if (import.meta.env.DEV) {
	// 	await new Promise((resolve) => setTimeout(resolve, 1000));
	// 	const resultDone = { result: "done" };
	// 	const resultError = { result: "error", error: "Dummy error message." };
	// 	const result = Math.random() < 0.5 ? resultDone : resultError;
	// 	console.log("Development mode: Using dummy response");
	// 	console.log("Form data:", formData);
	// 	console.log("Dummy response:", result);
	// 	return result as FormSubmissionResult;
	// }

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
		return {
			result: "error",
			error:
				error instanceof Error ? error.message : "Unexpected error occurred",
		};
	}
}

export async function fetchData<T>(
	params?: Record<string, string | number | boolean>,
): Promise<FetchDataResponse<T>> {
	// if (import.meta.env.DEV) {
	// 	await new Promise((resolve) => setTimeout(resolve, 500));
	// 	const resultDone = { result: "done", data: [] };
	// 	const resultError = { result: "error", error: "Dummy error message." };
	// 	const result = Math.random() < 0.5 ? resultDone : resultError;
	// 	console.log("Development mode: Using dummy fetch data");
	// 	console.log("Dummy response:", result);
	// 	return result as FetchDataResponse<T>;
	// }

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
		return {
			result: "error",
			error:
				error instanceof Error ? error.message : "Unexpected error occurred",
		};
	}
}
