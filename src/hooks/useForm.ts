import { submitForm } from "@/services/api";
import type { FormData } from "@/types/form";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

export function useForm(initialData: Record<string, string | string[]>) {
	const [formData, setFormData] = createStore(initialData);
	const [isSubmitting, setIsSubmitting] = createSignal(false);

	const handleInputChange = (name: string, value: string | string[]) => {
		setFormData(name, value);
	};

	const handleCheckboxChange = (
		name: string,
		value: string,
		checked: boolean,
	) => {
		const currentValues = Array.isArray(formData[name])
			? (formData[name] as string[])
			: [];
		const newValues = checked
			? [...currentValues, value]
			: currentValues.filter((v) => v !== value);
		setFormData(name, newValues);
	};

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		const form = e.currentTarget as HTMLFormElement;

		if (!form.checkValidity()) {
			form.reportValidity();
			return false;
		}

		console.log("Form submission:", formData);
		console.log("Setting isSubmitting to true");
		setIsSubmitting(true);

		try {
			const result = await submitForm(formData as FormData);
			console.log("Submission result:", result);

			if (result.result === "done") {
				console.log("Form submitted successfully");
				resetForm();
				return true;
			}

			console.log("Form submission failed:", result.error);
			return false;
		} catch (error) {
			console.error("Submission error:", error);
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
		handleInputChange,
		handleCheckboxChange,
		handleSubmit,
		resetForm,
	};
}
