import { ENDPOINT, ENDPOINT_CREATE_SHEET, SITEKEY } from "@/constants/config";
import { ref } from "vue";

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

export type ExpirationState = "idle" | "checking" | "valid" | "expired";
export type PostState = "idle" | "submitting" | "submitted" | "failed";

export type CheckExpirationResponseData = {
  result: "done" | "error" | "expired";
};

export type PostResponseData = {
  result: "done" | "error";
  error: string;
};

export type CreateSheetResponseData = {
  result: "done" | "error";
  url: string;
  error: string;
};

const getRecaptchaToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(SITEKEY, {
          action: "submit",
        });
        resolve(token);
      } catch (e) {
        reject(e);
      }
    });
  });
};

const fetchJson = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};

export const useApi = () => {
  const expirationState = ref<ExpirationState>("idle");
  const postState = ref<PostState>("idle");
  const error = ref("");

  const checkExpiration = async (type: string): Promise<void> => {
    expirationState.value = "checking";
    try {
      const data = await fetchJson<CheckExpirationResponseData>(
        `${ENDPOINT_CREATE_SHEET}?type=${type}`,
      );
      expirationState.value = data.result === "done" ? "valid" : "expired";
    } catch (e) {
      expirationState.value = "expired";
      error.value = e instanceof Error ? e.message : "Unknown error";
    }
  };

  const post = async (
    formData: Record<string, string | string[]>,
  ): Promise<void> => {
    postState.value = "submitting";
    try {
      const recaptchaToken = await getRecaptchaToken();
      const postData = {
        ...formData,
        recaptcha: recaptchaToken,
      };

      const responseData = await fetchJson<PostResponseData>(ENDPOINT, {
        method: "POST",
        body: JSON.stringify(postData),
      });

      if (responseData.result === "done") {
        postState.value = "submitted";
      } else {
        postState.value = "failed";
        throw new Error(responseData.error);
      }
    } catch (e) {
      postState.value = "failed";
      if (e instanceof Error) {
        error.value = e.message;
      }
    }
  };

  const createSheet = async (
    postData: Record<string, string>,
  ): Promise<string> => {
    postState.value = "submitting";
    try {
      const responseData = await fetchJson<CreateSheetResponseData>(
        ENDPOINT_CREATE_SHEET,
        {
          method: "POST",
          body: JSON.stringify(postData),
        },
      );

      if (responseData.result === "done") {
        postState.value = "submitted";
        return responseData.url;
      }

      postState.value = "failed";
      throw new Error(responseData.error);
    } catch (e) {
      postState.value = "failed";
      if (e instanceof Error) {
        error.value = e.message;
      }
      return "";
    }
  };

  return {
    expirationState,
    postState,
    error,
    checkExpiration,
    post,
    createSheet,
  };
};
