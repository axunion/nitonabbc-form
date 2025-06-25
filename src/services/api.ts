import type { FormData, FormSubmissionResult } from "@/types/form";

function createDummyResponse(): FormSubmissionResult {
	return {
		result: "done",
		error: "",
	};
}

export async function submitForm(
	formData: FormData,
): Promise<FormSubmissionResult> {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	if (import.meta.env.DEV) {
		console.log("Development mode: Using dummy response");
		return createDummyResponse();
	}

	throw new Error("Production API not implemented yet");
}
