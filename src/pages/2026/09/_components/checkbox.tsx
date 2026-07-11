import type { JSX } from "solid-js";
import styles from "./checkbox.module.css";

type Props = {
  name?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  children: JSX.Element;
};

export default function Checkbox(props: Props) {
  return (
    <label class={styles.label}>
      <input
        type="checkbox"
        class={styles.checkbox}
        name={props.name}
        value={props.value}
        checked={props.checked}
        disabled={props.disabled}
        onChange={(e) => props.onChange?.(e.currentTarget.checked)}
      />
      {props.children}
    </label>
  );
}
