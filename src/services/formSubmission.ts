import type { FormData, FormSubmissionResult } from "@/types/form";
import { createDummyResponse } from "./dummyResponse";
import { submitToGoogleAppsScript } from "./googleAppsScript";

export async function submitForm(
	formData: FormData,
	useDummyResponse = true
): Promise<FormSubmissionResult> {
	if (useDummyResponse) {
		return await createDummyResponse(formData);
	}

	return await submitToGoogleAppsScript(formData);
}
