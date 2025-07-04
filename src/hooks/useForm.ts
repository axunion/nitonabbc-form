import { submitForm } from "@/services/api";
import { getReCaptchaToken } from "@/services/recaptcha";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

export type SubmissionState = "idle" | "submitting" | "success" | "error";

export function useForm(initialData: Record<string, string | string[]>) {
	const [formData, setFormData] = createStore(initialData);
	const [isSubmitting, setIsSubmitting] = createSignal(false);
	const [submissionState, setSubmissionState] =
		createSignal<SubmissionState>("idle");
	const [errorMessage, setErrorMessage] = createSignal("");

	const handleInputChange = (name: string, value: string | string[]) => {
		setFormData(name, value);
	};

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		const form = e.currentTarget as HTMLFormElement;

		if (!form.checkValidity()) {
			form.reportValidity();
			return false;
		}

		setIsSubmitting(true);
		setSubmissionState("submitting");
		setErrorMessage("");

		try {
			const recaptchaToken = await getReCaptchaToken("form_submit");
			const result = await submitForm(formData, recaptchaToken);

			if (result.result === "done") {
				setSubmissionState("success");
				return true;
			}

			setSubmissionState("error");
			setErrorMessage(result.error || "An unexpected error occurred.");
			return false;
		} catch (error) {
			console.error("Submission error:", error);
			setSubmissionState("error");
			setErrorMessage(
				error instanceof Error
					? error.message
					: "An unexpected error occurred.",
			);
			return false;
		} finally {
			setIsSubmitting(false);
		}
	};

	const resetForm = () => {
		setFormData(initialData);
	};

	return {
		formData,
		isSubmitting,
		submissionState,
		errorMessage,
		handleInputChange,
		handleSubmit,
		resetForm,
	};
}
