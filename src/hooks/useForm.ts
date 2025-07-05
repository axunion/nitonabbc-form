import { submitForm } from "@/services/api";
import { getReCaptchaToken } from "@/services/recaptcha";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

export type SubmissionState = "idle" | "submitting" | "success" | "error";

export function useForm(initialData: Record<string, string>) {
	const [formData, setFormData] = createStore(initialData);
	const [isSubmitting, setIsSubmitting] = createSignal(false);
	const [submissionState, setSubmissionState] =
		createSignal<SubmissionState>("idle");
	const [errorMessage, setErrorMessage] = createSignal("");

	const resetForm = () => {
		setFormData(initialData);
	};

	const bindInput = (name: string) => ({
		name,
		value: formData[name],
		disabled: isSubmitting(),
		onInput: (
			e: Event & {
				currentTarget: HTMLInputElement | HTMLTextAreaElement;
			},
		) => setFormData(name, e.currentTarget.value),
	});

	const bindChange = (name: string) => ({
		name,
		value: formData[name],
		disabled: isSubmitting(),
		onChange: (
			e: Event & {
				currentTarget: HTMLInputElement | HTMLSelectElement;
			},
		) => setFormData(name, e.currentTarget.value),
	});

	const bindCheckbox = (name: string, checkedValue: string) => ({
		name,
		value: checkedValue,
		checked: formData[name] === checkedValue,
		disabled: isSubmitting(),
		onChange: (checked: boolean) =>
			setFormData(name, checked ? checkedValue : ""),
	});

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

	return {
		formData,
		setFormData,
		isSubmitting,
		submissionState,
		errorMessage,
		resetForm,
		bindInput,
		bindChange,
		bindCheckbox,
		handleSubmit,
	};
}
