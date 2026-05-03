import type { JSX } from "solid-js";
import Message from "@/components/forms/Message";
import styles from "./ErrorMessage.module.css";

export type ErrorMessageProps = {
  children: JSX.Element;
};

export default function ErrorMessage(props: ErrorMessageProps) {
  return (
    <Message>
      <div class={styles.iconWrapper}>
        <div class={styles.iconCircle}>
          <svg
            class={styles.icon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>

      <div class={styles.body}>{props.children}</div>
    </Message>
  );
}
