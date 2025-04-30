import { NuxtApp } from "nuxt/app";

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

declare module "#app" {
  interface NuxtApp {
    $loadRecaptcha: () => Promise<void>;
  }
}
