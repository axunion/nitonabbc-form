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

const READY_TIMEOUT_MS = 10_000;

export async function getReCaptchaToken(action = "submit"): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.grecaptcha) {
      console.warn("reCAPTCHA not loaded");
      reject(new Error("reCAPTCHA not loaded"));
      return;
    }

    // Reject if reCAPTCHA's ready callback never fires (e.g. partially blocked by network policy)
    const timer = setTimeout(() => {
      reject(new Error("reCAPTCHA initialization timed out"));
    }, READY_TIMEOUT_MS);

    window.grecaptcha.ready(() => {
      clearTimeout(timer);
      window.grecaptcha
        .execute(config.recaptcha.siteKey, { action })
        .then(resolve)
        .catch(reject);
    });
  });
}
