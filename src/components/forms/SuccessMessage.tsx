import type { JSX } from "solid-js";
import Message from "@/components/forms/Message";
import styles from "./SuccessMessage.module.css";

export type SuccessMessageProps = {
  children: JSX.Element;
};

export default function SuccessMessage(props: SuccessMessageProps) {
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <div class={styles.body}>{props.children}</div>
    </Message>
  );
}
