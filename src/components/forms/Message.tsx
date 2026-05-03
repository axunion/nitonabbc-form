import type { JSX } from "solid-js";
import styles from "./Message.module.css";

export type MessageProps = {
  children: JSX.Element;
};

export default function Message(props: MessageProps) {
  return (
    <div class={styles.wrapper} role="alert" aria-live="assertive">
      <div class={styles.content}>{props.children}</div>
    </div>
  );
}
