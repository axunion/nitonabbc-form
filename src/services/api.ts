import type { FormData, FormSubmissionResult } from "@/types/form";

export async function submitForm(
	formData: FormData
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
		console.log("Dummy response:", result);
		return result as FormSubmissionResult;
	}

	throw new Error("Production API not implemented yet");
}
