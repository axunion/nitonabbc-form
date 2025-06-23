import { config } from "@/config/env";

declare global {
	interface Window {
		grecaptcha: {
			execute(siteKey: string, options: { action: string }): Promise<string>;
		};
	}
}

export async function getRecaptchaToken(): Promise<string> {
	if (typeof window === "undefined" || !window.grecaptcha) {
		return "";
	}

	try {
		return await window.grecaptcha.execute(config.recaptcha.siteKey, {
			action: "submit",
		});
	} catch (error) {
		console.warn("reCAPTCHA failed:", error);
		return "";
	}
}
