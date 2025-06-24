import type { FormData, FormSubmissionResult } from "@/types/form";
import { validateFormData } from "./validation";

export async function createDummyResponse(
	formData: FormData,
): Promise<FormSubmissionResult> {
	await new Promise((resolve) => setTimeout(resolve, 1500));

	const validationError = validateFormData(formData);

	if (validationError) {
		return validationError;
	}

	return {
		result: "done",
		error: "",
	};
}
