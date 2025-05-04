import { defineNuxtPlugin } from "#app";
import { SITEKEY } from "@/constants/config";

export default defineNuxtPlugin((nuxtApp) => {
  const loadRecaptcha = (): Promise<void> => {
    return new Promise((resolve) => {
      const src = `https://www.google.com/recaptcha/api.js?render=${SITEKEY}`;

      if (typeof window.grecaptcha !== "undefined") {
        resolve();
        return;
      }

      const existingScript = document.querySelector(`script[src^="${src}"]`);
      if (existingScript) {
        existingScript.addEventListener("load", () => resolve());
      } else {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        document.head.appendChild(script);
      }
    });
  };

  nuxtApp.provide("loadRecaptcha", loadRecaptcha);
});
