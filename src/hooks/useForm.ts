import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { submitForm } from "@/services/api";
import { getReCaptchaToken } from "@/services/recaptcha";

export type SubmissionState = "idle" | "submitting" | "success" | "error";

export function useForm<T extends Record<string, string>>(initialData: T) {
	const [formData, setFormData] = createStore(
		initialData as Record<string, string>,
	);
	const [isSubmitting, setIsSubmitting] = createSignal(false);
	const [submissionState, setSubmissionState] =
		createSignal<SubmissionState>("idle");
	const resetForm = () => {
		setFormData(initialData);
	};

	const bindInput = (name: keyof T & string) => ({
		name,
		value: formData[name],
		disabled: isSubmitting(),
		onInput: (
			e: Event & {
				currentTarget: HTMLInputElement | HTMLTextAreaElement;
			},
		) => setFormData(name, e.currentTarget.value),
	});

	const bindChange = (name: keyof T & string) => ({
		name,
		value: formData[name],
		disabled: isSubmitting(),
		onChange: (
			e: Event & {
				currentTarget: HTMLInputElement | HTMLSelectElement;
			},
		) => setFormData(name, e.currentTarget.value),
	});

	const bindCheckbox = (name: keyof T & string, checkedValue: string) => ({
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

		try {
			const trimmedData: Record<string, string> = Object.fromEntries(
				Object.entries(formData).map(([key, value]) => [key, value.trim()]),
			);
			const recaptchaToken = await getReCaptchaToken();
			const result = await submitForm(trimmedData, recaptchaToken);

			if (result.result === "done") {
				setSubmissionState("success");
				return true;
			}

			if (result.error) {
				console.error("Submission error:", result.error);
			}
			setSubmissionState("error");
			return false;
		} catch (error) {
			console.error("Submission error:", error);
			setSubmissionState("error");
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
		resetForm,
		bindInput,
		bindChange,
		bindCheckbox,
		handleSubmit,
	};
}
