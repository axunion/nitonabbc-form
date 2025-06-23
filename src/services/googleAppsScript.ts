import type { FormData, FormSubmissionResult } from "@/types/form";
import { getRecaptchaToken } from "./recaptcha";
import { config } from "@/config/env";

export async function submitToGoogleAppsScript(
	formData: FormData
): Promise<FormSubmissionResult> {
	const recaptchaToken = await getRecaptchaToken();

	const response = await fetch(config.googleAppsScript.url, {
		method: "POST",
		body: JSON.stringify({
			...formData,
			recaptchaToken,
			timestamp: new Date().toISOString(),
		}),
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const result = await response.json();

	return {
		result: result.result || "error",
		error: result.error || "",
	};
}
