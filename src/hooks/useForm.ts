import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { submitForm } from "@/services/api";
import { getReCaptchaToken } from "@/services/recaptcha";

export type SubmissionState = "idle" | "submitting" | "success" | "error";
export type SubmissionError = "recaptcha" | "server" | null;

export function useForm<T extends Record<string, string>>(initialData: T) {
  // createStore mutates its argument in place, so snapshot before passing
  const initialSnapshot = { ...initialData } as Record<string, string>;
  const [formData, setFormData] = createStore(
    initialData as Record<string, string>,
  );
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [submissionState, setSubmissionState] =
    createSignal<SubmissionState>("idle");
  const [submissionError, setSubmissionError] =
    createSignal<SubmissionError>(null);
  const resetForm = () => {
    setFormData(initialSnapshot);
    setSubmissionState("idle");
    setSubmissionError(null);
  };

  const bindInput = (name: keyof T & string) => ({
    name,
    value: formData[name],
    disabled: isSubmitting(),
    onInput: (
      e: Event & {
        currentTarget: HTMLInputElement | HTMLTextAreaElement;
      },
    ) => setFormData(name, e.currentTarget.value),
  });

  const bindChange = (name: keyof T & string) => ({
    name,
    value: formData[name],
    disabled: isSubmitting(),
    onChange: (
      e: Event & {
        currentTarget: HTMLInputElement | HTMLSelectElement;
      },
    ) => setFormData(name, e.currentTarget.value),
  });

  const bindCheckbox = (name: keyof T & string, checkedValue: string) => ({
    name,
    value: checkedValue,
    checked: formData[name] === checkedValue,
    disabled: isSubmitting(),
    onChange: (checked: boolean) =>
      setFormData(name, checked ? checkedValue : ""),
  });

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;

    if (!form.checkValidity()) {
      form.reportValidity();
      return false;
    }

    setIsSubmitting(true);
    setSubmissionState("submitting");
    setSubmissionError(null);

    try {
      const trimmedData: Record<string, string> = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, value.trim()]),
      );

      let recaptchaToken: string;
      try {
        recaptchaToken = await getReCaptchaToken();
      } catch (error) {
        console.error("reCAPTCHA error:", error);
        setSubmissionError("recaptcha");
        setSubmissionState("error");
        return false;
      }

      const result = await submitForm(trimmedData, recaptchaToken);

      if (result.result === "done") {
        setSubmissionState("success");
        return true;
      }

      if (result.error) {
        console.error("Submission error:", result.error);
      }
      setSubmissionError("server");
      setSubmissionState("error");
      return false;
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionError("server");
      setSubmissionState("error");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    isSubmitting,
    submissionState,
    submissionError,
    resetForm,
    bindInput,
    bindChange,
    bindCheckbox,
    handleSubmit,
  };
}
