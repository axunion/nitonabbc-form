import { type JSX, Show } from "solid-js";
import ErrorMessage from "@/components/forms/ErrorMessage";
import ExpiredMessage from "@/components/forms/ExpiredMessage";
import LoadingSpinner from "@/components/forms/LoadingSpinner";
import SubmissionLoader from "@/components/forms/SubmissionLoader";
import SuccessMessage from "@/components/forms/SuccessMessage";
import { useExpirationStatus } from "@/hooks/useExpirationStatus";
import type { SubmissionState } from "@/hooks/useForm";
import styles from "./FormContainer.module.css";

export type FormContainerProps = {
  isSubmitting: () => boolean;
  submissionState: () => SubmissionState;
  children: JSX.Element;
  type: string;
  expiredMessage?: string;
  successTitle?: string;
  successMessage?: string;
  errorTitle?: string;
};

export default function FormContainer(props: FormContainerProps) {
  const { expirationStatus } = useExpirationStatus(props.type);

  return (
    <>
      <Show when={expirationStatus.state === "pending"}>
        <div class={styles.centerLoader}>
          <LoadingSpinner />
        </div>
      </Show>

      <Show when={expirationStatus.state === "errored"}>
        <ErrorMessage>
          <h2 class={styles.errorTitle}>接続エラーが発生しました</h2>
          <p class={styles.errorText}>
            恐れ入りますが、しばらく時間をおいて再度お試しください。
          </p>
        </ErrorMessage>
      </Show>

      <Show
        when={
          expirationStatus.state === "ready" && expirationStatus() === "expired"
        }
      >
        <ExpiredMessage>
          <p>{props.expiredMessage || "このフォームは終了しています。"}</p>
        </ExpiredMessage>
      </Show>

      <Show
        when={
          expirationStatus.state === "ready" && expirationStatus() === "valid"
        }
      >
        <Show
          when={
            props.submissionState() === "idle" ||
            props.submissionState() === "submitting"
          }
        >
          {props.children}
        </Show>

        <Show when={props.submissionState() === "success"}>
          <SuccessMessage>
            <h2 class={styles.successTitle}>
              {props.successTitle || "送信が完了しました"}
            </h2>
            <p class={styles.successText}>
              {props.successMessage || "ありがとうございました。"}
            </p>
          </SuccessMessage>
        </Show>

        <Show when={props.submissionState() === "error"}>
          <ErrorMessage>
            <h2 class={styles.errorResultTitle}>
              {props.errorTitle || "送信に失敗しました"}
            </h2>
            <p class={styles.errorResultText}>
              恐れ入りますが、再度お試しください。
            </p>
          </ErrorMessage>
        </Show>
      </Show>

      <SubmissionLoader isVisible={props.isSubmitting()} />
    </>
  );
}
