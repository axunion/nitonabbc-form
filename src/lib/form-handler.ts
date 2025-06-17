import { createResource, createSignal } from "solid-js";

export interface FormData {
	[key: string]: string | string[];
}

export interface FormSubmissionResult {
	success: boolean;
	message: string;
	errors?: Record<string, string>;
}

declare global {
	interface Window {
		grecaptcha: {
			execute(siteKey: string, options: { action: string }): Promise<string>;
		};
	}
}

export function createFormHandler() {
	const [isSubmitting, setIsSubmitting] = createSignal(false);
	const [submitResult, setSubmitResult] =
		createSignal<FormSubmissionResult | null>(null);

	const submitForm = async (
		formData: FormData,
	): Promise<FormSubmissionResult> => {
		setIsSubmitting(true);
		setSubmitResult(null);

		try {
			// reCAPTCHA トークンを取得
			let recaptchaToken = "";
			if (typeof window !== "undefined" && window.grecaptcha) {
				try {
					recaptchaToken = await window.grecaptcha.execute("YOUR_SITE_KEY", {
						action: "submit",
					});
				} catch (error) {
					console.warn("reCAPTCHA failed:", error);
				}
			}

			// Google Apps Script に送信
			const response = await fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
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

			const submitResult: FormSubmissionResult = {
				success: result.success || false,
				message: result.message || "送信が完了しました",
				errors: result.errors || {},
			};

			setSubmitResult(submitResult);
			return submitResult;
		} catch (error) {
			console.error("Form submission error:", error);
			const errorResult: FormSubmissionResult = {
				success: false,
				message: "送信中にエラーが発生しました。もう一度お試しください。",
			};
			setSubmitResult(errorResult);
			return errorResult;
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		isSubmitting,
		submitResult,
		submitForm,
		clearResult: () => setSubmitResult(null),
	};
}
