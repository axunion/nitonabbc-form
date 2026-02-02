import { config } from "@/config/env";

declare global {
	interface Window {
		grecaptcha: {
			ready: (callback: () => void) => void;
			execute: (
				siteKey: string,
				options: { action: string },
			) => Promise<string>;
		};
	}
}

export async function getReCaptchaToken(action = "submit"): Promise<string> {
	return new Promise((resolve, reject) => {
		if (typeof window === "undefined" || !window.grecaptcha) {
			console.warn("reCAPTCHA not loaded");
			reject(new Error("reCAPTCHA not loaded"));
			return;
		}

		window.grecaptcha.ready(() => {
			window.grecaptcha
				.execute(config.recaptcha.siteKey, { action })
				.then(resolve)
				.catch(reject);
		});
	});
}
