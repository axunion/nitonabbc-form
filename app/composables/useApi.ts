import {
    SITEKEY,
    URL_CREATE_SHEET,
    URL_POST_TO_SHEET,
    URL_TIMESTAMP,
} from "@/constants/config";
import { ref } from "vue";

export type ExpirationState = "idle" | "checking" | "valid" | "expired";
export type PostState = "idle" | "submitting" | "submitted" | "failed";

export type TimestampResponse = {
    result: "done" | "error";
    timestamp: number;
    error: string;
};

export type PostResponse = {
    result: "done" | "error";
    error: string;
};

export type CreateSheetResponse = {
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

    const checkExpiration = async (deadline: number): Promise<void> => {
        expirationState.value = "checking";

        try {
            const data = await fetchJson<TimestampResponse>(URL_TIMESTAMP);

            if (data.result === "error") {
                throw new Error(data.error);
            }

            expirationState.value =
                data.timestamp > deadline ? "expired" : "valid";
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

            const responseData = await fetchJson<PostResponse>(
                URL_POST_TO_SHEET,
                {
                    method: "POST",
                    body: JSON.stringify(postData),
                },
            );

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
            const responseData = await fetchJson<CreateSheetResponse>(
                URL_CREATE_SHEET,
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
