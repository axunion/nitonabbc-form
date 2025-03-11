import { ref } from "vue";

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

const ENDPOINT = import.meta.env.VITE_ENDPOINT_CREATE_SHEET;

export const useCreateSheet = () => {
  const expirationState = ref<ExpirationState>("idle");
  const postState = ref<PostState>("idle");
  const error = ref("");

  const checkExpiration = async (type: string): Promise<void> => {
    expirationState.value = "valid";
    expirationState.value = "checking";
    const response = await fetch(`${ENDPOINT}?type=${type}`);
    const data: CheckExpirationResponseData = await response.json();
    expirationState.value = data.result === "done" ? "valid" : "expired";
  };

  const createSheet = async (
    postData: Record<string, string>,
  ): Promise<string> => {
    let result = "";
    postState.value = "submitting";

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      const responseData: CreateSheetResponseData = await response.json();

      if (responseData.result === "done") {
        postState.value = "submitted";
        result = responseData.url;
      } else if (responseData.result === "error") {
        postState.value = "failed";
        throw new Error(responseData.error);
      }
    } catch (e) {
      if (e instanceof Error) {
        error.value = e.message;
      }
    }

    return result;
  };

  return {
    expirationState,
    postState,
    error,
    checkExpiration,
    createSheet,
  };
};
